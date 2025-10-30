# Style Decisions Log

- [Timestamp] Assumption: No explicit error color token in `style.md`. Derivation: Use `--border-color` and `--text-subtle` with stronger outline for error emphasis while maintaining grayscale palette. Rationale: Rule 1 forbids new tokens; Rule 2 allows derivation from existing grayscale and border semantics.
- [Timestamp] Assumption: Disabled state not explicitly specified. Derivation: Apply `opacity: 0.5; pointer-events: none;` consistent with minimal mono aesthetic and motion rules.
- [Timestamp] Conflict: Need visible primary action hierarchy without new accent colors. Resolution: Use layout prominence (card placement), size, and label emphasis (`text-transform: uppercase`, spacing) instead of color; record in specs.

