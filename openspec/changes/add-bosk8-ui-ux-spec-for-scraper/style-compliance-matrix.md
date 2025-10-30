# Style Compliance Matrix

- Screen: Shell / Dashboard
  - Background: `--bg-elev1`
  - Container: `max-width: min(1100px, 90vw)`
  - Typography: `--font-ui`, uppercase labels `.nav/.meta`
  - Cards: `.card`, `--surface-card`, ring `--border-outer-w` `--border-color`
  - Spacing: `--space-4`, `--space-2`, `--space-1`

- Component: Button
  - Default text: `--text-muted`, hover: `--text-primary`
  - Icon: `.copy-icon` transition to `#d4d4d8`
  - Focus: `:focus-visible` outline `--border-color`
  - Radius: `--r-sm`

- Component: Input
  - Background: `--surface-card`
  - Border: `--border-w solid var(--border-color)`
  - Radius: `--r-sm`
  - Focus: `:focus-visible` outline rule

- Component: Tooltip
  - Structure: `.tooltip-trigger`, `.tooltip`
  - Colors: `--surface-card`, `--border-color`, text `--text-subtle`

- Grid Tiles
  - Columns: 2 → 4 at 768px
  - Tile padding: `1.5rem 1rem`
