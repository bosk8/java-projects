# Screen Specification: Live Execution View

**Route:** `/jobs/:id/execution`  
**Purpose:** Real-time monitoring of running scraping job  
**Layout:** Multi-section layout with live log feed

## Wireframe

```
┌─────────────────────────────────────────────────────┐
│ [B8]                    DASHBOARD  JOBS  HELP      │ ← Global Nav
├─────────────────────────────────────────────────────┤
│ DASHBOARD > JOBS > JOB #001 > EXECUTION             │ ← Breadcrumbs
├─────────────────────────────────────────────────────┤
│                                                     │
│  JOB #001 - LIVE EXECUTION            [RUNNING]    │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ OVERALL PROGRESS                              │  │
│  │ ▓▓▓▓▓▓▓▓░░░░░░░░░░  45%                      │  │
│  │ 23/50 pages · 12 records extracted           │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────Accept
│  │ URL STATUS                                     │  │
│  │ https://example.com/products                   │  │
│  │ ▓▓▓▓▓▓░░░░  40% · 8 pages scraped            │  │
│  ├──────────────────────────────────────────────┤  │
│  │ https://example.com/categories                │  │
│  │ ▓▓▓▓▓▓▓▓▓▓  80% · 15 pages scraped           │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │ LIVE LOG                          [PAUSE]    │  │
│  │ [12:34:56] Fetching: /products/page-1        │  │
│  │ [12:34:57] Extracted 3 records               │  │
│  │ [12:34:58] Fetching: /products/page-2        │  │
│  │ [12:34:59] Rate limit: waiting 2000ms        │  │
│  │ [12:35:01] Extracted 2 records               │  │
│  │ ... (auto-scrolling)                         │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│                                      [CANCEL JOB]  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Layout Grid

- **Container:** `--containerMax`
- **Sections:** Vertical stack, `--space-1_5` between
- **Card padding:** `--space-1_5`

## Components Used

### 1. Overall Progress Card
- **Component:** `ProgressCard` (same as Job Details)
- **Metrics:** Total pages, records, percentage

### 2. URL Status List
- **Component:** `Card` + `URLStatusItem[]`
- **Per URL:**
  - URL (truncated if long)
  - Individual progress bar
  - Page count and percentage

### 3. Live Log Feed
- **Component:** `LogFeed`
- **Container:** `Card` with max-height, scrollable
- **Log entries:**
  - Timestamp: `--text-dim`, `--fontSize-xs`
  - Message: `--text-primary`, `--fontSize-sm`
  - Format: `[HH:MM:SS] Message text`
- **Auto-scroll:** Enabled by default
- **Pause button:** Toggle auto-scroll

### 4. Cancel Button
- **Component:** `Button` (destructive variant, derived)
- **Position:** Bottom-right
- **Confirmation:** Modal before canceling

## Responsive Rules

### Mobile
- Log feed: Full width, reduced max-height
- URL status: Stacked
- Cancel button: Full width, bottom of page

### Desktop
- Log feed: Max-height 400px, scrollable
- URL status: Side-by-side progress bars
- Cancel button: Inline, right-aligned

## States

### Active Execution
- Live updates via WebSocket
- Progress bars animating
- Log entries streaming
- Auto-scroll enabled

### Paused (User Action)
- Updates continue receiving
- Auto-scroll disabled
- Visual indicator: "PAUSED" badge

### Canceled
- Updates stop
- Final status displayed
- Redirect to `/jobs/:id` after 2 seconds

## Real-Time Events

- `job:progress` → Update overall and per-URL progress
- `job:log` → Append log entry
- `job:url-start` → Add URL to status list
- `job:url-complete` → Mark URL as complete
- `job:error` → Highlight error in log

## Exact Token References

| Element | Token Path | Value |
|---------|-----------|-------|
| Card background | `colors.surface.card` | `#09090B` |
| Progress fill | `colors.accent.success` | `#22C55E` |
| Log timestamp | `colors.text.dim` | `#71717A` |
| Log message | `colors.text.primary` | `#FFFFFF` |
| Border | `colors.border.neutral` | `rgb(39 39 42)` |
| Spacing | `spacing.lg` | `1.5rem` |
| Font sizes | `fontSize.xs`, `fontSize.sm` | `0.625rem`, `0.75rem` |

---

**Next:** Component Library Specification

