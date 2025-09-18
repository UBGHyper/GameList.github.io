import { PolyModLoader, MixinType } from './PolyModLoader.js'
window.polyMods = [
  'http://localhost:63342/PolyTrackCarPickerModded/examplemod.js'
]
window.polyModLoader = new PolyModLoader(window.polyMods) // savePoint pml
window.polyModLoader.importMods().then()
console.log(
  `Successfully loaded ${polyModLoader.loadedMods.length} mod${
    polyModLoader.loadedMods.length === 1 ? '' : 's'
  }`
)

i.addCompleteListener(() => {
  window.polyModLoader.postInitMods() //savePoint pml postinit
})

window.polyModLoader.getFromPolyTrack = path => {
  return eval(path)
}

window.polyModLoader.initMods()
m.enabled = !1

window.polyModLoader.registerClassMixin = (
  scope,
  path,
  mixinType,
  accessors,
  func
) => {
  let originalFunc = eval(scope)[path]
  let newFunc
  switch (mixinType) {
    case MixinType.HEAD:
      newFunc = function () {
        let originalArguments = Array.prototype.slice.call(arguments)
        for (let accessor of accessors) {
          originalArguments.push(eval(accessor))
        }
        func.apply(this, originalArguments)
        originalFunc.apply(this, arguments)
      }
      break
    case MixinType.TAIL:
      newFunc = function () {
        let originalArguments = Array.prototype.slice.call(arguments)
        for (let accessor of accessors) {
          originalArguments.push(eval(accessor))
        }
        originalFunc.apply(this, arguments)
        func.apply(this, originalArguments)
      }
      break
    case MixinType.OVERRIDE:
      newFunc = function () {
        let originalArguments = Array.prototype.slice.call(arguments)
        for (let accessor of accessors) {
          originalArguments.push(eval(accessor))
        }
        func.apply(this, originalArguments)
      }
      break
  }
  eval(scope)[path] = newFunc
}
window.polyModLoader.registerFuncMixin = (path, mixinType, accessors, func) => {
  var originalFunc = eval(path)
  var newFunc
  switch (mixinType) {
    case MixinType.HEAD:
      newFunc = function () {
        let originalArguments = Array.prototype.slice.call(arguments)
        for (let accessor of accessors) {
          originalArguments.push(eval(accessor))
        }
        func.apply(this, originalArguments)
        originalFunc.apply(this, arguments)
      }
      break
    case MixinType.TAIL:
      newFunc = function () {
        let originalArguments = Array.prototype.slice.call(arguments)
        for (let accessor of accessors) {
          originalArguments.push(eval(accessor))
        }
        originalFunc.apply(this, arguments)
        func.apply(this, originalArguments)
      }
      break
    case MixinType.OVERRIDE:
      newFunc = function () {
        let originalArguments = Array.prototype.slice.call(arguments)
        for (let accessor of accessors) {
          originalArguments.push(eval(accessor))
        }
        func.apply(this, originalArguments)
      }
      break
  }
  eval(`${path} = newFunc;`)
}
