window.__require = function t(e, o, n) {
    function i(a, r) {
        if (!o[a]) {
            if (!e[a]) {
                var c = a.split("/");
                if (c = c[c.length - 1], !e[c]) {
                    var p = "function" == typeof __require && __require;
                    if (!r && p) return p(c, !0);
                    if (s) return s(c, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
            }
            var h = o[a] = {
                exports: {}
            };
            e[a][0].call(h.exports, function(t) {
                return i(e[a][1][t] || t)
            }, h, h.exports, t, e, o, n)
        }
        return o[a].exports
    }
    for (var s = "function" == typeof __require && __require, a = 0; a < n.length; a++) i(n[a]);
    return i
}({
    1: [function(t, e, o) {
        var n, i, s = e.exports = {};

        function a() {
            throw new Error("setTimeout has not been defined")
        }

        function r() {
            throw new Error("clearTimeout has not been defined")
        }

        function c(t) {
            if (n === setTimeout) return setTimeout(t, 0);
            if ((n === a || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
            try {
                return n(t, 0)
            } catch (e) {
                try {
                    return n.call(null, t, 0)
                } catch (e) {
                    return n.call(this, t, 0)
                }
            }
        }(function() {
            try {
                n = "function" == typeof setTimeout ? setTimeout : a
            } catch (t) {
                n = a
            }
            try {
                i = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (t) {
                i = r
            }
        })();
        var p, h = [],
            d = !1,
            u = -1;

        function l() {
            d && p && (d = !1, p.length ? h = p.concat(h) : u = -1, h.length && f())
        }

        function f() {
            if (!d) {
                var t = c(l);
                d = !0;
                for (var e = h.length; e;) {
                    for (p = h, h = []; ++u < e;) p && p[u].run();
                    u = -1, e = h.length
                }
                p = null, d = !1,
                    function(t) {
                        if (i === clearTimeout) return clearTimeout(t);
                        if ((i === r || !i) && clearTimeout) return i = clearTimeout, clearTimeout(t);
                        try {
                            i(t)
                        } catch (e) {
                            try {
                                return i.call(null, t)
                            } catch (e) {
                                return i.call(this, t)
                            }
                        }
                    }(t)
            }
        }

        function g(t, e) {
            this.fun = t, this.array = e
        }

        function m() {}
        s.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
            h.push(new g(t, e)), 1 !== h.length || d || c(f)
        }, g.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = m, s.addListener = m, s.once = m, s.off = m, s.removeListener = m, s.removeAllListeners = m, s.emit = m, s.prependListener = m, s.prependOnceListener = m, s.listeners = function(t) {
            return []
        }, s.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, s.cwd = function() {
            return "/"
        }, s.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, s.umask = function() {
            return 0
        }
    }, {}],
    App: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "7b9c7kXwL1LiovrWHMjq3Gu", "App");
        var n = function() {
            function t() {
                this.isDev = !1, this.cfgs = {}
            }
            return t.prototype.init = function() {
                if (this.isDev = window.DEV, this.user = new User(this), this.platformMgr = new PlatfromMgr(this), this.pageMgr = new PageMgr(this), this.soundMgr = new SoundMgr, this.isDev && this.showDebugConsole(), (this.platformMgr.isWX || this.platformMgr.isFB) && !this.isDev) try {
                    console.log = function() {}
                } catch (t) {}
            }, t.prototype.showDebugConsole = function() {
                if (window.document && cc.sys.isMobile) {
                    var t = document.createElement("script");
                    t.async = !0, t.src = "vconsole.min.js";
                    t.addEventListener("load", function() {
                        new window.VConsole
                    }, !1), document.body.appendChild(t)
                }
            }, t.prototype.showTip = function(t) {
                var e = cc.find("Canvas/tipsNode");
                e.scale = 1, e.x = -1e3, e.active = !0, e.stopAllActions();
                var o = e.getChildByName("tiplabel");
                o.getComponent(cc.Label).string = t, setTimeout(function() {
                    e.width = o.width + 20, e.height = o.height + 20, e.x = 0, e.scale = .01, e.runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeBackOut()), cc.delayTime(2), cc.scaleTo(.3, 0).easing(cc.easeBackOut()), cc.callFunc(function() {
                        e.active = !1
                    })))
                }, 100)
            }, t.prototype.maskFadeIn = function(t, e) {
                void 0 === e && (e = 1);
                var o = cc.find("Canvas/screenmask");
                o.active = !0, o.opacity = 0, o.runAction(cc.sequence(cc.fadeIn(e), cc.callFunc(t)))
            }, t.prototype.maskFadeOut = function(t, e) {
                void 0 === e && (e = .5);
                var o = cc.find("Canvas/screenmask");
                o.runAction(cc.sequence(cc.fadeOut(e), cc.callFunc(function() {
                    o.active = !1, t()
                })))
            }, t
        }();
        window.App = n, cc._RF.pop()
    }, {}],
    BaseDialog: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "176e08lnbNCVr+mWMqfvX1x", "BaseDialog");
        var n = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return __extends(e, t), e.prototype.onUpdateData = function(t) {}, e.prototype.getMaskOpacity = function() {
                return 220
            }, e.prototype.getMaskColor = function() {
                return cc.Color.WHITE
            }, e.prototype.runShowActions = function(t) {
                var e = this;
                this.node.scale = .01, this.node.stopAllActions(), this.node.runAction(cc.sequence(cc.scaleTo(.4, 1).easing(cc.easeBackOut()), cc.callFunc(function() {
                    e.onShow(), t && t()
                })))
            }, e.prototype.runHideActions = function(t) {
                var e = this;
                this.node.stopAllActions(), this.node.runAction(cc.sequence(cc.scaleTo(.4, 0).easing(cc.easeBackIn()), cc.callFunc(function() {
                    e.onHide(), t && t()
                })))
            }, e.prototype.onShow = function() {}, e.prototype.onHide = function() {}, e
        }(cc.Component);
        window.BaseDialog = n, cc._RF.pop()
    }, {}],
    BasePage: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "bbd7evATbJOx6zEzAUvm7ls", "BasePage");
        var n = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return __extends(e, t), e.prototype.onUpdateData = function(t) {}, e.prototype.onShow = function() {}, e.prototype.onHide = function() {}, e
        }(cc.Component);
        window.BasePage = n, cc._RF.pop()
    }, {}],
    BaseShare: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "a2115QejctBJ5tebJhArRp0", "BaseShare");
        var n = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return __extends(e, t), e.prototype.getBase64Data = function() {
                var t = new cc.Node;
                this.node.addChild(t);
                var e = t.addComponent(cc.Camera);
                e.cullingMask = 4294967295;
                var o = new cc.RenderTexture,
                    n = cc.game._renderContext,
                    i = this.node.width,
                    s = this.node.height;
                o.initWithSize(i, s, n.STENCIL_INDEX8), e.targetTexture = o, e.render(this.node);
                var a = o.readPixels(),
                    r = document.createElement("canvas"),
                    c = r.getContext("2d");
                r.width = o.width, r.height = o.height;
                for (var p = 4 * i, h = 0; h < s; h++) {
                    for (var d = s - 1 - h, u = c.createImageData(i, 1), l = d * i * 4, f = 0; f < p; f++) u.data[f] = a[l + f];
                    c.putImageData(u, 0, h)
                }
                return r.toDataURL("image/jpeg")
            }, e.prototype.getImageDataAsync = function(t) {
                var e = this;
                return new Promise(function(t, o) {
                    t(e.getBase64Data())
                })
            }, e
        }(cc.Component);
        window.BaseShare = n, cc._RF.pop()
    }, {}],
    ConfirmDialog: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "95fb8CabxtEsIxHbCO8vQxX", "ConfirmDialog"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            i = n.ccclass,
            s = n.property,
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.tipLabel = null, e.isYes = !1, e
                }
                return __extends(e, t), e.prototype.start = function() {}, e.prototype.onUpdateData = function(t) {
                    this.data = t, this.tipLabel.string = t.tip
                }, e.prototype.onNo = function() {
                    app.soundMgr.playClick(), app.pageMgr.hideDialog("ConfirmDialog"), this.isYes = !1
                }, e.prototype.onYes = function() {
                    app.soundMgr.playClick(), app.pageMgr.hideDialog("ConfirmDialog"), this.isYes = !0
                }, e.prototype.onHide = function() {
                    this.isYes ? this.data.onYes() : this.data.onNo()
                }, __decorate([s(cc.Label)], e.prototype, "tipLabel", void 0), e = __decorate([i], e)
            }(BaseDialog);
        o.default = a, cc._RF.pop()
    }, {}],
    DefaultHelper: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "32f90cOjNpBoKXfAyY41FPb", "DefaultHelper"), t("PlatHelper");
        var n = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.loadAsync = function(t, e) {}, e.isInterstitialLoad = function() {
                    return !0
                }, e.showInterstitialAd = function(t, e) {
                    console.log("展示插屏广告"), e()
                }, e.loadVideoAsync = function(t, e) {}, e.isVideoLoad = function() {
                    return !0
                }, e.showVideoAd = function(t, e) {
                    console.log("展示视频广告"), e()
                }, e.logEvent = function(t, e, o) {
                    console.log(t, e)
                }, e.autoShowAd = function(t) {
                    addCounter++, addCounter >= t && this.isInterstitialLoad() && (this.logEvent("autoShowAd"), this.showInterstitialAd("autoShow"))
                }, e
            }
            return __extends(e, t), e.prototype.init = function() {}, e.prototype.showBannerAd = function() {}, e.prototype.hideBannerAd = function() {}, e.prototype.getDataAsync = function(t) {
                return new Promise(function(e, o) {
                    var n = cc.sys.localStorage.getItem(t);
                    e(n ? JSON.parse(n) : {})
                })
            }, e.prototype.setDataAsync = function(t, e) {
                return new Promise(function(o, n) {
                    cc.sys.localStorage.setItem(t, JSON.stringify(e)), o()
                })
            }, e
        }(PlatHelper);
        window.DefaultHelper = n, cc._RF.pop()
    }, {
        PlatHelper: "PlatHelper"
    }],
    EngineConfig: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "8d273PTxhRFapo8/P929/zB", "EngineConfig"), cc.macro.ENABLE_WEBGL_ANTIALIAS = !0, cc._RF.pop()
    }, {}],
    FBHelper: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "26875CVbSxJlIEyZNNpgltU", "FBHelper"), t("PlatHelper");
        var n = window.fb_interstitial_ids,
            i = 0,
            s = null,
            a = !1,
            r = !1,
            c = window.fb_video_ids,
            p = 0,
            h = null,
            d = !1,
            u = !1,
            l = {},
            f = 0,
            g = 0,
            m = window.FBInstant,
            y = 0,
            v = !1,
            I = {},
            _ = null,
            w = [],
            A = {},
            b = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return __extends(e, t), e.prototype.init = function() {
                    this.loadAsync(), this.loadVideoAsync(), this.initPay()
                }, e.prototype.loadAsync = function(t, e) {
                    var o = this;
                    if (void 0 === t && (t = function() {}), void 0 === e && (e = function(t) {}), r || m.getSupportedAPIs().indexOf("getInterstitialAdAsync") < 0) e && e("not support");
                    else {
                        var c = function() {
                                r = !1, s && (a = !0, t && t(), o.logEvent("interstitial_load_success", {
                                    index: i
                                }))
                            },
                            p = function(c) {
                                a = !1, r = !1, o.logEvent("interstitial_load_fail", {
                                    index: i
                                }), l[n[i]] = s, s = null, ++i < n.length ? (r = !0, setTimeout(function() {
                                    r = !1, o.loadAsync(t, e)
                                }, 5e3)) : (i = 0, r = !0, setTimeout(function() {
                                    r = !1
                                }, 9e4), e && e(c)), o.logEvent("aderrornew", {
                                    code: c.code
                                })
                            },
                            h = n[i];
                        this.logEvent("interstitial_load", {
                            index: i
                        }), r = !0, s = l[h], l[h] = null, s ? s.loadAsync().then(c, p) : m.getInterstitialAdAsync(h).then(function(t) {
                            return s = t, t.loadAsync()
                        }, function(t) {
                            r = !0, e && e(t), o.logEvent("aderrornew", {
                                code: t.code
                            })
                        }).then(c, p)
                    }
                }, e.prototype.isInterstitialLoad = function() {
                    return a || this.loadAsync(), s && a
                }, e.prototype.showInterstitialAd = function(t, e) {
                    var o = this;
                    void 0 === e && (e = function() {}), this.logEvent("ad_interstitial_click", {
                        from: t
                    }), s && a ? (y = 0, s.showAsync().then(function() {
                        a = !1, i = 0, s = null, o.loadAsync(), e()
                    }, function() {
                        e && e(), a = !1, i = 0, s = null, o.loadAsync()
                    }), this.logEvent("interstitial_show", {
                        index: i
                    }), f++, this.logEvent("interstitial_show_count", {
                        count: f,
                        from: t
                    })) : e()
                }, e.prototype.loadVideoAsync = function(t, e) {
                    var o = this;
                    if (void 0 === t && (t = function() {}), void 0 === e && (e = function(t) {}), u || m.getSupportedAPIs().indexOf("getRewardedVideoAsync") < 0) e && e("not support");
                    else {
                        console.log("loadVideoAsync");
                        var n = function() {
                                u = !1, h && (d = !0, t && t(), o.logEvent("reward_success", {
                                    index: p
                                }))
                            },
                            i = function(t) {
                                o.logEvent("aderrornew", {
                                    code: t.code
                                }), "ADS_TOO_MANY_INSTANCES" != t.code && "CLIENT_UNSUPPORTED_OPERATION" != t.code && (d = !1, u = !1, l[c[p]] = h, h = null, o.logEvent("reward_fail", {
                                    index: p
                                }), ++p < c.length ? (u = !0, setTimeout(function() {
                                    u = !1, o.loadVideoAsync()
                                }, 5e3)) : (p = 0, u = !0, setTimeout(function() {
                                    u = !1
                                }, 9e4), e && e(t)))
                            },
                            s = c[p];
                        this.logEvent("reward_load", {
                            index: p
                        }), u = !0, h = l[s], l[s] = null, h ? h.loadAsync().then(n, i) : m.getRewardedVideoAsync(s).then(function(t) {
                            return h = t, t.loadAsync()
                        }).then(n, i)
                    }
                }, e.prototype.isVideoLoad = function() {
                    return d || this.loadVideoAsync(), h && d
                }, e.prototype.showVideoAd = function(t, e) {
                    var o = this;
                    try {
                        if (this.logEvent("ad_video_click", {
                                from: t
                            }), d) {
                            if (h) return y = 0, h.showAsync().then(function() {
                                e(), d = !1, p = 0, h = null, o.loadVideoAsync()
                            }, function(t) {
                                e(t.message), "ADS_NOT_LOADED" == t.code && (l[c[p]] = h), d = !1, p = 0, h = null, o.loadVideoAsync(), o.logEvent("aderrornew", {
                                    code: t.code
                                })
                            }), this.logEvent("reward_show", {
                                index: p
                            }), g++, void this.logEvent("reward_show_count", {
                                count: g,
                                from: t
                            })
                        } else e()
                    } catch (t) {
                        e(t)
                    }
                }, e.prototype.showBannerAd = function() {}, e.prototype.hideBannerAd = function() {}, e.prototype.autoShowAd = function(t) {
                    ++y >= t && this.isInterstitialLoad() && (this.logEvent("autoShowAd"), this.showInterstitialAd("autoShow"))
                }, e.prototype.logEvent = function(t, e, o) {
                    void 0 === e && (e = {}), void 0 === o && (o = 1), m.logEvent(t, o, e)
                }, e.prototype.getDataAsync = function(t) {
                    return new Promise(function(e, o) {
                        m.player.getDataAsync([t]).then(function(o) {
                            console.log("data", o), o && o[t] ? e(o[t]) : e({})
                        }).catch(function(t) {
                            console.log("err", t), o({})
                        })
                    })
                }, e.prototype.setDataAsync = function(t, e) {
                    var o = {};
                    return o[t] = e, m.player.setDataAsync(o)
                }, e.prototype.initPay = function() {
                    m.getSupportedAPIs().indexOf("payments.purchaseAsync") && (m.payments.onReady(function() {
                        v = !0
                    }), m.payments.getCatalogAsync().then(function(t) {
                        for (var e = 0; e < t.length; e++) I[t[e].productID] = t[e].price
                    }).catch(function(t) {}), m.payments.getPurchasesAsync().then(function(t) {
                        for (var e in t) m.payments.consumePurchaseAsync(t[e].purchaseToken).then(function() {}).catch(function(t) {})
                    }))
                }, e.prototype.isPayReady = function() {
                    return v
                }, e.prototype.getPrice = function(t, e) {
                    return I[t] || e
                }, e.prototype.purchase = function(t, e, o) {
                    var n = this;
                    v && (this.logEvent("pay_purchase", {
                        id: t
                    }), m.payments.purchaseAsync({
                        productID: t,
                        developerPayload: "words"
                    }).then(function(i) {
                        n.logEvent("pay_purchase_success", {
                            id: t
                        }), m.payments.consumePurchaseAsync(i.purchaseToken).then(function() {
                            n.logEvent("pay_consume_success", {
                                id: t
                            }), e && e()
                        }).catch(function(t) {
                            o && o(t.message), n.logEvent("pay_consume_error", {
                                code: t.code,
                                message: t.message
                            })
                        })
                    }).catch(function(t) {
                        o && o(t.message), n.logEvent("pay_purchase_error", {
                            code: t.code,
                            message: t.message
                        })
                    }))
                }, e.prototype.getContextID = function() {
                    return m.context.getID()
                }, e.prototype.getPlayerID = function() {
                    return m.player.getID()
                }, e.prototype.getPlayerName = function() {
                    return m.player.getName()
                }, e.prototype.getPlayerPhoto = function() {
                    return m.player.getPhoto()
                }, e.prototype.createShortcutAsync = function() {
                    var t = this;
                    return new Promise(function(e, o) {
                        m.canCreateShortcutAsync().then(function(o) {
                            o ? (t.logEvent("createShortcut"), m.createShortcutAsync().then(function() {
                                t.logEvent("createShortcutSuccess"), app.user.shotcutCreated = !0, e()
                            }).catch(function() {
                                e()
                            })) : e()
                        }).catch(function() {
                            e()
                        })
                    })
                }, e.prototype.subscribeBotAsync = function() {
                    var t = this;
                    return new Promise(function(e, o) {
                        m.player.canSubscribeBotAsync().then(function() {
                            t.logEvent("subscribeBot"), m.player.subscribeBotAsync().then(function() {
                                t.logEvent("subscribeBotSuccess"), e()
                            }).catch(function(t) {
                                console.log("subscribeBotAsync fail", t), e(t)
                            })
                        }).catch(function(t) {
                            console.log("canSubscribeBotAsync is no"), e(t)
                        })
                    })
                }, e.prototype.chooseFriends = function(t, e) {
                    var o = this;
                    this.logEvent("choose_list", {
                        from: t
                    }), m.context.chooseAsync({
                        filters: ["NEW_CONTEXT_ONLY"]
                    }).then(function() {
                        o.logEvent("choose_list_success", {
                            from: t
                        }), e && e()
                    }).catch(function(n) {
                        o.logEvent("choose_list_fail", {
                            from: t,
                            code: n.code
                        }), e && e(n)
                    })
                }, e.prototype.playWithFriend = function(t, e, o) {
                    var n = this;
                    this.logEvent("choose_play", {
                        from: t
                    }), m.context.createAsync(e).then(function() {
                        n.logEvent("choose_play_success", {
                            from: t
                        }), o && o()
                    }).catch(function(e) {
                        n.logEvent("choose_play_fail", {
                            from: t,
                            code: e.code
                        }), o && o(e)
                    })
                }, e.prototype.playWithGroup = function(t, e, o) {
                    var n = this;
                    this.logEvent("choose_group", {
                        from: t
                    }), m.context.switchAsync(e).then(function() {
                        n.logEvent("choose_group_success", {
                            from: t
                        }), o && o()
                    }).catch(function(e) {
                        n.logEvent("choose_group_fail", {
                            from: t,
                            code: e.code
                        }), o && o(e)
                    })
                }, e.prototype.sendMessageToFriend = function(t, e) {
                    var o = this,
                        n = t.data || {};
                    n.from = t.from || "default";
                    var i = t.template || n.from;
                    m.updateAsync({
                        action: "CUSTOM",
                        cta: t.cta || "Play",
                        template: i,
                        text: t.text || "",
                        image: t.image,
                        data: n,
                        strategy: t.strategy || "IMMEDIATE",
                        notification: t.notification || "NO_PUSH"
                    }).then(function() {
                        o.logEvent("send_message_success", {
                            from: t.from
                        }), e && e()
                    }).catch(function(n) {
                        e && e(n), o.logEvent("send_message_fail", {
                            from: t.from,
                            code: n.code
                        })
                    })
                }, e.prototype.shareGame = function(t, e) {
                    var o = this,
                        n = t.data || {};
                    n.from = t.from, m.shareAsync({
                        intent: "SHARE",
                        image: t.image,
                        text: t.text || "",
                        data: n
                    }).then(function() {
                        o.logEvent("game_share_success", {
                            from: t.from
                        }), e && e()
                    }).catch(function(n) {
                        console.log("err", n), o.logEvent("game_share_fail", {
                            from: t.from,
                            code: n.code
                        }), e && e(n)
                    })
                }, e.prototype.getConnectedPlayersAsync = function() {
                    return _ ? Promise.resolve(_) : w.length > 1 ? new Promise(function(t, e) {
                        w.push(t)
                    }) : new Promise(function(t, e) {
                        w.push(t), m.player.getConnectedPlayersAsync().then(function(t) {
                            _ = t, w.forEach(function(e) {
                                console.log("getConnectedPlayersAsync=====", t.length), e(t)
                            }), w = []
                        }, function(t) {
                            console.log(t), w.forEach(function(t) {
                                t([])
                            }), w = []
                        })
                    })
                }, e.prototype.setRankScore = function(t, e, o, n) {
                    var i = this;
                    m.getLeaderboardAsync(t).then(function(t) {
                        return t.setScoreAsync(e, o || "")
                    }).then(function() {
                        n && n()
                    }).catch(function(t) {
                        console.log("error", t), i.logEvent("rankset_fail", {
                            code: t.code
                        }), n && n(t)
                    })
                }, e.prototype.getRankList = function(t, e, o, n, i) {
                    var s = this;
                    m.getLeaderboardAsync(t).then(function(t) {
                        return i ? t.getConnectedPlayerEntriesAsync() : t.getEntriesAsync(e, o)
                    }).then(function(e) {
                        for (var s = [], a = 0; a < e.length; a++) o++, s.push({
                            playerId: e[a].getPlayer().getID(),
                            photo: e[a].getPlayer().getPhoto(),
                            nickName: e[a].getPlayer().getName(),
                            rank: o,
                            fbRank: e[a].getRank(),
                            score: e[a].getScore(),
                            costomData: e[a].getExtraData(),
                            isFriends: i
                        });
                        A[t] = s, n(s, t)
                    }).catch(function(e) {
                        console.log(e), s.logEvent("ranklist_fail", {
                            code: e.code
                        }), n(A[t] || [], t, e)
                    })
                }, e
            }(PlatHelper);
        window.FBHelper = b, cc._RF.pop()
    }, {
        PlatHelper: "PlatHelper"
    }],
    GalleryPage: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "12294ISt9lDe6NYY1VuDw3+", "GalleryPage"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = t("../../common/components/ListView"),
            i = cc._decorator,
            s = i.ccclass,
            a = i.property,
            r = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.listView = null, e.soundOpenNode = null, e.soundCloseNode = null, e.count = 0, e
                }
                return __extends(e, t), e.prototype.start = function() {
                    var t = this;
                    this.soundOpenNode.active = app.user.soundEnable, this.soundCloseNode.active = !this.soundOpenNode.active;
                    for (var e = [{
                            prefabIndex: 0,
                            unlockNum: 0,
                            groupId: 0,
                            shapes: null,
                            pack: null,
                            isBonus: !1
                        }], o = app.cfgs.levelCfg, n = 0; n < o.length; n++) {
                        var i = o[n].models,
                            s = o[n].unlockNum;
                        n > 0 && e.push({
                            prefabIndex: 0,
                            unlockNum: s,
                            groupId: n,
                            shapes: null,
                            pack: null,
                            isBonus: !1
                        });
                        for (var a = 0; a < i.length; a++) {
                            var r = i[a];
                            if (r.isBig && app.user.isPackageBuy(r.id))
                                for (var c = r.packages, p = 0; p < c.length; p++) {
                                    var h = c[p];
                                    e.push({
                                        prefabIndex: 1,
                                        groupId: n,
                                        unlockNum: s,
                                        shapes: h.shapes,
                                        isBonus: !0,
                                        pack: null
                                    })
                                } else {
                                    if (r.isBig && !app.platformMgr.isPayReady() && !r.isShare) continue;
                                    e.push({
                                        prefabIndex: r.isBig ? 2 : 1,
                                        groupId: n,
                                        unlockNum: s,
                                        shapes: r.shapes,
                                        pack: r,
                                        isBonus: !1
                                    })
                                }
                        }
                    }
                    this.listView.setItemsData(e);
                    var d = o[0].models,
                        u = [];
                    u.push(d[0].shapes[0]), u.push(d[0].shapes[1]), u.push(d[1].shapes[0]);
                    var l = !0,
                        f = 0;
                    for (n = 0; n < u.length; n++)
                        if (!app.user.isFinishedImage(u[n])) {
                            l = !1, f = n;
                            break
                        } l ? app.maskFadeOut(function() {}) : this.scheduleOnce(function() {
                        var e = t.listView.getShowItems(),
                            o = [e[1].itemL, e[1].itemR, e[2].itemL],
                            n = o[f].data;
                        app.pageMgr.showPage("GameMain", {
                            groupId: n.groupId,
                            shapeId: n.id,
                            shape: o[f].cfg.svg,
                            item: o[f],
                            iconurl: "shapes" + o[f].cfg.icon,
                            guideItems: o,
                            guideType: f + 1
                        })
                    }, 0), app.soundMgr.playMusic()
                }, e.prototype.onSoundsClick = function() {
                    app.soundMgr.setSoundEnabled(!app.soundMgr.isSoundEnable()), app.soundMgr.setMusicEnabled(!app.soundMgr.isMusicEnable()), this.soundOpenNode.active = app.soundMgr.isSoundEnable(), this.soundCloseNode.active = !this.soundOpenNode.active
                }, e.prototype.onEnable = function() {
                    this.count = 0
                }, e.prototype.onClearData = function() {
                    this.count++, 10 == this.count && (app.user.clearDataAsync(), app.showTip("Data clear"))
                }, __decorate([a(n.default)], e.prototype, "listView", void 0), __decorate([a(cc.Node)], e.prototype, "soundOpenNode", void 0), __decorate([a(cc.Node)], e.prototype, "soundCloseNode", void 0), e = __decorate([s], e)
            }(BasePage);
        o.default = r, cc._RF.pop()
    }, {
        "../../common/components/ListView": "ListView"
    }],
    GameConfig: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "ee940fZhBdD1qjoUP4rA2HY", "GameConfig"), window.GameName = "polyart", window.GameVersion = "0.02", window.DEV = !1, window.FB_APPID = "371827516733046", window.wx_banner_id = "adunit-56c63c8e33f1eb68", window.wx_video_id = "adunit-56c63c8e33f1eb68", window.fb_interstitial_ids = ["371827516733046_375594549689676", "371827516733046_375594586356339", "371827516733046_375594633023001"], window.fb_video_ids = ["371827516733046_375590106356787", "371827516733046_375594339689697", "371827516733046_375594416356356"], window.contextual_rank_name = "contextural_rank", window.week_rank_name = "week_rank", window.global_rank_name = "global_rank", window.GAME_ID = 58, window.KEYPART1 = "3415", window.KEYPART2 = "a003e21f95e", window.KEYPART3 = "4673f549", window.KEYPART4 = "86d63c7e2", window.BOT_URL = "https://fb-bot.capjoy.com/api/v0/upload_" + GAME_ID, window.SERVER_URL = "https://fb-api.capjoy.com", cc._RF.pop()
    }, {}],
    GameMain: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "5822e5QQxNFRrTbKGPxwkeN", "GameMain"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = t("./TriangleMesh"),
            i = t("./PlayerControl"),
            s = cc._decorator,
            a = s.ccclass,
            r = s.property,
            c = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.meshNode = null, e.helpNode = null, e.tipNode = null, e.backNode = null, e.bottomNode = null, e.nextNode = null, e.restartNode = null, e.guideTipLabel = null, e.finishAnim = null, e.isUnlockedNextGroup = !1, e.timeALl = 0, e.isShowed = !1, e.helpShowTime = 30, e.guideIds = [], e.guideType = 0, e
                }
                return __extends(e, t), e.prototype.onLoad = function() {
                    var t = app.cfgs.levelCfg[0].models;
                    this.guideIds.push(t[0].shapes[0]), this.guideIds.push(t[0].shapes[1]), this.guideIds.push(t[1].shapes[0])
                }, e.prototype.onUpdateData = function(t) {
                    var e = this;
                    this.data = t, this.guideType = t.guideType || 0, this.bottomNode.active = !1, this.helpNode.active = !1, this.isUnlockedNextGroup = !1, this.tipNode.active = !1, this.backNode.active = 0 == this.guideType, this.timeALl = 0, this.isShowed = this.guideType > 0, this.node.getChildByName("guide").active = !1, this.unscheduleAllCallbacks(), this.getComponent(i.default).endControl(), this.meshNode.removeAllChildren(), cc.loader.loadRes("maps/" + t.shape, function(t, o) {
                        e.initMap(o.json), app.user.isFinishedImage(e.data.shapeId) ? e.showRestart() : e.startGame()
                    })
                }, e.prototype.showGuideArrow = function() {
                    switch (this.guideType) {
                        case 1:
                            this.showGuide(cc.v2(-330, 0), cc.v2(330, 0));
                            break;
                        case 2:
                            this.showGuide(cc.v2(0, 330), cc.v2(0, -330));
                            break;
                        case 3:
                            this.showGuide(cc.v2(-200, -200), cc.v2(200, 200))
                    }
                }, e.prototype.showGuide = function(t, e) {
                    var o = this.node.getChildByName("guide");
                    o.active = !0;
                    var n = o.getChildByName("move");
                    n.stopAllActions(), n.y = t.y, n.x = t.x, n.runAction(cc.repeatForever(cc.sequence(cc.moveTo(1, e), cc.delayTime(.9), cc.fadeOut(.1), cc.place(t), cc.delayTime(1), cc.fadeIn(.2))))
                }, e.prototype.initMap = function(t) {
                    console.log("三角数量", t.length), this.meshNode.scale = 1;
                    for (var e = 0; e < t.length; e++) {
                        var o = t[e],
                            i = new cc.Node;
                        i.is3DNode = !0, this.meshNode.addChild(i);
                        var s = i.addComponent(n.default);
                        s.color = cc.color().fromHEX(o.fill || "#ffffff");
                        var a = o.points.split(" ");
                        s.vertexs = [];
                        for (var r = 0; r < a.length; r++) {
                            var c = a[r].split(",");
                            s.vertexs.push(cc.v2(parseFloat(c[0]) - 250, 250 - parseFloat(c[1])))
                        }
                        s.zValue = 400 * Math.random() - 200
                    }
                    this.meshNode.eulerAngles = cc.v3(0, 0, 0)
                }, e.prototype.showRestart = function() {
                    this.restartNode.active = !0, this.nextNode.active = !1, this.bottomNode.active = !0, app.maskFadeOut(function() {})
                }, e.prototype.startGame = function() {
                    var t = this;
                    app.platformMgr.logEvent("level_play", {
                        id: this.data.shapeId
                    }), this.restartNode.active = !1, this.nextNode.active = !0, this.meshNode.scale = 0;
                    var e = 200 * Math.random() + 30,
                        o = 200 * Math.random() + 30;
                    switch (this.guideType) {
                        case 1:
                            e = 0, o = -30, this.guideTipLabel.string = "SPIN THE MAGIC CLOUD \n HORIZONTALLY \n TO GET COMPLETED FIGURE.";
                            break;
                        case 2:
                            e = -30, o = 0, this.guideTipLabel.string = "SPIN THE MAGIC CLOUD \n VERTICALLY \n TO GET COMPLETED FIGURE.";
                            break;
                        case 3:
                            e = 30, o = -30, this.guideTipLabel.string = "SPIN THE MAGIC CLOUD \n DIAGONALLY \n TO GET COMPLETED FIGURE.";
                            break;
                        default:
                            this.guideTipLabel.string = ""
                    }
                    app.maskFadeOut(function() {
                        t.schedule(function() {
                            t.meshNode.scale < 1 && (t.meshNode.scale += 1 / 60)
                        }, 1 / 60, 60);
                        var n = cc.rotate3DTo(1.7, new cc.Quat(0, 0, 0, 1).fromEuler(cc.v3(e, o, 0)));
                        t.meshNode.runAction(cc.sequence(n, cc.callFunc(function() {
                            t.getComponent(i.default).startControl()
                        }))), t.tipNode.active = 0 == t.guideType, t.tipNode.opacity = 0, t.tipNode.runAction(cc.sequence(cc.fadeIn(1), cc.delayTime(5), cc.fadeOut(1), cc.callFunc(function() {
                            t.tipNode.active = !1
                        }))), t.getComponent(i.default).guideType = t.guideType, t.schedule(t.updateSec, 5), t.guideType > 0 && t.scheduleOnce(function() {
                            t.showGuideArrow()
                        }, 1)
                    })
                }, e.prototype.start = function() {}, e.prototype.onFriendList = function() {
                    app.soundMgr.setSoundEnabled(!app.soundMgr.isSoundEnable()), app.soundMgr.play("btn_click"), app.platformMgr.chooseFriends("test", function(t) {
                        console.log(t), t || Utils.sendMessage("invite_share", {
                            from: "test",
                            text: "play game",
                            data: {
                                haha: "dddddd"
                            }
                        }, function(t) {
                            console.log("share cb")
                        })
                    })
                }, e.prototype.onLevelPass = function() {
                    console.log("onLevelPass"), app.platformMgr.logEvent("level_finish", {
                        id: this.data.shapeId,
                        time: Math.floor(this.timeALl)
                    }), this.helpNode.active = !1, this.backNode.active = !1, this.bottomNode.active = !0;
                    var t = this.bottomNode.getChildByName("btn_share");
                    t.stopAllActions(), t.opacity = 0, t.runAction(cc.fadeIn(.5)), this.nextNode.opacity = 0, this.nextNode.runAction(cc.sequence(cc.delayTime(2), cc.fadeIn(.3))), this.finishAnim.node.active = !0, this.finishAnim.play("hecheng"), this.isUnlockedNextGroup = app.user.finishImage(this.data.shapeId), console.log(this.isUnlockedNextGroup), this.meshNode.children.forEach(function(t) {
                        t.runAction(cc.sequence(cc.scaleTo(.4, .9), cc.scaleTo(.8, 1)))
                    }), this.meshNode.runAction(cc.sequence(cc.scaleTo(.4, 1.3), cc.scaleTo(.8, 1))), Utils.sendMessage(this.data.iconurl, {
                        from: "message_" + this.data.shapeId,
                        text: "MY ARTWORK    #POLYART"
                    }, function() {});

                    /*禁止显示分享提示*/
                    this.bottomNode.getChildByName("btn_share").active = false;
                    this.bottomNode.getChildByName("ziti").active = false;


                }, e.prototype.onHelp = function() {
                    var t = this;
                    app.soundMgr.playClick(), this.helpNode.active = !1;
                    var e = this.getComponent(i.default),
                        o = app.platformMgr;
                    o.isVideoLoad() && o.showVideoAd("help_" + this.data.shapeId, function() {
                        var o = cc.rotate3DTo(.5, new cc.Quat(0, 0, 0, 1).fromEuler(cc.v3(5 + 5 * Math.random(), 5 + 5 * Math.random(), e.lastAngleZ)));
                        t.meshNode.runAction(o)
                    })
                }, e.prototype.onNext = function() {
                    var t = this;
                    app.soundMgr.playClick();
                    switch (this.guideType) {
                        case 0:
                            app.pageMgr.showPage("GalleryPage"), this.data.item.onFinishImage(this.isUnlockedNextGroup);
                            break;
                        case 1:
                            this.meshNode.runAction(cc.scaleTo(.5, 2)), app.maskFadeIn(function() {
                                var e = t.data.guideItems[1],
                                    o = e.data;
                                app.pageMgr.showPage("GameMain", {
                                    groupId: o.groupId,
                                    shapeId: o.id,
                                    shape: e.cfg.svg,
                                    item: e,
                                    iconurl: "shapes" + e.cfg.icon,
                                    guideItems: t.data.guideItems,
                                    guideType: 2
                                })
                            }, .5);
                            break;
                        case 2:
                            this.meshNode.runAction(cc.scaleTo(.5, 2)), app.maskFadeIn(function() {
                                var e = t.data.guideItems[2],
                                    o = e.data;
                                app.pageMgr.showPage("GameMain", {
                                    groupId: o.groupId,
                                    shapeId: o.id,
                                    shape: e.cfg.svg,
                                    item: e,
                                    iconurl: "shapes" + e.cfg.icon,
                                    guideItems: t.data.guideItems,
                                    guideType: 3
                                })
                            }, .5);
                            break;
                        case 3:
                            app.pageMgr.showPage("GalleryPage");
                            for (var e = this.data.guideItems, o = 0; o < e.length; o++) e[o].onFinishImage(this.isUnlockedNextGroup)
                    }
                }, e.prototype.onGoBack = function() {
                    app.soundMgr.playClick();
                    app.maskFadeIn(function() {
                        app.pageMgr.showPage("GalleryPage"), app.maskFadeOut(function() {}, .3)
                    }, .3)
                }, e.prototype.onShare = function() {
                    app.soundMgr.playClick(), Utils.sharePolyImage(this.data.iconurl, {
                        from: "share_" + this.data.shapeId,
                        text: "MY ARTWORK    #POLYART"
                    }, function(t) {
                        console.log("share cb")
                    })
                }, e.prototype.onRestart = function() {
                    var t = this;
                    app.soundMgr.playClick(), app.platformMgr.logEvent("level_restart", {
                        id: this.data.shapeId
                    }), app.pageMgr.showDialog("RestartDialog", {
                        suc: function() {
                            t.meshNode.runAction(cc.scaleTo(.5, 2)), app.maskFadeIn(function() {
                                t.bottomNode.active = !1, t.meshNode.scale = 0, t.startGame()
                            }, .5)
                        }
                    })
                }, e.prototype.updateSec = function(t) {
                    this.timeALl += t, !this.bottomNode.active && !this.isShowed && this.timeALl > this.helpShowTime && 0 == this.helpNode.active && app.platformMgr.isVideoLoad() && (this.isShowed = !0, this.helpNode.active = !0, this.helpNode.opacity = 1, this.helpNode.runAction(cc.fadeIn(.5)))
                }, __decorate([r(cc.Node)], e.prototype, "meshNode", void 0), __decorate([r(cc.Node)], e.prototype, "helpNode", void 0), __decorate([r(cc.Node)], e.prototype, "tipNode", void 0), __decorate([r(cc.Node)], e.prototype, "backNode", void 0), __decorate([r(cc.Node)], e.prototype, "bottomNode", void 0), __decorate([r(cc.Node)], e.prototype, "nextNode", void 0), __decorate([r(cc.Node)], e.prototype, "restartNode", void 0), __decorate([r(cc.Label)], e.prototype, "guideTipLabel", void 0), __decorate([r(cc.Animation)], e.prototype, "finishAnim", void 0), e = __decorate([a], e)
            }(BasePage);
        o.default = c, cc._RF.pop()
    }, {
        "./PlayerControl": "PlayerControl",
        "./TriangleMesh": "TriangleMesh"
    }],
    ImageGroupItem: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "6c55eHsMwRIBKA2JwVvSfds", "ImageGroupItem"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = t("../../common/components/ListItem"),
            i = t("./ImageItem"),
            s = cc._decorator,
            a = s.ccclass,
            r = s.property,
            c = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.itemL = null, e.itemR = null, e
                }
                return __extends(e, t), e.prototype.onUpdateData = function(t) {
                    var e = t.shapes,
                        o = {
                            id: e[0],
                            groupId: t.groupId,
                            isBonus: t.isBonus,
                            unlockNum: t.unlockNum
                        };
                    this.itemL.itemIndex = this.itemIndex, this.itemL.data = o, this.itemL.listView = this.listView, this.itemL.onUpdateData(o);
                    var n = {
                        id: e[1],
                        groupId: t.groupId,
                        isBonus: t.isBonus,
                        unlockNum: t.unlockNum
                    };
                    this.itemR.itemIndex = this.itemIndex, this.itemR.data = n, this.itemR.listView = this.listView, this.itemR.onUpdateData(n)
                }, __decorate([r(i.default)], e.prototype, "itemL", void 0), __decorate([r(i.default)], e.prototype, "itemR", void 0), e = __decorate([a], e)
            }(n.default);
        o.default = c, cc._RF.pop()
    }, {
        "../../common/components/ListItem": "ListItem",
        "./ImageItem": "ImageItem"
    }],
    ImageItem: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "d13ebQPxphP374MCgZ5yu1Z", "ImageItem"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = t("../../common/components/ListItem"),
            i = t("./TitleItem"),
            s = t("./ImageGroupItem"),
            a = cc._decorator,
            r = a.ccclass,
            c = a.property,
            p = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.bonusNode = null, e.normalNode = null, e.avatorSp = null, e.indexLabel = null, e.lockNode = null, e.adNode = null, e.finishAnimation = null, e.cfg = null, e
                }
                return __extends(e, t), e.prototype.onUpdateData = function(t) {
                    var e = this,
                        o = t.id,
                        n = t.groupId,
                        i = t.isBonus,
                        s = app.cfgs.svgCfg[o];
                    this.cfg = s;
                    var a = app.user,
                        r = n <= a.getMaxUnlockedGroup();
                    this.bonusNode.active = i, this.normalNode.active = !i, this.indexLabel.string = "", this.avatorSp.spriteFrame = null, this.lockNode.active = !r && !i;
                    var c = 1 == s.type || a.isImageUnlock(o);
                    this.adNode.active = r && !c, (r || i) && (a.isFinishedImage(o) ? (this.bonusNode.active = !1, this.normalNode.active = !0, this.adNode.active = !1, cc.loader.loadRes("shapes" + s.icon, cc.SpriteFrame, function(t, o) {
                        t ? console.log(t) : e.avatorSp.spriteFrame = o
                    })) : (this.indexLabel.string = s.name, this.avatorSp.spriteFrame = null))
                }, e.prototype.onItemClick = function() {
                    var t = this;
                    if (app.soundMgr.playClick(), !this.data.isBonus && this.data.groupId > app.user.getMaxUnlockedGroup()) {
                        var e = this.data.unlockNum - app.user.getFinishCount();
                        return app.showTip("complete " + e + " more artworks to unlock it"), void console.log("尚未解锁")
                    }
                    if (cc.loader.loadRes("shapes" + this.cfg.icon, cc.SpriteFrame, function(e) {
                            e ? console.log("err") : console.log(t.cfg.icon, "=====")
                        }), cc.loader.loadRes("shapes" + this.cfg.svg), this.adNode.active) {
                        var o = app.platformMgr;
                        o.isVideoLoad() ? o.showVideoAd("unlockimg_" + this.data.id, function() {
                            app.user.unlockImage(t.data.id), t.adNode.active = !1, t.entryGame()
                        }) : (app.platformMgr.chooseFriends("unlockimg_" + this.data.id, function(e) {
                            e || (app.user.unlockImage(t.data.id), t.adNode.active = !1, t.entryGame())
                        }), console.log("没有视频"))
                    } else this.cfg.isShare ? app.pageMgr.showDialog("ConfirmDialog", {
                        tip: "Are you an animal protector? ",
                        onNo: function() {
                            t.entryGame()
                        },
                        onYes: function() {
                            t.entryGame(), app.showTip("Good , me too.")
                        }
                    }) : this.entryGame()
                }, e.prototype.entryGame = function() {
                    var t = this,
                        e = this.node.getChildByName("borderin"),
                        o = this.node.getChildByName("borderout");
                    e.runAction(cc.rotateBy(1, 45)), o.runAction(cc.rotateBy(1, -45)), app.maskFadeIn(function() {
                        e.stopAllActions(), o.stopAllActions(), e.angle = 0, o.angle = 0, app.pageMgr.showPage("GameMain", {
                            groupId: t.data.groupId,
                            shapeId: t.data.id,
                            shape: t.cfg.svg,
                            item: t,
                            iconurl: "shapes" + t.cfg.icon
                        })
                    })
                }, e.prototype.onFinishImage = function(t) {
                    console.log("onFinishImage", t), app.soundMgr.play("suc");
                    for (var e = this.listView.getShowItems(), o = 0; o < e.length; o++) e[o] instanceof i.default ? e[o].refresh() : t && e[o] instanceof s.default && e[o].refresh();
                    this.onUpdateData(this.data);
                    var n = this.avatorSp.node;
                    n.opacity = 1, n.scale = 1;
                    n.runAction(cc.spawn(cc.fadeIn(.5), cc.scaleTo(.5, .5))), this.finishAnimation.play("wancheng"), this.node.getChildByName("di").runAction(cc.sequence(cc.delayTime(.5), cc.fadeIn(.1), cc.fadeOut(.4)))
                }, __decorate([c(cc.Node)], e.prototype, "bonusNode", void 0), __decorate([c(cc.Node)], e.prototype, "normalNode", void 0), __decorate([c(cc.Sprite)], e.prototype, "avatorSp", void 0), __decorate([c(cc.Label)], e.prototype, "indexLabel", void 0), __decorate([c(cc.Node)], e.prototype, "lockNode", void 0), __decorate([c(cc.Node)], e.prototype, "adNode", void 0), __decorate([c(cc.Animation)], e.prototype, "finishAnimation", void 0), e = __decorate([r], e)
            }(n.default);
        o.default = p, cc._RF.pop()
    }, {
        "../../common/components/ListItem": "ListItem",
        "./ImageGroupItem": "ImageGroupItem",
        "./TitleItem": "TitleItem"
    }],
    JumpGame: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "66494Pi8V5LNZlrZyCD/5Wm", "JumpGame"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            i = n.ccclass,
            s = n.property,
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.img = null, e.data = null, e
                }
                return __extends(e, t), e.prototype.start = function() {
                    this.node.on("click", this.onSwitchGame.bind(this))
                }, e.prototype.onEnable = function() {
                    var t = this;
                    if (!this.data) {
                        this.getComponent(cc.Button).interactable = !1;
                        var e = "Other";
                        switch (cc.sys.os) {
                            case cc.sys.OS_IOS:
                                e = "IOS";
                                break;
                            case cc.sys.OS_ANDROID:
                                e = "ANDROID";
                                break;
                            case cc.sys.OS_WINDOWS:
                                e = "WINDOWS";
                                break;
                            case cc.sys.OS_OSX:
                                e = "MAC"
                        }
                        var o = {
                            playerId: app.platformMgr.getPlayerID(),
                            nickname: app.platformMgr.getPlayerName(),
                            appId: window.FB_APPID,
                            locale: cc.sys.language,
                            deviceOS: e,
                            timezoneOffset: (new Date).getTimezoneOffset()
                        };
                        NetHelper.getRecommendGames(o, function(e) {
                            e.data.ads && e.data.ads.length > 0 && t.setAdData(e.data.ads[0])
                        })
                    }
                }, e.prototype.setAdData = function(t) {
                    var e = this;
                    switch (this.data = t, cc.loader.load({
                        url: t.icon,
                        type: "jpg"
                    }, function(t, o) {
                        t ? console.log(t) : (e.img.spriteFrame = new cc.SpriteFrame(o), e.getComponent(cc.Button).interactable = !0)
                    }), this.node.stopAllActions(), t.breathType) {
                        case 1:
                            this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.7, 1.1), cc.scaleTo(.7, 1))));
                            break;
                        case 2:
                            this.node.runAction(cc.repeatForever(cc.sequence(cc.rotateBy(.5, 5), cc.rotateBy(.5, -5))))
                    }
                }, e.prototype.onSwitchGame = function() {
                    var t = this;
                    app.platformMgr.logEvent("switch_game_click"), window.FBInstant && FBInstant.switchGameAsync(this.data.appId, {
                        from: window.GameName,
                        switchGameInfo: {
                            appId: window.FB_APPID,
                            appName: window.GameName
                        },
                        type: window.GameName
                    }).then(function() {
                        app.platformMgr.logEvent("switch_game_success", {
                            game: t.data.appName,
                            appId: t.data.appId
                        })
                    }).catch(function(t) {
                        console.log(t)
                    })
                }, __decorate([s(cc.Sprite)], e.prototype, "img", void 0), e = __decorate([i], e)
            }(cc.Component);
        o.default = a, cc._RF.pop()
    }, {}],
    ListItem: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "b50f0OZKutA+JBNDzD5qg3I", "ListItem"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            i = n.ccclass,
            s = (n.property, function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.itemIndex = 0, e.data = {}, e.listView = null, e
                }
                return __extends(e, t), e.prototype.onUpdateData = function(t) {}, e.prototype.refresh = function() {
                    this.onUpdateData(this.data)
                }, e = __decorate([i], e)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    ListView: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "dfd40gLHkxK6Jh0pEiI3oVg", "ListView"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            i = n.ccclass,
            s = n.property,
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.itemPrefabs = [], e.spacing = 0, e.topSpacing = 0, e.leftSpacing = 0, e.itemsNode = [], e.itemsData = [], e.nodePools = [], e.startX = 0, e.endX = 0, e.startIndexX = 1, e.endIndexX = -1, e.startY = 0, e.endY = 0, e.startIndexY = 1, e.endIndexY = -1, e.buffLength = 200, e
                }
                return __extends(e, t), e.prototype.onLoad = function() {
                    console.log(this.node.name, this.itemPrefabs[0].name);
                    for (var t = 0, e = 0, o = 0; o < this.itemPrefabs.length; o++) this.nodePools[o] = new cc.NodePool, t = Math.max(t, this.itemPrefabs[o].data.height), e = Math.max(t, this.itemPrefabs[o].data.width);
                    this.buffLength = this.vertical ? 2.5 * t : 2.5 * e, this.getComponent(cc.Mask) || this.addComponent(cc.Mask), this.vertical ? (this.node.y += (1 - this.node.anchorY) * this.node.height, this.node.anchorY = 1, this.content.y = 0) : (this.node.x -= this.node.anchorX * this.node.width, this.node.anchorX = 0, this.content.x = 0)
                }, e.prototype.start = function() {}, e.prototype.init = function() {
                    var t = this.itemsData[0],
                        e = this.getItemNode(t);
                    if (this.itemsNode.push(e), this.content.addChild(e), this.vertical) {
                        var o = this.getItemHeight(t);
                        e.y = -o / 2 - this.spacing / 2 - this.topSpacing, this.startY = e.y, this.endY = e.y, this.startIndexY = 0, this.endIndexY = 0, this.onItemChange(e, 0, t)
                    } else {
                        var n = this.getItemWidth(t);
                        e.x = n / 2 + this.spacing / 2 + this.leftSpacing, this.startX = e.x, this.endX = e.x, this.startIndexX = 0, this.endIndexX = 0, this.onItemChange(e, 0, t)
                    }
                }, e.prototype.setItemsData = function(t) {
                    this.itemsData = t, this.updateContentSize(t), this.init()
                }, e.prototype.updateContentSize = function(t) {
                    for (var e = this.topSpacing, o = this.leftSpacing, n = 0; n < t.length; n++) e += this.getItemHeight(t[n]) + this.spacing, o += this.getItemWidth(t[n]) + this.spacing;
                    this.vertical && this.horizontal && (console.warn("不能同时开始水平和垂直 只能单一方向 已自动关闭水平滑动"), this.horizontal = !1), this.vertical ? (this.content.height = e, this.content.width = this.node.width, this.content.anchorX = .5, this.content.anchorY = 1) : (this.content.height = this.node.height, this.content.width = o, this.content.anchorX = 0, this.content.anchorY = .5)
                }, e.prototype.getItemsData = function() {
                    return this.itemsData
                }, e.prototype.getItemData = function(t) {
                    if (!(t < 0 || t > this.itemsData.length)) return this.itemsData[t];
                    console.log("invalid index", t)
                }, e.prototype.setItemData = function(t, e) {
                    if (t < 0 || t > this.itemsData.length) console.log("invalid index", t);
                    else if (this.itemsData[t] = e, t >= this.startIndexY && t <= this.endIndexY) {
                        var o = this.itemsNode[t - this.startIndexY];
                        this.onItemChange(o, t, e)
                    }
                }, e.prototype.getShowItems = function() {
                    for (var t = [], e = 0; e < this.itemsNode.length; e++) {
                        var o = this.itemsNode[e];
                        t.push(o.getComponent(o.name))
                    }
                    return t
                }, e.prototype.insertVerticle = function(t, e) {
                    if (this.content.height += this.getItemHeight(t) + this.spacing, e >= this.startIndexY && e <= this.endIndexY + 1) {
                        var o = this.getItemNode(t);
                        this.content.addChild(o), this.onItemChange(o, e, t);
                        var n = this.getItemHeight(t),
                            i = 0;
                        if (e <= this.endIndexY) {
                            i = this.getItemHeight(this.itemsData[e + 1]), o.y = this.itemsNode[e - this.startIndexY].y + n / 2 + i / 2 - n;
                            for (var s = e - this.startIndexY; s < this.itemsNode.length; s++) {
                                var a = this.itemsNode[s];
                                a.y -= n + this.spacing, a.getComponent(a.name).itemIndex++
                            }
                            this.endY = this.itemsNode[this.itemsNode.length - 1].y, this.startY = this.itemsNode[0].y
                        } else {
                            var r = this.getItemHeight(this.itemsData[e - 1]);
                            o.y = this.endY - n / 2 - r / 2 - this.spacing, o.getComponent(o.name).itemIndex++, this.endY = o.y
                        }
                        this.itemsNode.splice(e - this.startIndexY, 0, o), e == this.startIndexY && 0 != this.startIndexY ? this.startIndexY-- : this.endIndexY++
                    }
                }, e.prototype.insertHorizontal = function(t, e) {
                    if (this.content.width += this.getItemWidth(t) + this.spacing, e >= this.startIndexX && e <= this.endIndexX) {
                        var o = this.getItemNode(t);
                        this.content.addChild(o), this.onItemChange(o, e, t);
                        var n = this.getItemWidth(t),
                            i = 0;
                        if (e <= this.endIndexX) {
                            i = this.getItemWidth(this.itemsData[e + 1]), o.x = this.itemsNode[e - this.startIndexX].x - n / 2 - i / 2 + n;
                            for (var s = e - this.startIndexX; s < this.itemsNode.length; s++) {
                                var a = this.itemsNode[s];
                                a.x += n + this.spacing, a.getComponent(a.name).itemIndex++
                            }
                            this.endX = this.itemsNode[this.itemsNode.length - 1].x, this.startX = this.itemsNode[0].x
                        } else {
                            var r = this.getItemWidth(this.itemsData[e - 1]);
                            o.x = this.endX + n / 2 + r / 2 + this.spacing, o.getComponent(o.name).itemIndex++, this.endX = o.x
                        }
                        this.itemsNode.splice(e - this.startIndexX, 0, o), e == this.startIndexX && 0 != this.startIndexX ? this.startIndexX-- : this.endIndexX++
                    }
                }, e.prototype.insertItemData = function(t, e) {
                    this.itemsData.splice(e, 0, t), this.vertical ? this.insertVerticle(t, e) : this.insertHorizontal(t, e)
                }, e.prototype.removeItemData = function(t) {
                    var e = this.itemsData.splice(t, 1)[0];
                    if (this.vertical) {
                        if (this.content.height -= this.getItemHeight(e) + this.spacing, t >= this.startIndexY && t <= this.endIndexY) {
                            for (var o = this.getItemHeight(e), n = this.getItemHeight(this.itemsData[t - 1]), i = t - this.startIndexY; i < this.itemsNode.length; i++) {
                                var s = this.itemsNode[i];
                                s.y += o + this.spacing, s.getComponent(s.name).itemIndex--
                            }
                            var a = this.itemsNode.splice(t - this.startIndexY, 1)[0];
                            this.recyclingItemNode(e, a), this.startIndexY == t && (this.startIndexY++, this.startY = this.itemsNode[0].y), this.endIndexY--, this.endY += n / 2 + o / 2 + this.spacing
                        }
                    } else if (this.content.width -= this.getItemWidth(e) + this.spacing, t >= this.startIndexX && t <= this.endIndexX) {
                        var r = this.getItemWidth(e),
                            c = this.getItemWidth(this.itemsData[t - 1]);
                        for (i = t - this.startIndexX; i < this.itemsNode.length; i++) {
                            var p = this.itemsNode[i];
                            p.x -= r + this.spacing, p.getComponent(p.name).itemIndex--
                        }
                        a = this.itemsNode.splice(t - this.startIndexX, 1)[0];
                        this.recyclingItemNode(e, a), this.startIndexX == t && (this.startIndexX++, this.startX = this.itemsNode[0].x), this.endIndexX--, this.endX -= c / 2 + r / 2 + this.spacing
                    }
                }, e.prototype.scrollToIndex = function(t, e) {
                    void 0 === e && (e = 0);
                    var o = this.itemsData;
                    if (t < 0 || t >= o.length) console.log("invalid index", t);
                    else {
                        for (var n = cc.v2(), i = 0; i < t; i++) this.vertical ? n.y += this.getItemHeight(o[i]) : n.x += this.getItemWidth(o[i]);
                        e > 0 ? this.scrollToOffset(n, e) : this.scrollToOffset(n)
                    }
                }, e.prototype.getItemHeight = function(t) {
                    return this.itemPrefabs[t.prefabIndex || 0].data.height
                }, e.prototype.getItemWidth = function(t) {
                    return this.itemPrefabs[t.prefabIndex || 0].data.width
                }, e.prototype.getItemNode = function(t) {
                    var e = t.prefabIndex || 0,
                        o = this.nodePools[e];
                    return o.size() > 0 ? o.get() : cc.instantiate(this.itemPrefabs[e])
                }, e.prototype.onItemChange = function(t, e, o) {
                    var n = t.getComponent(t.name);
                    n.itemIndex = e, n.data = o, n.listView = this, n.onUpdateData(o)
                }, e.prototype.recyclingItemNode = function(t, e) {
                    var o = t.prefabIndex || 0;
                    this.nodePools[o].put(e)
                }, e.prototype.recyclingTopNode = function() {
                    var t = this.itemsNode.shift(),
                        e = this.itemsData[this.startIndexY];
                    this.recyclingItemNode(e, t);
                    var o = 0;
                    this.startIndexY + 1 < this.itemsData.length && (o = this.getItemHeight(this.itemsData[this.startIndexY + 1])), this.startY = this.startY - this.getItemHeight(e) / 2 - o / 2 - this.spacing, this.startIndexY++
                }, e.prototype.recyclingBottomNode = function() {
                    var t = this.itemsNode.pop(),
                        e = this.itemsData[this.endIndexY];
                    this.recyclingItemNode(e, t);
                    var o = 0;
                    this.endIndexY - 1 >= 0 && (o = this.getItemHeight(this.itemsData[this.endIndexY - 1])), this.endY = this.endY + this.getItemHeight(e) / 2 + o / 2 + this.spacing, this.endIndexY--
                }, e.prototype.updateVerticle = function() {
                    var t, e = this.content.y,
                        o = this.node.height * (1 - this.node.anchorY),
                        n = -this.node.height * this.node.anchorY,
                        i = !1;
                    if ((this.startY + e > o + this.buffLength && (this.recyclingTopNode(), i = !0), this.endY + e < n - this.buffLength && (this.recyclingBottomNode(), i = !0), this.startY + e < o + .2 * this.buffLength) && ((t = this.startIndexY - 1) >= 0 && t < this.itemsData.length)) {
                        var s = this.itemsData[t],
                            a = this.getItemNode(s);
                        this.content.addChild(a), this.onItemChange(a, t, s);
                        var r = this.getItemHeight(s),
                            c = 0;
                        this.startIndexY < this.itemsData.length && (c = this.getItemHeight(this.itemsData[this.startIndexY])), a.y = this.startY + r / 2 + c / 2 + this.spacing, this.itemsNode.unshift(a), this.startY = a.y, this.startIndexY = t, i = !0
                    }
                    if (this.endY + e > -this.node.height - .2 * this.buffLength && ((t = this.endIndexY + 1) >= 0 && t < this.itemsData.length)) {
                        s = this.itemsData[t], a = this.getItemNode(s);
                        this.content.addChild(a), this.onItemChange(a, t, s);
                        r = this.getItemHeight(s);
                        var p = 0;
                        this.endIndexY >= 0 && (p = this.getItemHeight(this.itemsData[this.endIndexY])), a.y = this.endY - r / 2 - p / 2 - this.spacing, this.itemsNode.push(a), this.endY = a.y, this.endIndexY = t, i = !0
                    }
                    return i
                }, e.prototype.recyclingLeftNode = function() {
                    console.log("recycling left");
                    var t = this.itemsNode.shift(),
                        e = this.itemsData[this.startIndexX];
                    this.recyclingItemNode(e, t);
                    var o = 0;
                    this.startIndexX + 1 < this.itemsData.length && (o = this.getItemWidth(this.itemsData[this.startIndexX + 1])), this.startX = this.startX + this.getItemWidth(e) / 2 + o / 2 + this.spacing, this.startIndexX++
                }, e.prototype.recyclingRightNode = function() {
                    console.log("recycling right");
                    var t = this.itemsNode.pop(),
                        e = this.itemsData[this.endIndexX];
                    this.recyclingItemNode(e, t);
                    var o = 0;
                    this.endIndexX - 1 >= 0 && (o = this.getItemWidth(this.itemsData[this.endIndexX - 1])), this.endX = this.endX - this.getItemHeight(e) / 2 - o / 2 - this.spacing, this.endIndexX--
                }, e.prototype.updateHorizontal = function() {
                    var t, e = this.content.x,
                        o = this.node.width * this.node.anchorX,
                        n = this.node.width * (1 - this.node.anchorX),
                        i = !1;
                    if ((this.startX + e < o - this.buffLength && (this.recyclingLeftNode(), i = !0), this.endX + e > n + this.buffLength && (this.recyclingRightNode(), i = !0), this.startX + e > o - .2 * this.buffLength) && ((t = this.startIndexX - 1) >= 0 && t < this.itemsData.length)) {
                        var s = this.itemsData[t],
                            a = this.getItemNode(s);
                        this.content.addChild(a), this.onItemChange(a, t, s);
                        var r = this.getItemWidth(s),
                            c = 0;
                        this.startIndexX < this.itemsData.length && (c = this.getItemWidth(this.itemsData[this.startIndexX])), a.x = this.startX - r / 2 - c / 2 - this.spacing, this.itemsNode.unshift(a), this.startX = a.x, this.startIndexX = t, i = !0
                    }
                    if (this.endX + e < this.node.width + .2 * this.buffLength && ((t = this.endIndexX + 1) >= 0 && t < this.itemsData.length)) {
                        s = this.itemsData[t], a = this.getItemNode(s);
                        this.content.addChild(a), this.onItemChange(a, t, s);
                        r = this.getItemWidth(s);
                        var p = 0;
                        this.endIndexX >= 0 && (p = this.getItemWidth(this.itemsData[this.endIndexX])), a.x = this.endX + r / 2 + p / 2 + this.spacing, this.itemsNode.push(a), this.endX = a.x, this.endIndexX = t, i = !0
                    }
                    return i
                }, e.prototype.update = function(e) {
                    if (t.prototype.update.call(this, e), this.vertical)
                        for (; this.updateVerticle(););
                    else
                        for (; this.updateHorizontal(););
                }, __decorate([s([cc.Prefab])], e.prototype, "itemPrefabs", void 0), __decorate([s], e.prototype, "spacing", void 0), __decorate([s], e.prototype, "topSpacing", void 0), __decorate([s], e.prototype, "leftSpacing", void 0), e = __decorate([i], e)
            }(cc.ScrollView);
        o.default = a, cc._RF.pop()
    }, {}],
    NetHelper: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "03cf1EKXjpD/qhxj6ncF81D", "NetHelper"), t("GameConfig");
        var n = t("md5"),
            i = window.GameName,
            s = window.GameVersion,
            a = window.KEYPART1,
            r = window.KEYPART2,
            c = window.KEYPART3,
            p = window.KEYPART4,
            h = window.BOT_URL,
            d = window.GAME_ID,
            u = window.SERVER_URL,
            l = !1,
            f = !1,
            g = {},
            m = function() {
                function t() {}
                return t.sendErrorReport = function(t) {
                    try {
                        if (g[t.message]) return;
                        g[t.message] = !0;
                        var e = {
                                game: i,
                                version: s,
                                type: "code_error",
                                msg: t.message + "\n" + t.stack,
                                url: t.source,
                                line: t.line,
                                col: t.colno,
                                error: t.stack
                            },
                            o = new XMLHttpRequest;
                        o.open("POST", "https://client-report.capjoy.com:1443/api/v1/logs/"), o.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), o.send(JSON.stringify(e)), console.log("sendReported", e)
                    } catch (t) {}
                }, t.postToServer = function(t, e, o) {
                    void 0 === o && (o = function(t) {});
                    var n = new XMLHttpRequest;
                    n.open("POST", t), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.onreadystatechange = function() {
                        if (4 == n.readyState) {
                            console.log(n.responseText);
                            try {
                                o(JSON.parse(n.responseText))
                            } catch (t) {
                                o(n.responseText)
                            }
                        }
                    };
                    var i = "";
                    if (e)
                        for (var s = Object.keys(e), a = 0; a < s.length; a++) a > 0 && (i += "&"), i += s[a] + "=" + e[s[a]];
                    n.send(i), console.log("post ", t), console.log("params ", i)
                }, t.sendFriendsToBot = function(t, e) {
                    var o = a,
                        i = r,
                        s = c,
                        d = p,
                        u = {
                            action: "friends",
                            playerId: t,
                            payload: e
                        },
                        l = JSON.stringify(u),
                        f = {
                            data: l,
                            sign: n(l + o + i + s + d)
                        };
                    this.postToServer(h, f)
                }, t.getRecommendGames = function(t, e) {
                    this.postToServer(u + "/fbapi/v0/getRecommendGames", t, e)
                }, t.sendAd = function(t, e, o) {
                    var n = {
                        v: s
                    };
                    this.postToServer(u + "/fbapi/v0/ads/report/" + t + "/" + o + "/" + e, n)
                }, t.sendShare = function(t, e, o) {
                    if (t != e) {
                        var n = {
                            playerId: t,
                            sharePlayerId: e,
                            type: o
                        };
                        this.postToServer(u + "/api/game/v0/shareUpdate_" + d, n)
                    }
                }, t.getShareCount = function(t, e, o) {
                    var n = {
                        playerId: t,
                        type: e
                    };
                    this.postToServer(u + "/api/game/v0/shareGet_" + d, n, function(t) {
                        0 == t.error ? o(parseInt(t.data.count)) : o(0)
                    })
                }, t.getFuntionOpen = function(t, e, o) {
                    if (f) o(l);
                    else {
                        var n = {
                            locale: cc.sys.language,
                            nickname: t,
                            timezoneOffset: (new Date).getTimezoneOffset(),
                            playerId: e,
                            appId: window.FB_APPID
                        };
                        this.postToServer(u + "/fbapi/v0/testCase_" + d, n, function(t) {
                            0 == t.error ? (l = 1 == parseInt(t.data), o(l)) : o(!1), f = !0
                        })
                    }
                }, t
            }();
        window.NetHelper = m, cc._RF.pop()
    }, {
        GameConfig: "GameConfig",
        md5: "md5"
    }],
    PackageItem: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "fd2c9bYWfZFUae2MVwH7aI+", "PackageItem"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = t("../../common/components/ListItem"),
            i = cc._decorator,
            s = i.ccclass,
            a = i.property,
            r = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.fbNode = null, e.packSp = null, e.priceLabel = null, e
                }
                return __extends(e, t), e.prototype.onUpdateData = function(t) {
                    var e = this,
                        o = t.pack;
                    cc.loader.loadRes("packs/" + o.id, cc.SpriteFrame, function(t, o) {
                        t ? console.log(t) : e.packSp.spriteFrame = o
                    }), this.priceLabel.string = app.platformMgr.getPrice(o.productId, o.name), this.fbNode.active = o.isShare, o.isShare && (this.priceLabel.string = o.name)
                }, e.prototype.onBuy = function() {
                    var t = this,
                        e = this.data.pack;
                    if (e.isShare) {
                        app.soundMgr.playClick();
                        "p1" == e.id ? app.pageMgr.showDialog("ConfirmDialog", {
                            tip: "This card pack is full of rare animals that are on the verge of extinction.I hope that you can share it on Facebook's timeline, let more people know about them and protect them!",
                            onNo: function() {
                                t.onBuySuccess()
                            },
                            onYes: function() {
                                Utils.shareImage("packs/" + e.id + "_share", {
                                    from: "share_" + e.id,
                                    text: "",
                                    data: {}
                                }, function(e) {
                                    console.log("share cb"), t.onBuySuccess()
                                })
                            }
                        }) : Utils.shareImage("packs/" + e.id + "_share", {
                            from: "share_" + e.id,
                            text: "",
                            data: {}
                        }, function(e) {
                            console.log("share cb"), t.onBuySuccess()
                        })
                    } else app.platformMgr.purchase(e.productId, function() {
                        t.onBuySuccess()
                    }, function() {})
                }, e.prototype.onBuySuccess = function() {
                    var t = this.data.pack.id;
                    app.user.setPackageBuy(t), this.listView.removeItemData(this.itemIndex);
                    for (var e = this.data.pack.packages, o = this.itemIndex + 1, n = 0; n < e.length; n++) {
                        var i = e[n];
                        this.listView.insertItemData({
                            prefabIndex: 1,
                            groupId: this.data.groupId,
                            unlockNum: this.data.unlockNum,
                            shapes: i.shapes,
                            isBonus: !0
                        }, o + n)
                    }
                }, __decorate([a(cc.Node)], e.prototype, "fbNode", void 0), __decorate([a(cc.Sprite)], e.prototype, "packSp", void 0), __decorate([a(cc.Label)], e.prototype, "priceLabel", void 0), e = __decorate([s], e)
            }(n.default);
        o.default = r, cc._RF.pop()
    }, {
        "../../common/components/ListItem": "ListItem"
    }],
    PageMgr: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "773a6JMbetEq4sitEq4u0pL", "PageMgr");
        var n = {},
            i = 0,
            s = null,
            a = null,
            r = 0,
            c = function() {
                function t(t) {
                    this.getPageAsync = function(t, e) {
                        var o = this;
                        return void 0 === e && (e = !1), new Promise(function(i, a) {
                            if (n[t]) i(n[t]);
                            else {
                                var r = o.showLoading,
                                    c = o.hideLoading;
                                e && (r = function(t) {
                                    t && t()
                                }, c = function(t) {
                                    t && t()
                                }), r(function() {
                                    s.platformMgr.logEvent("load_page", {
                                        name: t
                                    }), cc.loader.loadRes("prefabs/pages/" + t, function(e, n) {
                                        if (e) return c(), console.log("getPageAsync err", t), void a(e);
                                        s.platformMgr.logEvent("load_page_finish", {
                                            name: t
                                        });
                                        var r = cc.instantiate(n);
                                        r.active = !1, cc.find("Canvas/pages").addChild(r), o.register(t, r), i(r), c()
                                    })
                                })
                            }
                        })
                    }, this.showDialog = function(t, e) {
                        var o = this;
                        void 0 === e && (e = null), console.log("showDialog==", t, e);
                        var s = n[t];
                        s ? (s.active || (0 == r && (a.active = !0, a.zIndex = ++i), r++), s.zIndex = ++i, s.active = !0, s.getComponent(t) && (a.color = s.getComponent(t).getMaskColor(), a.opacity = s.getComponent(t).getMaskOpacity(), s.getComponent(t).onUpdateData(e), s.getComponent(t).runShowActions())) : this.getPageAsync(t).then(function(n) {
                            o.showDialog(t, e)
                        }).catch(function(t) {
                            console.log(t)
                        })
                    }, s = t, (a = cc.find("Canvas/pages/dialogmask")).active = !1
                }
                return t.prototype.register = function(t, e) {
                    n[t] = e
                }, t.prototype.showPage = function(t, e) {
                    var o = this;
                    void 0 === e && (e = null), console.log("showPage==", t, e);
                    var s = n[t];
                    s ? (this.hideAllPages(), s.zIndex = ++i, s.active = !0, s.getComponent(t) && (s.getComponent(t).onUpdateData(e), s.getComponent(t).onShow())) : this.getPageAsync(t).then(function(n) {
                        o.showPage(t, e)
                    }).catch(function(t) {
                        console.log(t)
                    })
                }, t.prototype.hidePage = function(t) {
                    console.log("hidePage==", t), n[t] && n[t].active && (n[t].getComponent(t) && n[t].getComponent(t).onHide(), n[t].active = !1)
                }, t.prototype.hideDialog = function(t) {
                    console.log("hideDialog==", t), n[t] && n[t].active && (0 == --r && (r = 0, a.active = !1), n[t].getComponent(t) ? n[t].getComponent(t).runHideActions(function() {
                        n[t].active = !1
                    }) : n[t].active = !1)
                }, t.prototype.hideAllPages = function() {
                    r = 0, a.active = !1, Object.keys(n).forEach(function(t) {
                        n[t].active = !1
                    })
                }, t.prototype.showLoading = function(t) {
                    void 0 === t && (t = null), t && t()
                }, t.prototype.hideLoading = function(t) {
                    void 0 === t && (t = null), t && t()
                }, t
            }();
        window.PageMgr = c, cc._RF.pop()
    }, {}],
    PlatHelper: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "75f49fIOWNNILBO5MeO/cPc", "PlatHelper");
        var n = function() {
            function t() {}
            return t.prototype.init = function() {}, t.prototype.isInterstitialLoad = function() {
                return !1
            }, t.prototype.showInterstitialAd = function(t, e) {}, t.prototype.isVideoLoad = function() {
                return !1
            }, t.prototype.showVideoAd = function(t, e) {}, t.prototype.showBannerAd = function() {}, t.prototype.hideBannerAd = function() {}, t.prototype.autoShowAd = function(t) {}, t.prototype.logEvent = function(t, e, o) {}, t.prototype.getDataAsync = function(t) {
                return Promise.resolve()
            }, t.prototype.setDataAsync = function(t, e) {
                return Promise.resolve()
            }, t.prototype.subscribeBotAsync = function() {
                return Promise.resolve()
            }, t.prototype.createShortcutAsync = function() {
                return Promise.resolve()
            }, t.prototype.getContextID = function() {
                return null
            }, t.prototype.getPlayerID = function() {
                return "playerid001"
            }, t.prototype.getPlayerName = function() {
                return "player name"
            }, t.prototype.getPlayerPhoto = function() {
                return null
            }, t.prototype.getConnectedPlayersAsync = function() {
                return Promise.resolve()
            }, t.prototype.isPayReady = function() {
                return !0
            }, t.prototype.getPrice = function(t, e) {
                return e
            }, t.prototype.purchase = function(t, e, o) {
                e()
            }, t.prototype.chooseFriends = function(t, e) {
                e && e()
            }, t.prototype.playWithFriend = function(t, e, o) {
                o && o()
            }, t.prototype.playWithGroup = function(t, e, o) {
                o && o()
            }, t.prototype.sendMessageToFriend = function(t, e) {
                e && e()
            }, t.prototype.shareGame = function(t, e) {
                e && e()
            }, t
        }();
        window.PlatHelper = n, cc._RF.pop()
    }, {}],
    PlatfomMgr: [function(t, e, o) {
        "use strict";
        var n;
        cc._RF.push(e, "fb7acujorpNnpe5bezE676r", "PlatfomMgr"),
            function(t) {
                t[t.FBINSTANT = 1] = "FBINSTANT", t[t.WXINSTANT = 2] = "WXINSTANT", t[t.NATIVE = 3] = "NATIVE", t[t.WEB = 4] = "WEB", t[t.DEBUG = 5] = "DEBUG"
            }(n || (n = {}));
        var i = function() {
            function t(t) {
                this.isWX = !1, this.isFB = !1, this.app = t, this.platform = cc.sys.isNative ? n.NATIVE : this.platform, this.platform = cc.sys.isBrowser ? n.WEB : this.platform, this.platform = window.FBInstant ? n.FBINSTANT : this.platform, this.platform = window.wx ? n.WXINSTANT : this.platform, this.isWX = this.platform == n.WXINSTANT, this.isFB = this.platform == n.FBINSTANT, this.isWX ? this.platHelper = new WXHelper : this.isFB ? this.platHelper = new FBHelper : this.platHelper = new DefaultHelper
            }
            return t.prototype.init = function() {
                this.platHelper.init()
            }, t.prototype.isInterstitialLoad = function() {
                return this.platHelper.isInterstitialLoad()
            }, t.prototype.showInterstitialAd = function(t, e) {
                void 0 === e && (e = function() {}), this.platHelper.showInterstitialAd(t, e)
            }, t.prototype.isVideoLoad = function() {
                return this.platHelper.isVideoLoad()
            }, t.prototype.showVideoAd = function(t, e) {
                void 0 === e && (e = function() {}), this.platHelper.showVideoAd(t, e)
            }, t.prototype.showBannerAd = function() {
                this.platHelper.showBannerAd()
            }, t.prototype.hideBannerAd = function() {
                this.platHelper.hideBannerAd()
            }, t.prototype.autoShowAd = function(t) {
                this.platHelper.autoShowAd(t)
            }, t.prototype.logEvent = function(t, e, o) {
                void 0 === e && (e = {}), void 0 === o && (o = 1), this.platHelper.logEvent(t, e, o)
            }, t.prototype.getDataAsync = function(t) {
                return this.platHelper.getDataAsync(t)
            }, t.prototype.setDataAsync = function(t, e) {
                return this.platHelper.setDataAsync(t, e)
            }, t.prototype.subscribeBotAsync = function() {
                return this.platHelper.subscribeBotAsync()
            }, t.prototype.createShortcutAsync = function() {
                return app.user.shotcutCreated ? Promise.resolve() : this.platHelper.createShortcutAsync()
            }, t.prototype.getContextID = function() {
                return this.platHelper.getContextID()
            }, t.prototype.getPlayerID = function() {
                return this.platHelper.getPlayerID()
            }, t.prototype.getPlayerName = function() {
                return this.platHelper.getPlayerName()
            }, t.prototype.getPlayerPhoto = function() {
                return this.platHelper.getPlayerPhoto()
            }, t.prototype.getConnectedPlayersAsync = function() {
                return this.platHelper.getConnectedPlayersAsync()
            }, t.prototype.isPayReady = function() {
                return this.platHelper.isPayReady()
            }, t.prototype.getPrice = function(t, e) {
                return this.platHelper.getPrice(t, e)
            }, t.prototype.purchase = function(t, e, o) {
                this.platHelper.purchase(t, e, o)
            }, t.prototype.chooseFriends = function(t, e) {
                this.platHelper.chooseFriends(t, e)
            }, t.prototype.playWithFriend = function(t, e, o) {
                this.platHelper.playWithFriend(t, e, o)
            }, t.prototype.playWithGroup = function(t, e, o) {
                this.platHelper.playWithGroup(t, e, o)
            }, t.prototype.sendMessageToFriend = function(t, e) {
                this.platHelper.sendMessageToFriend(t, e)
            }, t.prototype.shareGame = function(t, e) {
                void 0 === e && (e = function(t) {}), this.platHelper.shareGame(t, e)
            }, t
        }();
        window.PlatfromMgr = i, cc._RF.pop()
    }, {}],
    PlayerControl: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "9c202Ht2tdB9Yy1a3f8DEvp", "PlayerControl"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = t("./TriangleMesh"),
            i = t("./GameMain"),
            s = cc._decorator,
            a = s.ccclass,
            r = s.property,
            c = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.targetNode = null, e.curId = null, e.guideType = 0, e.isPlaying = !1, e
                }
                return __extends(e, t), e.prototype.onLoad = function() {
                    this.beginTime = performance.now(), this.beginX = 0, this.beginY = 0, this.curX = 0, this.curY = 0, this.lastX = 0, this.lastY = 0, this.desX = 0, this.desY = 0, this.speed = Math.PI / cc.winSize.width, this.lastAngleZ = 0, this.angleThreshold = 4, this.isPlaying = !1
                }, e.prototype.onEnable = function() {}, e.prototype.startControl = function() {
                    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this), this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this), this.isPlaying = !0
                }, e.prototype.endControl = function() {
                    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this), this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this), this.isPlaying = !1
                }, e.prototype.onTouchBegin = function(t) {
                    this.beginTime = performance.now(), this.curId = t.getID(), this.desX = 0, this.desY = 0, this.beginX = t.currentTouch.getLocationX(), this.beginY = t.currentTouch.getLocationY(), this.curX = this.beginX, this.curY = this.beginY, this.lastX = this.beginX, this.lastY = this.beginY, this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
                }, e.prototype.onTouchMove = function(t) {
                    this.curId == t.getID() && this.isPlaying && (this.lastX = t.currentTouch.getLocationX(), this.lastY = t.currentTouch.getLocationY())
                }, e.prototype.onTouchEnd = function(t) {
                    if (this.curId == t.getID() && this.isPlaying && (this.lastX = t.currentTouch.getLocationX(), this.lastY = t.currentTouch.getLocationY(), this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this), !this.isFinish())) {
                        var e = performance.now() - this.beginTime;
                        this.desX = this.lastX + (this.lastX - this.beginX) / e * 100 * window.devicePixelRatio, this.desY = this.lastY + (this.lastY - this.beginY) / e * 100 * window.devicePixelRatio, Math.abs(this.desX - this.lastX) < 50 * window.devicePixelRatio && Math.abs(this.desY - this.lastY) < 50 * window.devicePixelRatio && (this.desX = 0, this.desY = 0)
                    }
                }, e.prototype.playEndAnimation = function(t) {
                    var e = this;
                    this.node.getChildByName("guide").active = !1, app.soundMgr.play("open_icon"), this.targetNode.runAction(cc.sequence(cc.rotate3DTo(.5, new cc.Quat(0, 0, 0, 1).fromEuler(cc.v3(0, 0, this.lastAngleZ))), cc.callFunc(function() {
                        for (var t = e.targetNode.children, o = 0; o < t.length; o++) t[o].removeComponent(n.default)
                    }), cc.rotate3DTo(Math.abs(this.lastAngleZ / 90), new cc.Quat(0, 0, 0, 1)), cc.callFunc(t)))
                }, e.prototype.isFinish = function() {
                    return (Math.abs(this.targetNode.eulerAngles.x) < this.angleThreshold || Math.abs(Math.abs(this.targetNode.eulerAngles.x) - 360) < this.angleThreshold) && (Math.abs(this.targetNode.eulerAngles.y) < this.angleThreshold || Math.abs(Math.abs(this.targetNode.eulerAngles.y) - 360) < this.angleThreshold)
                }, e.prototype.update = function() {
                    var t = this;
                    if (0 == this.desX && 0 == this.desY || (Math.abs(this.desX - this.lastX) > 2 && (this.lastX = this.lastX + .1 * (this.desX - this.lastX)), Math.abs(this.desY - this.lastY) > 2 && (this.lastY = this.lastY + .1 * (this.desY - this.lastY))), this.curX != this.lastX || this.curY != this.lastY) {
                        var e = this.lastX - this.curX,
                            o = this.lastY - this.curY;
                        1 == this.guideType ? o = 0 : 2 == this.guideType ? e = 0 : 3 == this.guideType && (e = o = e * o > 0 ? Math.min(e, o) : 0), this.curX = this.lastX, this.curY = this.lastY;
                        var s = .5 * this.speed * Math.sqrt(e * e + o * o),
                            a = new cc.Quat;
                        this.targetNode.getRotation(a);
                        var r = new cc.Quat,
                            c = cc.v3(-o, e, 0);
                        c.normalizeSelf();
                        var p = Math.sin(s);
                        r.x = p * c.x, r.y = p * c.y, r.z = p * c.z, r.w = Math.cos(s);
                        var h = new cc.Quat;
                        r.mul(a, h), this.targetNode.setRotation(h);
                        var d = this.targetNode.children,
                            u = cc.v3();
                        h.toEuler(u), this.lastAngleZ = u.z, u.x = Math.sin(-u.z * Math.PI / 180), u.y = Math.cos(-u.z * Math.PI / 180), u.z = 0;
                        for (var l = 0; l < d.length; l++) d[l].getComponent(n.default).up = u
                    }
                    this.isPlaying && this.isFinish() && (this.desX = 0, this.desY = 0, this.endControl(), this.playEndAnimation(function() {
                        console.log("过关"), t.getComponent(i.default).onLevelPass()
                    }))
                }, __decorate([r(cc.Node)], e.prototype, "targetNode", void 0), e = __decorate([a], e)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {
        "./GameMain": "GameMain",
        "./TriangleMesh": "TriangleMesh"
    }],
    ProjectStarter: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "362cdvsW8pPYL5OSk9k3Jbd", "ProjectStarter");
        var n = cc._decorator,
            i = n.ccclass,
            s = n.property;
        window.addEventListener && window.addEventListener("error", function(t) {
            window.FBInstant && NetHelper.sendErrorReport({
                message: t.message,
                source: t.filename,
                stack: t.error && t.error.stack,
                line: t.lineno,
                colno: t.colno
            })
        });
        (function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.contextId = null, e.pages = null, e
            }
            __extends(e, t), e.prototype.onLoad = function() {
                cc.find("Canvas/tipsNode").active = !1
            }, e.prototype.start = function() {
                this.app = window.app = new App, this.app.init(), window.lastScore = Math.floor(100 * Math.random())
            }, e.prototype.preStartGame = function(t) {
                console.log("preStartGame"), t()
            }, e.prototype.entryGame = function(t) {
                void 0 === t && (t = null), console.log("entryGame", t);
                var e = this.app.user,
                    o = this.app.platformMgr;
                o.init();
                var n = "default";
                t && (n = t.from || t.type || n), o.logEvent("entry_game", {
                    from: n,
                    index: e.getVersion(),
                    days: e.getLoginDayCount(),
                    isNew: e.isNewUser() ? "new" : "old"
                });
                var i = 0;
                setInterval(function() {
                    i++, o.logEvent("online_time", {
                        time: i
                    }, i)
                }, 6e4), o.subscribeBotAsync().then(function() {
                    o.createShortcutAsync()
                }), e.markOldUser(), this.app.pageMgr.showPage("GalleryPage")
            }, e.prototype.setPush = function() {
                var t = this.app.platformMgr,
                    e = this.app.user,
                    o = {};
                o.nickname = t.getPlayerName(), o.playerInfo = {
                    head: t.getPlayerPhoto(),
                    score: e.maxScore
                };
                var n = {
                    target: [],
                    tpl: [{
                        bg: "head_" + t.getPlayerID(),
                        t: t.getPlayerName() + " has joined the game!",
                        tm: 0,
                        bts: [{
                            t: "CHALLENGE",
                            u: "game_play",
                            pld: {
                                type: "friendjoin"
                            }
                        }]
                    }]
                };
                e.isNewUser() ? (o.newFriend = n, t.getConnectedPlayersAsync().then(function(e) {
                    for (var i = 0; i < e.length && (console.log("players", i), console.log("players id", e[i].getID()), e[i].getID() != t.getPlayerID() && n.target.push(e[i].getID()), !(i > 10)); i++);
                    console.log("setSessionData", o), window.FBInstant.setSessionData(o)
                })) : (console.log("setSessionData", o), window.FBInstant.setSessionData(o))
            }, e.prototype.onPlatInit = function() {
                var t = this;
                this.app.user.loadDataAsync().then(function() {
                    t.preLoadDatas(function() {
                        t.preLoadSounds(function() {
                            t.preLoadPages(function() {
                                t.preStartGame(function() {
                                    t.startGame()
                                })
                            })
                        })
                    })
                })
            }, e.prototype.update = function(t) {
                this.app.platformMgr.isFB ? window.FBINIT && (this.enabled = !1, this.onPlatInit()) : (this.enabled = !1, this.onPlatInit())
            }, e.prototype.startGame = function() {
                var t = this;
                if (this.app.platformMgr.isFB) {
                    var e = window.FBInstant;
                    e.setLoadingProgress(100), e.startGameAsync().then(function() {
                        var o = e.player.getName(),
                            n = e.player.getID(),
                            i = e.getEntryPointData();
                        if (t.entryGame(i), e.onPause(function() {}), NetHelper.getFuntionOpen(o, n, function() {
                                t.tickContextChange()
                            }), i && (i.switchGameInfo && NetHelper.sendAd(i.switchGameInfo.appId, n, window.FB_APPID), i.shareType && NetHelper.sendShare(n, i.playerId, i.shareType)), t.app.user.canDailyDateSend()) {
                            var s = [],
                                a = t.app.platformMgr;
                            console.log("getConnectedPlayersAsync!"), a.getConnectedPlayersAsync().then(function(t) {
                                for (var e = 0; e < t.length; e++) console.log("players", e), console.log("players id", t[e].getID()), t[e].getID() != a.getPlayerID() && s.push(t[e].getID());
                                console.log("sendFriendsToBot!", t.length, n, s), t.length > 0 && NetHelper.sendFriendsToBot(n, s)
                            })
                        }
                        t.setPush()
                    }).catch(function(t) {
                        console.log(t)
                    })
                } else this.entryGame()
            }, e.prototype.preLoadDatas = function(t) {
                console.log("preLoadDatas"), cc.loader.loadResDir("configs/", function(e, o, n) {
                    for (var i = 0; i < o.length; i++) app.cfgs[n[i].substring(8)] = o[i].json;
                    t()
                })
            }, e.prototype.preLoadSounds = function(t) {
                console.log("preLoadSounds");
                var e = [];
                0 == e.length && t();
                for (var o = 0, n = this.app.soundMgr, i = 0; i < e.length; i++) n.preLoad(e[i], function() {
                    ++o == e.length && t()
                })
            }, e.prototype.preLoadPages = function(t) {
                var e = this;
                console.log("preLoadPages");
                var o = this.app.pageMgr;
                cc.loader.loadResDir("prefabs/preload", function(n, i) {
                    for (var s = 0; s < i.length; s++) {
                        var a = cc.instantiate(i[s]);
                        a.active = !1, e.pages.addChild(a), o.register(a.name, a)
                    }
                    t()
                })
            }, e.prototype.tickContextChange = function() {
                var t = this,
                    e = window.FBInstant;
                setInterval(function() {
                    if (t.contextId != e.context.getID()) {
                        t.contextId = e.context.getID(), "GROUP" == e.context.getType() && app.user.addGroupId(t.contextId);
                        var o = window.contextual_rank_name + "." + t.contextId,
                            n = function() {
                                console.log("updateAsync LEADERBOARD"), e.updateAsync({
                                    action: "LEADERBOARD",
                                    name: o
                                })
                            };
                        console.log("tickContextChange", t.contextId), e.getLeaderboardAsync(o).then(function(t) {
                            return t.setScoreAsync(app.user.maxScore, "")
                        }).then(function() {
                            return [n()]
                        }).catch(n)
                    }
                }, 3e3)
            }, __decorate([s(cc.Node)], e.prototype, "pages", void 0), e = __decorate([i], e)
        })(cc.Component);
        cc._RF.pop()
    }, {}],
    RestartDialog: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "6db2bayfoVJWYGhdM+nRtpP", "RestartDialog"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            i = n.ccclass,
            s = (n.property, function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.isRestart = !1, e
                }
                return __extends(e, t), e.prototype.start = function() {}, e.prototype.onUpdateData = function(t) {
                    this.data = t, this.isRestart = !1
                }, e.prototype.onClose = function() {
                    app.soundMgr.playClick(), app.pageMgr.hideDialog("RestartDialog")
                }, e.prototype.onRestart = function() {
                    app.soundMgr.playClick(), this.isRestart = !0, app.pageMgr.hideDialog("RestartDialog")
                }, e.prototype.onHide = function() {
                    this.isRestart && this.data.suc()
                }, e = __decorate([i], e)
            }(BaseDialog));
        o.default = s, cc._RF.pop()
    }, {}],
    SettingPage: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "a6a40hblthCkJe0o8FfajUz", "SettingPage"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            i = n.ccclass,
            s = n.property,
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.soundBtn = null, e.musicBtn = null, e.musicCloseIcon = null, e.musicOpenIcon = null, e.soundCloseIcon = null, e.soundOpenIcon = null, e
                }
                return __extends(e, t), e.prototype.onEnable = function() {
                    this.checkBtnStatus()
                }, e.prototype.checkBtnStatus = function() {
                    this.soundOpenIcon.active = app.user.soundEnable, this.soundCloseIcon.active = !app.user.soundEnable, this.musicOpenIcon.active = app.user.musicEnable, this.musicCloseIcon.active = !app.user.musicEnable
                }, e.prototype.handleMusic = function() {
                    app.user.musicEnable = !app.user.musicEnable, this.checkBtnStatus()
                }, e.prototype.handleSound = function() {
                    app.user.soundEnable = !app.user.soundEnable, this.checkBtnStatus()
                }, __decorate([s(cc.Button)], e.prototype, "soundBtn", void 0), __decorate([s(cc.Button)], e.prototype, "musicBtn", void 0), __decorate([s(cc.Node)], e.prototype, "musicCloseIcon", void 0), __decorate([s(cc.Node)], e.prototype, "musicOpenIcon", void 0), __decorate([s(cc.Node)], e.prototype, "soundCloseIcon", void 0), __decorate([s(cc.Node)], e.prototype, "soundOpenIcon", void 0), e = __decorate([i], e)
            }(BasePage);
        o.default = a, cc._RF.pop()
    }, {}],
    SoundMgr: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "0224aqRRgFAWoYe1YYSlh7B", "SoundMgr");
        var n = "background",
            i = {},
            s = {},
            a = null,
            r = {},
            c = function() {
                function t() {}
                return t.prototype.register = function(t, e) {
                    r[t] = e
                }, t.prototype.setSoundEnabled = function(t) {
                    if (!t) {
                        for (var e in s) this.stop(s[e]);
                        s = {}
                    }
                    app.user.soundEnable = t
                }, t.prototype.setMusicEnabled = function(t) {
                    app.user.musicEnable = t, t ? this.playMusic() : this.stopMuisc()
                }, t.prototype.isSoundEnable = function() {
                    return app.user.soundEnable
                }, t.prototype.isMusicEnable = function() {
                    return app.user.musicEnable
                }, t.prototype.preLoad = function(t, e) {
                    i[t] || r[t] || (i[t] = !0, cc.loader.loadRes("sounds/" + t, function(o, n) {
                        i[t] = !1, o ? cc.log(o) : r[t] = n, e && e(o, n)
                    }))
                }, t.prototype.playMusic = function() {
                    if (!i[n] && this.isMusicEnable()) {
                        if (r[n]) return a = cc.audioEngine.play(r[n], !0, 1);
                        i[n] = !0, cc.loader.loadRes("sounds/" + n, function(t, e) {
                            i[n] = !1, t ? cc.log(t) : (r[n] = e, a = cc.audioEngine.play(e, !0, 1))
                        })
                    }
                }, t.prototype.stopMuisc = function() {
                    null != a && (cc.audioEngine.stop(a), a = null)
                }, t.prototype.playClick = function() {
                    this.play("btn_click")
                }, t.prototype.play = function(t, e) {
                    if (void 0 === e && (e = !1), this.isSoundEnable() && null != t && "" != t && !i[t]) {
                        if (null == e && (e = !1), r[t]) return s[t] = cc.audioEngine.play(r[t], e, 1), s[t];
                        i[t] = !0, cc.loader.loadRes("sounds/" + t, function(o, n) {
                            i[t] = !1, o ? cc.log(o) : (r[t] = n, s[t] = cc.audioEngine.play(r[t], e, 1))
                        })
                    }
                }, t.prototype.stop = function(t) {
                    cc.audioEngine.stop(s[t])
                }, t
            }();
        window.SoundMgr = c, cc._RF.pop()
    }, {}],
    TestDialog: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "865f2WcgK1AF576rRbaRyDH", "TestDialog"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            i = n.ccclass,
            s = (n.property, function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return __extends(e, t), e.prototype.start = function() {}, e = __decorate([i], e)
            }(BaseDialog));
        o.default = s, cc._RF.pop()
    }, {}],
    TestList: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "d49aeGZ5DBFALjoOKA6mZ22", "TestList"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = t("../common/components/ListView"),
            i = cc._decorator,
            s = i.ccclass,
            a = i.property,
            r = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.listView = null, e
                }
                return __extends(e, t), e.prototype.start = function() {
                    for (var t = [], e = 0; e < 100; e++) t.push({
                        prefabIndex: 19 == e ? 0 : Math.round(Math.random()),
                        index: 10 * e
                    });
                    this.listView.setItemsData(t)
                }, __decorate([a(n.default)], e.prototype, "listView", void 0), e = __decorate([s], e)
            }(cc.Component);
        o.default = r, cc._RF.pop()
    }, {
        "../common/components/ListView": "ListView"
    }],
    TestShare: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "117a1iAdjBI/oiHM5OYd4KQ", "TestShare"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            i = n.ccclass,
            s = (n.property, function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return __extends(e, t), e.prototype.start = function() {}, e = __decorate([i], e)
            }(BaseShare));
        o.default = s, cc._RF.pop()
    }, {}],
    TitleItem: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "d4615OnaWRNT7SxI6qVL/yA", "TitleItem"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = t("../../common/components/ListItem"),
            i = cc._decorator,
            s = i.ccclass,
            a = i.property,
            r = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.label = null, e
                }
                return __extends(e, t), e.prototype.onUpdateData = function(t) {
                    if (0 == this.itemIndex) this.label.string = "GALLERY";
                    else {
                        var e = app.user.getFinishCount();
                        e = e > this.data.unlockNum ? this.data.unlockNum : e, this.label.string = e + "/" + this.data.unlockNum
                    }
                }, e.prototype.onInsert = function() {
                    this.listView.insertItemData({
                        prefabIndex: 1,
                        index: this.data.index - 1
                    }, this.itemIndex + 1)
                }, e.prototype.onRemove = function() {
                    this.listView.removeItemData(this.itemIndex + 1)
                }, e.prototype.onUpdate = function() {
                    var t = this.listView.getItemData(this.itemIndex + 1);
                    t.index++, this.listView.setItemData(this.itemIndex + 1, t)
                }, __decorate([a(cc.Label)], e.prototype, "label", void 0), e = __decorate([s], e)
            }(n.default);
        o.default = r, cc._RF.pop()
    }, {
        "../../common/components/ListItem": "ListItem"
    }],
    TriangleMesh: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "39ef1RSNuVDhJEKuIg4oKd9", "TriangleMesh"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator,
            i = n.ccclass,
            s = (n.property, cc.gfx),
            a = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return __extends(e, t), e.prototype.onLoad = function() {
                    this.up = cc.v3(0, 1, 0), this.color = cc.color().fromHEX("#3A1A03"), this.zValue = 500 * Math.random() - 250, this.vertexs = [cc.v2(4.2, 497.6), cc.v2(18.7, 483.1), cc.v2(30.9, 413.5)]
                }, e.prototype.start = function() {
                    var t = new s.VertexFormat([{
                            name: s.ATTR_POSITION,
                            type: s.ATTR_TYPE_FLOAT32,
                            num: 3
                        }, {
                            name: s.ATTR_COLOR,
                            type: s.ATTR_TYPE_UINT8,
                            num: 4,
                            normalize: !0
                        }]),
                        e = new cc.Mesh;
                    e.init(t, 8, !0);
                    var o = this.vertexs[0],
                        n = this.vertexs[1],
                        i = this.vertexs[2],
                        a = Math.min(o.x, n.x, i.x),
                        r = Math.min(o.y, n.y, i.y),
                        c = (Math.max(o.x, n.x, i.x) + a) / 2,
                        p = (Math.max(o.y, n.y, i.y) + r) / 2,
                        h = [cc.v3(o.x - c, o.y - p, 0), cc.v3(n.x - c, n.y - p, 0), cc.v3(i.x - c, i.y - p, 0)];
                    e.setVertices(s.ATTR_POSITION, h);
                    var d = this.color;
                    e.setVertices(s.ATTR_COLOR, [d, d, d]), e._minPos = cc.v3(Math.min(h[0].x, h[1].x, h[2].x), Math.min(h[0].y, h[1].y, h[2].y), 0), e._maxPos = cc.v3(Math.max(h[0].x, h[1].x, h[2].x), Math.max(h[0].y, h[1].y, h[2].y), 0), e.setIndices([0, 1, 2]);
                    var u = this.node.getComponent(cc.MeshRenderer);
                    u || (u = this.node.addComponent(cc.MeshRenderer)), u.mesh = e, this.node.position = cc.v3(c, p, this.zValue), this.node.eulerAngles = cc.v3(0, 0, 0)
                }, e.prototype.update = function() {
                    var t = this.node.position;
                    this.node.lookAt(cc.v3(t.x, t.y, t.z - 1e5), this.up)
                }, e = __decorate([i], e)
            }(cc.Component);
        o.default = a, cc._RF.pop()
    }, {}],
    User: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "e22c9aYhARFVoXZdbILiGUD", "User");
        var n = {
                name: "instant game",
                createTime: Date.now(),
                isNewUser: !0,
                soundEnable: !0,
                musicEnable: !0,
                shotcutCreated: !1,
                lastSendFriendsTime: 0,
                guide: {},
                groupContexts: [],
                aabb: !1,
                payInfo: {},
                maxScore: 1,
                finishedCount: 0,
                finishedImgs: {},
                unlockedImgs: {},
                buyedPacks: {},
                maxUnlockedGroup: 0
            },
            i = function() {
                function t(t) {
                    this.app = t
                }
                return t.prototype.get = function(t) {
                    return n[t]
                }, t.prototype.set = function(t, e) {
                    n[t] = e, this.save()
                }, Object.defineProperty(t.prototype, "maxScore", {
                    get: function() {
                        return n.finishedCount
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "soundEnable", {
                    get: function() {
                        return this.get("soundEnable")
                    },
                    set: function(t) {
                        this.set("soundEnable", t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "musicEnable", {
                    get: function() {
                        return this.get("musicEnable")
                    },
                    set: function(t) {
                        this.set("musicEnable", t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "shotcutCreated", {
                    get: function() {
                        return this.get("shotcutCreated")
                    },
                    set: function(t) {
                        this.set("shotcutCreated", t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.loadDataAsync = function() {
                    var t = this;
                    return new Promise(function(e, o) {
                        t.app.platformMgr.getDataAsync("data_" + GameName).then(function(t) {
                            Object.keys(t).forEach(function(e) {
                                n[e] = t[e]
                            }), e()
                        }).catch(function(t) {
                            console.log("loadDataAsync err", t), o()
                        })
                    })
                }, t.prototype.saveDataAsync = function() {
                    var t = this;
                    return new Promise(function(e, o) {
                        t.app.platformMgr.setDataAsync("data_" + GameName, n).then(function() {
                            e()
                        }).catch(function(t) {
                            console.log("saveDataAsync err", t), o()
                        })
                    })
                }, t.prototype.clearDataAsync = function() {
                    var t = this;
                    return new Promise(function(e, o) {
                        t.app.platformMgr.setDataAsync("data_" + GameName, {}).then(function() {
                            e()
                        }).catch(function(t) {
                            console.log("clearDataAsync err", t), o()
                        })
                    })
                }, t.prototype.save = function() {
                    this.saveDataAsync()
                }, t.prototype.getVersion = function() {
                    var t = 0;
                    if (!this.app.platformMgr.isFB) return t;
                    var e = this.app.platformMgr.getPlayerID();
                    try {
                        t = parseInt(e.substring(e.length - 2, e.length))
                    } catch (e) {
                        return t
                    }
                    return t
                }, t.prototype.markOldUser = function() {
                    var t = n.isNewUser;
                    n.isNewUser = !1, this.save(), n.isNewUser = t
                }, t.prototype.isNewUser = function() {
                    return n.isNewUser
                }, t.prototype.canDailyDateSend = function() {
                    return Date.now() - n.lastSendFriendsTime > 864e5 && (n.lastSendFriendsTime = Date.now(), this.save(), !0)
                }, t.prototype.getLoginDayCount = function() {
                    return Math.floor((Date.now() - n.createTime) / 864e5)
                }, t.prototype.getGroupContexts = function() {
                    return n.groupContexts
                }, t.prototype.addGroupId = function(t) {
                    n.groupContexts.indexOf(t) >= 0 || (n.groupContexts.push(t), this.save())
                }, t.prototype.getFinishCount = function() {
                    return n.finishedCount
                }, t.prototype.finishImage = function(t) {
                    var e = !1;
                    if (!n.finishedImgs[t]) {
                        n.finishedImgs[t] = !0, n.finishedCount++;
                        var o = app.cfgs.levelCfg;
                        n.maxUnlockedGroup + 1 < o.length && o[n.maxUnlockedGroup + 1].unlockNum <= n.finishedCount && (n.maxUnlockedGroup += 1, e = !0), this.save()
                    }
                    return e
                }, t.prototype.isImageUnlock = function(t) {
                    return n.unlockedImgs[t]
                }, t.prototype.unlockImage = function(t) {
                    n.unlockedImgs[t] || (n.unlockedImgs[t] = !0, this.save())
                }, t.prototype.isFinishedImage = function(t) {
                    return n.finishedImgs[t]
                }, t.prototype.getMaxUnlockedGroup = function() {
                    return n.maxUnlockedGroup
                }, t.prototype.setPackageBuy = function(t) {
                    n.buyedPacks[t] = !0, this.save()
                }, t.prototype.isPackageBuy = function(t) {
                    return n.buyedPacks[t]
                }, t
            }();
        window.User = i, cc._RF.pop()
    }, {}],
    Utils: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "73e36MdVdhCTrrDAJRUaeR0", "Utils");
        var n = function() {
            function t() {}
            return t.randomInt = function(t) {
                return Math.floor(Math.random() * t)
            }, t.randomSelectOne = function(t, e) {
                if (void 0 === e && (e = !1), e) {
                    var o = this.randomInt(t.length);
                    return t.splice(o, 1)[0]
                }
                return t[this.randomInt(t.length)]
            }, t.formatTime = function(t) {
                var e = t % 60 < 10 ? ":0" + t % 60 : ":" + t % 60;
                return e = ((t = Math.floor(t / 60)) % 60 < 10 ? ":0" + t % 60 : ":" + t % 60) + e, e = ((t = Math.floor(t / 60)) < 10 ? "0" + t : t) + e
            }, t.formatTimeHMS = function(t) {
                var e = "";
                return t >= 3600 && (e += Math.floor(t / 3600).toString() + "h"), t >= 60 && (e += Math.floor(t % 3600 / 60).toString() + "m"), e += Math.floor(t % 60).toString() + "s"
            }, t.formatTimeMS = function(t) {
                var e = t % 60 < 10 ? ":0" + t % 60 : ":" + t % 60;
                return e = ((t = Math.floor(t / 60)) % 60 < 10 ? "0" + t % 60 : "" + t % 60) + e
            }, t.sendMessage = function(t, e, o) {
                var n = document.createElement("canvas");
                n.id = "sendCanvas", n.width = 960, n.height = 500;
                var i = n.getContext("2d");
                i.shadowOffsetX = 2, i.shadowOffsetY = 10, i.shadowBlur = 5, i.shadowColor = "rgba(0,0,0,0.5)", cc.loader.loadRes("960x500di", function(s, a) {
                    var r = a.getHtmlElementObj();
                    i.drawImage(r, 0, 0, r.width, r.height), cc.loader.loadRes(t, function(t, s) {
                        if (t) o && o();
                        else {
                            var a = s.getHtmlElementObj();
                            cc.loader.loadRes("hudiexiaobiao", function(t, s) {
                                if (t) o && o();
                                else {
                                    var a = s.getHtmlElementObj();
                                    i.drawImage(a, 780, 443, a.width, a.height);
                                    var r = n.toDataURL();
                                    e.image = r, app.platformMgr.sendMessageToFriend(e, function(t) {
                                        o && o(t)
                                    })
                                }
                            }), i.drawImage(a, 230, 0, a.width, a.height), i.fillStyle = "#000000", i.font = "23px Arial", i.fillText("POLY ART", 810, 460)
                        }
                    })
                })
            }, t.shareImage = function(t, e, o) {
                var n = document.createElement("canvas");
                n.id = "captureCanvas", cc.loader.loadRes(t, function(t, i) {
                    if (t) o && o();
                    else {
                        var s = i.getHtmlElementObj();
                        n.width = s.width, n.height = s.height, n.getContext("2d").drawImage(s, 0, 0, s.width, s.height);
                        var a = n.toDataURL();
                        e.image = a, app.platformMgr.shareGame(e, function(t) {
                            o && o(t)
                        })
                    }
                })
            }, t.sharePolyImage = function(t, e, o) {
                var n = document.createElement("canvas");
                n.id = "captureCanvas", n.width = 960, n.height = 500;
                var i = n.getContext("2d");
                i.shadowOffsetX = 2, i.shadowOffsetY = 10, i.shadowBlur = 5, i.shadowColor = "rgba(0,0,0,0.5)", cc.loader.loadRes("960x500di", function(s, a) {
                    var r = a.getHtmlElementObj();
                    i.drawImage(r, 0, 0, r.width, r.height), cc.loader.loadRes(t, function(t, s) {
                        if (t) o && o();
                        else {
                            var a = s.getHtmlElementObj();
                            cc.loader.loadRes("hudiexiaobiao", function(t, s) {
                                if (t) o && o();
                                else {
                                    var a = s.getHtmlElementObj();
                                    i.drawImage(a, 780, 443, a.width, a.height);
                                    var r = n.toDataURL();
                                    e.image = r, app.platformMgr.shareGame(e, function(t) {
                                        o && o(t)
                                    })
                                }
                            }), i.drawImage(a, 230, 0, a.width, a.height), i.fillStyle = "#000000", i.font = "23px Arial", i.fillText("POLY ART", 810, 460)
                        }
                    })
                })
            }, t.sharePrefab = function(t, e, o) {
                cc.loader.loadRes("prefabs/share/" + t, function(e, n) {
                    if (e) return console.log(e), void(o && o());
                    var i = cc.instantiate(n);
                    cc.director.getScene().addChild(i), i.getComponent(t).getImageDataAsync().then(function(t) {
                        console.log(t)
                    })
                })
            }, t.prototype.challengeFriends = function(t, e) {
                var o = app.pageMgr,
                    n = app.platformMgr;
                o.showLoading();
                var i = app.user.getGroupContexts(),
                    s = function(t) {
                        o.hideLoading(), e(t)
                    };
                n.getConnectedPlayersAsync().then(function(e) {
                    console.log(e);
                    var o = e.length;
                    if (o + i.length == 0) n.chooseFriends(t, s);
                    else if (Math.floor(Math.random() * (i.length + o)) < i.length) {
                        var a = i[Math.floor(Math.random() * i.length)];
                        n.playWithGroup(t, a, s)
                    } else {
                        var r = e[Math.floor(Math.random() * e.length)];
                        "SOLO" != FBInstant.context.getType() ? FBInstant.context.getPlayersAsync().then(function(o) {
                            for (var i = null, a = 0; a < o.length; a++)
                                if (o[a].getID() != FBInstant.player.getID()) {
                                    i = o[a].getID();
                                    break
                                } for (n.logEvent("restart_recommond_player"); i && i == r.getID();) r = e[Math.floor(Math.random() * e.length)];
                            n.playWithFriend(t, r.getID(), s)
                        }).catch(function(e) {
                            n.playWithFriend(t, r.getID(), s)
                        }) : n.playWithFriend(t, r.getID(), s)
                    }
                })
            }, t.deepClone = function(t) {
                if ("object" == typeof t) return JSON.parse(JSON.stringify(t))
            }, t.checkXYIsOverScreen = function(t, e) {
                var o = {
                        top: !1,
                        right: !1,
                        bottom: !1,
                        left: !1
                    },
                    n = cc.winSize,
                    i = t.x < -n.width / 2 - e,
                    s = t.x > n.width / 2 + e,
                    a = t.y < -n.height / 2 - e,
                    r = t.y > n.height / 2 + e;
                return i && (o.left = !0), s && (o.right = !0), a && (o.bottom = !0), r && (o.top = !0), o
            }, t.isAllEqual = function(t) {
                return !(t.length > 0) || !t.some(function(e, o) {
                    return e !== t[0]
                })
            }, t
        }();
        window.Utils = n, cc._RF.pop()
    }, {}],
    WXHelper: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "d5597sOJn9D3JF2N1SmESWo", "WXHelper"), t("PlatHelper");
        var n = window.wx_banner_id,
            i = null,
            s = window.wx_video_id,
            a = null,
            r = !1,
            c = window.wx,
            p = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return __extends(e, t), e.prototype.init = function() {
                    this.loadVideoAsync()
                }, e.prototype.loadAsync = function(t, e) {}, e.prototype.isInterstitialLoad = function() {
                    return !1
                }, e.prototype.showInterstitialAd = function(t, e) {}, e.prototype.loadVideoAsync = function(t, e) {
                    return void 0 === t && (t = function() {}), void 0 === e && (e = function() {}), console.log("WXHelper loadVideoAsync", s), null == a && (console.log("wx.createRewardedVideoAd", {
                        adUnitId: s
                    }), (a = c.createRewardedVideoAd({
                        adUnitId: s
                    })).onLoad(function() {
                        r = !0, t && t(), console.log("激励视频 广告加载成功")
                    })), r || (console.log("rewardedVideoAd.load(", {
                        adUnitId: s
                    }), a.load().then(function() {
                        console.log("rewardedVideoAd.load(", {
                            adUnitId: s
                        }), r = !0
                    })), r
                }, e.prototype.isVideoLoad = function() {
                    return r
                }, e.prototype.showVideoAd = function(t, e, o) {
                    var n = this;
                    void 0 === e && (e = function() {}), void 0 === o && (o = function() {}), a.onClose(function(t) {
                        t && t.isEnded || void 0 === t ? (e && e(), e = null) : (o && o(), o = null)
                    }), a.show().then(function() {
                        return r = !1
                    }).catch(function(t) {
                        a.load().then(function() {
                            return n.loadVideoAsync()
                        })
                    })
                }, e.prototype.isBannerLoad = function() {
                    return !1
                }, e.prototype.showBannerAd = function(t, e, o) {
                    void 0 === t && (t = null), void 0 === e && (e = null), void 0 === o && (o = null);
                    var s = window.wx.getSystemInfoSync();
                    i || (i = c.createBannerAd({
                        adUnitId: n,
                        style: {
                            left: t || 40,
                            top: e || s.windowHeight - 100,
                            width: o || s.windowWidth - 80
                        }
                    })), i.show()
                }, e.prototype.hideBannerAd = function() {
                    i && (i.destroy(), i = null)
                }, e.prototype.autoShowAd = function(t) {}, e.prototype.logEvent = function(t, e, o) {
                    void 0 === e && (e = {}), void 0 === o && (o = 1), c.aldSendEvent && c.aldSendEvent(t, e)
                }, e.prototype.getDataAsync = function(t) {
                    return new Promise(function(e, o) {
                        var n = cc.sys.localStorage.getItem(t);
                        e(n ? JSON.parse(n) : {})
                    })
                }, e.prototype.setDataAsync = function(t, e) {
                    return new Promise(function(o, n) {
                        cc.sys.localStorage.setItem(t, JSON.stringify(e)), o()
                    })
                }, e
            }(PlatHelper);
        window.WXHelper = p, cc._RF.pop()
    }, {
        PlatHelper: "PlatHelper"
    }],
    md5: [function(require, module, exports) {
        (function(process, global) {
            "use strict";
            cc._RF.push(module, "cfa02lDdGhPTJ5a7lejMwAQ", "md5");
            var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            };
            ! function() {
                function t(t) {
                    if (t) d[0] = d[16] = d[1] = d[2] = d[3] = d[4] = d[5] = d[6] = d[7] = d[8] = d[9] = d[10] = d[11] = d[12] = d[13] = d[14] = d[15] = 0, this.blocks = d, this.buffer8 = l;
                    else if (a) {
                        var e = new ArrayBuffer(68);
                        this.buffer8 = new Uint8Array(e), this.blocks = new Uint32Array(e)
                    } else this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0
                }
                var r = "input is invalid type",
                    e = "object" == ("undefined" == typeof window ? "undefined" : _typeof(window)),
                    i = e ? window : {};
                i.JS_MD5_NO_WINDOW && (e = !1);
                var s = !e && "object" == ("undefined" == typeof self ? "undefined" : _typeof(self)),
                    h = !i.JS_MD5_NO_NODE_JS && "object" == (void 0 === process ? "undefined" : _typeof(process)) && process.versions && process.versions.node;
                h ? i = global : s && (i = self);
                var f = !i.JS_MD5_NO_COMMON_JS && "object" == (void 0 === module ? "undefined" : _typeof(module)) && module.exports,
                    o = "function" == typeof define && define.amd,
                    a = !i.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
                    n = "0123456789abcdef".split(""),
                    u = [128, 32768, 8388608, -2147483648],
                    y = [0, 8, 16, 24],
                    c = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"],
                    p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
                    d = [],
                    l;
                if (a) {
                    var A = new ArrayBuffer(68);
                    l = new Uint8Array(A), d = new Uint32Array(A)
                }!i.JS_MD5_NO_NODE_JS && Array.isArray || (Array.isArray = function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                }), !a || !i.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(t) {
                    return "object" == (void 0 === t ? "undefined" : _typeof(t)) && t.buffer && t.buffer.constructor === ArrayBuffer
                });
                var b = function(e) {
                        return function(o) {
                            return new t(!0).update(o)[e]()
                        }
                    },
                    v = function() {
                        var e = b("hex");
                        h && (e = w(e)), e.create = function() {
                            return new t
                        }, e.update = function(t) {
                            return e.create().update(t)
                        };
                        for (var o = 0; o < c.length; ++o) {
                            var n = c[o];
                            e[n] = b(n)
                        }
                        return e
                    },
                    w = function w(t) {
                        var e = eval("require('crypto')"),
                            i = eval("require('buffer').Buffer"),
                            s = function(o) {
                                if ("string" == typeof o) return e.createHash("md5").update(o, "utf8").digest("hex");
                                if (null === o || void 0 === o) throw r;
                                return o.constructor === ArrayBuffer && (o = new Uint8Array(o)), Array.isArray(o) || ArrayBuffer.isView(o) || o.constructor === i ? e.createHash("md5").update(new i(o)).digest("hex") : t(o)
                            };
                        return s
                    };
                t.prototype.update = function(t) {
                    if (!this.finalized) {
                        var e, o = void 0 === t ? "undefined" : _typeof(t);
                        if ("string" !== o) {
                            if ("object" !== o) throw r;
                            if (null === t) throw r;
                            if (a && t.constructor === ArrayBuffer) t = new Uint8Array(t);
                            else if (!(Array.isArray(t) || a && ArrayBuffer.isView(t))) throw r;
                            e = !0
                        }
                        for (var n, i, s = 0, c = t.length, p = this.blocks, h = this.buffer8; s < c;) {
                            if (this.hashed && (this.hashed = !1, p[0] = p[16], p[16] = p[1] = p[2] = p[3] = p[4] = p[5] = p[6] = p[7] = p[8] = p[9] = p[10] = p[11] = p[12] = p[13] = p[14] = p[15] = 0), e)
                                if (a)
                                    for (i = this.start; s < c && i < 64; ++s) h[i++] = t[s];
                                else
                                    for (i = this.start; s < c && i < 64; ++s) p[i >> 2] |= t[s] << y[3 & i++];
                            else if (a)
                                for (i = this.start; s < c && i < 64; ++s)(n = t.charCodeAt(s)) < 128 ? h[i++] = n : n < 2048 ? (h[i++] = 192 | n >> 6, h[i++] = 128 | 63 & n) : n < 55296 || n >= 57344 ? (h[i++] = 224 | n >> 12, h[i++] = 128 | n >> 6 & 63, h[i++] = 128 | 63 & n) : (n = 65536 + ((1023 & n) << 10 | 1023 & t.charCodeAt(++s)), h[i++] = 240 | n >> 18, h[i++] = 128 | n >> 12 & 63, h[i++] = 128 | n >> 6 & 63, h[i++] = 128 | 63 & n);
                            else
                                for (i = this.start; s < c && i < 64; ++s)(n = t.charCodeAt(s)) < 128 ? p[i >> 2] |= n << y[3 & i++] : n < 2048 ? (p[i >> 2] |= (192 | n >> 6) << y[3 & i++], p[i >> 2] |= (128 | 63 & n) << y[3 & i++]) : n < 55296 || n >= 57344 ? (p[i >> 2] |= (224 | n >> 12) << y[3 & i++], p[i >> 2] |= (128 | n >> 6 & 63) << y[3 & i++], p[i >> 2] |= (128 | 63 & n) << y[3 & i++]) : (n = 65536 + ((1023 & n) << 10 | 1023 & t.charCodeAt(++s)), p[i >> 2] |= (240 | n >> 18) << y[3 & i++], p[i >> 2] |= (128 | n >> 12 & 63) << y[3 & i++], p[i >> 2] |= (128 | n >> 6 & 63) << y[3 & i++], p[i >> 2] |= (128 | 63 & n) << y[3 & i++]);
                            this.lastByteIndex = i, this.bytes += i - this.start, i >= 64 ? (this.start = i - 64, this.hash(), this.hashed = !0) : this.start = i
                        }
                        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this
                    }
                }, t.prototype.finalize = function() {
                    if (!this.finalized) {
                        this.finalized = !0;
                        var t = this.blocks,
                            e = this.lastByteIndex;
                        t[e >> 2] |= u[3 & e], e >= 56 && (this.hashed || this.hash(), t[0] = t[16], t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), t[14] = this.bytes << 3, t[15] = this.hBytes << 3 | this.bytes >>> 29, this.hash()
                    }
                }, t.prototype.hash = function() {
                    var t, e, o, n, i, s, a = this.blocks;
                    this.first ? e = ((e = ((t = ((t = a[0] - 680876937) << 7 | t >>> 25) - 271733879 << 0) ^ (o = ((o = (-271733879 ^ (n = ((n = (-1732584194 ^ 2004318071 & t) + a[1] - 117830708) << 12 | n >>> 20) + t << 0) & (-271733879 ^ t)) + a[2] - 1126478375) << 17 | o >>> 15) + n << 0) & (n ^ t)) + a[3] - 1316259209) << 22 | e >>> 10) + o << 0 : (t = this.h0, e = this.h1, o = this.h2, e = ((e += ((t = ((t += ((n = this.h3) ^ e & (o ^ n)) + a[0] - 680876936) << 7 | t >>> 25) + e << 0) ^ (o = ((o += (e ^ (n = ((n += (o ^ t & (e ^ o)) + a[1] - 389564586) << 12 | n >>> 20) + t << 0) & (t ^ e)) + a[2] + 606105819) << 17 | o >>> 15) + n << 0) & (n ^ t)) + a[3] - 1044525330) << 22 | e >>> 10) + o << 0), e = ((e += ((t = ((t += (n ^ e & (o ^ n)) + a[4] - 176418897) << 7 | t >>> 25) + e << 0) ^ (o = ((o += (e ^ (n = ((n += (o ^ t & (e ^ o)) + a[5] + 1200080426) << 12 | n >>> 20) + t << 0) & (t ^ e)) + a[6] - 1473231341) << 17 | o >>> 15) + n << 0) & (n ^ t)) + a[7] - 45705983) << 22 | e >>> 10) + o << 0, e = ((e += ((t = ((t += (n ^ e & (o ^ n)) + a[8] + 1770035416) << 7 | t >>> 25) + e << 0) ^ (o = ((o += (e ^ (n = ((n += (o ^ t & (e ^ o)) + a[9] - 1958414417) << 12 | n >>> 20) + t << 0) & (t ^ e)) + a[10] - 42063) << 17 | o >>> 15) + n << 0) & (n ^ t)) + a[11] - 1990404162) << 22 | e >>> 10) + o << 0, e = ((e += ((t = ((t += (n ^ e & (o ^ n)) + a[12] + 1804603682) << 7 | t >>> 25) + e << 0) ^ (o = ((o += (e ^ (n = ((n += (o ^ t & (e ^ o)) + a[13] - 40341101) << 12 | n >>> 20) + t << 0) & (t ^ e)) + a[14] - 1502002290) << 17 | o >>> 15) + n << 0) & (n ^ t)) + a[15] + 1236535329) << 22 | e >>> 10) + o << 0, e = ((e += ((n = ((n += (e ^ o & ((t = ((t += (o ^ n & (e ^ o)) + a[1] - 165796510) << 5 | t >>> 27) + e << 0) ^ e)) + a[6] - 1069501632) << 9 | n >>> 23) + t << 0) ^ t & ((o = ((o += (t ^ e & (n ^ t)) + a[11] + 643717713) << 14 | o >>> 18) + n << 0) ^ n)) + a[0] - 373897302) << 20 | e >>> 12) + o << 0, e = ((e += ((n = ((n += (e ^ o & ((t = ((t += (o ^ n & (e ^ o)) + a[5] - 701558691) << 5 | t >>> 27) + e << 0) ^ e)) + a[10] + 38016083) << 9 | n >>> 23) + t << 0) ^ t & ((o = ((o += (t ^ e & (n ^ t)) + a[15] - 660478335) << 14 | o >>> 18) + n << 0) ^ n)) + a[4] - 405537848) << 20 | e >>> 12) + o << 0, e = ((e += ((n = ((n += (e ^ o & ((t = ((t += (o ^ n & (e ^ o)) + a[9] + 568446438) << 5 | t >>> 27) + e << 0) ^ e)) + a[14] - 1019803690) << 9 | n >>> 23) + t << 0) ^ t & ((o = ((o += (t ^ e & (n ^ t)) + a[3] - 187363961) << 14 | o >>> 18) + n << 0) ^ n)) + a[8] + 1163531501) << 20 | e >>> 12) + o << 0, e = ((e += ((n = ((n += (e ^ o & ((t = ((t += (o ^ n & (e ^ o)) + a[13] - 1444681467) << 5 | t >>> 27) + e << 0) ^ e)) + a[2] - 51403784) << 9 | n >>> 23) + t << 0) ^ t & ((o = ((o += (t ^ e & (n ^ t)) + a[7] + 1735328473) << 14 | o >>> 18) + n << 0) ^ n)) + a[12] - 1926607734) << 20 | e >>> 12) + o << 0, e = ((e += ((s = (n = ((n += ((i = e ^ o) ^ (t = ((t += (i ^ n) + a[5] - 378558) << 4 | t >>> 28) + e << 0)) + a[8] - 2022574463) << 11 | n >>> 21) + t << 0) ^ t) ^ (o = ((o += (s ^ e) + a[11] + 1839030562) << 16 | o >>> 16) + n << 0)) + a[14] - 35309556) << 23 | e >>> 9) + o << 0, e = ((e += ((s = (n = ((n += ((i = e ^ o) ^ (t = ((t += (i ^ n) + a[1] - 1530992060) << 4 | t >>> 28) + e << 0)) + a[4] + 1272893353) << 11 | n >>> 21) + t << 0) ^ t) ^ (o = ((o += (s ^ e) + a[7] - 155497632) << 16 | o >>> 16) + n << 0)) + a[10] - 1094730640) << 23 | e >>> 9) + o << 0, e = ((e += ((s = (n = ((n += ((i = e ^ o) ^ (t = ((t += (i ^ n) + a[13] + 681279174) << 4 | t >>> 28) + e << 0)) + a[0] - 358537222) << 11 | n >>> 21) + t << 0) ^ t) ^ (o = ((o += (s ^ e) + a[3] - 722521979) << 16 | o >>> 16) + n << 0)) + a[6] + 76029189) << 23 | e >>> 9) + o << 0, e = ((e += ((s = (n = ((n += ((i = e ^ o) ^ (t = ((t += (i ^ n) + a[9] - 640364487) << 4 | t >>> 28) + e << 0)) + a[12] - 421815835) << 11 | n >>> 21) + t << 0) ^ t) ^ (o = ((o += (s ^ e) + a[15] + 530742520) << 16 | o >>> 16) + n << 0)) + a[2] - 995338651) << 23 | e >>> 9) + o << 0, e = ((e += ((n = ((n += (e ^ ((t = ((t += (o ^ (e | ~n)) + a[0] - 198630844) << 6 | t >>> 26) + e << 0) | ~o)) + a[7] + 1126891415) << 10 | n >>> 22) + t << 0) ^ ((o = ((o += (t ^ (n | ~e)) + a[14] - 1416354905) << 15 | o >>> 17) + n << 0) | ~t)) + a[5] - 57434055) << 21 | e >>> 11) + o << 0, e = ((e += ((n = ((n += (e ^ ((t = ((t += (o ^ (e | ~n)) + a[12] + 1700485571) << 6 | t >>> 26) + e << 0) | ~o)) + a[3] - 1894986606) << 10 | n >>> 22) + t << 0) ^ ((o = ((o += (t ^ (n | ~e)) + a[10] - 1051523) << 15 | o >>> 17) + n << 0) | ~t)) + a[1] - 2054922799) << 21 | e >>> 11) + o << 0, e = ((e += ((n = ((n += (e ^ ((t = ((t += (o ^ (e | ~n)) + a[8] + 1873313359) << 6 | t >>> 26) + e << 0) | ~o)) + a[15] - 30611744) << 10 | n >>> 22) + t << 0) ^ ((o = ((o += (t ^ (n | ~e)) + a[6] - 1560198380) << 15 | o >>> 17) + n << 0) | ~t)) + a[13] + 1309151649) << 21 | e >>> 11) + o << 0, e = ((e += ((n = ((n += (e ^ ((t = ((t += (o ^ (e | ~n)) + a[4] - 145523070) << 6 | t >>> 26) + e << 0) | ~o)) + a[11] - 1120210379) << 10 | n >>> 22) + t << 0) ^ ((o = ((o += (t ^ (n | ~e)) + a[2] + 718787259) << 15 | o >>> 17) + n << 0) | ~t)) + a[9] - 343485551) << 21 | e >>> 11) + o << 0, this.first ? (this.h0 = t + 1732584193 << 0, this.h1 = e - 271733879 << 0, this.h2 = o - 1732584194 << 0, this.h3 = n + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + t << 0, this.h1 = this.h1 + e << 0, this.h2 = this.h2 + o << 0, this.h3 = this.h3 + n << 0)
                }, t.prototype.hex = function() {
                    this.finalize();
                    var t = this.h0,
                        e = this.h1,
                        o = this.h2,
                        i = this.h3;
                    return n[t >> 4 & 15] + n[15 & t] + n[t >> 12 & 15] + n[t >> 8 & 15] + n[t >> 20 & 15] + n[t >> 16 & 15] + n[t >> 28 & 15] + n[t >> 24 & 15] + n[e >> 4 & 15] + n[15 & e] + n[e >> 12 & 15] + n[e >> 8 & 15] + n[e >> 20 & 15] + n[e >> 16 & 15] + n[e >> 28 & 15] + n[e >> 24 & 15] + n[o >> 4 & 15] + n[15 & o] + n[o >> 12 & 15] + n[o >> 8 & 15] + n[o >> 20 & 15] + n[o >> 16 & 15] + n[o >> 28 & 15] + n[o >> 24 & 15] + n[i >> 4 & 15] + n[15 & i] + n[i >> 12 & 15] + n[i >> 8 & 15] + n[i >> 20 & 15] + n[i >> 16 & 15] + n[i >> 28 & 15] + n[i >> 24 & 15]
                }, t.prototype.toString = t.prototype.hex, t.prototype.digest = function() {
                    this.finalize();
                    var t = this.h0,
                        e = this.h1,
                        o = this.h2,
                        n = this.h3;
                    return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & o, o >> 8 & 255, o >> 16 & 255, o >> 24 & 255, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255]
                }, t.prototype.array = t.prototype.digest, t.prototype.arrayBuffer = function() {
                    this.finalize();
                    var t = new ArrayBuffer(16),
                        e = new Uint32Array(t);
                    return e[0] = this.h0, e[1] = this.h1, e[2] = this.h2, e[3] = this.h3, t
                }, t.prototype.buffer = t.prototype.arrayBuffer, t.prototype.base64 = function() {
                    for (var t, e, o, n = "", i = this.array(), s = 0; s < 15;) t = i[s++], e = i[s++], o = i[s++], n += p[t >>> 2] + p[63 & (t << 4 | e >>> 4)] + p[63 & (e << 2 | o >>> 6)] + p[63 & o];
                    return t = i[s], n + (p[t >>> 2] + p[t << 4 & 63] + "==")
                };
                var _ = v();
                f ? module.exports = _ : (i.md5 = _, o && define(function() {
                    return _
                }))
            }(), cc._RF.pop()
        }).call(this, require("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        _process: 1
    }]
}, {}, ["EngineConfig", "GameConfig", "ProjectStarter", "App", "NetHelper", "PageMgr", "PlatfomMgr", "SoundMgr", "User", "Utils", "BaseDialog", "BasePage", "BaseShare", "JumpGame", "ListItem", "ListView", "md5", "DefaultHelper", "FBHelper", "PlatHelper", "WXHelper", "GameMain", "PlayerControl", "TriangleMesh", "ConfirmDialog", "RestartDialog", "SettingPage", "TestDialog", "TestList", "GalleryPage", "ImageGroupItem", "ImageItem", "PackageItem", "TitleItem", "TestShare"]);