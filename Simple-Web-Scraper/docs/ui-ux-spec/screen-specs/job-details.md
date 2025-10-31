# Screen Specification: Job Details

**Route:** `/jobs/:id`  
**Purpose:** View job status, progress, configuration, and results  
**Layout:** Single column with status header, config summary, and results table

## Wireframe

```
┌─────────────────────────────────────────────────────┐
│ [B8]                    DASHBOARD  JOBS  HELP      │ ← Global Nav
├─────────────────────────────────────────────────────┤
│ DASHBOARD > JOBS > JOB #001                         │ ← Breadcrumbs
├─────────────────────────────────────────────────────┤
│                                                     │
│  JOB #001                              [RUNNING]   │ ← Status Badge
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ PROGRESS                                      │  │
│  │ ▓▓▓▓▓▓▓▓░░░░░░░░░░  45%                      │  │ ← Progress Bar
│  │ 23 pages scraped · Started 2 minutes ago     │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ CONFIGURATION                                 │  │
│  │ URL: https://example.com/products             │  │
│  │ Container: article, .item                     │  │
│  │ Title: h1, h2, h3                             │  │
│  │ Rate Limit: 2000ms                            │  │
│  │ Robots.txt: Respected                         │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ RESULTS (23)                    [EXPORT CSV]  │  │
│  │                                  [EXPORT JSONL]│  │
│  ├──────────────────────────────────────────────┤  │
│  │ TITLE          │ DESCRIPTION    │ URL         │  │ ← Table Header
│  ├──────────────────────────────────────────────┤  │
│  │ Product Name 1 │ Description... │ /product/1  │  │
│  ├──────────────────────────────────────────────┤  │
│  │ Product Name 2 │ Description... │ /product/2  │  │
│  ├──────────────────────────────────────────────┤  │
│  │ ... (paginated)                               │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  [VIEW LIVE EXECUTION]  [CANCEL]                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Layout Grid

- **Container:** `--containerMax`
- **Section spacing:** `--space-1_5` (1.5rem)
- **Card padding:** `--space-1_5` (1.5rem)

## Components Used

### 1. Status Header
- **Component:** `StatusHeader`
- **Layout:** Flex row, space-between
- **Left:** Job ID (`.meta` class)
- **Right:** Status badge

### 2. Status Badge
- **Component:** `Badge`
- **Variants:** PENDING, RUNNING, COMPLETED, FAILED, CANCELLED
- **Colors:** 
  - RUNNING: `--accent-success` (green)
  - COMPLETED: `--text-muted` (gray)
  - FAILED: `--text-primary` (white, with error context)
  - PENDING: `--text-subtle` (gray)
- **Background:** `--bg-elev1` with border `--border-w`

### 3. Progress Section
- **Component:** `ProgressCard`
- **Progress Bar:**
  - Background: `--bg-elev1`
  - Fill: `--accent-success` (green)
  - Height: 8px (derived)
  - Border radius: `--r-sm` (4px)
- **Text:** `.meta-sm` class

### 4. Configuration Card
- **Component:** `Card` with key-value list
- **Layout:** Vertical list of label-value pairs
- **Label:** `.label` class (uppercase)
- **Value:** `.meta` class
- **Border between items:** `--border-b`

### 5. Results Section
- **Component:** `ResultsCard` + `DataTable`
- **Header:** Flex row, space-between
- **Left:** "RESULTS (N)"
- **Right:** Export buttons

### 6. Data Table
- **Component:** `Table Profession`
- **Header:**
  - Background: `--bg-elev1`
  - Text: `.label` class
  - Padding: `--space-0_75`
- **Rows:**
  - Border: `--border-b` between rows
  - Hover: Background `--bg-elev1` (derived)
  - Padding: `--space-0_75`
- **Pagination:** Below table (see Component Library)

### 7. Action Buttons
- **View Live Execution:** `Button` (secondary) — only if RUNNING
- **Cancel:** `Button` (secondary) — only if RUNNING
- **Export CSV:** `Button` (secondary) — only if COMPLETED
- **Export JSONL:** `应税` (secondary) — only if COMPLETED

## Responsive Rules

### Mobile
- Table: Horizontal scroll or stacked layout
- Status header: Stacked (badge below job ID)
- Action buttons: Stacked, full width
- Configuration: Vertical list

### Desktop
- Table: Full width with all columns visible
- Status header: Side-by-side
- Action buttons: Inline, right-aligned
- Configuration: Two-column grid

## States

### PENDING
- Progress: 0%
- Status badge: "PENDING"
- Action: "CANCEL" (if allowed)

### RUNNING
- Progress: Updates via WebSocket (real-time)
- Status badge: "RUNNING" (animated pulse, optional)
- Progress bar: Animated fill
- Actions: "VIEW LIVE EXECUTION", "CANCEL"
- Results: Show partial results if available

### COMPLETED
- Progress: 100%
- Status badge: "COMPLETED"
- Results: Full table with pagination
- Actions: "EXPORT CSV", "EXPORT JSONL"
- Metadata: Completion time, total records

### FAILED
- Progress: Stops at failure point
- Status badge: "FAILED"
- Error message: Displayed in error card
- Actions: "VIEW ERROR", "RETRY WITH EDITS"
- Results: Partial results (if any)

### CANCELLED
- Progress: Frozen at cancellation point
- Status badge: "CANCELLED"
- Results: Partial results (if any)
- Actions: None (read-only)

## Real-Time Updates (WebSocket)

### Events Received
- `job:status` → Update status badge
- `job:progress` → Update progress bar and page count
- `job:result` → Append to results table (live streaming)
- `job:error` → Show error notification
- `job:complete` → Update to COMPLETED state

### UI Updates
- Progress bar: Smooth animation (CSS transition)
- Page count: Counter animation (optional)
- Results table: Append rows without full refresh (virtual scroll or pagination)

## Exact Token References

| Element | Token Path | Value |
|---------|-----------|-------|
| Page background | `colors.bg.black` | `#000000` |
| Card background | `colors.surface.card` | `#09090B` |
| Card border | `colors.border.neutral` | `rgb(39 39 42)` |
| Progress bar fill | `colors.accent.success` | `#22C55E` |
| Progress bar bg | `colors.bg.elev1` | `#0A0A0A` |
| Table header bg | `colors.bg.elev1` | `#0A0A0A` (derived) |
| Text primary | `colors.text.primary` | `#FFFFFF` |
| Text muted | `colors.text.muted` | `#E8E8E8` |
| Text subtle | `colors.text.subtle` | `#A1A1AA` |
| Border width | `borders.thin` | `1px` |
| Card padding | `spacing.lg` | `1.5rem` |
| Section spacing | `spacing.xl` | `2rem` |
| Border radius | `radii.sm` | `4px` |
| Font family | `fontFamily.ui` | JetBrains Mono stack |

---

**Next Screen:** `/jobs/:id/execution` (Live Execution View)

