# Project architecture

Date: 2026-10-30. Status: initial inspection, before any reconstruction code.

## Workspace

`c:\Users\Mahesh\Desktop\StockAnalysis` had no application source, no `package.json`, and no git history when this work started. REA was not cloned into this folder. It is installed as a user-level agent tool.

Nothing in this workspace previously implemented market data, zone detection, or a trading UI. Reconstruction code, if written later, will be new project code. It should not be dropped inside the REA package.

## How REA is installed

| Piece | Location | Version |
| --- | --- | --- |
| npm package | `rea-agents`, launched with `npx -y rea-agents@6.8.0` | 6.8.0 |
| Node used by REA | `%LOCALAPPDATA%\rea-node\node-v24.22.2-win-x64` | 24.22.2 |
| System Node | `C:\Program Files\nodejs` | 24.17.0, below REA's engine requirement |
| Cursor registration | `%USERPROFILE%\.cursor\mcp.json`, server name `rea` | command adjusted so the supported Node is first on `PATH` |
| Skill | `%USERPROFILE%\.agents\skills\reverse-engineer-anything` | skill version 49, 229 tools described |

`rea doctor --client cursor` reports the skill as aligned and the Cursor registration as **stale**, because the launch command was edited after setup so REA would not start on Node 24.17.0. In this session the `user-rea` MCP server failed during tool discovery, so REA's browser and capture tools were not available. Website evidence below comes from the Cursor browser and from the site's own frontend bundle, not from an REA Evidence record.

Native engines (Ghidra, IDA, Hopper, Kuna, JADX) are not installed. They are not required for this website.

## Target

Authenticated workspace at `https://landowner-outweigh-olive.ngrok-free.dev/`, title **C&C Financials**.

It is a single-page React application. The shell is one module bundle, `/assets/index-D_5P6cfL.js` (about 699 KB), plus `/assets/index-VzkoQAKI.css`. Charts are drawn with TradingView Lightweight Charts. Market instruments carry Upstox keys (`upstoxInstrumentKey`, `NSE_EQ|...`) and an optional unused `dhanSecurityId`. Session bootstrap reports `providerStatus.source = "environment"` and `syncStatus = "ready"`.

Pages are not separate URLs. Tools are selected with a `view` query parameter, for example `/?view=chart&symbol=COCHINSHIP&timeframe=1d`.

## Boundary that matters for reconstruction

Two detectors are exposed in the chart options:

- **V2 — current production rules.** A full detector and scorer ship inside the frontend bundle. The score weights and quality thresholds are readable there.
- **V3 — structure-first preview.** The chart's saved state and the live COCHINSHIP daily chart use V3. Detection is returned by `GET /api/zones/detect?version=v3` with `algorithmVersion` `dz-v3-canonical-6`. The server returns formation candles, authenticity checks, and score components. The V3 source that builds those components is not in the frontend bundle.

V2 formulas must not be treated as the V3 formula. The chart currently on screen is V3.
