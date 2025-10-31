# Information Architecture & User Flows

## Sitemap

```
/
├── /dashboard (Home/Landing)
│   └── Recent jobs list
│   └── Quick job creation CTA
│
├── /jobs
│   ├── /jobs/new (Create Job)
│   │   ├── URL input(s)
│   │   ├── Selector configuration
│   │   ├── Advanced settings (rate limits, robots.txt)
│   │   └── Test selectors (optional modal)
│   │
│   ├── /jobs/:id (Job Details)
│   │   ├── Status and progress
│   │   ├── Configuration summary
│   │   ├── Results preview table
│   │   └── Export actions
│   │
│   └── /jobs/:id/execution (Live Execution View)
│       ├── Real-time progress
│       ├── URL-by-URL status
│       ├── Live log feed
│       └── Cancel action
│
└── /help
    └── Documentation/FAQ
```

## User Flow Diagrams

### Flow 1: Create and Execute Basic Scraping Job

```
[Landing / Dashboard]
        ↓
[Click "New Job" Button]
        ↓
[/jobs/new - Create Job Form]
        ↓
[Fill URL Input]
        ↓
[Configure Selectors] → [Optional: Test Selectors Modal]
        ↓                    ↓
        └────────[Back to Form]────┘
        ↓
[Set Advanced Settings] (optional)
        ↓
[Click "Start Scraping" Button]
        ↓
[POST /api/jobs - Create Job]
        ↓
[Redirect to /jobs/:id]
        ↓
[/jobs/:id - Job Details]
        ↓
[Job Status: PENDING → RUNNING]
        ↓
[Real-time Progress Updates via WebSocket]
        ↓
[Job Status: COMPLETED]
        ↓
[Results Table Renders]
        ↓
[Click "Export CSV" or "Export JSONL"]
        ↓
[GET /api/jobs/:id/export?format=csv]
        ↓
[Download File]
```

### Flow 2: Monitor Running Job

```
[User on /jobs/:id]
        ↓
[WebSocket Connection Established]
        ↓
[Receive job:status event]
        ↓
[Update Status Badge] (RUNNING)
        ↓
[Receive job:progress event]
        ↓
[Update Progress Bar]
        ↓
[Update "Pages Scraped" Counter]
        ↓
[Receive job:complete event]
        ↓
[Status Badge → COMPLETED]
        ↓
[Show Result Count]
        ↓
[Enable Export Buttons]
```

### Flow 3: Test CSS Selectors

```
[User on /jobs/new Form]
        ↓
[Fill URL Input]
        ↓
[Fill Container Selector]
        ↓
[Click "Test Selectors" Button]
        ↓
[POST /api/test-selectors]
  Body: { url, selectors }
        ↓
[Show Loading State]
        ↓
[Receive Test Results]
        ↓
[Modal: Selector Test Results]
  ├── Preview of matched elements
  ├── Extracted data preview
  └── Validation status
        ↓
[User Reviews Results]
        ↓
[Click "Use These Selectors" or "Close"]
```

### Flow 4: Error Recovery

```
[Job Status: FAILED]
        ↓
[Error Message Displayed]
        ↓
[User Clicks "View Error Details"]
        ↓
[Modal: Error Details]
  ├── Error message
  ├── Failed URL
  ├── Suggested fixes
  └── "Edit & Retry" button
        ↓
[User Clicks "Edit & Retry"]
        ↓
[Redirect to /jobs/new with pre-filled values]
        ↓
[User Adjusts Configuration]
        ↓
[Start New Job]
```

### Flow 5: Batch Multi-URL Job

```
[/jobs/new - Create Job]
        ↓
[Click "Add URL" Multiple Times]
        ↓
[Fill Multiple URL Inputs]
        ↓
[Configure Shared Selectors]
        ↓
[Set Rate Limits Per Domain]
        ↓
[Robots.txt Validation for Each Domain]
        ↓
[Start Scraping]
        ↓
[Job Details View]
        ↓
[Multi-URL Progress Table]
  ├── URL 1: 45% complete
  ├── URL 2: 12% complete
  └── URL 3: 78% complete
        ↓
[Individual URL Status Updates]
        ↓
[All URLs Complete]
        ↓
[Combined Results Table]
        ↓
[Export All or Per-URL]
```

## Navigation Structure

### Global Navigation
- **Primary Nav:** Fixed top bar (desktop) or hamburger menu (mobile)
  - Logo: "B8" mark (left)
  - Links: "DASHBOARD", "JOBS", "HELP" (right)
  - Style: `style.md` → `.nav` class

### Secondary Navigation
- **Breadcrumbs:** (when applicable)
  - DASHBOARD > JOBS > Job #123
  - Style: `style.md` → `.meta` class, `--text-subtle` color

### Contextual Actions
- **Action Bar:** Per-page action buttons
  - Position: Top-right of content area
  - Examples: "NEW JOB", "EXPORT", "CANCEL"
  - Style: `style.md` → Button component

## Route Rules

### Route Patterns
```
/dashboard              → Landing page, job list
/jobs                   → Redirect to /dashboard
/jobs/new               → Create job form
/jobs/:id               → Job details (read-only if completed)
/jobs/:id/execution     → Live execution view (only if running)
/help                   → Help/documentation
/*                      → 404 Not Found
```

### Route Guards
- **/jobs/:id/execution:** Only accessible if job status is RUNNING
- **Export actions:** Only enabled if job status is COMPLETED and results exist

## Empty States

### Dashboard (No Jobs)
```
[Dashboard Card]
  └── Empty State
      ├── Icon/Symbol (monospace character)
      ├── Heading: "NO JOBS YET"
      ├── Body: "Create your first scraping job to get started."
      └── CTA Button: "CREATE JOB"
```

### Job Details (No Results)
```
[Results Section]
  └── Empty State
      ├── Status: "JOB COMPLETED"
      ├── Message: "No data was extracted. Check your selectors."
      └── CTA: "EDIT SELECTORS" (creates new job with same config)
```

### Selector Test (No Matches)
```
[Test Results Modal]
  └── Warning State
      ├── Icon: ⚠
      ├── Message: "NO ELEMENTS MATCHED"
      ├── Body: "The selectors didn't match any elements on this page."
      └── Suggestions: Common selector patterns
```

## First-Run Experience

### Onboarding Flow (Assumed)
1. **First Visit:** Show brief intro tooltip on dashboard
2. **Tooltip Content:** "Create a job to start scraping web pages"
3. **Dismissible:** Click outside or "GOT IT" button
4. **Not Persisted:** Shows on every first visit (no cookies/localStorage assumed)

---

**Next Steps:** Proceed to Screen Specifications and Component Library.

