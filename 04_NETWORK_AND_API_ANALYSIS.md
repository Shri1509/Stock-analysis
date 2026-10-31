# Network and API analysis

Calls below were made in the signed-in browser session, or read from the frontend that issues them. Login and CSRF values are omitted.

## Where work happens

| Work | Where | Evidence |
| --- | --- | --- |
| Candle history | Server | `GET /api/candles` |
| Instrument master | Server | `GET /api/instruments`. Keys are Upstox instrument keys. `dhanSecurityId` was null on the rows inspected. |
| V3 zone detection | Server | `GET /api/zones/detect` returned `algorithmVersion: dz-v3-canonical-6` and the zones. The bundle has no `demandZone` identifier and no `algorithmVersion` string. |
| V2 zone detection and score | Browser | The bundle contains the detector, the 100-point weight table, and the quality sentences. Chart options call this "current production rules." |
| Zone reports and confluence | Server, with the detector version sent by the client | Query includes `detectorVersion`, defaulted to `v2` in the client helpers. |
| Moving averages | Browser | Indicator objects are `kind: "moving_average"` and are stored in chart tool state. The saved chart state had `indicators: []`. |
| Live socket | Not established in this pass | The bundle mentions `WebSocket` three times. No socket URL was captured from the home or chart load. |

## Authentication

| Endpoint | Method | Role |
| --- | --- | --- |
| `/api/auth/bootstrap-status` | GET | Loaded before the form. |
| `/api/auth/login` | POST | Creates the session. Body not stored. |
| `/api/auth/me` | GET | Returns user id, login id, role, password-change flag, and provider status. |
| `/api/auth/logout` | POST | Sign out. |
| `/api/auth/change-password` | POST | Password change. |

`GET /api/auth/me` example, with no secrets in the payload:

```json
{
  "user": { "id": 200, "loginId": "pradyumn.m", "role": "trader", "mustChangePassword": false },
  "providerStatus": {
    "state": "configured",
    "source": "environment",
    "externallyValidated": false,
    "expiresAt": null,
    "syncStatus": "ready"
  },
  "sessionActive": true
}
```

## Market data

### `GET /api/instruments`

Returns `{ instruments: [...] }`. Fields seen: `id`, `symbol`, `exchange`, `securityId`, `dhanSecurityId`, `upstoxInstrumentKey`, `segment`, `instrumentType`, `name`, `tickSize`, `lotSize`. Example key: `NSE_EQ|INE144J01027` for `20MICRONS`.

### `GET /api/candles`

Client query builder:

- `symbol`, `timeframe`
- optional `from`, `to`
- optional `max=true`
- `basis=raw` always set by this helper
- optional `warmupBars`
- optional `historicalFocus=true`

This returns raw candles. It is not the zone algorithm.

### Historical maintenance

`POST /api/historical/load`, `POST /api/historical/load-all`, `GET /api/historical/status`, `GET /api/historical/gaps`, `POST /api/historical/backfill-gaps`, `POST /api/historical/repair-derived`, `GET /api/historical/runs/:id`.

These are data jobs. They were not executed.

## Zone detection

### `GET /api/zones/detect`

Client call for V3:

`symbol`, `timeframe`, `version=v3`, `asOf` (millisecond timestamp).

COCHINSHIP, `1d`, `version=v3` returned HTTP 200, about 7.0 MB, 491 zones. Top-level keys: `version`, `algorithmVersion`, `asOf`, `zones`.

Each zone's own fields:

`id`, `detectorVersion`, `confirmedAt`, `type`, `pattern`, `quality`, `score`, `startTime`, `endTime`, `legOutTime`, `top`, `bottom`, `proximal`, `distal`, `baseStartIndex`, `baseEndIndex`, `legOutIndex`, `freshnessState`, `touchCount`, `isTradeable`, `markingBasis`, `formationDetails`.

`formationDetails` carries the candles used as arrival, origin, base, leg-in, and leg-out, plus `measuredEvidence`, `qualityEvidence.scoreComponents`, `authenticity` checks, and `alternativeFormations` that were rejected. A tally and one slim zone are in `samples/cochinship-1d-v3-zone-summary.json`.

### `GET /api/zones/context`

Query: `symbol`, `timeframe`, `purpose`, `detectorVersion` (default `v2` in the helper), plus variant fields. Context mode `off` sends only `contextMode=off`. Otherwise the client sends `purpose` and `htf`, `itf`, `ltf`.

Not called in this pass. The chart context control offers Off, Aligned first (`rank`), and Aligned only (`aligned_only`).

## Reports

### `GET /api/report-universes`

`{ universes: [{ key, label }] }`. Includes Nifty baskets, `all`, and `watchlist`.

### `GET /api/reports/zones`

Query built by the client: `timeframe`, `freshOnly`, `minScore`, `maxDistancePercent`, `zoneType`, `universe`, `build`, `detectorVersion`, optional `minDecisionScore`, and the context fields from the purpose variant.

### `GET /api/reports/confluence`

Query: `purpose`, `zoneType`, `minLtfScore`, `minHtfScore`, `freshOnly`, `minScore`, `minOverlapPercent`, `maxDistancePercent`, `universe`, `build`, `detectorVersion`, optional `minDecisionScore`, and context fields.

Pause, resume, and cancel exist as `POST /api/reports/:id/pause|resume` and `POST /api/reports/:id/cancel` for the `zones` and `confluence` report names. They were not called.

## Other session endpoints seen on the home load

- `GET /api/user/tool-state` and `PUT /api/user/tool-state/:tool` with a version number (3 for chart and zones, 2 for confluence and preferences).
- `GET /api/recovery/jobs`, polled several times from the home page.
- `GET /api/dashboard/items` and item create/update/delete.
- `GET /api/zone-watch`.
- `GET /api/activity/events` and admin user/activity routes. The signed-in role is `trader`, so admin routes were not called.

## What is not an algorithm

`/api/candles` and `/api/instruments` deliver market data. `/api/zones/detect` delivers calculated zones. The V2 score is calculated again in the browser when that detector is selected. Report endpoints apply filters (`freshOnly`, scores, distance, overlap) on top of a chosen detector. Filtering is not the same step as detection.
