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
    youtube: '<path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8ZM9.8 15V9l5.7 3-5.7 3Z"/>',
    x: '<path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.9 3h6.3l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/>',
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5c0-1.2 0-2.75-1.67-2.75-1.68 0-1.94 1.3-1.94 2.66V21H9.5V9.75Z"/>',
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
    ["youtube", "YouTube", C.youtube],
    ["x", "X", C.x],
    ["linkedin", "LinkedIn", C.linkedin],
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

  /* ---------- record strip ---------- */
  var tests = R.filter(function (r) { return r.pf !== null; });
  var strip = $("[data-strip]");
  var tip = $(".tip");
  function drawStrip() {
    var old = strip.querySelector("svg"); if (old) old.remove();
    var W = Math.max(320, Math.round(strip.clientWidth || 1000)), H = 170, padL = 10, padR = 10, top = 34, maxPF = 1.7;
    var x = function (pf) { return padL + (Math.min(pf, maxPF) / maxPF) * (W - padL - padR); };
    // simple beeswarm: stack dots that would overlap
    var gap = W < 600 ? 14 : 17, rad = W < 600 ? 6 : 7;
    var placed = [];
    var sorted = tests.slice().sort(function (a, b) { return a.pf - b.pf; });
    sorted.forEach(function (r) {
      var cx = x(r.pf), lane = 0;
      while (placed.some(function (p) { return p.lane === lane && Math.abs(p.cx - cx) < gap; })) lane++;
      placed.push({ r: r, cx: cx, lane: lane });
    });
    var base = 112;
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Profit factor of every published test. Dots left of the dashed line lost money.">';
    s += '<line class="axis" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + (base + 14) + '" y2="' + (base + 14) + '"/>';
    (W < 600 ? [0, 0.5, 1, 1.5] : [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5]).forEach(function (t) {
      s += '<line class="axis" x1="' + x(t) + '" x2="' + x(t) + '" y1="' + (base + 14) + '" y2="' + (base + 20) + '"/>';
      s += '<text class="tick-label" x="' + x(t) + '" y="' + (base + 38) + '" text-anchor="middle">' + t.toFixed(2) + "</text>";
    });
    s += '<line class="breakeven" x1="' + x(1) + '" x2="' + x(1) + '" y1="' + (top - 22) + '" y2="' + (base + 14) + '"/>';
    s += '<text class="side-label" fill="#8FC1A0" x="' + (x(1) + 12) + '" y="' + (top - 10) + '">Made money</text>';
    s += '<text class="side-label" fill="#D9A3AE" x="' + (x(1) - 12) + '" y="' + (top - 10) + '" text-anchor="end">Lost money</text>';
    placed.forEach(function (p) {
      var cy = base - p.lane * (gap + 2), win = p.r.pf >= 1, fwd = p.r.kind === "forward";
      var col = win ? "#8FC1A0" : "#D9A3AE";
      s += '<circle class="dot" tabindex="0" data-id="' + p.r.id + '" cx="' + p.cx.toFixed(1) + '" cy="' + cy + '" r="' + rad + '" ' +
        (fwd ? 'fill="#22402F" stroke="' + col + '" stroke-width="2.5"' : 'fill="' + col + '"') + "><title>" + esc(p.r.name) + "</title></circle>";
    });
    s += "</svg>";
    strip.insertAdjacentHTML("afterbegin", s);

    var showTip = function (dot) {
      var r = R.filter(function (q) { return q.id === dot.getAttribute("data-id"); })[0];
      if (!r || !tip) return;
      tip.innerHTML = "<strong>" + esc(r.name) + "</strong>" + r.symbol + " " + r.tf + " · PF " + pfText(r.pf) + " · " + money(r.net);
      var box = strip.getBoundingClientRect(), d = dot.getBoundingClientRect();
      var left = d.left - box.left + d.width / 2;
      left = Math.max(110, Math.min(box.width - 110, left));
      tip.style.left = left + "px";
      tip.style.top = (d.top - box.top) + "px";
      tip.style.opacity = 1;
    };
    $$(".dot", strip).forEach(function (dot) {
      dot.addEventListener("mouseenter", function () { showTip(dot); });
      dot.addEventListener("focus", function () { showTip(dot); });
      dot.addEventListener("mouseleave", function () { tip.style.opacity = 0; });
      dot.addEventListener("blur", function () { tip.style.opacity = 0; });
      dot.addEventListener("click", function () { openRecord(dot.getAttribute("data-id")); });
      dot.addEventListener("keydown", function (e) { if (e.key === "Enter") openRecord(dot.getAttribute("data-id")); });
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
  var setText = function (sel, v) { $$(sel).forEach(function (el) { el.textContent = v; }); };
  setText("[data-n-tests]", tests.length);
  setText("[data-n-win]", nWin);
  setText("[data-n-loss]", nLoss);
  setText("[data-n-images]", R.map(function (r) { return r.img; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).length);

  /* ---------- ledger ---------- */
  var tbody = $("[data-ledger]");
  function pfBar(r) {
    if (r.pf === null) return '<div class="pfbar" aria-hidden="true"></div>';
    var w = Math.min(r.pf, 1.6) / 1.6 * 100;
    return '<div class="pfbar" aria-hidden="true"><span style="width:' + w.toFixed(1) + "%;background:" + (r.pf >= 1 ? "var(--green)" : "var(--wine-soft)") + '"></span></div>';
  }
  function renderLedger(filter) {
    if (!tbody) return;
    var rows = R.filter(function (r) {
      if (filter === "win") return r.pf !== null && r.pf >= 1;
      if (filter === "loss") return r.pf !== null && r.pf < 1;
      if (filter === "forward") return r.kind === "forward" || r.kind === "update";
      return true;
    });
    tbody.innerHTML = rows.map(function (r) {
      return '<tr tabindex="0" data-id="' + r.id + '">' +
        '<td class="name"><strong>' + esc(r.name) + "</strong><span>" + r.symbol + (r.tf !== "—" ? " " + r.tf : "") + (r.period !== "—" ? " · " + esc(r.period) : "") + "</span></td>" +
        '<td class="kind-cell"><span class="kind ' + r.kind + '">' + kindLabel(r.kind) + "</span></td>" +
        '<td class="num hide-s">' + (r.trades === null ? "—" : r.trades.toLocaleString("en-US")) + "</td>" +
        '<td class="num hide-m">' + (r.win === null ? "—" : r.win.toFixed(1) + "%") + "</td>" +
        '<td class="num net ' + tone(r) + '">' + money(r.net) + "</td>" +
        '<td class="num hide-s">' + pfText(r.pf) + "</td>" +
        '<td class="pf-cell">' + pfBar(r) + "</td>" +
        "</tr>";
    }).join("");
    $$("tr", tbody).forEach(function (tr) {
      tr.addEventListener("click", function () { openRecord(tr.getAttribute("data-id")); });
      tr.addEventListener("keydown", function (e) { if (e.key === "Enter") openRecord(tr.getAttribute("data-id")); });
    });
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
      var title = group.length > 1 ? group.length + " tests compared" : r.name;
      if (r.id.indexOf("08") === 0) title = "Retracement EA #7: two brokers";
      if (r.id.indexOf("13") === 0) title = "Prop Firm EA #1: gold and bitcoin";
      if (r.id.indexOf("15") === 0) title = "Three XRP strategies, same data";
      var res = group.map(function (q) { return q.pf === null ? "Development update" : '<span class="' + tone(q) + '">' + money(q.net) + "</span> · PF " + pfText(q.pf); }).join("<br>");
      return '<button class="shot" type="button" data-id="' + r.id + '"><img loading="lazy" src="assets/evidence/' + r.img + '" alt="' + esc(title) + ' report">' +
        '<div class="cap"><span class="kind ' + r.kind + '">' + kindLabel(r.kind) + "</span><strong>" + esc(title) + '</strong><span class="meta">' + r.symbol + (r.tf !== "—" ? " " + r.tf : "") + " · " + esc(r.period) + '</span><span class="result">' + res + "</span></div></button>";
    }).join("");
    $$(".shot", gallery).forEach(function (b) { b.addEventListener("click", function () { openRecord(b.getAttribute("data-id")); }); });
  }

  /* ---------- lightbox ---------- */
  var lb = $(".lightbox"), lastFocus = null;
  function openRecord(id) {
    var r = R.filter(function (q) { return q.id === id; })[0];
    if (!r || !lb) return;
    lastFocus = document.activeElement;
    var src = "assets/evidence/" + r.img;
    $("img", lb).src = src;
    $("img", lb).alt = r.name + " report";
    $("figcaption", lb).innerHTML =
      '<span class="kind ' + r.kind + '">' + kindLabel(r.kind) + "</span><h3>" + esc(r.name) + "</h3>" +
      "<dl><dt>Market</dt><dd>" + r.symbol + (r.tf !== "—" ? " " + r.tf : "") + "</dd>" +
      "<dt>Period</dt><dd>" + esc(r.period) + "</dd>" +
      "<dt>Trades</dt><dd>" + (r.trades === null ? "—" : r.trades.toLocaleString("en-US")) + "</dd>" +
      "<dt>Net result</dt><dd class=\"" + tone(r) + "\">" + money(r.net) + "</dd>" +
      "<dt>Profit factor</dt><dd>" + pfText(r.pf) + "</dd>" +
      "<dt>Win rate</dt><dd>" + (r.win === null ? "—" : r.win.toFixed(1) + "%") + "</dd>" +
      "<dt>Max drawdown</dt><dd>" + esc(r.dd) + "</dd></dl>" +
      '<p class="fine">' + esc(r.note) + "</p>" +
      '<a class="open-full" href="' + src + '" target="_blank" rel="noopener">Open full-size image</a>';
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    $(".close", lb).focus();
  }
  function closeLb() {
    if (!lb) return;
    lb.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  if (lb) {
    $(".close", lb).addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lb.classList.contains("open")) closeLb(); });
  }
  if (location.hash.indexOf("#record-") === 0) openRecord(location.hash.slice(8));

  /* ---------- tool request buttons pre-fill the form ---------- */
  $$("[data-request]").forEach(function (a) {
    a.addEventListener("click", function () {
      var sel = $("#f-topic"); if (sel) sel.value = a.getAttribute("data-request");
    });
  });

  /* ---------- contact form ---------- */
  var form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = $(".form-msg", form);
      var name = $("#f-name").value.trim(), reply = $("#f-reply").value.trim(),
          topic = $("#f-topic").value, body = $("#f-message").value.trim();
      if (!name || !body) { msg.textContent = "Add your name and a message, then send again."; msg.className = "form-msg neg"; return; }
      var text = "Hello YV Orbit,\n\nName: " + name + (reply ? "\nReply to: " + reply : "") + "\nTopic: " + topic + "\n\n" + body;
      if (C.whatsapp) {
        window.open("https://wa.me/" + String(C.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(text), "_blank", "noopener");
        msg.textContent = "WhatsApp opened with your message. Press send there to deliver it."; msg.className = "form-msg pos";
      } else if (C.email) {
        location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("YV Orbit: " + topic) + "&body=" + encodeURIComponent(text);
        msg.textContent = "Your email app opened with the message ready to send."; msg.className = "form-msg pos";
      } else {
        msg.innerHTML = 'Direct messages are not set up yet. Leave feedback on the <a href="' + esc(C.mql5Product) + '" target="_blank" rel="noopener">MQL5 product page</a> for now.';
        msg.className = "form-msg";
      }
    });
  }
})();
