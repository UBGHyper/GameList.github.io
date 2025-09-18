bl_info = {
    "name": "PolyTrack Blender Coordinate Converter",
    "author": "Orangy",
    "version": (1, 3),
    "blender": (2, 80, 0),
    "description": "Convert between Blender and PolyTrack coordinates and auto-generate highlight cubes",
    "category": "Object",
}

import bpy
import bmesh
import mathutils
from mathutils import Vector
from bpy.types import Operator, Panel
from bpy_extras import object_utils
from collections import defaultdict
import math
from math import floor

# Conversion functions
def polytrack_to_blender(px, py, pz):
    bx = 5 * px + 2.5
    by = -5 * pz - 2.5
    bz =  5 * py + 2.5
    return (bx, by, bz)

def blender_to_polytrack(bx, by, bz):
    px = (bx - 2.5) / 5
    pz = -(by + 2.5) / 5
    py = (bz - 2.5) / 5
    return (px, py, pz)

def order_pair(a, b):
    return [
        [round(min(a[0], b[0]), 3), round(min(a[1], b[1]), 3), round(min(a[2], b[2]), 3)],
        [round(max(a[0], b[0]), 3), round(max(a[1], b[1]), 3), round(max(a[2], b[2]), 3)]
    ]

# Export selected pairs
class OBJECT_OT_export_polytrack_pairs(bpy.types.Operator):
    bl_idname = "object.export_polytrack_pairs"
    bl_label = "Export PolyTrack Coordinate Pairs"

    def execute(self, context):
        selected = context.selected_objects
        if len(selected) % 2 != 0:
            self.report({'ERROR'}, "Select an even number of objects (pairs).")
            return {'CANCELLED'}

        pairs = []
        for i in range(0, len(selected), 2):
            obj_a = selected[i]
            obj_b = selected[i + 1]
            coord_a = blender_to_polytrack(*obj_a.location)
            coord_b = blender_to_polytrack(*obj_b.location)
            pairs.append([list(coord_a), list(coord_b)])

        data = []
        for obj1, obj2 in pairs:
            p1 = blender_to_polytrack(*obj1)
            p2 = blender_to_polytrack(*obj2)
            ordered = order_pair(p1, p2)
            data.append(ordered)

        print("Converted pairs:")
        print(pairs)

        self.report({'INFO'}, f"Exported {len(pairs)} pairs to console")
        return {'FINISHED'}

# Import from user input
class OBJECT_OT_import_polytrack_input(bpy.types.Operator):
    bl_idname = "object.import_polytrack_from_input"
    bl_label = "Import PolyTrack Pairs from Input"

    user_input: bpy.props.StringProperty(
        name="PolyTrack Coordinate Pairs",
        description="Enter a list like [[[px,py,pz],[px,py,pz]],...]",
        default='[[[-2,0,0],[1,0,1]], [[-2,1,-2],[1,1,0]]]'
    )

    def execute(self, context):
        try:
            pairs = json.loads(self.user_input)
        except Exception as e:
            self.report({'ERROR'}, f"Invalid JSON: {e}")
            return {'CANCELLED'}

        for i, pair in enumerate(pairs):
            for j, pt_coords in enumerate(pair):
                bx, by, bz = polytrack_to_blender(*pt_coords)
                bpy.ops.mesh.primitive_cube_add(location=(bx, by, bz), scale=(2.5, 2.5, 2.5))
                cube = bpy.context.active_object
                cube.name = f"ImportedCube_{i}_{j}"

        self.report({'INFO'}, f"Imported {len(pairs)} pairs from input")
        return {'FINISHED'}

    def invoke(self, context, event):
        return context.window_manager.invoke_props_dialog(self)

VOXEL_SIZE = 0.25
CUBE_SIZE = 2.5
SNAP_SIZE = CUBE_SIZE * 2  # 5m spacing
DEBUG_MAT_NAME = "HighlightMaterial"

def snap(v: Vector):
    return Vector((
        round(v.x / SNAP_SIZE) * SNAP_SIZE,
        round(v.y / SNAP_SIZE) * SNAP_SIZE,
        round(v.z / SNAP_SIZE) * SNAP_SIZE
    ))

def create_debug_material():
    if DEBUG_MAT_NAME in bpy.data.materials:
        return bpy.data.materials[DEBUG_MAT_NAME]
    mat = bpy.data.materials.new(name=DEBUG_MAT_NAME)
    mat.diffuse_color = (1.0, 0.1, 0.1, 0.4)
    mat.use_nodes = True
    return mat

def get_voxelized_surface_coords(obj):
    world_matrix = obj.matrix_world
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bm.verts.ensure_lookup_table()
    bm.faces.ensure_lookup_table()

    touched = set()
    for face in bm.faces:
        for loop in face.loops:
            pt = world_matrix @ loop.vert.co
            snapped = snap(pt)
            touched.add(tuple(snapped))
    bm.free()
    return list(touched)

def filter_redundant_cubes(cube_coords, obj):
    # Group cubes by axis-aligned lines
    def group_by_axis(coords, axis):
        groups = defaultdict(list)
        for coord in coords:
            key = tuple(coord[i] for i in range(3) if i != axis)
            groups[key].append(coord)
        return groups

    def cube_key(c): return tuple(round(c[i], 3) for i in range(3))

    def create_prism_between(p1, p2):
        p1 = Vector(p1)
        p2 = Vector(p2)
        centerX = (p1.x + p2.x) / 2
        centerY = (p1.y + p2.y) / 2
        centerZ = (p1.z + p1.z) / 2
        center = Vector((centerX, centerY, centerZ))
        size = Vector((
            abs(p1.x - p2.x) + SNAP_SIZE,
            abs(p1.y - p2.y) + SNAP_SIZE,
            abs(p1.z - p2.z) + SNAP_SIZE,
        ))
        bpy.ops.mesh.primitive_cube_add(location=center)
        prism = bpy.context.active_object
        prism.scale = size / 2
        return prism

    def intersects_mesh(prism, target_obj):
        bpy.ops.object.select_all(action='DESELECT')
        prism.select_set(True)
        target_obj.select_set(True)
        bpy.context.view_layer.objects.active = target_obj
        bpy.ops.object.duplicate()
        dup = bpy.context.selected_objects[0]
        bpy.ops.object.modifier_add(type='BOOLEAN')
        mod = dup.modifiers[-1]
        mod.operation = 'INTERSECT'
        mod.object = prism
        bpy.ops.object.modifier_apply(modifier=mod.name)
        result = len(dup.data.polygons) > 0
        bpy.data.objects.remove(prism)
        bpy.data.objects.remove(dup)
        return result

    coords_set = set(cube_key(c) for c in cube_coords)
    keepers = set()

    for axis in range(3):
        groups = group_by_axis(cube_coords, axis)
        for group_key, line_coords in groups.items():
            line_coords.sort(key=lambda c: c[axis])
            n = len(line_coords)
            for i in range(n):
                for j in range(i + 2, n):  # skip adjacent (j=i+1)
                    c1 = line_coords[i]
                    c2 = line_coords[j]
                    # All coords in between
                    in_between = [cube_key(c) for c in line_coords[i + 1:j]]
                    prism = create_prism_between(c1, c2)
                    if intersects_mesh(prism, obj):
                        keepers.add(cube_key(c1))
                        keepers.add(cube_key(c2))
                        for k in in_between:
                            coords_set.discard(k)
                        break  # Stop at first valid span
                    else:
                        bpy.data.objects.remove(prism)

    return [Vector(k) for k in coords_set.union(keepers)]

def draw_debug_cubes(coords):
    mat = create_debug_material()
    for coord in coords:
        bpy.ops.mesh.primitive_cube_add(size=CUBE_SIZE, location=coord)
        cube = bpy.context.active_object
        cube.data.materials.append(mat)

class HighlightNecessaryCubesOperator(bpy.types.Operator):
    bl_idname = "object.highlight_necessary_cubes"
    bl_label = "Highlight Necessary Cubes"
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        obj = context.active_object
        if not obj or obj.type != 'MESH':
            self.report({'ERROR'}, "Please select a mesh object.")
            return {'CANCELLED'}

        voxel_coords = get_voxelized_surface_coords(obj)
        minimal_coords = filter_redundant_cubes(voxel_coords, obj)
        draw_debug_cubes(minimal_coords)

        return {'FINISHED'}

# Menus
def menu_func_export(self, context):
    self.layout.operator(OBJECT_OT_export_polytrack_pairs.bl_idname)

def menu_func_import_input(self, context):
    self.layout.operator(OBJECT_OT_import_polytrack_input.bl_idname)

def menu_func_generate_highlight(self, context):
    self.layout.operator(HighlightNecessaryCubesOperator.bl_idname)

class OBJECT_PT_highlight_panel(Panel):
    bl_label = "Highlight Cubes"
    bl_idname = "OBJECT_PT_highlight_cubes"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'Highlight'

    def draw(self, context):
        self.layout.operator("object.highlight_surface_cubes")

# Register
def register():
    bpy.utils.register_class(OBJECT_OT_export_polytrack_pairs)
    bpy.utils.register_class(OBJECT_OT_import_polytrack_input)
    bpy.utils.register_class(HighlightNecessaryCubesOperator)
    bpy.utils.register_class(OBJECT_PT_highlight_panel)
    bpy.types.VIEW3D_MT_object.append(menu_func_export)
    bpy.types.VIEW3D_MT_object.append(menu_func_import_input)
    bpy.types.VIEW3D_MT_object.append(menu_func_generate_highlight)

def unregister():
    bpy.utils.unregister_class(OBJECT_OT_export_polytrack_pairs)
    bpy.utils.unregister_class(OBJECT_OT_import_polytrack_input)
    bpy.utils.unregister_class(HighlightNecessaryCubesOperator)
    bpy.utils.unregister_class(OBJECT_PT_highlight_panel)
    bpy.types.VIEW3D_MT_object.remove(menu_func_export)
    bpy.types.VIEW3D_MT_object.remove(menu_func_import_input)
    bpy.types.VIEW3D_MT_object.remove(menu_func_generate_highlight)

if __name__ == "__main__":
    register()
