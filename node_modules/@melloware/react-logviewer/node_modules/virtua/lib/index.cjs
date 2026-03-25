"use client";
var e = require("react/jsx-runtime"), t = require("react"), o = require("react-dom");

const n = null, {min: r, max: s, abs: i, floor: l} = Math, c = (e, t, o) => r(o, s(t, e)), f = e => [ ...e ].sort(((e, t) => e - t)), u = "function" == typeof queueMicrotask ? queueMicrotask : e => {
    Promise.resolve().then(e);
}, d = () => {
    let e;
    return [ new Promise((t => {
        e = t;
    })), e ];
}, a = e => {
    let t;
    return () => (e && (t = e(), e = void 0), t);
}, h = (e, t, o) => {
    const n = o ? "unshift" : "push";
    for (let o = 0; o < t; o++) e[n](-1);
    return e;
}, g = (e, t) => {
    const o = e.t[t];
    return -1 === o ? e.o : o;
}, p = (e, t, o) => {
    const n = -1 === e.t[t];
    return e.t[t] = o, e.i = r(t, e.i), n;
}, v = (e, t) => {
    if (!e.l) return 0;
    if (e.i >= t) return e.u[t];
    e.i < 0 && (e.u[0] = 0, e.i = 0);
    let o = e.i, n = e.u[o];
    for (;o < t; ) n += g(e, o), e.u[++o] = n;
    return e.i = t, n;
}, _ = (e, t, o = 0, n = e.l - 1) => {
    let r = o;
    for (;o <= n; ) {
        const s = l((o + n) / 2);
        v(e, s) <= t ? (r = s, o = s + 1) : n = s - 1;
    }
    return c(r, 0, e.l - 1);
}, w = (e, t, o) => {
    const n = t - e.l;
    return e.i = o ? -1 : r(t - 1, e.i), e.l = t, n > 0 ? (h(e.u, n), h(e.t, n, o), 
    e.o * n) : (e.u.splice(n), (o ? e.t.splice(0, -n) : e.t.splice(n)).reduce(((t, o) => t - (-1 === o ? e.o : o)), 0));
}, S = "undefined" != typeof window, m = e => e.documentElement, $ = e => e.ownerDocument, z = e => e.defaultView, y = /*#__PURE__*/ a((() => !!/iP(hone|od|ad)/.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 0)), b = /*#__PURE__*/ a((() => "scrollBehavior" in m(document).style)), x = e => s(e.h(), e.p()), I = (e, t = 40, o = 0, l, c = !1) => {
    let u = !!o, d = 1, a = 0, S = 0, m = 0, $ = 0, z = 0, b = 0, x = 0, I = 0, k = n, R = [ 0, u ? s(o - 1, 0) : -1 ], T = 0, C = !1;
    const M = ((e, t, o) => ({
        o: t,
        t: o ? h(o.slice(0, r(e, o.length)), s(0, e - o.length)) : h([], e),
        l: e,
        i: -1,
        u: h([], e + 1)
    }))(e, l ? l[1] : t, l && l[0]), O = new Set, E = () => m - S, H = () => E() + z + $, W = (e, t) => ((e, t, o, n) => {
        if (n = r(n, e.l - 1), v(e, n) <= t) {
            const r = _(e, o, n);
            return [ _(e, t, n, r), r ];
        }
        {
            const r = _(e, t, void 0, n);
            return [ r, _(e, o, r) ];
        }
    })(M, e, t, R[0]), q = () => v(M, M.l), B = (e, t) => {
        const o = v(M, e) - z;
        return t ? q() - o - J(e) : o;
    }, J = e => g(M, e), A = (e, t = -1) => M.t[e] === t, L = e => {
        e && (y() && 0 !== x || k && 1 === I ? z += e : $ += e);
    };
    return {
        v: () => {
            O.clear();
        },
        _: () => d,
        S: () => (e => [ e.t.slice(), e.o ])(M),
        m: (e = 200) => {
            if (!C || u) return R;
            let t, o;
            if (b) [t, o] = R; else {
                let n = s(0, H()), i = n + a;
                c || (e = s(0, e), 1 !== x && (n -= e), 2 !== x && (i += e)), [t, o] = R = W(s(0, n), s(0, i)), 
                k && (t = r(t, k[0]), o = s(o, k[1]));
            }
            return [ s(t, 0), r(o, M.l - 1) ];
        },
        $: e => _(M, e - S),
        I: A,
        k: B,
        R: J,
        T: () => M.l,
        C: () => m,
        M: () => 0 !== x,
        p: () => a,
        O: () => S,
        h: q,
        H: () => (b = $, $ = 0, [ b, 2 === I ]),
        W: (e, t) => {
            const o = [ e, t ];
            return O.add(o), () => {
                O.delete(o);
            };
        },
        q: (e, t) => {
            let o, r, l = 0;
            switch (e) {
              case 1:
                {
                    if (t === m && 0 === I) break;
                    const e = b;
                    b = 0;
                    const o = t - m, n = i(o);
                    e && n < i(e) + 1 || 0 !== I || (x = o < 0 ? 2 : 1), u && (u = !1), m = t, l = 4;
                    const s = E();
                    s >= -a && s <= q() && (l += 1, r = n > a);
                    break;
                }

              case 2:
                l = 8, 0 !== x && (o = !0, l += 1), x = 0, I = 0, k = n;
                break;

              case 3:
                {
                    const e = t.filter((([e, t]) => !A(e, t)));
                    if (!e.length) break;
                    L(e.reduce(((e, [t, o]) => {
                        let n;
                        if (2 === I) n = !0; else if (k && 1 === I) n = t < k[0]; else {
                            const e = E(), o = B(t), r = J(t);
                            n = 1 !== x && 0 === I ? o + r < e : o < e && o + r < e + a;
                        }
                        return n && (e += o - J(t)), e;
                    }), 0));
                    for (const [t, o] of e) {
                        const e = J(t), n = p(M, t, o);
                        c && (T += n ? o : o - e);
                    }
                    c && a && T > a && (L(((e, t) => {
                        let o = 0;
                        const n = [];
                        e.t.forEach(((e, r) => {
                            -1 !== e && (n.push(e), r < t && o++);
                        })), e.i = -1;
                        const r = f(n), i = r.length, l = i / 2 | 0, c = i % 2 == 0 ? (r[l - 1] + r[l]) / 2 : r[l], u = e.o;
                        return ((e.o = c) - u) * s(t - o, 0);
                    })(M, _(M, H()))), c = !1), l = 3, r = !0;
                    break;
                }

              case 4:
                a !== t && (a || (C = r = !0), a = t, l = 3);
                break;

              case 5:
                t[1] ? (L(w(M, t[0], !0)), I = 2, l = 1) : (w(M, t[0]), l = 1);
                break;

              case 6:
                S = t;
                break;

              case 7:
                I = 1;
                break;

              case 8:
                k = W(t, t + a), l = 1;
            }
            l && (d = 1 + (2147483647 & d), o && z && ($ += z, z = 0), O.forEach((([e, t]) => {
                l & e && t(r);
            })));
        }
    };
}, k = setTimeout, R = (e, t) => t ? -e : e, T = (e, t, o, r, s, i) => {
    const l = Date.now;
    let c = 0, f = !1, u = !1, d = !1, a = !1;
    const h = (() => {
        let t;
        const o = () => {
            t != n && clearTimeout(t);
        }, r = () => {
            o(), t = k((() => {
                t = n, (() => {
                    if (f || u) return f = !1, void h();
                    d = !1, e.q(2);
                })();
            }), 150);
        };
        return r.B = o, r;
    })(), g = () => {
        c = l(), d && (a = !0), i && e.q(6, i()), e.q(1, r()), h();
    }, p = t => {
        if (f || !e.M() || t.ctrlKey) return;
        const n = l() - c;
        150 > n && 50 < n && (o ? t.deltaX : t.deltaY) && (f = !0);
    }, v = () => {
        u = !0, d = a = !1;
    }, _ = () => {
        u = !1, y() && (d = !0);
    };
    return t.addEventListener("scroll", g), t.addEventListener("wheel", p, {
        passive: !0
    }), t.addEventListener("touchstart", v, {
        passive: !0
    }), t.addEventListener("touchend", _, {
        passive: !0
    }), {
        J: () => {
            t.removeEventListener("scroll", g), t.removeEventListener("wheel", p), t.removeEventListener("touchstart", v), 
            t.removeEventListener("touchend", _), h.B();
        },
        A: () => {
            const [t, o] = e.H();
            t && (s(t, o, a), a = !1, o && e.p() > e.h() && e.q(1, r()));
        }
    };
}, C = (e, t, o) => {
    let n;
    return [ async (r, s) => {
        if (!await t()) return;
        n && n();
        const i = () => {
            const [t, o] = d();
            return n = () => {
                o(!1);
            }, e.p() && k(n, 150), [ t, e.W(2, (() => {
                o(!0);
            })) ];
        };
        if (s && b()) e.q(8, r()), u((async () => {
            for (;;) {
                let t = !0;
                for (let [o, n] = e.m(); o <= n; o++) if (e.I(o)) {
                    t = !1;
                    break;
                }
                if (t) break;
                const [o, n] = i();
                try {
                    if (!await o) return;
                } finally {
                    n();
                }
            }
            e.q(7), o(r(), s);
        })); else for (;;) {
            const [t, n] = i();
            try {
                if (e.q(7), o(r()), !await t) return;
            } finally {
                n();
            }
        }
    }, () => {
        n && n();
    } ];
}, M = (e, t) => {
    let o, n, r = d(), s = !1;
    const i = t ? "scrollLeft" : "scrollTop", l = t ? "overflowX" : "overflowY", [f, u] = C(e, (() => r[0]), ((e, n) => {
        e = R(e, s), n ? o.scrollTo({
            [t ? "left" : "top"]: e,
            behavior: "smooth"
        }) : o[i] = e;
    }));
    return {
        L(c, f) {
            o = f, t && (s = "rtl" === getComputedStyle(f).direction), n = T(e, f, t, (() => R(f[i], s)), ((t, o, n) => {
                if (n) {
                    const e = f.style, t = e[l];
                    e[l] = "hidden", k((() => {
                        e[l] = t;
                    }));
                }
                f[i] = R(e.C() + t, s), o && u();
            })), r[1](!0);
        },
        v() {
            n && n.J(), r[1](!1), r = d();
        },
        N: () => s,
        P(e) {
            f((() => e));
        },
        X(t) {
            t += e.C(), f((() => t));
        },
        Y(t, {align: o, smooth: n, offset: r = 0} = {}) {
            if (t = c(t, 0, e.T() - 1), "nearest" === o) {
                const n = e.k(t), r = e.C();
                if (n < r) o = "start"; else {
                    if (!(n + e.R(t) > r + e.p())) return;
                    o = "end";
                }
            }
            f((() => r + e.O() + e.k(t) + ("end" === o ? e.R(t) - e.p() : "center" === o ? (e.R(t) - e.p()) / 2 : 0)), n);
        },
        D: () => {
            n && n.A();
        }
    };
}, O = (e, t) => {
    let o, n, r = d(), s = !1;
    const i = t ? "left" : "top", [l] = C(e, (() => r[0]), ((e, t) => {
        e = R(e, s);
        const n = z($(o));
        t ? n.scroll({
            [i]: e,
            behavior: "smooth"
        }) : n.scroll({
            [i]: e
        });
    })), f = (e, t, o, n, r = 0) => {
        const i = n ? "offsetLeft" : "offsetTop", l = r + (n && s ? o.innerWidth - e[i] - e.offsetWidth : e[i]), c = e.offsetParent;
        return e !== t && c ? f(c, t, o, n, l) : l;
    };
    return {
        L(l) {
            o = l;
            const c = t ? "scrollX" : "scrollY", u = $(l), d = z(u);
            t && (s = "rtl" === getComputedStyle(m(u)).direction), n = T(e, d, t, (() => R(d[c], s)), ((t, o) => {
                o ? d.scroll({
                    [i]: R(e.C() + t, s)
                }) : d.scrollBy({
                    [i]: R(t, s)
                });
            }), (() => f(l, u.body, d, t))), r[1](!0);
        },
        v() {
            n && n.J(), o = void 0, r[1](!1), r = d();
        },
        N: () => s,
        D: () => {
            n && n.A();
        },
        Y(n, {align: r, smooth: s, offset: i = 0} = {}) {
            if (!o) return;
            if (n = c(n, 0, e.T() - 1), "nearest" === r) {
                const t = e.k(n), o = e.C();
                if (t < o) r = "start"; else {
                    if (!(t + e.R(n) > o + e.p())) return;
                    r = "end";
                }
            }
            const u = $(o), d = z(u), a = m(u), h = () => e.p() - (t ? a.clientWidth : a.clientHeight);
            l((() => i + f(o, u.body, d, t) + e.k(n) + ("end" === r ? e.R(n) - (e.p() - h()) : "center" === r ? (e.R(n) - (e.p() - h())) / 2 : 0)), s);
        }
    };
}, E = (e, t) => {
    const o = M(e, !1), n = M(t, !0);
    return {
        L(e, t) {
            o.L(e, t), n.L(e, t);
        },
        v() {
            o.v(), n.v();
        },
        N: n.N,
        P(e, t) {
            null != e && o.P(e), null != t && n.P(t);
        },
        X(e, t) {
            null != e && o.X(e), null != t && n.X(t);
        },
        Y(e, t) {
            null != e && o.Y(e), null != t && n.Y(t);
        },
        D() {
            o.D(), n.D();
        }
    };
}, H = e => {
    let t;
    return {
        V(o) {
            (t || (t = new (z($(o)).ResizeObserver)(e))).observe(o);
        },
        j(e) {
            t.unobserve(e);
        },
        J() {
            t && t.disconnect();
        }
    };
}, W = (e, t) => {
    let o;
    const r = t ? "width" : "height", s = new WeakMap, i = H((t => {
        const i = [];
        for (const {target: l, contentRect: c} of t) if (l.offsetParent) if (l === o) e.q(4, c[r]); else {
            const e = s.get(l);
            e != n && i.push([ e, c[r] ]);
        }
        i.length && e.q(3, i);
    }));
    return {
        U(e) {
            i.V(o = e);
        },
        F: (e, t) => (s.set(e, t), i.V(e), () => {
            s.delete(e), i.j(e);
        }),
        v: i.J
    };
}, q = (e, t) => {
    const o = t ? "width" : "height", r = t ? "innerWidth" : "innerHeight", s = new WeakMap, i = H((t => {
        const r = [];
        for (const {target: e, contentRect: i} of t) {
            if (!e.offsetParent) continue;
            const t = s.get(e);
            t != n && r.push([ t, i[o] ]);
        }
        r.length && e.q(3, r);
    }));
    let l;
    return {
        U(t) {
            const o = z($(t)), n = () => {
                e.q(4, o[r]);
            };
            o.addEventListener("resize", n), u(n), l = () => {
                o.removeEventListener("resize", n);
            };
        },
        F: (e, t) => (s.set(e, t), i.V(e), () => {
            s.delete(e), i.j(e);
        }),
        v() {
            l && l(), i.J();
        }
    };
}, B = (e, t) => {
    let o;
    const n = new WeakMap, r = new Set, i = new Set, l = new Map, c = (e, t) => `${e}-${t}`, f = H((f => {
        const u = new Set, d = new Set;
        for (const {target: r, contentRect: {width: s, height: i}} of f) if (r.offsetParent) if (r === o) e.q(4, i), 
        t.q(4, s); else {
            const e = n.get(r);
            if (e) {
                const [t, o] = e, n = c(t, o), r = l.get(n);
                let f, a;
                r ? (r[0] !== i && (f = !0), r[1] !== s && (a = !0)) : f = a = !0, f && u.add(t), 
                a && d.add(o), (f || a) && l.set(n, [ i, s ]);
            }
        }
        if (u.size) {
            const t = [];
            u.forEach((e => {
                let o = 0;
                i.forEach((t => {
                    const n = l.get(c(e, t));
                    n && (o = s(o, n[0]));
                })), o && t.push([ e, o ]);
            })), e.q(3, t);
        }
        if (d.size) {
            const e = [];
            d.forEach((t => {
                let o = 0;
                r.forEach((e => {
                    const n = l.get(c(e, t));
                    n && (o = s(o, n[1]));
                })), o && e.push([ t, o ]);
            })), t.q(3, e);
        }
    }));
    return {
        U(e) {
            f.V(o = e);
        },
        F: (e, t, o) => (n.set(e, [ t, o ]), r.add(t), i.add(o), f.V(e), () => {
            n.delete(e), f.j(e);
        }),
        G(o) {
            for (const [t] of o) for (let o = 0; o < e.T(); o++) l.delete(c(o, t));
            t.q(3, o);
        },
        K(o) {
            for (const [e] of o) for (let o = 0; o < t.T(); o++) l.delete(c(e, o));
            e.q(3, o);
        },
        v: f.J
    };
}, J = S ? t.useLayoutEffect : t.useEffect, A = "current", L = (e, t) => {
    if (Array.isArray(e)) for (const o of e) L(o, t); else null == e || "boolean" == typeof e || t.push(e);
}, N = (e, t) => {
    const o = e.key;
    return null != o ? o : "_" + t;
}, P = e => {
    const o = t.useRef(null);
    return o[A] || (o[A] = e());
}, X = e => {
    const o = t.useRef(e);
    return J((() => {
        o[A] = e;
    }), [ e ]), o;
}, Y = t.memo((({Z: o, ee: n, te: r, oe: s, ne: i, re: l, se: c, ie: f}) => {
    const u = t.useRef(null);
    J((() => n(u[A], r)), [ r ]);
    const d = t.useMemo((() => {
        const e = {
            contain: "layout style",
            position: i && f ? void 0 : "absolute",
            [c ? "height" : "width"]: "100%",
            [c ? "top" : "left"]: 0,
            [c ? "left" : "top"]: s,
            visibility: !i || f ? void 0 : "hidden"
        };
        return c && (e.display = "inline-flex"), e;
    }), [ s, i, f, c ]);
    return "string" == typeof l ? e.jsx(l, {
        ref: u,
        style: d,
        children: o
    }) : e.jsx(l, {
        ref: u,
        style: d,
        index: r,
        children: o
    });
})), D = (e, o) => t.useMemo((() => {
    if ("function" == typeof e) return [ t => e(o[t], t), o.length ];
    const t = (e => {
        const t = [];
        return L(e, t), t;
    })(e);
    return [ e => t[e], t.length ];
}), [ e, o ]), V = t.forwardRef((({children: n, data: r, bufferSize: s, itemSize: i, shift: l, horizontal: c, keepMounted: d, cache: a, startMargin: h = 0, ssrCount: g, as: p = "div", item: v = "div", scrollRef: _, onScroll: w, onScrollEnd: S}, m) => {
    const [$, z] = D(n, r), y = t.useRef(null), b = t.useRef(!!g), k = X(w), R = X(S), [T, C, O, E] = P((() => {
        const e = !!c, t = I(z, i, g, a, !i);
        return [ t, W(t, e), M(t, e), e ];
    }));
    z !== T.T() && T.q(5, [ z, l ]), h !== T.O() && T.q(6, h);
    const [H, q] = t.useReducer(T._, void 0, T._), B = T.M(), L = T.h(), V = O.N(), j = [], U = t => {
        const o = $(t);
        return e.jsx(Y, {
            ee: C.F,
            te: t,
            oe: T.k(t, V),
            ne: T.I(t),
            re: v,
            Z: o,
            se: E,
            ie: b[A]
        }, N(o, t));
    };
    if (J((() => {
        b[A] = !1, T.W(1, (e => {
            e ? o.flushSync(q) : q();
        })), T.W(4, (() => {
            k[A] && k[A](T.C());
        })), T.W(8, (() => {
            R[A] && R[A]();
        }));
        const e = y[A], t = t => {
            C.U(t), O.L(e, t);
        };
        return _ ? u((() => {
            _[A] && t(_[A]);
        })) : t(e.parentElement), () => {
            T.v(), C.v(), O.v();
        };
    }), []), J((() => {
        O.D();
    }), [ H ]), t.useImperativeHandle(m, (() => ({
        get cache() {
            return T.S();
        },
        get scrollOffset() {
            return T.C();
        },
        get scrollSize() {
            return x(T);
        },
        get viewportSize() {
            return T.p();
        },
        findItemIndex: T.$,
        getItemOffset: T.k,
        getItemSize: T.R,
        scrollToIndex: O.Y,
        scrollTo: O.P,
        scrollBy: O.X
    })), []), d) {
        const e = new Set(d);
        for (let [t, o] = T.m(s); t <= o; t++) e.add(t);
        f([ ...e ]).forEach((e => {
            j.push(U(e));
        }));
    } else for (let [e, t] = T.m(s); e <= t; e++) j.push(U(e));
    return e.jsx(p, {
        ref: y,
        style: {
            contain: "size style",
            overflowAnchor: "none",
            flex: "none",
            position: "relative",
            width: E ? L : "100%",
            height: E ? "100%" : L,
            pointerEvents: B ? "none" : void 0
        },
        children: j
    });
})), j = t.forwardRef((({children: t, data: o, bufferSize: n, itemSize: r, shift: s, horizontal: i, keepMounted: l, cache: c, ssrCount: f, item: u, onScroll: d, onScrollEnd: a, style: h, ...g}, p) => e.jsx("div", {
    ...g,
    style: {
        display: i ? "inline-block" : "block",
        [i ? "overflowX" : "overflowY"]: "auto",
        contain: "strict",
        width: "100%",
        height: "100%",
        ...h
    },
    children: e.jsx(V, {
        ref: p,
        data: o,
        bufferSize: n,
        itemSize: r,
        shift: s,
        horizontal: i,
        keepMounted: l,
        cache: c,
        ssrCount: f,
        item: u,
        onScroll: d,
        onScrollEnd: a,
        children: t
    })
}))), U = t.forwardRef((({children: n, data: r, bufferSize: s, itemSize: i, shift: l, horizontal: c, cache: f, ssrCount: u, as: d = "div", item: a = "div", onScroll: h, onScrollEnd: g}, p) => {
    const [v, _] = D(n, r), w = t.useRef(null), S = X(h), m = X(g), $ = t.useRef(!!u), [z, y, b, x] = P((() => {
        const e = !!c, t = I(_, i, u, f, !i);
        return [ t, q(t, e), O(t, e), e ];
    }));
    _ !== z.T() && z.q(5, [ _, l ]);
    const [k, R] = t.useReducer(z._, void 0, z._), T = z.M(), C = z.h(), M = b.N(), E = [];
    J((() => {
        $[A] = !1, z.W(1, (e => {
            e ? o.flushSync(R) : R();
        })), z.W(4, (() => {
            S[A] && S[A]();
        })), z.W(8, (() => {
            m[A] && m[A]();
        }));
        const e = w[A];
        return y.U(e), b.L(e), () => {
            z.v(), y.v(), b.v();
        };
    }), []), J((() => {
        b.D();
    }), [ k ]), t.useImperativeHandle(p, (() => ({
        get cache() {
            return z.S();
        },
        get scrollOffset() {
            return z.C();
        },
        get viewportSize() {
            return z.p();
        },
        findItemIndex: z.$,
        getItemOffset: z.k,
        getItemSize: z.R,
        scrollToIndex: b.Y
    })), []);
    for (let [t, o] = z.m(s); t <= o; t++) {
        const o = v(t);
        E.push(e.jsx(Y, {
            ee: y.F,
            te: t,
            oe: z.k(t, M),
            ne: z.I(t),
            re: a,
            Z: o,
            se: x,
            ie: $[A]
        }, N(o, t)));
    }
    return e.jsx(d, {
        ref: w,
        style: {
            contain: "size style",
            overflowAnchor: "none",
            flex: "none",
            position: "relative",
            width: x ? C : "100%",
            height: x ? "100%" : C,
            pointerEvents: T ? "none" : void 0
        },
        children: E
    });
})), F = (e, t) => `${e}-${t}`, G = t.memo((({Z: o, ee: n, le: r, ce: s, fe: i, ue: l, de: c, ae: f, ne: u, he: d}) => {
    const a = t.useRef(null);
    return J((() => n.F(a[A], r, s)), [ s, r ]), e.jsx(d, {
        ref: a,
        style: t.useMemo((() => ({
            contain: "layout style",
            display: "grid",
            position: "absolute",
            top: i,
            left: l,
            visibility: u ? "hidden" : void 0,
            minHeight: c,
            minWidth: f
        })), [ i, l, f, c, u ]),
        children: o
    });
})), K = t.forwardRef((({children: n, row: r, col: s, cellHeight: i = 40, cellWidth: l = 100, bufferSize: c, ssrRowCount: f, ssrColCount: u, item: d = "div", domRef: a, innerDomRef: h, onScroll: g, onScrollEnd: p, style: v, ..._}, w) => {
    const [S, m, $, z] = P((() => {
        const e = I(r, i, f), t = I(s, l, u);
        return [ e, t, B(e, t), E(e, t) ];
    }));
    r !== S.T() && S.q(5, [ r ]), s !== m.T() && m.q(5, [ s ]);
    const [y, b] = t.useReducer(S._, void 0, S._), [k, R] = t.useReducer(m._, void 0, m._), T = S.M(), C = m.M(), M = x(S), O = x(m), H = t.useRef(null), W = X(g), q = X(p);
    J((() => {
        S.W(1, (e => {
            e ? o.flushSync(b) : b();
        })), m.W(1, (e => {
            e ? o.flushSync(R) : R();
        })), S.W(4, (() => {
            W[A] && W[A](S.C());
        })), S.W(8, (() => {
            q[A] && q[A]();
        }));
        const e = H[A], t = e.parentElement;
        return $.U(t), z.L(e, t), () => {
            S.v(), m.v(), $.v(), z.v();
        };
    }), []), J((() => {
        z.D();
    }), [ y, k ]), t.useImperativeHandle(w, (() => ({
        get scrollTop() {
            return S.C();
        },
        get scrollLeft() {
            return m.C();
        },
        get scrollHeight() {
            return x(S);
        },
        get scrollWidth() {
            return x(m);
        },
        get viewportHeight() {
            return S.p();
        },
        get viewportWidth() {
            return m.p();
        },
        findRowIndex: S.$,
        findColIndex: m.$,
        getRowOffset: S.k,
        getColOffset: m.k,
        getRowSize: S.R,
        getColSize: m.R,
        resizeCols(e) {
            $.G(e);
        },
        resizeRows(e) {
            $.K(e);
        },
        scrollToIndex: z.Y,
        scrollTo: z.P,
        scrollBy: z.X
    })), []);
    const L = t.useMemo((() => {
        const e = new Map;
        return (t, o) => {
            let r = e.get(F(t, o));
            return r || e.set(F(t, o), r = n({
                rowIndex: t,
                colIndex: o
            })), r;
        };
    }), [ n ]), N = z.N(), [Y, D] = S.m(c), [V, j] = m.m(c), U = [];
    for (let t = Y; t <= D; t++) for (let o = V; o <= j; o++) U.push(e.jsx(G, {
        ee: $,
        le: t,
        ce: o,
        fe: S.k(t),
        ue: m.k(o, N),
        de: S.R(t),
        ae: m.R(o),
        ne: S.I(t) || m.I(o),
        he: d,
        Z: L(t, o)
    }, F(t, o)));
    return e.jsx("div", {
        ref: a,
        ..._,
        style: {
            overflow: "auto",
            contain: "strict",
            width: "100%",
            height: "100%",
            ...v
        },
        children: e.jsx("div", {
            ref: (K = [ H, h ], t.useCallback((e => {
                for (const t of K) t && ("function" == typeof t ? t(e) : t && (t.current = e));
            }), K)),
            style: {
                contain: "size style",
                overflowAnchor: "none",
                flex: "none",
                position: "relative",
                width: O,
                height: M,
                pointerEvents: T || C ? "none" : void 0
            },
            children: U
        })
    });
    var K;
}));

exports.VList = j, exports.Virtualizer = V, exports.WindowVirtualizer = U, exports.experimental_VGrid = K;
//# sourceMappingURL=index.cjs.map
