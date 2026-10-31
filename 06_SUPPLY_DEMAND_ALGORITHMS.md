# Supply and demand algorithms

Two detectors are in the product. They do not share a score formula. The chart options label V2 as "current production rules" and V3 as "structure-first preview." The saved COCHINSHIP chart is on V3, and the live daily chart header said "Detector V3."

Pattern letters used by both: R = rally, D = drop, B = base. Confirmed pattern labels from the V3 COCHINSHIP daily response: `DBD`, `RBR`, `BD`, `DBR`, `DR`, `RD`, `RBD`, `BR`.

## V2 score (confirmed from the shipped client)

The bundle builds each component as `awardedPoints = weight * normalizedValue`, sums them, then adds bonuses and caps the result at 100.

`clip` in the formula strings is the function applied as `Ys(...)` in the minified code. Its body is not separately quoted here; the weights and the expressions inside `clip` are taken from the component table itself.

| Key | Max points | Formula string in the client |
| --- | --- | --- |
| base_count | 12 | `12 × clip(1 − max(0, base candles − 2) ÷ allowed base candles)` |
| compactness | 11 | `11 × clip(1 − (base range ÷ ATR) ÷ width limit)` |
| departure | 16 | `16 × clip((departure ÷ ATR) ÷ 1.8)` |
| leg_out_range | 14 | `14 × clip((combined leg-out range ÷ ATR) ÷ 3)` |
| terminal_body | 8 | `8 × clip(terminal leg-out body ratio)` |
| achievement | 22 | `22 × clip(achievement ÷ 3.2)` |
| freshness | 9 | `9 × freshness factor` |
| follow_through | 8 | `8 × clip((follow-through ÷ ATR) ÷ 3)` |

The eight weights sum to 100.

Then, still in that same function:

- Subtotal `v` is the sum of awarded points.
- HTF parent bonus `b = p * 100`. Just above this function, `p` is `0.08` when the timeframe is in set `Lt` and `achievementScore >= 1.8`, otherwise `0`. That is an 8 point bonus when it applies. The members of `Lt` are not listed yet.
- Multi-leg-out bonus is `3` when `legOutCount > 1`, else `0`.
- Selection score is `min(v + b + multiLegOut, 100)`, rounded to 2 decimals.
- Final score is `min(selection score + origin.awardedPoints, 100)`, rounded to 2 decimals.

Freshness factors in the same function: `fresh = 1`, `tested_by_wick = 0.75`, `closed_inside = 0.45`, `broken_by_close = 0`.

Width limit used for the compactness term: `4` when the timeframe is in `Lt`, otherwise `1.8`.

`Lt` is exactly `1w`, `1M`, `3M`, `6M`, `1Y`. Those are also the timeframes that can receive the 8-point HTF bonus when achievement is at least 1.8.

The V2 detector object in the bundle is named in the source as the default config passed into the scanner. Confirmed defaults:

| Setting | Value |
| --- | --- |
| impulseRangeMultiplier | 1 |
| impulseBodyRatio | 0.55 |
| softImpulseRangeMultiplier | 0.92 |
| softImpulseBodyRatio | 0.5 |
| htfImpulseBodyRatioMin | 0.45 |
| baseBodyRatioMax | 0.5 |
| looseBaseBodyRatioMax | 0.62 |
| baseRangeMultiplier | 4 |
| htfBaseRangeMultiplier | 6 |
| similarRangeTolerance | 0.3 |
| breakoutBuffer | 0.001 |
| thresholdTolerance | 0.03 |
| minDepartureAtr | 0.22 |
| minZoneScore | 48 |
| maxBaseCandles | 4 |
| maxHtfBaseCandles | 6 |
| maxLegInGapCandles | 3 |
| maxLegOutCandles | 3 |
| lookbackAchievementBars | 20 |
| reactionWindow | 20 |
| rollingRangeLookbackCandles | 14 |
| rollingRangeLookaheadCandles | 5 |
| rollingWindow | 20 |

A candle is treated as base-like in that scanner when `bodyRatio < 0.35` (`Wn`). An HTF impulse, from the helper next to this config, requires the timeframe to be in `Lt`, a non-zero body, body-to-range at least 0.45, and range-to-low at least 0.45. The scanner then walks candidate bases and labels the zone demand when the leg-out candle is bullish and supply when it is bearish. Helper predicates inside that loop (`jb`, `ar`, `uc`, and the others) are still minified and are not transcribed as a complete pattern grammar.

### V2 quality labels (confirmed strings)

The client explains quality with these rules:

- **Perfect:** score is at least 78 and achievement is at least 1.8.
- **Good:** score is at least 78 but achievement is below 1.8, or score is at least 62.
- **Average:** score is at least 48 and below 62.
- **Weak:** score is below 48.
- **Broken:** a completed candle closed beyond the distal boundary.

A V2 candidate in the same detector is marked `isTradeable` when `score >= minZoneScore` and `score >= 48` and freshness is `fresh`.

### V2 zone boundaries (confirmed structure, not every branch)

`markingBasis` values produced by the client:

- `normal-base`
- `exceptional-leg-in`
- `exceptional-leg-out`
- `exceptional-leg-in-and-out`
- also `body-to-wick` and `wick-to-body` on a separate marking path

`Wa` sets the top to the higher price and the bottom to the lower price. Proximal is the top on demand and the bottom on supply. Distal is the other edge.

On reversal patterns `DBR` and `RBD`, the distal side also takes the leg-in extreme when that extreme is beyond the base. The leg-out extreme is included when it is beyond the base. The basis is `exceptional-leg-in`, `exceptional-leg-out`, or `exceptional-leg-in-and-out` when that extreme is the one that set the edge, and `normal-base` otherwise. A separate path marks demand `body-to-wick` and supply `wick-to-body`, or `exceptional-leg-out` when an `RBD` leg-out high exceeds the base high. `origin-base` uses the body on the proximal side and the wick on the distal side.

### V2 achievement points (confirmed from the client)

The raw achievement total, before the 22-point clip, adds:

- 1.2 if the leg-out takes out the prior lookback high (demand) or low (supply)
- 1.6 if it takes out the prior all-time high or low
- 0.9 if a leg-out candle closes beyond the leg-in high (demand) or low (supply)
- 0.4 more when there is more than one leg-out candle and any of those three is true

The score then uses `22 × clip(achievement / 3.2)`. Follow-through is the furthest extreme beyond a reference price inside the next `reactionWindow` bars (default 20), divided by ATR, then `8 × clip(that / 3)`.

The score's width limit is 4 on `1w`, `1M`, `3M`, `6M`, and `1Y`, and 1.8 on the other timeframes. The pass/fail compactness gate in the same file uses 4 and 2.2. Those are different checks.

### V2 candle classes (confirmed from the client)

`Xw` labels every candle before the zone search. `Wn` is 0.35.

- Body ratio is `|close − open| / range`. Direction is bullish, bearish, or neutral from the close against the open.
- The rolling range median uses 14 bars back and 5 bars forward.
- ATR is the mean true range over the 20-bar window, needing at least 5 bars, then carried forward. It is not the Wilder smoothing.
- Impulsive: body ratio at least 0.55, range at least 97% of the rolling median, and body ratio at least 0.35.
- A gap against the previous close is exciting when it is larger than 20% of the rolling median and points the same way as the candle.
- Base candidate: body ratio at most 0.50, or a wider body that is within 15% of a neighbor whose body ratio is at most 0.50.
- Continuation base: range at most 4 times the rolling median and body ratio at most 0.48.
- Tight base: range at most 90% of the rolling median, body ratio at most 0.65, and not impulsive.
- Leg-out candidate: body ratio at least 0.35 and either impulsive or a directional exciting gap. Leg-in candidate is the impulsive flag.

`Kw` then sets the flags the search uses. A candle is a V2 base when it is not the higher-timeframe percentage impulse and any base test above passes, including a looser test at body ratio 0.62. A higher-timeframe similar-range override also counts: range within 30% of the previous or next candle and inside 6 times the rolling median. `wb` rejects a higher-timeframe base candle that is too explosive: body ratio at least 0.78, range at least 70% of the rolling median, and body at least 0.55 ATR.

The pattern name is `CM`: the leg-in direction (`R` or `D`), then `B`, then the leg-out direction. With no leg-in, demand is `BR` and supply is `BD`. A bullish leg-out is demand. A bearish leg-out is supply.

`ar` accepts a base group when every candle is a V2 base and the non-small candles together are no wider than 4 ATR on a higher timeframe or 2.2 ATR otherwise. `uc` looks back at most 4 candles for a leg-in and stops if it hits a base-like candle.

### V2 freshness (confirmed control flow)

Walking candles after the zone, with `u = min(proximal, distal)` and `h = max(proximal, distal)`:

- A touch is counted when a demand candle's low is at or below `h`, or a supply candle's high is at or above `u`.
- Demand is `broken_by_close` when a candle closes below `u`, and `tested_by_wick` when it closes above `h`.
- Supply is `broken_by_close` when a candle closes above `h`, and `tested_by_wick` when it closes below `u`.
- If neither happens, the state is `fresh`.
- A second mode, used when the weekly/HTF flag is off, can also return `closed_inside` when a close is between `u` and `h`.

Weekly candles drop the last bar before this walk (`mM` returns `slice(0, -1)` only for `1w`).

## V3 detector (confirmed on the COCHINSHIP daily file)

`GET /api/zones/detect?symbol=COCHINSHIP&timeframe=1d&version=v3` returned:

- `algorithmVersion`: `dz-v3-canonical-6`
- 491 zones: 295 supply, 196 demand
- qualities: 62 perfect, 268 good, 161 average
- freshness: 38 fresh, 25 `tested_by_wick`, 428 `broken_by_close`
- 63 with `isTradeable: true`
- scores from 36.31 to 92.28

One tradeable demand zone, pattern `RBR`, quality `perfect`, score **79.41**:

| Component | Points |
| --- | --- |
| compactness | 9.414381022979967 |
| roleClarity | 15 |
| departureStrength | 25 |
| closeBreakDistance | 15 |
| priorStructure | 15 |
| gap | 0 |
| origin | 0 |

Those seven numbers sum to 79.414, which rounds to the reported score 79.41.

A second zone (supply, `DBD`, quality `average`, score 38.66) had components 14.528301886792452, 15, 7.578616352201266, 1.5566037735849056, 0, 0, 0. They sum to 38.6635, which rounds to 38.66.

On that second zone the server also sent the raw ratios, and two products match exactly:

- `baseCompactness 0.7264150943396226 × 20 = 14.528301886792452` (the compactness points)
- `departureStrength 0.30314465408805064 × 25 = 7.578616352201266` (the departure points)

The same checks were then run on all 491 zones. Counts are in `samples/v3-score-checks.json`.

| Rule | Match |
| --- | --- |
| `score` equals the sum of the seven components | 491 / 491 |
| compactness points = `baseCompactness × 20` | 491 / 491 |
| departure points = `departureStrength × 25` | 491 / 491 |
| prior-structure points = 15 when `structureBreak` is true, else 0 | 491 / 491 |
| origin points = 5 when `originConfirmation` is true, else 0 | 491 / 491 |

On this symbol the raw departure ratio never pushed the departure points above 25, so a cap of 25 was not tested. Origin is 5 points, not 15. The earlier guess that origin paid 15 is wrong.

Gap points were 0 on 481 zones. The other 10 were exactly 5, and each of those had `gapEvidence.classification = "pro_trend"`. No other gap class appeared, so a flat 5 for a pro-trend gap fits this file and is not proven for a counter-trend gap.

Role clarity is 15 when the formation has no departure pause, and 12 when `departurePause` has one candle. On this file that split is exact: 479 zones with no pause score 15, and all 12 zones with a pause score 12. The pause is the guarded pause already named in the authenticity text. It does not fail the authenticity checks. It costs 3 points.

Close-break points use the last confirmation candle's close. The component is capped at 15 and floored at 0.

- When the zone has a base, the distance is how far that close is beyond the base high (demand) or the base low (supply). The ATR is the upper median of the base candles' ATR values: sort them and take the higher of the two central values when the count is even.
- When the zone has no base, the distance is how far that close is beyond the proximal line. The ATR is the first leg-out candle's ATR.

`points = min(15, max(0, distance / ATR) × 15)`

That expression matches all 491 zones: 375 between the floor and the cap, 112 on the cap of 15, and 4 at 0 because the close has not cleared the edge.

### Compactness and departure ratios

Compactness points are `baseCompactness × 20`. On all 491 zones the ratio is

`baseCompactness = clip(1 − (width / ATR) / 2)`

Width is the base high minus the base low when a base exists, and the zone's top minus bottom when it does not. ATR is the same choice as close-break: the upper median of the base ATRs, or the first leg-out ATR when there is no base.

Departure points are `departureStrength × 25`, and the stored strength is already clipped at 1. On every zone that has a base, the strength is the directional move from the first leg-out open to the confirmation close, divided by `ATR × 1.5`, then clipped to 0..1. Supply subtracts the close from that open. Demand subtracts the open from the close.

That departure rule matches all 364 zones that have a base, and 1 no-base zone. It does not fit the other 126 no-base `DR` and `RD` zones. On 113 of the no-base zones the server sends a different measured block: `firstBodyRatio`, `secondBodyRatio`, `requiredBodyRatio` 0.5, `originWidth`, `midpoint`, `confirmationClose`, and `confirmationDistance`. Dividing that distance by the stored strength does not equal the zone width, either candle's ATR, or the high-to-low span. No tested mix of those fields matched more than 6 of the 113 zones.

V3 measured thresholds returned on both zones:

- `requiredDepartureEfficiency = 0.5`
- `requiredArrivalEfficiency = 0.35`

Authenticity checks returned with the zone, all passed on the samples:

- completed candles closed by the cutoff
- one role per candle inside the formation
- roles follow adjacent stored candles
- base ranges overlap and midpoint drift stays within half the complete range
- confirmation close is directional
- confirmation closes beyond the complete base
- at most five departure-side candles, including one guarded pause
- directional base exceptions require proven consolidation, not body ratio alone
- first directional departure body is at least 50 percent
- a bounded sequence or a local exceptional departure confirms the origin

Marking text returned by the server: "Complete local Base bodies and wicks; reversal Leg-In and confirming departure extremes only."

Formation modes seen: `v3_structural_arrival`, `v3_structural_no_leg_in`. Patterns seen on rejected alternatives include `DBD` and `BD`. The server also explains some rejections: "Same departure and Base ending with an exact Base suffix; complete formation then shortest valid Base selected."

Proximal and distal on the perfect demand sample were the zone top and bottom (proximal 122, distal 118.1, top 122, bottom 118.1). On the supply sample, proximal was the lower edge 267.2 and distal the upper edge 273.5. That matches the usual convention that proximal is the edge nearer price after the move, but it is only two examples.

## What this does not establish

- The V3 source code is not in the frontend. Compactness is confirmed below on all 491 zones. Departure strength is confirmed on every zone that has a base. The 126 no-base DR and RD zones still do not fit that departure rule.
- No numerical "institutional order" field exists on the zone object inspected.
- RSI, MACD, VWAP, Bollinger Bands, Supertrend, and Fibonacci were not found as detectors. The only indicator schema in the chart state is a moving average: types `sma`, `ema`, `rma`, `wma`, `vwma`; sources `open`, `high`, `low`, `close`, `hl2`, `hlc3`, `ohlc4`, `hlcc4`; default SMA 20 of close.
- Volume is stored on the candles inside `formationDetails`. No separate volume-spike score was present in `scoreComponents`.
