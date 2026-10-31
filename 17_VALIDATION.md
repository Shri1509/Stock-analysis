# Validation

Checks below were run against the signed-in session. No report was rebuilt and no backtest was submitted. Counts are from one symbol and one timeframe unless a report row count is named.

## V3, COCHINSHIP, 1d, 491 zones

| Check | Result |
| --- | --- |
| Score equals the sum of the seven components | 491 / 491 |
| Compactness points = ratio × 20, and the ratio matches `clip(1 − (width / ATR) / 2)` | 491 / 491 |
| Departure points = strength × 25 | 491 / 491 |
| Departure strength = clipped `move / (ATR × 1.5)` on zones with a base | 364 / 364, and 1 of 127 no-base zones |
| Same departure expression on the other no-base DR and RD zones | does not fit (126 zones) |
| Role clarity is 12 with a departure pause and 15 without | 491 / 491 |
| Close-break points match the distance / ATR rule, including the cap of 15 | 491 / 491 |
| Prior structure is 15 or 0 with `structureBreak` | 491 / 491 |
| Origin is 5 or 0 with `originConfirmation` | 491 / 491 |
| Non-zero gap points are exactly 5 and classed `pro_trend` | 10 / 10 non-zero, 0 other values |

The raw departure ratio on this file never exceeded 1, and compactness never exceeded 1, so a cap above those products was not tested. No counter-trend gap was in the file.

## Saved reports, build=false

| Check | Result |
| --- | --- |
| Demand entry is proximal and the zone high, stop is distal and the zone low | 9 / 9 |
| Supply entry is proximal and the zone low, stop is distal and the zone high | 41 / 41 |
| Distance percent is `|CMP − entry| / CMP × 100` | 9 / 9 demand, 41 / 41 supply |
| Reward-to-risk is `|target − entry| / |entry − stop|` when a target exists | 9 / 9 demand, 40 / 40 supply with a target |
| Decision score is formation score plus the HTF adjustment | 9 / 9 and 41 / 41 |
| Target equals the nearest opposite proximal | 6 / 9 demand, 20 / 41 supply |

## Not validated

A second symbol was not run through the 491-zone V3 checks. Yearly confluence was `not_ready`. No backtest result exists to compare with `targetR` or the cost settings in the client defaults.
