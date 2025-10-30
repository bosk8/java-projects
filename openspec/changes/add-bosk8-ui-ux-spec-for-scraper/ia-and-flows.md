## Information Architecture

- Top-level: RUNS, EXECUTIONS, RESULTS, SETTINGS
- RUNS
  - New Run
  - Run Templates (future)
- EXECUTIONS
  - Active
  - History
- RESULTS
  - Latest
  - Search/Filter
- SETTINGS
  - Network & Delays
  - Robots.txt policy
  - Output format defaults

## User Flows

### Happy Path: Configure and Run
1. Open RUNS → New Run (button styled per `.copy-btn`/label uppercase)
2. Enter Start URLs (input uses `--surface-card`, `--border-color`, `--r-sm`)
3. Set selectors (container/title/description/url/price/image)
4. Choose format (csv/jsonl), output path
5. Set delay (ms), respect robots (toggle)
6. Start Run → navigates to EXECUTIONS → Active with live status

### Edge Cases
- Invalid selector: show inline error (derived border emphasis; log in decisions)
- Robots disallow: show warning in execution details (meta text `--text-subtle`)
- Rate limited: suggest increasing `--delay-ms` in SETTINGS
