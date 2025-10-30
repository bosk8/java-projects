## ADDED Requirements

### Requirement: Bosk8-Styled Web Admin Shell
The system SHALL provide a Bosk8-styled admin shell using exact tokens from `style.md` for layout, surfaces, typography, borders, radii, spacing, and motion.

#### Scenario: Layout base
- **WHEN** the shell renders `main.bosk8` and `.container`
- **THEN** it SHALL use `--bg-elev1` for background, `--space-4` top/bottom padding (hero spacing `10rem` per `main.bosk8`), and container max width `min(1100px, 90vw)` as in `style.md`.

#### Scenario: Cards and borders
- **WHEN** content areas render as cards
- **THEN** they SHALL use `.card` with `--surface-card` and box-shadow ring `var(--border-outer-w) var(--border-color)` per `style.md`.

### Requirement: Typography and Labels
All UI copy SHALL use `--font-ui` and uppercase labels with letter-spacing `.05em` where marked as navigation/labels/meta.

#### Scenario: Tagline and meta
- **WHEN** rendering `.tagline` and `.meta-*`
- **THEN** apply `text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted)` with sizes from `style.md`.

### Requirement: Interactive States
All interactive elements (links, buttons, inputs, toggles) MUST define default, hover, focus-visible, active, disabled, and error states consistent with `style.md` colors and motion constraints (<200ms).

#### Scenario: Link hover
- **WHEN** hovering `.link`
- **THEN** color transitions to `--text-primary` and underline with offset 4px per `style.md`.

#### Scenario: Focus-visible
- **WHEN** an element receives keyboard focus
- **THEN** use `outline: 2px solid var(--border-color)` and `outline-offset: 2px`.

### Requirement: Responsive Grid
The system SHALL use the provided 2-column mobile and 4-column ≥768px grid for tile layouts.

#### Scenario: Grid tiles
- **WHEN** rendering `.grid-tiles`
- **THEN** it SHALL be `repeat(2, 1fr)` on mobile and `repeat(4, 1fr)` at `min-width: 768px`.

