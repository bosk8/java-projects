# Simple Web Scraper - Web Frontend

Complete web frontend implementation based on the UI/UX specification, adhering strictly to the Bosk8 Design System.

## Structure

```
web/frontend/
├── README.md          # This file
├── index.html         # Main HTML entry point
├── css/
│   ├── base.css       # Design tokens and base styles
│   ├── components.css # Reusable component styles
│   └── screens.css    # Screen-specific styles
└── js/
    ├── api.js         # API client
    ├── router.js      # Client-side routing
    └── app.js         # Main application logic
```

## Features

- ✅ **Complete UI Implementation** - All screens from specification
- ✅ **Bosk8 Design System** - Strict adherence to style.md tokens
- ✅ **Responsive Design** - Mobile and desktop layouts
- ✅ **Real-time Updates** - WebSocket support for live progress
- ✅ **Accessibility** - WCAG 2.2 AA compliance
- ✅ **Component Library** - Reusable components

## Setup

### Quick Start

1. **Serve the frontend:**
   ```bash
   cd web/frontend
   python -m http.server 8000
   # or
   npx http-server -p 8000
   ```

2. **Configure API:**
   - Edit `js/api.js` line 2: Update `API_BASE_URL` to your backend
   - Edit `js/app.js` line 406: Update WebSocket URL if different

3. **Open in browser:**
   - Navigate to `http://localhost:8000`

## Configuration

### API Base URL

Edit `js/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api'; // Your backend URL
```

### WebSocket URL

WebSocket URL is automatically derived from window location. If your backend uses a different path:
- Edit `js/app.js` line 406: Update WebSocket URL pattern

## API Endpoints Expected

The frontend expects a REST API at `/api` with:

- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/:id` - Get job details
- `GET /api/jobs/:id/status` - Get job status
- `GET /api/jobs/:id/results` - Get job results
- `POST /api/jobs/:id/cancel` - Cancel job
- `GET /api/jobs/:id/export?format=csv|jsonl` - Export results
- `POST /api/test-selectors` - Test CSS selectors
- `GET /api/robots/:domain` - Check robots.txt

## WebSocket Events

WebSocket endpoint: `ws://host/ws/jobs/:id`

Events received:
- `job:status` - Status updates
- `job:progress` - Progress updates
- `job:log` - Log entries
- `job:complete` - Job completion

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Documentation

- **UI/UX Specification:** See `docs/ui-ux-spec/` in project root
- **Sanity Check:** See `docs/SANITY-CHECK.md`
- **Dev Handoff:** See `docs/ui-ux-spec/dev-handoff.md`

## Development

The frontend is a static web application with:
- No build process required
- Pure JavaScript (ES6+)
- CSS variables for all design tokens
- Client-side routing

## Deployment

Deploy the `web/frontend/` directory to any static hosting:
- Apache/Nginx
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

Ensure CORS is configured on your backend to allow requests from the frontend domain.

---

**See also:** [UI/UX Specification](../docs/ui-ux-spec/) for complete design documentation

