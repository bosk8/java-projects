## ADDED Requirements

### Requirement: Navigation and Routing Model
The system SHALL provide a minimal, clear navigation aligned to Bosk8 style: uppercase labels, `.nav` typography, subtle borders, and responsive layout.

Routes:
- `/runs`, `/runs/new`, `/executions`, `/executions/:id`, `/results`, `/settings`
Labels: RUNS, EXECUTIONS, RESULTS, SETTINGS (uppercase `.nav`)

#### Scenario: Global nav
- **WHEN** viewing the app
- **THEN** show top-level sections: RUNS, EXECUTIONS, RESULTS, SETTINGS.

#### Scenario: Breadcrumbs
- **WHEN** viewing a detail page (e.g., Execution Details)
- **THEN** show breadcrumbs using `.meta-sm` style and `--text-subtle` separators.

#### Scenario: Empty/first-run states
- **WHEN** no runs are configured
- **THEN** display a `.card` with `.tagline` prompt and a primary action button, respecting spacing `--space-2` and `--space-1`.

