# Website map

Target: [C&C Financials](https://landowner-outweigh-olive.ngrok-free.dev/). Signed in as the provided trader account on 2026-10-30. The password is not recorded here.

The shell is one page. Tools open with `?view=`. Several cards also call `window.open` so a tool can sit in its own tab.

## Session

| Item | Evidence |
| --- | --- |
| Sign-in | `POST /api/auth/login`. The form says credentials stay on the server and are not stored in the browser. |
| Session check | `GET /api/auth/me` returned `role: trader`, `sessionActive: true`, `mustChangePassword: false`. |
| CSRF | Mutating requests read a `cc_financials_csrf` cookie and send `X-CSRF-Token`. A 401 dispatches `cc-auth-required`. |
| Provider | `providerStatus.state = configured`, `source = environment`, `syncStatus = ready`. |

## Pages

### Home

- URL: `/`
- Purpose: launcher for the market workspace.
- Controls: Tools menu, theme (Dark/Light), change password, sign out, Services menu.
- Cards, each described as opening a new tab:
  - Chart. Last symbol shown on the card: COCHINSHIP, 1d.
  - Zone Distance Report. Stocks closest to qualified demand and supply zones.
  - Zone Confluence Report. Lower-timeframe zones aligned with higher-timeframe areas.
  - Zone Watch. Saved zones, distance, touches, alerts.
  - Setup Dashboard. HTF reactions, execution stocks, reacting indices.

### Chart

- URL observed: `/?view=chart&symbol=COCHINSHIP&timeframe=1d`
- Title observed: `COCHINSHIP 1D Chart — C&C Financials`
- Purpose: price, volume, and demand/supply zones for one symbol.
- Inputs: symbol search, timeframe buttons, detector, zone filters, indicator dialog, zoom and scale.
- Outputs observed on COCHINSHIP 1D, 29 Oct 2026: O 1130.40, H 1157.00, L 1124.60, C 1155.80, Vol 502,702, +25.40 (+2.25%). Status line: historical loaded, Detector V3. A supply zone label read `SZ RBD F 47.23 / HTF +1 / D 48.23` (supply, rally-base-drop, fresh, formation score 47.23, HTF count +1, decision score 48.23).
- Timeframe buttons: 5min, 15min, 60min, 75min, 125min, 240min, 1D, 1W, 1M, 3M, 6M, 1Y.
- Chart options (opened):
  - Detector: `V2 — current production rules` or `V3 — structure-first preview`. The open chart was on V3.
  - Saved zones: Hidden, Current timeframe, Higher timeframes, All. Value was Hidden, count 0.
  - Minimum decision score: Off, 50+, 60+, 70+, 75+, 80+, 85+, 90+.
  - Zone side: All, Demand, Supply.
  - Fresh only (checked). The panel said 453 zones were excluded by Fresh only, and that detection and visibility are evaluated separately.
  - Quality checkboxes: Perfect, Good, Average.
  - Minimum formation score slider (value 0).
  - Nearest zones: All, 5, 10, 20, 50.
  - Market context: Off, Aligned first, Aligned only.
- Other controls: zoom in/out, reset date scale, fit content, price scale Auto, reset price scale, reset chart, Indicators, Zone details.
- Disabled in code, not offered as working controls: percent scale and log scale (`Future: percentage scale`, `Future: log scale`).
- Direct navigation to `/chart/COCHINSHIP` did not render this chart. That path is an API used by the client (`/chart/:symbol`), not the page route.

### Zone Distance Report

- Opened from the home card and the Tools menu. Header text in the bundle: "Stocks closest to tradeable demand and supply zones."
- API: `GET /api/reports/zones`.
- Saved preferences (`/api/user/tool-state`, key `zones`): universe `nifty500`, fresh only, minimum score 80, minimum decision score 80, purpose `DIT`, context mode off, variant HTF 1d / ITF 60m / LTF 15m, detector `v2`, zone type demand, max distance 5 percent, sort by score descending.
Opened at `/?view=zones&symbol=COCHINSHIP&timeframe=1d`. The saved run on screen was V2, 1D, demand only, max distance 5%, context Structural only, min score 80, min decision score 80+, universe Nifty 500, fresh zones. Status line: ready, scanned 497, with data 496, 9 rows, sorted by score descending. Columns: Stock, Side, CMP, Distance, Zone, Score, Decision, R:R, Origin, Opposite Zone, HTF Reaction, Context, Moving Averages. Trade geometry from those rows is in `13_TRADING_SIGNAL_ENGINE.md`. Build Report was not clicked.

### Zone Confluence Report

- Header text: "Lower timeframe zones overlapping higher timeframe decision areas."
- API: `GET /api/reports/confluence`.
- Saved preferences: universe `nifty500`, fresh only, purpose `MIT`, detector `v2`, HTF 1M / ITF 1w / LTF 1d, minimum LTF score 78, minimum HTF score 48, zone type demand, minimum overlap 1 percent, max distance 10 percent.
Opened at `/?view=confluence&symbol=COCHINSHIP&timeframe=1d`. Saved run: V2 baseline, purpose choices are the HIT through YIT list, zone type All/DZ/SZ, min overlap %, max distance %, context, min LTF score, min HTF score, min decision score, universe, fresh zones. Status: ready, scanned 497, with data 490, 18 rows, updated 29 Oct 2026. Columns include Coincidence, HTF zone, HTF score, LTF zone, LTF score, Decision, LTF overlap, Distance, R:R. On INOXWIND and TITAN the LTF zone sat inside the monthly zone, LTF overlap was 100%, and HTF overlap equalled the LTF range divided by the HTF range (1.65/7.7 = 21.43% and 62.4/441.2 = 14.14%).

### Zone Watch

- Purpose from the home card: saved zones, current distance, touches, and alerts.
- API family: `/api/zone-watch` and `/api/zone-watch/:id/trade-plan/attachments`.
- The client checks a trade plan as valid only when entry, stop, and target1 are ordered correctly: for demand, stop < entry < target1; for supply, stop > entry > target1. Risk is `abs(entry - stop)`.
Opened at `/?view=zone-watch`. Header: "Track saved demand and supply zones, touches and alerts." Feed said live connected, 4 alerts. Counts on screen: Reacting 1, In Zone 0, Near 0, Approaching 0, Watching 0, Target achieved 0, Broken 0. Filters include distance bands under 0.5%, 1%, 2%, and 5%, priority High/Medium/Low, freshness Fresh/Tested/Multiple tests, and the same timeframe list as the chart. The one visible row was ONESOURCE, demand, 1d, range 1316.4–1375.7, CMP 1584.3, 13.17% above, status Reacting, tested, medium priority, 1 touch. `(1584.3 − 1375.7) / 1584.3 = 13.17%`, the same distance-over-CMP measure as the zone report. The chart's saved-zone display was still Hidden with count 0; this watch list is a separate saved set.

### Setup Dashboard

- URL: `/?view=dashboard`
- Purpose: saved zones grouped as HTF Reacting Stocks, Best Execution Stocks, and HTF Reacting Indices. The empty groups say to double-click a chart zone and choose "Add to dashboard."
- The one saved item is AARTIDRUGS, 3M demand, range 105.25–144.8, CMP 449, 67.75% above, status Watching. Logos are loaded from Logo.dev.

### Backtesting

- Present in the Tools menu.
- URL pattern seen in the bundle: `/?view=backtesting` is the view name used by operations links of the form `/?view=operations&type=backtest&id=...`.
- Default form state in the bundle: scope universe, universe `nifty500`, timeframe `1d`, from `2000-01-01`, through today in `Asia/Kolkata`, zone type all, min quality any, fresh only, min score 62, target R 2, stop buffer 0.1 percent, initial capital 1,000,000, risk 1 percent, slippage 5 bps, cost 10 bps, purpose `MIT`, detector `v2`.
- Run id string in the client: `dz-v2-prefix-replay-28-htf-single-origin-pivot`.
- APIs: `/api/backtests`, pause, resume, and results.
- The form has not been submitted. No backtest was started.

### Operations and logs

- Tools menu item.
- Deep links: `/?view=operations&type=loader|report|backtest&id=...`.
- APIs: `/api/operations/jobs`, `/api/loader/health`, `/api/loader/runs/:id`, `/api/recovery/jobs`, `/api/admin/operations/server-logs` (admin).
- Not clicked through yet.

### Account

- Change password: `POST /api/auth/change-password`. Not used.
- Sign out: `POST /api/auth/logout`. Not used.

## Timeframe model

The chart and the client share one timeframe list:

`5m`, `15m`, `60m`, `75m`, `125m`, `240m`, `1d`, `1w`, `1M`, `3M`, `6M`, `1Y`.

There is no separate 30-minute or 4-hour button. 240 minutes is the four-hour bar. Bar duration and the session calendar use `Asia/Kolkata`.

## Multi-timeframe purposes

These are named setups in the client, not guesses:

| Code | Name | Higher | Intermediate | Lower |
| --- | --- | --- | --- | --- |
| HIT | Hourly Income Trade | 60m, 75m | 15m | 5m |
| DIT | Daily Income Trade | 1d | 60m, 75m | 15m |
| WIT | Weekly Income Trade | 1w | 1d | 60m, 75m, 125m, 240m |
| MIT | Monthly Income Trade | 1M | 1w | 1d |
| QIT | Quarterly Income Trade | 3M | 1M | 1w |
| HYIT | Half-Yearly Income Trade | 6M | 3M | 1M |
| YIT | Yearly Income Trade | 1Y | 6M | 3M |

Chart saved state uses purpose `MIT` with context mode off. The zone-distance saved state uses `DIT`.

## Universes

`GET /api/report-universes` returned Nifty index baskets (`nifty50`, `nifty500`, `nifty100`, sector baskets, `nseindices`), `all`, and `watchlist` with a count of 5. The instrument list is large (the JSON body was about 766 KB) and each row has `symbol`, `exchange`, `upstoxInstrumentKey`, `segment`, `instrumentType`, `name`, `tickSize`, and `lotSize`.

## Zone details drawer

The chart's Zone details control opens a picker of detected zones, then a panel for the chosen zone. On the COCHINSHIP daily RBR demand at 118.10–122.00 the panel showed:

- Type, pattern, quality, formation date (08 Jun 2020), source `detected`, marking `normal-base`.
- Proximal 122.00, distal 118.10, width 3.90.
- A canonical id, `v3-canonical-1d-demand-base-1591554600-122-118.1`, and the line "One tradable zone per equivalent origin." Six same-confirmation alternatives were listed as diagnostic evidence, not extra zones. They were BR readings of the same origin with different modes and scores.
- Formation mode `v3_structural_arrival`, roles Leg-In / Base / Leg-Out, dates for each role, measured evidence, the seven score components, the marking sentence, gap "none (0× median)", departure strength 1, and prior structure achieved.
- The same ten authenticity checks the API returns, each marked Passed.
- Current status: CMP 1,155.80, position Above zone, nearest boundary 1,033.80. That figure is the current price minus the proximal (`1155.80 − 122.00`). Freshness fresh, 0 touches, tradeable yes.
- Buttons to copy a summary and to add the zone to one of the three dashboard groups.
- The sentence "Scores describe programmed criteria. They are not a success probability or trading guarantee."
- A detector-score block that said details were unavailable for this stored reference.

## Not yet opened in full

The backtest form after a run, Operations logs, and the Indicators dialog. Zone Distance, Confluence, Zone Watch, Setup Dashboard, and the zone-details drawer have been opened. Build Report was not started.
