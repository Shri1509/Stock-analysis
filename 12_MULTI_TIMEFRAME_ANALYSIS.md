# Multi-timeframe analysis

Timeframes available on the chart, the zone report, confluence, and Zone Watch are the same list: 5m, 15m, 60m, 75m, 125m, 240m, 1d, 1w, 1M, 3M, 6M, 1Y. There is no 30-minute button. 240m is the four-hour bar. Session math in the client uses `Asia/Kolkata`.

## Named stacks

The client defines one stack per holding horizon. Curve HTF, Trend ITF, and Execution LTF are the labels on the selectors.

| Code | Name | HTF | ITF | LTF |
| --- | --- | --- | --- | --- |
| HIT | Hourly Income Trade | 60m, 75m | 15m | 5m |
| DIT | Daily Income Trade | 1d | 60m, 75m | 15m |
| WIT | Weekly Income Trade | 1w | 1d | 60m, 75m, 125m, 240m |
| MIT | Monthly Income Trade | 1M | 1w | 1d |
| QIT | Quarterly Income Trade | 3M | 1M | 1w |
| HYIT | Half-Yearly Income Trade | 6M | 3M | 1M |
| YIT | Yearly Income Trade | 1Y | 6M | 3M |

The saved zone-distance preferences use DIT. The saved confluence preferences and the chart's zone filters use MIT. The confluence report that was open was labeled Monthly Income Trade, with a 1M zone next to a 1d zone.

## How a lower zone sits inside a higher zone

On the two confluence rows read in full, overlap is the intersection of the two price ranges:

- LTF overlap is the intersection divided by the LTF range. Both rows were 100% because the daily zone was entirely inside the monthly zone.
- HTF overlap is the intersection divided by the HTF range. INOXWIND: `(53.75 − 52.1) / (54.2 − 46.5) = 21.43%`. TITAN: `(4025.2 − 3962.8) / (4404 − 3962.8) = 14.14%`.

## What higher timeframes add to the score

Each fresh same-side higher-timeframe zone can add points:

`awardedPoints = baseWeight × multiplier`

On the nine-row daily report the multiplier is 1 when the lower zone is fully inside the higher zone, 0.75 when the ranges only partly overlap, and 0.4 when the zones are near each other with a gap and no overlap. The adjustment on the row is the sum of those points, and `decisionScore = formation score + that sum`. Examples are in `samples/htf-coincidence-points.json`.

`baseWeight` by relative position, seen on the zone report and on all 18 ready confluence rows:

| Position | Timeframe | Weight |
| --- | --- | --- |
| 1 | 1w | 1 |
| 2 | 1M | 2 |
| 3 | 3M | 12 |
| 4 | 6M | 13 |

The same weight repeats for full, partial, and near matches, so it is tied to the timeframe step and not to the overlap. No 1Y match was in either saved report, so that weight is still unknown. The client bundle does not contain this table; these values are what the saved reports awarded.

HTF reaction text on the zone report names a controller zone ("3M SZ · reacting", "1w SZ · reacting"), a weakened blocker ("Distal exceeded by wick"), a retest ("1w DZ · Retested · 2 visits"), and counts of further HTF zones. Those phrases are evidence of a reaction state machine. The rules that choose the controller versus the blocker are not yet extracted.

V2 uses a wider base allowance on `1w`, `1M`, `3M`, `6M`, and `1Y` (width limit 4 instead of 1.8, max base candles 6 instead of 4, and the 8-point achievement bonus). That is the detector's own higher-timeframe exception, separate from the report's HTF adjustment.
