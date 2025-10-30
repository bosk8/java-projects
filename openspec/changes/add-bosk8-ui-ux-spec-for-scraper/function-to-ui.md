## Function-to-UI Mapping

- Backend CLI → UI
  - `--url` (multi): UI Start URLs list input
  - `--max-pages`: Numeric input
  - `--output`: Text input (path)
  - `--format`: Select (csv | jsonl)
  - `--delay-ms`: Numeric input (ms)
  - `--user-agent`: Text input
  - `--respect-robots`/`--no-respect-robots`: Toggle
  - Help: link styled `.link`

### Data Contracts
- Inputs: mirror CLI flags; validation: required `--url`, non-negative numbers
- Outputs: results export CSV/JSONL; download actions from RESULTS

### Error States & Feedback
- Invalid URL: inline error (derived border emphasis; decisions log)
- Network/Robots issues: surfaced in Execution Details logs/meta text
- Success toasts: Use `.card` small pattern (no new colors); text `--text-highlight`
