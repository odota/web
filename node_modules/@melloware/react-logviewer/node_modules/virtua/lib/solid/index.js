import { createComponent as e, Dynamic as t, spread as r, mergeProps as n, insert as o, template as s, use as i, setStyleProperty as c, effect as l } from "solid-js/web";

import { mergeProps as u, createEffect as f, createMemo as a, onCleanup as d, createSignal as g, onMount as h, createComputed as p, on as v, untrack as m, For as S, splitProps as $ } from "solid-js";

const b = null, {min: z, max: w, abs: x, floor: y} = Math, _ = (e, t, r) => z(r, w(t, e)), I = e => [ ...e ].sort(((e, t) => e - t)), k = "function" == typeof queueMicrotask ? queueMicrotask : e => {
    Promise.resolve().then(e);
}, T = () => {
    let e;
    return [ new Promise((t => {
        e = t;
    })), e ];
}, M = e => {
    let t;
    return () => (e && (t = e(), e = void 0), t);
}, O = (e, t, r) => {
    const n = r ? "unshift" : "push";
    for (let r = 0; r < t; r++) e[n](-1);
    return e;
}, R = (e, t) => {
    const r = e.o[t];
    return -1 === r ? e.i : r;
}, J = (e, t, r) => {
    const n = -1 === e.o[t];
    return e.o[t] = r, e.l = z(t, e.l), n;
}, P = (e, t) => {
    if (!e.u) return 0;
    if (e.l >= t) return e.h[t];
    e.l < 0 && (e.h[0] = 0, e.l = 0);
    let r = e.l, n = e.h[r];
    for (;r < t; ) n += R(e, r), e.h[++r] = n;
    return e.l = t, n;
}, B = (e, t, r = 0, n = e.u - 1) => {
    let o = r;
    for (;r <= n; ) {
        const s = y((r + n) / 2);
        P(e, s) <= t ? (o = s, r = s + 1) : n = s - 1;
    }
    return _(o, 0, e.u - 1);
}, C = (e, t, r) => {
    const n = t - e.u;
    return e.l = r ? -1 : z(t - 1, e.l), e.u = t, n > 0 ? (O(e.h, n), O(e.o, n, r), 
    e.i * n) : (e.h.splice(n), (r ? e.o.splice(0, -n) : e.o.splice(n)).reduce(((t, r) => t - (-1 === r ? e.i : r)), 0));
}, E = e => e.documentElement, H = e => e.ownerDocument, L = e => e.defaultView, W = /*#__PURE__*/ M((() => !!/iP(hone|od|ad)/.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 0)), j = /*#__PURE__*/ M((() => "scrollBehavior" in E(document).style)), q = (e, t = 40, r = 0, n, o = !1) => {
    let s = !!r, i = 1, c = 0, l = 0, u = 0, f = 0, a = 0, d = 0, g = 0, h = 0, p = b, v = [ 0, s ? w(r - 1, 0) : -1 ], m = 0, S = !1;
    const $ = ((e, t, r) => ({
        i: t,
        o: r ? O(r.slice(0, z(e, r.length)), w(0, e - r.length)) : O([], e),
        u: e,
        l: -1,
        h: O([], e + 1)
    }))(e, n ? n[1] : t, n && n[0]), y = new Set, _ = () => u - l, k = () => _() + a + f, T = (e, t) => ((e, t, r, n) => {
        if (n = z(n, e.u - 1), P(e, n) <= t) {
            const o = B(e, r, n);
            return [ B(e, t, n, o), o ];
        }
        {
            const o = B(e, t, void 0, n);
            return [ o, B(e, r, o) ];
        }
    })($, e, t, v[0]), M = () => P($, $.u), E = (e, t) => {
        const r = P($, e) - a;
        return t ? M() - r - H(e) : r;
    }, H = e => R($, e), L = (e, t = -1) => $.o[e] === t, j = e => {
        e && (W() && 0 !== g || p && 1 === h ? a += e : f += e);
    };
    return {
        p: () => {
            y.clear();
        },
        v: () => i,
        m: () => (e => [ e.o.slice(), e.i ])($),
        S: (e = 200) => {
            if (!S || s) return v;
            let t, r;
            if (d) [t, r] = v; else {
                let n = w(0, k()), s = n + c;
                o || (e = w(0, e), 1 !== g && (n -= e), 2 !== g && (s += e)), [t, r] = v = T(w(0, n), w(0, s)), 
                p && (t = z(t, p[0]), r = w(r, p[1]));
            }
            return [ w(t, 0), z(r, $.u - 1) ];
        },
        $: e => B($, e - l),
        _: L,
        I: E,
        k: H,
        T: () => $.u,
        M: () => u,
        O: () => 0 !== g,
        R: () => c,
        J: () => l,
        P: M,
        B: () => (d = f, f = 0, [ d, 2 === h ]),
        C: (e, t) => {
            const r = [ e, t ];
            return y.add(r), () => {
                y.delete(r);
            };
        },
        H: (e, t) => {
            let r, n, v = 0;
            switch (e) {
              case 1:
                {
                    if (t === u && 0 === h) break;
                    const e = d;
                    d = 0;
                    const r = t - u, o = x(r);
                    e && o < x(e) + 1 || 0 !== h || (g = r < 0 ? 2 : 1), s && (s = !1), u = t, v = 4;
                    const i = _();
                    i >= -c && i <= M() && (v += 1, n = o > c);
                    break;
                }

              case 2:
                v = 8, 0 !== g && (r = !0, v += 1), g = 0, h = 0, p = b;
                break;

              case 3:
                {
                    const e = t.filter((([e, t]) => !L(e, t)));
                    if (!e.length) break;
                    j(e.reduce(((e, [t, r]) => {
                        let n;
                        if (2 === h) n = !0; else if (p && 1 === h) n = t < p[0]; else {
                            const e = _(), r = E(t), o = H(t);
                            n = 1 !== g && 0 === h ? r + o < e : r < e && r + o < e + c;
                        }
                        return n && (e += r - H(t)), e;
                    }), 0));
                    for (const [t, r] of e) {
                        const e = H(t), n = J($, t, r);
                        o && (m += n ? r : r - e);
                    }
                    o && c && m > c && (j(((e, t) => {
                        let r = 0;
                        const n = [];
                        e.o.forEach(((e, o) => {
                            -1 !== e && (n.push(e), o < t && r++);
                        })), e.l = -1;
                        const o = I(n), s = o.length, i = s / 2 | 0, c = s % 2 == 0 ? (o[i - 1] + o[i]) / 2 : o[i], l = e.i;
                        return ((e.i = c) - l) * w(t - r, 0);
                    })($, B($, k()))), o = !1), v = 3, n = !0;
                    break;
                }

              case 4:
                c !== t && (c || (S = n = !0), c = t, v = 3);
                break;

              case 5:
                t[1] ? (j(C($, t[0], !0)), h = 2, v = 1) : (C($, t[0]), v = 1);
                break;

              case 6:
                l = t;
                break;

              case 7:
                h = 1;
                break;

              case 8:
                p = T(t, t + c), v = 1;
            }
            v && (i = 1 + (2147483647 & i), r && a && (f += a, a = 0), y.forEach((([e, t]) => {
                v & e && t(n);
            })));
        }
    };
}, N = setTimeout, V = (e, t) => t ? -e : e, X = (e, t, r, n, o, s) => {
    const i = Date.now;
    let c = 0, l = !1, u = !1, f = !1, a = !1;
    const d = (() => {
        let t;
        const r = () => {
            t != b && clearTimeout(t);
        }, n = () => {
            r(), t = N((() => {
                t = b, (() => {
                    if (l || u) return l = !1, void d();
                    f = !1, e.H(2);
                })();
            }), 150);
        };
        return n.L = r, n;
    })(), g = () => {
        c = i(), f && (a = !0), s && e.H(6, s()), e.H(1, n()), d();
    }, h = t => {
        if (l || !e.O() || t.ctrlKey) return;
        const n = i() - c;
        150 > n && 50 < n && (r ? t.deltaX : t.deltaY) && (l = !0);
    }, p = () => {
        u = !0, f = a = !1;
    }, v = () => {
        u = !1, W() && (f = !0);
    };
    return t.addEventListener("scroll", g), t.addEventListener("wheel", h, {
        passive: !0
    }), t.addEventListener("touchstart", p, {
        passive: !0
    }), t.addEventListener("touchend", v, {
        passive: !0
    }), {
        W: () => {
            t.removeEventListener("scroll", g), t.removeEventListener("wheel", h), t.removeEventListener("touchstart", p), 
            t.removeEventListener("touchend", v), d.L();
        },
        j: () => {
            const [t, r] = e.B();
            t && (o(t, r, a), a = !1, r && e.R() > e.P() && e.H(1, n()));
        }
    };
}, Y = (e, t, r) => {
    let n;
    return [ async (o, s) => {
        if (!await t()) return;
        n && n();
        const i = () => {
            const [t, r] = T();
            return n = () => {
                r(!1);
            }, e.R() && N(n, 150), [ t, e.C(2, (() => {
                r(!0);
            })) ];
        };
        if (s && j()) e.H(8, o()), k((async () => {
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
}, D = e => {
    let t;
    return {
        q(r) {
            (t || (t = new (L(H(r)).ResizeObserver)(e))).observe(r);
        },
        N(e) {
            t.unobserve(e);
        },
        W() {
            t && t.disconnect();
        }
    };
}, U = r => {
    let n;
    r = u({
        V: "div"
    }, r), f((() => {
        n && d(r.X(n, r.Y));
    }));
    const o = a((() => {
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
    return e(t, {
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
}, A = (e, t) => e[0] === t[0] && e[1] === t[1], F = r => {
    let n;
    const {itemSize: o, horizontal: s = !1, cache: i} = r;
    r = u({
        as: "div"
    }, r);
    const c = q(r.data.length, o, void 0, i, !o), l = ((e, t) => {
        let r;
        const n = t ? "width" : "height", o = new WeakMap, s = D((t => {
            const s = [];
            for (const {target: i, contentRect: c} of t) if (i.offsetParent) if (i === r) e.H(4, c[n]); else {
                const e = o.get(i);
                e != b && s.push([ e, c[n] ]);
            }
            s.length && e.H(3, s);
        }));
        return {
            G(e) {
                s.q(r = e);
            },
            K: (e, t) => (o.set(e, t), s.q(e), () => {
                o.delete(e), s.N(e);
            }),
            p: s.W
        };
    })(c, s), $ = ((e, t) => {
        let r, n, o = T(), s = !1;
        const i = t ? "scrollLeft" : "scrollTop", c = t ? "overflowX" : "overflowY", [l, u] = Y(e, (() => o[0]), ((e, n) => {
            e = V(e, s), n ? r.scrollTo({
                [t ? "left" : "top"]: e,
                behavior: "smooth"
            }) : r[i] = e;
        }));
        return {
            Z(l, f) {
                r = f, t && (s = "rtl" === getComputedStyle(f).direction), n = X(e, f, t, (() => V(f[i], s)), ((t, r, n) => {
                    if (n) {
                        const e = f.style, t = e[c];
                        e[c] = "hidden", N((() => {
                            e[c] = t;
                        }));
                    }
                    f[i] = V(e.M() + t, s), r && u();
                })), o[1](!0);
            },
            p() {
                n && n.W(), o[1](!1), o = T();
            },
            ee: () => s,
            te(e) {
                l((() => e));
            },
            re(t) {
                t += e.M(), l((() => t));
            },
            ne(t, {align: r, smooth: n, offset: o = 0} = {}) {
                if (t = _(t, 0, e.T() - 1), "nearest" === r) {
                    const n = e.I(t), o = e.M();
                    if (n < o) r = "start"; else {
                        if (!(n + e.k(t) > o + e.R())) return;
                        r = "end";
                    }
                }
                l((() => o + e.J() + e.I(t) + ("end" === r ? e.k(t) - e.R() : "center" === r ? (e.k(t) - e.R()) / 2 : 0)), n);
            },
            oe: () => {
                n && n.j();
            }
        };
    })(c, s), [z, x] = g(c.v());
    c.C(1, (() => {
        x(c.v());
    })), c.C(4, (() => {
        r.onScroll?.(c.M());
    })), c.C(8, (() => {
        r.onScrollEnd?.();
    }));
    const y = a((e => {
        z();
        const t = c.S(r.bufferSize);
        return e && A(e, t) ? e : t;
    })), k = a((() => z() && c.O())), M = a((() => z() && c.P())), O = a((() => z() && $.ee()));
    h((() => {
        r.ref && r.ref({
            get cache() {
                return c.m();
            },
            get scrollOffset() {
                return c.M();
            },
            get scrollSize() {
                return (e => w(e.P(), e.R()))(c);
            },
            get viewportSize() {
                return c.R();
            },
            findItemIndex: c.$,
            getItemOffset: c.I,
            getItemSize: c.k,
            scrollToIndex: $.ne,
            scrollTo: $.te,
            scrollBy: $.re
        });
        const e = n, t = r.scrollRef || e.parentElement;
        l.G(t), $.Z(e, t), d((() => {
            r.ref && r.ref(), c.p(), l.p(), $.p();
        }));
    })), p(v((() => r.startMargin || 0), (e => {
        e !== c.J() && c.H(6, e);
    }))), f(v(z, (() => {
        $.oe();
    })));
    const R = a((() => {
        const e = r.data.length;
        m((() => {
            e !== c.T() && c.H(5, [ e, r.shift ]);
        }));
        const t = [], n = [];
        if (r.keepMounted) {
            const e = new Set(r.keepMounted);
            for (let [t, r] = y(); t <= r; t++) e.add(t);
            I([ ...e ]).forEach((e => {
                t.push(r.data[e]), n.push(e);
            }));
        } else for (let [e, o] = y(); e <= o; e++) t.push(r.data[e]), n.push(e);
        return {
            se: t,
            ie: n
        };
    }));
    return e(t, {
        get component() {
            return r.as;
        },
        ref(e) {
            "function" == typeof n ? n(e) : n = e;
        },
        get style() {
            return {
                contain: "size style",
                "overflow-anchor": "none",
                flex: "none",
                position: "relative",
                width: s ? M() + "px" : "100%",
                height: s ? "100%" : M() + "px",
                "pointer-events": k() ? "none" : void 0
            };
        },
        get children() {
            return e(S, {
                get each() {
                    return R().se;
                },
                children: (t, n) => ((t, n) => {
                    const o = a((() => (z(), c.I(n(), O())))), i = a((() => (z(), c._(n())))), u = a((() => m((() => r.children(t, n)))));
                    return e(U, {
                        get V() {
                            return r.item;
                        },
                        get Y() {
                            return n();
                        },
                        get X() {
                            return l.K;
                        },
                        get U() {
                            return o();
                        },
                        get A() {
                            return i();
                        },
                        get F() {
                            return u();
                        },
                        D: s
                    });
                })(t, a((() => R().ie[n()])))
            });
        }
    });
};

var G = /*#__PURE__*/ s("<div>");

const K = t => {
    const [s, i] = $(t, [ "ref", "data", "children", "bufferSize", "itemSize", "shift", "horizontal", "keepMounted", "cache", "item", "onScroll", "onScrollEnd", "style" ]);
    return c = G(), r(c, n(i, {
        get style() {
            return {
                display: s.horizontal ? "inline-block" : "block",
                [s.horizontal ? "overflow-x" : "overflow-y"]: "auto",
                contain: "strict",
                width: "100%",
                height: "100%",
                ...s.style
            };
        }
    }), !1, !0), o(c, e(F, {
        ref(e) {
            var t = s.ref;
            "function" == typeof t ? t(e) : s.ref = e;
        },
        get data() {
            return s.data;
        },
        get bufferSize() {
            return s.bufferSize;
        },
        get itemSize() {
            return s.itemSize;
        },
        get shift() {
            return s.shift;
        },
        get horizontal() {
            return s.horizontal;
        },
        get keepMounted() {
            return s.keepMounted;
        },
        get cache() {
            return s.cache;
        },
        get item() {
            return s.item;
        },
        get onScroll() {
            return s.onScroll;
        },
        get onScrollEnd() {
            return s.onScrollEnd;
        },
        get children() {
            return s.children;
        }
    })), c;
    var c;
};

var Q = /*#__PURE__*/ s("<div style=overflow-anchor:none>");

const Z = t => {
    let r;
    const {ref: n, data: s, children: u, itemSize: p, shift: $, horizontal: z = !1, cache: w, onScrollEnd: x} = t, y = q(t.data.length, p, void 0, w, !p), I = ((e, t) => {
        const r = t ? "width" : "height", n = t ? "innerWidth" : "innerHeight", o = new WeakMap, s = D((t => {
            const n = [];
            for (const {target: e, contentRect: s} of t) {
                if (!e.offsetParent) continue;
                const t = o.get(e);
                t != b && n.push([ t, s[r] ]);
            }
            n.length && e.H(3, n);
        }));
        let i;
        return {
            G(t) {
                const r = L(H(t)), o = () => {
                    e.H(4, r[n]);
                };
                r.addEventListener("resize", o), k(o), i = () => {
                    r.removeEventListener("resize", o);
                };
            },
            K: (e, t) => (o.set(e, t), s.q(e), () => {
                o.delete(e), s.N(e);
            }),
            p() {
                i && i(), s.W();
            }
        };
    })(y, z), M = ((e, t) => {
        let r, n, o = T(), s = !1;
        const i = t ? "left" : "top", [c] = Y(e, (() => o[0]), ((e, t) => {
            e = V(e, s);
            const n = L(H(r));
            t ? n.scroll({
                [i]: e,
                behavior: "smooth"
            }) : n.scroll({
                [i]: e
            });
        })), l = (e, t, r, n, o = 0) => {
            const i = n ? "offsetLeft" : "offsetTop", c = o + (n && s ? r.innerWidth - e[i] - e.offsetWidth : e[i]), u = e.offsetParent;
            return e !== t && u ? l(u, t, r, n, c) : c;
        };
        return {
            Z(c) {
                r = c;
                const u = t ? "scrollX" : "scrollY", f = H(c), a = L(f);
                t && (s = "rtl" === getComputedStyle(E(f)).direction), n = X(e, a, t, (() => V(a[u], s)), ((t, r) => {
                    r ? a.scroll({
                        [i]: V(e.M() + t, s)
                    }) : a.scrollBy({
                        [i]: V(t, s)
                    });
                }), (() => l(c, f.body, a, t))), o[1](!0);
            },
            p() {
                n && n.W(), r = void 0, o[1](!1), o = T();
            },
            ee: () => s,
            oe: () => {
                n && n.j();
            },
            ne(n, {align: o, smooth: s, offset: i = 0} = {}) {
                if (!r) return;
                if (n = _(n, 0, e.T() - 1), "nearest" === o) {
                    const t = e.I(n), r = e.M();
                    if (t < r) o = "start"; else {
                        if (!(t + e.k(n) > r + e.R())) return;
                        o = "end";
                    }
                }
                const u = H(r), f = L(u), a = E(u), d = () => e.R() - (t ? a.clientWidth : a.clientHeight);
                c((() => i + l(r, u.body, f, t) + e.I(n) + ("end" === o ? e.k(n) - (e.R() - d()) : "center" === o ? (e.k(n) - (e.R() - d())) / 2 : 0)), s);
            }
        };
    })(y, z), [O, R] = g(y.v());
    y.C(1, (() => {
        R(y.v());
    })), y.C(4, (() => {
        t.onScroll?.();
    })), y.C(8, (() => {
        t.onScrollEnd?.();
    }));
    const J = a((e => {
        O();
        const r = y.S(t.bufferSize);
        return e && A(e, r) ? e : r;
    })), P = a((() => O() && y.O())), B = a((() => O() && y.P())), C = a((() => O() && M.ee()));
    h((() => {
        t.ref && t.ref({
            get cache() {
                return y.m();
            },
            get scrollOffset() {
                return y.M();
            },
            get viewportSize() {
                return y.R();
            },
            findItemIndex: y.$,
            getItemOffset: y.I,
            getItemSize: y.k,
            scrollToIndex: M.ne
        }), I.G(r), M.Z(r), d((() => {
            t.ref && t.ref(), y.p(), I.p(), M.p();
        }));
    })), f(v(O, (() => {
        M.oe();
    })));
    const W = a((() => {
        const e = t.data.length;
        m((() => {
            e !== y.T() && y.H(5, [ e, t.shift ]);
        }));
        const r = [];
        for (let [e, n] = J(); e <= n; e++) r.push(t.data[e]);
        return r;
    }));
    return j = Q(), "function" == typeof r ? i(r, j) : r = j, c(j, "contain", "size style"), 
    c(j, "flex", "none"), c(j, "position", "relative"), o(j, e(S, {
        get each() {
            return W();
        },
        children: (r, n) => {
            const o = a((() => J()[0] + n())), s = a((() => (O(), y.I(o(), C())))), i = a((() => (O(), 
            y._(o())))), c = a((() => m((() => t.children(r, o)))));
            return e(U, {
                get Y() {
                    return o();
                },
                get X() {
                    return I.K;
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
                D: z
            });
        }
    })), l((e => {
        var t = z ? B() + "px" : "100%", r = z ? "100%" : B() + "px", n = P() ? "none" : void 0;
        return t !== e.e && c(j, "width", e.e = t), r !== e.t && c(j, "height", e.t = r), 
        n !== e.a && c(j, "pointer-events", e.a = n), e;
    }), {
        e: void 0,
        t: void 0,
        a: void 0
    }), j;
    var j;
};

export { K as VList, F as Virtualizer, Z as WindowVirtualizer };
//# sourceMappingURL=index.js.map
