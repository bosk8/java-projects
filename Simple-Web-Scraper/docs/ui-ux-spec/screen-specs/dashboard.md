# Screen Specification: Dashboard

**Route:** `/dashboard` (also `/`)  
**Purpose:** Landing page displaying recent scraping jobs and quick actions  
**Layout:** Single column (mobile), two-column grid (desktop)

## Wireframe

```
┌─────────────────────────────────────────────────────┐
│ [B8]                    DASHBOARD  JOBS  HELP      │ ← Global Nav
├─────────────────────────────────────────────────────┤
│                                                     │
│           SIMPLE WEB SCRAPER                        │
│           SCRAPE, EXTRACT, EXPORT                   │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │                                              │  │
│  │  [NEW JOB]                                   │  │ ← Primary CTA
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  RECENT JOBS                                        │
│  ┌──────────────────────────────────────────────┐  │
│  │ JOB #001                    [RUNNING]        │  │
│  │ https://example.com/products                  │  │
│  │ 45% complete · 23 pages scraped              │  │
│  ├──────────────────────────────────────────────┤  │
│  │ JOB #002                    [COMPLETED]      │  │
│  │ https://news.example.com                     │  │
│  │ 127 records · 2 minutes ago                  │  │
│  ├──────────────────────────────────────────────┤  │
│  │ JOB #003                    [FAILED]         │  │
│  │ https://site.example.com                     │  │
│  │ Error: Connection timeout                    │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Layout Grid

### Desktop (≥768px)
- **Container:** `--containerMax` (min(1100px, 90vw))
- **Grid:** 4 columns (`--layout.gridColsDesktop`)
- **Spacing:** `--space-2` (2rem) between sections

### Mobile (<768px)
- **Container:** Full width with `--space-1` (1rem) padding
- **Grid:** 2 columns (`--layout.gridColsMobile`)
- **Spacing:** `--space-1_5` (1.5rem) between sections

## Components Used

### 1. Global Navigation Bar
- **Component:** `NavBar`
- **Position:** Fixed top
- **Height:** Auto (padding `--space-1`)
- **Background:** `--bg-black`
- **Border:** Bottom `--border-w` solid `--border-color`

### 2. Hero Section
- **Component:** `Hero`
- **Layout:** Centered text, `--space-4` (4rem) top padding
- **Typography:** 
  - Heading: `.tagline` class (`--text-primary`, uppercase, `--fs-base`)
  - Subheading: `.meta` class (`--text-muted`, `--fontSize-md`)

### 3. Primary CTA Card
- **Component:** `Card` + `Button` (primary variant)
- **Background:** `--surface-card`
- **Border:** `--border-outer-w` solid `--border-color`
- **Padding:** `--space-2` (2rem)
- **Shadow:** `--shadow-tint`
- **Button:** Full width on mobile, centered with max-width on desktop

### 4. Recent Jobs List
- **Component:** `Card` containing `JobListItem[]`
- **Background:** `--surface-card`
- **Border:** `--border-w` solid `--border-color`
- **Padding:** `--space-1` per item
- **Border between items:** `--border-b` (1px bottom border)

### 5. Job List Item
- **Component:** `JobListItem`
- **Layout:** Flex row, space-between
- **Left:** Job ID, URL (truncated), status/metadata
- **Right:** Status badge
- **Interactive:** Clickable → navigate to `/jobs/:id`
- **Hover:** Background `--bg-elev1` (derived: slightly lighter than card)

## Responsive Rules

### Mobile (<768px)
- Hero text: `--fontSize-base` (no clamp adjustment)
- Job list: Stacked, no truncation
- Primary CTA: Full width button
- Nav: Hamburger menu (drawer pattern)

### Desktop (≥768px)
- Hero text: Responsive clamp (16px → 20px)
- Job list: Side-by-side layout with truncation
- Primary CTA: Centered, max-width 600px
- Nav: Horizontal links

## States

### Default State
- All jobs visible (up to 10 most recent)
- Empty state if no jobs exist (see Empty States section)
- Primary CTA enabled

### Loading State
- Jobs list: Skeleton loaders (placeholder cards)
- Primary CTA: Disabled during initial load

### Error State
- Error message card: Red text (derived: use `--text-primary` with error context)
- Retry button available

## Exact Token References

| Element | Token Path | Value |
|---------|-----------|-------|
| Page background | `colors.bg.black` | `#000000` |
| Card background | `colors.surface.card` | `#09090B` |
| Card border | `colors.border.neutral` | `rgb(39 39 42)` |
| Card border width | `borders.outer` | `2px` (desktop), `1px` (mobile) |
| Text primary | `colors.text.primary` | `#FFFFFF` |
| Text muted | `colors.text.muted` | `#E8E8E8` |
| Text subtle | `colors.text.subtle` | `#A1A1AA` |
| Container padding | `spacing.containerPadTop` | `10rem` (top) |
| Container max width | `layout.containerMax` | `min(1100px, 90vw)` |
| Section spacing | `spacing.xl` | `2rem` |
| Font family | `fontFamily.ui` | JetBrains Mono stack |
| Font size base | `fontSize.base` | `clamp(16px, calc(15.2px + 0.25vw), 20px)` |
| Border radius | `radii.md` | `6px` |
| Shadow | `colors.shadow.tint` | `#0000000d` |

---

**Next Screen:** `/jobs/new` (Create Job Form)

