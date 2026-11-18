/* ============================================================
   YV ORBIT — motion layer (v2)
   Hero orbit, results ticker, scroll reveal, count-up, card glow.
   Every effect is optional: the page works and reads the same
   without it, and "reduce motion" visitors get a still frame.
   ============================================================ */
(function () {
  "use strict";
  var R = window.YV_RECORDS || [];
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tests = R.filter(function (r) { return r.pf !== null && r.pf !== undefined; });

  function css(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return (v && v.trim()) || fallback;
  }
  function money(n) {
    var s = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (n > 0 ? "+$" : n < 0 ? "−$" : "$") + s;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- results ticker ---------- */
  var tape = $("[data-tape]");
  if (tape && tests.length) {
    var items = tests.map(function (r) {
      var t = r.pf >= 1 ? "pos" : "neg";
      return '<span class="tape-item"><b>' + esc(r.symbol + (r.tf && r.tf !== "—" ? " " + r.tf : "")) + "</b>" + esc(r.name) +
        ' <span class="' + t + '">PF ' + r.pf.toFixed(2) + '</span><span class="' + t + '">' + money(r.net) + "</span></span>";
    }).join("");
    tape.innerHTML = '<div class="tape-track">' + items + items + "</div>";
  }

  /* ---------- hero orbit ----------
     Each satellite is one published test. Its distance from the
     core is its profit factor; the dashed blue ring is PF 1.00.
     Inside the ring lost money, outside made money.            */
  var canvas = $(".hero-canvas"), anchor = $(".hero-mark");
  if (canvas && anchor && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var POS = css("--pos-text", "#7FD8B0"), NEG = css("--neg", "#F08A76"), GOLD = css("--accent", "#7CC4FF"), COOL = css("--cool", "#9DB4D8");
    var W, H, dpr, cx, cy, base, tilt = -0.2, squash = 0.36, mx = 0, my = 0, tmx = 0, tmy = 0;
    var stars = [];
    var sats = tests.map(function (r, i) {
      var pf = Math.max(0.25, Math.min(1.8, r.pf));
      return {
        pf: pf, win: r.pf >= 1, fwd: r.kind === "forward",
        a: (i * 2.399963) % (Math.PI * 2),                 // golden-angle spread
        rf: 0.32 + pf * 0.42,                              // radius factor (PF 1.00 -> 0.74)
        size: 2.2 + Math.min(3, Math.log10((r.trades || 20) + 1))
      };
    });
    sats.forEach(function (s) { s.w = 0.00022 / Math.pow(s.rf, 1.5); });

    function hex(c, a) {
      var m = /^#([0-9a-f]{6})$/i.exec(c); if (!m) return c;
      var n = parseInt(m[1], 16);
      return "rgba(" + (n >> 16) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
    }
    function size() {
      var b = canvas.getBoundingClientRect(), a = anchor.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = b.width; H = b.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = a.left - b.left + a.width / 2; cy = a.top - b.top + a.height / 2;
      base = a.width * 0.7;
      stars = [];
      var n = Math.round(W * H / 5200);
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.1 + 0.2, t: Math.random() * 6.28, s: 0.4 + Math.random() * 1.2 });
    }
    function proj(r, ang) {
      var x = Math.cos(ang) * r, z = Math.sin(ang) * r, y = z * squash;
      var c = Math.cos(tilt), s = Math.sin(tilt);
      return { x: cx + x * c - y * s + mx * (z / base) * 10, y: cy + x * s + y * c + my * (z / base) * 6, z: z / r };
    }
    function ring(r, color, width, dash) {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx + mx * 2, cy + my * 2, r, r * squash, tilt, 0, Math.PI * 2);
      ctx.strokeStyle = color; ctx.lineWidth = width;
      if (dash) ctx.setLineDash(dash);
      ctx.stroke(); ctx.restore();
    }
    var last = 0, running = true;
    function frame(t) {
      var dt = last ? Math.min(48, t - last) : 16; last = t;
      mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
      ctx.clearRect(0, 0, W, H);

      // dust
      for (var i = 0; i < stars.length; i++) {
        var st = stars[i], tw = 0.35 + 0.35 * Math.sin(t * 0.001 * st.s + st.t);
        ctx.fillStyle = "rgba(236,234,228," + (tw * 0.55).toFixed(3) + ")";
        ctx.fillRect(st.x - mx * st.r * 3, st.y - my * st.r * 3, st.r, st.r);
      }

      // core glow
      var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.55);
      g.addColorStop(0, hex(GOLD, 0.16)); g.addColorStop(1, hex(GOLD, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, base * 0.55, 0, 7); ctx.fill();

      // guide rings: PF 0.50 / 1.00 (breakeven) / 1.50
      ring(base * (0.32 + 0.5 * 0.42), hex(COOL, 0.13), 1);
      ring(base * (0.32 + 1.5 * 0.42), hex(COOL, 0.1), 1);
      ring(base * 1.12, hex(COOL, 0.05), 1);
      ring(base * 0.74, hex(GOLD, 0.55), 1.2, [2, 6]);

      // satellites, far side first
      var pts = sats.map(function (s) {
        if (!still) s.a += s.w * dt;
        var p = proj(base * s.rf, s.a); p.s = s; return p;
      }).sort(function (a, b) { return a.z - b.z; });
      pts.forEach(function (p) {
        var s = p.s, col = s.win ? POS : NEG, depth = 0.55 + 0.45 * (p.z + 1) / 2, r = s.size * depth;
        // short trail
        if (!still) {
          ctx.beginPath();
          for (var k = 0; k <= 10; k++) {
            var q = proj(base * s.rf, s.a - k * 0.022);
            k ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y);
          }
          ctx.strokeStyle = hex(col, 0.22 * depth); ctx.lineWidth = r * 0.9; ctx.lineCap = "round"; ctx.stroke();
        }
        var gl = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
        gl.addColorStop(0, hex(col, 0.35 * depth)); gl.addColorStop(1, hex(col, 0));
        ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(p.x, p.y, r * 5, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7);
        if (s.fwd) { ctx.strokeStyle = hex(col, depth); ctx.lineWidth = 1.6; ctx.stroke(); }
        else { ctx.fillStyle = hex(col, depth); ctx.fill(); }
      });

      if (running && !still) requestAnimationFrame(frame);
    }
    size(); requestAnimationFrame(frame);
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (still) requestAnimationFrame(frame); }, 120); });
    window.addEventListener("pointermove", function (e) {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2; tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    if ("IntersectionObserver" in window && !still) {
      new IntersectionObserver(function (en) {
        var vis = en[0].isIntersecting;
        if (vis && !running) { running = true; last = 0; requestAnimationFrame(frame); }
        running = vis;
      }).observe(canvas);
    }
  }


  /* ---------- report library filters (evidence page) ---------- */
  var gal = $("[data-gallery]"), gf = $("[data-gal-filters]");
  if (gal && gf) {
    var byId = {}; R.forEach(function (r) { byId[r.id] = r; });
    var shots = $$(".shot", gal);
    var groupOf = function (b) { var id = b.getAttribute("data-id"); return R.filter(function (r) { return r.img === (byId[id] || {}).img; }); };
    var F = [
      ["all", "All reports", function () { return true; }],
      ["lib", "EA Library final versions", function (g) { return g.some(function (r) { return r.ea; }); }],
      ["old", "Earlier tests", function (g) { return !g.some(function (r) { return r.ea; }); }],
      ["win", "Made money", function (g) { return g.some(function (r) { return r.pf !== null && r.pf >= 1; }); }],
      ["loss", "Lost money", function (g) { return g.some(function (r) { return r.pf !== null && r.pf < 1; }); }]
    ];
    gf.innerHTML = F.map(function (f, i) {
      var n = shots.filter(function (b) { return f[2](groupOf(b)); }).length;
      return '<button class="filter" type="button" data-f="' + f[0] + '" aria-pressed="' + (i ? "false" : "true") + '">' + f[1] + '<span class="count">' + n + "</span></button>";
    }).join("");
    gf.hidden = false;
    $$("button", gf).forEach(function (b) {
      b.addEventListener("click", function () {
        var f = F.filter(function (x) { return x[0] === b.getAttribute("data-f"); })[0];
        $$("button", gf).forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        shots.forEach(function (s) { s.hidden = !f[2](groupOf(s)); });
      });
    });
    // newest first: library reports at the top
    shots.slice().reverse().forEach(function (s) { if (groupOf(s).some(function (r) { return r.ea; })) gal.insertBefore(s, gal.firstChild); });
    shots.forEach(function (s) { if (groupOf(s).some(function (r) { return r.ea; })) s.classList.add("is-lib"); });
  }

  /* ---------- count-up on hero numbers ---------- */
  function countUp(el) {
    var end = parseInt(el.textContent, 10); if (!end || still) return;
    var t0 = null;
    function step(t) {
      t0 = t0 || t; var k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * e); if (k < 1) requestAnimationFrame(step);
    }
    el.textContent = "0"; requestAnimationFrame(step);
  }
  setTimeout(function () { $$(".hero-stats strong").forEach(countUp); }, 350);

  /* ---------- scroll reveal ---------- */
  var groups = [".block-head", ".record-top", ".strip", ".filters", ".ledger", ".read-guide > div", ".ea-card", ".lib-card", ".funnel", ".step", ".connect-grid > div", ".connect-grid > form", ".tool", ".shot", ".page .wrap > *"];
  var targets = [];
  groups.forEach(function (g) {
    $$(g).forEach(function (el, i) { el.classList.add("reveal"); el.style.setProperty("--d", (Math.min(i, 5) * 0.07) + "s"); targets.push(el); });
  });
  if ("IntersectionObserver" in window && !still) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in"); io.unobserve(e.target);
        if (e.target.matches(".strip")) {
          $$(".dot", e.target).forEach(function (d, i) { d.style.animationDelay = (i * 0.035) + "s"; });
          e.target.classList.add("in");
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- cursor glow on cards ---------- */
  $$(".ea-card, .lib-card, .tool, .step, .social, .shot, .read-guide > div").forEach(function (el) {
    el.classList.add("spot");
    el.addEventListener("pointermove", function (e) {
      var b = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - b.left) + "px");
      el.style.setProperty("--my", (e.clientY - b.top) + "px");
    });
  });
})();
