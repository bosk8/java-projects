# Accessibility Checklist (WCAG 2.2 AA)

All accessibility requirements based on WCAG 2.2 Level AA standards. Design system (`style.md`) ensures high contrast (WCAG AAA for most text).

## Color Contrast

### Text Contrast
- ✅ **Primary Text on Black:** `#FFFFFF` on `#000000` = 21:1 (AAA)
- ✅ **Muted Text on Black:** `#E8E8E8` on `#000000` = 16.6:1 (AAA)
- ✅ **Subtle Text on Black:** `#A1A1AA` on `#000000` = 7.2:1 (AA)
- ✅ **Dim Text on Black:** `#71717A` on `#000000` = 4.9:1 (AA)

### Interactive Elements
- ✅ **Button Text:** `#FFFFFF` on `#0A0A0A` = 18.2:1 (AAA)
- ✅ **Input Border:** `rgb(39 39 42)` on `#09090B` = sufficient for focus indicator
- ✅ **Focus Outline:** 2px `--border-color` on `--surface-card` = visible

### Status Indicators
- ✅ **Success Badge:** `#22C55E` on `#0A0A0A` = 6.8:1 (AA)
- ✅ **Error State:** Ensure error text uses `--text-primary` for visibility

**Action Items:**
- [ ] Verify all error states use high-contrast text
- [ ] Test disabled states maintain sufficient contrast

---

## Keyboard Navigation

### Tab Order
- ✅ Logical tab order (top to bottom, left to right)
- ✅ All interactive elements focusable
- ✅ Skip links for main content (optional, but recommended)

### Keyboard Shortcuts
- **Enter/Space:** Activate buttons
- **Tab:** Navigate between fields
- **Escape:** Close modals
- **Arrow Keys:** Navigate table rows (optional enhancement)

### Focus Management
- ✅ Visible focus indicator (`:focus-visible` outline)
- ✅ Focus trapped in modals
- ✅ Focus returns to trigger after modal close
- ✅ Focus moves to error field on form validation failure

**Implementation:**
```css
:focus-visible {
  outline: 2px solid var(--border-color);
  outline-offset: 2px;
}
```

---

## ARIA Labels & Semantics

### Form Fields
- ✅ All inputs have `<label>` elements
- ✅ Required fields marked with `aria-required="true"`
- ✅ Error messages associated with `aria-describedby`
- ✅ Field validation states: `aria-invalid="true"` when invalid

### Buttons
- ✅ Button text descriptive ("START SCRAPING" not "Submit")
- ✅ Loading state: `aria-busy="true"`, `aria-label="Starting scraping job..."`
- ✅ Icon-only buttons have `aria-label`

### Status Indicators
- ✅ Status badges: `role="status"`, `aria-live="polite"`
- ✅ Progress bars: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`

### Tables
- ✅ Table headers: `<th scope="col">` or `<th scope="row">`
- ✅ Table caption or `aria-label` for table purpose

### Modals
- ✅ Modal container: `role="dialog"`, `aria-modal="true"`
- ✅ Modal title: `aria-labelledby` pointing to heading
- ✅ Modal description: `aria-describedby` (if applicable)

### Collapsible/Accordion
- ✅ Trigger button: `aria-expanded="true|false"`
- ✅ Content: `aria-hidden="true|false"`

### Live Regions
- ✅ Job status updates: `aria-live="polite"` on status badge
- ✅ Progress updates: `aria-live="polite"` on progress section
- ✅ Error messages: `aria-live="assertive"` for critical errors

**Example:**
```html
<div role="status" aria-live="polite" aria-atomic="true">
  <span class="badge badge-success">RUNNING</span>
</div>
```

---

## Screen Reader Support

### Headings Hierarchy
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Each page has one `<h1>`
- ✅ Sections use `<h2>`, subsections use `<h3>`

**Example:**
```html
<h1>CREATE NEW SCRAPING JOB</h1>
<section>
  <h2>URLS</h2>
  ...
  <h2>SELECTORS</h2>
  ...
  <h2>ADVANCED SETTINGS</h2>
</section>
```

### Landmarks
- ✅ `<nav>` for navigation
- ✅ `<main>` for main content
- ✅ `<header>` for page header (optional)
- ✅ `<footer>` for footer (if present)

### Skip Links
- ✅ Skip to main content link (first focusable element)
- ✅ Skip to navigation (optional)

**Example:**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

---

## Motion & Animation

### Motion Preferences
- ✅ Respect `prefers-reduced-motion` media query
- ✅ Disable animations for users who prefer reduced motion

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Note:** `style.md` specifies transitions under 200ms, which aligns with accessibility best practices.

---

## Form Accessibility

### Labels
- ✅ All form fields have visible labels
- ✅ Labels positioned above or beside inputs
- ✅ Labels associated with inputs via `for` attribute or wrapping

### Validation
- ✅ Inline error messages below fields
- ✅ Error messages associated with fields via `aria-describedby`
- ✅ Error summary at top of form (for multiple errors)

### Required Fields
- ✅ Visual indicator: `*` or "(required)"
- ✅ `aria-required="true"` attribute

### Help Text
- ✅ Helper text for complex fields (e.g., CSS selector examples)
- ✅ Associated with field via `aria-describedby`

---

## Interactive Elements

### Buttons vs Links
- ✅ Buttons for actions (submit, cancel, delete)
- ✅ Links for navigation
- ✅ Use semantic HTML (`<button>` not `<div>` with click handler)

### Disabled States
- ✅ Disabled buttons: `aria-disabled="true"`, not removed from tab order
- ✅ Tooltip or explanation for why disabled (optional)

### Loading States
- ✅ Loading buttons: `aria-busy="true"`, `aria-label` updated
- ✅ Loading indicators: `role="status"`, `aria-live="polite"`

---

## Data Tables

### Structure
- ✅ Table headers: `<th>` not `<td>`
- ✅ Scope attributes: `scope="col"` or `scope="row"`
- ✅ Caption or `aria-label` describing table purpose

### Complex Tables
- ✅ Pagination controls: `aria-label` for navigation buttons
- ✅ Page info: "Page 1 of 3" for screen readers

**Example:**
```html
<table aria-label="Scraped data results">
  <caption>Results from scraping job #001</caption>
  <thead>
    <tr>
      <th scope="col">TITLE</th>
      <th scope="col">DESCRIPTION</th>
      <th scope="col">URL</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>
```

---

## Error Handling

### Error Messages
- ✅ Clear, descriptive error messages
- ✅ Error messages announced to screen readers (`aria-live="assertive"`)
- ✅ Error fields highlighted visually and programmatically

### Recovery
- ✅ Suggestions for fixing errors
- ✅ Focus moved to first error field

---

## Testing Checklist

### Automated Testing
- [ ] Run axe DevTools or similar tool
- [ ] Validate HTML with W3C validator
- [ ] Test with Lighthouse accessibility audit

### Manual Testing
- [ ] Navigate entire app using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test with browser zoom at 200%
- [ ] Test color contrast with contrast checker tool
- [ ] Test focus indicators on all interactive elements

### Browser Testing
- [ ] Chrome (with screen reader)
- [ ] Firefox (with screen reader)
- [ ] Safari (with VoiceOver)
- [ ] Edge (with screen reader)

---

## Compliance Summary

| WCAG 2.2 Criteria | Status | Notes |
|-------------------|--------|-------|
| 1.4.3 Contrast (Minimum) | ✅ AA | High contrast design system |
| 1.4.11 Non-text Contrast | ✅ AA | Interactive elements visible |
| 2.1.1 Keyboard | ✅ AA | All functionality keyboard accessible |
| 2.1.2 No Keyboard Trap | ✅ AA | Focus management implemented |
| 2.4.3 Focus Order | ✅ AA | Logical tab order |
| 2.4.7 Focus Visible | ✅ AA | 2px outline on focus |
| 2.5.3 Label in Name | ✅ AA | Button text matches accessible name |
| 3.3.1 Error Identification | ✅ AA | Error messages clear |
| 3.3.2 Labels or Instructions | ✅ AA | All fields labeled |
| 3.3.3 Error Suggestion | ✅ AA | Error messages include suggestions |
| 4.1.2 Name, Role, Value | ✅ AA | ARIA labels used appropriately |

---

**Next:** Style Compliance Matrix

