# Interactive Component Library

All components strictly adhere to `style.md` tokens. Derive any missing values from existing tokens.

## Button

### Props
- `variant`: "primary" | "secondary" | "destructive"
- `size`: "sm" | "md" | "lg" (default: "md")
- `disabled`: boolean
- `loading`: boolean
- `fullWidth`: boolean (mobile-first)

### Variants

#### Primary
- **Background:** `--bg-elev1` (`colors.bg.elev1`)
- **Border:** `--border-w` solid `--border-color`
- **Text:** `--text-primary`
- **Hover:** Background → `--surface-card` (derived: slightly lighter)
- **Active:** Border → `--border-outer-w`
- **Disabled:** Opacity 0.5, cursor not-allowed

#### Secondary
- **Background:** Transparent
- **Border:** `--border-w` solid `--border-color`
- **Text:** `--text-muted`
- **Hover:** Text → `--text-primary`, border → `--border-outer-w`

#### Destructive
- **Background:** Transparent
- **Border:** `--border-w` solid `--text-primary` (derived: use primary for emphasis)
- **Text:** `--text-primary`
- **Hover:** Background → `--bg-elev1`

### States
- **Default:** As defined above
- **Hover:** Transition 150ms (per `style.md` motion rules)
- **Focus:** `:focus-visible` outline (2px `--border-color`)
- **Active:** Pressed state (slightly darker background)
- **Disabled:** Non-interactive, reduced opacity
- **Loading:** Spinner icon (monospace character: `⟳`)

### Sizes
- **sm:** Padding `--space-0_5` (0.5rem), font `--fontSize-sm`
- **md:** Padding `--space-0_75` (0.75rem), font `--fontSize-md`
- **lg:** Padding `--space-1` (1rem), font `--fontSize-base`

### Example Usage
```html
<button class="btn btn-primary">START SCRAPING</button>
<button class="btn btn-secondary" disabled>CANCEL</button>
<button class="btn btn-destructive">DELETE JOB</button>
```

### Token References
| Element | Token |
|---------|-------|
| Primary bg | `colors.bg.elev1` |
| Border | `colors.border.neutral`, `borders.thin` |
| Text | `colors.text.primary`, `colors.text.muted` |
| Padding | `spacing.xs`, `spacing.sm`, `spacing.md` |
| Font size | `fontSize.sm`, `fontSize.md`, `fontSize.base` |
| Transition | `style.md` → 150ms max |

---

## Input

### Props
- `type`: "text" | "url" | "number" | "email"
- `placeholder`: string
- `value`: string
- `disabled`: boolean
- `error`: boolean
- `required`: boolean

### Styles
- **Background:** `--bg-elev1` (`colors.bg.elev1`)
- **Border:** `--border-w` solid `--border-color`
- **Text:** `--text-primary`
- **Placeholder:** `--text-dim` (`colors.text.dim`)
- **Padding:** `--space-0_75` (0.75rem)
- **Border radius:** `--r-sm` (4px)
- **Font:** `--font-ui`, `--fontSize-md`

### States
- **Default:** As above
- **Focus:** Outline 2px `--border-color` (per `style.md` focus rules)
- **Error:** Border → `--text-primary` (derived: use primary for visibility, or keep border and show error text below)
- **Disabled:** Background → `--bg-black`, opacity 0.6

### Error State
- **Error message:** Displayed below input
- **Text:** `--text-subtle`, `--fontSize-xs`
- **Icon:** Optional `⚠` (monospace)

### Example Usage
```html
<input type="text" class="input" placeholder="Enter URL" required />
<input type="text" class="input input-error" />
<span class="error-message">This field is required</span>
```

### Token References
| Element | Token |
|---------|-------|
| Background | `colors.bg.elev1` |
| Border | `colors.border.neutral`, `borders.thin` |
| Text | `colors.text.primary` |
| Placeholder | `colors.text.dim` |
| Error text | `colors.text.subtle` |
| Padding | `spacing.sm` |
| Radius | `radii.sm` |

---

## Card

### Props
- `padding`: "sm" | "md" | "lg" (default: "md")
- `border`: boolean (default: true)

### Styles
- **Background:** `--surface-card` (`colors.surface.card`)
- **Border:** `--border-outer-w` solid `--border-color` (if border prop)
- **Shadow:** `0 0 0 var(--border-outer-w) var(--border-color), 0 1px 2px var(--shadow-tint)`
- **Border radius:** `--r-md` (6px)

### Padding Variants
- **sm:** `--space-1` (1rem)
- **md:** `--space-1_5` (1.5rem)
- **lg:** `--space-2` (2rem)

### Example Usage
```html
<div class="card card-padding-md">
  <h2 class="label">CARD TITLE</h2>
  <p class="meta">Card content</p>
</div>
```

### Token References
| Element | Token |
|---------|-------|
| Background | `colors.surface.card` |
| Border | `colors.border.neutral`, `borders.outer` |
| Shadow | `colors.shadow.tint` |
| Radius | `radii.md` |
| Padding | `spacing.md`, `spacing.lg`, `spacing.xl` |

---

## Badge

### Props
- `variant`: "default" | "success" | "warning" | "error" | "info"
- `size`: "sm" | "md" (default: "md")

### Variants
- **Default:** `--text-muted` text, `--bg-elev1` background
- **Success:** `--accent-success` text, `--bg-elev1` background
- **Warning:** `--text-primary` text (derived), `--bg-elev1` background
- **Error:** `--text-primary` плес, `--bg-elev1` background
- **Info:** `--text-subtle` text, `--bg-elev1` background

### Styles
- **Background:** `--bg-elev1`
- **Border:** `--border-w` solid `--border-color`
- **Padding:** `--space-0_5` (sm) or `--space-0_75` (md)
- **Font:** `.label` class (uppercase)
- **Font size:** `--fontSize-xs` (sm) or `--fontSize-sm` (md)

### Example Usage
```html
<span class="badge badge-success">RUNNING</span>
<span class="badge badge-error">FAILED</span>
```

### Token References
| Element | Token |
|---------|-------|
| Background | `colors.bg.elev1` |
| Border | `colors.border.neutral`, `borders.thin` |
| Success color | `colors.accent.success` |
| Text colors | `colors.text.muted`, `colors.text.primary`, `colors.text.subtle` |
| Font sizes | `fontSize.xs`, `fontSize.sm` |

---

## Progress Bar

### Props
- `value`: number (0-100)
- `showLabel`: boolean (default: true)
- `size`: "sm" | "md" (default: "md")

### Styles
- **Container:**
  - Background: `--bg-elev1`
  - Height: 8px (sm) or 12px (md) — derived
  - Border radius: `--r-sm` (4px)
- **Fill:**
  - Background: `--accent-success`
  - Width: `value%`
  - Transition: 300ms ease (derived, within 200ms motion limit)
- **Label:**
  - Text: `--text-muted`, `.meta-sm` class
  - Position: Right-aligned or below bar

### Example Usage
```html
<div class="progress-bar">
  <div class="progress-fill" style="width: 45%"></div>
</div>
<span class="progress-label">45%</span>
```

### Token References
| Element | Token |
|---------|-------|
| Container bg | `colors.bg.elev1` |
| Fill bg | `colors.accent.success` |
| Radius | `radii.sm` |
| Label text | `colors.text.muted` |

---

## Table

### Props
- `columns`: Array<{key, label, width?}>
- `data`: Array<object>
- `pagination`: boolean (default: true)
- `pageSize`: number (default: 50)

### Styles
- **Container:** `Card` component
- **Header:**
  - Background: `--bg-elev1`
  - Text: `.label` class (uppercase)
  - Padding: `--space-0_75`
  - Border bottom: `--border-w` solid `--border-color`
- **Rows:**
  - Border bottom: `--border-w` solid `--border-color` (between rows)
  - Padding: `--space-0_75`
  - Text: `.meta` class
  - Hover: Background → `--bg-elev1` (derived)
- **Pagination:**
  - Controls below table
  - Buttons: `Button` (secondary variant)
  - Page info: `.meta-sm` class

### Example Usage
```html
<table class="data-table">
  <thead>
    <tr>
      <th>TITLE</th>
      <th>DESCRIPTION</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Product Name</td>
      <td>Description text</td>
      <td>/product/1</td>
    </tr>
  </tbody>
</table>
```

### Token References
| Element | Token |
|---------|-------|
| Header bg | `colors.bg.elev1` |
| Row hover | `colors.bg.elev1` (derived) |
| Border | `colors.border.neutral`, `borders.thin` |
| Text | `colors.text.muted`, `colors.text.primary` |
| Padding | `spacing.sm` |

---

## Modal

### Props
- `open`: boolean
- `onClose`: function
- `title`: string
- `size`: "sm" | "md" | "lg" (default: "md")

### Styles
- **Overlay:**
  - Background: `rgba(0, 0, 0, 0.8)` (derived: black with opacity)
  - Position: Fixed, full viewport
  - Z-index: 1000 (derived)
- **Modal:**
  - Background: `--surface-card`
  - Border: `--border-outer-w` solid `--border-color`
  - Border radius: `--r-md` (6px)
  - Padding: `--space-2`
  - Max-width: 600px (sm), 800px (md), 1000px (lg) — derived
  - Centered: Flexbox center
- **Header:**
  - Border bottom: `--border-w` solid `--border-color`
  - Padding: `--space-1`
  - Title: `.label` class
- **Body:**
  - Padding: `--space-1_5`
- **Footer:**
  - Border top: `--border-w` solid `--border-color`
  - Padding: `--space-1`
  - Actions: Right-aligned buttons

### Example Usage
```html
<div class="modal-overlay">
  <div class="modal modal-size-md">
    <div class="modal-header">
      <h2 class="label">MODAL TITLE</h2>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">Content</div>
    <div class="modal-footer">
      <button class="btn btn-secondary">CANCEL</button>
      <button class="btn btn-primary">CONFIRM</button>
    </div>
  </div>
</div>
```

### Token References
| Element | Token |
|---------|-------|
| Modal bg | `colors.surface.card` |
| Border | `colors.border.neutral`, `borders.outer` |
| Radius | `radii.md` |
| Padding | `spacing.xl`, `spacing.lg`, `spacing.md` |

---

## Checkbox

### Props
- `checked`: boolean
- `disabled`: boolean
- `label`: string

### Styles
- **Container:** Flex row, align-center, gap `--space-0_5`
- **Checkbox:**
  - Size: 18px × 18px (derived)
  - Border: `--border-w` solid `--border-color`
  - Background: `--bg-elev1`
  - Border radius: `--r-sm` (4px)
- **Checked:**
  - Background: `--accent-success`
  - Checkmark: `✓` (monospace), `--text-primary`
- **Label:** `.label` class (if provided)

### Example Usage
```html
<label class="checkbox">
  <input type="checkbox" />
  <span>RESPECT ROBOTS.TXT</span>
</label>
```

### Token References
| Element | Token |
|---------|-------|
| Border | `colors.border.neutral`, `borders.thin` |
| Background | `colors.bg.elev1` |
| Checked bg | `colors.accent.success` |
| Radius | `radii.sm` |

---

## Accordion / Collapsible

### Props
- `open`: boolean (default: false)
- `title`: string
- `children`: ReactNode / content

### Styles
- **Container:** `.faq-item` pattern from `style.md`
- **Trigger:**
  - Background: Transparent
  - Border bottom: `--border-w` solid `--border-color`
  - Padding: `--space-1_5`
  - Hover: Background → `#18181b` (from `style.md` FAQ pattern)
- **Content:**
  - Display: `none` (closed) or `block` (open)
  - Padding: `0 var(--space-1_75) var(--space-1_5)`
  - Text: `--text-subtle`, `--fontSize-sm`

### Example Usage
```html
<div class="accordion">
  <button class="accordion-trigger">ADVANCED SETTINGS</button>
  <div class="accordion-content">Content here</div>
</div>
```

### Token References
| Element | Token |
|---------|-------|
| Border | `colors.border.neutral`, `borders.thin` |
| Hover bg | `#18181b` (from `style.md` FAQ pattern) |
| Text | `colors.text.subtle` |
| Padding | `spacing.lg`, `spacing.xl` |

---

## Accessibility Notes

All components include:
- **Keyboard navigation:** Tab order, Enter/Space for buttons
- **Focus indicators:** `:focus-visible` outline (2px `--border-color`)
- **ARIA labels:** Appropriate `aria-label`, `aria-expanded`, `aria-checked`
- **Screen reader support:** Semantic HTML, proper heading hierarchy
- **Color contrast:** WCAG AA minimum (white on black meets AAA)

---

**Next:** Function-to-UI Mapping

