const e = null, {min: t, max: o, abs: r, floor: s} = Math, n = (e, r, s) => t(s, o(r, e)), i = e => [ ...e ].sort(((e, t) => e - t)), c = "function" == typeof queueMicrotask ? queueMicrotask : e => {
    Promise.resolve().then(e);
}, l = () => {
    let e;
    return [ new Promise((t => {
        e = t;
    })), e ];
}, f = e => {
    let t;
    return () => (e && (t = e(), e = void 0), t);
}, a = (e, t, o) => {
    const r = o ? "unshift" : "push";
    for (let o = 0; o < t; o++) e[r](-1);
    return e;
}, u = (e, t) => {
    const o = e.t[t];
    return -1 === o ? e.o : o;
}, $ = (e, o, r) => {
    const s = -1 === e.t[o];
    return e.t[o] = r, e.i = t(o, e.i), s;
}, d = (e, t) => {
    if (!e.l) return 0;
    if (e.i >= t) return e.u[t];
    e.i < 0 && (e.u[0] = 0, e.i = 0);
    let o = e.i, r = e.u[o];
    for (;o < t; ) r += u(e, o), e.u[++o] = r;
    return e.i = t, r;
}, p = (e, t, o = 0, r = e.l - 1) => {
    let i = o;
    for (;o <= r; ) {
        const n = s((o + r) / 2);
        d(e, n) <= t ? (i = n, o = n + 1) : r = n - 1;
    }
    return n(i, 0, e.l - 1);
}, h = (e, o, r) => {
    const s = o - e.l;
    return e.i = r ? -1 : t(o - 1, e.i), e.l = o, s > 0 ? (a(e.u, s), a(e.t, s, r), 
    e.o * s) : (e.u.splice(s), (r ? e.t.splice(0, -s) : e.t.splice(s)).reduce(((t, o) => t - (-1 === o ? e.o : o)), 0));
}, g = "undefined" != typeof window, m = e => e.documentElement, v = e => e.ownerDocument, b = e => e.defaultView, w = /*#__PURE__*/ f((() => !!/iP(hone|od|ad)/.test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 0)), S = /*#__PURE__*/ f((() => "scrollBehavior" in m(document).style)), k = 5, I = 6, y = 1, x = 4, _ = 8, z = e => o(e.$getTotalSize(), e.$getViewportSize()), T = (s, n = 40, c = 0, l, f = !1) => {
    let g = !!c, m = 1, v = 0, b = 0, S = 0, k = 0, I = 0, y = 0, x = 0, _ = 0, z = e, T = [ 0, g ? o(c - 1, 0) : -1 ], M = 0, R = !1;
    const J = ((e, r, s) => ({
        o: r,
        t: s ? a(s.slice(0, t(e, s.length)), o(0, e - s.length)) : a([], e),
        l: e,
        i: -1,
        u: a([], e + 1)
    }))(s, l ? l[1] : n, l && l[0]), C = new Set, W = () => S - b, B = () => W() + I + k, L = (e, o) => ((e, o, r, s) => {
        if (s = t(s, e.l - 1), d(e, s) <= o) {
            const t = p(e, r, s);
            return [ p(e, o, s, t), t ];
        }
        {
            const t = p(e, o, void 0, s);
            return [ t, p(e, r, t) ];
        }
    })(J, e, o, T[0]), N = () => d(J, J.l), O = (e, t) => {
        const o = d(J, e) - I;
        return t ? N() - o - P(e) : o;
    }, P = e => u(J, e), q = (e, t = -1) => J.t[e] === t, V = e => {
        e && (w() && 0 !== x || z && 1 === _ ? I += e : k += e);
    };
    return {
        $dispose: () => {
            C.clear();
        },
        $getStateVersion: () => m,
        $getCacheSnapshot: () => (e => [ e.t.slice(), e.o ])(J),
        $getRange: (e = 200) => {
            if (!R || g) return T;
            let r, s;
            if (y) [r, s] = T; else {
                let n = o(0, B()), i = n + v;
                f || (e = o(0, e), 1 !== x && (n -= e), 2 !== x && (i += e)), [r, s] = T = L(o(0, n), o(0, i)), 
                z && (r = t(r, z[0]), s = o(s, z[1]));
            }
            return [ o(r, 0), t(s, J.l - 1) ];
        },
        $findItemIndex: e => p(J, e - b),
        $isUnmeasuredItem: q,
        $getItemOffset: O,
        $getItemSize: P,
        $getItemsLength: () => J.l,
        $getScrollOffset: () => S,
        $isScrolling: () => 0 !== x,
        $getViewportSize: () => v,
        $getStartSpacerSize: () => b,
        $getTotalSize: N,
        $: () => (y = k, k = 0, [ y, 2 === _ ]),
        $subscribe: (e, t) => {
            const o = [ e, t ];
            return C.add(o), () => {
                C.delete(o);
            };
        },
        $update: (t, s) => {
            let n, c, l = 0;
            switch (t) {
              case 1:
                {
                    if (s === S && 0 === _) break;
                    const e = y;
                    y = 0;
                    const t = s - S, o = r(t);
                    e && o < r(e) + 1 || 0 !== _ || (x = t < 0 ? 2 : 1), g && (g = !1), S = s, l = 4;
                    const n = W();
                    n >= -v && n <= N() && (l += 1, c = o > v);
                    break;
                }

              case 2:
                l = 8, 0 !== x && (n = !0, l += 1), x = 0, _ = 0, z = e;
                break;

              case 3:
                {
                    const e = s.filter((([e, t]) => !q(e, t)));
                    if (!e.length) break;
                    V(e.reduce(((e, [t, o]) => {
                        let r;
                        if (2 === _) r = !0; else if (z && 1 === _) r = t < z[0]; else {
                            const e = W(), o = O(t), s = P(t);
                            r = 1 !== x && 0 === _ ? o + s < e : o < e && o + s < e + v;
                        }
                        return r && (e += o - P(t)), e;
                    }), 0));
                    for (const [t, o] of e) {
                        const e = P(t), r = $(J, t, o);
                        f && (M += r ? o : o - e);
                    }
                    f && v && M > v && (V(((e, t) => {
                        let r = 0;
                        const s = [];
                        e.t.forEach(((e, o) => {
                            -1 !== e && (s.push(e), o < t && r++);
                        })), e.i = -1;
                        const n = i(s), c = n.length, l = c / 2 | 0, f = c % 2 == 0 ? (n[l - 1] + n[l]) / 2 : n[l], a = e.o;
                        return ((e.o = f) - a) * o(t - r, 0);
                    })(J, p(J, B()))), f = !1), l = 3, c = !0;
                    break;
                }

              case 4:
                v !== s && (v || (R = c = !0), v = s, l = 3);
                break;

              case 5:
                s[1] ? (V(h(J, s[0], !0)), _ = 2, l = 1) : (h(J, s[0]), l = 1);
                break;

              case 6:
                b = s;
                break;

              case 7:
                _ = 1;
                break;

              case 8:
                z = L(s, s + v), l = 1;
            }
            l && (m = 1 + (2147483647 & m), n && I && (k += I, I = 0), C.forEach((([e, t]) => {
                l & e && t(c);
            })));
        }
    };
}, M = setTimeout, R = (e, t) => t ? -e : e, J = (t, o, r, s, n, i) => {
    const c = Date.now;
    let l = 0, f = !1, a = !1, u = !1, $ = !1;
    const d = (() => {
        let o;
        const r = () => {
            o != e && clearTimeout(o);
        }, s = () => {
            r(), o = M((() => {
                o = e, (() => {
                    if (f || a) return f = !1, void d();
                    u = !1, t.$update(2);
                })();
            }), 150);
        };
        return s.p = r, s;
    })(), p = () => {
        l = c(), u && ($ = !0), i && t.$update(6, i()), t.$update(1, s()), d();
    }, h = e => {
        if (f || !t.$isScrolling() || e.ctrlKey) return;
        const o = c() - l;
        150 > o && 50 < o && (r ? e.deltaX : e.deltaY) && (f = !0);
    }, g = () => {
        a = !0, u = $ = !1;
    }, m = () => {
        a = !1, w() && (u = !0);
    };
    return o.addEventListener("scroll", p), o.addEventListener("wheel", h, {
        passive: !0
    }), o.addEventListener("touchstart", g, {
        passive: !0
    }), o.addEventListener("touchend", m, {
        passive: !0
    }), {
        h: () => {
            o.removeEventListener("scroll", p), o.removeEventListener("wheel", h), o.removeEventListener("touchstart", g), 
            o.removeEventListener("touchend", m), d.p();
        },
        m: () => {
            const [e, o] = t.$();
            e && (n(e, o, $), $ = !1, o && t.$getViewportSize() > t.$getTotalSize() && t.$update(1, s()));
        }
    };
}, C = (e, t, o) => {
    let r;
    return [ async (s, n) => {
        if (!await t()) return;
        r && r();
        const i = () => {
            const [t, o] = l();
            return r = () => {
                o(!1);
            }, e.$getViewportSize() && M(r, 150), [ t, e.$subscribe(2, (() => {
                o(!0);
            })) ];
        };
        if (n && S()) e.$update(8, s()), c((async () => {
            for (;;) {
                let t = !0;
                for (let [o, r] = e.$getRange(); o <= r; o++) if (e.$isUnmeasuredItem(o)) {
                    t = !1;
                    break;
                }
                if (t) break;
                const [o, r] = i();
                try {
                    if (!await o) return;
                } finally {
                    r();
                }
            }
            e.$update(7), o(s(), n);
        })); else for (;;) {
            const [t, r] = i();
            try {
                if (e.$update(7), o(s()), !await t) return;
            } finally {
                r();
            }
        }
    }, () => {
        r && r();
    } ];
}, W = (e, t) => {
    let o, r, s = l(), i = !1;
    const c = t ? "scrollLeft" : "scrollTop", f = t ? "overflowX" : "overflowY", [a, u] = C(e, (() => s[0]), ((e, r) => {
        e = R(e, i), r ? o.scrollTo({
            [t ? "left" : "top"]: e,
            behavior: "smooth"
        }) : o[c] = e;
    }));
    return {
        $observe(n, l) {
            o = l, t && (i = "rtl" === getComputedStyle(l).direction), r = J(e, l, t, (() => R(l[c], i)), ((t, o, r) => {
                if (r) {
                    const e = l.style, t = e[f];
                    e[f] = "hidden", M((() => {
                        e[f] = t;
                    }));
                }
                l[c] = R(e.$getScrollOffset() + t, i), o && u();
            })), s[1](!0);
        },
        $dispose() {
            r && r.h(), s[1](!1), s = l();
        },
        $isNegative: () => i,
        $scrollTo(e) {
            a((() => e));
        },
        $scrollBy(t) {
            t += e.$getScrollOffset(), a((() => t));
        },
        $scrollToIndex(t, {align: o, smooth: r, offset: s = 0} = {}) {
            if (t = n(t, 0, e.$getItemsLength() - 1), "nearest" === o) {
                const r = e.$getItemOffset(t), s = e.$getScrollOffset();
                if (r < s) o = "start"; else {
                    if (!(r + e.$getItemSize(t) > s + e.$getViewportSize())) return;
                    o = "end";
                }
            }
            a((() => s + e.$getStartSpacerSize() + e.$getItemOffset(t) + ("end" === o ? e.$getItemSize(t) - e.$getViewportSize() : "center" === o ? (e.$getItemSize(t) - e.$getViewportSize()) / 2 : 0)), r);
        },
        $fixScrollJump: () => {
            r && r.m();
        }
    };
}, B = (e, t) => {
    let o, r, s = l(), i = !1;
    const c = t ? "left" : "top", [f] = C(e, (() => s[0]), ((e, t) => {
        e = R(e, i);
        const r = b(v(o));
        t ? r.scroll({
            [c]: e,
            behavior: "smooth"
        }) : r.scroll({
            [c]: e
        });
    })), a = (e, t, o, r, s = 0) => {
        const n = r ? "offsetLeft" : "offsetTop", c = s + (r && i ? o.innerWidth - e[n] - e.offsetWidth : e[n]), l = e.offsetParent;
        return e !== t && l ? a(l, t, o, r, c) : c;
    };
    return {
        $observe(n) {
            o = n;
            const l = t ? "scrollX" : "scrollY", f = v(n), u = b(f);
            t && (i = "rtl" === getComputedStyle(m(f)).direction), r = J(e, u, t, (() => R(u[l], i)), ((t, o) => {
                o ? u.scroll({
                    [c]: R(e.$getScrollOffset() + t, i)
                }) : u.scrollBy({
                    [c]: R(t, i)
                });
            }), (() => a(n, f.body, u, t))), s[1](!0);
        },
        $dispose() {
            r && r.h(), o = void 0, s[1](!1), s = l();
        },
        $isNegative: () => i,
        $fixScrollJump: () => {
            r && r.m();
        },
        $scrollToIndex(r, {align: s, smooth: i, offset: c = 0} = {}) {
            if (!o) return;
            if (r = n(r, 0, e.$getItemsLength() - 1), "nearest" === s) {
                const t = e.$getItemOffset(r), o = e.$getScrollOffset();
                if (t < o) s = "start"; else {
                    if (!(t + e.$getItemSize(r) > o + e.$getViewportSize())) return;
                    s = "end";
                }
            }
            const l = v(o), u = b(l), $ = m(l), d = () => e.$getViewportSize() - (t ? $.clientWidth : $.clientHeight);
            f((() => c + a(o, l.body, u, t) + e.$getItemOffset(r) + ("end" === s ? e.$getItemSize(r) - (e.$getViewportSize() - d()) : "center" === s ? (e.$getItemSize(r) - (e.$getViewportSize() - d())) / 2 : 0)), i);
        }
    };
}, L = (e, t) => {
    const o = W(e, !1), r = W(t, !0);
    return {
        $observe(e, t) {
            o.$observe(e, t), r.$observe(e, t);
        },
        $dispose() {
            o.$dispose(), r.$dispose();
        },
        $isNegative: r.$isNegative,
        $scrollTo(e, t) {
            null != e && o.$scrollTo(e), null != t && r.$scrollTo(t);
        },
        $scrollBy(e, t) {
            null != e && o.$scrollBy(e), null != t && r.$scrollBy(t);
        },
        $scrollToIndex(e, t) {
            null != e && o.$scrollToIndex(e), null != t && r.$scrollToIndex(t);
        },
        $fixScrollJump() {
            o.$fixScrollJump(), r.$fixScrollJump();
        }
    };
}, N = e => {
    let t;
    return {
        v(o) {
            (t || (t = new (b(v(o)).ResizeObserver)(e))).observe(o);
        },
        S(e) {
            t.unobserve(e);
        },
        h() {
            t && t.disconnect();
        }
    };
}, O = (t, o) => {
    let r;
    const s = o ? "width" : "height", n = new WeakMap, i = N((o => {
        const i = [];
        for (const {target: c, contentRect: l} of o) if (c.offsetParent) if (c === r) t.$update(4, l[s]); else {
            const t = n.get(c);
            t != e && i.push([ t, l[s] ]);
        }
        i.length && t.$update(3, i);
    }));
    return {
        $observeRoot(e) {
            i.v(r = e);
        },
        $observeItem: (e, t) => (n.set(e, t), i.v(e), () => {
            n.delete(e), i.S(e);
        }),
        $dispose: i.h
    };
}, P = (t, o) => {
    const r = o ? "width" : "height", s = o ? "innerWidth" : "innerHeight", n = new WeakMap, i = N((o => {
        const s = [];
        for (const {target: t, contentRect: i} of o) {
            if (!t.offsetParent) continue;
            const o = n.get(t);
            o != e && s.push([ o, i[r] ]);
        }
        s.length && t.$update(3, s);
    }));
    let l;
    return {
        $observeRoot(e) {
            const o = b(v(e)), r = () => {
                t.$update(4, o[s]);
            };
            o.addEventListener("resize", r), c(r), l = () => {
                o.removeEventListener("resize", r);
            };
        },
        $observeItem: (e, t) => (n.set(e, t), i.v(e), () => {
            n.delete(e), i.S(e);
        }),
        $dispose() {
            l && l(), i.h();
        }
    };
}, q = (e, t) => {
    let r;
    const s = new WeakMap, n = new Set, i = new Set, c = new Map, l = (e, t) => `${e}-${t}`, f = N((f => {
        const a = new Set, u = new Set;
        for (const {target: o, contentRect: {width: n, height: i}} of f) if (o.offsetParent) if (o === r) e.$update(4, i), 
        t.$update(4, n); else {
            const e = s.get(o);
            if (e) {
                const [t, o] = e, r = l(t, o), s = c.get(r);
                let f, $;
                s ? (s[0] !== i && (f = !0), s[1] !== n && ($ = !0)) : f = $ = !0, f && a.add(t), 
                $ && u.add(o), (f || $) && c.set(r, [ i, n ]);
            }
        }
        if (a.size) {
            const t = [];
            a.forEach((e => {
                let r = 0;
                i.forEach((t => {
                    const s = c.get(l(e, t));
                    s && (r = o(r, s[0]));
                })), r && t.push([ e, r ]);
            })), e.$update(3, t);
        }
        if (u.size) {
            const e = [];
            u.forEach((t => {
                let r = 0;
                n.forEach((e => {
                    const s = c.get(l(e, t));
                    s && (r = o(r, s[1]));
                })), r && e.push([ t, r ]);
            })), t.$update(3, e);
        }
    }));
    return {
        $observeRoot(e) {
            f.v(r = e);
        },
        $observeItem: (e, t, o) => (s.set(e, [ t, o ]), n.add(t), i.add(o), f.v(e), () => {
            s.delete(e), f.S(e);
        }),
        $resizeCols(o) {
            for (const [t] of o) for (let o = 0; o < e.$getItemsLength(); o++) c.delete(l(o, t));
            t.$update(3, o);
        },
        $resizeRows(o) {
            for (const [e] of o) for (let o = 0; o < t.$getItemsLength(); o++) c.delete(l(e, o));
            e.$update(3, o);
        },
        $dispose: f.h
    };
};

export { k as ACTION_ITEMS_LENGTH_CHANGE, I as ACTION_START_OFFSET_CHANGE, _ as UPDATE_SCROLL_END_EVENT, x as UPDATE_SCROLL_EVENT, y as UPDATE_VIRTUAL_STATE, q as createGridResizer, L as createGridScroller, O as createResizer, W as createScroller, T as createVirtualStore, P as createWindowResizer, B as createWindowScroller, z as getScrollSize, g as isBrowser, c as microtask, i as sort };
//# sourceMappingURL=index.js.map
