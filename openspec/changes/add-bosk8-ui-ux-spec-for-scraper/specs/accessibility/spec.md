## ADDED Requirements

### Requirement: WCAG 2.2 AA Compliance
The system MUST meet WCAG 2.2 AA for contrast, keyboard navigation, focus visibility, and semantics.

#### Scenario: Contrast
- **WHEN** rendering text on backgrounds
- **THEN** use white-on-black or `--text-muted/subtle` on `--surface-card` meeting AA.

#### Scenario: Keyboard navigation
- **WHEN** navigating via keyboard only
- **THEN** all interactive controls are reachable in a logical order and visibly focused using the global focus style.

#### Scenario: ARIA semantics
- **WHEN** using FAQs/accordions and tooltips
- **THEN** provide `aria-expanded`, `aria-controls`, and `aria-describedby` as appropriate.

