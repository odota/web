"use client";
import { jsx as e } from "react/jsx-runtime";

import { useLayoutEffect as t, useEffect as o, useRef as n, memo as r, useMemo as i, forwardRef as s, useReducer as l, useImperativeHandle as c, useCallback as f } from "react";

import { flushSync as u } from "react-dom";

const d = null, {min: a, max: h, abs: p, floor: g} = Math, v = (e, t, o) => a(o, h(t, e)), m = e => [ ...e ].sort(((e, t) => e - t)), _ = "function" == typeof queueMicrotask ? queueMicrotask : e => {
    Promise.resolve().then(e);
}, w = () => {
    let e;
    return [ new Promise((t => {
        e = t;
    })), e ];
}, S = e => {
    let t;
    return () => (e && (t = e(), e = void 0), t);
}, $ = (e, t, o) => {
    const n = o ? "unshift" : "push";
    for (let o = 0; o < t; o++) e[n](-1);
    return e;
}, z = (e, t) => {
    const o = e.t[t];
    return -1 === o ? e.o : o;
}, y = (e, t, o) => {
    const n = -1 === e.t[t];
    return e.t[t] = o, e.i = a(t, e.i), n;
}, b = (e, t) => {
    if (!e.l) return 0;
    if (e.i >= t) return e.u[t];
    e.i < 0 && (e.u[0] = 0, e.i = 0);
    let o = e.i, n = e.u[o];
    for (;o < t; ) n += z(e, o), e.u[++o] = n;
    return e.i = t, n;
}, x = (e, t, o = 0, n = e.l - 1) => {
    let r = o;
    for (;o <= n; ) {
        const i = g((o + n) / 2);
        b(e, i) <= t ? (r = i, o = i + 1) : n = i - 1;
    }
    return v(r, 0, e.l - 1);
}, I = (e, t, o) => {
    const n = t - e.l;
    return e.i = o ? -1 : a(t - 1, e.i), e.l = t, n > 0 ? ($(e.u, n), $(e.t, n, o), 
    e.o * n) : (e.u.splice(n), (o ? e.t.splice(0, -n) : e.t.splice(n)).reduce(((t, o) => t - (-1 === o ? e.o : o)), 0));
}, k = "undefined" != typeof window, R = e => e.documentElement, T = e => e.ownerDocument, C = e => e.defaultView, M = /*#__PURE__*/ S((() => !!/iP(hone|od|ad)/.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 0)), O = /*#__PURE__*/ S((() => "scrollBehavior" in R(document).style)), E = e => h(e.h(), e.p()), H = (e, t = 40, o = 0, n, r = !1) => {
    let i = !!o, s = 1, l = 0, c = 0, f = 0, u = 0, g = 0, v = 0, _ = 0, w = 0, S = d, k = [ 0, i ? h(o - 1, 0) : -1 ], R = 0, T = !1;
    const C = ((e, t, o) => ({
        o: t,
        t: o ? $(o.slice(0, a(e, o.length)), h(0, e - o.length)) : $([], e),
        l: e,
        i: -1,
        u: $([], e + 1)
    }))(e, n ? n[1] : t, n && n[0]), O = new Set, E = () => f - c, H = () => E() + g + u, W = (e, t) => ((e, t, o, n) => {
        if (n = a(n, e.l - 1), b(e, n) <= t) {
            const r = x(e, o, n);
            return [ x(e, t, n, r), r ];
        }
        {
            const r = x(e, t, void 0, n);
            return [ r, x(e, o, r) ];
        }
    })(C, e, t, k[0]), B = () => b(C, C.l), J = (e, t) => {
        const o = b(C, e) - g;
        return t ? B() - o - A(e) : o;
    }, A = e => z(C, e), L = (e, t = -1) => C.t[e] === t, N = e => {
        e && (M() && 0 !== _ || S && 1 === w ? g += e : u += e);
    };
    return {
        v: () => {
            O.clear();
        },
        m: () => s,
        _: () => (e => [ e.t.slice(), e.o ])(C),
        S: (e = 200) => {
            if (!T || i) return k;
            let t, o;
            if (v) [t, o] = k; else {
                let n = h(0, H()), i = n + l;
                r || (e = h(0, e), 1 !== _ && (n -= e), 2 !== _ && (i += e)), [t, o] = k = W(h(0, n), h(0, i)), 
                S && (t = a(t, S[0]), o = h(o, S[1]));
            }
            return [ h(t, 0), a(o, C.l - 1) ];
        },
        $: e => x(C, e - c),
        I: L,
        k: J,
        R: A,
        T: () => C.l,
        C: () => f,
        M: () => 0 !== _,
        p: () => l,
        O: () => c,
        h: B,
        H: () => (v = u, u = 0, [ v, 2 === w ]),
        W: (e, t) => {
            const o = [ e, t ];
            return O.add(o), () => {
                O.delete(o);
            };
        },
        B: (e, t) => {
            let o, n, a = 0;
            switch (e) {
              case 1:
                {
                    if (t === f && 0 === w) break;
                    const e = v;
                    v = 0;
                    const o = t - f, r = p(o);
                    e && r < p(e) + 1 || 0 !== w || (_ = o < 0 ? 2 : 1), i && (i = !1), f = t, a = 4;
                    const s = E();
                    s >= -l && s <= B() && (a += 1, n = r > l);
                    break;
                }

              case 2:
                a = 8, 0 !== _ && (o = !0, a += 1), _ = 0, w = 0, S = d;
                break;

              case 3:
                {
                    const e = t.filter((([e, t]) => !L(e, t)));
                    if (!e.length) break;
                    N(e.reduce(((e, [t, o]) => {
                        let n;
                        if (2 === w) n = !0; else if (S && 1 === w) n = t < S[0]; else {
                            const e = E(), o = J(t), r = A(t);
                            n = 1 !== _ && 0 === w ? o + r < e : o < e && o + r < e + l;
                        }
                        return n && (e += o - A(t)), e;
                    }), 0));
                    for (const [t, o] of e) {
                        const e = A(t), n = y(C, t, o);
                        r && (R += n ? o : o - e);
                    }
                    r && l && R > l && (N(((e, t) => {
                        let o = 0;
                        const n = [];
                        e.t.forEach(((e, r) => {
                            -1 !== e && (n.push(e), r < t && o++);
                        })), e.i = -1;
                        const r = m(n), i = r.length, s = i / 2 | 0, l = i % 2 == 0 ? (r[s - 1] + r[s]) / 2 : r[s], c = e.o;
                        return ((e.o = l) - c) * h(t - o, 0);
                    })(C, x(C, H()))), r = !1), a = 3, n = !0;
                    break;
                }

              case 4:
                l !== t && (l || (T = n = !0), l = t, a = 3);
                break;

              case 5:
                t[1] ? (N(I(C, t[0], !0)), w = 2, a = 1) : (I(C, t[0]), a = 1);
                break;

              case 6:
                c = t;
                break;

              case 7:
                w = 1;
                break;

              case 8:
                S = W(t, t + l), a = 1;
            }
            a && (s = 1 + (2147483647 & s), o && g && (u += g, g = 0), O.forEach((([e, t]) => {
                a & e && t(n);
            })));
        }
    };
}, W = setTimeout, B = (e, t) => t ? -e : e, J = (e, t, o, n, r, i) => {
    const s = Date.now;
    let l = 0, c = !1, f = !1, u = !1, a = !1;
    const h = (() => {
        let t;
        const o = () => {
            t != d && clearTimeout(t);
        }, n = () => {
            o(), t = W((() => {
                t = d, (() => {
                    if (c || f) return c = !1, void h();
                    u = !1, e.B(2);
                })();
            }), 150);
        };
        return n.J = o, n;
    })(), p = () => {
        l = s(), u && (a = !0), i && e.B(6, i()), e.B(1, n()), h();
    }, g = t => {
        if (c || !e.M() || t.ctrlKey) return;
        const n = s() - l;
        150 > n && 50 < n && (o ? t.deltaX : t.deltaY) && (c = !0);
    }, v = () => {
        f = !0, u = a = !1;
    }, m = () => {
        f = !1, M() && (u = !0);
    };
    return t.addEventListener("scroll", p), t.addEventListener("wheel", g, {
        passive: !0
    }), t.addEventListener("touchstart", v, {
        passive: !0
    }), t.addEventListener("touchend", m, {
        passive: !0
    }), {
        A: () => {
            t.removeEventListener("scroll", p), t.removeEventListener("wheel", g), t.removeEventListener("touchstart", v), 
            t.removeEventListener("touchend", m), h.J();
        },
        L: () => {
            const [t, o] = e.H();
            t && (r(t, o, a), a = !1, o && e.p() > e.h() && e.B(1, n()));
        }
    };
}, A = (e, t, o) => {
    let n;
    return [ async (r, i) => {
        if (!await t()) return;
        n && n();
        const s = () => {
            const [t, o] = w();
            return n = () => {
                o(!1);
            }, e.p() && W(n, 150), [ t, e.W(2, (() => {
                o(!0);
            })) ];
        };
        if (i && O()) e.B(8, r()), _((async () => {
            for (;;) {
                let t = !0;
                for (let [o, n] = e.S(); o <= n; o++) if (e.I(o)) {
                    t = !1;
                    break;
                }
                if (t) break;
                const [o, n] = s();
                try {
                    if (!await o) return;
                } finally {
                    n();
                }
            }
            e.B(7), o(r(), i);
        })); else for (;;) {
            const [t, n] = s();
            try {
                if (e.B(7), o(r()), !await t) return;
            } finally {
                n();
            }
        }
    }, () => {
        n && n();
    } ];
}, L = (e, t) => {
    let o, n, r = w(), i = !1;
    const s = t ? "scrollLeft" : "scrollTop", l = t ? "overflowX" : "overflowY", [c, f] = A(e, (() => r[0]), ((e, n) => {
        e = B(e, i), n ? o.scrollTo({
            [t ? "left" : "top"]: e,
            behavior: "smooth"
        }) : o[s] = e;
    }));
    return {
        N(c, u) {
            o = u, t && (i = "rtl" === getComputedStyle(u).direction), n = J(e, u, t, (() => B(u[s], i)), ((t, o, n) => {
                if (n) {
                    const e = u.style, t = e[l];
                    e[l] = "hidden", W((() => {
                        e[l] = t;
                    }));
                }
                u[s] = B(e.C() + t, i), o && f();
            })), r[1](!0);
        },
        v() {
            n && n.A(), r[1](!1), r = w();
        },
        P: () => i,
        V(e) {
            c((() => e));
        },
        X(t) {
            t += e.C(), c((() => t));
        },
        Y(t, {align: o, smooth: n, offset: r = 0} = {}) {
            if (t = v(t, 0, e.T() - 1), "nearest" === o) {
                const n = e.k(t), r = e.C();
                if (n < r) o = "start"; else {
                    if (!(n + e.R(t) > r + e.p())) return;
                    o = "end";
                }
            }
            c((() => r + e.O() + e.k(t) + ("end" === o ? e.R(t) - e.p() : "center" === o ? (e.R(t) - e.p()) / 2 : 0)), n);
        },
        q: () => {
            n && n.L();
        }
    };
}, N = (e, t) => {
    let o, n, r = w(), i = !1;
    const s = t ? "left" : "top", [l] = A(e, (() => r[0]), ((e, t) => {
        e = B(e, i);
        const n = C(T(o));
        t ? n.scroll({
            [s]: e,
            behavior: "smooth"
        }) : n.scroll({
            [s]: e
        });
    })), c = (e, t, o, n, r = 0) => {
        const s = n ? "offsetLeft" : "offsetTop", l = r + (n && i ? o.innerWidth - e[s] - e.offsetWidth : e[s]), f = e.offsetParent;
        return e !== t && f ? c(f, t, o, n, l) : l;
    };
    return {
        N(l) {
            o = l;
            const f = t ? "scrollX" : "scrollY", u = T(l), d = C(u);
            t && (i = "rtl" === getComputedStyle(R(u)).direction), n = J(e, d, t, (() => B(d[f], i)), ((t, o) => {
                o ? d.scroll({
                    [s]: B(e.C() + t, i)
                }) : d.scrollBy({
                    [s]: B(t, i)
                });
            }), (() => c(l, u.body, d, t))), r[1](!0);
        },
        v() {
            n && n.A(), o = void 0, r[1](!1), r = w();
        },
        P: () => i,
        q: () => {
            n && n.L();
        },
        Y(n, {align: r, smooth: i, offset: s = 0} = {}) {
            if (!o) return;
            if (n = v(n, 0, e.T() - 1), "nearest" === r) {
                const t = e.k(n), o = e.C();
                if (t < o) r = "start"; else {
                    if (!(t + e.R(n) > o + e.p())) return;
                    r = "end";
                }
            }
            const f = T(o), u = C(f), d = R(f), a = () => e.p() - (t ? d.clientWidth : d.clientHeight);
            l((() => s + c(o, f.body, u, t) + e.k(n) + ("end" === r ? e.R(n) - (e.p() - a()) : "center" === r ? (e.R(n) - (e.p() - a())) / 2 : 0)), i);
        }
    };
}, P = (e, t) => {
    const o = L(e, !1), n = L(t, !0);
    return {
        N(e, t) {
            o.N(e, t), n.N(e, t);
        },
        v() {
            o.v(), n.v();
        },
        P: n.P,
        V(e, t) {
            null != e && o.V(e), null != t && n.V(t);
        },
        X(e, t) {
            null != e && o.X(e), null != t && n.X(t);
        },
        Y(e, t) {
            null != e && o.Y(e), null != t && n.Y(t);
        },
        q() {
            o.q(), n.q();
        }
    };
}, V = e => {
    let t;
    return {
        D(o) {
            (t || (t = new (C(T(o)).ResizeObserver)(e))).observe(o);
        },
        j(e) {
            t.unobserve(e);
        },
        A() {
            t && t.disconnect();
        }
    };
}, X = (e, t) => {
    let o;
    const n = t ? "width" : "height", r = new WeakMap, i = V((t => {
        const i = [];
        for (const {target: s, contentRect: l} of t) if (s.offsetParent) if (s === o) e.B(4, l[n]); else {
            const e = r.get(s);
            e != d && i.push([ e, l[n] ]);
        }
        i.length && e.B(3, i);
    }));
    return {
        G(e) {
            i.D(o = e);
        },
        U: (e, t) => (r.set(e, t), i.D(e), () => {
            r.delete(e), i.j(e);
        }),
        v: i.A
    };
}, Y = (e, t) => {
    const o = t ? "width" : "height", n = t ? "innerWidth" : "innerHeight", r = new WeakMap, i = V((t => {
        const n = [];
        for (const {target: e, contentRect: i} of t) {
            if (!e.offsetParent) continue;
            const t = r.get(e);
            t != d && n.push([ t, i[o] ]);
        }
        n.length && e.B(3, n);
    }));
    let s;
    return {
        G(t) {
            const o = C(T(t)), r = () => {
                e.B(4, o[n]);
            };
            o.addEventListener("resize", r), _(r), s = () => {
                o.removeEventListener("resize", r);
            };
        },
        U: (e, t) => (r.set(e, t), i.D(e), () => {
            r.delete(e), i.j(e);
        }),
        v() {
            s && s(), i.A();
        }
    };
}, q = (e, t) => {
    let o;
    const n = new WeakMap, r = new Set, i = new Set, s = new Map, l = (e, t) => `${e}-${t}`, c = V((c => {
        const f = new Set, u = new Set;
        for (const {target: r, contentRect: {width: i, height: d}} of c) if (r.offsetParent) if (r === o) e.B(4, d), 
        t.B(4, i); else {
            const e = n.get(r);
            if (e) {
                const [t, o] = e, n = l(t, o), r = s.get(n);
                let c, a;
                r ? (r[0] !== d && (c = !0), r[1] !== i && (a = !0)) : c = a = !0, c && f.add(t), 
                a && u.add(o), (c || a) && s.set(n, [ d, i ]);
            }
        }
        if (f.size) {
            const t = [];
            f.forEach((e => {
                let o = 0;
                i.forEach((t => {
                    const n = s.get(l(e, t));
                    n && (o = h(o, n[0]));
                })), o && t.push([ e, o ]);
            })), e.B(3, t);
        }
        if (u.size) {
            const e = [];
            u.forEach((t => {
                let o = 0;
                r.forEach((e => {
                    const n = s.get(l(e, t));
                    n && (o = h(o, n[1]));
                })), o && e.push([ t, o ]);
            })), t.B(3, e);
        }
    }));
    return {
        G(e) {
            c.D(o = e);
        },
        U: (e, t, o) => (n.set(e, [ t, o ]), r.add(t), i.add(o), c.D(e), () => {
            n.delete(e), c.j(e);
        }),
        F(o) {
            for (const [t] of o) for (let o = 0; o < e.T(); o++) s.delete(l(o, t));
            t.B(3, o);
        },
        K(o) {
            for (const [e] of o) for (let o = 0; o < t.T(); o++) s.delete(l(e, o));
            e.B(3, o);
        },
        v: c.A
    };
}, D = k ? t : o, j = "current", G = (e, t) => {
    if (Array.isArray(e)) for (const o of e) G(o, t); else null == e || "boolean" == typeof e || t.push(e);
}, U = (e, t) => {
    const o = e.key;
    return null != o ? o : "_" + t;
}, F = e => {
    const t = n(null);
    return t[j] || (t[j] = e());
}, K = e => {
    const t = n(e);
    return D((() => {
        t[j] = e;
    }), [ e ]), t;
}, Q = /*#__PURE__*/ r((({Z: t, ee: o, te: r, oe: s, ne: l, re: c, ie: f, se: u}) => {
    const d = n(null);
    D((() => o(d[j], r)), [ r ]);
    const a = i((() => {
        const e = {
            contain: "layout style",
            position: l && u ? void 0 : "absolute",
            [f ? "height" : "width"]: "100%",
            [f ? "top" : "left"]: 0,
            [f ? "left" : "top"]: s,
            visibility: !l || u ? void 0 : "hidden"
        };
        return f && (e.display = "inline-flex"), e;
    }), [ s, l, u, f ]);
    return e(c, "string" == typeof c ? {
        ref: d,
        style: a,
        children: t
    } : {
        ref: d,
        style: a,
        index: r,
        children: t
    });
})), Z = (e, t) => i((() => {
    if ("function" == typeof e) return [ o => e(t[o], o), t.length ];
    const o = (e => {
        const t = [];
        return G(e, t), t;
    })(e);
    return [ e => o[e], o.length ];
}), [ e, t ]), ee = /*#__PURE__*/ s((({children: t, data: o, bufferSize: r, itemSize: i, shift: s, horizontal: f, keepMounted: d, cache: a, startMargin: h = 0, ssrCount: p, as: g = "div", item: v = "div", scrollRef: w, onScroll: S, onScrollEnd: $}, z) => {
    const [y, b] = Z(t, o), x = n(null), I = n(!!p), k = K(S), R = K($), [T, C, M, O] = F((() => {
        const e = !!f, t = H(b, i, p, a, !i);
        return [ t, X(t, e), L(t, e), e ];
    }));
    b !== T.T() && T.B(5, [ b, s ]), h !== T.O() && T.B(6, h);
    const [W, B] = l(T.m, void 0, T.m), J = T.M(), A = T.h(), N = M.P(), P = [], V = t => {
        const o = y(t);
        return e(Q, {
            ee: C.U,
            te: t,
            oe: T.k(t, N),
            ne: T.I(t),
            re: v,
            Z: o,
            ie: O,
            se: I[j]
        }, U(o, t));
    };
    if (D((() => {
        I[j] = !1, T.W(1, (e => {
            e ? u(B) : B();
        })), T.W(4, (() => {
            k[j] && k[j](T.C());
        })), T.W(8, (() => {
            R[j] && R[j]();
        }));
        const e = x[j], t = t => {
            C.G(t), M.N(e, t);
        };
        return w ? _((() => {
            w[j] && t(w[j]);
        })) : t(e.parentElement), () => {
            T.v(), C.v(), M.v();
        };
    }), []), D((() => {
        M.q();
    }), [ W ]), c(z, (() => ({
        get cache() {
            return T._();
        },
        get scrollOffset() {
            return T.C();
        },
        get scrollSize() {
            return E(T);
        },
        get viewportSize() {
            return T.p();
        },
        findItemIndex: T.$,
        getItemOffset: T.k,
        getItemSize: T.R,
        scrollToIndex: M.Y,
        scrollTo: M.V,
        scrollBy: M.X
    })), []), d) {
        const e = new Set(d);
        for (let [t, o] = T.S(r); t <= o; t++) e.add(t);
        m([ ...e ]).forEach((e => {
            P.push(V(e));
        }));
    } else for (let [e, t] = T.S(r); e <= t; e++) P.push(V(e));
    return e(g, {
        ref: x,
        style: {
            contain: "size style",
            overflowAnchor: "none",
            flex: "none",
            position: "relative",
            width: O ? A : "100%",
            height: O ? "100%" : A,
            pointerEvents: J ? "none" : void 0
        },
        children: P
    });
})), te = /*#__PURE__*/ s((({children: t, data: o, bufferSize: n, itemSize: r, shift: i, horizontal: s, keepMounted: l, cache: c, ssrCount: f, item: u, onScroll: d, onScrollEnd: a, style: h, ...p}, g) => e("div", {
    ...p,
    style: {
        display: s ? "inline-block" : "block",
        [s ? "overflowX" : "overflowY"]: "auto",
        contain: "strict",
        width: "100%",
        height: "100%",
        ...h
    },
    children: e(ee, {
        ref: g,
        data: o,
        bufferSize: n,
        itemSize: r,
        shift: i,
        horizontal: s,
        keepMounted: l,
        cache: c,
        ssrCount: f,
        item: u,
        onScroll: d,
        onScrollEnd: a,
        children: t
    })
}))), oe = /*#__PURE__*/ s((({children: t, data: o, bufferSize: r, itemSize: i, shift: s, horizontal: f, cache: d, ssrCount: a, as: h = "div", item: p = "div", onScroll: g, onScrollEnd: v}, m) => {
    const [_, w] = Z(t, o), S = n(null), $ = K(g), z = K(v), y = n(!!a), [b, x, I, k] = F((() => {
        const e = !!f, t = H(w, i, a, d, !i);
        return [ t, Y(t, e), N(t, e), e ];
    }));
    w !== b.T() && b.B(5, [ w, s ]);
    const [R, T] = l(b.m, void 0, b.m), C = b.M(), M = b.h(), O = I.P(), E = [];
    D((() => {
        y[j] = !1, b.W(1, (e => {
            e ? u(T) : T();
        })), b.W(4, (() => {
            $[j] && $[j]();
        })), b.W(8, (() => {
            z[j] && z[j]();
        }));
        const e = S[j];
        return x.G(e), I.N(e), () => {
            b.v(), x.v(), I.v();
        };
    }), []), D((() => {
        I.q();
    }), [ R ]), c(m, (() => ({
        get cache() {
            return b._();
        },
        get scrollOffset() {
            return b.C();
        },
        get viewportSize() {
            return b.p();
        },
        findItemIndex: b.$,
        getItemOffset: b.k,
        getItemSize: b.R,
        scrollToIndex: I.Y
    })), []);
    for (let [t, o] = b.S(r); t <= o; t++) {
        const o = _(t);
        E.push(e(Q, {
            ee: x.U,
            te: t,
            oe: b.k(t, O),
            ne: b.I(t),
            re: p,
            Z: o,
            ie: k,
            se: y[j]
        }, U(o, t)));
    }
    return e(h, {
        ref: S,
        style: {
            contain: "size style",
            overflowAnchor: "none",
            flex: "none",
            position: "relative",
            width: k ? M : "100%",
            height: k ? "100%" : M,
            pointerEvents: C ? "none" : void 0
        },
        children: E
    });
})), ne = (e, t) => `${e}-${t}`, re = /*#__PURE__*/ r((({Z: t, ee: o, le: r, ce: s, fe: l, ue: c, de: f, ae: u, ne: d, he: a}) => {
    const h = n(null);
    return D((() => o.U(h[j], r, s)), [ s, r ]), e(a, {
        ref: h,
        style: i((() => ({
            contain: "layout style",
            display: "grid",
            position: "absolute",
            top: l,
            left: c,
            visibility: d ? "hidden" : void 0,
            minHeight: f,
            minWidth: u
        })), [ l, c, u, f, d ]),
        children: t
    });
})), ie = /*#__PURE__*/ s((({children: t, row: o, col: r, cellHeight: s = 40, cellWidth: d = 100, bufferSize: a, ssrRowCount: h, ssrColCount: p, item: g = "div", domRef: v, innerDomRef: m, onScroll: _, onScrollEnd: w, style: S, ...$}, z) => {
    const [y, b, x, I] = F((() => {
        const e = H(o, s, h), t = H(r, d, p);
        return [ e, t, q(e, t), P(e, t) ];
    }));
    o !== y.T() && y.B(5, [ o ]), r !== b.T() && b.B(5, [ r ]);
    const [k, R] = l(y.m, void 0, y.m), [T, C] = l(b.m, void 0, b.m), M = y.M(), O = b.M(), W = E(y), B = E(b), J = n(null), A = K(_), L = K(w);
    D((() => {
        y.W(1, (e => {
            e ? u(R) : R();
        })), b.W(1, (e => {
            e ? u(C) : C();
        })), y.W(4, (() => {
            A[j] && A[j](y.C());
        })), y.W(8, (() => {
            L[j] && L[j]();
        }));
        const e = J[j], t = e.parentElement;
        return x.G(t), I.N(e, t), () => {
            y.v(), b.v(), x.v(), I.v();
        };
    }), []), D((() => {
        I.q();
    }), [ k, T ]), c(z, (() => ({
        get scrollTop() {
            return y.C();
        },
        get scrollLeft() {
            return b.C();
        },
        get scrollHeight() {
            return E(y);
        },
        get scrollWidth() {
            return E(b);
        },
        get viewportHeight() {
            return y.p();
        },
        get viewportWidth() {
            return b.p();
        },
        findRowIndex: y.$,
        findColIndex: b.$,
        getRowOffset: y.k,
        getColOffset: b.k,
        getRowSize: y.R,
        getColSize: b.R,
        resizeCols(e) {
            x.F(e);
        },
        resizeRows(e) {
            x.K(e);
        },
        scrollToIndex: I.Y,
        scrollTo: I.V,
        scrollBy: I.X
    })), []);
    const N = i((() => {
        const e = new Map;
        return (o, n) => {
            let r = e.get(ne(o, n));
            return r || e.set(ne(o, n), r = t({
                rowIndex: o,
                colIndex: n
            })), r;
        };
    }), [ t ]), V = I.P(), [X, Y] = y.S(a), [G, U] = b.S(a), Q = [];
    for (let t = X; t <= Y; t++) for (let o = G; o <= U; o++) Q.push(e(re, {
        ee: x,
        le: t,
        ce: o,
        fe: y.k(t),
        ue: b.k(o, V),
        de: y.R(t),
        ae: b.R(o),
        ne: y.I(t) || b.I(o),
        he: g,
        Z: N(t, o)
    }, ne(t, o)));
    return e("div", {
        ref: v,
        ...$,
        style: {
            overflow: "auto",
            contain: "strict",
            width: "100%",
            height: "100%",
            ...S
        },
        children: e("div", {
            ref: (Z = [ J, m ], f((e => {
                for (const t of Z) t && ("function" == typeof t ? t(e) : t && (t.current = e));
            }), Z)),
            style: {
                contain: "size style",
                overflowAnchor: "none",
                flex: "none",
                position: "relative",
                width: B,
                height: W,
                pointerEvents: M || O ? "none" : void 0
            },
            children: Q
        })
    });
    var Z;
}));

export { te as VList, ee as Virtualizer, oe as WindowVirtualizer, ie as experimental_VGrid };
//# sourceMappingURL=index.js.map
