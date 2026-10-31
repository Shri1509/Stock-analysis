# Unknown and unconfirmed logic

Items here are intentionally not filled in with a conventional textbook formula.

## Not yet opened on screen

- Zone details on a zone that has a departure pause (the one opened was a fresh RBR with no pause)
- Backtest results. No backtest was started.
- The body of an operations log. The jobs list was read. It was not used to start a job.
- Zone Watch trade-plan editor

## Not confirmed as formulas

- V3 departure strength on 126 of 127 no-base DR and RD zones. Zones with a base follow `move / (ATR × 1.5)`, clipped at 1. The no-base payload does carry `confirmationDistance`, `originWidth`, and two body ratios. Dividing the distance by the strength does not equal the zone width, the ATR, or the candle span.
- How the report picks a target when it is not the nearest opposing proximal. On the supply report that match is 20 of 41. IEX has no target. CONCORDBIO 1355.4 is the open of the 13 Oct 2026 daily candle. PAGEIND 34425 is an exact daily print. TATASTEEL 190.7 is the open of the 4 Aug 2026 daily candle.
- Zone Watch status rules. ONESOURCE is Reacting at 13.17% above its zone, with `reactionActive: true`, `breakPending: false`, and `condition: TESTED`. AARTIDRUGS on the dashboard is Watching at 67.75% above its zone. One row does not define the status machine.
- The 1Y `baseWeight`. A yearly confluence fetch with `build=false` returned `not_ready` and was not rebuilt. Positions 1 through 4 on the saved reports are 1, 2, 12, and 13 for 1w, 1M, 3M, and 6M.
- V3 `structureBreak`. Points are 15 or 0 with the boolean. A leg-out wick through the prior 22 bars agrees on 484 of 491 COCHINSHIP daily zones and misses 7. That is the best test so far, not a finished rule.
- Whether the decision score is capped at 100. TITAN's confluence cell shows 100 where 88.42 + 15 would be 103.42. The nine zone-distance rows are all below 100.
- Any buy, sell, hold, or probability rating. None of those labels was on the home page or the chart
- WebSocket payload, if a socket is used after the chart sits open
- Server implementation of `/api/zones/detect` for V3. The response is evidence of outputs, not the source

## Explicitly absent so far

No client string or chart control has shown RSI, MACD, VWAP, ATR-as-a-plotted-indicator, ADX, Bollinger Bands, Stochastic, Supertrend, OBV, or Fibonacci. ATR is an input to the zone score, not a separate panel indicator.

BOS, CHoCH, and MSS do not appear as named detectors. V3 `qualityEvidence` does include a boolean `structureBreak` and a `priorStructure` component. That is not the same as a published BOS rule.
