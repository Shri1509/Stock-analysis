# Reverse-engineering plan

The goal is to reproduce the site's observable zone, scoring, and trade-plan behavior. The UI is only the surface that exposes those outputs.

## Confirmed split of responsibility

1. **Market data** is loaded from the server (`/api/candles`, `/api/instruments`, `/api/historical/*`). Instruments are NSE equities and indices keyed for Upstox. Candles include `basis=raw`.
2. **V2 zone detection and the 100-point score** run in the browser bundle. The chart labels this detector "current production rules."
3. **V3 zone detection** runs on the server (`/api/zones/detect`, algorithm `dz-v3-canonical-6`). The chart labels it "structure-first preview" and the saved chart state currently selects it.
4. **Reports** (`/api/reports/zones`, `/api/reports/confluence`) default the client to `detectorVersion=v2` unless the saved tool state says otherwise.
5. **Moving averages** (SMA, EMA, RMA, WMA, VWMA) are a client indicator. No RSI, MACD, VWAP, Bollinger, Supertrend, or candlestick-pattern detector has been found in the bundle. Those names stay off the confirmed list.

## Next phases, in order

1. Walk every `view` (zone distance, confluence, zone watch, setup dashboard, backtesting, operations) and record controls. One page is still only known from the home card and the API, not from a full interaction pass.
2. Save sanitized response schemas for candles, zone context, both reports, and one backtest definition. Do not store cookies or the login body.
3. Finish the V2 client reconstruction from the bundle: pattern rules (RBR, DBR, DBD, RBD, and the shorter forms), base marking (`normal-base`, `exceptional-leg-in`, `exceptional-leg-out`), and the score function already extracted.
4. Treat V3 as a separate engine. Use the returned `authenticity` checks, `measuredEvidence` thresholds, and `scoreComponents` as the specification. Fit constants only where several zones match to the reported precision. Label anything else as a hypothesis.
5. Compare V2 and V3 on the same symbol and timeframe. The chart already shows they are different products.
6. Only after those comparisons, implement testable modules and score them against the live API. Do not claim a match the tests do not show.

## Rules already in force

- Credentials stay in the browser session. They are not written into source or these notes.
- A field name in an API is not a formula.
- V2 weights are not reused as the V3 formula.
- Indicators are included only when the bundle or the UI contains them.
