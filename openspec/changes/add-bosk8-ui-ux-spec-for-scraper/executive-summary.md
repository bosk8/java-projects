## Executive Summary

- Goals: Provide a Bosk8-styled admin UI to configure runs, monitor executions, and review/export data for the Simple Web Scraper. Enforce strict adherence to `style.md` for visuals and interactions.
- Primary personas:
  - Operator: sets up scraping jobs, monitors status, reviews results.
  - Developer: integrates CLI/automation, verifies configurations, exports data.
- Major flows:
  - Configure run → validate selectors → start run → monitor → export results (CSV/JSONL).
  - Inspect execution → view logs/errors → retry or adjust delay/user-agent.
- Constraints:
  - Single source of truth: `style.md` tokens (colors, spacing, typography, motion, radii).
  - Accessibility WCAG 2.2 AA; visible focus, keyboard flows.
  - No backend changes to Java core; UI is additive.
