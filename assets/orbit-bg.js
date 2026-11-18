/* ============================================================
   YV ORBIT — page background (v3 "Navy Orbit")
   Fixed deep-space layer behind every page: slow twinkling
   stars, three faint orbit paths and a few drifting satellites.
   Purely decorative. Reduced-motion visitors get a still frame.
   ============================================================ */
(function () {
  "use strict";
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var c = document.createElement("canvas");
  c.className = "space-bg";
  c.setAttribute("aria-hidden", "true");
  document.body.insertBefore(c, document.body.firstChild);
  var ctx = c.getContext("2d");
  if (!ctx) return;
  var W, H, dpr, stars = [], orbits = [];

  function size() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth; H = window.innerHeight;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = [];
    var n = Math.round(W * H / 3800);
    for (var i = 0; i < n; i++) {
      stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() < 0.9 ? Math.random() * 0.9 + 0.3 : Math.random() * 1.4 + 1,
        t: Math.random() * 6.28, s: 0.3 + Math.random() * 1.1, b: Math.random() < 0.25 });
    }
    var m = Math.max(W, H);
    orbits = [
      { cx: W * 0.78, cy: H * 0.18, rx: m * 0.62, ry: m * 0.16, tilt: -0.32, sats: [0.2, 2.9], w: 0.000035 },
      { cx: W * 0.15, cy: H * 0.92, rx: m * 0.55, ry: m * 0.13, tilt: 0.22, sats: [1.4], w: -0.00003 },
      { cx: W * 0.5, cy: H * 0.55, rx: m * 0.9, ry: m * 0.22, tilt: -0.12, sats: [4.1], w: 0.00002 }
    ];
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i], a = still ? 0.55 : 0.35 + 0.4 * Math.sin(t * 0.001 * s.s + s.t);
      ctx.fillStyle = s.b ? "rgba(150,200,255," + (a * 0.8).toFixed(3) + ")" : "rgba(238,242,248," + (a * 0.7).toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
    }
    orbits.forEach(function (o) {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(o.cx, o.cy, o.rx, o.ry, o.tilt, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(124,196,255,.07)"; ctx.lineWidth = 1; ctx.stroke();
      o.sats.forEach(function (a0) {
        var a = a0 + (still ? 0 : t * o.w);
        var x = Math.cos(a) * o.rx, y = Math.sin(a) * o.ry, ct = Math.cos(o.tilt), st = Math.sin(o.tilt);
        var px = o.cx + x * ct - y * st, py = o.cy + x * st + y * ct;
        var g = ctx.createRadialGradient(px, py, 0, px, py, 14);
        g.addColorStop(0, "rgba(190,225,255,.55)"); g.addColorStop(1, "rgba(124,196,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 14, 0, 6.283); ctx.fill();
        ctx.fillStyle = "rgba(242,246,251,.9)"; ctx.beginPath(); ctx.arc(px, py, 1.8, 0, 6.283); ctx.fill();
      });
      ctx.restore();
    });
    if (!still && running) requestAnimationFrame(frame);
  }
  var running = true;
  size(); requestAnimationFrame(frame);
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (still) requestAnimationFrame(frame); }, 150); });
  document.addEventListener("visibilitychange", function () {
    var vis = document.visibilityState === "visible";
    if (vis && !running) { running = true; requestAnimationFrame(frame); }
    running = vis;
  });
})();
