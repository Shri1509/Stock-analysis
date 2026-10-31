# Monthly, weekly, and yearly

Higher timeframes are both a chart button and a purpose stack. They are not a separate indicator.

## Buttons

The chart offers 1W, 1M, 3M, 6M, and 1Y along with the intraday and daily buttons. 240m is the four-hour bar. There is no 30m button.

## Purpose stacks

| Code | Curve (HTF) | Trend (ITF) | Execution (LTF) |
| --- | --- | --- | --- |
| HIT | 60m or 75m | 15m | 5m |
| DIT | 1d | 60m or 75m | 15m |
| WIT | 1w | 1d | 60m, 75m, 125m, or 240m |
| MIT | 1M | 1w | 1d |
| QIT | 3M | 1M | 1w |
| HYIT | 6M | 3M | 1M |
| YIT | 1Y | 6M | 3M |

Saved zone-distance preferences use DIT. The saved chart and the ready confluence report use MIT. A YIT fetch with `build=false` was `not_ready` and was not rebuilt.

## Points added by a higher timeframe

`awardedPoints = baseWeight × multiplier`. Multipliers on the saved rows are 1 for full containment, 0.75 for a partial overlap, and 0.4 for a near miss with a gap. Weights seen: 1w = 1, 1M = 2, 3M = 12, 6M = 13. The 1Y weight was not in a ready report.

V2 also treats `1w`, `1M`, `3M`, `6M`, and `1Y` as the higher-timeframe set: wider base allowance, and an 8-point bonus when achievement is at least 1.8. Weekly freshness drops the last bar before the walk.

Overlap math for confluence is in `12_MULTI_TIMEFRAME_ANALYSIS.md`.
