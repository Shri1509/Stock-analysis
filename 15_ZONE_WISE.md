# Zone ranking

Zones are ranked by the detector score and, on reports, by the decision score. There is no separate letter grade beyond the quality words.

## Quality

V2, from the client strings:

| Label | Rule |
| --- | --- |
| perfect | score ≥ 78 and achievement ≥ 1.8 |
| good | score ≥ 78 with achievement below 1.8, or score ≥ 62 |
| average | score ≥ 48 and below 62 |
| weak | score below 48 |
| broken | a completed candle closed beyond the distal |

V2 `isTradeable` requires score ≥ 48, score ≥ `minZoneScore` (default 48), and freshness `fresh`.

V3 returns the same quality words. On COCHINSHIP daily the counts were 62 perfect, 268 good, and 161 average. Tradeable was 63 of 491. The V3 score is the sum of its seven components, capped in practice by those components' own ceilings (departure 25, close-break 15, role clarity 15, prior structure 15, origin 5, gap 5, compactness 20).

## Report order

The saved zone-distance view sorts by score descending. Decision score on every demand row (9) and every supply row (41) equals the formation score plus the HTF adjustment. The displayed score column rounds the formation score (91.74 prints as 92).

Freshness multiplies the V2 freshness component by 1, 0.75, 0.45, or 0 for fresh, tested by wick, closed inside, and broken by close. A broken zone can still be listed. The fresh-only filter on the chart hid 453 of 491 COCHINSHIP V3 zones without deleting them.

## Distance bands

On the saved reports, proximity is `near` below about 1%, `watch` from there to about 3%, and `away` above about 3%, inside a report that already stops at 5%. The gaps with no rows are noted in `13_TRADING_SIGNAL_ENGINE.md`.
