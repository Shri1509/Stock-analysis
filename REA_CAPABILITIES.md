# REA capabilities for this investigation

REA 6.8.0 is a local analysis tool. For a website it can observe page structure, scripts, and network traffic, and it can replay a saved HAR. It does not compute supply and demand zones. Those calculations belong to C&C Financials.

## What is usable now

| Capability | State | Use on this target |
| --- | --- | --- |
| Cursor browser | Working | Sign-in, page map, screenshots, same-origin `fetch` of APIs the session is allowed to call |
| Frontend bundle inspection | Done for the current build hash `index-D_5P6cfL.js` | Routes, V2 scorer, quality labels, timeframes, indicator schema |
| REA MCP tools (`capture_browser_scenario`, `inspect_web_network_capture`, and the rest) | Not connected | Doctor says the Cursor registration is stale, and live tool discovery failed |
| HAR / SAZ inspection | Available later through the REA CLI once a capture file exists | Compare recorded responses without calling the site again |
| Native decompilers | Not installed | Not applicable to this web app |
| Server-side V3 detector source | Not in the browser bundle | Must be inferred from API outputs, or read only if a server tree is provided |

## What REA should not be asked to do here

- REA will not replace the zone algorithm. The algorithm is in the target, split between the V2 client and the V3 API.
- Re-running `rea setup` without care would rewrite `%USERPROFILE%\.cursor\mcp.json` and can drop the Node 24.22.2 `PATH` prefix. That prefix is what lets the server start on this machine.

## Gap

To use REA's own browser capture, reload the `rea` MCP server in Cursor after the registration is accepted as aligned. Until that connection is up, the Cursor browser remains the evidence source.
