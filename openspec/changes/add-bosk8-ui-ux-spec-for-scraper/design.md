## Context
Introduce a Bosk8-styled admin UI to configure and operate the Java scraper. The UI is a separate web frontend consuming the existing CLI capabilities via a thin orchestration layer (future work). This document captures architectural reasoning for the UX system and component patterns; no backend changes are mandated.

## Goals / Non-Goals
- Goals: Bosk8-aligned UI/UX spec, reusable components, accessibility, strict token usage from `style.md`.
- Non-Goals: Implementing the web server or changing Java scraper logic.

## Decisions
- Decision: All visuals/states derive only from tokens in `style.md`.
- Decision: Components use small radii (r-sm/r-md), subtle borders, soft depth per `style.md`.
- Decision: Motion kept under 200ms; no parallax/auto animations.

## Risks / Trade-offs
- Risk: Some missing tokens (e.g., warning/error states). Mitigation: derive from existing grayscale tokens and record derivations.

## Migration Plan
Start with minimal screens (Run Config, Executions, Results). Expand post-acceptance.

## Open Questions
- None blocking; derivations are recorded in Style Decisions Log.

