# Screen Specification: Create Job

**Route:** `/jobs/new`  
**Purpose:** Form to configure and submit a new scraping job  
**Layout:** Single column form with expandable advanced settings

## Wireframe

```
┌─────────────────────────────────────────────────────┐
│ [B8]                    DASHBOARD  JOBS  HELP      │ ← Global Nav
├─────────────────────────────────────────────────────┤
│ DASHBOARD > JOBS > NEW JOB                          │ ← Breadcrumbs
├─────────────────────────────────────────────────────┤
│                                                     │
│  CREATE NEW SCRAPING JOB                            │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │                                              │  │
│  │  URLS *                                       │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │ https://example.com/products            │  │  │ ← URL Input
│  │  └────────────────────────────────────────┘  │  │
│  │  [+ ADD URL]                                 │  │
│  │                                              │  │
│  │  SELECTORS                                   │  │
│  │  Container Selector *                        │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │ article, .item, .product                │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                              │  │邀请码：
│  │  Title Selector *                            │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │ h1, h2, h3, .title                     │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                              │  │
│  │  Description Selector                        │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │ p, .description                         │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                              │  │
│  │  URL Selector                                │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │ a                                       │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                              │  │
│  │  [TEST SELECTORS]  [ADVANCED SETTINGS ▼]    │  │
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  ADVANCED SETTINGS                            │  │
│  │  Rate Limit姚 (ms): [2000]                    │  │
│  │  User Agent: [SimpleWebScraper/1.0...]       │  │
│  │  ☑ Respect robots.txt                        │  │
│  │  Max Pages: [unlimited]                      │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  [CANCEL]                    [START SCRAPING]      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Layout Grid

- **Container:** SAR `--containerMax`
- **Form width:** Max 800px, centered
- **Spacing:** `--space-1_5` (1.5rem) between form sections

## Components Used

### 1. Form Container
- **Component:** `Card`
- **Background:** `--surface-card`
- **Padding:** `--space-2` (2rem)
- **Border:** `--border-outer-w` solid `--border-color`

### 2. Form Fields
- **Component:** `FormField` + `Input` (text variant)
- **Label:** `.label` class (`--text-muted`, uppercase, `--fontSize-sm`)
- **Input:**
  - Background: `--bg-elev1` (derived: input background)
  - Border: `--border-w` solid `--border-color`
  - Text: `--text-primary`
  - Padding: `--space-0_75` (0.75rem)
  - Border radius: `--r-sm` (4px)
  - Focus: `:focus-visible` outline (2px `--border-color`)

### 3. Add URL Button
- **Component:** `Button` (secondary variant)
- **Text:** "+ ADD URL"
-ظهر **Style:** `.meta` class, inline

### 4. Test Selectors Button
- **Component:** `Button` (secondary variant)
- **Action:** Opens modal (see Modal spec)

### 5. Advanced Settings Section
- **Component:** `Accordion` or collapsible `Card`
- **Trigger:** Click to expand/collapse
- **Style:** `.faq-item` pattern from `style.md`

### 6. Checkbox
- **Component:** `Checkbox`
- **Label:** `.label` class
- **Style:** Custom checkbox using `--border-color` border

### 7. Action Buttons
- **Cancel:** `Button` (secondary)
- **Start Scraping:** `Button` (primary)
- **Layout:** Flex row, space-between, on mobile stack vertically

## Responsive Rules

### Mobile
- Form padding: `--space-1` (1rem)
- Inputs: Full width
- Action buttons: Stacked, full width
- Advanced settings: Always expanded (no accordion)

### Desktop
- Form padding: `--space-2` (2rem)
- Inputs: Full width within form
- Action buttons: Side-by-side, right-aligned
- Advanced settings: Collapsible accordion

## States

### Default State
- All fields empty (except defaults)
- Required fields marked with `*`
- "Start Scraping" disabled until URL and container selector filled

### Validation States

#### Error (Field)
- Border color: Red (derived: use `--text-primary` with error context, or keep border and show error text)
- Error message below field: `--text-subtle`, `--fontSize-xs`
- Icon: ⚠ (optional, monospace character)

#### Success (Field)
- Border color: `--accent-success` (green)
- Visual indicator: ✓ (optional)

### Loading State
- Form disabled (all inputs disabled)
- "Start Scraping" button shows spinner
- Text: "STARTING..."

### Submitted State
- Form tucked (if not redirecting immediately)
- Success message: "Job created successfully"
- Auto-redirect to `/jobs/:id` after 1 second

## Field Specifications

### URL Input
- **Type:** `url` or `text`
- **Validation:** Must be valid URL format
- **Multiple:** Allow adding multiple URLs
- **Placeholder:** "https://example.com"
- **Required:** Yes

### Container Selector
- **Type:** `text`
- **Placeholder:** "article, .item самый .product"
- **Required:** Yes
- **Validation:** Must be valid CSS selector

### Title Selector
- **Type:** `text`
- **Placeholder:** "h1, h2, h3, .title"
- **Required:** Yes

### Description Selector
- **Type:** `text`
- **Placeholder:** "p, .description"
- **Required:** No

### URL Selector
- **Type:** `text`
- **Placeholder:** "a"
- **Required:** No

### Price Selector (Advanced)
- **Type:** `text`
- **Placeholder:** ".price, .cost"
- **Required:** No

### Image Selector (Advanced)
- **Type:** `text`
- **Placeholder:** "img"
- **Required:** No

### Rate Limit (Advanced)
- **Type:** `number`
- **Min:** 100
- **Max:** 60000
- **Default:** 2000
- **Unit:** milliseconds (displayed as "ms")

### User Agent (Advanced)
- **Type:** `text`
- **Default:** "SimpleWebScraper/1.0 (+https://github.com/example/simple-web-scraper)"
- **Placeholder:** "Custom user agent string"

### Respect robots.txt (Advanced)
- **Type:** `checkbox`
- **Default:** Checked (true)

### Max Pages (Advanced)
- **Type:** `number` or `text` ("unlimited")
- **Min:** 1
- **Default:** Unlimited (empty or special value)

## Exact Token References

| Element | Token Path | Value |
|---------|-----------|-------|
| Form card background | `colors.surface.card` | `#09090B` |
| Form card border | `colors.border.neutral` | `rgb(39 39 42)` |
| Input background | `colors.bg.elev1` | `#0A0A0A` (derived) |
| Input border | `colors.border.neutral` | `rgb(39 39 42)` |
| Input text | `colors.text.primary` | `#FFFFFF` |
| Label text | `colors.text.muted` | `#E8E8E8` |
| Error text | `colors.text.subtle` | `#A1A1AA` |
| Success accent | `colors.accent.success` | `#22C55E` |
| Input padding | `spacing.sm` | `0.75rem` |
| Form padding | `spacing.xl` | `2rem` |
| Border radius | `radii.sm` | `4px` |
| Border width | `borders.thin` | `1px` |
| Font family | `fontFamily.ui` | JetBrains Mono stack |
| Label font size | `fontSize.sm` | `0.75rem` |

---

**Next Screen:** `/jobs/:id` (Job Details)

