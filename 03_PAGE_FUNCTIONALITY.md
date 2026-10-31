# Page functionality

Each tool is a `view` query on the same origin. Opening one from the chart uses a new tab. Nothing below was started as a new build or a new backtest.

## Home

The signed-in home lists the tools: chart, zone distance, confluence, zone watch, backtesting, operations, and the setup dashboard. The session role on this login is `trader`.

## Chart

`/?view=chart&symbol=COCHINSHIP&timeframe=1d` draws candles with TradingView Lightweight Charts and overlays detected zones. Timeframe buttons are 5m, 15m, 60m, 75m, 125m, 240m, 1D, 1W, 1M, 3M, 6M, and 1Y. There is no 30m button. Chart options separate detection from visibility (fresh only, quality, zone type, minimum score, purpose stack, detector V2 or V3).

Zone details opens a picker, then one zone's panel: boundaries, pattern, quality, the V3 score components, authenticity checks, and dashboard actions. The panel says scores are programmed criteria, not a success probability.

Indicators opens a list capped at 12. The only add action is Moving Average. Types are SMA, EMA, RMA / SMMA, WMA, and VWMA. Sources are OPEN, HIGH, LOW, CLOSE, HL2, HLC3, OHLC4, and HLCC4. Length, offset, timeframe, and "wait for timeframe close" are on the form. The two averages opened while reading that form were removed. The chart was left at 0/12.

## Zone distance

`/?view=zones` is a saved report. Demand, Nifty 500, daily, fresh, minimum score 80, minimum decision score 80, maximum distance 5%, detector V2, context off: 9 rows, status ready. The same query with `zoneType=supply` was also ready: 41 rows. `build=false` was used both times. Columns cover entry, stop, target, distance, reward-to-risk, decision score, HTF adjustment, and the 100 and 200 EMA.

## Confluence

`/?view=confluence` with the saved MIT demand settings was ready: 18 rows. Overlap is the intersection of the two ranges. A yearly (`YIT`) fetch with `build=false` returned `not_ready` and was not rebuilt.

## Zone watch

`/?view=zone-watch` is a live list of saved zones. This session has one active row, ONESOURCE, status REACTING. The trade-plan editor on that row was not opened.

## Setup dashboard

`/?view=dashboard` groups HTF reacting stocks, best execution stocks, and HTF reacting indices. One saved item is AARTIDRUGS, a 3-month demand zone, status WATCHING.

## Backtesting and operations

The backtest screen was not submitted. Operations `GET /api/operations/jobs` returned 72 finished jobs, mostly zone-distance reports already in `ready` state. No job was started from this pass. Loader health returned `ok`.
