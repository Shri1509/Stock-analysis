# Progress log

## 2026-10-30

- Inspected the StockAnalysis folder. It was empty. REA is installed as `rea-agents` 6.8.0 plus skill version 49, not as a clone inside this repo.
- REA MCP did not connect. `rea doctor --client cursor` reports the registration stale after the Node 24.22.2 PATH fix. Analysis continued in the Cursor browser.
- Signed in through the site form. Credentials were not written to disk.
- Mapped the home shell and the COCHINSHIP 1D chart, including chart options.
- Read the frontend bundle `index-D_5P6cfL.js` for routes, timeframes, purposes, the V2 score table, and API query builders.
- Called `GET /api/zones/detect` for COCHINSHIP 1d V3. Saved a tally and one slim zone in `samples/cochinship-1d-v3-zone-summary.json`. The 7 MB payload was not stored.
- Wrote the architecture, capability, plan, website map, API, supply-demand, and unknown notes in this folder.

## 2026-10-30, continued

- Checked all 491 COCHINSHIP daily V3 zones. Score is the sum of components. Compactness is `baseCompactness × 20`. Departure is `departureStrength × 25`. Prior structure is 15 or 0 with `structureBreak`. Origin is 5 or 0 with `originConfirmation`. Gap points were 5 only on pro-trend gaps. Role clarity and close-break distance are still open. Counts are in `samples/v3-score-checks.json`.
- Read the V2 default config and the higher-timeframe set `1w`, `1M`, `3M`, `6M`, `1Y`.
- Opened Zone Distance (`?view=zones`), Confluence (`?view=confluence`), and Zone Watch (`?view=zone-watch`). Did not click Build Report.
- On nine demand rows, entry is the zone high, stop is the zone low, distance is `(CMP − entry) / CMP`, and decision score is formation plus the HTF adjustment. Target selection matches the first opposite zone on six rows and not on three.
- Wrote `12_MULTI_TIMEFRAME_ANALYSIS.md` and `13_TRADING_SIGNAL_ENGINE.md`.

## 2026-10-30, third pass

- Read the saved zone-distance payload (`build=false`, nine rows). Entry is proximal, stop is distal, distance is `(CMP − entry) / CMP`, and R is `(target − entry) / (entry − stop)`.
- HTF adjustment is the sum of `baseWeight × multiplier`. Multipliers on these rows are 1 (full overlap), 0.75 (partial), and 0.4 (near, with a gap). Decision score equals formation score plus that sum. Sample: `samples/htf-coincidence-points.json`.
- Six targets match the nearest opposing proximal. CONCORDBIO, PAGEIND, and TATASTEEL do not, and those targets are not the 100 or 200 EMA.
- Opened `/?view=dashboard`. One saved zone: AARTIDRUGS 3M demand, status Watching, 67.75% above the zone.
- V3 close-break still does not fit a single ATR rule. 231 of 375 uncapped zones match some base-candle ATR; 144 do not.

## 2026-10-30, fourth pass

- V3 close-break matches all 491 COCHINSHIP daily zones. With a base, points are the confirmation close beyond the base high or low, divided by the upper median of the base ATRs, times 15, capped at 15. With no base, the edge is the proximal and the ATR is the first leg-out candle.
- Role clarity is 12 when the formation has a departure pause and 15 when it does not. The split is 12 and 479, with no exceptions on this file.
- Saved reports award base weights 1, 2, 12, and 13 for 1w, 1M, 3M, and 6M. No yearly match was in those reports.
- CONCORDBIO 1355.4, PAGEIND 34425, and TATASTEEL 190.7 are exact daily OHLC prints. They are not the nearest high above price. The candle-selection rule is still open.
- Opened the zone-details drawer on the COCHINSHIP RBR demand at 118.10–122.00. The panel shows one canonical zone plus diagnostic alternatives, the score components, and a status block.

## 2026-10-30, fourth pass continued

- V3 compactness matches all 491 zones: `clip(1 − (width / ATR) / 2) × 20`.
- V3 departure matches all 364 zones that have a base: the open-to-close leg-out move divided by `ATR × 1.5`, clipped at 1. It misses 126 no-base DR and RD zones.
- V2 achievement points (1.2, 1.6, 0.9, 0.4) and the zone-edge function `Wa` are in the bundle. The score width limit is 4 or 1.8.
- The saved supply report (41 rows, `build=false`) uses entry at the zone low and stop at the zone high. Distance and reward-to-risk match. One row, IEX, has no target.
- Proximity on the saved rows fits cuts near 1% and 3%, with two gaps that contain no row.
- The indicators dialog is moving averages only, capped at 12. Rows opened while reading it were removed.
- Wrote the remaining numbered notes, 03 and 05 and 07 through 11, plus 14 through 17, 19, and 20.

## 2026-10-30, V2 candle classes

- Transcribed `Xw` and `Kw` from the bundle. A candle is impulsive, a base, a leg-in, or a leg-out from body ratio, the rolling range median, and gaps. Pattern names are leg-in direction + `B` + leg-out direction. No leg-in is `BR` or `BD`.
- No-base V3 departure still fails. Those zones store `confirmationDistance`, `originWidth`, and two body ratios. The distance divided by the strength is not the width, the ATR, or the span.

## 2026-10-30, structure break and targets

- A leg-out wick through the high or low of the previous 22 daily bars matches `structureBreak` on 484 of 491 COCHINSHIP zones. Seven zones disagree, so the rule is not closed.
- Unmatched report targets are not a proximal of any returned opposite zone. They are also not the highest high between the entry and that zone. CONCORDBIO, PAGEIND, and TATASTEEL remain exact daily prints without a selection rule.

## Next session

About 10% remains: the no-base V3 departure ratio, target selection, the 1Y weight, the decision-score cap, Zone Watch status, and the 7 structure-break misses. Do not start Build Report or a backtest.
