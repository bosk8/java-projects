# Function-to-UI Mapping

Mapping backend features and API endpoints to UI triggers, data contracts, validations,ientos and feedback patterns.

## Backend → Frontend Data Contracts

### Job Model
```typescript
interface Job {
  id: string;                    // UUID
  status: JobStatus;             // PENDING | RUNNING | COMPLETED | FAILED | CANCELLED
  urls: string[];                // Array of URLs to scrape
  selectors: DataSelectors;      // CSS selector configuration
  config: JobConfig;             // Rate limits, user agent, etc.
  createdAt: string;             // ISO 8601 timestampспособ
  updatedAt: string;             // ISO 8601 timestamp
  results?: ScrapedData[];       // Extracted data (only when completed)
  progress?: JobProgress;        // Current progress metrics
  error?: JobError;              // Error details (if failed)
}

interface JobProgress {
  pagesScraped: number;
  totalPages?: number;
  recordsExtracted: number;
  percentage: number;            // 0-100
  currentUrl?: string;           // Currently processing URL
  startedAt: string;
}

interface JobError {
  message: string;
  failedUrl?: string;
  timestamp: string;
  type: 'NETWORK' | 'PARSING' | 'VALIDATION' | 'ROBOTS' | 'UNKNOWN';
}
```

### DataSelectors (from backend)
```typescript
interface DataSelectors {
  containerSelector: string;     // Required
  titleSelector: string;         // Required
  descriptionSelector?: string;
  urlSelector?: string;
  priceSelector?: string;
  imageSelector?: string;
}
```

### ScrapedData (from backend)
```typescript
interface ScrapedData {
  title?: string;
  description?: string;
  url?: string;
  price?: string;
  imageUrl?: string;
}
```

## API Endpoints → UI Triggers

### POST /api/jobs
**UI Trigger:** "START SCRAPING" button on `/jobs/new`  
**Request Body:**
```json
{
  "urls": ["https://example.com"],
  "selectors": {
    "containerSelector": "article, .item",
    "titleSelector": "h1, h2",
    "descriptionSelector": "p",
    "urlSelector": "a",
    "priceSelector": ".price",
    "imageSelector": "img"
  },
  "config": {
    "rateLimitMs": 2000,
    "userAgent": "SimpleWebScraper/1.0",
    "respectRobots": true,
    "maxPages": null
  }
}
```

**Validation (Frontend):**
- URLs: Non-empty array, valid URL format
- containerSelector: Non-empty string
- titleSelector: Non-empty string
- rateLimitMs: Number, 100-60000
- userAgent: Non-empty string

**Response:**
```json
{
  "job": {
    "id": "job-123",
    "status": "PENDING",
    "urls": [...],
    "selectors": {...},
    "config": {...},
    "createdAt": "2025-01-27T12:00:00Z"
  }
}
```

**UI Feedback:**
- **Loading:** Button disabled, spinner, "STARTING..."
- **Success:** Redirect to `/jobs/:id`
- **Error:** Display error message in form, highlight invalid fields

---

### GET /api/jobs
**UI Trigger:** Dashboard page load, refresh button  
**Response:**
```json
{
  "jobs": [
    {
      "id": "job-123",
      "status": "RUNNING",
      "urls": ["https://example.com"],
      "progress": {
        "pagesScraped": 23,
        "recordsExtracted": 45,
        "percentage": 45
      },
      "createdAt": "2025-01-27T12:00:00Z"
    }
  ]
}
```

**UI Feedback:**
- **Loading:** Skeleton loaders
- **Success:** Render job list
- **Error:** Error card with retry button

---

### GET /api/jobs/:id
**UI Trigger:** Navigate to `/jobs/:id`, WebSocket reconnection  
**Response:**
```json
{
  "job": {
    "id": "job-123",
    "status": "COMPLETED",
    "urls": ["https://example.com"],
    "selectors": {...},
    "config": {...},
    "results": [
      {
        "title": "Product Name",
        "description": "Description",
        "url": "/product/1",
        "price": "$99.99",
        "imageUrl": "/image.jpg"
      }
    ],
    "progress": {
      "pagesScraped": 50,
      "recordsExtracted": 127,
      "percentage": 100
    },
    "createdAt": "2025-01-27T12:00:00Z",
    "updatedAt": "2025-01-27T12:05:00Z"
  }
}
```

**UI Feedback:**
- **Loading:** Skeleton for status, progress, results
- **Success:** Render full job details
- **Error:** 404 → Redirect to dashboard with message

---

### GET /api/jobs/:id/status
**UI Trigger:** Polling fallback (if WebSocket unavailable)  
**Response:**
```json
{
  "status": "RUNNING",
  "progress": {
    "pagesScraped": 23,
    "recordsExtracted": 45,
    "percentage": 45,
    "currentUrl": "https://example.com/products/page-3"
  }
}
```

**UI Feedback:**
- Update status badge
- Update progress bar
- Update counters

---

### GET /api/jobs/:id/results
**UI Trigger:** "View Results" button, pagination  
**Query Params:** `?page=1&pageSize=50`  
**Response:**
```json
{
  "results": [
    {
      "title": "Product Name",
      "description": "Description",
      "url": "/product/1",
      "price": "$99.99",
      "imageUrl": "/image.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 127,
    "totalPages": 3
  }
}
```

**UI Feedback:**
- **Loading:** Table skeleton
- **Success:** Render paginated table
- **Error:** Error message, retry button

---

### POST /api/jobs/:id/cancel
**UI Trigger:** "CANCEL" button on job details or execution view  
**Response:**
```json
{
  "job": {
    "id": "job-123",
    "status": "CANCELLED",
    "updatedAt": "2025-01-27T12:03:00Z"
  }
}
```

**UI Feedback:**
- **Loading:** Button disabled, "CANCELLING..."
- **Success:** Status badge → CANCELLED, disable cancel button
- **Error:** Error message, keep button enabled

---

### GET /api/jobs/:id/export?format=csv|jsonl
**UI Trigger:** "EXPORT CSV" or "EXPORT JSONL" button  
**Response:** File download (binary)  
**UI Feedback:**
- **Loading:** Button disabled, "EXPORTING..."
- **Success:** Browser download initiated
- **Error:** Error toast/notification

---

### POST /api/test-selectors
**UI Trigger:** "TEST SELECTORS" button on create job form  
**Request Body:**
```json
{
  "url": "https://example.com/products",
  "selectors": {
    "containerSelector": "article, .item",
    "titleSelector": "h1, h2",
    "descriptionSelector": "p"
  }
}
```

**Response:**
```json
{
  "matches": 5,
  "sampleResults": [
    {
      "title": "Product 1",
      "description": "Description 1",
      "url": "/product/1"
    }
  ],
  "validation": {
    "containerSelector": { "valid": true, "matches": 5 },
    "titleSelector": { "valid": true, "matches": 5 },
    "descriptionSelector": { "valid": true, "matches": 4 }
  }
}
```

**UI Feedback:**
- **Loading:** Modal with spinner, "TESTING SELECTORS..."
- **Success:** Modal with results preview, validation status
- **Error:** Error message in modal, suggestions if selectors invalid

---

### GET /api/robots/:domain
**UI Trigger:** Auto-check on URL input blur, "CHECK ROBOTS.TXT" button  
**Response:**
```json
{
  "domain": "example.com",
  "allowed": true,
  "crawlDelay": 2000,
  "rules": {
    "/admin": false,
    "/private": false
  }
}
```

**UI Feedback:**
- **Loading:** Inline spinner next to URL
- **Success:** Checkmark icon, display crawl delay
- **Error/Warning:** Warning icon if disallowed paths

## Validation Rules

### Frontend Validation

#### URL Input
- **Format:** Valid URL (regex: `^https?://`)
- **Required:** Yes (at least one)
- **Error Message:** "Please enter a valid URL starting with http:// or https://"

#### Selectors
- **Container Selector:** Required, non-empty
- **Title Selector:** Required, non-empty
- **Format:** Valid CSS selector (basic validation, full validation on backend)
- **Error Message:** "Please enter a valid CSS selector"

#### Rate Limit
- **Range:** 100-60000 milliseconds
- **Type:** Number
- **Error Message:** "Rate limit must be between 100 and 60000 milliseconds"

#### User Agent
- **Required:** Yes (has default)
- **Min Length:** 1 character
- **Error Message:** "User agent cannot be empty"

## Error States & Feedback

### Network Errors
- **Connection Failed:** "Unable to connect to server. Please check your connection."
- **Timeout:** "Request timed out. Please try again."
- **UI:** Toast notification (bottom-right), auto-dismiss after 5 seconds

### Validation Errors
- **Field-Level:** Red border, error message below field
- **Form-Level:** Error summary card at top of form

### Business Logic Errors
- **Robots.txt Violation:** "This URL is disallowed by robots.txt. Proceed anyway?"
- **Selector Mismatch:** "No elements matched your selectors. Try different selectors."
- **Rate Limit Exceeded:** "Too many requests. Please increase rate limit."

### Job Errors
- **Display:** Error card on job details page
- **Format:**
  ```
  [ERROR TYPE]
  Error message
  Failed URL: https://example.com/page
  Suggested fix: [actionable suggestion]
  ```

## Real-Time Events (WebSocket)

### Connection
- **Establish:** On job details/execution view load
- **Reconnect:** Exponential backoff on disconnect
- **Status Indicator:** Connection status badge (optional)

### Events

#### `job:status`
```json
{
  "event": "job:status",
  "jobId": "job-123",
  "status": "RUNNING",
  "timestamp": "2025-01-27T12:01:00Z"
}
```
**UI Update:** Status badge

#### `job:progress`
```json
 McClure  "event": "job:progress",
  "jobId": "job-123",
  "progress": {
    "pagesScraped": 23,
    "recordsExtracted": 45,
    "percentage": 45
  },
  "timestamp": "2025-01-27T12:01:00Z"
}
```
**UI Update:** Progress bar, counters

#### `job:result`
```json
{
  "event": "job:result",
  "jobId": "job-123",
  "result": {
    "title": "Product Name",
    "description": "Description",
    "url": "/product/1"
  },
  "timestamp": "2025-01-27T12:01:05Z"
}
```
**UI Update:** Append to results table (if visible)

#### `job:error`
```json
{
  "event": "job:error",
  "jobId": "job-123",
  "error": {
    "message": "Connection timeout",
    "failedUrl": "https://example.com/page-10",
    "type": "NETWORK"
  },
  "timestamp": "2025-01-27T12:01:10Z"
}
```
**UI Update:** Error notification, add to log feed

#### `job:complete`
```json
{
  "event": "job:complete",
  "jobId": "job-123",
  "summary": {
    "totalPages": 50,
    "totalRecords": 127,
    "duration": 300
  },
  "timestamp": "2025-01-27T12:05:00Z"
}
```
**UI Update:** Status → COMPLETED, enable exports, show summary

---

**Next:** Navigation & Routing Model

