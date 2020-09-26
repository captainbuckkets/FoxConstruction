

    (() => {
        const lax = (() => {
            const lax = {
                elements: []
            };
            let lastY = 0,
                currentBreakpoint = "default";
            const breakpointsSeparator = "_",
                transformFns = {
                    "data-lax-opacity": (a, t) => {
                        a.opacity = t
                    },
                    "data-lax-translate": (a, t) => {
                        a.transform += ` translate(${t}px, ${t}px)`
                    },
                    "data-lax-translate-x": (a, t) => {
                        a.transform += ` translateX(${t}px)`
                    },
                    "data-lax-translate-y": (a, t) => {
                        a.transform += ` translateY(${t}px)`
                    },
                    "data-lax-scale": (a, t) => {
                        a.transform += ` scale(${t})`
                    },
                    "data-lax-scale-x": (a, t) => {
                        a.transform += ` scaleX(${t})`
                    },
                    "data-lax-scale-y": (a, t) => {
                        a.transform += ` scaleY(${t})`
                    },
                    "data-lax-skew": (a, t) => {
                        a.transform += ` skew(${t}deg, ${t}deg)`
                    },
                    "data-lax-skew-x": (a, t) => {
                        a.transform += ` skewX(${t}deg)`
                    },
                    "data-lax-skew-y": (a, t) => {
                        a.transform += ` skewY(${t}deg)`
                    },
                    "data-lax-rotate": (a, t) => {
                        a.transform += ` rotate(${t}deg)`
                    },
                    "data-lax-rotate-x": (a, t) => {
                        a.transform += ` rotateX(${t}deg)`
                    },
                    "data-lax-rotate-y": (a, t) => {
                        a.transform += ` rotateY(${t}deg)`
                    },
                    "data-lax-brightness": (a, t) => {
                        a.filter += ` brightness(${t}%)`
                    },
                    "data-lax-contrast": (a, t) => {
                        a.filter += ` contrast(${t}%)`
                    },
                    "data-lax-hue-rotate": (a, t) => {
                        a.filter += ` hue-rotate(${t}deg)`
                    },
                    "data-lax-blur": (a, t) => {
                        a.filter += ` blur(${t}px)`
                    },
                    "data-lax-invert": (a, t) => {
                        a.filter += `  invert(${t}%)`
                    },
                    "data-lax-saturate": (a, t) => {
                        a.filter += `  saturate(${t}%)`
                    },
                    "data-lax-grayscale": (a, t) => {
                        a.filter += `  grayscale(${t}%)`
                    },
                    "data-lax-bg-pos": (a, t) => {
                        a.backgroundPosition = `${t}px ${t}px`
                    },
                    "data-lax-bg-pos-x": (a, t) => {
                        a.backgroundPositionX = `${t}px`
                    },
                    "data-lax-bg-pos-y": (a, t) => {
                        a.backgroundPositionY = `${t}px`
                    }
                };
            let crazy = "";
            for (let a = 0; a < 20; a++) crazy += " " + 5 * a + " " + 47 * a % 360 + ", ";

            function intrp(a, t) {
                let e = 0;
                for (; a[e][0] <= t && void 0 !== a[e + 1];) e += 1;
                const l = a[e][0],
                    r = void 0 === a[e - 1] ? l : a[e - 1][0],
                    s = a[e][1],
                    n = void 0 === a[e - 1] ? s : a[e - 1][1];
                return Math.min(Math.max((t - r) / (l - r), 0), 1) * (s - n) + n
            }

            function fnOrVal(s) {
                return "(" === s[0] ? eval(s) : parseFloat(s)
            }
            return lax.presets = {
                linger: a => ({
                    "data-lax-translate-y": "(vh*0.7) 0, 0 200, -500 0"
                }),
                lazy: (a = 100) => ({
                    "data-lax-translate-y": `(vh) 0, (-elh) ${a}`
                }),
                eager: (a = 100) => ({
                    "data-lax-translate-y": `(vh) 0, (-elh) -${a}`
                }),
                slalom: (a = 50) => ({
                    "data-lax-translate-x": `vh ${a}, (vh*0.8) ${-a}, (vh*0.6) ${a}, (vh*0.4) ${-a}, (vh*0.2) ${a}, (vh*0) ${-a}, (-elh) ${a}`
                }),
                crazy: a => ({
                    "data-lax-hue-rotate": `${crazy} | loop=20`
                }),
                spin: (a = 360) => ({
                    "data-lax-rotate": `(vh) 0, (-elh) ${a}`
                }),
                spinRev: (a = 360) => ({
                    "data-lax-rotate": `(vh) 0, (-elh) ${-a}`
                }),
                spinIn: (a = 360) => ({
                    "data-lax-rotate": `vh ${a}, (vh*0.5) 0`
                }),
                spinOut: (a = 360) => ({
                    "data-lax-rotate": `(vh*0.5) 0, -elh ${a}`
                }),
                blurInOut: (a = 40) => ({
                    "data-lax-blur": `(vh) ${a}, (vh*0.8) 0, (vh*0.2) 0, 0 ${a}`
                }),
                blurIn: (a = 40) => ({
                    "data-lax-blur": `(vh) ${a}, (vh*0.7) 0`
                }),
                blurOut: (a = 40) => ({
                    "data-lax-blur": `(vh*0.3) 0, 0 ${a}`
                }),
                fadeInOut: () => ({
                    "data-lax-opacity": "(vh) 0, (vh*0.8) 1, (vh*0.2) 1, 0 0"
                }),
                fadeIn: () => ({
                    "data-lax-opacity": "(vh) 0, (vh*0.7) 1"
                }),
                fadeOut: () => ({
                    "data-lax-opacity": "(vh*0.3) 1, 0 0"
                }),
                driftLeft: (a = 100) => ({
                    "data-lax-translate-x": `vh ${a}, -elh ${-a}`
                }),
                driftRight: (a = 100) => ({
                    "data-lax-translate-x": `vh ${-a}, -elh ${a}`
                }),
                leftToRight: (a = 1) => ({
                    "data-lax-translate-x": `vh 0, -elh (vw*${a})`
                }),
                rightToLeft: (a = 1) => ({
                    "data-lax-translate-x": `vh 0, -elh (vw*${-a})`
                }),
                zoomInOut: (a = .2) => ({
                    "data-lax-scale": `(vh) ${a}, (vh*0.8) 1, (vh*0.2) 1, -elh ${a}`
                }),
                zoomIn: (a = .2) => ({
                    "data-lax-scale": `(vh) ${a}, (vh*0.7) 1`
                }),
                zoomOut: (a = .2) => ({
                    "data-lax-scale": `(vh*0.3) 1, -elh ${a}`
                }),
                speedy: (a = 30) => ({
                    "data-lax-skew-x": `(vh) ${a}, -elh ${-a}`
                }),
                swing: (a = 30) => ({
                    "data-lax-skew-y": `(vh) ${a}, -elh ${-a}`
                })
            }, lax.addPreset = ((a, t) => {
                lax.presets[a] = t
            }), lax.setup = ((a = {}) => {
                lax.breakpoints = a.breakpoints || {}, lax.selector = a.selector || ".lax", lax.populateElements()
            }), lax.removeElement = (a => {
                const t = lax.elements.findIndex(t => t.el === a);
                t > -1 && lax.elements.splice(t, 1)
            }), lax.createLaxObject = (a => {
                return {
                    el: a,
                    originalStyle: {
                        transform: a.style.transform,
                        filter: a.style.filter
                    },
                    transforms: {}
                }
            }), lax.calcTransforms = (a => {
                const {
                    el: t
                } = a, e = [];
                for (let a = 0; a < t.attributes.length; a++) {
                    const l = t.attributes[a];
                    l.name.indexOf("data-lax-preset") > -1 && e.push(l)
                }
                for (let a = 0; a < e.length; a++) {
                    const l = e[a],
                        r = l.name.split(breakpointsSeparator),
                        s = r[1] ? `${breakpointsSeparator}${r[1]}` : "";
                    l.value.split(" ").forEach(a => {
                        const e = a.split("-"),
                            l = lax.presets[e[0]];
                        if (l) {
                            const a = l(e[1]);
                            for (let e in a) t.setAttribute(`${e}${s}`, a[e])
                        } else console.log(`lax error: preset ${e[0]} is not defined`)
                    });
                    const n = t.getAttribute("data-lax-anchor");
                    n && "" !== n || t.setAttribute("data-lax-anchor", "self"), t.attributes.removeNamedItem(l.name)
                }
                if (!(t.attributes["data-lax-use-gpu"] && "false" === t.attributes["data-lax-use-gpu"].value) && (t.style["backface-visibility"] = "hidden", t.style["-webkit-backface-visibility"] = "hidden"), t.attributes["data-lax-use-gpu"] && t.attributes.removeNamedItem("data-lax-use-gpu"), a.optimise = !1, t.attributes["data-lax-optimize"] && "true" === t.attributes["data-lax-optimize"].value) {
                    a.optimise = !0;
                    const e = t.getBoundingClientRect();
                    t.setAttribute("data-lax-opacity", `${-e.height-1} 0, ${-e.height} 1, ${window.innerHeight} 1, ${window.innerHeight+1} 0`), t.attributes.removeNamedItem("data-lax-optimize")
                }
                for (let e = 0; e < t.attributes.length; e++) {
                    const l = t.attributes[e];
                    if (l.name.indexOf("data-lax") < 0) continue;
                    const r = l.name.split(breakpointsSeparator),
                        s = r[0].split("-"),
                        n = r[1] || "default";
                    if ("lax" === s[1])
                        if ("data-lax-anchor" === l.name) {
                            a["data-lax-anchor"] = "self" === l.value ? t : document.querySelector(l.value);
                            const e = a["data-lax-anchor"].getBoundingClientRect();
                            a.anchorTop = Math.floor(e.top) + window.scrollY
                        } else {
                            const e = l.value.replace(/vw/g, window.innerWidth).replace(/vh/g, window.innerHeight).replace(/elh/g, t.clientHeight).replace(/elw/g, t.clientWidth).replace(/\s+/g, " "),
                                [s, o] = e.split("|"),
                                i = {};
                            o && o.split(" ").forEach(a => {
                                const [t, e] = a.split("=");
                                i[t] = t && fnOrVal(e)
                            });
                            const d = r[0],
                                x = s.split(",").map(a => a.trim().split(" ").map(fnOrVal)).sort((a, t) => a[0] - t[0]);
                            a.transforms[d] || (a.transforms[d] = {}), a.transforms[d][n] = {
                                valueMap: x,
                                options: i
                            }
                        }
                }
                const l = t.attributes["data-lax-sprite-data"] && t.attributes["data-lax-sprite-data"].value;
                if (l) {
                    a.spriteData = l.split(",").map(a => parseInt(a)), t.style.height = a.spriteData[1] + "px", t.style.width = a.spriteData[0] + "px";
                    const e = t.attributes["data-lax-sprite-image"] && t.attributes["data-lax-sprite-image"].value;
                    e && (t.style.backgroundImage = `url(${e})`)
                }
                return a
            }), lax.addElement = (a => {
                const t = lax.calcTransforms(lax.createLaxObject(a));
                lax.elements.push(t), lax.updateElement(t)
            }), lax.populateElements = (() => {
                lax.elements = [], document.querySelectorAll(lax.selector).forEach(lax.addElement), currentBreakpoint = lax.getCurrentBreakPoint()
            }), lax.updateElements = (() => {
                lax.elements.forEach(a => {
                    lax.calcTransforms(a), lax.updateElement(a)
                }), currentBreakpoint = lax.getCurrentBreakPoint()
            }), lax.getCurrentBreakPoint = (() => {
                let a = "default";
                const t = window.innerWidth;
                for (let e in lax.breakpoints) {
                    if (!(parseFloat(lax.breakpoints[e]) <= t)) break;
                    a = e
                }
                return a
            }), lax.updateElement = (a => {
                const {
                    originalStyle: t,
                    anchorTop: e,
                    transforms: l,
                    spriteData: r,
                    el: s
                } = a;
                let n = e ? e - lastY : lastY;
                const o = {
                    transform: t.transform,
                    filter: t.filter
                };
                for (let a in l) {
                    const t = l[a][currentBreakpoint] || l[a].default;
                    if (!t) continue;
                    let e = n;
                    t.options.offset && (e += t.options.offset), t.options.speed && (e *= t.options.speed), t.options.loop && (e %= t.options.loop);
                    const r = transformFns[a],
                        s = intrp(t.valueMap, e);
                    r && r(o, s)
                }
                if (r) {
                    const [a, t, e, l, s] = r, n = Math.floor(lastY / s) % e, i = n % l, d = Math.floor(n / l);
                    o.backgroundPosition = `-${i*a}px -${d*t}px`
                }
                if (0 === o.opacity) s.style.opacity = 0;
                else
                    for (let a in o) s.style[a] = o[a]
            }), lax.update = (a => {
                lastY !== a && (lastY = a, lax.elements.forEach(lax.updateElement))
            }), lax
        })();
        "undefined" != typeof module && void 0 !== module.exports ? module.exports = lax : window.lax = lax
    })();