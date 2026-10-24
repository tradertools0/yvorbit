/* ============================================================
   YV ORBIT — page behaviour
   Reads YV_CONFIG (config.js) and YV_RECORDS (records.js).
   ============================================================ */
(function () {
  "use strict";
  var C = window.YV_CONFIG || {};
  var R = window.YV_RECORDS || [];
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function money(n) {
    if (n === null || n === undefined) return "—";
    var s = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (n > 0 ? "+$" : n < 0 ? "−$" : "$") + s;
  }
  function pfText(p) { return p === null || p === undefined ? "—" : p.toFixed(2); }
  function kindLabel(k) { return k === "forward" ? "Forward test" : k === "update" ? "Update" : "Backtest"; }
  function tone(r) { return r.pf === null ? "" : r.pf >= 1 ? "pos" : "neg"; }

  /* ---------- year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- icons ---------- */
  var ICON = {
    whatsapp: '<path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3Z"/>',
    telegram: '<path d="M21.6 3.4 2.9 10.6c-1.3.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.8.8s.6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.3-1.5Zm-3.9 4-8.4 7.6-.3 3.4-1.4-4.4 9.6-6c.4-.3.8-.1.5.1v-.7Z"/>',
    instagram: '<path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21.9 8a5.4 5.4 0 0 0-1.5-3.9A5.4 5.4 0 0 0 16.5 2.6c-1.5-.1-6-.1-7.5 0a5.4 5.4 0 0 0-3.9 1.5A5.4 5.4 0 0 0 3.6 8c-.1 1.5-.1 6 0 7.5a5.4 5.4 0 0 0 1.5 3.9 5.4 5.4 0 0 0 3.9 1.5c1.5.1 6 .1 7.5 0a5.4 5.4 0 0 0 3.9-1.5 5.4 5.4 0 0 0 1.5-3.9c.1-1.5.1-6 0-7.5Zm-2 9.2a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.2.4s-4.1.1-5.2-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.2s-.1-4.1.4-5.2a3 3 0 0 1 1.7-1.7C7.9 4.6 10.7 4.7 12 4.7s4.1-.1 5.2.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.2s.1 4.1-.4 5.2Z"/>',
    threads: '<path d="M16.7 11.1c-.1 0-.2-.1-.3-.1-.2-3-1.8-4.7-4.6-4.7-1.6 0-3 .7-3.9 2l1.5 1c.6-.9 1.6-1.2 2.4-1.2 1 0 1.8.3 2.2.9.4.4.6 1 .7 1.7a12 12 0 0 0-2.8-.1c-2.8.2-4.6 1.8-4.5 4.1.1 2.3 2.2 3.7 4.6 3.6 1.7-.1 3-.8 3.9-2 .7-.9 1.1-2.1 1.3-3.6.8.5 1.4 1.1 1.7 1.9.5 1.3.6 3.4-1.1 5.1-1.5 1.5-3.3 2.1-6 2.1-3 0-5.3-1-6.8-2.9C3.5 17.2 2.8 14.9 2.8 12s.7-5.2 2.2-7c1.5-1.9 3.8-2.9 6.8-2.9 3 0 5.3 1 6.9 2.9.8.9 1.3 2.1 1.7 3.4l1.8-.5c-.4-1.6-1.1-3-2.1-4.2C18.1 1.4 15.4.3 11.8.3 8.3.3 5.6 1.4 3.7 3.7 2 5.8 1.1 8.6 1.1 12s.9 6.2 2.6 8.3c1.9 2.3 4.6 3.4 8.1 3.4 3.1 0 5.3-.8 7.2-2.6 2.4-2.4 2.3-5.4 1.5-7.2-.6-1.4-1.7-2.4-3.8-2.8Zm-4.7 5.2c-1.3.1-2.6-.5-2.7-1.7 0-.9.6-1.9 2.7-2 .3 0 .5-.1.7-.1.7 0 1.4.1 2 .2-.2 2.8-1.6 3.5-2.7 3.6Z"/>',
    youtube: '<path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8ZM9.8 15V9l5.7 3-5.7 3Z"/>',
    x: '<path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.9 3h6.3l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/>',
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5c0-1.2 0-2.75-1.67-2.75-1.68 0-1.94 1.3-1.94 2.66V21H9.5V9.75Z"/>',
    tradingview: '<path d="M2 6h9v4H8.5v8h-4v-8H2V6Zm12.6 12L19 6h3l-4.4 12h-3Zm-1.6-8.2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/>',
    medium: '<path d="M7 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm8.6.4c1.5 0 2.7 2.3 2.7 5.1s-1.2 5.1-2.7 5.1-2.7-2.3-2.7-5.1 1.2-5.1 2.7-5.1Zm4.6.8c.5 0 1 1.9 1 4.3s-.4 4.3-1 4.3-1-1.9-1-4.3.4-4.3 1-4.3Z"/>',
    myfxbook: '<path d="M3 3h2v16h16v2H3V3Zm4.5 12.5 3.6-4.6 3 2.4 4.7-6.2 1.6 1.2-5.9 7.8-3-2.4-2.4 3-1.6-1.2Z"/>',
    facebook: '<path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/>',
    email: '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.3V17h16V7.3l-8 5.6-8-5.6ZM5.5 7l6.5 4.6L18.5 7h-13Z"/>',
    mql5: '<path d="M3 4h4l5 7 5-7h4v16h-3.5V9.8L12 16 6.5 9.8V20H3V4Z"/>',
    github: '<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/>'
  };
  function icon(name) { return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + ICON[name] + "</svg>"; }

  /* ---------- social links ---------- */
  var SOCIAL = [
    ["whatsapp", "WhatsApp", C.whatsapp ? "https://wa.me/" + String(C.whatsapp).replace(/\D/g, "") : ""],
    ["telegram", "Telegram", C.telegram],
    ["instagram", "Instagram", C.instagram],
    ["threads", "Threads", C.threads],
    ["youtube", "YouTube", C.youtube],
    ["x", "X", C.x],
    ["linkedin", "LinkedIn", C.linkedin],
    ["facebook", "Facebook", C.facebook],
    ["tradingview", "TradingView", C.tradingview],
    ["medium", "Medium", C.medium],
    ["myfxbook", "Myfxbook", C.myfxbook],
    ["mql5", "MQL5", C.mql5Product],
    ["github", "GitHub", C.github],
    ["email", "Email", C.email ? "mailto:" + C.email : ""]
  ];
  $$("[data-socials]").forEach(function (box) {
    box.innerHTML = SOCIAL.filter(function (s) { return s[2]; }).map(function (s) {
      var ext = s[0] !== "email";
      return '<a class="social" href="' + esc(s[2]) + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + icon(s[0]) + "<span>" + s[1] + "</span></a>";
    }).join("");
  });
  $$("[data-mql5]").forEach(function (a) { if (C.mql5Product) a.href = C.mql5Product; });
  // Paid EA link: if not set yet, the button scrolls to the contact form instead
  $$("[data-mql5-2]").forEach(function (a) {
    if (C.mql5Product2) { a.href = C.mql5Product2; }
    else { a.removeAttribute("target"); a.href = "#connect"; a.textContent = "Ask about this EA"; a.setAttribute("data-request", "Question about Two Frame Momentum Trend"); }
  });


  /* ---------- mobile menu ---------- */
  var menuBtn = $(".menu-toggle"), nav = $(".navlinks");
  if (menuBtn && nav) {
    var setMenu = function (open) {
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("open", open);
    };
    menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });
  }

  /* ---------- helpers for the record ---------- */
  var NOT_SHOWN = "Not shown on report";
  function byId(id) { return R.filter(function (q) { return q.id === id; })[0]; }
  function countText(r) {
    if (r.trades !== null && r.trades !== undefined) return r.trades.toLocaleString("en-US");
    if (r.deals) return r.deals.toLocaleString("en-US") + " deals";
    return "—";
  }
  function sourceLabel(s) {
    return s === "tester" ? "Includes the MT5 Strategy Tester results screen"
         : s === "account" ? "Summary graphic of an account's trade log"
         : s === "report" ? "YV Orbit summary graphic of a written trade report (the report itself is not published)"
         : "Summary graphic made from the tester results";
  }
  // Re-derive net and PF from gross figures where the report shows them.
  function arithmetic(r) {
    if (r.gp === null || r.gp === undefined || r.gl === null || r.gl === undefined) return null;
    var net = Math.round((r.gp + r.gl) * 100) / 100;
    var pf = r.gl === 0 ? null : Math.round(r.gp / -r.gl * 100) / 100;
    var ok = Math.abs(net - r.net) < 0.02 && (pf === null || Math.abs(pf - r.pf) <= 0.01);
    return { ok: ok, net: net, pf: pf };
  }

  /* ---------- record strip ---------- */
  var tests = R.filter(function (r) { return r.pf !== null; });
  var strip = $("[data-strip]");
  var tip = $(".tip");
  function drawStrip() {
    var old = strip.querySelector("svg"); if (old) old.remove();
    var W = Math.max(320, Math.round(strip.clientWidth || 1000)), H = 170, padL = 14, padR = 14, top = 34, maxPF = 1.7;
    var x = function (pf) { return padL + (Math.min(pf, maxPF) / maxPF) * (W - padL - padR); };
    var gap = W < 600 ? 14 : 17, rad = W < 600 ? 6 : 7;
    var placed = [];
    var sorted = tests.slice().sort(function (a, b) { return a.pf - b.pf; });
    sorted.forEach(function (r) {
      var cx = x(r.pf), lane = 0;
      while (placed.some(function (p) { return p.lane === lane && Math.abs(p.cx - cx) < gap; })) lane++;
      placed.push({ r: r, cx: cx, lane: lane });
    });
    var base = 112;
    var cs = window.getComputedStyle(strip);
    var POS = (cs.getPropertyValue("--pos") || "").trim() || "#8FBC99";
    var NEG = (cs.getPropertyValue("--wine-soft") || "").trim() || "#EE9A8E";
    var HOLLOW = (cs.getPropertyValue("--hollow") || "").trim() || "#37253C";
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="group" aria-label="Profit factor of every published test. Dots left of the dashed line lost money. Each dot opens its report.">';
    s += '<line class="axis" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + (base + 14) + '" y2="' + (base + 14) + '"/>';
    (W < 600 ? [0, 0.5, 1, 1.5] : [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5]).forEach(function (t) {
      s += '<line class="axis" x1="' + x(t) + '" x2="' + x(t) + '" y1="' + (base + 14) + '" y2="' + (base + 20) + '"/>';
      s += '<text class="tick-label" x="' + x(t) + '" y="' + (base + 38) + '" text-anchor="middle">' + t.toFixed(2) + "</text>";
    });
    s += '<line class="breakeven" x1="' + x(1) + '" x2="' + x(1) + '" y1="' + (top - 22) + '" y2="' + (base + 14) + '"/>';
    s += '<text class="side-label" fill="' + POS + '" x="' + (x(1) + 12) + '" y="' + (top - 10) + '">Made money</text>';
    s += '<text class="side-label" fill="' + NEG + '" x="' + (x(1) - 12) + '" y="' + (top - 10) + '" text-anchor="end">Lost money</text>';
    placed.forEach(function (p) {
      var cy = base - p.lane * (gap + 2), win = p.r.pf >= 1, fwd = p.r.kind === "forward";
      var col = win ? POS : NEG;
      var label = p.r.name + ", " + p.r.symbol + " " + p.r.tf + ", profit factor " + pfText(p.r.pf) + ", net " + money(p.r.net) + ". Open report";
      // invisible larger hit area so the dots are easy to tap
      s += '<circle class="hit" data-id="' + p.r.id + '" cx="' + p.cx.toFixed(1) + '" cy="' + cy + '" r="' + (gap / 2 + 1) + '"/>';
      s += '<circle class="dot" tabindex="0" role="button" aria-label="' + esc(label) + '" data-id="' + p.r.id + '" cx="' + p.cx.toFixed(1) + '" cy="' + cy + '" r="' + rad + '" ' +
        (fwd ? 'fill="' + HOLLOW + '" stroke="' + col + '" stroke-width="2.5"' : 'fill="' + col + '"') + "></circle>";
    });
    s += "</svg>";
    strip.insertAdjacentHTML("afterbegin", s);

    var dotFor = function (id) { return strip.querySelector('.dot[data-id="' + id + '"]'); };
    var showTip = function (dot) {
      var r = byId(dot.getAttribute("data-id"));
      if (!r || !tip) return;
      tip.innerHTML = "<strong>" + esc(r.name) + "</strong>" + esc(r.symbol + " " + r.tf) + " · PF " + pfText(r.pf) + " · " + money(r.net);
      var box = strip.getBoundingClientRect(), d = dot.getBoundingClientRect();
      var left = d.left - box.left + d.width / 2;
      left = Math.max(110, Math.min(box.width - 110, left));
      tip.style.left = left + "px";
      tip.style.top = (d.top - box.top) + "px";
      tip.style.opacity = 1;
    };
    var hideTip = function () { if (tip) tip.style.opacity = 0; };
    $$(".dot, .hit", strip).forEach(function (el) {
      var id = el.getAttribute("data-id");
      el.addEventListener("mouseenter", function () { showTip(dotFor(id)); });
      el.addEventListener("mouseleave", hideTip);
      el.addEventListener("click", function () { openRecord(id); });
    });
    $$(".dot", strip).forEach(function (dot) {
      dot.addEventListener("focus", function () { showTip(dot); });
      dot.addEventListener("blur", hideTip);
      dot.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openRecord(dot.getAttribute("data-id")); }
      });
    });
  }
  if (strip) {
    drawStrip();
    var lastW = strip.clientWidth, rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { if (strip.clientWidth !== lastW) { lastW = strip.clientWidth; drawStrip(); } }, 150);
    });
  }

  /* ---------- summary counts ---------- */
  var nWin = tests.filter(function (r) { return r.pf >= 1; }).length;
  var nLoss = tests.length - nWin;
  var nUpd = R.length - tests.length;
  var nFlag = R.filter(function (r) { return r.check || (arithmetic(r) && !arithmetic(r).ok); }).length;
  var setText = function (sel, v) { $$(sel).forEach(function (el) { el.textContent = v; }); };
  setText("[data-n-tests]", tests.length);
  setText("[data-n-entries]", R.length);
  setText("[data-n-updates]", nUpd);
  setText("[data-n-win]", nWin);
  setText("[data-n-loss]", nLoss);
  setText("[data-n-flag]", nFlag);
  setText("[data-n-tester]", R.filter(function (r) { return r.source === "tester"; }).map(function (r) { return r.img; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).length);
  setText("[data-n-images]", R.map(function (r) { return r.img; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).length);

  /* ---------- ledger ---------- */
  var tbody = $("[data-ledger]");
  var empty = $("[data-ledger-empty]");
  function pfBar(r) {
    if (r.pf === null) return '<div class="pfbar" aria-hidden="true"></div>';
    var w = Math.min(r.pf, 1.6) / 1.6 * 100;
    return '<div class="pfbar" aria-hidden="true"><span style="width:' + w.toFixed(1) + "%;background:" + (r.pf >= 1 ? "var(--green)" : "var(--wine-soft)") + '"></span></div>';
  }
  function flagged(r) { var a = arithmetic(r); return !!(r.check || (a && !a.ok)); }
  function renderLedger(filter) {
    if (!tbody) return;
    var rows = R.filter(function (r) {
      if (filter === "win") return r.pf !== null && r.pf >= 1;
      if (filter === "loss") return r.pf !== null && r.pf < 1;
      if (filter === "forward") return r.kind === "forward" || r.kind === "update";
      return true;
    });
    tbody.innerHTML = rows.map(function (r) {
      var sub = r.symbol + (r.tf !== "—" ? " " + r.tf : "") + (r.period ? " · " + r.period : "");
      return '<tr data-id="' + r.id + '">' +
        '<td class="name"><button type="button" class="row-open" data-open="' + r.id + '"><strong>' + esc(r.name) + "</strong><span>" + esc(sub) + "</span>" +
          (flagged(r) ? '<em class="flag">Data note</em>' : "") + '<span class="sr-only">. Open report ' + r.id + "</span></button></td>" +
        '<td class="kind-cell"><span class="kind ' + r.kind + '">' + kindLabel(r.kind) + "</span></td>" +
        '<td class="num hide-s">' + countText(r) + "</td>" +
        '<td class="num hide-m">' + (r.win === null ? "—" : r.win.toFixed(1) + "%") + "</td>" +
        '<td class="num net ' + tone(r) + '">' + money(r.net) + '<span class="pf-inline">PF ' + pfText(r.pf) + "</span></td>" +
        '<td class="num hide-s">' + pfText(r.pf) + "</td>" +
        '<td class="pf-cell">' + pfBar(r) + "</td>" +
        "</tr>";
    }).join("");
    if (empty) empty.hidden = rows.length > 0;
    $$("tr", tbody).forEach(function (tr) {
      tr.addEventListener("click", function (e) { if (!e.target.closest("button")) openRecord(tr.getAttribute("data-id")); });
    });
    $$(".row-open", tbody).forEach(function (b) { b.addEventListener("click", function () { openRecord(b.getAttribute("data-open")); }); });
  }
  $$(".filter").forEach(function (b) {
    var f = b.getAttribute("data-filter"), n = 0;
    if (f === "all") n = R.length;
    if (f === "win") n = nWin;
    if (f === "loss") n = nLoss;
    if (f === "forward") n = R.filter(function (r) { return r.kind !== "backtest"; }).length;
    var c = b.querySelector(".count"); if (c) c.textContent = n;
    b.addEventListener("click", function () {
      $$(".filter").forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      renderLedger(f);
    });
  });
  renderLedger("all");

  /* ---------- evidence gallery (evidence.html) ---------- */
  var gallery = $("[data-gallery]");
  if (gallery) {
    var seen = {};
    gallery.innerHTML = R.filter(function (r) { if (seen[r.img]) return false; seen[r.img] = 1; return true; }).map(function (r) {
      var group = R.filter(function (q) { return q.img === r.img; });
      var title = r.group || (group.length > 1 ? group.length + " tests compared" : r.name);
      if (r.id.indexOf("08") === 0) title = "Retracement EA #7: two brokers";
      if (r.id.indexOf("13") === 0) title = "Prop Firm EA #1: gold and bitcoin";
      if (r.id.indexOf("15") === 0) title = "Three XRP strategies, same data";
      var res = group.map(function (q) {
        return q.pf === null ? "Development update" : '<span class="' + tone(q) + '">' + money(q.net) + "</span> · PF " + pfText(q.pf);
      }).join("<br>");
      var ids = group.map(function (q) { return "#" + q.id; }).join(", ");
      var flag = group.some(flagged) ? '<em class="flag">Data note</em>' : "";
      var thumb = "assets/evidence/thumbs/" + r.img;
      return '<button class="shot" type="button" data-id="' + r.id + '">' +
        '<img loading="lazy" decoding="async" width="480" height="480" src="' + thumb + '" alt="Report image: ' + esc(title) + ", " + esc(r.symbol + (r.tf !== "—" ? " " + r.tf : "")) + '"' +
        ' onerror="this.onerror=null;this.src=\'assets/evidence/' + r.img + '\'">' +
        '<div class="cap"><span class="kind ' + r.kind + '">' + kindLabel(r.kind) + '</span> <span class="rid">Record ' + ids + "</span>" + flag +
        "<strong>" + esc(title) + '</strong><span class="meta">' + esc(r.symbol + (r.tf !== "—" ? " " + r.tf : "")) + " · " + esc(r.period || "Period not shown") +
        '</span><span class="src">' + sourceLabel(r.source) + '</span><span class="result">' + res + "</span></div></button>";
    }).join("");
    $$(".shot", gallery).forEach(function (b) { b.addEventListener("click", function () { openRecord(b.getAttribute("data-id")); }); });
  }

  /* ---------- report viewer ---------- */
  var lb = $(".lightbox"), lastFocus = null, onIndex = !!tbody;
  function row(label, value, help) {
    var missing = value === null || value === undefined || value === "";
    return "<dt>" + label + "</dt><dd" + (missing ? ' class="missing"' : "") + ">" + (missing ? esc(help || NOT_SHOWN) : value) + "</dd>";
  }
  function openRecord(id, fromHash) {
    var r = byId(id);
    if (!r || !lb) return;
    if (!lb.classList.contains("open")) lastFocus = document.activeElement;
    var src = "assets/evidence/" + r.img;
    var img = $("img", lb), fig = $("figure", lb);
    fig.classList.add("loading"); fig.classList.remove("failed");
    img.onload = function () { fig.classList.remove("loading"); };
    img.onerror = function () { fig.classList.remove("loading"); fig.classList.add("failed"); };
    img.alt = "Original report image for record " + r.id + ": " + r.name + ", " + r.symbol + (r.tf !== "—" ? " " + r.tf : "");
    img.src = src;
    var a = arithmetic(r);
    var sharedWith = R.filter(function (q) { return q.img === r.img && q.id !== r.id; });
    var grossNote = r.pf === null ? "Not applicable to an update" : "Not shown on report";
    var html =
      '<p class="rec-id">Record #' + esc(r.id) + '</p><span class="kind ' + r.kind + '">' + kindLabel(r.kind) + "</span>" +
      '<h3 id="lb-title">' + esc(r.name) + "</h3>" +
      '<p class="src">' + sourceLabel(r.source) + (sharedWith.length ? ". Same image as record " + sharedWith.map(function (q) { return "#" + q.id; }).join(", ") : "") + ".</p>" +
      '<h4>Result</h4><dl>' +
        row("Net result", r.net === null ? null : '<span class="' + tone(r) + '">' + money(r.net) + "</span>", grossNote) +
        row("Gross profit", r.gp === null || r.gp === undefined ? null : money(r.gp), grossNote) +
        row("Gross loss", r.gl === null || r.gl === undefined ? null : money(r.gl), grossNote) +
        row("Profit factor", r.pf === null ? null : pfText(r.pf), grossNote) +
        row(r.deals && r.trades === null ? "Deals" : "Trades", r.trades === null && !r.deals ? null : countText(r), grossNote) +
        row("Win rate", r.win === null ? null : r.win.toFixed(2).replace(/\.?0+$/, "") + "%", grossNote) +
        row("Max drawdown", r.dd ? esc(r.dd) : null) +
      "</dl>" +
      '<h4>Test conditions</h4><dl>' +
        row("Market", esc(r.symbol + (r.tf !== "—" ? " " + r.tf : ""))) +
        row("Period", r.period ? esc(r.period) : null) +
        row("Starting balance", r.deposit ? "$" + r.deposit.toLocaleString("en-US") : null) +
        row("Lot size", r.lot ? esc(r.lot) : null) +
        row("Modelling", r.model ? esc(r.model) : null) +
        row("History quality", r.quality ? r.quality + "%" : null) +
        row("Broker / data", r.broker ? esc(r.broker) : null) +
        row("Spread and commission", null) +
      "</dl>";
    if (a) {
      html += '<p class="check ' + (a.ok ? "ok" : "bad") + '">' + (a.ok
        ? "Arithmetic check passed: gross profit minus gross loss gives the stated net, and their ratio gives the stated profit factor."
        : "Arithmetic check failed: gross figures give " + money(a.net) + " and PF " + (a.pf === null ? "—" : a.pf.toFixed(2)) + ", not the stated " + money(r.net) + " and PF " + pfText(r.pf) + ".") + "</p>";
    } else if (r.pf !== null) {
      html += '<p class="check none">Arithmetic check not possible: this report does not show gross profit and gross loss.</p>';
    }
    if (r.check) html += '<p class="check bad">' + esc(r.check) + "</p>";
    html += '<p class="fine">' + esc(r.note) + "</p>" +
      '<div class="lb-actions"><a class="open-full" href="' + src + '" target="_blank" rel="noopener">Open full-size image</a>' +
      '<button type="button" class="copy-link">Copy link to this record</button></div>' +
      '<p class="fine copy-msg" role="status"></p>';
    $("figcaption", lb).innerHTML = html;
    var cp = $(".copy-link", lb);
    cp.addEventListener("click", function () {
      var url = location.origin + location.pathname + "#record-" + r.id;
      var done = function (ok) { $(".copy-msg", lb).textContent = ok ? "Link copied." : "Copy this link: " + url; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });
    if (!fromHash && history.replaceState) history.replaceState(null, "", "#record-" + r.id);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    $(".close", lb).focus();
  }
  function closeLb() {
    if (!lb || !lb.classList.contains("open")) return;
    lb.classList.remove("open");
    document.body.style.overflow = "";
    if (history.replaceState && location.hash.indexOf("#record-") === 0) history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }
  if (lb) {
    lb.setAttribute("aria-labelledby", "lb-title");
    lb.removeAttribute("aria-label");
    $(".close", lb).addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") { closeLb(); return; }
      if (e.key === "Tab") { // keep focus inside the open report
        var f = $$("a[href],button", lb).filter(function (el) { return el.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  function fromHash() {
    if (location.hash.indexOf("#record-") !== 0) return;
    var id = decodeURIComponent(location.hash.slice(8));
    if (byId(id)) openRecord(id, true);
  }
  fromHash();
  window.addEventListener("hashchange", fromHash);

  /* ---------- request buttons pre-fill the form ---------- */
  $$("[data-request]").forEach(function (a) {
    a.addEventListener("click", function () {
      var sel = $("#f-topic"); if (sel) sel.value = a.getAttribute("data-request");
    });
  });

  /* ---------- contact form ----------
     There is no server behind this form. It hands the message to WhatsApp
     (or the visitor's email app) and says so plainly. It never claims the
     message was delivered. */
  var form = $("#contact-form");
  if (form) {
    var note = $("[data-form-route]", form);
    if (note) note.textContent = C.whatsapp
      ? "Sending opens WhatsApp with your message filled in. Nothing is stored on this website, and the message is only sent when you press send in WhatsApp."
      : C.email ? "Sending opens your email app with the message filled in. Nothing is stored on this website."
      : "Direct messages are not set up yet.";
    var busy = false;
    var fieldErr = function (input, text) {
      var box = input.parentNode.querySelector(".field-error");
      input.setAttribute("aria-invalid", text ? "true" : "false");
      if (box) box.textContent = text || "";
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;
      var msg = $(".form-msg", form);
      var nameEl = $("#f-name"), replyEl = $("#f-reply"), bodyEl = $("#f-message");
      var name = nameEl.value.trim(), reply = replyEl.value.trim(),
          topic = $("#f-topic").value, body = bodyEl.value.trim();
      var bad = null;
      fieldErr(nameEl, name ? "" : "Enter your name.");
      if (!name) bad = bad || nameEl;
      var replyOk = !reply || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reply) || /^\+?[\d\s()-]{8,}$/.test(reply);
      fieldErr(replyEl, replyOk ? "" : "Enter an email address or a phone number with country code, or leave this empty.");
      if (!replyOk) bad = bad || replyEl;
      fieldErr(bodyEl, body.length >= 5 ? "" : "Write a short message (at least 5 characters).");
      if (body.length < 5) bad = bad || bodyEl;
      if (bad) { msg.textContent = "Please fix the highlighted fields."; msg.className = "form-msg neg"; bad.focus(); return; }

      var text = "Hello YV Orbit,\n\nName: " + name + (reply ? "\nReply to: " + reply : "") + "\nTopic: " + topic + "\n\n" + body;
      busy = true; setTimeout(function () { busy = false; }, 2500);
      if (C.whatsapp) {
        var wa = "https://wa.me/" + String(C.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(text);
        window.open(wa, "_blank", "noopener");
        msg.innerHTML = 'Your message is ready in WhatsApp. It is <strong>not sent</strong> until you press send there. If WhatsApp did not open, <a href="' + esc(wa) + '" target="_blank" rel="noopener noreferrer">open it here</a>.';
        msg.className = "form-msg";
      } else if (C.email) {
        var mail = "mailto:" + C.email + "?subject=" + encodeURIComponent("YV Orbit: " + topic) + "&body=" + encodeURIComponent(text);
        location.href = mail;
        msg.innerHTML = 'Your email app should open with the message ready. It is <strong>not sent</strong> until you send it there. If nothing opened, <a href="' + esc(mail) + '">try again</a>.';
        msg.className = "form-msg";
      } else {
        msg.innerHTML = 'Direct messages are not set up yet. Leave feedback on the <a href="' + esc(C.mql5Product) + '" target="_blank" rel="noopener noreferrer">MQL5 product page</a> for now.';
        msg.className = "form-msg";
      }
    });
  }
})();
