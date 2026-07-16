var e = require("vue");

const t = null, {min: r, max: o, abs: n, floor: s} = Math, i = (e, t, n) => r(n, o(t, e)), l = e => [ ...e ].sort(((e, t) => e - t)), c = "function" == typeof queueMicrotask ? queueMicrotask : e => {
    Promise.resolve().then(e);
}, a = () => {
    let e;
    return [ new Promise((t => {
        e = t;
    })), e ];
}, u = e => {
    let t;
    return () => (e && (t = e(), e = void 0), t);
}, f = (e, t, r) => {
    const o = r ? "unshift" : "push";
    for (let r = 0; r < t; r++) e[o](-1);
    return e;
}, d = (e, t) => {
    const r = e.t[t];
    return -1 === r ? e.o : r;
}, p = (e, t, o) => {
    const n = -1 === e.t[t];
    return e.t[t] = o, e.i = r(t, e.i), n;
}, m = (e, t) => {
    if (!e.l) return 0;
    if (e.i >= t) return e.u[t];
    e.i < 0 && (e.u[0] = 0, e.i = 0);
    let r = e.i, o = e.u[r];
    for (;r < t; ) o += d(e, r), e.u[++r] = o;
    return e.i = t, o;
}, h = (e, t, r = 0, o = e.l - 1) => {
    let n = r;
    for (;r <= o; ) {
        const i = s((r + o) / 2);
        m(e, i) <= t ? (n = i, r = i + 1) : o = i - 1;
    }
    return i(n, 0, e.l - 1);
}, _ = (e, t, o) => {
    const n = t - e.l;
    return e.i = o ? -1 : r(t - 1, e.i), e.l = t, n > 0 ? (f(e.u, n), f(e.t, n, o), 
    e.o * n) : (e.u.splice(n), (o ? e.t.splice(0, -n) : e.t.splice(n)).reduce(((t, r) => t - (-1 === r ? e.o : r)), 0));
}, b = e => e.documentElement, g = e => e.ownerDocument, v = e => e.defaultView, y = /*#__PURE__*/ u((() => !!/iP(hone|od|ad)/.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 0)), S = /*#__PURE__*/ u((() => "scrollBehavior" in b(document).style)), z = (e, s = 40, i = 0, c, a = !1) => {
    let u = !!i, b = 1, g = 0, v = 0, S = 0, z = 0, x = 0, $ = 0, w = 0, I = 0, O = t, k = [ 0, u ? o(i - 1, 0) : -1 ], j = 0, N = !1;
    const q = ((e, t, n) => ({
        o: t,
        t: n ? f(n.slice(0, r(e, n.length)), o(0, e - n.length)) : f([], e),
        l: e,
        i: -1,
        u: f([], e + 1)
    }))(e, c ? c[1] : s, c && c[0]), B = new Set, T = () => S - v, M = () => T() + x + z, E = (e, t) => ((e, t, o, n) => {
        if (n = r(n, e.l - 1), m(e, n) <= t) {
            const r = h(e, o, n);
            return [ h(e, t, n, r), r ];
        }
        {
            const r = h(e, t, void 0, n);
            return [ r, h(e, o, r) ];
        }
    })(q, e, t, k[0]), P = () => m(q, q.l), R = (e, t) => {
        const r = m(q, e) - x;
        return t ? P() - r - A(e) : r;
    }, A = e => d(q, e), C = (e, t = -1) => q.t[e] === t, H = e => {
        e && (y() && 0 !== w || O && 1 === I ? x += e : z += e);
    };
    return {
        p: () => {
            B.clear();
        },
        m: () => b,
        h: () => (e => [ e.t.slice(), e.o ])(q),
        v: (e = 200) => {
            if (!N || u) return k;
            let t, n;
            if ($) [t, n] = k; else {
                let s = o(0, M()), i = s + g;
                a || (e = o(0, e), 1 !== w && (s -= e), 2 !== w && (i += e)), [t, n] = k = E(o(0, s), o(0, i)), 
                O && (t = r(t, O[0]), n = o(n, O[1]));
            }
            return [ o(t, 0), r(n, q.l - 1) ];
        },
        S: e => h(q, e - v),
        I: C,
        O: R,
        k: A,
        j: () => q.l,
        N: () => S,
        q: () => 0 !== w,
        B: () => g,
        T: () => v,
        M: P,
        P: () => ($ = z, z = 0, [ $, 2 === I ]),
        R: (e, t) => {
            const r = [ e, t ];
            return B.add(r), () => {
                B.delete(r);
            };
        },
        A: (e, r) => {
            let s, i, c = 0;
            switch (e) {
              case 1:
                {
                    if (r === S && 0 === I) break;
                    const e = $;
                    $ = 0;
                    const t = r - S, o = n(t);
                    e && o < n(e) + 1 || 0 !== I || (w = t < 0 ? 2 : 1), u && (u = !1), S = r, c = 4;
                    const s = T();
                    s >= -g && s <= P() && (c += 1, i = o > g);
                    break;
                }

              case 2:
                c = 8, 0 !== w && (s = !0, c += 1), w = 0, I = 0, O = t;
                break;

              case 3:
                {
                    const e = r.filter((([e, t]) => !C(e, t)));
                    if (!e.length) break;
                    H(e.reduce(((e, [t, r]) => {
                        let o;
                        if (2 === I) o = !0; else if (O && 1 === I) o = t < O[0]; else {
                            const e = T(), r = R(t), n = A(t);
                            o = 1 !== w && 0 === I ? r + n < e : r < e && r + n < e + g;
                        }
                        return o && (e += r - A(t)), e;
                    }), 0));
                    for (const [t, r] of e) {
                        const e = A(t), o = p(q, t, r);
                        a && (j += o ? r : r - e);
                    }
                    a && g && j > g && (H(((e, t) => {
                        let r = 0;
                        const n = [];
                        e.t.forEach(((e, o) => {
                            -1 !== e && (n.push(e), o < t && r++);
                        })), e.i = -1;
                        const s = l(n), i = s.length, c = i / 2 | 0, a = i % 2 == 0 ? (s[c - 1] + s[c]) / 2 : s[c], u = e.o;
                        return ((e.o = a) - u) * o(t - r, 0);
                    })(q, h(q, M()))), a = !1), c = 3, i = !0;
                    break;
                }

              case 4:
                g !== r && (g || (N = i = !0), g = r, c = 3);
                break;

              case 5:
                r[1] ? (H(_(q, r[0], !0)), I = 2, c = 1) : (_(q, r[0]), c = 1);
                break;

              case 6:
                v = r;
                break;

              case 7:
                I = 1;
                break;

              case 8:
                O = E(r, r + g), c = 1;
            }
            c && (b = 1 + (2147483647 & b), s && x && (z += x, x = 0), B.forEach((([e, t]) => {
                c & e && t(i);
            })));
        }
    };
}, x = setTimeout, $ = (e, t) => t ? -e : e, w = (e, r, o, n, s, i) => {
    const l = Date.now;
    let c = 0, a = !1, u = !1, f = !1, d = !1;
    const p = (() => {
        let r;
        const o = () => {
            r != t && clearTimeout(r);
        }, n = () => {
            o(), r = x((() => {
                r = t, (() => {
                    if (a || u) return a = !1, void p();
                    f = !1, e.A(2);
                })();
            }), 150);
        };
        return n.C = o, n;
    })(), m = () => {
        c = l(), f && (d = !0), i && e.A(6, i()), e.A(1, n()), p();
    }, h = t => {
        if (a || !e.q() || t.ctrlKey) return;
        const r = l() - c;
        150 > r && 50 < r && (o ? t.deltaX : t.deltaY) && (a = !0);
    }, _ = () => {
        u = !0, f = d = !1;
    }, b = () => {
        u = !1, y() && (f = !0);
    };
    return r.addEventListener("scroll", m), r.addEventListener("wheel", h, {
        passive: !0
    }), r.addEventListener("touchstart", _, {
        passive: !0
    }), r.addEventListener("touchend", b, {
        passive: !0
    }), {
        H: () => {
            r.removeEventListener("scroll", m), r.removeEventListener("wheel", h), r.removeEventListener("touchstart", _), 
            r.removeEventListener("touchend", b), p.C();
        },
        V: () => {
            const [t, r] = e.P();
            t && (s(t, r, d), d = !1, r && e.B() > e.M() && e.A(1, n()));
        }
    };
}, I = (e, t, r) => {
    let o;
    return [ async (n, s) => {
        if (!await t()) return;
        o && o();
        const i = () => {
            const [t, r] = a();
            return o = () => {
                r(!1);
            }, e.B() && x(o, 150), [ t, e.R(2, (() => {
                r(!0);
            })) ];
        };
        if (s && S()) e.A(8, n()), c((async () => {
            for (;;) {
                let t = !0;
                for (let [r, o] = e.v(); r <= o; r++) if (e.I(r)) {
                    t = !1;
                    break;
                }
                if (t) break;
                const [r, o] = i();
                try {
                    if (!await r) return;
                } finally {
                    o();
                }
            }
            e.A(7), r(n(), s);
        })); else for (;;) {
            const [t, o] = i();
            try {
                if (e.A(7), r(n()), !await t) return;
            } finally {
                o();
            }
        }
    }, () => {
        o && o();
    } ];
}, O = e => {
    let t;
    return {
        F(r) {
            (t || (t = new (v(g(r)).ResizeObserver)(e))).observe(r);
        },
        J(e) {
            t.unobserve(e);
        },
        H() {
            t && t.disconnect();
        }
    };
}, k = /*#__PURE__*/ e.defineComponent({
    props: {
        L: {
            type: Object,
            required: !0
        },
        W: {
            type: Object,
            required: !0
        },
        X: {
            type: Object,
            required: !0
        },
        Y: {
            type: Function,
            required: !0
        },
        D: {
            type: Number,
            required: !0
        },
        U: {
            type: Boolean
        },
        G: {
            type: Boolean
        },
        K: {
            type: Boolean
        },
        Z: {
            type: String,
            required: !0
        },
        ee: Object
    },
    setup(t) {
        const r = e.ref(), o = e.computed((() => t.L.value && t.W.O(t.D, t.K))), n = e.computed((() => t.L.value && t.W.I(t.D)));
        return e.watch((() => r.value && t.D), ((e, o, n) => {
            n(t.Y(r.value, t.D));
        }), {
            flush: "post"
        }), () => {
            const {X: s, U: i, G: l, Z: c} = t, a = n.value, {style: u, ...f} = t.ee ?? {}, d = {
                contain: "layout style",
                position: a && l ? void 0 : "absolute",
                [i ? "height" : "width"]: "100%",
                [i ? "top" : "left"]: "0px",
                [i ? "left" : "top"]: o.value + "px",
                visibility: !a || l ? void 0 : "hidden",
                ...u
            };
            return i && (d.display = "inline-flex"), e.createVNode(c, e.mergeProps({
                ref: r,
                style: d
            }, f), "function" == typeof (p = s) || "[object Object]" === Object.prototype.toString.call(p) && !e.isVNode(p) ? s : {
                default: () => [ s ],
                _: 2
            }, 16, [ "style" ]);
            var p;
        };
    }
}), j = (e, t) => {
    if (1 === e.length) {
        const t = e[0].key;
        if (null != t) return t;
    }
    return "_" + t;
}, N = (e, t) => e[0] === t[0] && e[1] === t[1], q = {
    data: {
        type: Array,
        required: !0
    },
    bufferSize: Number,
    itemSize: Number,
    shift: Boolean,
    horizontal: Boolean,
    startMargin: {
        type: Number,
        default: 0
    },
    ssrCount: Number,
    scrollRef: Object,
    as: {
        type: String,
        default: "div"
    },
    item: {
        type: String,
        default: "div"
    },
    itemProps: Function,
    keepMounted: Array,
    cache: Object
}, B = /*#__PURE__*/ e.defineComponent({
    props: q,
    emits: [ "scroll", "scrollEnd" ],
    setup(r, {emit: n, expose: s, slots: c}) {
        let u = !!r.ssrCount;
        const f = r.horizontal, d = e.ref(), p = z(r.data.length, r.itemSize, r.ssrCount, r.cache, !r.itemSize), m = ((e, r) => {
            let o;
            const n = r ? "width" : "height", s = new WeakMap, i = O((r => {
                const i = [];
                for (const {target: l, contentRect: c} of r) if (l.offsetParent) if (l === o) e.A(4, c[n]); else {
                    const e = s.get(l);
                    e != t && i.push([ e, c[n] ]);
                }
                i.length && e.A(3, i);
            }));
            return {
                te(e) {
                    i.F(o = e);
                },
                re: (e, t) => (s.set(e, t), i.F(e), () => {
                    s.delete(e), i.J(e);
                }),
                p: i.H
            };
        })(p, f), h = ((e, t) => {
            let r, o, n = a(), s = !1;
            const l = t ? "scrollLeft" : "scrollTop", c = t ? "overflowX" : "overflowY", [u, f] = I(e, (() => n[0]), ((e, o) => {
                e = $(e, s), o ? r.scrollTo({
                    [t ? "left" : "top"]: e,
                    behavior: "smooth"
                }) : r[l] = e;
            }));
            return {
                oe(i, a) {
                    r = a, t && (s = "rtl" === getComputedStyle(a).direction), o = w(e, a, t, (() => $(a[l], s)), ((t, r, o) => {
                        if (o) {
                            const e = a.style, t = e[c];
                            e[c] = "hidden", x((() => {
                                e[c] = t;
                            }));
                        }
                        a[l] = $(e.N() + t, s), r && f();
                    })), n[1](!0);
                },
                p() {
                    o && o.H(), n[1](!1), n = a();
                },
                ne: () => s,
                se(e) {
                    u((() => e));
                },
                ie(t) {
                    t += e.N(), u((() => t));
                },
                le(t, {align: r, smooth: o, offset: n = 0} = {}) {
                    if (t = i(t, 0, e.j() - 1), "nearest" === r) {
                        const o = e.O(t), n = e.N();
                        if (o < n) r = "start"; else {
                            if (!(o + e.k(t) > n + e.B())) return;
                            r = "end";
                        }
                    }
                    u((() => n + e.T() + e.O(t) + ("end" === r ? e.k(t) - e.B() : "center" === r ? (e.k(t) - e.B()) / 2 : 0)), o);
                },
                ce: () => {
                    o && o.V();
                }
            };
        })(p, f), _ = e.ref(p.m());
        p.R(1, (() => {
            _.value = p.m();
        })), p.R(4, (() => {
            n("scroll", p.N());
        })), p.R(8, (() => {
            n("scrollEnd");
        }));
        const b = e.computed((e => {
            _.value;
            const t = p.v(r.bufferSize);
            return e && N(e, t) ? e : t;
        })), g = e.computed((() => _.value && p.q())), v = e.computed((() => _.value && p.M()));
        return e.onMounted((() => {
            u = !1;
            const t = d.value, o = requestAnimationFrame((() => {
                const e = e => {
                    m.te(e), h.oe(t, e);
                };
                r.scrollRef ? e(r.scrollRef) : e(t.parentElement);
            }));
            e.onUnmounted((() => {
                cancelAnimationFrame(o);
            }));
        })), e.onUnmounted((() => {
            p.p(), m.p(), h.p();
        })), e.watch((() => r.data.length), (e => {
            p.A(5, [ e, r.shift ]);
        })), e.watch((() => r.startMargin), (e => {
            p.A(6, e);
        }), {
            immediate: !0
        }), e.watch([ _ ], (() => {
            h.ce();
        }), {
            flush: "post"
        }), s({
            get cache() {
                return p.h();
            },
            get scrollOffset() {
                return p.N();
            },
            get scrollSize() {
                return (e => o(e.M(), e.B()))(p);
            },
            get viewportSize() {
                return p.B();
            },
            findItemIndex: p.S,
            getItemOffset: p.O,
            getItemSize: p.k,
            scrollToIndex: h.le,
            scrollTo: h.se,
            scrollBy: h.ie
        }), () => {
            const t = r.as, o = r.item, n = v.value, s = h.ne(), i = [], a = t => {
                const n = c.default({
                    item: r.data[t],
                    index: t
                });
                return e.createVNode(k, {
                    key: j(n, t),
                    L: _,
                    W: p,
                    Y: m.re,
                    D: t,
                    X: n,
                    U: f,
                    K: s,
                    G: u,
                    Z: o,
                    ee: r.itemProps?.({
                        item: r.data[t],
                        index: t
                    })
                }, null, 8, [ "_stateVersion", "_store", "_resizer", "_index", "_children", "_isHorizontal", "_isNegative", "_isSSR", "_as", "_itemProps" ]);
            };
            if (r.keepMounted) {
                const e = new Set(r.keepMounted);
                for (let [t, r] = b.value; t <= r; t++) e.add(t);
                l([ ...e ]).forEach((e => {
                    i.push(a(e));
                }));
            } else for (let [e, t] = b.value; e <= t; e++) i.push(a(e));
            return e.createVNode(t, {
                ref: d,
                style: {
                    contain: "size style",
                    overflowAnchor: "none",
                    flex: "none",
                    position: "relative",
                    width: f ? n + "px" : "100%",
                    height: f ? "100%" : n + "px",
                    pointerEvents: g.value ? "none" : void 0
                }
            }, "function" == typeof (y = i) || "[object Object]" === Object.prototype.toString.call(y) && !e.isVNode(y) ? i : {
                default: () => [ i ],
                _: 2
            }, 8, [ "style" ]);
            var y;
        };
    }
}), T = {
    data: {
        type: Array,
        required: !0
    },
    bufferSize: Number,
    itemSize: Number,
    shift: Boolean,
    horizontal: Boolean,
    ssrCount: Number,
    itemProps: Function,
    keepMounted: Array,
    cache: Object
}, M = /*#__PURE__*/ e.defineComponent({
    props: T,
    emits: [ "scroll", "scrollEnd" ],
    setup(t, {emit: r, expose: o, slots: n}) {
        const s = t.horizontal, i = e => {
            r("scroll", e);
        }, l = () => {
            r("scrollEnd");
        }, c = e.ref();
        return o({
            get cache() {
                return c.value.cache;
            },
            get scrollOffset() {
                return c.value.scrollOffset;
            },
            get scrollSize() {
                return c.value.scrollSize;
            },
            get viewportSize() {
                return c.value.viewportSize;
            },
            findItemIndex: (...e) => c.value.findItemIndex(...e),
            getItemOffset: (...e) => c.value.getItemOffset(...e),
            getItemSize: (...e) => c.value.getItemSize(...e),
            scrollToIndex: (...e) => c.value.scrollToIndex(...e),
            scrollTo: (...e) => c.value.scrollTo(...e),
            scrollBy: (...e) => c.value.scrollBy(...e)
        }), () => {
            return e.createVNode("div", {
                style: {
                    display: s ? "inline-block" : "block",
                    [s ? "overflowX" : "overflowY"]: "auto",
                    contain: "strict",
                    width: "100%",
                    height: "100%"
                }
            }, [ e.createVNode(B, {
                ref: c,
                data: t.data,
                bufferSize: t.bufferSize,
                itemSize: t.itemSize,
                itemProps: t.itemProps,
                shift: t.shift,
                ssrCount: t.ssrCount,
                horizontal: s,
                keepMounted: t.keepMounted,
                cache: t.cache,
                onScroll: i,
                onScrollEnd: l
            }, (r = n, "function" == typeof r || "[object Object]" === Object.prototype.toString.call(r) && !e.isVNode(r) ? n : {
                default: () => [ n ],
                _: 2
            }), 8, [ "data", "bufferSize", "itemSize", "itemProps", "shift", "ssrCount", "horizontal", "keepMounted", "cache", "onScroll", "onScrollEnd" ]) ], 4);
            var r;
        };
    }
}), E = {
    data: {
        type: Array,
        required: !0
    },
    bufferSize: Number,
    itemSize: Number,
    shift: Boolean,
    horizontal: Boolean,
    as: {
        type: String,
        default: "div"
    },
    item: {
        type: String,
        default: "div"
    },
    cache: Object
}, P = /*#__PURE__*/ e.defineComponent({
    props: E,
    emits: [ "scroll", "scrollEnd" ],
    setup(r, {emit: o, slots: n, expose: s}) {
        const l = r.horizontal, u = e.ref(), f = z(r.data.length, r.itemSize, void 0, r.cache, !r.itemSize), d = ((e, r) => {
            const o = r ? "width" : "height", n = r ? "innerWidth" : "innerHeight", s = new WeakMap, i = O((r => {
                const n = [];
                for (const {target: e, contentRect: i} of r) {
                    if (!e.offsetParent) continue;
                    const r = s.get(e);
                    r != t && n.push([ r, i[o] ]);
                }
                n.length && e.A(3, n);
            }));
            let l;
            return {
                te(t) {
                    const r = v(g(t)), o = () => {
                        e.A(4, r[n]);
                    };
                    r.addEventListener("resize", o), c(o), l = () => {
                        r.removeEventListener("resize", o);
                    };
                },
                re: (e, t) => (s.set(e, t), i.F(e), () => {
                    s.delete(e), i.J(e);
                }),
                p() {
                    l && l(), i.H();
                }
            };
        })(f, l), p = ((e, t) => {
            let r, o, n = a(), s = !1;
            const l = t ? "left" : "top", [c] = I(e, (() => n[0]), ((e, t) => {
                e = $(e, s);
                const o = v(g(r));
                t ? o.scroll({
                    [l]: e,
                    behavior: "smooth"
                }) : o.scroll({
                    [l]: e
                });
            })), u = (e, t, r, o, n = 0) => {
                const i = o ? "offsetLeft" : "offsetTop", l = n + (o && s ? r.innerWidth - e[i] - e.offsetWidth : e[i]), c = e.offsetParent;
                return e !== t && c ? u(c, t, r, o, l) : l;
            };
            return {
                oe(i) {
                    r = i;
                    const c = t ? "scrollX" : "scrollY", a = g(i), f = v(a);
                    t && (s = "rtl" === getComputedStyle(b(a)).direction), o = w(e, f, t, (() => $(f[c], s)), ((t, r) => {
                        r ? f.scroll({
                            [l]: $(e.N() + t, s)
                        }) : f.scrollBy({
                            [l]: $(t, s)
                        });
                    }), (() => u(i, a.body, f, t))), n[1](!0);
                },
                p() {
                    o && o.H(), r = void 0, n[1](!1), n = a();
                },
                ne: () => s,
                ce: () => {
                    o && o.V();
                },
                le(o, {align: n, smooth: s, offset: l = 0} = {}) {
                    if (!r) return;
                    if (o = i(o, 0, e.j() - 1), "nearest" === n) {
                        const t = e.O(o), r = e.N();
                        if (t < r) n = "start"; else {
                            if (!(t + e.k(o) > r + e.B())) return;
                            n = "end";
                        }
                    }
                    const a = g(r), f = v(a), d = b(a), p = () => e.B() - (t ? d.clientWidth : d.clientHeight);
                    c((() => l + u(r, a.body, f, t) + e.O(o) + ("end" === n ? e.k(o) - (e.B() - p()) : "center" === n ? (e.k(o) - (e.B() - p())) / 2 : 0)), s);
                }
            };
        })(f, l), m = e.ref(f.m());
        f.R(1, (() => {
            m.value = f.m();
        })), f.R(4, (() => {
            o("scroll");
        })), f.R(8, (() => {
            o("scrollEnd");
        }));
        const h = e.computed((e => {
            m.value;
            const t = f.v(r.bufferSize);
            return e && N(e, t) ? e : t;
        })), _ = e.computed((() => m.value && f.q())), y = e.computed((() => m.value && f.M()));
        return e.onMounted((() => {
            const e = u.value;
            e && (d.te(e), p.oe(e));
        })), e.onUnmounted((() => {
            f.p(), d.p(), p.p();
        })), e.watch((() => r.data.length), (e => {
            f.A(5, [ e, r.shift ]);
        })), e.watch([ m ], (() => {
            p.ce();
        }), {
            flush: "post"
        }), s({
            get cache() {
                return f.h();
            },
            get scrollOffset() {
                return f.N();
            },
            get viewportSize() {
                return f.B();
            },
            findItemIndex: f.S,
            getItemOffset: f.O,
            getItemSize: f.k,
            scrollToIndex: p.le
        }), () => {
            const t = r.as, o = r.item, s = y.value, i = p.ne(), c = [];
            for (let [t, s] = h.value; t <= s; t++) {
                const s = n.default({
                    item: r.data[t],
                    index: t
                });
                c.push(e.createVNode(k, {
                    key: j(s, t),
                    L: m,
                    W: f,
                    Y: d.re,
                    D: t,
                    X: s,
                    U: l,
                    K: i,
                    Z: o
                }, null, 8, [ "_stateVersion", "_store", "_resizer", "_index", "_children", "_isHorizontal", "_isNegative", "_as" ]));
            }
            return e.createVNode(t, {
                ref: u,
                style: {
                    contain: "size style",
                    overflowAnchor: "none",
                    flex: "none",
                    position: "relative",
                    width: l ? s + "px" : "100%",
                    height: l ? "100%" : s + "px",
                    pointerEvents: _.value ? "none" : void 0
                }
            }, "function" == typeof (a = c) || "[object Object]" === Object.prototype.toString.call(a) && !e.isVNode(a) ? c : {
                default: () => [ c ],
                _: 2
            }, 8, [ "style" ]);
            var a;
        };
    }
});

exports.VList = M, exports.Virtualizer = B, exports.WindowVirtualizer = P;
//# sourceMappingURL=index.cjs.map
