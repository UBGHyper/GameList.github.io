/**
 * Base class for all polytrack mods. Mods should export an instance of their mod class named `polyMod` in their main file.
 */
export class PolyMod {
    /**
     * The author of the mod.
     * 
     * @type {string}
     */
    get author() {
        return this.modAuthor;
    }
    modAuthor: string;
    /**
     * The mod ID.
     * 
     * @type {string}
     */
    get id() {
        return this.modID;
    }
    modID: string;
    /**
     * The mod name.
     * 
     * @type {string}
     */
    get name() {
        return this.modName;
    }
    modName: string;
    /**
     * The mod version.
     * 
     * @type {string}
     */
    get version() {
        return this.modVersion;
    }
    modVersion: string;
    /**
     * The the mod's icon file URL.
     * 
     * @type {string}
     */
    get iconSrc() {
        return this.IconSrc;
    }
    IconSrc: string;
    set iconSrc(src) {
        this.IconSrc = src;
    }
    loaded: boolean = false;
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
    modBaseUrl: string;
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
    touchingPhysics: boolean;
    /**
     * Other mods that this mod depends on.
     */
    get dependencies() {
        return this.modDependencies;
    }
    modDependencies: Array<{ version: string, id: string }>
    get descriptionUrl() {
        return this.modDescription;
    }
    modDescription: string;
    /**
     * Whether the mod is saved as to always fetch latest version (`true`)
     * or to fetch a specific version (`false`, with version defined by {@link PolyMod.version}).
     * 
     * @type {boolean}
     */
    get savedLatest() {
        return this.latestSaved;
    }
    latestSaved: boolean;
    set savedLatest(latest) {
        this.latestSaved = latest;
    }
    get initialized() {
        return this.modInitialized;
    }
    modInitialized: boolean;
    set initialized(initState) {
        this.modInitialized = initState;
    }
    polyVersion: Array<string>;
    assetFolder: string;
    applyManifest = (manifest: { polymod: { name: string, author: string, version: string, id: string, targets: Array<string> }, dependencies: Array<{ id: string, version: string }> }) => {
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
    }
    /**
     * Function to run during initialization of mods. Note that this is called *before* polytrack itself is loaded, 
     * but *after* everything has been declared.
     * 
     * @param {PolyModLoader} pmlInstance - The instance of {@link PolyModLoader}.
     */
    init = (pmlInstance: PolyModLoader) => { }
    /**
     * Function to run after all mods and polytrack have been initialized and loaded.
     */
    postInit = () => { }
    /**
     * Function to run before initialization of `simulation_worker.bundle.js`.
     */
    simInit = () => { }
}

/**
 * This class is used in {@link PolyModLoader}'s register mixin functions to set where functions should be injected into the target function.
 */
export enum MixinType {
    /**
     * Inject at the start of the target function.
     */
    HEAD = 0,
    /**
     * Inject at the end of the target function.
     */
    TAIL = 1,
    /**
     * Override the target function with the new function.
     */
    OVERRIDE = 2,
    /**
     * Insert code after a given token.
     */
    INSERT = 3,
    /**
     * Replace code between 2 given tokens. Inclusive.
     */
    REPLACEBETWEEN = 5,
    /**
     * Remove code between 2 given tokens. Inclusive.
     */
    REMOVEBETWEEN = 6,
    /**
     * Inserts code after a given token, but class wide.
     */
    CLASSINSERT = 8,
    /**
     * Replace code between 2 given tokens, but class wide. Inclusive.
     */
    CLASSREMOVE = 4,
    /**
     * Remove code between 2 given tokens, but class wide. Inclusive.
     */
    CLASSREPLACE = 7
}

export enum SettingType {
    BOOL = "boolean",
    SLIDER = "slider",
    CUSTOM = "custom"
}


enum Variables {
    PreInitMixin = "D = 0",
    PolyInitPopupClass = "E",
    SoundClass = "gl",
    SettingsClass = "hz",
    SettingEnum = "el",
    KeybindEnum = "mk",
    SettingUIFunction = "yR",
    EditorClass = "A_",
}

export class SoundManager {
    #soundClass: any;
    constructor(soundClass: any) {
        this.#soundClass = soundClass;
    }
    registerSound(id: string, url: string) {
        this.#soundClass.load(id, url);
    }
    playSound(id: string, gain: number) {
        const e = this.#soundClass.getBuffer(id);
        if (null != e && null != this.#soundClass.context && null != this.#soundClass.destinationSfx) {
            const t = this.#soundClass.context.createBufferSource();
            t.buffer = e;
            const n = this.#soundClass.context.createGain();
            n.gain.value = gain,
                t.connect(n),
                n.connect(this.#soundClass.destinationSfx),
                t.start(0)
        }
    }
    playUIClick() {
        const e = this.#soundClass.getBuffer("click");
        if (null != e && null != this.#soundClass.context && null != this.#soundClass.destinationSfx) {
            const t = this.#soundClass.context.createBufferSource();
            t.buffer = e;
            const n = this.#soundClass.context.createGain();
            n.gain.value = .0075,
                t.connect(n),
                n.connect(this.#soundClass.destinationSfx),
                t.start(0)
        }
    }
}

export class EditorExtras {
    #editorClass: any;
    pml: PolyModLoader;
    #latestCategory: number = 8;
    #latestBlock: number = 155;
    #categoryDefaults: Array<string> = []
    ignoredBlocks: Array<number> = [];
    #simBlocks: Array<string> = [];
    #modelUrls: Array<string> = ["models/blocks.glb", "models/pillar.glb", "models/planes.glb", "models/road.glb", "models/road_wide.glb", "models/signs.glb", "models/wall_track.glb"];
    constructor(pml: PolyModLoader) {
        this.pml = pml;
    }
    construct(editorClass: any) {
        this.#editorClass = editorClass;
    }

    blockNumberFromId(id): number {
        return this.pml.getFromPolyTrack(`eA.${id}`);
    }

    get getSimBlocks() {
        return [...this.#simBlocks];
    }

    get trackEditorClass() {
        return this.#editorClass;
    }

    registerModel(url: string) {
        this.#modelUrls.push(url);
    }

    registerCategory(id: string, defaultId: string) {
        this.#latestCategory++;
        this.pml.getFromPolyTrack(`KA[KA.${id} = ${this.#latestCategory}]  =  "${id}"`);
        this.#simBlocks.push(`F_[F_.${id} = ${this.#latestCategory}]  =  "${id}"`);
        this.#categoryDefaults.push(`case KA.${id}:n = this.getPart(eA.${defaultId});break;`)
    }

    registerBlock(id: string, categoryId: string, checksum: string, sceneName: string, modelName: string, overlapSpace: Array<Array<Array<number>>>, extraSettings?: { ignoreOnExport?: boolean, specialSettings?: { type: string, center: Array<number>, size: Array<number> } }) {
        this.#latestBlock++;
        this.pml.getFromPolyTrack(`eA[eA.${id} = ${this.#latestBlock}]  =  "${id}"`);
        this.pml.getFromPolyTrack(`ab.push(new rb("${checksum}",KA.${categoryId},eA.${id},[["${sceneName}", "${modelName}"]],nb,${JSON.stringify(overlapSpace)}${extraSettings && extraSettings.specialSettings ? `, { type: XA.${extraSettings.specialSettings.type}, center: ${JSON.stringify(extraSettings.specialSettings.center)}, size: ${JSON.stringify(extraSettings.specialSettings.size)}}` : ""}))`);
        this.pml.getFromPolyTrack(`for (const e of ab) {if (!sb.has(e.id)){ sb.set(e.id, e);}; }
      `);
        if (extraSettings && extraSettings.ignoreOnExport) {
            this.ignoredBlocks.push(this.blockNumberFromId(id));
            return;
        }
        this.#simBlocks.push(`mu[mu.${id} = ${this.#latestBlock}]  =  "${id}"`);
        this.#simBlocks.push(`j_.push(new X_("${checksum}",F_.${categoryId},mu.${id},[["${sceneName}", "${modelName}"]],G_,${JSON.stringify(overlapSpace)}${extraSettings && extraSettings.specialSettings ? `, { type: Jh.${extraSettings.specialSettings.type}, center: ${JSON.stringify(extraSettings.specialSettings.center)}, size: ${JSON.stringify(extraSettings.specialSettings.size)}}` : ""}))`);
    }
    init() {
        this.pml.registerClassMixin("eU.prototype",
            "init", MixinType.REPLACEBETWEEN,
            `((a = [`,
            ` ]),`,`((a = ["${this.#modelUrls.join('", "')}"]),`);
        // this.pml.registerFuncMixin("xb", MixinType.INSERT, `for (const [r,a] of Eb(this, Ab, "f")) {`, `if (ActivePolyModLoader.editorExtras.ignoredBlocks.includes(r)) {continue;};`);
        // this.pml.registerClassMixin("GN.prototype", "getCategoryMesh", MixinType.INSERT, "break;", `${this.#categoryDefaults.join("")}`);
    }
}

export class PolyModLoader {
    #polyVersion: string;
    #allMods: Array<PolyMod>;
    editorExtras: EditorExtras;
    #physicsTouched: boolean;
    #simWorkerClassMixins: Array<{
        scope: string,
        path: string,
        mixinType: MixinType,
        accessors: Array<string> | string,
        funcString: string,
        func2Sstring: string | null
    }>;
    #simWorkerFuncMixins: Array<{
        path: string,
        mixinType: MixinType,
        accessors: Array<string> | string,
        funcString: string,
        func2Sstring: string | null
    }>;

    #settings: Array<string>
    #settingConstructor: Array<string>
    #defaultSettings: Array<string>
    #latestSetting: number;

    #keybindings: Array<string>
    #defaultBinds: Array<string>
    #bindConstructor: Array<string>
    #latestBinding: number;

    constructor(polyVersion: string) {
        /** @type {string} */
        this.#polyVersion = polyVersion;
        /** @type {PolyMod[]} */
        this.#allMods = [];
        /** @type {boolean} */
        this.#physicsTouched = false;
        /** 
         * @type {{
         *      scope: string,
         *      path: string,
         *      mixinType: MixinType,
         *      accessors: string[],
         *      funcString: string,
         *  }}
         */
        this.#simWorkerClassMixins = [];
        /** 
         * @type {{
        *      path: string,
        *      mixinType: MixinType,
        *      accessors: string[],
        *      funcString: string,
        *  }}
        */
        this.#simWorkerFuncMixins = [];

        this.#settings = [];
        this.#settingConstructor = [];
        this.#defaultSettings = [];
        this.#latestSetting = 18;

        this.#keybindings = []
        this.#defaultBinds = []
        this.#bindConstructor = []
        this.#latestBinding = 31
        this.editorExtras = new EditorExtras(this);
    }
    get polyVersion() {
        return this.#polyVersion; // Why is this even private lmfao
    }
    localStorage: Storage
    #polyModUrls: Array<{ base: string, version: string, loaded: boolean }>
    initStorage(localStorage: Storage) {
        /** @type {Storage} */
        this.localStorage = localStorage;
        this.#polyModUrls = this.getPolyModsStorage();
    }
    async importMods() {
        // Mod loading UI
        const ui = document.getElementById("ui")!;
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

        const total = this.#polyModUrls.length;
        const current = {
            num: 0,
            text: undefined,
            url: "",
            version: "",

            totalParts: 0,
            part: 0,
        };

        function updateBar(num: number) {
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
        function startImportMod(url: string, version: string) {
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
        function finishFetchLatest(version: string) {
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
        function startFetchModMain(js: string) {
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
        for (let polyModObject of this.#polyModUrls) {
            startImportMod(polyModObject.base, polyModObject.version);

            let latest = false;
            current.totalParts = 2;
            if (polyModObject.version === "latest") {
                current.totalParts = 3;
                startFetchLatest();
                try {
                    const latestFile = await fetch(`${polyModObject.base}/latest.json`).then(r => r.json());
                    polyModObject.version = latestFile[this.#polyVersion];
                    latest = true;
                } catch (err) {
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
                    if (this.getMod(mod.id)) alert(`Duplicate mod detected: ${mod.name}`);
                    newMod.applyManifest(manifestFile);
                    newMod.baseUrl = polyModObject.base;
                    newMod.applyManifest = (nothing) => { console.warn("Can't apply manifest after initialization!") }
                    newMod.savedLatest = latest;
                    newMod.iconSrc = `${polyModUrl}/icon.png`;
                    if (polyModObject.loaded) {
                        newMod.setLoaded = true;
                        if (newMod.touchesPhysics) {
                            this.#physicsTouched = true;
                            this.registerClassMixin("HB.prototype", "submitLeaderboard", MixinType.OVERRIDE, [], (e, t, n, i, r, a) => { })
                        }
                    }
                    this.#allMods.push(newMod);
                } catch (err) {
                    errorCurrent();
                    alert(`Mod ${mod.name} failed to load.`);
                    console.error("Error in loading mod:", err);
                }
            } catch (err) {
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
            this.#polyModUrls = JSON.parse(polyModsStorage);
        } else {
            this.#polyModUrls = [
                {
                    "base": "https://pml.crjakob.com/polytrackmods/PolyModLoader/pmlcore",
                    "version": "latest",
                    "loaded": true
                }
            ];
            this.localStorage.setItem("polyMods", JSON.stringify(this.#polyModUrls));
        }
        return this.#polyModUrls;
    }
    serializeMod(mod: PolyMod) {
        return { "base": mod.baseUrl, "version": mod.savedLatest ? "latest" : mod.version, "loaded": mod.isLoaded || false };
    }
    saveModsToLocalStorage() {
        let savedMods: Array<{ base: string, version: string, loaded: boolean }> = [];
        for (let mod of this.#allMods) {
            const modSerialized = this.serializeMod(mod);
            savedMods.push(modSerialized);
        }
        this.#polyModUrls = savedMods;
        this.localStorage.setItem("polyMods", JSON.stringify(this.#polyModUrls));
    }
    /**
     * Reorder a mod in the internal list to change its priority in mod loading.
     * 
     * @param {PolyMod} mod  - The mod to reorder.
     * @param {number} delta - The amount to reorder it by. Positive numbers decrease priority, negative numbers increase priority.
     */
    reorderMod(mod: PolyMod, delta: number) {
        if (!mod) return;
        if (mod.id === "pmlcore") {
            return;
        }
        const currentIndex = this.#allMods.indexOf(mod);
        if ((currentIndex === 1) || delta > 0) return;
        if (currentIndex === null || currentIndex === undefined) {
            alert("This mod isn't loaded");
            return;
        }
        const temp = this.#allMods[currentIndex + delta];
        this.#allMods[currentIndex + delta] = this.#allMods[currentIndex];
        this.#allMods[currentIndex] = temp;
        this.saveModsToLocalStorage();
    }
    /**
     * Add a mod to the internal mod list. Added mod is given least priority.
     * 
     * @param {{base: string, version: string, loaded: bool}} polyModObject - The mod's JSON representation to add.
     */
    async addMod(polyModObject: { base: string, version: string, loaded: boolean }, autoUpdate: boolean) {
        let latest = false;
        if (polyModObject.version === "latest") {
            try {
                const latestFile = await fetch(`${polyModObject.base}/latest.json`).then(r => r.json());
                polyModObject.version = latestFile[this.#polyVersion];
                if (autoUpdate) {
                    latest = true;
                }
            } catch {
                alert(`Mod with URL ${polyModObject.base} does not have a version which supports PolyTrack v${this.#polyVersion}.`);
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
            if (mod.targets.indexOf(this.#polyVersion) === -1) {
                alert(
                    `Mod target version does not match polytrack version!
                    Note: ${mod.name} version ${polyModObject.version} targets polytrack versions ${mod.targets.join(', ')}, but current polytrack version is ${this.#polyVersion}.`
                );
                return;
            }
            try {
                const modImport = await import(`${polyModUrl}/${mod.main}`);
                let newMod = modImport.polyMod;
                newMod.iconSrc = `${polyModUrl}/icon.png`;
                mod.version = polyModObject.version;
                newMod.applyManifest(manifestFile);
                newMod.baseUrl = polyModObject.base;
                newMod.applyManifest = (nothing) => { console.warn("Can't apply manifest after initialization!") }
                newMod.savedLatest = latest;
                this.#allMods.push(newMod);
                this.saveModsToLocalStorage();
                return this.getMod(newMod.id);
            } catch (err) {
                alert("Something went wrong importing this mod!");
                console.error("Error in importing mod:", err);
                return;
            }
        } catch (err) {
            alert(`Couldn't find mod manifest for "${polyModObject.base}".`);
            console.error("Error in getting mod manifest:", err);
        }
    }
    registerSettingCategory(name: string) {
        this.#settings.push(`MR(this, iR, "m", bR).call(this, MR(this, aR, "f").get("${name}")),`);
    }
    registerBindCategory(name: string) {
        this.#keybindings.push(`MR(this, iR, "m", AR).call(this, MR(this, aR, "f").get("${name}")),`);
    }
    registerSetting(name: string, id: string, type: SettingType, defaultOption: any, optionsOptional?: Array<{ title: string, value: string }>) {
        this.#latestSetting++
        this.#settingConstructor.push(`${Variables.SettingEnum}[${Variables.SettingEnum}.${id} = ${this.#latestSetting}] = "${id}";`);
        if (type === "boolean") {
            this.#defaultSettings.push(`, [${Variables.SettingEnum}.${id}, "${defaultOption ? "true" : "false"}"]`)
            this.#settings.push(`
                MR(this, iR, 'm', xR).call(
                this,
                MR(this, aR, 'f').get('${name}'),
                [
                    { title: MR(this, aR, 'f').get('Off'), value: 'false' },
                    { title: MR(this, aR, 'f').get('On'), value: 'true' }
                ],
                ${Variables.SettingEnum}.${id}
                ),`)
        } else if (type === "slider") {
            this.#defaultSettings.push(`, [${Variables.SettingEnum}.${id}, "${defaultOption}"]`)
            this.#settings.push(`
                 MR(this, iR, 'm', kR).call(
              this,
              MR(this, aR, 'f').get('${name}'),
              ${Variables.SettingEnum}.${id}
            ),`)
        } else if (type === "custom") {
            this.#defaultSettings.push(`, [${Variables.SettingEnum}.${id}, "${defaultOption}"]`)
            this.#settings.push(`
                MR(this, iR, 'm', xR).call(
                this,
                MR(this, aR, 'f').get('${name}'),
                ${JSON.stringify(optionsOptional)},
                ${Variables.SettingEnum}.${id}
                ),`)
        }
    }
    settingClass: any;
    soundManager: SoundManager;
    registerKeybind(name: string, id: string, event: string, defaultBind: string, secondBindOptional: string | null, callback: Function) {
        this.#keybindings.push(`MR(this, iR, "m", ER).call(this, MR(this, aR, "f").get("${name}"), ${Variables.KeybindEnum}.${id}),`);
        this.#bindConstructor.push(`${Variables.KeybindEnum}[${Variables.KeybindEnum}.${id} = ${this.#latestBinding}] = "${id}";`);
        this.#defaultBinds.push(`, [${Variables.KeybindEnum}.${id}, ["${defaultBind}", ${secondBindOptional ? `"${secondBindOptional}"` : "null"}]]`);
        this.#latestBinding++;
        window.addEventListener(event, (e) => {
            if (this.settingClass.checkKeyBinding(e, this.getFromPolyTrack(`${Variables.KeybindEnum}.${id}`))) {
                callback(e)
            }
        });
    }
    #applySettings() {
        this.registerClassMixin(`${Variables.SoundClass}.prototype`, "load", MixinType.INSERT, `ml(this, nl, "f").addResource(),`, `ActivePolyModLoader.soundManager = new SoundManager(this);`)
        this.registerClassMixin(`${Variables.SettingsClass}.prototype`, "defaultSettings", MixinType.INSERT, `() {`, `ActivePolyModLoader.settingClass = this;${this.#settingConstructor.join("")}`)
        this.registerClassMixin(`${Variables.SettingsClass}.prototype`, "defaultSettings", MixinType.INSERT,`[${Variables.SettingEnum}.CheckpointVolume, "1"]`, this.#defaultSettings.join(""))
        this.registerFuncMixin(Variables.SettingUIFunction, MixinType.REPLACEBETWEEN, `MR(this, iR, "m", bR).call(this, MR(this, aR, "f").get("Controls")),`, `MR(this, iR, "m", bR).call(this, MR(this, aR, "f").get("Controls")),`, `${this.#settings.join("")}MR(this, iR, "m", bR).call(this, MR(this, aR, "f").get("Controls")),`)
    }

    #applyKeybinds() {
        this.registerClassMixin(`${Variables.SettingsClass}.prototype`, "defaultKeyBindings", MixinType.INSERT, `() {`, `${this.#bindConstructor.join("")};`)
        this.registerClassMixin(`${Variables.SettingsClass}.prototype`, "defaultKeyBindings", MixinType.INSERT, `[${Variables.KeybindEnum}.SpectatorSpeedModifier, ["ShiftLeft", "ShiftRight"]]`, this.#defaultBinds.join(""))
        this.registerFuncMixin(Variables.SettingUIFunction, MixinType.REPLACEBETWEEN, ` );`,  ` );`, `),${this.#keybindings.join("")}null;`);
        this.registerClassMixin(`${Variables.EditorClass}.prototype`, "update", MixinType.INSERT, `y_(this, DM, b_(this, bS, "m", f_).call(this), "f"),`, `ActivePolyModLoader.editorExtras.construct(this),`);
    }
    getSetting(id: string) {
        return this.getFromPolyTrack(`ActivePolyModLoader.settingClass.getSetting(${Variables.SettingEnum}.${id})`);
    }
    registerSoundOverride(id: string, url: string) {
        this.registerClassMixin(`${Variables.SoundClass}.prototype`, "load", MixinType.INSERT, `ml(this, nl, "f").addResource(),`, `
            null;
            if(e === "${id}") {
                t = ["${url}"];
            }`)
    }
    /**
     * Remove a mod from the internal list.
     * 
     * @param {PolyMod} mod - The mod to remove.
     */
    removeMod(mod) {
        if (!mod) return;
        if (mod.id === "pmlcore") {
            return;
        }
        const index = this.#allMods.indexOf(mod);
        if (index > -1) {
            this.#allMods.splice(index, 1);
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
        if (!mod) return;
        if (mod.id === "pmlcore") {
            return;
        }
        mod.loaded = state;
        this.saveModsToLocalStorage();
    }
    popUpClass: any;
    #preInitPML() {
        this.registerFuncMixin("polyInitFunction", MixinType.INSERT, Variables.PreInitMixin, `;ActivePolyModLoader.popUpClass = ${Variables.PolyInitPopupClass};`)
    }
    initMods() {
        this.#preInitPML();
        let initList: Array<string> = []
        for (let polyMod of this.#allMods) {
            if (polyMod.isLoaded)
                initList.push(polyMod.id);
        }
        if (initList.length === 0) return; // no mods to initialize lol
        let allModsInit = false;
        while (!allModsInit) {
            let currentMod: PolyMod | undefined = this.getMod(initList[0]);
            if (!currentMod)
                continue;
            console.log(initList[0]);
            let initCheck = true;
            for (let dependency of currentMod.dependencies) {
                let curDependency = this.getMod(dependency.id)
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
                } catch (err) {
                    alert(`Mod ${currentMod.name} failed to initialize and will be unloaded.`);
                    console.error("Error in initializing mod:", err);
                    this.setModLoaded(currentMod, false);
                    initList.splice(0, 1);
                }
            }
            if (initList.length === 0)
                allModsInit = true;
        }
        this.#applySettings();
        this.#applyKeybinds();
        this.editorExtras.init();
    }
    postInitMods() {
        for (let polyMod of this.#allMods) {
            if (polyMod.isLoaded) {
                try {
                    polyMod.postInit();
                } catch (err) {
                    alert(`Mod ${polyMod.name} failed to post initialize and will be unloaded.`);
                    console.error("Error in post initializing mod:", err);
                    this.setModLoaded(polyMod, false);
                }
            }
        }
    }
    simInitMods() {
        for (let polyMod of this.#allMods) {
            if (polyMod.isLoaded) polyMod.simInit();
        }
    }
    /**
     * Access a mod by its mod ID.
     * 
     * @param   {string} id - The ID of the mod to get
     * @returns {PolyMod}   - The requested mod's object.
     */
    getMod(id) {
        for (let polyMod of this.#allMods) {
            if (polyMod.id == id) return polyMod;
        }
    }
    /**
     * Get the list of all mods.
     * 
     * @type {PolyMod[]}
     */
    getAllMods() {
        return this.#allMods;
    }
    /**
     * Whether uploading runs to leaderboard is invalid or not.
     */
    get lbInvalid() {
        return this.#physicsTouched;
    }
    get simWorkerClassMixins() {
        return [...this.#simWorkerClassMixins];
    }
    get simWorkerFuncMixins() {
        return [...this.#simWorkerFuncMixins];
    }
    getFromPolyTrack = (path: string): any => { }
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
    registerClassMixin = (scope: string, path: string, mixinType: MixinType, accessors: string | Array<string>, func: Function | string, extraOptinonal?: Function | string) => { }
    /**
     * Inject mixin with target function name defined by {@link path}.
     * This only injects functions in `main.bundle.js`.
     * 
     * @param {string} path         - The path of the function which the mixin targets.
     * @param {MixinType} mixinType - The type of injection.
     * @param {string[]} accessors  - A list of strings to evaluate to access private variables.
     * @param {function} func       - The new function to be injected.
     */
    registerFuncMixin = (path: string, mixinType: MixinType, accessors: string | Array<string>, func: Function | string, extraOptinonal?: Function | string) => { }
    registerClassWideMixin = (path: string, mixinType: MixinType, firstToken: string, funcOrSecondToken: string | Function, funcOptional?: Function | string) => { }
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
    registerSimWorkerClassMixin(scope: string, path: string, mixinType: MixinType, accessors: string | Array<string>, func: Function | string, extraOptinonal?: Function | string) {
        this.registerClassMixin("HB.prototype", "submitLeaderboard", MixinType.OVERRIDE, [], (e, t, n, i, r, a) => { })
        this.#simWorkerClassMixins.push({
            scope: scope,
            path: path,
            mixinType: mixinType,
            accessors: accessors,
            funcString: typeof func === "function" ? func.toString() : func,
            func2Sstring: extraOptinonal ? extraOptinonal.toString() : null
        })
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
    registerSimWorkerFuncMixin(path: string, mixinType: MixinType, accessors: string | Array<string>, func: Function | string, extraOptinonal?: Function | string) {
        this.registerClassMixin("HB.prototype", "submitLeaderboard", MixinType.OVERRIDE, [], (e, t, n, i, r, a) => { })
        this.#simWorkerFuncMixins.push({
            path: path,
            mixinType: mixinType,
            accessors: accessors,
            funcString: typeof func === "function" ? func.toString() : func,
            func2Sstring: extraOptinonal ? extraOptinonal.toString() : null
        })
    }
}

const ActivePolyModLoader = new PolyModLoader("0.5.1");

export { ActivePolyModLoader }
