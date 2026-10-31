# Candlestick patterns

The candles are ordinary OHLC bars. The pattern names on the chart are zone formations, not a textbook candlestick scanner.

## Letters

R is a rally, D is a drop, and B is a base. The labels in use are RBR, DBR, DBD, RBD, and the shorter DR, RD, BD, and BR. V2 text in the client builds the sentence from those directions: a bullish leg-out creates a demand zone, and a bearish leg-out creates a supply zone. "No Leg-In" is the higher-timeframe base-then-departure case.

The client classifies each candle before it searches for a zone. Body ratio is `|close − open| / range`. A body under 0.35 is the small-body flag. An impulsive candle has body ratio at least 0.55 and a range at least 97% of the rolling median. A base candidate has body ratio at most 0.50, with continuation and tight-consolidation alternatives at 0.48 and 0.65. The leg-out flag requires a body of at least 0.35 plus an impulse or a gap in the candle's direction. The pattern name is leg-in direction, `B`, leg-out direction (`RBR`, `DBR`, `DBD`, `RBD`). No leg-in produces `BR` on demand and `BD` on supply. The numeric gates are in `06_SUPPLY_DEMAND_ALGORITHMS.md`.

## V3 roles

A V3 zone assigns each candle one role: arrival, origin, leg-in, base, leg-out, confirmation, or a single guarded pause. Authenticity requires the roles to be exclusive and contiguous, the base ranges to overlap, and the first directional departure body to be at least 50% of its range. A pause does not fail those checks. It changes role clarity from 15 to 12.

## Not found

Doji, hammer, engulfing, pin bar, morning star, and the other named candlestick patterns do not appear as detectors.
