# Support and resistance

This site's support and resistance are the demand and supply zones. There is no separate pivot, floor-trader, or Fibonacci level engine in the client or in the zone payload.

## Edges

`Wa` in the V2 client sets proximal to the top of a demand zone and the bottom of a supply zone. Distal is the other edge. The saved reports use those edges as the order prices:

- Demand: entry is the proximal (zone high), stop is the distal (zone low). Checked on 9 rows.
- Supply: entry is the proximal (zone low), stop is the distal (zone high). Checked on 41 rows.

V3 zones on COCHINSHIP follow the same proximal convention on the samples that were opened.

## How a level is invalidated

V2 freshness walks later candles. A demand zone is broken when a candle closes below the lower edge. A supply zone is broken when a candle closes above the upper edge. A wick through the zone without that close is `tested_by_wick`. Details are in `06_SUPPLY_DEMAND_ALGORITHMS.md`.

## What is not a support method here

Classic pivot points, Camarilla, swing-high markers drawn apart from zones, and Fibonacci retracements were not found as detectors. A report target sometimes equals the nearest opposite zone's proximal, and sometimes equals a daily OHLC print instead. That target rule is still open. It is not a Fibonacci projection.
