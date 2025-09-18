var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SoundManager_soundClass, _EditorExtras_editorClass, _EditorExtras_latestCategory, _EditorExtras_latestBlock, _EditorExtras_categoryDefaults, _EditorExtras_simBlocks, _EditorExtras_modelUrls, _PolyModLoader_instances, _PolyModLoader_polyVersion, _PolyModLoader_allMods, _PolyModLoader_physicsTouched, _PolyModLoader_simWorkerClassMixins, _PolyModLoader_simWorkerFuncMixins, _PolyModLoader_settings, _PolyModLoader_settingConstructor, _PolyModLoader_defaultSettings, _PolyModLoader_latestSetting, _PolyModLoader_keybindings, _PolyModLoader_defaultBinds, _PolyModLoader_bindConstructor, _PolyModLoader_latestBinding, _PolyModLoader_polyModUrls, _PolyModLoader_applySettings, _PolyModLoader_applyKeybinds, _PolyModLoader_preInitPML;
/**
 * Base class for all polytrack mods. Mods should export an instance of their mod class named `polyMod` in their main file.
 */
export class PolyMod {
    constructor() {
        this.loaded = false;
        this.applyManifest = (manifest) => {
            const mod = manifest.polymod;
            /** @type {string} */
            this.modName = mod.name;
            /** @type {string} */
            this.modID = mod.id;
            /** @type {string} */
            this.modAuthor = mod.author;
            /** @type {string} */
            this.modVersion = mod.version;
            /** @type {string} */
            this.polyVersion = mod.targets;
            this.assetFolder = "assets";
            // no idea how to type annotate this
            // /** @type {{string: string}[]} */
            this.modDependencies = manifest.dependencies;
        };
        /**
         * Function to run during initialization of mods. Note that this is called *before* polytrack itself is loaded,
         * but *after* everything has been declared.
         *
         * @param {PolyModLoader} pmlInstance - The instance of {@link PolyModLoader}.
         */
        this.init = (pmlInstance) => { };
        /**
         * Function to run after all mods and polytrack have been initialized and loaded.
         */
        this.postInit = () => { };
        /**
         * Function to run before initialization of `simulation_worker.bundle.js`.
         */
        this.simInit = () => { };
    }
    /**
     * The author of the mod.
     *
     * @type {string}
     */
    get author() {
        return this.modAuthor;
    }
    /**
     * The mod ID.
     *
     * @type {string}
     */
    get id() {
        return this.modID;
    }
    /**
     * The mod name.
     *
     * @type {string}
     */
    get name() {
        return this.modName;
    }
    /**
     * The mod version.
     *
     * @type {string}
     */
    get version() {
        return this.modVersion;
    }
    /**
     * The the mod's icon file URL.
     *
     * @type {string}
     */
    get iconSrc() {
        return this.IconSrc;
    }
    set iconSrc(src) {
        this.IconSrc = src;
    }
    set setLoaded(status) {
        this.loaded = status;
    }
    /**
     * The mod's loaded state.
     *
     * @type {boolean}
     */
    get isLoaded() {
        return this.loaded;
    }
    /**
     * The mod's base URL.
     *
     * @type {string}
     */
    get baseUrl() {
        return this.modBaseUrl;
    }
    set baseUrl(url) {
        this.modBaseUrl = url;
    }
    /**
     * Whether the mod has changed the game physics in some way.
     *
     * @type {boolean}
     */
    get touchesPhysics() {
        return this.touchingPhysics;
    }
    /**
     * Other mods that this mod depends on.
     */
    get dependencies() {
        return this.modDependencies;
    }
    get descriptionUrl() {
        return this.modDescription;
    }
    /**
     * Whether the mod is saved as to always fetch latest version (`true`)
     * or to fetch a specific version (`false`, with version defined by {@link PolyMod.version}).
     *
     * @type {boolean}
     */
    get savedLatest() {
        return this.latestSaved;
    }
    set savedLatest(latest) {
        this.latestSaved = latest;
    }
    get initialized() {
        return this.modInitialized;
    }
    set initialized(initState) {
        this.modInitialized = initState;
    }
}
/**
 * This class is used in {@link PolyModLoader}'s register mixin functions to set where functions should be injected into the target function.
 */
export var MixinType;
(function (MixinType) {
    /**
     * Inject at the start of the target function.
     */
    MixinType[MixinType["HEAD"] = 0] = "HEAD";
    /**
     * Inject at the end of the target function.
     */
    MixinType[MixinType["TAIL"] = 1] = "TAIL";
    /**
     * Override the target function with the new function.
     */
    MixinType[MixinType["OVERRIDE"] = 2] = "OVERRIDE";
    /**
     * Insert code after a given token.
     */
    MixinType[MixinType["INSERT"] = 3] = "INSERT";
    /**
     * Replace code between 2 given tokens. Inclusive.
     */
    MixinType[MixinType["REPLACEBETWEEN"] = 5] = "REPLACEBETWEEN";
    /**
     * Remove code between 2 given tokens. Inclusive.
     */
    MixinType[MixinType["REMOVEBETWEEN"] = 6] = "REMOVEBETWEEN";
    /**
     * Inserts code after a given token, but class wide.
     */
    MixinType[MixinType["CLASSINSERT"] = 8] = "CLASSINSERT";
    /**
     * Replace code between 2 given tokens, but class wide. Inclusive.
     */
    MixinType[MixinType["CLASSREMOVE"] = 4] = "CLASSREMOVE";
    /**
     * Remove code between 2 given tokens, but class wide. Inclusive.
     */
    MixinType[MixinType["CLASSREPLACE"] = 7] = "CLASSREPLACE";
})(MixinType || (MixinType = {}));
export var SettingType;
(function (SettingType) {
    SettingType["BOOL"] = "boolean";
    SettingType["SLIDER"] = "slider";
    SettingType["CUSTOM"] = "custom";
})(SettingType || (SettingType = {}));
var Variables;
(function (Variables) {
    Variables["PreInitMixin"] = "D = 0";
    Variables["PolyInitPopupClass"] = "E";
    Variables["SoundClass"] = "gl";
    Variables["SettingsClass"] = "hz";
    Variables["SettingEnum"] = "el";
    Variables["KeybindEnum"] = "mk";
    Variables["SettingUIFunction"] = "yR";
    Variables["EditorClass"] = "A_";
})(Variables || (Variables = {}));
export class SoundManager {
    constructor(soundClass) {
        _SoundManager_soundClass.set(this, void 0);
        __classPrivateFieldSet(this, _SoundManager_soundClass, soundClass, "f");
    }
    registerSound(id, url) {
        __classPrivateFieldGet(this, _SoundManager_soundClass, "f").load(id, url);
    }
    playSound(id, gain) {
        const e = __classPrivateFieldGet(this, _SoundManager_soundClass, "f").getBuffer(id);
        if (null != e && null != __classPrivateFieldGet(this, _SoundManager_soundClass, "f").context && null != __classPrivateFieldGet(this, _SoundManager_soundClass, "f").destinationSfx) {
            const t = __classPrivateFieldGet(this, _SoundManager_soundClass, "f").context.createBufferSource();
            t.buffer = e;
            const n = __classPrivateFieldGet(this, _SoundManager_soundClass, "f").context.createGain();
            n.gain.value = gain,
                t.connect(n),
                n.connect(__classPrivateFieldGet(this, _SoundManager_soundClass, "f").destinationSfx),
                t.start(0);
        }
    }
    playUIClick() {
        const e = __classPrivateFieldGet(this, _SoundManager_soundClass, "f").getBuffer("click");
        if (null != e && null != __classPrivateFieldGet(this, _SoundManager_soundClass, "f").context && null != __classPrivateFieldGet(this, _SoundManager_soundClass, "f").destinationSfx) {
            const t = __classPrivateFieldGet(this, _SoundManager_soundClass, "f").context.createBufferSource();
            t.buffer = e;
            const n = __classPrivateFieldGet(this, _SoundManager_soundClass, "f").context.createGain();
            n.gain.value = .0075,
                t.connect(n),
                n.connect(__classPrivateFieldGet(this, _SoundManager_soundClass, "f").destinationSfx),
                t.start(0);
        }
    }
}
_SoundManager_soundClass = new WeakMap();
export class EditorExtras {
    constructor(pml) {
        _EditorExtras_editorClass.set(this, void 0);
        _EditorExtras_latestCategory.set(this, 8);
        _EditorExtras_latestBlock.set(this, 155);
        _EditorExtras_categoryDefaults.set(this, []);
        this.ignoredBlocks = [];
        _EditorExtras_simBlocks.set(this, []);
        _EditorExtras_modelUrls.set(this, ["models/blocks.glb", "models/pillar.glb", "models/planes.glb", "models/road.glb", "models/road_wide.glb", "models/signs.glb", "models/wall_track.glb"]);
        this.pml = pml;
    }
    construct(editorClass) {
        __classPrivateFieldSet(this, _EditorExtras_editorClass, editorClass, "f");
    }
    blockNumberFromId(id) {
        return this.pml.getFromPolyTrack(`eA.${id}`);
    }
    get getSimBlocks() {
        return [...__classPrivateFieldGet(this, _EditorExtras_simBlocks, "f")];
    }
    get trackEditorClass() {
        return __classPrivateFieldGet(this, _EditorExtras_editorClass, "f");
    }
    registerModel(url) {
        __classPrivateFieldGet(this, _EditorExtras_modelUrls, "f").push(url);
    }
    registerCategory(id, defaultId) {
        var _a;
        __classPrivateFieldSet(this, _EditorExtras_latestCategory, (_a = __classPrivateFieldGet(this, _EditorExtras_latestCategory, "f"), _a++, _a), "f");
        this.pml.getFromPolyTrack(`KA[KA.${id} = ${__classPrivateFieldGet(this, _EditorExtras_latestCategory, "f")}]  =  "${id}"`);
        __classPrivateFieldGet(this, _EditorExtras_simBlocks, "f").push(`F_[F_.${id} = ${__classPrivateFieldGet(this, _EditorExtras_latestCategory, "f")}]  =  "${id}"`);
        __classPrivateFieldGet(this, _EditorExtras_categoryDefaults, "f").push(`case KA.${id}:n = this.getPart(eA.${defaultId});break;`);
    }
    registerBlock(id, categoryId, checksum, sceneName, modelName, overlapSpace, extraSettings) {
        var _a;
        __classPrivateFieldSet(this, _EditorExtras_latestBlock, (_a = __classPrivateFieldGet(this, _EditorExtras_latestBlock, "f"), _a++, _a), "f");
        this.pml.getFromPolyTrack(`eA[eA.${id} = ${__classPrivateFieldGet(this, _EditorExtras_latestBlock, "f")}]  =  "${id}"`);
        this.pml.getFromPolyTrack(`ab.push(new rb("${checksum}",KA.${categoryId},eA.${id},[["${sceneName}", "${modelName}"]],nb,${JSON.stringify(overlapSpace)}${extraSettings && extraSettings.specialSettings ? `, { type: XA.${extraSettings.specialSettings.type}, center: ${JSON.stringify(extraSettings.specialSettings.center)}, size: ${JSON.stringify(extraSettings.specialSettings.size)}}` : ""}))`);
        this.pml.getFromPolyTrack(`for (const e of ab) {if (!sb.has(e.id)){ sb.set(e.id, e);}; }
      `);
        if (extraSettings && extraSettings.ignoreOnExport) {
            this.ignoredBlocks.push(this.blockNumberFromId(id));
            return;
        }
        __classPrivateFieldGet(this, _EditorExtras_simBlocks, "f").push(`mu[mu.${id} = ${__classPrivateFieldGet(this, _EditorExtras_latestBlock, "f")}]  =  "${id}"`);
        __classPrivateFieldGet(this, _EditorExtras_simBlocks, "f").push(`j_.push(new X_("${checksum}",F_.${categoryId},mu.${id},[["${sceneName}", "${modelName}"]],G_,${JSON.stringify(overlapSpace)}${extraSettings && extraSettings.specialSettings ? `, { type: Jh.${extraSettings.specialSettings.type}, center: ${JSON.stringify(extraSettings.specialSettings.center)}, size: ${JSON.stringify(extraSettings.specialSettings.size)}}` : ""}))`);
    }
    init() {
        this.pml.registerClassMixin("eU.prototype", "init", MixinType.REPLACEBETWEEN, `((a = [`, ` ]),`, `((a = ["${__classPrivateFieldGet(this, _EditorExtras_modelUrls, "f").join('", "')}"]),`);
        // this.pml.registerFuncMixin("xb", MixinType.INSERT, `for (const [r,a] of Eb(this, Ab, "f")) {`, `if (ActivePolyModLoader.editorExtras.ignoredBlocks.includes(r)) {continue;};`);
        // this.pml.registerClassMixin("GN.prototype", "getCategoryMesh", MixinType.INSERT, "break;", `${this.#categoryDefaults.join("")}`);
    }
}
_EditorExtras_editorClass = new WeakMap(), _EditorExtras_latestCategory = new WeakMap(), _EditorExtras_latestBlock = new WeakMap(), _EditorExtras_categoryDefaults = new WeakMap(), _EditorExtras_simBlocks = new WeakMap(), _EditorExtras_modelUrls = new WeakMap();
export class PolyModLoader {
    constructor(polyVersion) {
        _PolyModLoader_instances.add(this);
        _PolyModLoader_polyVersion.set(this, void 0);
        _PolyModLoader_allMods.set(this, void 0);
        _PolyModLoader_physicsTouched.set(this, void 0);
        _PolyModLoader_simWorkerClassMixins.set(this, void 0);
        _PolyModLoader_simWorkerFuncMixins.set(this, void 0);
        _PolyModLoader_settings.set(this, void 0);
        _PolyModLoader_settingConstructor.set(this, void 0);
        _PolyModLoader_defaultSettings.set(this, void 0);
        _PolyModLoader_latestSetting.set(this, void 0);
        _PolyModLoader_keybindings.set(this, void 0);
        _PolyModLoader_defaultBinds.set(this, void 0);
        _PolyModLoader_bindConstructor.set(this, void 0);
        _PolyModLoader_latestBinding.set(this, void 0);
        _PolyModLoader_polyModUrls.set(this, void 0);
        this.getFromPolyTrack = (path) => { };
        /**
         * Inject mixin under scope {@link scope} with target function name defined by {@link path}.
         * This only injects functions in `main.bundle.js`.
         *
         * @param {string} scope        - The scope under which mixin is injected.
         * @param {string} path         - The path under the {@link scope} which the mixin targets.
         * @param {MixinType} mixinType - The type of injection.
         * @param {string[]} accessors  - A list of strings to evaluate to access private variables.
         * @param {function} func       - The new function to be injected.
         */
        this.registerClassMixin = (scope, path, mixinType, accessors, func, extraOptinonal) => { };
        /**
         * Inject mixin with target function name defined by {@link path}.
         * This only injects functions in `main.bundle.js`.
         *
         * @param {string} path         - The path of the function which the mixin targets.
         * @param {MixinType} mixinType - The type of injection.
         * @param {string[]} accessors  - A list of strings to evaluate to access private variables.
         * @param {function} func       - The new function to be injected.
         */
        this.registerFuncMixin = (path, mixinType, accessors, func, extraOptinonal) => { };
        this.registerClassWideMixin = (path, mixinType, firstToken, funcOrSecondToken, funcOptional) => { };
        /** @type {string} */
        __classPrivateFieldSet(this, _PolyModLoader_polyVersion, polyVersion, "f");
        /** @type {PolyMod[]} */
        __classPrivateFieldSet(this, _PolyModLoader_allMods, [], "f");
        /** @type {boolean} */
        __classPrivateFieldSet(this, _PolyModLoader_physicsTouched, false, "f");
        /**
         * @type {{
         *      scope: string,
         *      path: string,
         *      mixinType: MixinType,
         *      accessors: string[],
         *      funcString: string,
         *  }}
         */
        __classPrivateFieldSet(this, _PolyModLoader_simWorkerClassMixins, [], "f");
        /**
         * @type {{
        *      path: string,
        *      mixinType: MixinType,
        *      accessors: string[],
        *      funcString: string,
        *  }}
        */
        __classPrivateFieldSet(this, _PolyModLoader_simWorkerFuncMixins, [], "f");
        __classPrivateFieldSet(this, _PolyModLoader_settings, [], "f");
        __classPrivateFieldSet(this, _PolyModLoader_settingConstructor, [], "f");
        __classPrivateFieldSet(this, _PolyModLoader_defaultSettings, [], "f");
        __classPrivateFieldSet(this, _PolyModLoader_latestSetting, 18, "f");
        __classPrivateFieldSet(this, _PolyModLoader_keybindings, [], "f");
        __classPrivateFieldSet(this, _PolyModLoader_defaultBinds, [], "f");
        __classPrivateFieldSet(this, _PolyModLoader_bindConstructor, [], "f");
        __classPrivateFieldSet(this, _PolyModLoader_latestBinding, 31, "f");
        this.editorExtras = new EditorExtras(this);
    }
    get polyVersion() {
        return __classPrivateFieldGet(this, _PolyModLoader_polyVersion, "f"); // Why is this even private lmfao
    }
    initStorage(localStorage) {
        /** @type {Storage} */
        this.localStorage = localStorage;
        __classPrivateFieldSet(this, _PolyModLoader_polyModUrls, this.getPolyModsStorage(), "f");
    }
    async importMods() {
        // Mod loading UI
        const ui = document.getElementById("ui");
        const loadingDiv = document.createElement("div");
        loadingDiv.style.display = "flex";
        loadingDiv.style.flexDirection = "column";
        loadingDiv.style.position = "absolute";
        loadingDiv.style.left = "0";
        loadingDiv.style.top = "0";
        loadingDiv.style.width = "100%";
        loadingDiv.style.height = "100%";
        loadingDiv.style.textAlign = "center";
        loadingDiv.style.backgroundColor = "#192042";
        loadingDiv.style.transition = "background-color 1s ease-out";
        loadingDiv.style.overflow = "hidden";
        loadingDiv.innerHTML = `<img src="https://pml.crjakob.com/polytrackmods/PolyModLoader/0.5.0/images/pmllogo.svg" style="width: calc(100vw * (1000 / 1300)); height: 200px; margin: 30px auto 0 auto" />`;
        const loadingUI = document.createElement("div");
        loadingUI.style.margin = "20px 0 0 0";
        loadingUI.style.padding = "0";
        const loadingText = document.createElement("p");
        loadingText.innerText = "[PML] Loading Mods...";
        loadingText.style.margin = "5px";
        loadingText.style.padding = "0";
        loadingText.style.color = "#ffffff";
        loadingText.style.fontSize = "32px";
        loadingText.style.fontStyle = "italic";
        loadingText.style.fontFamily = "ForcedSquare, Arial, sans-serif";
        loadingText.style.lineHeight = "1";
        const loadingBarOuter = document.createElement("div");
        loadingBarOuter.style.margin = "0 auto";
        loadingBarOuter.style.padding = "0";
        loadingBarOuter.style.width = "600px";
        loadingBarOuter.style.height = "50px";
        loadingBarOuter.style.backgroundColor = "#28346a";
        loadingBarOuter.style.clipPath = "polygon(9px 0, 100% 0, calc(100% - 9px) 100%, 0 100%)";
        loadingBarOuter.style.overflow = "hidden";
        const loadingBarInner = document.createElement("div");
        loadingBarInner.style.margin = "15px 20px";
        loadingBarInner.style.padding = "0";
        loadingBarInner.style.width = "560px";
        loadingBarInner.style.height = "20px";
        loadingBarInner.style.clipPath = "polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%)";
        loadingBarInner.style.backgroundColor = "#222244";
        loadingBarInner.style.boxShadow = "inset 0 0 6px #000000";
        const loadingBarFill = document.createElement("div");
        loadingBarFill.style.margin = "0";
        loadingBarFill.style.padding = "0";
        loadingBarFill.style.width = "0";
        loadingBarFill.style.height = "100%";
        loadingBarFill.style.clipPath = "polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)";
        loadingBarFill.style.backgroundColor = "#ffffff";
        loadingBarFill.style.boxShadow = "inset 0 0 6px #000000";
        loadingBarFill.style.transition = "width 0.1s ease-in-out";
        const progressDiv = document.createElement("div");
        progressDiv.style.textAlign = "left";
        progressDiv.style.width = "1000px";
        progressDiv.style.margin = "50px auto";
        loadingBarOuter.appendChild(loadingBarInner);
        loadingBarInner.appendChild(loadingBarFill);
        loadingUI.appendChild(loadingText);
        loadingUI.appendChild(loadingBarOuter);
        loadingUI.appendChild(progressDiv);
        loadingDiv.appendChild(loadingUI);
        ui.appendChild(loadingDiv);
        const total = __classPrivateFieldGet(this, _PolyModLoader_polyModUrls, "f").length;
        const current = {
            num: 0,
            text: undefined,
            url: "",
            version: "",
            totalParts: 0,
            part: 0,
        };
        function updateBar(num) {
            current.num = num;
            loadingBarFill.style.width = `${(current.num / total) * 100}%`;
        }
        function nextPart() {
            updateBar(current.num + current.part / current.totalParts);
            current.part += 1;
        }
        function currPartStr() {
            return `[${current.part}/${current.totalParts}]`;
        }
        function startImportMod(url, version) {
            current.url = url;
            current.version = version;
            progressDiv.innerHTML = "";
            const modP = document.createElement("p");
            modP.innerText = "[PML] Loading Mods...";
            modP.style.color = "#ffffff";
            modP.style.fontSize = "18px";
            modP.style.fontStyle = "italic";
            modP.style.fontFamily = "ForcedSquare, Arial, sans-serif";
            modP.style.lineHeight = "1";
            modP.innerText = `Importing mod from URL: ${current.url} @ version ${current.version}`;
            progressDiv.appendChild(modP);
            // @ts-ignore
            current.text = modP;
        }
        function startFetchLatest() {
            nextPart();
            const latestP = document.createElement("p");
            latestP.style.color = "#ffffff";
            latestP.style.fontSize = "18px";
            latestP.style.fontStyle = "italic";
            latestP.style.fontFamily = "ForcedSquare, Arial, sans-serif";
            latestP.style.lineHeight = "1";
            latestP.innerText = `${currPartStr()} Fetching latest mod version from ${current.url}/latest.json`;
            progressDiv.appendChild(latestP);
            // @ts-ignore
            current.text = latestP;
        }
        function finishFetchLatest(version) {
            current.version = version;
            // @ts-ignore
            current.text.innerText = `${currPartStr()} Fetched latest mod version: v${current.version}`;
        }
        function startFetchManifest() {
            nextPart();
            const manifestP = document.createElement("p");
            manifestP.style.color = "#ffffff";
            manifestP.style.fontSize = "18px";
            manifestP.style.fontStyle = "italic";
            manifestP.style.fontFamily = "ForcedSquare, Arial, sans-serif";
            manifestP.style.lineHeight = "1";
            manifestP.innerText = `${currPartStr()} Fetching mod manifest from ${current.url}/${current.version}/manifest.json`;
            progressDiv.appendChild(manifestP);
            // @ts-ignore
            current.text = manifestP;
        }
        function startFetchModMain(js) {
            nextPart();
            const mainP = document.createElement("p");
            mainP.style.color = "#ffffff";
            mainP.style.fontSize = "18px";
            mainP.style.fontStyle = "italic";
            mainP.style.fontFamily = "ForcedSquare, Arial, sans-serif";
            mainP.style.lineHeight = "1";
            mainP.innerText = `${currPartStr()} Fetching mod js from ${current.url}/${current.version}/${js}`;
            progressDiv.appendChild(mainP);
            // @ts-ignore
            current.text = mainP;
        }
        function errorCurrent() {
            // @ts-ignore
            current.text.style.color = "red";
        }
        function finishImportMod() {
            current.totalParts = 0;
            current.part = 0;
            updateBar(Math.floor(current.num) + 1);
        }
        // Actual mod importing
        for (let polyModObject of __classPrivateFieldGet(this, _PolyModLoader_polyModUrls, "f")) {
            startImportMod(polyModObject.base, polyModObject.version);
            let latest = false;
            current.totalParts = 2;
            if (polyModObject.version === "latest") {
                current.totalParts = 3;
                startFetchLatest();
                try {
                    const latestFile = await fetch(`${polyModObject.base}/latest.json`).then(r => r.json());
                    polyModObject.version = latestFile[__classPrivateFieldGet(this, _PolyModLoader_polyVersion, "f")];
                    latest = true;
                }
                catch (err) {
                    errorCurrent();
                    alert(`Couldn't find latest version for ${polyModObject.base}`);
                    console.error("Error in fetching latest version json:", err);
                }
                finishFetchLatest(polyModObject.version);
            }
            const polyModUrl = `${polyModObject.base}/${polyModObject.version}`;
            startFetchManifest();
            try {
                const manifestFile = await fetch(`${polyModUrl}/manifest.json`).then(r => r.json());
                let mod = manifestFile.polymod;
                startFetchModMain(mod.main);
                try {
                    const modImport = await import(`${polyModUrl}/${mod.main}`);
                    let newMod = modImport.polyMod;
                    mod.version = polyModObject.version;
                    if (this.getMod(mod.id))
                        alert(`Duplicate mod detected: ${mod.name}`);
                    newMod.applyManifest(manifestFile);
                    newMod.baseUrl = polyModObject.base;
                    newMod.applyManifest = (nothing) => { console.warn("Can't apply manifest after initialization!"); };
                    newMod.savedLatest = latest;
                    newMod.iconSrc = `${polyModUrl}/icon.png`;
                    if (polyModObject.loaded) {
                        newMod.setLoaded = true;
                        if (newMod.touchesPhysics) {
                            __classPrivateFieldSet(this, _PolyModLoader_physicsTouched, true, "f");
                            this.registerClassMixin("HB.prototype", "submitLeaderboard", MixinType.OVERRIDE, [], (e, t, n, i, r, a) => { });
                        }
                    }
                    __classPrivateFieldGet(this, _PolyModLoader_allMods, "f").push(newMod);
                }
                catch (err) {
                    errorCurrent();
                    alert(`Mod ${mod.name} failed to load.`);
                    console.error("Error in loading mod:", err);
                }
            }
            catch (err) {
                errorCurrent();
                alert(`Couldn't load mod with URL ${polyModUrl}.`);
                console.error("Error in loading mod URL:", err);
            }
            finishImportMod();
        }
        loadingDiv.remove();
    }
    getPolyModsStorage() {
        const polyModsStorage = this.localStorage.getItem("polyMods");
        if (polyModsStorage) {
            __classPrivateFieldSet(this, _PolyModLoader_polyModUrls, JSON.parse(polyModsStorage), "f");
        }
        else {
            __classPrivateFieldSet(this, _PolyModLoader_polyModUrls, [
                {
                    "base": "https://pml.crjakob.com/polytrackmods/PolyModLoader/pmlcore",
                    "version": "latest",
                    "loaded": true
                }
            ], "f");
            this.localStorage.setItem("polyMods", JSON.stringify(__classPrivateFieldGet(this, _PolyModLoader_polyModUrls, "f")));
        }
        return __classPrivateFieldGet(this, _PolyModLoader_polyModUrls, "f");
    }
    serializeMod(mod) {
        return { "base": mod.baseUrl, "version": mod.savedLatest ? "latest" : mod.version, "loaded": mod.isLoaded || false };
    }
    saveModsToLocalStorage() {
        let savedMods = [];
        for (let mod of __classPrivateFieldGet(this, _PolyModLoader_allMods, "f")) {
            const modSerialized = this.serializeMod(mod);
            savedMods.push(modSerialized);
        }
        __classPrivateFieldSet(this, _PolyModLoader_polyModUrls, savedMods, "f");
        this.localStorage.setItem("polyMods", JSON.stringify(__classPrivateFieldGet(this, _PolyModLoader_polyModUrls, "f")));
    }
    /**
     * Reorder a mod in the internal list to change its priority in mod loading.
     *
     * @param {PolyMod} mod  - The mod to reorder.
     * @param {number} delta - The amount to reorder it by. Positive numbers decrease priority, negative numbers increase priority.
     */
    reorderMod(mod, delta) {
        if (!mod)
            return;
        if (mod.id === "pmlcore") {
            return;
        }
        const currentIndex = __classPrivateFieldGet(this, _PolyModLoader_allMods, "f").indexOf(mod);
        if ((currentIndex === 1) || delta > 0)
            return;
        if (currentIndex === null || currentIndex === undefined) {
            alert("This mod isn't loaded");
            return;
        }
        const temp = __classPrivateFieldGet(this, _PolyModLoader_allMods, "f")[currentIndex + delta];
        __classPrivateFieldGet(this, _PolyModLoader_allMods, "f")[currentIndex + delta] = __classPrivateFieldGet(this, _PolyModLoader_allMods, "f")[currentIndex];
        __classPrivateFieldGet(this, _PolyModLoader_allMods, "f")[currentIndex] = temp;
        this.saveModsToLocalStorage();
    }
    /**
     * Add a mod to the internal mod list. Added mod is given least priority.
     *
     * @param {{base: string, version: string, loaded: bool}} polyModObject - The mod's JSON representation to add.
     */
    async addMod(polyModObject, autoUpdate) {
        let latest = false;
        if (polyModObject.version === "latest") {
            try {
                const latestFile = await fetch(`${polyModObject.base}/latest.json`).then(r => r.json());
                polyModObject.version = latestFile[__classPrivateFieldGet(this, _PolyModLoader_polyVersion, "f")];
                if (autoUpdate) {
                    latest = true;
                }
            }
            catch {
                alert(`Mod with URL ${polyModObject.base} does not have a version which supports PolyTrack v${__classPrivateFieldGet(this, _PolyModLoader_polyVersion, "f")}.`);
            }
        }
        const polyModUrl = `${polyModObject.base}/${polyModObject.version}`;
        try {
            const manifestFile = await fetch(`${polyModUrl}/manifest.json`).then(r => r.json());
            const mod = manifestFile.polymod;
            if (this.getMod(mod.id)) {
                alert("This mod is already present!");
                return;
            }
            if (mod.targets.indexOf(__classPrivateFieldGet(this, _PolyModLoader_polyVersion, "f")) === -1) {
                alert(`Mod target version does not match polytrack version!
                    Note: ${mod.name} version ${polyModObject.version} targets polytrack versions ${mod.targets.join(', ')}, but current polytrack version is ${__classPrivateFieldGet(this, _PolyModLoader_polyVersion, "f")}.`);
                return;
            }
            try {
                const modImport = await import(`${polyModUrl}/${mod.main}`);
                let newMod = modImport.polyMod;
                newMod.iconSrc = `${polyModUrl}/icon.png`;
                mod.version = polyModObject.version;
                newMod.applyManifest(manifestFile);
                newMod.baseUrl = polyModObject.base;
                newMod.applyManifest = (nothing) => { console.warn("Can't apply manifest after initialization!"); };
                newMod.savedLatest = latest;
                __classPrivateFieldGet(this, _PolyModLoader_allMods, "f").push(newMod);
                this.saveModsToLocalStorage();
                return this.getMod(newMod.id);
            }
            catch (err) {
                alert("Something went wrong importing this mod!");
                console.error("Error in importing mod:", err);
                return;
            }
        }
        catch (err) {
            alert(`Couldn't find mod manifest for "${polyModObject.base}".`);
            console.error("Error in getting mod manifest:", err);
        }
    }
    registerSettingCategory(name) {
        __classPrivateFieldGet(this, _PolyModLoader_settings, "f").push(`MR(this, iR, "m", bR).call(this, MR(this, aR, "f").get("${name}")),`);
    }
    registerBindCategory(name) {
        __classPrivateFieldGet(this, _PolyModLoader_keybindings, "f").push(`MR(this, iR, "m", AR).call(this, MR(this, aR, "f").get("${name}")),`);
    }
    registerSetting(name, id, type, defaultOption, optionsOptional) {
        var _a;
        __classPrivateFieldSet(this, _PolyModLoader_latestSetting, (_a = __classPrivateFieldGet(this, _PolyModLoader_latestSetting, "f"), _a++, _a), "f");
        __classPrivateFieldGet(this, _PolyModLoader_settingConstructor, "f").push(`${Variables.SettingEnum}[${Variables.SettingEnum}.${id} = ${__classPrivateFieldGet(this, _PolyModLoader_latestSetting, "f")}] = "${id}";`);
        if (type === "boolean") {
            __classPrivateFieldGet(this, _PolyModLoader_defaultSettings, "f").push(`, [${Variables.SettingEnum}.${id}, "${defaultOption ? "true" : "false"}"]`);
            __classPrivateFieldGet(this, _PolyModLoader_settings, "f").push(`
                MR(this, iR, 'm', xR).call(
                this,
                MR(this, aR, 'f').get('${name}'),
                [
                    { title: MR(this, aR, 'f').get('Off'), value: 'false' },
                    { title: MR(this, aR, 'f').get('On'), value: 'true' }
                ],
                ${Variables.SettingEnum}.${id}
                ),`);
        }
        else if (type === "slider") {
            __classPrivateFieldGet(this, _PolyModLoader_defaultSettings, "f").push(`, [${Variables.SettingEnum}.${id}, "${defaultOption}"]`);
            __classPrivateFieldGet(this, _PolyModLoader_settings, "f").push(`
                 MR(this, iR, 'm', kR).call(
              this,
              MR(this, aR, 'f').get('${name}'),
              ${Variables.SettingEnum}.${id}
            ),`);
        }
        else if (type === "custom") {
            __classPrivateFieldGet(this, _PolyModLoader_defaultSettings, "f").push(`, [${Variables.SettingEnum}.${id}, "${defaultOption}"]`);
            __classPrivateFieldGet(this, _PolyModLoader_settings, "f").push(`
                MR(this, iR, 'm', xR).call(
                this,
                MR(this, aR, 'f').get('${name}'),
                ${JSON.stringify(optionsOptional)},
                ${Variables.SettingEnum}.${id}
                ),`);
        }
    }
    registerKeybind(name, id, event, defaultBind, secondBindOptional, callback) {
        var _a;
        __classPrivateFieldGet(this, _PolyModLoader_keybindings, "f").push(`MR(this, iR, "m", ER).call(this, MR(this, aR, "f").get("${name}"), ${Variables.KeybindEnum}.${id}),`);
        __classPrivateFieldGet(this, _PolyModLoader_bindConstructor, "f").push(`${Variables.KeybindEnum}[${Variables.KeybindEnum}.${id} = ${__classPrivateFieldGet(this, _PolyModLoader_latestBinding, "f")}] = "${id}";`);
        __classPrivateFieldGet(this, _PolyModLoader_defaultBinds, "f").push(`, [${Variables.KeybindEnum}.${id}, ["${defaultBind}", ${secondBindOptional ? `"${secondBindOptional}"` : "null"}]]`);
        __classPrivateFieldSet(this, _PolyModLoader_latestBinding, (_a = __classPrivateFieldGet(this, _PolyModLoader_latestBinding, "f"), _a++, _a), "f");
        window.addEventListener(event, (e) => {
            if (this.settingClass.checkKeyBinding(e, this.getFromPolyTrack(`${Variables.KeybindEnum}.${id}`))) {
                callback(e);
            }
        });
    }
    getSetting(id) {
        return this.getFromPolyTrack(`ActivePolyModLoader.settingClass.getSetting(${Variables.SettingEnum}.${id})`);
    }
    registerSoundOverride(id, url) {
        this.registerClassMixin(`${Variables.SoundClass}.prototype`, "load", MixinType.INSERT, `ml(this, nl, "f").addResource(),`, `
            null;
            if(e === "${id}") {
                t = ["${url}"];
            }`);
    }
    /**
     * Remove a mod from the internal list.
     *
     * @param {PolyMod} mod - The mod to remove.
     */
    removeMod(mod) {
        if (!mod)
            return;
        if (mod.id === "pmlcore") {
            return;
        }
        const index = __classPrivateFieldGet(this, _PolyModLoader_allMods, "f").indexOf(mod);
        if (index > -1) {
            __classPrivateFieldGet(this, _PolyModLoader_allMods, "f").splice(index, 1);
        }
        this.saveModsToLocalStorage();
    }
    /**
     * Set the loaded state of a mod.
     *
     * @param {PolyMod} mod   - The mod to set the state of.
     * @param {boolean} state - The state to set. `true` is loaded, `false` is unloaded.
     */
    setModLoaded(mod, state) {
        if (!mod)
            return;
        if (mod.id === "pmlcore") {
            return;
        }
        mod.loaded = state;
        this.saveModsToLocalStorage();
    }
    initMods() {
        __classPrivateFieldGet(this, _PolyModLoader_instances, "m", _PolyModLoader_preInitPML).call(this);
        let initList = [];
        for (let polyMod of __classPrivateFieldGet(this, _PolyModLoader_allMods, "f")) {
            if (polyMod.isLoaded)
                initList.push(polyMod.id);
        }
        if (initList.length === 0)
            return; // no mods to initialize lol
        let allModsInit = false;
        while (!allModsInit) {
            let currentMod = this.getMod(initList[0]);
            if (!currentMod)
                continue;
            console.log(initList[0]);
            let initCheck = true;
            for (let dependency of currentMod.dependencies) {
                let curDependency = this.getMod(dependency.id);
                if (!curDependency) {
                    initCheck = false;
                    initList.splice(0, 1);
                    alert(`Mod ${currentMod.name} is missing mod ${dependency.id} ${dependency.version} and will not be initialized.`);
                    console.warn(`Mod ${currentMod.name} is missing mod ${dependency.id} ${dependency.version} and will not be initialized.`);
                    break;
                }
                if (!curDependency.isLoaded) {
                    initCheck = false;
                    initList.splice(0, 1);
                    alert(`Mod ${currentMod.name} depends on mod ${dependency.id} ${dependency.version} but the dependency isn't loaded. Mod will not be initialized.`);
                    console.warn(`Mod ${currentMod.name} depends on mod ${dependency.id} ${dependency.version} but the dependency isn't loaded. Mod will not be initialized.`);
                    break;
                }
                if (curDependency.version !== dependency.version) {
                    initCheck = false;
                    initList.splice(0, 1);
                    alert(`Mod ${currentMod.name} needs version ${dependency.version} of ${curDependency.name} but ${curDependency.version} is present.`);
                    console.warn(`Mod ${currentMod.name} needs version ${dependency.version} of ${curDependency.name} but ${curDependency.version} is present.`);
                    break;
                }
                if (!curDependency.initialized) {
                    initCheck = false;
                    initList.splice(0, 1);
                    initList.push(currentMod.id);
                    break;
                }
            }
            if (initCheck) {
                try {
                    currentMod.init(this);
                    currentMod.initialized = true;
                    initList.splice(0, 1);
                }
                catch (err) {
                    alert(`Mod ${currentMod.name} failed to initialize and will be unloaded.`);
                    console.error("Error in initializing mod:", err);
                    this.setModLoaded(currentMod, false);
                    initList.splice(0, 1);
                }
            }
            if (initList.length === 0)
                allModsInit = true;
        }
        __classPrivateFieldGet(this, _PolyModLoader_instances, "m", _PolyModLoader_applySettings).call(this);
        __classPrivateFieldGet(this, _PolyModLoader_instances, "m", _PolyModLoader_applyKeybinds).call(this);
        this.editorExtras.init();
    }
    postInitMods() {
        for (let polyMod of __classPrivateFieldGet(this, _PolyModLoader_allMods, "f")) {
            if (polyMod.isLoaded) {
                try {
                    polyMod.postInit();
                }
                catch (err) {
                    alert(`Mod ${polyMod.name} failed to post initialize and will be unloaded.`);
                    console.error("Error in post initializing mod:", err);
                    this.setModLoaded(polyMod, false);
                }
            }
        }
    }
    simInitMods() {
        for (let polyMod of __classPrivateFieldGet(this, _PolyModLoader_allMods, "f")) {
            if (polyMod.isLoaded)
                polyMod.simInit();
        }
    }
    /**
     * Access a mod by its mod ID.
     *
     * @param   {string} id - The ID of the mod to get
     * @returns {PolyMod}   - The requested mod's object.
     */
    getMod(id) {
        for (let polyMod of __classPrivateFieldGet(this, _PolyModLoader_allMods, "f")) {
            if (polyMod.id == id)
                return polyMod;
        }
    }
    /**
     * Get the list of all mods.
     *
     * @type {PolyMod[]}
     */
    getAllMods() {
        return __classPrivateFieldGet(this, _PolyModLoader_allMods, "f");
    }
    /**
     * Whether uploading runs to leaderboard is invalid or not.
     */
    get lbInvalid() {
        return __classPrivateFieldGet(this, _PolyModLoader_physicsTouched, "f");
    }
    get simWorkerClassMixins() {
        return [...__classPrivateFieldGet(this, _PolyModLoader_simWorkerClassMixins, "f")];
    }
    get simWorkerFuncMixins() {
        return [...__classPrivateFieldGet(this, _PolyModLoader_simWorkerFuncMixins, "f")];
    }
    /**
     * Inject mixin under scope {@link scope} with target function name defined by {@link path}.
     * This only injects functions in `simulation_worker.bundle.js`.
     *
     * @param {string} scope        - The scope under which mixin is injected.
     * @param {string} path         - The path under the {@link scope} which the mixin targets.
     * @param {MixinType} mixinType - The type of injection.
     * @param {string[]} accessors  - A list of strings to evaluate to access private variables.
     * @param {function} func       - The new function to be injected.
     */
    registerSimWorkerClassMixin(scope, path, mixinType, accessors, func, extraOptinonal) {
        this.registerClassMixin("HB.prototype", "submitLeaderboard", MixinType.OVERRIDE, [], (e, t, n, i, r, a) => { });
        __classPrivateFieldGet(this, _PolyModLoader_simWorkerClassMixins, "f").push({
            scope: scope,
            path: path,
            mixinType: mixinType,
            accessors: accessors,
            funcString: typeof func === "function" ? func.toString() : func,
            func2Sstring: extraOptinonal ? extraOptinonal.toString() : null
        });
    }
    /**
     * Inject mixin with target function name defined by {@link path}.
     * This only injects functions in `simulation_worker.bundle.js`.
     *
     * @param {string} path         - The path of the function which the mixin targets.
     * @param {MixinType} mixinType - The type of injection.
     * @param {string[]} accessors  - A list of strings to evaluate to access private variables.
     * @param {function} func       - The new function to be injected.
     */
    registerSimWorkerFuncMixin(path, mixinType, accessors, func, extraOptinonal) {
        this.registerClassMixin("HB.prototype", "submitLeaderboard", MixinType.OVERRIDE, [], (e, t, n, i, r, a) => { });
        __classPrivateFieldGet(this, _PolyModLoader_simWorkerFuncMixins, "f").push({
            path: path,
            mixinType: mixinType,
            accessors: accessors,
            funcString: typeof func === "function" ? func.toString() : func,
            func2Sstring: extraOptinonal ? extraOptinonal.toString() : null
        });
    }
}
_PolyModLoader_polyVersion = new WeakMap(), _PolyModLoader_allMods = new WeakMap(), _PolyModLoader_physicsTouched = new WeakMap(), _PolyModLoader_simWorkerClassMixins = new WeakMap(), _PolyModLoader_simWorkerFuncMixins = new WeakMap(), _PolyModLoader_settings = new WeakMap(), _PolyModLoader_settingConstructor = new WeakMap(), _PolyModLoader_defaultSettings = new WeakMap(), _PolyModLoader_latestSetting = new WeakMap(), _PolyModLoader_keybindings = new WeakMap(), _PolyModLoader_defaultBinds = new WeakMap(), _PolyModLoader_bindConstructor = new WeakMap(), _PolyModLoader_latestBinding = new WeakMap(), _PolyModLoader_polyModUrls = new WeakMap(), _PolyModLoader_instances = new WeakSet(), _PolyModLoader_applySettings = function _PolyModLoader_applySettings() {
    this.registerClassMixin(`${Variables.SoundClass}.prototype`, "load", MixinType.INSERT, `ml(this, nl, "f").addResource(),`, `ActivePolyModLoader.soundManager = new SoundManager(this);`);
    this.registerClassMixin(`${Variables.SettingsClass}.prototype`, "defaultSettings", MixinType.INSERT, `() {`, `ActivePolyModLoader.settingClass = this;${__classPrivateFieldGet(this, _PolyModLoader_settingConstructor, "f").join("")}`);
    this.registerClassMixin(`${Variables.SettingsClass}.prototype`, "defaultSettings", MixinType.INSERT, `[${Variables.SettingEnum}.CheckpointVolume, "1"]`, __classPrivateFieldGet(this, _PolyModLoader_defaultSettings, "f").join(""));
    this.registerFuncMixin(Variables.SettingUIFunction, MixinType.REPLACEBETWEEN, `MR(this, iR, "m", bR).call(this, MR(this, aR, "f").get("Controls")),`, `MR(this, iR, "m", bR).call(this, MR(this, aR, "f").get("Controls")),`, `${__classPrivateFieldGet(this, _PolyModLoader_settings, "f").join("")}MR(this, iR, "m", bR).call(this, MR(this, aR, "f").get("Controls")),`);
}, _PolyModLoader_applyKeybinds = function _PolyModLoader_applyKeybinds() {
    this.registerClassMixin(`${Variables.SettingsClass}.prototype`, "defaultKeyBindings", MixinType.INSERT, `() {`, `${__classPrivateFieldGet(this, _PolyModLoader_bindConstructor, "f").join("")};`);
    this.registerClassMixin(`${Variables.SettingsClass}.prototype`, "defaultKeyBindings", MixinType.INSERT, `[${Variables.KeybindEnum}.SpectatorSpeedModifier, ["ShiftLeft", "ShiftRight"]]`, __classPrivateFieldGet(this, _PolyModLoader_defaultBinds, "f").join(""));
    this.registerFuncMixin(Variables.SettingUIFunction, MixinType.REPLACEBETWEEN, ` );`, ` );`, `),${__classPrivateFieldGet(this, _PolyModLoader_keybindings, "f").join("")}null;`);
    this.registerClassMixin(`${Variables.EditorClass}.prototype`, "update", MixinType.INSERT, `y_(this, DM, b_(this, bS, "m", f_).call(this), "f"),`, `ActivePolyModLoader.editorExtras.construct(this),`);
}, _PolyModLoader_preInitPML = function _PolyModLoader_preInitPML() {
    this.registerFuncMixin("polyInitFunction", MixinType.INSERT, Variables.PreInitMixin, `;ActivePolyModLoader.popUpClass = ${Variables.PolyInitPopupClass};`);
};
const ActivePolyModLoader = new PolyModLoader("0.5.1");
export { ActivePolyModLoader };
