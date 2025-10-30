## Screen: EXECUTION DETAILS

- Purpose: Inspect a single run execution with logs, status, and actions.
- Layout:
  - `.card` header with meta labels `.meta-sm` (uppercase) for breadcrumbs
  - Body `.card` sections: Status, Logs, Errors, Actions
- Components:
  - Status badge: text only using `.meta-md` with `--text-muted`
  - Logs viewer: monospaced `--font-ui` on `--surface-card`
  - Actions: Retry, Stop — follow button patterns
- States:
  - Error highlight: maintain grayscale; emphasize with border ring (`--border-outer-w` `--border-color`) and meta text `--text-subtle`
  - Focus-visible on all interactive controls
- Responsive:
  - Stack sections vertically with `--space-2` spacing; no hidden content
