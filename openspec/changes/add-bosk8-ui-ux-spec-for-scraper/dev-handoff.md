# Dev Handoff

## Tokens/CSS Map
- Use `style.md` CSS variables exactly; include the `:root` block in the app shell.
- Critical vars: `--bg-elev1`, `--surface-card`, `--text-*`, `--border-color`, `--border-w`, `--border-outer-w`, `--r-sm`, `--r-md`, `--space-*`, `--font-ui`.

## Spacing/Redlines
- Shell padding: `--space-4` vertical; hero `padding-top: 10rem` as in `main.bosk8`.
- Card internal padding: tiles `1.5rem 1rem`; FAQ Q `1.25rem 1.75rem`.

## Snippets
```html
<main class="bosk8">
  <div class="container">
    <section class="card border-b" style="padding:4rem 2rem; display:flex; align-items:center; justify-content:center;">
      <h1 class="tagline">A LIGHTWEIGHT SPEC-DRIVEN FRAMEWORK</h1>
    </section>
    <section class="card grid-tiles border-b">
      <div class="tile border-r">UNIVERSAL</div>
      <div class="tile">OPEN SOURCE</div>
      <div class="tile border-r">NO API KEYS</div>
      <div class="tile">NO MCP</div>
    </section>
  </div>
</main>
```

```css
.button-inline { display:inline-flex; align-items:center; gap: var(--space-0_75); }
.button-inline:focus-visible { outline: 2px solid var(--border-color); outline-offset: 2px; }
.button-inline[disabled] { opacity: .5; pointer-events: none; }
.input {
  background: var(--surface-card);
  border: var(--border-w) solid var(--border-color);
  border-radius: var(--r-sm);
}
.input:focus-visible { outline: 2px solid var(--border-color); outline-offset: 2px; }
```

## Acceptance Checklist
- [ ] Uses only tokens/classes from `style.md`
- [ ] All interactive states implemented (default/hover/focus/active/disabled/error)
- [ ] Responsive per `.grid-tiles` rules
- [ ] WCAG 2.2 AA checks passed (a11y checklist)
- [ ] Breadcrumbs and empty states per spec

