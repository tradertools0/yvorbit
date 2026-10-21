/* ============================================================
   YV ORBIT — TEST RECORD
   Every number below is copied from the matching image in
   assets/evidence/. To add a new test: add the image, then add
   one line here. "pf" = profit factor, "net" = net result in USD.
   kind: "backtest" | "forward" | "update"
   ============================================================ */

window.YV_RECORDS = [
  { id: "01", img: "evidence-01.jpg", name: "Momentum Scalper (EA #4)", symbol: "XAUUSD", tf: "M1",
    kind: "backtest", period: "Aug 2024 – May 2026", trades: 1443, net: -575.49, pf: 0.56, win: 31.95, dd: "57.55%",
    note: "High trade count, low win rate. Equity declined steadily across 20 months." },

  { id: "02", img: "evidence-02.jpg", name: "Volatility Breakout, first tradeable build", symbol: "XAUUSD", tf: "M3",
    kind: "backtest", period: "Jan 2025 – Aug 2026", trades: 12, net: -2.24, pf: 0.93, win: 33.33, dd: "2.48%",
    note: "Compression threshold raised to 3.0 so the EA starts trading. Too few trades to judge yet." },

  { id: "03", img: "evidence-03.jpg", name: "HMA Cross v2.1, day one", symbol: "XAUUSD", tf: "M3",
    kind: "forward", period: "20 Jul 2026", trades: 15, net: 4.75, pf: 1.19, win: 53.33, dd: "$9.84",
    note: "First day of forward running on a $10,000 account with a fixed 0.01 lot." },

  { id: "04", img: "evidence-04.jpg", name: "Trend Following (M15 portfolio EA)", symbol: "XAUUSD", tf: "M15",
    kind: "backtest", period: "Jan 2025 – Aug 2026", trades: 103, net: 767.66, pf: 1.56, win: 38.83, dd: "18.14%",
    note: "Fewer, larger winners. Sharpe 5.29 on the tester report." },

  { id: "05", img: "evidence-05.jpg", name: "Mean Reversion (EA #5)", symbol: "XAUUSD", tf: "M30",
    kind: "backtest", period: "8 months", trades: 1, net: -38.90, pf: 0.00, win: 0, dd: "—",
    note: "One trade in eight months. The entry rules are too strict to produce a usable sample." },

  { id: "06", img: "evidence-06.jpg", name: "Session Breakout (EA #6)", symbol: "XAUUSD", tf: "M15",
    kind: "backtest", period: "—", trades: 132, net: 299.08, pf: 1.39, win: 65.14, dd: "$500.66",
    note: "Counted as 132 deals on the report. Win rate similar on long and short sides." },

  { id: "07", img: "evidence-07.jpg", name: "Asia–London Breakout v1.2", symbol: "XAUUSD", tf: "M15",
    kind: "backtest", period: "Tester run", trades: 72, net: 992.33, pf: 1.51, win: 65.28, dd: "42.89%",
    note: "Execution and session-timing fixes only, no new filters. Up from +$599.98 and PF 1.30 in v1." },

  { id: "08a", img: "evidence-08.jpg", name: "Retracement EA #7 v1.2, Vantage", symbol: "XAUUSD", tf: "M5",
    kind: "backtest", period: "~20 months", trades: 912, net: 226.78, pf: 1.05, win: 33.00, dd: "15.86%",
    note: "Removing the H1 support/resistance filter turned v1.1 (−$866.14) positive." },

  { id: "08b", img: "evidence-08.jpg", name: "Retracement EA #7 v1.2, MetaQuotes demo", symbol: "XAUUSD", tf: "M5",
    kind: "backtest", period: "~20 months", trades: 854, net: 286.93, pf: 1.07, win: 33.61, dd: "16.55%",
    note: "Same build on a second broker's data, to check the result is not broker-specific." },

  { id: "09", img: "evidence-09.jpg", name: "Reverse-engineering study (EA #8.1)", symbol: "XAUUSD", tf: "M1",
    kind: "backtest", period: "3 Aug 2026", trades: 4727, net: -956.18, pf: 0.70, win: 28.52, dd: "96.32%",
    note: "Behaviour reconstruction of a third-party EA, not a performance test." },

  { id: "10", img: "evidence-10.jpg", name: "H1 strategy (EA #10)", symbol: "XAUUSD", tf: "H1",
    kind: "backtest", period: "8 months", trades: 170, net: -56.07, pf: 0.96, win: 47.06, dd: "28.75%",
    note: "Close to breakeven. Gross profit and gross loss nearly cancel out." },

  { id: "11", img: "evidence-11.jpg", name: "Gold system (EA #13)", symbol: "XAUUSD", tf: "M15",
    kind: "backtest", period: "20+ months", trades: 745, net: 2167.37, pf: 1.27, win: 69.80, dd: "66.73%",
    note: "Largest net result in the record, with the deepest drawdown among profitable tests." },

  { id: "12", img: "evidence-12.jpg", name: "Protection and filter upgrade", symbol: "XAUUSD", tf: "—",
    kind: "update", period: "1-month observation", trades: null, net: null, pf: null, win: null, dd: "—",
    note: "Range, volatility, session, spread and structure filters added after frequent stop-outs in quiet markets." },

  { id: "13a", img: "evidence-13.jpg", name: "Prop Firm EA #1 v1, gold", symbol: "XAUUSD", tf: "M5",
    kind: "backtest", period: "Tester run", trades: 34, net: -48.87, pf: 0.43, win: 17.65, dd: "6.31%",
    note: "Low drawdown, but the win rate is too low for the reward size." },

  { id: "13b", img: "evidence-13.jpg", name: "Prop Firm EA #1 v1, bitcoin", symbol: "BTCUSD", tf: "M5",
    kind: "backtest", period: "Tester run", trades: 55, net: -46.14, pf: 0.65, win: 25.45, dd: "6.13%",
    note: "Same EA and settings on a second market." },

  { id: "14", img: "evidence-14.jpg", name: "New EA, one week in a range", symbol: "XAUUSD", tf: "M15",
    kind: "forward", period: "6 – 14 Aug 2026", trades: 9, net: 2.53, pf: 1.01, win: 44.4, dd: "—",
    note: "Sideways week. Roughly flat, which is the expected behaviour for this design." },

  { id: "15a", img: "evidence-15.jpg", name: "Cyber-SMC v2", symbol: "XRPUSD", tf: "M5",
    kind: "backtest", period: "Tester run", trades: 300, net: -170.30, pf: 0.74, win: 27.67, dd: "19.00%",
    note: "Indicator-based, M15 structure bias. Three XRP strategies tested on the same data." },

  { id: "15b", img: "evidence-15.jpg", name: "Cyber-SMC v1", symbol: "XRPUSD", tf: "M5",
    kind: "backtest", period: "Tester run", trades: 25, net: -35.54, pf: 0.77, win: 84.00, dd: "12.95%",
    note: "84% win rate and still negative: a $50 stop against a $6 target." },

  { id: "15c", img: "evidence-15.jpg", name: "Buy Grid v2, 5 layers", symbol: "XRPUSD", tf: "M5",
    kind: "backtest", period: "Tester run", trades: 337, net: -402.06, pf: 0.56, win: 37.98, dd: "42.09%",
    note: "Buy-only grid. Worst result of the three XRP approaches." }
];