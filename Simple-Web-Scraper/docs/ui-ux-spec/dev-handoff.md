# Developer Handoff Artifacts

Complete implementation guide with design tokens, CSS, HTML snippets, and acceptance checklist.

## Design Tokens / CSS Token Map

### CSS Variables (Complete Set)

```css
:root {
  /* Typography */
  --font-ui: JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, DejaVu Sans Mono, Courier New, monospace;
  --fs-base: clamp(16px, calc(15.2px + 0.25vw), 20px);

  /* Colors */
  --bg-black: #000000;
  --bg-elev1: #0A0A0A;
  --surface-card: #09090B;

  --text-primary: #FFFFFF;
  --text-muted: #E8E8E8;
  --text-subtle: #A1A1AA;
  --text-dim: #71717A;
  --text-highlight: #F4F4F5;

  --accent-success: #22C55E;
  --border-color: rgb(39 39 42);

  --shadow-tint: #0000000d;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 4rem;
  --container-pad-top: 10rem;

  /* Borders */
  --border-w: 1px;
  --border-outer-w: 1px;
  --r-sm: 4px;
  --r-md: 6px;

  /* Layout */
  --container-max: min(1100px, 90vw);
}

@media (min-width: 1024px) {
  :root {
    --border-w: 1.5px;
    --border-outer-w: 2px;
  }
}
```

### Global Base Styles

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: var(--fs-base);
}

html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-black);
  font-family: var(--font-ui);
  color: var(--text-primary);
}

main.bosk8 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--space-2xl) var(--space-md) var(--space-md);
  padding-top: var(--container-pad-top);
  background-color: var(--bg-elev1);
}

.container {
  width: 100%;
  max-width: var(--container-max);
  position: relative;
}

/* Focus styles */
:focus-visible {
  outline: 2px solid var(--border-color);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Component CSS Snippets

### Button

```css
.btn {
  font-family: var(--font-ui);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: var(--border-w) solid var(--border-color);
  cursor: pointer;
  transition: all 0.15s;
  font-size: var(--fontSize-md, 0.875rem);
  padding: var(--space-sm) var(--space-md);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--bg-elev1);
  color: var(--text-primary);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--surface-card);
}

.btn-secondary {
  background: transparent;
  color: var(--text-muted);
}

.btn-secondary:hover:not(:disabled) {
  color: var(--text-primary);
  border-width: var(--border-outer-w);
}

.btn-destructive {
  background: transparent;
  color: var(--text-primary);
  border-color: var(--text-primary);
}

.btn-destructive:hover:not(:disabled) {
  background-color: var(--bg-elev1);
}

.btn-sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--fontSize-sm, 0.75rem);
}

.btn-lg {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--fs-base);
}
```

### Input

```css
.input {
  width: 100%;
  background-color: var(--bg-elev1);
  border: var(--border-w) solid var(--border-color);
  color: var(--text-primary);
  padding: var(--space-sm);
  font-family: var(--font-ui);
  font-size: var(--fontSize-md, 0.875rem);
  border-radius: var(--r-sm);
  transition: border-color 0.15s;
}

.input::placeholder {
  color: var(--text-dim);
}

.input:focus {
  outline: none;
}

.input:focus-visible {
  outline: 2px solid var(--border-color);
  outline-offset: 2px;
}

.input-error {
  border-color: var(--text-primary);
}

.error-message {
  color: var(--text-subtle);
  font-size: var(--fontSize-xs, 0.625rem);
  margin-top: var(--space-xs);
}
```

### Card

```css
.card {
  background-color: var(--surface-card);
  border: var(--border-outer-w) solid var(--border-color);
  box-shadow: 0 0 0 var(--border-outer-w) var(--border-color), 0 1px 2px var(--shadow-tint);
  border-radius: var(--r-md);
}

.card-padding-sm {
  padding: var(--space-md);
}

.card-padding-md {
  padding: var(--space-lg);
}

.card-padding-lg {
  padding: var(--space-xl);
}
```

### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--bg-elev1);
  border: var(--border-w) solid var(--border-color);
  font-family: var(--font-ui);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: var(--fontSize-sm, 0.75rem);
}

.badge-success {
  color: var(--accent-success);
}

.badge-default {
  color: var(--text-muted);
}
```

### Progress Bar

```css
.progress-bar {
  width: 100%;
  height: 12px;
  background-color: var(--bg-elev1);
  border-radius: var(--r-sm);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--accent-success);
  transition: width 0.3s ease;
}

.progress-label {
  color: var(--text-muted);
  font-size: var(--fontSize-sm, 0.75rem);
  margin-top: var(--space-xs);
}
```

### Typography Classes

```css
.tagline, .meta, .label, .nav {
  font-family: var(--font-ui);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.tagline {
  font-size: var(--fs-base);
  text-align: center;
}

.meta-sm {
  font-size: var(--fontSize-sm, 0.75rem);
}

.meta-md {
  font-size: var(--fontSize-md, 0.875rem);
}

.label {
  font-size: var(--fontSize-sm, 0.75rem);
  color: var(--text-muted);
}
```

## HTML Snippets

### Dashboard Card with Job List

```html
<main class="bosk8">
  <div class="container">
    <section class="card card-padding-lg">
      <h1 class="tagline">RECENT JOBS</h1>
      
      <div class="job-list">
        <div class="job-item border-b">
          <div class="job-info">
            <span class="meta">JOB #001</span>
            <span class="meta-sm text-subtle">https://example.com/products</span>
          </div>
          <span class="badge badge-success">RUNNING</span>
        </div>
      </div>
    </section>
  </div>
</main>
```

### Create Job Form

```html
<form class="card card-padding-lg">
  <div class="form-field">
    <label for="url" class="label">URL *</label>
    <input 
      type="url" 
      id="url" 
      class="input" 
      placeholder="https://example.com" 
      required 
      aria-required="true"
    />
  </div>

  <div class="form-field">
    <label for="container-selector" class="label">CONTAINER SELECTOR *</label>
    <input 
      type="text" 
      id="container-selector" 
      class="input" 
      placeholder="article, .item" 
      required 
      aria-required="true"
    />
  </div>

  <div class="form-actions">
    <button type="button" class="btn btn-secondary">CANCEL</button>
    <button type="submit" class="btn btn-primary">START SCRAPING</button>
  </div>
</form>
```

### Job Details with Progress

```html
<section class="card card-padding-md">
  <div class="status-header">
    <span class="meta">JOB #001</span>
    <span class="badge badge-success">RUNNING</span>
  </div>

  <div class="progress-section">
    <div class="progress-bar">
      <div class="progress-fill" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" role="progressbar" aria-label="Job progress"></div>
    </div>
    <span class="progress-label">45% · 23 pages scraped</span>
  </div>
</section>
```

### Modal

```html
<div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal modal-size-md">
    <div class="modal-header border-b">
      <h2 id="modal-title" class="label">MODAL TITLE</h2>
      <button class="modal-close" aria-label="Close modal">×</button>
    </div>
    
    <div class="modal-body">
      <p class="meta">Modal content here</p>
    </div>
    
    <div class="modal-footer border-t">
      <button class="btn btn-secondary">CANCEL</button>
      <button class="btn btn-primary">CONFIRM</button>
    </div>
  </div>
</div>
```

### Data Table

```html
<table class="data-table" aria-label="Scraped data results">
  <thead>
    <tr>
      <th scope="col" class="label">TITLE</th>
      <th scope="col" class="label">DESCRIPTION</th>
      <th scope="col" class="label">URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="meta">Product Name</td>
      <td class="meta">Description text</td>
      <td class="meta">/product/1</td>
    </tr>
  </tbody>
</table>
```

## Spacing & Redlines

### Standard Spacing Scale
- `--space-xs`: 0.5rem (8px) — Tight spacing, badges
- `--space-sm`: 0.75rem (12px) — Input padding, small gaps
- `--space-md`: 1rem (16px) — Standard spacing, button padding
- `--space-lg`: 1.5rem (24px) — Section spacing, card padding
- `--space-xl`: 2rem (32px) — Large spacing, form padding
- `--space-2xl`: 4rem (64px) — Hero spacing

### Component Spacing Guidelines
- **Form fields:** `--space-lg` between fields
- **Card padding:** `--space-lg` (default), `--space-xl` (large cards)
- **Button padding:** `--space-sm` vertical, `--space-md` horizontal
- **Table cell padding:** `--space-sm`
- **Section spacing:** `--space-xl` between major sections

## Acceptance Checklist

### Design System Compliance
- [ ] All colors use exact tokens from `style.md`
- [ ] Typography uses JetBrains Mono (fallback stack)
- [ ] All spacing uses defined spacing scale
- [ ] Borders use defined border widths and colors
- [ ] No new tokens created (all derived from `style.md`)
- [ ] Responsive breakpoints: 768px (mobile/desktop), 1024px (border width change)

### Component Implementation
- [ ] Button: All variants (primary, secondary, destructive) implemented
- [ ] Input: Text, URL, number types with error states
- [ ] Card: All padding variants, border and shadow applied
- [ ] Badge: Status variants (success, default, error) implemented
- [ ] Progress Bar: Animated fill, label display
- [ ] Table: Header styling, row hover, border between rows
- [ ] Modal: Overlay, header, body, footer sections
- [ ] Accordion: Collapsible pattern from `style.md`

### Accessibility
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible (2px outline)
- [ ] ARIA labels on buttons, inputs, modals
- [ ] Form fields have associated labels
- [ ] Error messages announced to screen readers
- [ ] Color contrast meets WCAG AA (verified)
- [ ] Reduced motion preference respected

### Responsive Design
- [ ] Mobile layout (<768px): Stacked elements, full-width inputs
- [ ] Desktop layout (≥768px): Side-by-side, max-width containers
- [ ] Border widths adjust at 1024px breakpoint
- [ ] Navigation: Hamburger menu on mobile, horizontal on desktop
- [ ] Tables: Horizontal scroll on mobile or stacked layout

### Screen Implementation
- [ ] Dashboard: Hero, job list, empty state
- [ ] Create Job: Form fields, validation, test selectors modal
- [ ] Job Details: Status, progress, configuration, results table
- [ ] Live Execution: Progress bars, log feed, URL status
- [ ] Navigation: Global nav, breadcrumbs, contextual actions

### Real-Time Features
- [ ] WebSocket connection established on job details/execution pages
- [ ] Progress bar updates in real-time
- [ ] Status badge updates on status change
- [ ] Results table appends new records (if streaming)
- [ ] Error notifications display in real-time

### Error Handling
- [ ] Form validation errors display inline
- [ ] API errors display user-friendly messages
- [ ] Network errors show retry options
- [ ] Empty states display appropriate messages
- [ ] 404 page redirects to dashboard

### Performance
- [ ] Skeleton loaders during data fetch
- [ ] Pagination for large result sets
- [ ] Virtual scroll or lazy loading for long lists (optional)
- [ ] Images optimized (if applicable)

---

## Implementation Notes

1. **CSS Architecture:** Use CSS variables for all tokens; maintain single source of truth
2. **Component Structure:** Prefer composition over inheritance; reusable components
3. **State Management:** Handle loading, error, success states for all async operations
4. **WebSocket:** Implement reconnection logic with exponential backoff
5. **Testing:** Unit tests for components, integration tests for user flows

---

**Handoff Complete:** Ready for development implementation.

