# Trading signal geometry

This is what the Zone Distance report shows for a demand zone. It is not a buy/sell rating. The decision-score tooltip in the client says the number is a "Ranking aid, not a success probability."

The saved report was V2, daily, Nifty 500, fresh zones, minimum score 80, minimum decision score 80, maximum distance 5%. Demand returned 9 rows. Supply, read with `build=false`, returned 41.

## Entry and stop

On all nine demand rows, the printed entry is the top of the zone and the printed stop is the bottom.

Examples: DIXON zone 10850–10997, entry 10997, stop 10850. COALINDIA zone 382.85–386.25, entry 386.25, stop 382.85. PAGEIND, MRF, and the other five rows follow the same pairing.

For a demand zone in this report, entry is the proximal edge and stop is the distal edge.

## Distance

Distance points equal CMP minus entry. Distance percent equals those points divided by CMP.

DIXON: `(11488 − 10997) / 11488 = 4.27%` (491 points). COALINDIA: `(393.1 − 386.25) / 393.1 = 1.74%` (6.85 points). The same identity holds on the other seven rows.

The same saved report with `zoneType=supply` was already ready (41 rows, `build=false` was not a rebuild). On all 41, entry is the proximal and the zone bottom, stop is the distal and the zone top, and the side is short. Distance percent is `|CMP − entry| / CMP × 100` on all 41. Reward-to-risk is `|target − entry| / |entry − stop|` on all 40 rows that have a target. IEX has a null target and a null reward-to-risk.

Proximity on those 41 rows, plus the earlier demand rows, falls in three bands: `near` at 0.28–0.72%, `watch` at 1.63–2.94%, and `away` from 3.20% upward. Cuts at 1% and 3% fit every saved row. No row sits in the gaps 0.72–1.63 or 2.94–3.20, so the cut is not tighter than that.

## Reward and R

`riskReward` on the payload equals `(target − entry) / (entry − stop)`.

The target price is the server field `target`. It matches the nearest opposing proximal on six of the nine rows. CONCORDBIO, PAGEIND, and TATASTEEL use a target that is not in their opposite-zone list and is not the 100 or 200 EMA. Those three prices are exact daily candle prints: CONCORDBIO opened at 1355.4 on 13 Oct 2026, PAGEIND printed 34425 (high and open on 12 Feb 2026, among other days), and TATASTEEL opened at 190.7 on 4 Aug 2026. The rule that chooses that candle is still open. They are not the nearest high above the current price.

## Decision score

The saved report returns `decisionScore`, `score`, and `htfAdjustment` on each row. On all nine rows, `decisionScore = score + htfAdjustment`.

The adjustment is the sum of higher-timeframe coincidence points. Each match carries `awardedPoints = baseWeight × multiplier`.

| Relationship on the row | Multiplier | What the row showed |
| --- | --- | --- |
| `full`, overlap 100%, fully contained | 1 | EMMVEE weekly: weight 1, points 1 |
| `partial`, ranges overlap, not fully contained | 0.75 | COALINDIA weekly overlap 80.88%: weight 1, points 0.75. PAGEIND weekly overlap 43.01%: the same |
| `near`, overlap 0, with a price gap | 0.4 | TATASTEEL weekly and 6-month matches |

`baseWeight` on the saved reports is 1 for 1w, 2 for 1M, 12 for 3M, and 13 for 6M. PAGEIND is `0.75 + 2 = 2.75`. TATASTEEL is `0.4 + 5.2 = 5.6`. Those sums are the printed HTF adjustments. No yearly match was in the saved rows, so the 1Y weight is still unknown.

The client tooltip calls this a ranking aid, not a success probability. The stored decision score is `min(100, formation score + HTF adjustment)`. On the ready confluence report that cap is visible: TITAN 88.42 + 15, GODFRYPHLP 85.46 + 15, ABBOTINDIA 93.77 + 6.7, and MUTHOOTFIN 95.87 + 13.5 all store 100. The other 14 confluence rows, and all 50 zone-distance rows, sit under 100 and match the uncapped sum.

## Entry, stop, distance, and target

The same payload sets `entry` to `proximal` and `stop` to `distal`. For these demand zones that is the zone top and the zone bottom.

`distance = currentPrice - entry` and `distancePercent = distance / currentPrice × 100`.

`proximity` is a server field. In this report it is `watch` at 1.74% and 2.15%, and `away` from 4.19% through 4.97%. No row falls between 2.15% and 4.19%, so the cutoff is not pinned.

`riskReward = (target - entry) / (entry - stop)`, rounded to two decimals.

`target` equals the nearest opposing zone's proximal price on six rows (DIXON 11594, COALINDIA 420.4, SUPREMEIND 3585.1, RRKABEL 2180, EMMVEE 249.05, MRF 120880). On CONCORDBIO (1355.4), PAGEIND (34425), and TATASTEEL (190.7) the target is not any returned opposite proximal and not the 100 or 200 EMA. Each of those three is an exact daily OHLC print, and the selection rule is still open.

## Context words on the same rows

These are labels in the Context column, not orders:

- Misaligned, "Conflict — Avoid", with text such as "Formation faced 1 uncleared HTF blocker"
- Neutral, "No active HTF interaction"
- Watch, "Confirmation or risk pending"

Moving-average cells show a 100 EMA and a 200 EMA, the percent each sits above CMP, and notes such as "Tested resistance at 100 EMA" or "Broke below 100 EMA". The EMA length and the distance-from-CMP figure are on the page. A custom EMA formula was not recovered.

## Zone Watch status words

The watch page groups saved zones into Reacting, In Zone, Near, Approaching, Watching, Target achieved, and Broken. The only populated bucket was Reacting, with ONESOURCE 13.17% above its demand zone. The setup dashboard's only saved zone, AARTIDRUGS 3M demand, is status `WATCHING` while price is 67.75% above the zone high (`(449 − 144.8) / 449`). Distance alone does not assign these statuses.
