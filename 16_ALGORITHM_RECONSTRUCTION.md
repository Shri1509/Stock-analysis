# Algorithm reconstruction

This is the specification that matched live outputs. It is not a second copy of the server. Pieces that failed a check are listed at the end and are not filled in.

## V2 score

Clip means `min(1, max(0, x))`. `Lt` is the set `1w`, `1M`, `3M`, `6M`, `1Y`. Width limit is 4 when the timeframe is in `Lt`, otherwise 1.8.

| Component | Points |
| --- | --- |
| base count | `12 × clip(1 − max(0, baseCandles − 2) / allowed)` |
| compactness | `11 × clip(1 − (baseRange / ATR) / widthLimit)` |
| departure | `16 × clip((departure / ATR) / 1.8)` |
| leg-out range | `14 × clip((combinedLegOutRange / ATR) / 3)` |
| terminal body | `8 × clip(body ratio of the last leg-out candle)` |
| achievement | `22 × clip(achievement / 3.2)` |
| freshness | `9 × factor` |
| follow-through | `8 × clip((followThrough / ATR) / 3)` |

Freshness factors: fresh 1, tested_by_wick 0.75, closed_inside 0.45, broken_by_close 0.

Then add 3 if there is more than one leg-out candle, and add 8 when the timeframe is in `Lt` and achievement is at least 1.8. Cap at 100. Then add origin points and cap at 100 again.

Achievement before the clip is 1.2 for a lookback extreme, 1.6 for an all-time extreme, 0.9 for a close beyond the leg-in, and 0.4 more when several leg-out candles participate in any of those.

Demand proximal is the zone high. Supply proximal is the zone low. Reversal patterns `DBR` and `RBD` extend the distal edge to a leg-in or leg-out extreme that breaks the base.

## V3 score

Confirmed on all 491 COCHINSHIP daily zones from `GET /api/zones/detect?version=v3`, algorithm `dz-v3-canonical-6`.

`score = compactness + roleClarity + departure + closeBreak + priorStructure + gap + origin`

| Component | Rule |
| --- | --- |
| compactness | `clip(1 − (width / ATR) / 2) × 20` |
| role clarity | 12 if `departurePause` has a candle, otherwise 15 |
| departure | `min(1, max(0, move / (ATR × 1.5))) × 25` on all 364 zones that have a base |
| close-break | `min(15, max(0, distance / ATR) × 15)` |
| prior structure | 15 if `structureBreak`, else 0 |
| gap | 5 when `gapEvidence.classification` is `pro_trend`, else 0 on this file |
| origin | 5 if `originConfirmation`, else 0 |

Width is the base high minus the base low, or the zone height when there is no base. ATR with a base is the upper median of the base candles' ATR values (the higher central value when the count is even). ATR without a base is the first leg-out candle's ATR.

Close-break distance with a base is the confirmation close beyond the base high (demand) or base low (supply). Without a base it is the close beyond the proximal.

Departure move, on zones with a base, is the confirmation close minus the first leg-out open for demand, and the reverse for supply.

## Report prices

Demand entry = proximal = zone high. Demand stop = distal = zone low. Supply entry = proximal = zone low. Supply stop = distal = zone high.

`distancePercent = |CMP − entry| / CMP × 100`

`riskReward = |target − entry| / |entry − stop|` when `target` is present. IEX supply has a null target and a null ratio.

`decisionScore = formation score + sum(baseWeight × multiplier)` on all 9 demand rows and all 41 supply rows. Multipliers: full 1, partial 0.75, near 0.4. Weights: 1w 1, 1M 2, 3M 12, 6M 13.

## Not reconstructed

- V3 departure on the 126 no-base DR and RD zones.
- The target price when it is not the nearest opposite proximal.
- The 1Y base weight.
- The V2 candle tests are transcribed in `06_SUPPLY_DEMAND_ALGORITHMS.md`. They are not re-checked against a live V2 zone list, because V2 detection runs in the browser and the detect route returns V3.
- The boolean rule behind V3 `structureBreak`.
