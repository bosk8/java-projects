# UI/UX Specification Index

Complete UI/UX specification for Simple Web Scraper web application, strictly adhering to Bosk8 Design System (`style.md`).

## Specification Structure

### 📋 Planning & Strategy
- **[Executive Summary](./executive-summary.md)** — Goals, personas, flows, constraints, assumptions
- **[Information Architecture & User Flows](./ia-and-flows.md)** — Sitemap, user flows, navigation patterns, empty states

### 🖥️ Screen Specifications
- **[Dashboard](./screen-specs/dashboard.md)** — Landing page, job list, primary CTA
- **[Create Job](./screen-specs/create-job.md)** — Job configuration form, selector testing
- **[Job Details](./screen-specs/job-details.md)** — Status, progress, configuration, results table
- **[Live Execution](./screen-specs/execution.md)** — Real-time monitoring, log feed, URL status

### 🧩 Components & Patterns
- **[Component Library](./specs/component-library/spec.md)** — Button, Input, Card, Badge, Progress, Table, Modal, Accordion

### 🔌 Integration & API
- **[Function-to-UI Mapping](./function-to-ui.md)** — API endpoints, data contracts, validations, error handling, WebSocket events

### 🧭 Navigation
- **[Navigation & Routing](./navigation.md)** — Global nav, breadcrumbs, route rules, contextual actions

### ♿ Accessibility
- **[Accessibility Checklist](./accessibility.md)** — WCAG 2.2 AA compliance, keyboard navigation, ARIA, screen readers

### 🎨 Design System Compliance
- **[Style Compliance Matrix](./style-compliance-matrix.md)** — Per-component token usage, derived tokens
- **[Style Decisions Log](./style-decisions-log.md)** — Assumptions, derivations, conflicts, resolutions

### 🛠️ Developer Handoff
- **[Dev Handoff Artifacts](./dev-handoff.md)** — CSS tokens, component CSS, HTML snippets, acceptance checklist

## Quick Reference

### Key Design Tokens
- **Colors:** `#000000` (black), `#09090B` (card), `#0A0A0A` (elevated), `#FFFFFF` (text), `#22C55E` (success)
- **Typography:** JetBrains Mono (monospace stack)
- **Spacing:** 0.5rem → 4rem scale
- **Borders:** 1px (mobile), 1.5px/2px (desktop)
- **Radius:** 4px (small), 6px (medium)

### Primary User Flows
1. **Create Job:** Dashboard → New Job → Configure → Start → Monitor
2. **Monitor Job:** Dashboard → Job Details → View Progress → Export Results
3. **Test Selectors:** Create Job → Test Selectors → Review → Use/Adjust

### Component Highlights
- **Button:** Primary, Secondary, Destructive variants
- **Input:** Text, URL, number with validation states
- **Card:** Container with shadow and border
- **Badge:** Status indicators (RUNNING, COMPLETED, etc.)
- **Progress Bar:** Animated fill with percentage
- **Table:** Paginated data display
- **Modal:** Overlay dialog pattern

## Design Principles

1. **Strict Token Adherence:** All visual decisions use exact tokens from `style.md`
2. **No New Tokens:** Missing values derived from existing tokens with documented logic
3. **High Contrast:** WCAG AAA contrast where possible (white on black)
4. **Monospace Aesthetic:** JetBrains Mono throughout
5. **Dark Minimal:** Pure black backgrounds, subtle borders, minimal decoration
6. **Responsive:** 2-col mobile, 4-col desktop grid patterns

## Implementation Status

- ✅ Executive Summary
- ✅ Information Architecture
- ✅ Screen Specifications (4 screens)
- ✅ Component Library
- ✅ Function-to-UI Mapping
- ✅ Navigation Model
- ✅ Accessibility Checklist
- ✅ Style Compliance Matrix
- ✅ Style Decisions Log
- ✅ Developer Handoff

## Next Steps

1. **Review Specifications** — Validate against requirements
2. **API Design** — Confirm API endpoints match Function-to-UI mapping
3. **Prototype** — Build interactive prototype for key flows
4. **Development** — Use dev-handoff artifacts for implementation
5. **Testing** — Follow acceptance checklist

---

**Specification Version:** 1.0.0  
**Last Updated:** 2025-01-27  
**Design System:** Bosk8 Dark Minimal Mono (`style.md`)

