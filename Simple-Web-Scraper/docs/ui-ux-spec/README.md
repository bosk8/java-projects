# UI/UX Specification Documentation

Complete UI/UX specification for Simple Web Scraper web application, strictly adhering to Bosk8 Design System (`style.md`).

## Structure

```
docs/ui-ux-spec/
├── README.md                    # This file
├── UI-UX-SPEC-INDEX.md         # Quick reference index
├── executive-summary.md         # Goals, personas, flows, constraints
├── ia-and-flows.md             # Information architecture & user flows
├── function-to-ui.md           # API endpoints → UI mapping
├── navigation.md               # Navigation & routing model
├── accessibility.md             # WCAG 2.2 AA compliance checklist
├── style-compliance-matrix.md  # Token usage per component
├── style-decisions-log.md      # Assumptions & derivations
├── dev-handoff.md              # Developer implementation guide
├── FINAL-CHECKLIST.md          # Final verification checklist
├── screen-specs/               # Screen-by-screen specifications
│   ├── dashboard.md
│   ├── create-job.md
│   ├── job-details.md
│   └── execution.md
└── specs/                      # Component specifications
    └── component-library/
        └── spec.md
```

## Quick Start

1. **Start here:** [Executive Summary](./executive-summary.md) - Overview of goals and personas
2. **Design system:** [Style Compliance Matrix](./style-compliance-matrix.md) - All token usage
3. **Implementation:** [Dev Handoff](./dev-handoff.md) - CSS, HTML snippets, checklist
4. **Full index:** [UI/UX Spec Index](./UI-UX-SPEC-INDEX.md) - Complete document list

## Main Documents

### Planning & Strategy
- **[Executive Summary](./executive-summary.md)** — Goals, personas, major flows, constraints
- **[Information Architecture](./ia-and-flows.md)** — Sitemap, user flows, navigation patterns

### Screen Specifications
- **[Dashboard](./screen-specs/dashboard.md)** — Landing page with job list
- **[Create Job](./screen-specs/create-job.md)** — Job configuration form
- **[Job Details](./screen-specs/job-details.md)** — Status, progress, results
- **[Live Execution](./screen-specs/execution.md)** — Real-time monitoring

### Component Library
- **[Component Library](./specs/component-library/spec.md)** — Button, Input, Card, Badge, etc.

### Integration & Implementation
- **[Function-to-UI Mapping](./function-to-ui.md)** — API endpoints → UI triggers
- **[Navigation Model](./navigation.md)** — Routing and navigation
- **[Developer Handoff](./dev-handoff.md)** — CSS, HTML, acceptance checklist

### Compliance
- **[Accessibility](./accessibility.md)** — WCAG 2.2 AA checklist
- **[Style Compliance](./style-compliance-matrix.md)** — Token usage matrix
- **[Style Decisions](./style-decisions-log.md)** — Assumptions and derivations

## Design System Reference

All visual decisions strictly adhere to **Bosk8 Design System** from `style.md`:
- Dark minimal aesthetic (pure black backgrounds)
- Monospace typography (JetBrains Mono)
- High contrast (WCAG AAA where possible)
- All tokens referenced exactly from `style.md`

## Status

✅ **Complete** — All specifications finalized and production-ready

---

**See also:** [Frontend Implementation](../README.md) in `web/frontend/`

