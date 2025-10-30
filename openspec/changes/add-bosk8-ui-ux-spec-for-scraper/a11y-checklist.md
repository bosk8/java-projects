# Accessibility Checklist (WCAG 2.2 AA)

- Contrast meets AA: `--text-*` on `--bg-elev1`/`--surface-card`
- Keyboard: All interactive controls reachable; order logical
- Focus visible: `:focus-visible` outline `2px` `--border-color` with offset 2px
- Labels: Uppercase `.label` associated to inputs; `aria-labelledby` as needed
- ARIA: `aria-expanded`, `aria-controls` (FAQ), `aria-describedby` (tooltip)
- Motion: transitions ≤ 200ms; no parallax/auto animations
- Forms: `aria-invalid` when errors; error messaging with `.meta-sm` tone `--text-subtle`
