# Navigation & Routing Model

## Global Navigation

### Primary Navigation Bar
**Component:** `NavBar`  
**Position:** Fixed top  
**Height:** Auto (padding `--space-1`)  
**Background:** `--bg-black`  
**Border:** Bottom `--border-w` solid `--border-color`

**Structure:**
```
┌─────────────────────────────────────────────────┐
│ [B8 Logo]        DASHBOARD  JOBS  HELP          │
└─────────────────────────────────────────────────┘
```

**Links:**
- **Logo:** Link to `/dashboard` (home)
- **DASHBOARD:** Link to `/dashboard`
- **JOBS:** Link to `/jobs` (redirects to `/dashboard`)
- **HELP:** Link to `/help`

**Styles:**
- **Links:** `.nav` class from `style.md`
  - Font: `--font-ui`
  - Text transform: uppercase
  - Letter spacing: `0.05em`
  - Color: `--text-muted`
  - Hover: `--text-primary`
- **Active Link:** `--text-primary` (current page)

**Responsive:**
- **Desktop (≥768px):** Horizontal links
- **Mobile (<768px):** Hamburger menu (drawer)

### Hamburger Menu (Mobile)
**Component:** `Drawer` or `SlideOutMenu`  
**Trigger:** Hamburger icon (☰)  
**Position:** Slide from left  
**Background:** `--surface-card`  
**Overlay:** Dark overlay (`rgba(0, 0, 0, 0.8)`)  
**Links:** Vertical stack, same styles as nav

---

## Secondary Navigation

### Breadcrumbs
**Component:** `Breadcrumbs`  
**Position:** Below global nav, above page content  
**Style:** `.meta` class, `--text-subtle`

**Format:**
```
DASHBOARD > JOBS > JOB #001
```

**Rules:**
- Only show if more than 1 level deep
- Each segment clickable (except current)
- Separator: ` > ` (space, greater-than, space)

**Examples:**
- `/dashboard` → No breadcrumbs
- `/jobs/new` → `DASHBOARD > JOBS > NEW JOB`
- `/jobs/123` → `DASHBOARD > JOBS > JOB #123`
- `/jobs/123/execution` → `DASHBOARD > JOBS > JOB #123 > EXECUTION`

---

## Route Configuration

### Route Patterns

```
/                        → Redirect to /dashboard
/dashboard               → Dashboard (job list)
/jobs                    → Redirect to /dashboard
/jobs/new                → Create job form
/jobs/:id                → Job details
/jobs/:id/execution      → Live execution view (only if RUNNING)
/help                    → Help/documentation
/*                       → 404 Not Found
```

### Route Guards

#### `/jobs/:id/execution`
- **Condition:** Job status must be `RUNNING`
- **Action if false:** Redirect to `/jobs/:id`
- **Check:** On route enter, validate via API

#### Export Actions
- **Condition:** Job status must be `COMPLETED` and results exist
- **Action if false:** Disable export buttons, show message

---

## Navigation Patterns

### Page Transitions
- **Type:** Instant (no page transition animations per `style.md`)
- **Loading:** Skeleton loaders during data fetch

### Deep Linking
- All routes are bookmarkable
- Job detail pages accessible via URL directly
- State preserved in URL (no query params for simple cases)

### Back Navigation
- Browser back button works as expected
- Cancel buttons return to previous page
- Breadcrumbs provide navigation path

---

## Contextual Actions

### Action Bar (Per Page)
**Position:** Top-right of content area  
**Layout:** Flex row, gap `--space-1`

**Examples:**

#### Dashboard
```
[NEW JOB]
```

#### Create Job
```
[CANCEL] [START SCRAPING]
```

#### Job Details
```
[VIEW LIVE EXECUTION] [CANCEL]  (if RUNNING)
[EXPORT CSV] [EXPORT JSONL]     (if COMPLETED)
```

#### Live Execution
```
[PAUSE] [CANCEL JOB]
```

---

## Empty States & First-Run

### Dashboard (No Jobs)
```
┌─────────────────────────────────────┐
│                                     │
│          NO JOBS YET                │
│                                     │
│   Create your first scraping        │
│   job to get started.               │
│                                     │
│        [CREATE JOB]                 │
│                                     │
└─────────────────────────────────────┘
```

**Style:**
- Centered card
- Heading: `.tagline` class
- Body: `.meta` class, `--text-subtle`
- CTA: Primary button

### 404 Not Found
```
┌─────────────────────────────────────┐
│                                     │
│           404                       │
│      PAGE NOT FOUND                 │
│                                     │
│   The page you're looking for       │
│   doesn't exist.                    │
│                                     │
│        [GO TO DASHBOARD]            │
│                                     │
└─────────────────────────────────────┘
```

---

## Token References

| Element | Token Path | Value |
|---------|-----------|-------|
| Nav background | `colors.bg.black` | `#000000` |
| Nav border | `colors.border.neutral`, `borders.thin` | `rgb(39 39 42)`, `1px` |
| Nav text | `colors.text.muted` | `#E8E8E8` |
| Nav hover | `colors.text.primary` | `#FFFFFF` |
| Breadcrumb text | `colors.text.subtle` | `#A1A1AA` |
| Nav padding | `spacing.md` | `1rem` |

---

**Next:** Accessibility Checklist

