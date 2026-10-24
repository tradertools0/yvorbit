/* ============================================================
   YV ORBIT — TEST RECORD
   Every value below is copied from the matching image in
   assets/evidence/. Nothing is estimated. If an image does not
   show a value, leave it as null and the site will say
   "Not shown on report" instead of guessing.

   To add a new test: add the image, then add one entry here.

   id       stable ID used in links (yvorbit.com/evidence.html#record-04)
            never change or reuse an ID once published
   kind     "backtest" | "forward" | "update"
   source   what the image is:
            "tester"  = shows the MT5 Strategy Tester results screen
            "graphic" = a summary graphic made from tester results
            "account" = a summary graphic made from an account's trade log
            "report"  = a YV Orbit summary graphic made from a written report;
                        the written report itself is not published
   trades   closed trades (null if the report only shows deals)
   deals    use only when the report shows deals instead of trades
   net      net result in USD as shown on the report
   gp / gl  gross profit / gross loss in USD (gl is negative)
   pf       profit factor as shown on the report
   win      win rate % as shown
   dd       max drawdown text, exactly as shown (% or $)
   deposit  starting balance in USD
   lot      lot size text
   model    Strategy Tester modelling, only if the image states it
   quality  history quality %, only if shown
   broker   broker / data source, only if shown
   check    a known problem with the image itself (shown on the site)
   group    optional title for the gallery card when one image covers
            several records
   ============================================================ */

window.YV_RECORDS = [
  { id: "01", img: "evidence-01.jpg", name: "Momentum Scalper (EA #4)", symbol: "XAUUSD", tf: "M1",
    kind: "backtest", source: "graphic", period: "19 Aug 2024 – 18 May 2026",
    trades: 1443, net: -575.49, gp: 729.87, gl: -1305.36, pf: 0.56, win: 31.95, dd: "57.55%",
    deposit: 1000, lot: null, model: "Every tick based on real ticks", quality: 88, broker: null,
    note: "High trade count, low win rate. Equity declined steadily across 20 months." },

  { id: "02", img: "evidence-02.jpg", name: "Volatility Breakout, first tradeable build", symbol: "XAUUSD", tf: "M3",
    kind: "backtest", source: "graphic", period: "1 Jan 2025 – 18 Aug 2026",
    trades: 12, net: -2.24, gp: 30.31, gl: -32.55, pf: 0.93, win: 33.33, dd: "2.48% ($22.79)",
    deposit: 1000, lot: null, model: null, quality: null, broker: null,
    note: "Compression threshold raised to 3.0 so the EA starts trading. Too few trades to judge yet." },

  { id: "03", img: "evidence-03.jpg", name: "HMA Cross v2.1, day one", symbol: "XAUUSD", tf: "M3",
    kind: "forward", source: "account", period: "20 Jul 2026",
    trades: 15, net: 4.75, gp: 29.53, gl: -24.78, pf: 1.19, win: 53.33, dd: "$9.84",
    deposit: 10000, lot: "0.01 fixed", model: null, quality: null, broker: "XM Global (MT5)",
    note: "First day of forward running on a $10,000 account with a fixed 0.01 lot.",
    check: "The trade log printed in this image lists 14 trades that add up to −$4.75. The summary on the same image says 15 trades and +$4.75. The summary figures are shown here; the difference has not been resolved." },

  { id: "04", img: "evidence-04.jpg", name: "Trend Following (M15 portfolio EA)", symbol: "XAUUSD", tf: "M15",
    kind: "backtest", source: "graphic", period: "1 Jan 2025 – Aug 2026",
    trades: 103, net: 767.66, gp: 2131.78, gl: -1364.12, pf: 1.56, win: 38.83, dd: "18.14% ($391.58)",
    deposit: 1000, lot: null, model: null, quality: null, broker: null,
    note: "Fewer, larger winners. Sharpe 5.29 on the tester report.",
    check: "The equity curve drawn in this graphic ends near $900, which does not match the stated final balance of $1,767.66. Treat the curve in the image as illustrative; the table figures are the ones recorded here." },

  { id: "05", img: "evidence-05.jpg", name: "Mean Reversion (EA #5)", symbol: "XAUUSD", tf: "M30",
    kind: "backtest", source: "tester", period: "8 months (dates not shown)",
    trades: 1, net: -38.90, gp: 0, gl: -38.90, pf: 0.00, win: 0, dd: null,
    deposit: 1000, lot: null, model: null, quality: 73, broker: null,
    note: "One trade in eight months. The entry rules are too strict to produce a usable sample." },

  { id: "06", img: "evidence-06.jpg", name: "Session Breakout (EA #6)", symbol: "XAUUSD", tf: "M15",
    kind: "backtest", source: "graphic", period: null,
    trades: null, deals: 132, net: 299.08, gp: 2606.06, gl: -2056.98, pf: 1.39, win: 65.14, dd: "$500.66",
    deposit: null, lot: null, model: null, quality: null, broker: null,
    note: "The report counts 132 deals rather than trades. Win rate similar on long and short sides.",
    check: "This graphic does not add up: its gross profit and gross loss give a net of +$549.08 and a profit factor of 1.27, but it states +$299.08 and 1.39. The stated figures are recorded here until the original tester report is re-checked." },

  { id: "07", img: "evidence-07.jpg", name: "Asia–London Breakout v1.2", symbol: "XAUUSD", tf: "M15",
    kind: "backtest", source: "tester", period: null,
    trades: 72, net: 992.33, gp: 2919.28, gl: -1926.95, pf: 1.51, win: 65.28, dd: "42.89% ($520.21)",
    deposit: 1000, lot: "0.01 fixed", model: null, quality: 99, broker: null,
    note: "Execution and session-timing fixes only, no new filters. Up from +$599.98 and PF 1.30 in v1." },

  { id: "08a", img: "evidence-08.jpg", name: "Retracement EA #7 v1.2, Vantage", symbol: "XAUUSD", tf: "M5",
    kind: "backtest", source: "graphic", period: "~20 months (dates not shown)",
    trades: 912, net: 226.78, gp: null, gl: null, pf: 1.05, win: 33.00, dd: "15.86%",
    deposit: null, lot: "0.01", model: null, quality: 88, broker: "Vantage Markets data",
    note: "Removing the H1 support/resistance filter turned v1.1 (−$866.14) positive." },

  { id: "08b", img: "evidence-08.jpg", name: "Retracement EA #7 v1.2, MetaQuotes demo", symbol: "XAUUSD", tf: "M5",
    kind: "backtest", source: "graphic", period: "~20 months (dates not shown)",
    trades: 854, net: 286.93, gp: null, gl: null, pf: 1.07, win: 33.61, dd: "16.55%",
    deposit: null, lot: "0.01", model: null, quality: 75, broker: "MetaQuotes demo data",
    note: "Same build on a second broker's data, to check the result is not broker-specific." },

  { id: "09", img: "evidence-09.jpg", name: "Reverse-engineering study (EA #8.1)", symbol: "XAUUSD", tf: "M1",
    kind: "backtest", source: "graphic", period: "3 Aug 2026",
    trades: 4727, net: -956.18, gp: 2229.08, gl: -3185.26, pf: 0.70, win: 28.52, dd: "96.32% ($1,146.08)",
    deposit: null, lot: null, model: null, quality: null, broker: null,
    note: "Behaviour reconstruction of a third-party EA, not a performance test." },

  { id: "10", img: "evidence-10.jpg", name: "H1 strategy (EA #10)", symbol: "XAUUSD", tf: "H1",
    kind: "backtest", source: "graphic", period: "8 months (dates not shown)",
    trades: 170, net: -56.07, gp: 1409.87, gl: -1465.94, pf: 0.96, win: 47.06, dd: "28.75% ($305.83)",
    deposit: null, lot: null, model: null, quality: null, broker: null,
    note: "Close to breakeven. Gross profit and gross loss nearly cancel out. Win rate is 80 winning trades of 170; the graphic's headline 46.75% is the short-side figure." },

  { id: "11", img: "evidence-11.jpg", name: "Gold system (EA #13)", symbol: "XAUUSD", tf: "M15",
    kind: "backtest", source: "tester", period: "20+ months (dates not shown)",
    trades: 745, net: 2167.37, gp: 10071.81, gl: -7904.44, pf: 1.27, win: 69.80, dd: "66.73% (balance)",
    deposit: 1000, lot: null, model: null, quality: 88, broker: "Vantage Markets data",
    note: "Largest net result in the record, with the deepest drawdown among profitable tests." },

  { id: "12", img: "evidence-12.jpg", name: "Protection and filter upgrade", symbol: "XAUUSD", tf: "—",
    kind: "update", source: "graphic", period: "1-month observation, posted 30 May 2025",
    trades: null, net: null, gp: null, gl: null, pf: null, win: null, dd: null,
    deposit: null, lot: null, model: null, quality: null, broker: null,
    note: "Range, volatility, session, spread and structure filters added after frequent stop-outs in quiet markets." },

  { id: "13a", img: "evidence-13.jpg", name: "Prop Firm EA #1 v1, gold", symbol: "XAUUSD", tf: "M5",
    kind: "backtest", source: "tester", period: null,
    trades: 34, net: -48.87, gp: 37.29, gl: -86.16, pf: 0.43, win: 17.65, dd: "6.31% ($63.32)",
    deposit: 1000, lot: null, model: null, quality: null, broker: "Vantage Markets data",
    note: "Low drawdown, but the win rate is too low for the reward size." },

  { id: "13b", img: "evidence-13.jpg", name: "Prop Firm EA #1 v1, bitcoin", symbol: "BTCUSD", tf: "M5",
    kind: "backtest", source: "tester", period: null,
    trades: 55, net: -46.14, gp: 87.19, gl: -133.33, pf: 0.65, win: 25.45, dd: "6.13% ($62.25)",
    deposit: 1000, lot: null, model: null, quality: null, broker: "Vantage Markets data",
    note: "Same EA and settings on a second market." },

  { id: "14", img: "evidence-14.jpg", name: "New EA, one week in a range", symbol: "XAUUSD", tf: "M15",
    kind: "forward", source: "account", period: "6 – 14 Aug 2026 (trades 10 – 14 Aug)",
    trades: 9, net: 2.53, gp: 180.51, gl: -177.98, pf: 1.01, win: 44.4, dd: null,
    deposit: null, lot: "0.01 and 0.02", model: null, quality: null, broker: null,
    note: "Sideways week. Roughly flat, which is the expected behaviour for this design." },

  { id: "15a", img: "evidence-15.jpg", name: "Cyber-SMC v2", symbol: "XRPUSD", tf: "M5",
    kind: "backtest", source: "graphic", period: null,
    trades: 300, net: -170.30, gp: 492.21, gl: -662.51, pf: 0.74, win: 27.67, dd: "19.00% ($194.57)",
    deposit: null, lot: "0.01", model: null, quality: null, broker: null,
    note: "Indicator-based, M15 structure bias. Three XRP strategies tested on the same data." },

  { id: "15b", img: "evidence-15.jpg", name: "Cyber-SMC v1", symbol: "XRPUSD", tf: "M5",
    kind: "backtest", source: "graphic", period: null,
    trades: 25, net: -35.54, gp: 120.10, gl: -155.64, pf: 0.77, win: 84.00, dd: "12.95% ($133.31)",
    deposit: null, lot: "0.01", model: null, quality: null, broker: null,
    note: "84% win rate and still negative: a $50 stop against a $6 target." },

  { id: "15c", img: "evidence-15.jpg", name: "Buy Grid v2, 5 layers", symbol: "XRPUSD", tf: "M5",
    kind: "backtest", source: "graphic", period: null,
    trades: 337, net: -402.06, gp: 511.81, gl: -913.87, pf: 0.56, win: 37.98, dd: "42.09% ($427.67)",
    deposit: null, lot: "0.01", model: null, quality: null, broker: null,
    note: "Buy-only grid. Worst result of the three XRP approaches." },
  /* ---- added 24 Oct 2026 from the YV Orbit weekly trade report (18 Oct 2026) ----
     Demo accounts. Closed trades only; positions still open at the weekend are not
     included. Numbers copied from the report's table. Net and PF also reconcile
     with each account's average win, average loss and win count in that report. */

  { id: "16a", img: "evidence-16.jpg", group: "Three demo accounts, one week", name: "SMC_MSS, IC Markets demo", symbol: "XAUUSD", tf: "M5",
    kind: "forward", source: "report", period: "12 – 16 Oct 2026",
    trades: 100, net: -96.50, gp: null, gl: null, pf: 0.80, win: 53, dd: "13.84% ($155.62)",
    deposit: 1095.58, lot: "0.01", model: null, quality: null, broker: "IC Markets demo account",
    note: "A 53% win rate could not cover losses averaging 1.41 times the average win. One open position at the weekend is not included.",
    check: "Positions stacked on this account, which breaks the EA's one-position rule. The result reflects that behaviour." },

  { id: "16b", img: "evidence-16.jpg", group: "Three demo accounts, one week", name: "Tight-stop EA, E-Global demo", symbol: "XAUUSD", tf: "—",
    kind: "forward", source: "report", period: "12 – 16 Oct 2026",
    trades: 5, net: 6.52, gp: null, gl: null, pf: 2.32, win: 40, dd: "0.34% ($3.35)",
    deposit: 988.13, lot: "0.01", model: null, quality: null, broker: "E-Global demo account",
    note: "Only green account of the week. Five trades say nothing yet about an edge.",
    check: "The trades carry no comment tag, so which EA and version ran on this account is not confirmed." },

  { id: "16c", img: "evidence-16.jpg", group: "Three demo accounts, one week", name: "SMC_MSS, XM demo", symbol: "XAUUSD", tf: "H1",
    kind: "forward", source: "report", period: "12 – 16 Oct 2026",
    trades: 5, net: -74.38, gp: 21.85, gl: null, pf: 0.23, win: 40, dd: "6.78% ($74.38)",
    deposit: 1096.34, lot: "0.01", model: null, quality: null, broker: "XM demo account",
    note: "Three losing buys wiped out two winning sells. Two take-profit fills slipped on news and cost $22.25. Two positions open at the weekend are not included.",
    check: "H1 is inferred from entry times landing on the hour; the timeframe was not confirmed in the account history." }
];
