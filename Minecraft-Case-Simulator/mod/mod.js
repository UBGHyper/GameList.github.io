/* ================================================================
   Minecraft Case Simulator — Mod v1.0
   Adds: 5 new cases, spinning reel, rebirths, achievements,
         upgrade shop, daily gem bonus
   All state persisted to localStorage under key 'mcmod_v1'.
   ================================================================ */
'use strict';
(function () {

  // ─────────────────────────── CONSTANTS ────────────────────────────

  const SAVE_KEY = 'mcmod_v1';

  const R_COLOR = ['#999', '#55ff55', '#5599ff', '#cc44ff', '#ffaa00'];
  const R_NAME  = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

  // ─────────────────────────── CASE DATA ────────────────────────────

  const CASES = [
    {
      id: 'nether', name: 'Nether Case', price: 15,
      icon: '🔥', locked: false,
      lockMsg: '',
      items: [
        { id: 'netherrack',      name: 'Netherrack',      icon: '🧱', r: 0, w: 900, v: [5,  15]  },
        { id: 'soul-sand',       name: 'Soul Sand',        icon: '🏖️', r: 0, w: 850, v: [8,  18]  },
        { id: 'nether-quartz',   name: 'Nether Quartz',    icon: '🪨', r: 0, w: 750, v: [10, 22]  },
        { id: 'gravel',          name: 'Gravel',           icon: '⬛', r: 0, w: 680, v: [5,  12]  },
        { id: 'nether-brick',    name: 'Nether Brick',     icon: '🧱', r: 1, w: 440, v: [25, 48]  },
        { id: 'basalt',          name: 'Basalt',           icon: '🗿', r: 1, w: 400, v: [30, 52]  },
        { id: 'nether-wart',     name: 'Nether Wart',      icon: '🍄', r: 1, w: 340, v: [35, 62]  },
        { id: 'blaze-powder',    name: 'Blaze Powder',     icon: '✨', r: 2, w: 175, v: [80, 150] },
        { id: 'magma-cream',     name: 'Magma Cream',      icon: '🟠', r: 2, w: 145, v: [100,185] },
        { id: 'nether-gold-ore', name: 'Nether Gold Ore',  icon: '🟡', r: 2, w: 115, v: [150,260] },
        { id: 'ghast-tear',      name: 'Ghast Tear',       icon: '💧', r: 3, w: 58,  v: [400,720] },
        { id: 'blaze-rod',       name: 'Blaze Rod',        icon: '🕯️', r: 3, w: 48,  v: [500,920] },
        { id: 'wither-skull',    name: 'Wither Skull',     icon: '💀', r: 4, w: 20,  v: [2000,3600] },
        { id: 'netherite-ingot', name: 'Netherite Ingot',  icon: '🖤', r: 4, w: 11,  v: [4000,7200] },
      ]
    },
    {
      id: 'end', name: 'End Case', price: 25,
      icon: '🌌', locked: false,
      lockMsg: '',
      items: [
        { id: 'end-stone',     name: 'End Stone',      icon: '🟨', r: 0, w: 900, v: [10, 22]  },
        { id: 'purpur',        name: 'Purpur Block',   icon: '🟣', r: 0, w: 800, v: [15, 26]  },
        { id: 'chorus-flower', name: 'Chorus Flower',  icon: '🌸', r: 0, w: 740, v: [12, 24]  },
        { id: 'end-rod',       name: 'End Rod',        icon: '💡', r: 1, w: 450, v: [35, 68]  },
        { id: 'ender-pearl',   name: 'Ender Pearl',    icon: '🫧', r: 1, w: 400, v: [40, 72]  },
        { id: 'chorus-fruit',  name: 'Chorus Fruit',   icon: '🍇', r: 1, w: 370, v: [36, 62]  },
        { id: 'shulker-shell', name: 'Shulker Shell',  icon: '🐚', r: 2, w: 148, v: [180,330] },
        { id: 'end-crystal',   name: 'End Crystal',    icon: '💎', r: 2, w: 98,  v: [300,520] },
        { id: 'shulker-box',   name: 'Shulker Box',    icon: '📦', r: 3, w: 54,  v: [600,1050] },
        { id: 'dragon-head',   name: 'Dragon Head',    icon: '🐉', r: 3, w: 38,  v: [1200,2100] },
        { id: 'end-elytra',    name: 'Elytra',         icon: '🦋', r: 4, w: 17,  v: [4500,7800] },
        { id: 'dragon-egg',    name: 'Dragon Egg',     icon: '🥚', r: 4, w: 9,   v: [9000,16000] },
      ]
    },
    {
      id: 'mob', name: 'Mob Drops Case', price: 20,
      icon: '💀', locked: false,
      lockMsg: '',
      items: [
        { id: 'bone',              name: 'Bone',              icon: '🦴', r: 0, w: 950, v: [5,  13]  },
        { id: 'feather',           name: 'Feather',           icon: '🪶', r: 0, w: 900, v: [5,  13]  },
        { id: 'string',            name: 'String',            icon: '🧵', r: 0, w: 880, v: [5,  13]  },
        { id: 'gunpowder',         name: 'Gunpowder',         icon: '💣', r: 0, w: 790, v: [8,  16]  },
        { id: 'spider-eye',        name: 'Spider Eye',        icon: '👁️', r: 1, w: 445, v: [25, 48]  },
        { id: 'slimeball',         name: 'Slimeball',         icon: '🟢', r: 1, w: 415, v: [25, 48]  },
        { id: 'blaze-powder-mob',  name: 'Blaze Powder',      icon: '✨', r: 1, w: 375, v: [30, 58]  },
        { id: 'ender-pearl-mob',   name: 'Ender Pearl',       icon: '🫧', r: 2, w: 178, v: [80, 145] },
        { id: 'phantom-membrane',  name: 'Phantom Membrane',  icon: '👻', r: 2, w: 148, v: [100,188] },
        { id: 'dragons-breath',    name: "Dragon's Breath",   icon: '🐲', r: 3, w: 63,  v: [450,820] },
        { id: 'wither-rose',       name: 'Wither Rose',       icon: '🥀', r: 3, w: 48,  v: [600,1050] },
        { id: 'totem',             name: 'Totem of Undying',  icon: '🏺', r: 4, w: 17,  v: [3500,6200] },
        { id: 'mob-head',          name: 'Creeper Head',      icon: '👾', r: 4, w: 13,  v: [4000,7200] },
      ]
    },
    {
      id: 'enchanted', name: 'Enchanted Books', price: 30,
      icon: '📚', locked: false,
      lockMsg: '',
      items: [
        { id: 'feather-fall-1', name: 'Feather Falling I',  icon: '🪶', r: 0, w: 900, v: [10, 22]  },
        { id: 'knockback-1',    name: 'Knockback I',        icon: '💥', r: 0, w: 880, v: [8,  20]  },
        { id: 'smite-2',        name: 'Smite II',           icon: '⚡', r: 0, w: 860, v: [10, 22]  },
        { id: 'power-2',        name: 'Power II',           icon: '🏹', r: 1, w: 445, v: [35, 62]  },
        { id: 'efficiency-3',   name: 'Efficiency III',     icon: '⛏️', r: 1, w: 395, v: [40, 68]  },
        { id: 'fire-aspect-1',  name: 'Fire Aspect I',      icon: '🔥', r: 1, w: 375, v: [35, 62]  },
        { id: 'protection-3',   name: 'Protection III',     icon: '🛡️', r: 2, w: 178, v: [100,185] },
        { id: 'unbreaking-3',   name: 'Unbreaking III',     icon: '💎', r: 2, w: 155, v: [120,205] },
        { id: 'looting-3',      name: 'Looting III',        icon: '💰', r: 3, w: 68,  v: [450,820] },
        { id: 'fortune-3',      name: 'Fortune III',        icon: '🍀', r: 3, w: 53,  v: [600,1050] },
        { id: 'silk-touch',     name: 'Silk Touch',         icon: '🤍', r: 3, w: 48,  v: [700,1250] },
        { id: 'mending',        name: 'Mending',            icon: '💚', r: 4, w: 19,  v: [3000,5800] },
        { id: 'sharpness-5',    name: 'Sharpness V',        icon: '⚔️', r: 4, w: 14,  v: [3500,6200] },
      ]
    },
    {
      id: 'prestige', name: 'Prestige Case', price: 50,
      icon: '⭐', locked: true,
      lockMsg: 'Requires Rebirth 1',
      items: [
        { id: 'enc-apple',         name: 'Enchanted Apple',      icon: '🍎', r: 0, w: 800, v: [80,  155] },
        { id: 'ancient-debris',    name: 'Ancient Debris',       icon: '🟫', r: 0, w: 740, v: [100, 210] },
        { id: 'diamond-ore',       name: 'Diamond Ore',          icon: '💎', r: 1, w: 395, v: [200, 360] },
        { id: 'netherite-scrap',   name: 'Netherite Scrap',      icon: '🖤', r: 1, w: 345, v: [250, 420] },
        { id: 'ench-netherite-sw', name: 'Ench. Netherite Sword',icon: '⚔️', r: 2, w: 148, v: [600,1050] },
        { id: 'ench-elytra',       name: 'Ench. Elytra',         icon: '🦋', r: 2, w: 118, v: [800,1450] },
        { id: 'dragon-sword',      name: 'Dragon Sword',         icon: '🐉', r: 3, w: 53,  v: [2000,3600] },
        { id: 'rainbow-beacon',    name: 'Rainbow Beacon',       icon: '🌈', r: 3, w: 38,  v: [3000,5200] },
        { id: 'notch-apple',       name: "Notch's Apple",        icon: '🍏', r: 4, w: 14,  v: [8000,15500] },
        { id: 'dev-key',           name: "Developer's Key",      icon: '🔑', r: 4, w: 9,   v: [12000,21000] },
      ]
    },
  ];

  // ─────────────────────────── ACHIEVEMENTS ─────────────────────────

  const ACHIEVEMENTS = [
    { id: 'first_open',    icon: '🎰', name: 'First Try',        desc: 'Open your first mod case',              reward: 5,   check: s => s.stats.opened >= 1 },
    { id: 'ten_opens',     icon: '📦', name: 'Getting Started',  desc: 'Open 10 mod cases',                     reward: 10,  check: s => s.stats.opened >= 10 },
    { id: 'hundred_opens', icon: '🏆', name: 'Dedicated Opener', desc: 'Open 100 mod cases',                    reward: 50,  check: s => s.stats.opened >= 100 },
    { id: 'five_hundred',  icon: '🌟', name: 'Case Addict',      desc: 'Open 500 mod cases',                    reward: 200, check: s => s.stats.opened >= 500 },
    { id: 'first_leg',     icon: '⭐', name: 'Lucky!',           desc: 'Find your first Legendary item',         reward: 20,  check: s => s.stats.legendaries >= 1 },
    { id: 'five_leg',      icon: '👑', name: 'Golden Hoard',     desc: 'Find 5 Legendary items',                 reward: 75,  check: s => s.stats.legendaries >= 5 },
    { id: 'nether_10',     icon: '🔥', name: 'Nether Explorer',  desc: 'Open the Nether Case 10 times',          reward: 15,  check: s => (s.opened['nether']    || 0) >= 10 },
    { id: 'end_10',        icon: '🌌', name: 'End Traveler',     desc: 'Open the End Case 10 times',             reward: 25,  check: s => (s.opened['end']       || 0) >= 10 },
    { id: 'mob_10',        icon: '💀', name: 'Monster Hunter',   desc: 'Open the Mob Drops Case 10 times',       reward: 20,  check: s => (s.opened['mob']       || 0) >= 10 },
    { id: 'enchanted_10',  icon: '📚', name: 'Scholar',          desc: 'Open the Enchanted Books Case 10 times', reward: 30,  check: s => (s.opened['enchanted'] || 0) >= 10 },
    { id: 'rebirth_1',     icon: '🔄', name: 'Rebirth!',         desc: 'Complete your first rebirth',            reward: 100, check: s => s.rebirths >= 1 },
    { id: 'rebirth_5',     icon: '♾️', name: 'Born Again',       desc: 'Complete 5 rebirths',                    reward: 500, check: s => s.rebirths >= 5 },
    { id: 'buy_upg',       icon: '⬆️', name: 'Power Up',         desc: 'Buy any upgrade',                        reward: 10,  check: s => s.stats.upgsBought >= 1 },
    { id: 'earn_1k',       icon: '💎', name: 'Rich',             desc: 'Earn 1,000 gems total',                  reward: 25,  check: s => s.stats.gemsEarned >= 1000 },
    { id: 'earn_10k',      icon: '💰', name: 'Wealthy',          desc: 'Earn 10,000 gems total',                 reward: 100, check: s => s.stats.gemsEarned >= 10000 },
    { id: 'daily_7',       icon: '📅', name: 'Daily Devotee',    desc: 'Claim mod daily bonus 7 days in a row',  reward: 50,  check: s => s.daily.maxStreak >= 7 },
    { id: 'prestige_open', icon: '🌠', name: 'Elite',            desc: 'Open the Prestige Case once',            reward: 150, check: s => (s.opened['prestige']  || 0) >= 1 },
  ];

  // ─────────────────────────── UPGRADES ─────────────────────────────

  const UPGRADES = [
    { id: 'luck1',    icon: '🍀', name: 'Lucky Clover I',   desc: '+3% rare+ item chance in mod cases',  cost: 50,   req: null,     effect: 'luck',     val: 3  },
    { id: 'luck2',    icon: '🍀', name: 'Lucky Clover II',  desc: '+3% rare+ item chance (total +6%)',   cost: 150,  req: 'luck1',  effect: 'luck',     val: 3  },
    { id: 'luck3',    icon: '🍀', name: 'Lucky Clover III', desc: '+3% rare+ item chance (total +9%)',   cost: 300,  req: 'luck2',  effect: 'luck',     val: 3  },
    { id: 'luck4',    icon: '🍀', name: 'Lucky Clover IV',  desc: '+3% rare+ item chance (total +12%)',  cost: 600,  req: 'luck3',  effect: 'luck',     val: 3  },
    { id: 'luck5',    icon: '🍀', name: 'Lucky Clover V',   desc: '+3% rare+ item chance (total +15%)',  cost: 1000, req: 'luck4',  effect: 'luck',     val: 3  },
    { id: 'bulk',     icon: '📦', name: 'Bulk Opener',      desc: 'Unlocks "Open ×3" for mod cases',     cost: 200,  req: null,     effect: 'bulk',     val: 0  },
    { id: 'gemboost', icon: '🧲', name: 'Gem Magnet',       desc: 'All gem rewards +20%',                cost: 350,  req: null,     effect: 'gemboost', val: 20 },
    { id: 'discount', icon: '🏷️', name: 'Case Discount',    desc: 'Mod case prices -15%',                cost: 800,  req: null,     effect: 'discount', val: 15 },
  ];

  // ─────────────────────────── REBIRTH DATA ─────────────────────────

  const REBIRTH_REQ  = [500, 1500, 3000, 6000, 12000, 25000, 50000, 100000, 200000, 500000];
  const DAILY_GEMS   = [5, 8, 12, 15, 20, 25, 50];

  // ─────────────────────────── STATE ────────────────────────────────

  function defState() {
    return {
      gems:       50,
      inventory:  [],
      opened:     {},
      upgrades:   {},
      rebirths:   0,
      progress:   0,
      daily: { lastClaim: null, streak: 0, maxStreak: 0, dayIdx: 0 },
      achievements: {},
      stats: { opened: 0, legendaries: 0, gemsEarned: 50, upgsBought: 0 },
    };
  }

  let S = defState();

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (_) {}
  }

  function load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      S = merge(defState(), parsed);
    } catch (_) {}
  }

  function merge(base, over) {
    if (!over || typeof over !== 'object') return base;
    const out = Object.assign({}, base);
    for (const k of Object.keys(over)) {
      if (Array.isArray(over[k])) {
        out[k] = over[k];
      } else if (over[k] !== null && typeof over[k] === 'object') {
        out[k] = merge(base[k] || {}, over[k]);
      } else {
        out[k] = over[k];
      }
    }
    return out;
  }

  // ─────────────────────────── CALCULATIONS ─────────────────────────

  function luckBonus() {
    let pct = 0;
    UPGRADES.forEach(u => { if (u.effect === 'luck' && S.upgrades[u.id]) pct += u.val; });
    return pct / 100;
  }

  function gemMult() {
    let m = 1;
    if (S.upgrades['gemboost']) m += 0.20;
    m += S.rebirths * 0.10;
    return m;
  }

  function casePrice(base) {
    let disc = 0;
    if (S.upgrades['discount']) disc += 15;
    disc += Math.min(S.rebirths * 5, 40);
    return Math.max(1, Math.floor(base * (1 - disc / 100)));
  }

  function fmt(n) {
    if (n >= 1e6)  return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e4)  return (n / 1e3).toFixed(1) + 'k';
    return n.toLocaleString();
  }

  // ─────────────────────────── GAME LOGIC ───────────────────────────

  function pickItem(items) {
    const luck = luckBonus();
    const weighted = items.map(it => ({
      item: it,
      w: it.r >= 2 ? it.w * (1 + luck * (it.r - 1)) : it.w,
    }));
    let total = weighted.reduce((s, x) => s + x.w, 0);
    let rand = Math.random() * total;
    for (const x of weighted) { rand -= x.w; if (rand <= 0) return x.item; }
    return weighted[weighted.length - 1].item;
  }

  function earnGems(amount) {
    const actual = Math.round(amount * gemMult());
    S.gems += actual;
    S.stats.gemsEarned += actual;
    return actual;
  }

  function openCaseSingle(id) {
    const cd = CASES.find(c => c.id === id);
    if (!cd) return null;
    if (cd.locked && S.rebirths < 1) return null;
    const price = casePrice(cd.price);
    if (S.gems < price) return null;
    S.gems -= price;
    S.progress += price;
    S.opened[id] = (S.opened[id] || 0) + 1;
    S.stats.opened++;
    const item = pickItem(cd.items);
    const value = Math.round(item.v[0] + Math.random() * (item.v[1] - item.v[0]));
    const drop = { ...item, value };
    if (item.r === 4) S.stats.legendaries++;
    S.inventory.unshift(drop);
    if (S.inventory.length > 300) S.inventory.length = 300;
    return drop;
  }

  function sellItem(idx) {
    if (idx < 0 || idx >= S.inventory.length) return 0;
    const item = S.inventory.splice(idx, 1)[0];
    return earnGems(item.value);
  }

  function sellAll() {
    let total = 0;
    S.inventory.forEach(it => { total += it.value; });
    S.inventory = [];
    return earnGems(total);
  }

  function nextRebirthReq() {
    return REBIRTH_REQ[Math.min(S.rebirths, REBIRTH_REQ.length - 1)];
  }

  function canRebirth() {
    return S.rebirths < REBIRTH_REQ.length && S.progress >= nextRebirthReq();
  }

  function doRebirth() {
    if (!canRebirth()) return false;
    S.rebirths++;
    S.progress  = 0;
    S.inventory = [];
    S.opened    = {};
    S.gems      = Math.round(50 * (1 + S.rebirths * 0.5));
    checkAch();
    save();
    return true;
  }

  function canClaimDaily() {
    if (!S.daily.lastClaim) return true;
    const last = new Date(S.daily.lastClaim);
    const now  = new Date();
    return last.toDateString() !== now.toDateString();
  }

  function claimDaily() {
    if (!canClaimDaily()) return null;
    const now  = new Date();
    const last = S.daily.lastClaim ? new Date(S.daily.lastClaim) : null;
    let streak = S.daily.streak;
    if (last) {
      const days = Math.round((now - last) / 86400000);
      streak = days === 1 ? streak + 1 : 1;
    } else {
      streak = 1;
    }
    S.daily.streak    = streak;
    S.daily.maxStreak = Math.max(S.daily.maxStreak, streak);
    S.daily.lastClaim = now.toISOString();
    S.daily.dayIdx    = (S.daily.dayIdx % 7) + 1;
    const base   = DAILY_GEMS[(streak - 1) % 7];
    const earned = earnGems(base);
    checkAch();
    save();
    return earned;
  }

  function buyUpgrade(id) {
    const u = UPGRADES.find(x => x.id === id);
    if (!u) return false;
    if (S.upgrades[id])        return false;
    if (u.req && !S.upgrades[u.req]) return false;
    if (S.gems < u.cost)       return false;
    S.gems -= u.cost;
    S.upgrades[id] = true;
    S.stats.upgsBought++;
    checkAch();
    save();
    return true;
  }

  // ─────────────────────────── ACHIEVEMENTS ─────────────────────────

  function checkAch() {
    const unlocked = [];
    ACHIEVEMENTS.forEach(a => {
      if (!S.achievements[a.id] && a.check(S)) {
        S.achievements[a.id] = true;
        const earned = earnGems(a.reward);
        unlocked.push({ ...a, earned });
      }
    });
    if (unlocked.length) {
      save();
      unlocked.forEach((a, i) => setTimeout(() => showToast(a), i * 700));
    }
  }

  // ─────────────────────────── TOAST ────────────────────────────────

  function showToast(ach) {
    const el = document.createElement('div');
    el.className = 'mcmod-toast' + (ach.id === 'first_leg' || ach.id === 'five_leg' ? ' toast-legendary' : '');
    el.innerHTML =
      '<div class="toast-badge">Achievement Unlocked</div>' +
      '<div class="toast-name">' + ach.icon + ' ' + esc(ach.name) + '</div>' +
      '<div class="toast-reward">+' + fmt(ach.earned) + ' 💎 Gems</div>';
    const wrap = document.getElementById('mcmod-toasts');
    if (wrap) {
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 4200);
    }
  }

  function showGemToast(msg, amount) {
    const el = document.createElement('div');
    el.className = 'mcmod-toast';
    el.innerHTML =
      '<div class="toast-badge">Gems Earned</div>' +
      '<div class="toast-name">' + esc(msg) + '</div>' +
      '<div class="toast-reward">+' + fmt(amount) + ' 💎</div>';
    const wrap = document.getElementById('mcmod-toasts');
    if (wrap) {
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }
  }

  // ─────────────────────────── UI STATE ─────────────────────────────

  let activeTab    = 'cases';
  let activeCaseId = null;
  let reelBusy     = false;

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ─────────────────────────── BUILD DOM ────────────────────────────

  function init() {
    load();

    // Toast container
    const toasts = document.createElement('div');
    toasts.id = 'mcmod-toasts';
    document.body.appendChild(toasts);

    // FAB
    const fab = document.createElement('button');
    fab.id = 'mcmod-fab';
    fab.textContent = '⚙ MOD';
    fab.addEventListener('click', openModal);
    document.body.appendChild(fab);

    // Backdrop + Window
    const backdrop = document.createElement('div');
    backdrop.id = 'mcmod-backdrop';
    backdrop.className = 'hidden';
    backdrop.innerHTML = `
      <div id="mcmod-win">
        <div id="mcmod-hdr">
          <h2>⚒ Mod Cases</h2>
          <div id="mcmod-hdr-stats">
            <span class="mcmod-stat-gems" id="mcmod-gems-disp">💎 0</span>
            <span class="mcmod-stat-rebirth" id="mcmod-rebirth-disp">♻ 0</span>
          </div>
          <button id="mcmod-close-btn">✕</button>
        </div>
        <div id="mcmod-tabs">
          <button class="mctab active" data-tab="cases">Cases</button>
          <button class="mctab" data-tab="inventory">Inventory</button>
          <button class="mctab" data-tab="daily">Daily</button>
          <button class="mctab" data-tab="shop">Shop</button>
          <button class="mctab" data-tab="rebirth">Rebirth</button>
          <button class="mctab" data-tab="achievements">Achievements</button>
        </div>
        <div id="mcmod-content"></div>
      </div>`;
    document.body.appendChild(backdrop);

    document.getElementById('mcmod-close-btn').addEventListener('click', closeModal);
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
    document.querySelectorAll('.mctab').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    checkAch();
  }

  function openModal() {
    document.getElementById('mcmod-backdrop').classList.remove('hidden');
    activeCaseId = null;
    render();
  }

  function closeModal() {
    document.getElementById('mcmod-backdrop').classList.add('hidden');
  }

  function switchTab(tab) {
    activeTab = tab;
    activeCaseId = null;
    document.querySelectorAll('.mctab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    render();
  }

  function updateHeader() {
    const gd = document.getElementById('mcmod-gems-disp');
    const rd = document.getElementById('mcmod-rebirth-disp');
    if (gd) gd.textContent = '💎 ' + fmt(S.gems);
    if (rd) rd.textContent = '♻ ' + S.rebirths;
  }

  function render() {
    updateHeader();
    const content = document.getElementById('mcmod-content');
    if (!content) return;
    if (activeCaseId) { content.innerHTML = renderOpener(activeCaseId); bindOpener(); return; }
    switch (activeTab) {
      case 'cases':        content.innerHTML = renderCases();        bindCases();        break;
      case 'inventory':    content.innerHTML = renderInventory();    bindInventory();    break;
      case 'daily':        content.innerHTML = renderDaily();        bindDaily();        break;
      case 'shop':         content.innerHTML = renderShop();         bindShop();         break;
      case 'rebirth':      content.innerHTML = renderRebirth();      bindRebirth();      break;
      case 'achievements': content.innerHTML = renderAchievements(); break;
    }
  }

  // ─────────────────────────── TAB: CASES ───────────────────────────

  function renderCases() {
    let html = '<p class="mc-section-title">Mod Cases — spend Gems to open</p>';
    html += '<div class="mcmod-cases-grid">';
    CASES.forEach(c => {
      const locked  = c.locked && S.rebirths < 1;
      const price   = casePrice(c.price);
      const cls     = locked ? ' mc-locked' : '';
      html += `<div class="mcmod-case-card${cls}" data-case="${esc(c.id)}">
        <span class="mcmod-case-icon">${c.icon}</span>
        <div class="mcmod-case-name">${esc(c.name)}</div>
        <div class="mcmod-case-price">${fmt(price)} 💎</div>
        ${locked ? `<div class="mcmod-case-lock">🔒 ${esc(c.lockMsg)}</div>` : ''}
      </div>`;
    });
    html += '</div>';
    return html;
  }

  function bindCases() {
    document.querySelectorAll('.mcmod-case-card:not(.mc-locked)').forEach(el => {
      el.addEventListener('click', () => {
        activeCaseId = el.dataset.case;
        render();
      });
    });
  }

  // ──────────────────────── TAB: OPENER ─────────────────────────────

  function renderOpener(id) {
    const cd     = CASES.find(c => c.id === id);
    if (!cd) return '';
    const price  = casePrice(cd.price);
    const can    = S.gems >= price;
    const can3   = S.upgrades['bulk'] && S.gems >= price * 3;

    let items = cd.items.map(it =>
      `<div class="mc-item-tile r${it.r}" title="${esc(R_NAME[it.r])}: ${esc(it.name)}\nValue: ${it.v[0]}–${it.v[1]} 💎">
        <span class="ti-icon">${it.icon}</span>
        <span class="ti-name">${esc(it.name)}</span>
      </div>`
    ).join('');

    return `
      <div class="mcmod-back-row">
        <button class="mcmod-back-btn" id="mc-back">← Back</button>
        <span class="mcmod-opener-title">${cd.icon} ${esc(cd.name)}</span>
        <span class="mcmod-opener-price">${fmt(price)} 💎</span>
      </div>
      <div class="mcmod-open-btns">
        <button class="mc-btn mc-btn-green mcmod-open-btn" id="mc-open1" ${can ? '' : 'disabled'}>
          Open (${fmt(price)} 💎)
        </button>
        ${S.upgrades['bulk'] ? `<button class="mc-btn mc-btn-gold mcmod-open-btn" id="mc-open3" ${can3 ? '' : 'disabled'}>
          Open ×3 (${fmt(price * 3)} 💎)
        </button>` : ''}
      </div>
      <div id="mcmod-reel-wrap">
        <div class="mcmod-reel-line"></div>
        <div id="mcmod-reel-track"></div>
      </div>
      <div id="mcmod-result-area"></div>
      <p class="mc-section-title" style="margin-top:12px">Possible Items</p>
      <div class="mcmod-preview-grid">${items}</div>`;
  }

  function bindOpener() {
    const backBtn = document.getElementById('mc-back');
    if (backBtn) backBtn.addEventListener('click', () => { activeCaseId = null; render(); });

    const open1 = document.getElementById('mc-open1');
    if (open1) open1.addEventListener('click', () => doOpen(1));

    const open3 = document.getElementById('mc-open3');
    if (open3) open3.addEventListener('click', () => doOpen(3));
  }

  function doOpen(times) {
    if (reelBusy) return;
    const id = activeCaseId;
    if (!id) return;
    reelBusy = true;
    setOpenBtnsDisabled(true);

    const drop = openCaseSingle(id);
    if (!drop) {
      reelBusy = false;
      setOpenBtnsDisabled(false);
      alert('Not enough Gems!');
      return;
    }

    // For bulk, open the other 2 silently but show only the first in the reel
    const extra = [];
    if (times === 3) {
      const d2 = openCaseSingle(id);
      const d3 = openCaseSingle(id);
      if (d2) extra.push(d2);
      if (d3) extra.push(d3);
    }

    save();
    checkAch();

    const cd = CASES.find(c => c.id === id);
    runReel(cd, drop, () => {
      reelBusy = false;
      updateHeader();
      renderResult(drop);
      // Show extra items as quick toasts
      extra.forEach((it, i) => {
        setTimeout(() => {
          showGemToast('Also: ' + it.icon + ' ' + it.name, it.value);
        }, i * 600 + 200);
      });
    });
  }

  function setOpenBtnsDisabled(val) {
    const b1 = document.getElementById('mc-open1');
    const b3 = document.getElementById('mc-open3');
    if (b1) b1.disabled = val;
    if (b3) b3.disabled = val;
  }

  function renderResult(drop) {
    const area = document.getElementById('mcmod-result-area');
    if (!area) return;
    area.innerHTML = `
      <div class="mcmod-result-wrap">
        <div class="mcmod-res-icon">${drop.icon}</div>
        <div class="mcmod-res-name" style="color:${R_COLOR[drop.r]}">${esc(drop.name)}</div>
        <div class="mcmod-res-rar" style="color:${R_COLOR[drop.r]}">${R_NAME[drop.r]}</div>
        <div class="mcmod-res-val">Value: ${fmt(drop.value)} 💎</div>
        <div class="mcmod-res-btns">
          <button class="mc-btn mc-btn-gold" id="mc-sell-now">Sell (${fmt(Math.round(drop.value * gemMult()))} 💎)</button>
          <button class="mc-btn mc-btn-muted" id="mc-keep-it">Keep</button>
        </div>
      </div>`;
    document.getElementById('mc-sell-now').addEventListener('click', () => {
      const idx = S.inventory.findIndex(x => x === drop || (x.id === drop.id && x.value === drop.value));
      if (idx !== -1) {
        const earned = sellItem(idx);
        save();
        updateHeader();
        showGemToast('Sold: ' + drop.name, earned);
        renderResult({ ...drop, _sold: true });
      }
    });
    document.getElementById('mc-keep-it').addEventListener('click', () => {
      area.innerHTML = '';
    });
    // Legendary flash
    if (drop.r === 4) {
      area.style.animation = 'none';
      area.offsetWidth;
      area.style.animation = 'mc-pop .5s ease';
    }
  }

  // ─────────────────────────── REEL ─────────────────────────────────

  function makeItemEl(item) {
    const el = document.createElement('div');
    el.className = 'mc-item-tile r' + item.r;
    el.innerHTML = `<span class="ti-icon">${item.icon}</span><span class="ti-name">${esc(item.name)}</span>`;
    return el;
  }

  function runReel(caseData, winner, onDone) {
    const track = document.getElementById('mcmod-reel-track');
    const wrap  = document.getElementById('mcmod-reel-wrap');
    if (!track || !wrap) { onDone(); return; }

    const TOTAL = 30;
    const WIN   = 22; // winner lands near the end of the reel

    const items = [];
    for (let i = 0; i < TOTAL; i++) {
      items.push(i === WIN ? winner : pickItem(caseData.items));
    }

    track.innerHTML = '';
    track.style.transition = 'none';
    track.style.transform  = 'translateY(-50%)';

    items.forEach(it => track.appendChild(makeItemEl(it)));

    // Measure after paint
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const ITEM_W = 76; // 72px + 4px gap
      const centerX = wrap.clientWidth / 2;
      const winnerCenter = WIN * ITEM_W + ITEM_W / 2;
      const scrollTo = winnerCenter - centerX;

      track.style.transition = 'transform 3.6s cubic-bezier(0.04, 0.82, 0.06, 1)';
      track.style.transform  = `translateX(-${scrollTo}px) translateY(-50%)`;
    }));

    setTimeout(onDone, 3800);
  }

  // ─────────────────────────── TAB: INVENTORY ───────────────────────

  function renderInventory() {
    if (S.inventory.length === 0) {
      return '<div class="mc-empty"><span class="mc-empty-icon">🎒</span>No items yet — open some mod cases!</div>';
    }
    const totalVal = S.inventory.reduce((s, it) => s + it.value, 0);
    let html = `
      <div class="mcmod-inv-bar">
        <span>${S.inventory.length} items — total value: ${fmt(totalVal)} 💎</span>
        <button class="mc-btn mc-btn-gold" id="mc-sell-all-btn">Sell All (${fmt(Math.round(totalVal * gemMult()))} 💎)</button>
      </div>
      <div class="mcmod-inv-grid">`;
    S.inventory.forEach((it, idx) => {
      html += `<div class="mcmod-inv-tile r${it.r}" data-idx="${idx}" title="Click to sell">
        <div class="ti-icon">${it.icon}</div>
        <div class="ti-name">${esc(it.name)}</div>
        <div class="ti-val">${fmt(it.value)} 💎</div>
      </div>`;
    });
    html += '</div>';
    return html;
  }

  function bindInventory() {
    const sellAll = document.getElementById('mc-sell-all-btn');
    if (sellAll) sellAll.addEventListener('click', () => {
      const earned = sellAll_action();
      save();
      updateHeader();
      showGemToast('Sold all inventory', earned);
      render();
    });
    document.querySelectorAll('.mcmod-inv-tile').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.idx, 10);
        const earned = sellItem(idx);
        save();
        updateHeader();
        showGemToast('Item sold', earned);
        render();
      });
    });
  }

  function sellAll_action() {
    let total = 0;
    S.inventory.forEach(it => { total += it.value; });
    S.inventory = [];
    return earnGems(total);
  }

  // ─────────────────────────── TAB: DAILY ───────────────────────────

  function renderDaily() {
    const canClaim  = canClaimDaily();
    const dayIdx    = S.daily.dayIdx;
    const streak    = S.daily.streak;
    let html = '<p class="mc-section-title">Daily Gem Bonus</p>';
    html += `<div class="mcmod-daily-info">
      Current streak: <strong>${streak} day${streak !== 1 ? 's' : ''}</strong> &nbsp;|&nbsp;
      Best streak: <strong>${S.daily.maxStreak} day${S.daily.maxStreak !== 1 ? 's' : ''}</strong>
    </div>`;
    html += '<div class="mcmod-daily-grid">';
    const icons = ['🌱','⭐','🌿','💫','🍀','✨','🌟'];
    DAILY_GEMS.forEach((gems, i) => {
      const claimed = i < dayIdx && !canClaim;
      const today   = canClaim && i === dayIdx % 7;
      let cls = 'mcmod-day';
      if (claimed) cls += ' claimed';
      if (today)   cls += ' today';
      html += `<div class="${cls}">
        <div class="d-lbl">Day ${i + 1}</div>
        <div class="d-icon">${icons[i]}</div>
        <div class="d-val">${gems} 💎</div>
      </div>`;
    });
    html += '</div>';
    html += `<button class="mc-btn mc-btn-green" id="mc-daily-claim" style="width:100%;padding:12px;" ${canClaim ? '' : 'disabled'}>
      ${canClaim ? '🎁 Claim Daily Bonus' : '✅ Already Claimed Today'}
    </button>`;
    return html;
  }

  function bindDaily() {
    const btn = document.getElementById('mc-daily-claim');
    if (btn) btn.addEventListener('click', () => {
      const earned = claimDaily();
      if (earned !== null) {
        showGemToast('Daily bonus claimed!', earned);
        render();
      }
    });
  }

  // ─────────────────────────── TAB: SHOP ────────────────────────────

  function renderShop() {
    let html = '<p class="mc-section-title">Upgrade Shop — permanent boosts</p>';
    html += '<div class="mcmod-shop-list">';
    UPGRADES.forEach(u => {
      const owned   = !!S.upgrades[u.id];
      const blocked = !owned && u.req && !S.upgrades[u.req];
      const canBuy  = !owned && !blocked && S.gems >= u.cost;
      let cls = 'mcmod-shop-row';
      if (owned)   cls += ' owned';
      if (blocked) cls += ' blocked';
      html += `<div class="${cls}">
        <div class="shop-icon">${u.icon}</div>
        <div class="shop-info">
          <div class="shop-name">${esc(u.name)}</div>
          <div class="shop-desc">${esc(u.desc)}</div>
        </div>
        <div class="shop-cost">${owned ? '✅' : fmt(u.cost) + ' 💎'}</div>
        <div class="shop-buy">
          ${owned
            ? '<button disabled>Owned</button>'
            : `<button data-upg="${esc(u.id)}" ${canBuy ? '' : 'disabled'}>Buy</button>`}
        </div>
      </div>`;
    });
    html += '</div>';
    return html;
  }

  function bindShop() {
    document.querySelectorAll('[data-upg]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (buyUpgrade(btn.dataset.upg)) {
          save();
          updateHeader();
          render();
        }
      });
    });
  }

  // ─────────────────────────── TAB: REBIRTH ─────────────────────────

  function renderRebirth() {
    const req     = nextRebirthReq();
    const prog    = Math.min(S.progress, req);
    const pct     = Math.round(prog / req * 100);
    const ready   = canRebirth();
    const maxed   = S.rebirths >= REBIRTH_REQ.length;

    let bonuses = '';
    if (S.rebirths > 0) {
      bonuses  = `<div class="mcmod-rebirth-bonuses">`;
      bonuses += `<span class="mcmod-bonus-tag">+${S.rebirths * 10}% Gem Rewards</span>`;
      bonuses += `<span class="mcmod-bonus-tag">-${Math.min(S.rebirths * 5, 40)}% Case Prices</span>`;
      if (S.rebirths >= 1) bonuses += `<span class="mcmod-bonus-tag">⭐ Prestige Case Unlocked</span>`;
      bonuses += '</div>';
    }

    let nextInfo = maxed
      ? '<p style="color:#888;font-size:12px;">Maximum rebirths reached!</p>'
      : `<p class="mcmod-prog-label">Gems spent toward next rebirth: ${fmt(prog)} / ${fmt(req)} (${pct}%)</p>`;

    return `
      <div class="mcmod-rebirth-card">
        <h3>♻ Rebirths</h3>
        <div class="rcount">${S.rebirths}</div>
        <p>Each rebirth resets your gems &amp; inventory but grants permanent bonuses.</p>
        ${bonuses}
        ${!maxed ? `<div class="mcmod-prog-bar-wrap"><div class="mcmod-prog-bar" style="width:${pct}%"></div></div>` : ''}
        ${nextInfo}
        ${!maxed ? `<p class="mcmod-rebirth-warn">⚠ Rebirths reset your gems and inventory!</p>` : ''}
        <button class="mc-btn mc-btn-purple" id="mc-rebirth-btn" style="width:100%;padding:12px;font-size:14px;"
          ${ready && !maxed ? '' : 'disabled'}>
          ${maxed ? 'MAX REBIRTHS' : ready ? '♻ REBIRTH NOW' : `Need ${fmt(req - prog)} more gems spent`}
        </button>
      </div>
      <p class="mc-section-title">Rebirth Perks (per rebirth)</p>
      <div class="mcmod-shop-list">
        <div class="mcmod-shop-row"><div class="shop-icon">💎</div>
          <div class="shop-info"><div class="shop-name">+10% Gem Rewards</div><div class="shop-desc">All gem income multiplied after each rebirth</div></div></div>
        <div class="mcmod-shop-row"><div class="shop-icon">🏷️</div>
          <div class="shop-info"><div class="shop-name">-5% Mod Case Prices</div><div class="shop-desc">Stacks up to -40% across 8 rebirths</div></div></div>
        <div class="mcmod-shop-row"><div class="shop-icon">⭐</div>
          <div class="shop-info"><div class="shop-name">Prestige Case (Rebirth 1)</div><div class="shop-desc">Unlocks the exclusive Prestige Case with ultra-rare drops</div></div></div>
        <div class="mcmod-shop-row"><div class="shop-icon">🌱</div>
          <div class="shop-info"><div class="shop-name">Starter Gems</div><div class="shop-desc">Begin each rebirth with more gems (50 × 1.5 per rebirth)</div></div></div>
      </div>`;
  }

  function bindRebirth() {
    const btn = document.getElementById('mc-rebirth-btn');
    if (btn) btn.addEventListener('click', () => {
      if (!canRebirth()) return;
      if (!confirm('Rebirth? Your gems and inventory will be reset, but you keep upgrades and achievements.')) return;
      doRebirth();
      updateHeader();
      showGemToast('Rebirth ' + S.rebirths + ' complete!', S.gems);
      render();
    });
  }

  // ─────────────────────────── TAB: ACHIEVEMENTS ────────────────────

  function renderAchievements() {
    const done  = ACHIEVEMENTS.filter(a => S.achievements[a.id]).length;
    let html = `<p class="mc-section-title">Achievements — ${done}/${ACHIEVEMENTS.length} unlocked</p>`;
    html += '<div class="mcmod-ach-list">';
    ACHIEVEMENTS.forEach(a => {
      const unlocked = !!S.achievements[a.id];
      html += `<div class="mcmod-ach-row ${unlocked ? 'done' : ''}">
        <div class="ach-icon">${a.icon}</div>
        <div class="ach-info">
          <div class="ach-name">${esc(a.name)}</div>
          <div class="ach-desc">${esc(a.desc)}</div>
          <div class="ach-reward">${unlocked ? '✅ ' : ''}+${a.reward} 💎 reward</div>
        </div>
      </div>`;
    });
    html += '</div>';
    return html;
  }

  // ─────────────────────────── BOOT ─────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
