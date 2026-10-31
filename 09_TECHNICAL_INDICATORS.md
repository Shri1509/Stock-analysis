# Technical indicators

The chart indicator list is moving averages only.

## What the dialog contains

Opened from the COCHINSHIP daily chart:

- Title "Indicators", capacity 0/12, and the empty state "No indicators added. Your chart starts clean."
- One action: Add Moving Average.
- MA type: SMA, EMA, RMA / SMMA, WMA, VWMA.
- Source: OPEN, HIGH, LOW, CLOSE, HL2, HLC3, OHLC4, HLCC4.
- Length, offset, timeframe (default "Chart timeframe"), and "Wait for timeframe close".
- Inputs and Style tabs, Cancel, and Apply.

Two SMA 20 rows were created while opening that form and then removed. The list was returned to 0/12. Apply was not clicked. The saved chart state still had `indicators: []` before this check.

The bundle's default moving average is SMA 20 of close. Warmup for an indicator series is capped with `Math.min(1999, ...)`.

## What the report shows besides the chart

Zone-distance and confluence rows include a 100 EMA and a 200 EMA, the percent from the current price, and an event such as `break_below` or `resistance_test`. No custom EMA formula was recovered. Those cells are server fields on the report, not a second indicator engine in the chart dialog.

## Not on the chart

No control or client string adds RSI, MACD, VWAP, Bollinger Bands, ADX, Stochastic, Supertrend, OBV, or Fibonacci. ATR is an input to the zone score. It is not a plotted indicator in this dialog.
