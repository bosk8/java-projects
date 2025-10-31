# Project Structure

Complete overview of the Simple Web Scraper project organization.

## Root Directory

```
Simple-Web-Scraper/
├── src/                    # Java source code
├── target/                  # Maven build output
├── docs/                    # Documentation
├── web/                     # Web frontend
├── pom.xml                  # Maven configuration
├── README.md                # Project overview
├── RUNBOOK.md              # Operational guide
├── AUDIT_REPORT.md         # Code health audit
├── checkstyle.xml          # Code style config
├── scraper-config.json     # Example config
└── PROJECT-STRUCTURE.md    # This file
```

## Source Code (`src/`)

```
src/
├── main/java/              # Main application code
│   └── com/example/scraper/
│       ├── cli/           # CLI components
│       ├── core/          # Core scraping logic
│       │   ├── http/     # HTTP fetching
│       │   ├── parser/   # HTML parsing
│       │   ├── persistence/  # CSV/JSONL writing
│       │   └── robots/   # Robots.txt compliance
│       └── model/         # Data models
└── test/java/             # Test code
```

## Documentation (`docs/`)

```
docs/
├── README.md              # Documentation index
├── SANITY-CHECK.md       # Frontend sanity check
└── ui-ux-spec/           # UI/UX specification
    ├── README.md         # Spec documentation index
    ├── UI-UX-SPEC-INDEX.md
    ├── executive-summary.md
    ├── ia-and-flows.md
    ├── function-to-ui.md
    ├── navigation.md
    ├── accessibility.md
    ├── style-compliance-matrix.md
    ├── style-decisions-log.md
    ├── dev-handoff.md
    ├── FINAL-CHECKLIST.md
    ├── screen-specs/     # Screen specifications
    │   ├── dashboard.md
    │   ├── create-job.md
    │   ├── job-details.md
    │   └── execution.md
    └── specs/            # Component specs
        └── component-library/
            └── spec.md
```

## Web Frontend (`web/`)

```
web/
└── frontend/             # Static web application
    ├── README.md         # Frontend documentation
    ├── index.html        # Main entry point
    ├── css/              # Stylesheets
    │   ├── base.css      # Design tokens
    │   ├── components.css # Components
    │   └── screens.css   # Screen-specific
    └── js/               # JavaScript
        ├── api.js        # API client
        ├── router.js     # Routing
        └── app.js        # Main app logic
```

## Key Files

### Configuration
- `pom.xml` - Maven project configuration
- `checkstyle.xml` - Code style rules
- `scraper-config.json` - Example scraper config

### Documentation
- `README.md` - Project overview and quick start
- `RUNBOOK.md` - Operational runbook
- `AUDIT_REPORT.md` - Code health audit
- `PROJECT-STRUCTURE.md` - This file

### UI/UX Specification
- `docs/ui-ux-spec/` - Complete specification
- `docs/ui-ux-spec/UI-UX-SPEC-INDEX.md` - Quick reference
- `docs/ui-ux-spec/dev-handoff.md` - Implementation guide

### Frontend
- `web/frontend/index.html` - Main HTML
- `web/frontend/js/app.js` - Application logic
- `web/frontend/css/base.css` - Design system tokens

## Getting Started

1. **Java Backend:**
   ```bash
   mvn clean package
   java -jar target/simple-web-scraper-1.0.0-jar-with-dependencies.jar --help
   ```

2. **Web Frontend:**
   ```bash
   cd web/frontend
   python -m http.server 8000
   ```

3. **Documentation:**
   - Start with `README.md` for project overview
   - See `docs/ui-ux-spec/README.md` for UI/UX documentation
   - See `web/frontend/README.md` for frontend setup

---

**For detailed documentation, see:**
- [Project README](./README.md)
- [UI/UX Specification](./docs/ui-ux-spec/README.md)
- [Frontend README](./web/frontend/README.md)

