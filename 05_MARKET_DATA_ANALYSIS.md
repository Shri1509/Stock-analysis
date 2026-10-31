# Market data

Candles and the instrument master come from the server. Zone detection is a later step. Fetching candles is not the zone algorithm.

## Instruments

`GET /api/instruments` returns NSE rows. Fields seen: `symbol`, `exchange`, `securityId`, `dhanSecurityId`, `upstoxInstrumentKey`, `segment`, `instrumentType`, `name`, `tickSize`, `lotSize`. The example key for 20MICRONS is `NSE_EQ|INE144J01027`. `dhanSecurityId` was null on the rows inspected. Report universes include Nifty 50, 100, and 500, sector baskets, `all`, and a watchlist of 5.

## Candles

`GET /api/candles` takes `symbol`, `timeframe`, optional `from` and `to`, optional `max=true`, `basis=raw`, optional `warmupBars`, and optional `historicalFocus`.

The last COCHINSHIP daily bar in this session had:

| Field | Value |
| --- | --- |
| time | 1793212200 (unix seconds) |
| open, high, low, close | 1130.4, 1157, 1124.6, 1155.8 |
| volume | 502702 |
| source | historical |

Keys on every bar: `symbol`, `exchange`, `securityId`, `timeframe`, `time`, `open`, `high`, `low`, `close`, `volume`, `source`.

`dataQuality` on that response: status ok, no warnings, 0 duplicates, 0 invalid rows, 0 gaps, 2280 candles, `zonesDisabled: false`. `dataBasis` was `raw`.

Times are stored as unix seconds and displayed in Asia/Kolkata.

## What the candle route does not do

It does not return zones, scores, or targets. Those are `/api/zones/detect` and `/api/reports/*`. Historical load, gap backfill, and repair routes exist in the client and were not called.
