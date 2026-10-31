# Market structure

The client does not name BOS, CHoCH, or MSS. Structure shows up in two narrower places.

## V2 achievement

The raw achievement score, confirmed in the bundle, pays for a break of prior structure:

- 1.2 when the leg-out takes out the prior lookback high or low
- 1.6 when it takes out the prior all-time high or low
- 0.9 when a leg-out close goes beyond the leg-in extreme
- 0.4 extra when more than one leg-out candle participates and any of those is true

The 22-point score component is `22 × clip(achievement / 3.2)`. The lookback length used to build `priorLookbackHigh` is not transcribed beyond the config field `lookbackAchievementBars: 20`.

## V3 prior structure

`qualityEvidence.structureBreak` is boolean. Prior-structure points are 15 when it is true and 0 when it is false, on all 491 COCHINSHIP daily zones. The panel labels the true case "Prior structure achieved."

The closest price test is a wick break of the prior extreme. Take the 22 daily bars before the first leg-out candle. A demand zone breaks when a leg-out high is above that window's high. A supply zone breaks when a leg-out low is below that window's low. That agrees with the boolean on 484 of 491 zones. Lookbacks of 20 and 24 are worse (482 and 483). The 7 misses mean this is not the finished rule. A close beyond the same window matches only 460. The latest 1- to 5-bar swing matches at most 433.

## Higher-timeframe control

Zone-distance rows name a controlling higher-timeframe zone ("3M SZ is controlling price") and can label the row conflict, neutral, or watch. Which zone becomes the controller is not extracted. The point weights those zones add are in `12_MULTI_TIMEFRAME_ANALYSIS.md`.
