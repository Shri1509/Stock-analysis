# System architecture

C&C Financials is a React client on this origin. Charts use TradingView Lightweight Charts. The signed-in role used here is `trader`. Session cookies and the CSRF header stay in the browser. They are not part of the trading logic.

## Flow

1. The client loads NSE instruments and raw candles (`/api/instruments`, `/api/candles`). Candles carry OHLC and volume. Times are unix seconds, shown in Asia/Kolkata.
2. V2 detection and the 100-point score run in the browser. The chart calls this "current production rules." The score, the zone edges, the achievement points, and the freshness walk are in the shipped bundle.
3. V3 detection runs on the server (`/api/zones/detect`, `dz-v3-canonical-6`). The chart calls this "structure-first preview." The saved chart uses V3. Saved reports default to V2.
4. Zone-distance and confluence reports are server queries. `build=false` reads a saved result. Decision score is the formation score plus higher-timeframe coincidence points.
5. Zone Watch and the setup dashboard store zones the user keeps. Their status fields (`REACTING`, `WATCHING`) are not the same thing as the report proximity bands.
6. Moving averages are optional chart overlays, at most 12. They are not inputs to the zone score. The 100 and 200 EMA on a report row are server fields.

## Two scores, on purpose

V2 weights sum to 100 before bonuses: 12, 11, 16, 14, 8, 22, 9, 8. V3 weights are compactness × 20, departure × 25, and fixed blocks of 15, 15, 15, 5, and 5. A V2 weight must not be reused as a V3 weight. The COCHINSHIP chart and the Nifty 500 report are different detectors until the query says otherwise.

## Order geometry

The report does not emit buy, sell, or hold. It emits an entry at the proximal, a stop at the distal, a target, a distance from the current price, and a reward-to-risk ratio. Demand is the long side of that geometry. Supply is the short side. The zone-details panel states that the score is not a probability.

## Still outside this picture

The server source for V3 is not in the bundle. The no-base departure ratio, the non-proximal target, the yearly weight, and the Zone Watch status machine are the open formulas. They are listed in `18_UNKNOWN_AND_UNCONFIRMED_LOGIC.md`.
