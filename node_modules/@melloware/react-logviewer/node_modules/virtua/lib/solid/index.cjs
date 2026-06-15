var e = require("solid-js/web"), t = require("solid-js");

const r = null, {min: n, max: o, abs: s, floor: i} = Math, c = (e, t, r) => n(r, o(t, e)), l = e => [ ...e ].sort(((e, t) => e - t)), u = "function" == typeof queueMicrotask ? queueMicrotask : e => {
    Promise.resolve().then(e);
}, f = () => {
    let e;
    return [ new Promise((t => {
        e = t;
    })), e ];
}, a = e => {
    let t;
    return () => (e && (t = e(), e = void 0), t);
}, d = (e, t, r) => {
    const n = r ? "unshift" : "push";
    for (let r = 0; r < t; r++) e[n](-1);
    return e;
}, g = (e, t) => {
    const r = e.o[t];
    return -1 === r ? e.i : r;
}, h = (e, t, r) => {
    const o = -1 === e.o[t];
    return e.o[t] = r, e.l = n(t, e.l), o;
}, p = (e, t) => {
    if (!e.u) return 0;
    if (e.l >= t) return e.h[t];
    e.l < 0 && (e.h[0] = 0, e.l = 0);
    let r = e.l, n = e.h[r];
    for (;r < t; ) n += g(e, r), e.h[++r] = n;
    return e.l = t, n;
}, v = (e, t, r = 0, n = e.u - 1) => {
    let o = r;
    for (;r <= n; ) {
        const s = i((r + n) / 2);
        p(e, s) <= t ? (o = s, r = s + 1) : n = s - 1;
    }
    return c(o, 0, e.u - 1);
}, m = (e, t, r) => {
    const o = t - e.u;
    return e.l = r ? -1 : n(t - 1, e.l), e.u = t, o > 0 ? (d(e.h, o), d(e.o, o, r), 
    e.i * o) : (e.h.splice(o), (r ? e.o.splice(0, -o) : e.o.splice(o)).reduce(((t, r) => t - (-1 === r ? e.i : r)), 0));
}, S = e => e.documentElement, $ = e => e.ownerDocument, b = e => e.defaultView, x = /*#__PURE__*/ a((() => !!/iP(hone|od|ad)/.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 0)), z = /*#__PURE__*/ a((() => "scrollBehavior" in S(document).style)), w = (e, t = 40, i = 0, c, u = !1) => {
    let f = !!i, a = 1, S = 0, $ = 0, b = 0, z = 0, w = 0, y = 0, _ = 0, I = 0, k = r, T = [ 0, f ? o(i - 1, 0) : -1 ], M = 0, O = !1;
    const R = ((e, t, r) => ({
        i: t,
        o: r ? d(r.slice(0, n(e, r.length)), o(0, e - r.length)) : d([], e),
        u: e,
        l: -1,
        h: d([], e + 1)
    }))(e, c ? c[1] : t, c && c[0]), q = new Set, J = () => b - $, B = () => J() + w + z, C = (e, t) => ((e, t, r, o) => {
        if (o = n(o, e.u - 1), p(e, o) <= t) {
            const n = v(e, r, o);
            return [ v(e, t, o, n), n ];
        }
        {
            const n = v(e, t, void 0, o);
            return [ n, v(e, r, n) ];
        }
    })(R, e, t, T[0]), E = () => p(R, R.u), H = (e, t) => {
        const r = p(R, e) - w;
        return t ? E() - r - L(e) : r;
    }, L = e => g(R, e), P = (e, t = -1) => R.o[e] === t, W = e => {
        e && (x() && 0 !== _ || k && 1 === I ? w += e : z += e);
    };
    return {
        p: () => {
            q.clear();
        },
        v: () => a,
        m: () => (e => [ e.o.slice(), e.i ])(R),
        S: (e = 200) => {
            if (!O || f) return T;
            let t, r;
            if (y) [t, r] = T; else {
                let s = o(0, B()), i = s + S;
                u || (e = o(0, e), 1 !== _ && (s -= e), 2 !== _ && (i += e)), [t, r] = T = C(o(0, s), o(0, i)), 
                k && (t = n(t, k[0]), r = o(r, k[1]));
            }
            return [ o(t, 0), n(r, R.u - 1) ];
        },
        $: e => v(R, e - $),
        _: P,
        I: H,
        k: L,
        T: () => R.u,
        M: () => b,
        O: () => 0 !== _,
        R: () => S,
        q: () => $,
        J: E,
        B: () => (y = z, z = 0, [ y, 2 === I ]),
        C: (e, t) => {
            const r = [ e, t ];
            return q.add(r), () => {
                q.delete(r);
            };
        },
        H: (e, t) => {
            let n, i, c = 0;
            switch (e) {
              case 1:
                {
                    if (t === b && 0 === I) break;
                    const e = y;
                    y = 0;
                    const r = t - b, n = s(r);
                    e && n < s(e) + 1 || 0 !== I || (_ = r < 0 ? 2 : 1), f && (f = !1), b = t, c = 4;
                    const o = J();
                    o >= -S && o <= E() && (c += 1, i = n > S);
                    break;
                }

              case 2:
                c = 8, 0 !== _ && (n = !0, c += 1), _ = 0, I = 0, k = r;
                break;

              case 3:
                {
                    const e = t.filter((([e, t]) => !P(e, t)));
                    if (!e.length) break;
                    W(e.reduce(((e, [t, r]) => {
                        let n;
                        if (2 === I) n = !0; else if (k && 1 === I) n = t < k[0]; else {
                            const e = J(), r = H(t), o = L(t);
                            n = 1 !== _ && 0 === I ? r + o < e : r < e && r + o < e + S;
                        }
                        return n && (e += r - L(t)), e;
                    }), 0));
                    for (const [t, r] of e) {
                        const e = L(t), n = h(R, t, r);
                        u && (M += n ? r : r - e);
                    }
                    u && S && M > S && (W(((e, t) => {
                        let r = 0;
                        const n = [];
                        e.o.forEach(((e, o) => {
                            -1 !== e && (n.push(e), o < t && r++);
                        })), e.l = -1;
                        const s = l(n), i = s.length, c = i / 2 | 0, u = i % 2 == 0 ? (s[c - 1] + s[c]) / 2 : s[c], f = e.i;
                        return ((e.i = u) - f) * o(t - r, 0);
                    })(R, v(R, B()))), u = !1), c = 3, i = !0;
                    break;
                }

              case 4:
                S !== t && (S || (O = i = !0), S = t, c = 3);
                break;

              case 5:
                t[1] ? (W(m(R, t[0], !0)), I = 2, c = 1) : (m(R, t[0]), c = 1);
                break;

              case 6:
                $ = t;
                break;

              case 7:
                I = 1;
                break;

              case 8:
                k = C(t, t + S), c = 1;
            }
            c && (a = 1 + (2147483647 & a), n && w && (z += w, w = 0), q.forEach((([e, t]) => {
                c & e && t(i);
            })));
        }
    };
}, y = setTimeout, _ = (e, t) => t ? -e : e, I = (e, t, n, o, s, i) => {
    const c = Date.now;
    let l = 0, u = !1, f = !1, a = !1, d = !1;
    const g = (() => {
        let t;
        const n = () => {
            t != r && clearTimeout(t);
        }, o = () => {
            n(), t = y((() => {
                t = r, (() => {
                    if (u || f) return u = !1, void g();
                    a = !1, e.H(2);
                })();
            }), 150);
        };
        return o.L = n, o;
    })(), h = () => {
        l = c(), a && (d = !0), i && e.H(6, i()), e.H(1, o()), g();
    }, p = t => {
        if (u || !e.O() || t.ctrlKey) return;
        const r = c() - l;
        150 > r && 50 < r && (n ? t.deltaX : t.deltaY) && (u = !0);
    }, v = () => {
        f = !0, a = d = !1;
    }, m = () => {
        f = !1, x() && (a = !0);
    };
    return t.addEventListener("scroll", h), t.addEventListener("wheel", p, {
        passive: !0
    }), t.addEventListener("touchstart", v, {
        passive: !0
    }), t.addEventListener("touchend", m, {
        passive: !0
    }), {
        P: () => {
            t.removeEventListener("scroll", h), t.removeEventListener("wheel", p), t.removeEventListener("touchstart", v), 
            t.removeEventListener("touchend", m), g.L();
        },
        W: () => {
            const [t, r] = e.B();
            t && (s(t, r, d), d = !1, r && e.R() > e.J() && e.H(1, o()));
        }
    };
}, k = (e, t, r) => {
    let n;
    return [ async (o, s) => {
        if (!await t()) return;
        n && n();
        const i = () => {
            const [t, r] = f();
            return n = () => {
                r(!1);
            }, e.R() && y(n, 150), [ t, e.C(2, (() => {
                r(!0);
            })) ];
        };
        if (s && z()) e.H(8, o()), u((async () => {
            for (;;) {
                let t = !0;
                for (let [r, n] = e.S(); r <= n; r++) if (e._(r)) {
                    t = !1;
                    break;
                }
                if (t) break;
                const [r, n] = i();
                try {
                    if (!await r) return;
                } finally {
                    n();
                }
            }
            e.H(7), r(o(), s);
        })); else for (;;) {
            const [t, n] = i();
            try {
                if (e.H(7), r(o()), !await t) return;
            } finally {
                n();
            }
        }
    }, () => {
        n && n();
    } ];
}, T = e => {
    let t;
    return {
        j(r) {
            (t || (t = new (b($(r)).ResizeObserver)(e))).observe(r);
        },
        N(e) {
            t.unobserve(e);
        },
        P() {
            t && t.disconnect();
        }
    };
}, M = r => {
    let n;
    r = t.mergeProps({
        V: "div"
    }, r), t.createEffect((() => {
        n && t.onCleanup(r.X(n, r.Y));
    }));
    const o = t.createMemo((() => {
        const e = r.D, t = {
            contain: "layout style",
            position: "absolute",
            [e ? "height" : "width"]: "100%",
            [e ? "top" : "left"]: "0px",
            [e ? "left" : "top"]: r.U + "px",
            visibility: r.A ? "hidden" : void 0
        };
        return e && (t.display = "inline-flex"), t;
    }));
    return e.createComponent(e.Dynamic, {
        get component() {
            return r.V;
        },
        get index() {
            return r.Y;
        },
        ref(e) {
            "function" == typeof n ? n(e) : n = e;
        },
        get style() {
            return o();
        },
        get children() {
            return r.F;
        }
    });
}, O = (e, t) => e[0] === t[0] && e[1] === t[1], R = n => {
    let s;
    const {itemSize: i, horizontal: u = !1, cache: a} = n;
    n = t.mergeProps({
        as: "div"
    }, n);
    const d = w(n.data.length, i, void 0, a, !i), g = ((e, t) => {
        let n;
        const o = t ? "width" : "height", s = new WeakMap, i = T((t => {
            const i = [];
            for (const {target: c, contentRect: l} of t) if (c.offsetParent) if (c === n) e.H(4, l[o]); else {
                const e = s.get(c);
                e != r && i.push([ e, l[o] ]);
            }
            i.length && e.H(3, i);
        }));
        return {
            G(e) {
                i.j(n = e);
            },
            K: (e, t) => (s.set(e, t), i.j(e), () => {
                s.delete(e), i.N(e);
            }),
            p: i.P
        };
    })(d, u), h = ((e, t) => {
        let r, n, o = f(), s = !1;
        const i = t ? "scrollLeft" : "scrollTop", l = t ? "overflowX" : "overflowY", [u, a] = k(e, (() => o[0]), ((e, n) => {
            e = _(e, s), n ? r.scrollTo({
                [t ? "left" : "top"]: e,
                behavior: "smooth"
            }) : r[i] = e;
        }));
        return {
            Z(c, u) {
                r = u, t && (s = "rtl" === getComputedStyle(u).direction), n = I(e, u, t, (() => _(u[i], s)), ((t, r, n) => {
                    if (n) {
                        const e = u.style, t = e[l];
                        e[l] = "hidden", y((() => {
                            e[l] = t;
                        }));
                    }
                    u[i] = _(e.M() + t, s), r && a();
                })), o[1](!0);
            },
            p() {
                n && n.P(), o[1](!1), o = f();
            },
            ee: () => s,
            te(e) {
                u((() => e));
            },
            re(t) {
                t += e.M(), u((() => t));
            },
            ne(t, {align: r, smooth: n, offset: o = 0} = {}) {
                if (t = c(t, 0, e.T() - 1), "nearest" === r) {
                    const n = e.I(t), o = e.M();
                    if (n < o) r = "start"; else {
                        if (!(n + e.k(t) > o + e.R())) return;
                        r = "end";
                    }
                }
                u((() => o + e.q() + e.I(t) + ("end" === r ? e.k(t) - e.R() : "center" === r ? (e.k(t) - e.R()) / 2 : 0)), n);
            },
            oe: () => {
                n && n.W();
            }
        };
    })(d, u), [p, v] = t.createSignal(d.v());
    d.C(1, (() => {
        v(d.v());
    })), d.C(4, (() => {
        n.onScroll?.(d.M());
    })), d.C(8, (() => {
        n.onScrollEnd?.();
    }));
    const m = t.createMemo((e => {
        p();
        const t = d.S(n.bufferSize);
        return e && O(e, t) ? e : t;
    })), S = t.createMemo((() => p() && d.O())), $ = t.createMemo((() => p() && d.J())), b = t.createMemo((() => p() && h.ee()));
    t.onMount((() => {
        n.ref && n.ref({
            get cache() {
                return d.m();
            },
            get scrollOffset() {
                return d.M();
            },
            get scrollSize() {
                return (e => o(e.J(), e.R()))(d);
            },
            get viewportSize() {
                return d.R();
            },
            findItemIndex: d.$,
            getItemOffset: d.I,
            getItemSize: d.k,
            scrollToIndex: h.ne,
            scrollTo: h.te,
            scrollBy: h.re
        });
        const e = s, r = n.scrollRef || e.parentElement;
        g.G(r), h.Z(e, r), t.onCleanup((() => {
            n.ref && n.ref(), d.p(), g.p(), h.p();
        }));
    })), t.createComputed(t.on((() => n.startMargin || 0), (e => {
        e !== d.q() && d.H(6, e);
    }))), t.createEffect(t.on(p, (() => {
        h.oe();
    })));
    const x = t.createMemo((() => {
        const e = n.data.length;
        t.untrack((() => {
            e !== d.T() && d.H(5, [ e, n.shift ]);
        }));
        const r = [], o = [];
        if (n.keepMounted) {
            const e = new Set(n.keepMounted);
            for (let [t, r] = m(); t <= r; t++) e.add(t);
            l([ ...e ]).forEach((e => {
                r.push(n.data[e]), o.push(e);
            }));
        } else for (let [e, t] = m(); e <= t; e++) r.push(n.data[e]), o.push(e);
        return {
            se: r,
            ie: o
        };
    }));
    return e.createComponent(e.Dynamic, {
        get component() {
            return n.as;
        },
        ref(e) {
            "function" == typeof s ? s(e) : s = e;
        },
        get style() {
            return {
                contain: "size style",
                "overflow-anchor": "none",
                flex: "none",
                position: "relative",
                width: u ? $() + "px" : "100%",
                height: u ? "100%" : $() + "px",
                "pointer-events": S() ? "none" : void 0
            };
        },
        get children() {
            return e.createComponent(t.For, {
                get each() {
                    return x().se;
                },
                children: (r, o) => ((r, o) => {
                    const s = t.createMemo((() => (p(), d.I(o(), b())))), i = t.createMemo((() => (p(), 
                    d._(o())))), c = t.createMemo((() => t.untrack((() => n.children(r, o)))));
                    return e.createComponent(M, {
                        get V() {
                            return n.item;
                        },
                        get Y() {
                            return o();
                        },
                        get X() {
                            return g.K;
                        },
                        get U() {
                            return s();
                        },
                        get A() {
                            return i();
                        },
                        get F() {
                            return c();
                        },
                        D: u
                    });
                })(r, t.createMemo((() => x().ie[o()])))
            });
        }
    });
};

var q = /*#__PURE__*/ e.template("<div>"), J = /*#__PURE__*/ e.template("<div style=overflow-anchor:none>");

exports.VList = r => {
    const [n, o] = t.splitProps(r, [ "ref", "data", "children", "bufferSize", "itemSize", "shift", "horizontal", "keepMounted", "cache", "item", "onScroll", "onScrollEnd", "style" ]);
    return s = q(), e.spread(s, e.mergeProps(o, {
        get style() {
            return {
                display: n.horizontal ? "inline-block" : "block",
                [n.horizontal ? "overflow-x" : "overflow-y"]: "auto",
                contain: "strict",
                width: "100%",
                height: "100%",
                ...n.style
            };
        }
    }), !1, !0), e.insert(s, e.createComponent(R, {
        ref(e) {
            var t = n.ref;
            "function" == typeof t ? t(e) : n.ref = e;
        },
        get data() {
            return n.data;
        },
        get bufferSize() {
            return n.bufferSize;
        },
        get itemSize() {
            return n.itemSize;
        },
        get shift() {
            return n.shift;
        },
        get horizontal() {
            return n.horizontal;
        },
        get keepMounted() {
            return n.keepMounted;
        },
        get cache() {
            return n.cache;
        },
        get item() {
            return n.item;
        },
        get onScroll() {
            return n.onScroll;
        },
        get onScrollEnd() {
            return n.onScrollEnd;
        },
        get children() {
            return n.children;
        }
    })), s;
    var s;
}, exports.Virtualizer = R, exports.WindowVirtualizer = n => {
    let o;
    const {ref: s, data: i, children: l, itemSize: a, shift: d, horizontal: g = !1, cache: h, onScrollEnd: p} = n, v = w(n.data.length, a, void 0, h, !a), m = ((e, t) => {
        const n = t ? "width" : "height", o = t ? "innerWidth" : "innerHeight", s = new WeakMap, i = T((t => {
            const o = [];
            for (const {target: e, contentRect: i} of t) {
                if (!e.offsetParent) continue;
                const t = s.get(e);
                t != r && o.push([ t, i[n] ]);
            }
            o.length && e.H(3, o);
        }));
        let c;
        return {
            G(t) {
                const r = b($(t)), n = () => {
                    e.H(4, r[o]);
                };
                r.addEventListener("resize", n), u(n), c = () => {
                    r.removeEventListener("resize", n);
                };
            },
            K: (e, t) => (s.set(e, t), i.j(e), () => {
                s.delete(e), i.N(e);
            }),
            p() {
                c && c(), i.P();
            }
        };
    })(v, g), x = ((e, t) => {
        let r, n, o = f(), s = !1;
        const i = t ? "left" : "top", [l] = k(e, (() => o[0]), ((e, t) => {
            e = _(e, s);
            const n = b($(r));
            t ? n.scroll({
                [i]: e,
                behavior: "smooth"
            }) : n.scroll({
                [i]: e
            });
        })), u = (e, t, r, n, o = 0) => {
            const i = n ? "offsetLeft" : "offsetTop", c = o + (n && s ? r.innerWidth - e[i] - e.offsetWidth : e[i]), l = e.offsetParent;
            return e !== t && l ? u(l, t, r, n, c) : c;
        };
        return {
            Z(c) {
                r = c;
                const l = t ? "scrollX" : "scrollY", f = $(c), a = b(f);
                t && (s = "rtl" === getComputedStyle(S(f)).direction), n = I(e, a, t, (() => _(a[l], s)), ((t, r) => {
                    r ? a.scroll({
                        [i]: _(e.M() + t, s)
                    }) : a.scrollBy({
                        [i]: _(t, s)
                    });
                }), (() => u(c, f.body, a, t))), o[1](!0);
            },
            p() {
                n && n.P(), r = void 0, o[1](!1), o = f();
            },
            ee: () => s,
            oe: () => {
                n && n.W();
            },
            ne(n, {align: o, smooth: s, offset: i = 0} = {}) {
                if (!r) return;
                if (n = c(n, 0, e.T() - 1), "nearest" === o) {
                    const t = e.I(n), r = e.M();
                    if (t < r) o = "start"; else {
                        if (!(t + e.k(n) > r + e.R())) return;
                        o = "end";
                    }
                }
                const f = $(r), a = b(f), d = S(f), g = () => e.R() - (t ? d.clientWidth : d.clientHeight);
                l((() => i + u(r, f.body, a, t) + e.I(n) + ("end" === o ? e.k(n) - (e.R() - g()) : "center" === o ? (e.k(n) - (e.R() - g())) / 2 : 0)), s);
            }
        };
    })(v, g), [z, y] = t.createSignal(v.v());
    v.C(1, (() => {
        y(v.v());
    })), v.C(4, (() => {
        n.onScroll?.();
    })), v.C(8, (() => {
        n.onScrollEnd?.();
    }));
    const R = t.createMemo((e => {
        z();
        const t = v.S(n.bufferSize);
        return e && O(e, t) ? e : t;
    })), q = t.createMemo((() => z() && v.O())), B = t.createMemo((() => z() && v.J())), C = t.createMemo((() => z() && x.ee()));
    t.onMount((() => {
        n.ref && n.ref({
            get cache() {
                return v.m();
            },
            get scrollOffset() {
                return v.M();
            },
            get viewportSize() {
                return v.R();
            },
            findItemIndex: v.$,
            getItemOffset: v.I,
            getItemSize: v.k,
            scrollToIndex: x.ne
        }), m.G(o), x.Z(o), t.onCleanup((() => {
            n.ref && n.ref(), v.p(), m.p(), x.p();
        }));
    })), t.createEffect(t.on(z, (() => {
        x.oe();
    })));
    const E = t.createMemo((() => {
        const e = n.data.length;
        t.untrack((() => {
            e !== v.T() && v.H(5, [ e, n.shift ]);
        }));
        const r = [];
        for (let [e, t] = R(); e <= t; e++) r.push(n.data[e]);
        return r;
    }));
    return H = J(), "function" == typeof (L = o) ? e.use(L, H) : o = H, e.setStyleProperty(H, "contain", "size style"), 
    e.setStyleProperty(H, "flex", "none"), e.setStyleProperty(H, "position", "relative"), 
    e.insert(H, e.createComponent(t.For, {
        get each() {
            return E();
        },
        children: (r, o) => {
            const s = t.createMemo((() => R()[0] + o())), i = t.createMemo((() => (z(), v.I(s(), C())))), c = t.createMemo((() => (z(), 
            v._(s())))), l = t.createMemo((() => t.untrack((() => n.children(r, s)))));
            return e.createComponent(M, {
                get Y() {
                    return s();
                },
                get X() {
                    return m.K;
                },
                get U() {
                    return i();
                },
                get A() {
                    return c();
                },
                get F() {
                    return l();
                },
                D: g
            });
        }
    })), e.effect((t => {
        var r = g ? B() + "px" : "100%", n = g ? "100%" : B() + "px", o = q() ? "none" : void 0;
        return r !== t.e && e.setStyleProperty(H, "width", t.e = r), n !== t.t && e.setStyleProperty(H, "height", t.t = n), 
        o !== t.a && e.setStyleProperty(H, "pointer-events", t.a = o), t;
    }), {
        e: void 0,
        t: void 0,
        a: void 0
    }), H;
    var H, L;
};
//# sourceMappingURL=index.cjs.map
