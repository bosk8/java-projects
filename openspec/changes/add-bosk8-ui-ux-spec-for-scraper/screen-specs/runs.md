## Screen: RUNS

- Purpose: Create and manage scraping runs.
- Layout:
  - `main.bosk8` background `--bg-elev1`, `.container` max `min(1100px, 90vw)`
  - Header `.card border-b` with `.tagline` title
  - Grid `.card grid-tiles border-b` with quick tiles (UNIVERSAL, OPEN SOURCE, etc.)
- Components:
  - Primary action: "NEW RUN" button (uppercase). Default text `--text-muted`, hover `--text-primary`, focus outline global.
  - Runs table (future) as `.card` with `.border-b` rows.
- States:
  - Empty state: `.card` with `.tagline` prompt and NEW RUN action.
  - Button: hover, focus-visible, disabled (opacity .5; pointer-events none; log derivation).
- Responsive:
  - Tiles 2 cols mobile → 4 cols ≥768px per `.grid-tiles`.
