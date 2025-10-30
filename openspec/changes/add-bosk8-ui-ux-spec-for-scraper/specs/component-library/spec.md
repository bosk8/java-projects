## ADDED Requirements

### Requirement: Button
Buttons SHALL use `.copy-btn` conventions for inline actions and card-aligned actions for primary operations, with explicit states and tokens from `style.md`.

Props: `label: string`, `icon?: left|right`, `disabled?: boolean`, `onClick: () => void`
Variants: `inline` (icon+label), `block` (card footer action)
States: default, hover, focus-visible, active, disabled
A11y: `role="button"`, keyboard activation (Enter/Space), `aria-disabled` when disabled

#### Scenario: Default → hover
- **WHEN** pointer hovers
- **THEN** icon/text shifts from `--text-dim`/`--text-muted` to lighter per `.copy-btn:hover .copy-icon` and `.link:hover`, using transition `.15s`.

#### Scenario: Focus-visible
- **WHEN** keyboard focus is on the button
- **THEN** apply focus outline using `--border-color` (global rule).

#### Scenario: Disabled
- **WHEN** disabled
- **THEN** reduce opacity to 0.5 and disable pointer events (derived; record in Style Decisions Log).

Example usage:
- NEW RUN action in RUNS header; RETRY in Execution Details.

### Requirement: Input (Text)
Inputs SHALL use `--surface-card` background, `--border-w solid var(--border-color)` borders, `--r-sm` radius, and states (focus ring, error, disabled) derived from `style.md`.

Props: `value: string`, `placeholder?: string`, `disabled?: boolean`, `error?: string`, `onChange: (v:string)=>void`
States: default, focus, error, disabled
A11y: associate `label` (uppercase `.label`), `aria-invalid` on error

#### Scenario: Focus
- **WHEN** focused
- **THEN** keep border color and apply focus-visible outline as per global rule.

#### Scenario: Error state
- **WHEN** validation fails
- **THEN** border uses `--border-color` with subtle ring `0 0 0 var(--border-outer-w) var(--border-color)` and error text uses `--text-subtle` (derived; log).

### Requirement: Card
Cards MUST use `.card` with outer ring and small radius and support header, body, footer slots.

Props: `header?: node`, `footer?: node`, `segmented?: boolean`
States: default, hover (subtle), focus-within outline
A11y: landmark roles as needed (e.g., `region` with `aria-label`)

#### Scenario: Composition
- **WHEN** rendering a section
- **THEN** use `.card border-b` for stacked groups and `.border-r` for grid columns.

### Requirement: Tooltip
The system SHALL use `.tooltip-trigger` and `.tooltip` exactly as specified with hover/active behaviors across breakpoints.

Props: `content: string | node`, `placement: top` (fixed per style), `mobileToggle: boolean`
A11y: `aria-describedby`, ensure focusable trigger; dismiss on blur

#### Scenario: Mobile active
- **WHEN** tapping the trigger on <768px
- **THEN** `.tooltip-trigger.active .tooltip` becomes visible.

### Requirement: FAQ/Accordion
The system SHALL use `.faq-item`, `.faq-q`, `.faq-a` patterns as specified.

Props: `items: {q:string,a:string}[]`
A11y: `aria-controls`, `aria-expanded`, header button focus-visible

#### Scenario: Open/close
- **WHEN** question is toggled
- **THEN** `.faq-a` toggles `display` and the item hover/background behaviors persist.

