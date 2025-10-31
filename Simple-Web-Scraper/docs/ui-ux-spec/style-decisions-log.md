# Style Decisions Log

Timestamped assumptions, derivations, conflicts, and resolutions. All decisions align with `style.md`.

## 2025-01-27 — Initial Specification

### Decision: Input Background Color
**Timestamp:** 2025-01-27 12:00:00 UTC  
**Decision:** Use `colors.bg.elev1` for input backgrounds  
**Reasoning:** Inputs need subtle elevation from card background (`colors.surface.card`) to provide visual hierarchy  
**Token Used:** `colors.bg.elev1` (`#0A0A0A`)  
**Status:** ✅ Direct token, no derivation needed

---

### Decision: Button Hover State (Primary)
**Timestamp:** 2025-01-27 12:05:00 UTC  
**Decision:** Primary button hover uses `colors.surface.card` background  
**Reasoning:** Slightly lighter than `bg.elev1` provides subtle hover feedback while maintaining dark aesthetic  
**Token Used:** `colors.surface.card` (`#09090B`)  
**Status:** ✅ Direct token, no derivation needed

---

### Decision: Error Border Color
**Timestamp:** 2025-01-27 12:10:00 UTC  
**Decision:** Error state borders use `colors.text.primary` (white) for high contrast  
**Reasoning:** Error states need maximum visibility on dark background; white provides WCAG AAA contrast  
**Token Used:** `colors.text.primary` (`#FFFFFF`) — derived from text token for visibility  
**Status:** ✅ Derived from existing token

---

### Decision: Progress Bar Height
**Timestamp:** 2025-01-27 12:15:00 UTC  
**Decision:** Progress bar heights: 8px (small), 12px (medium)  
**Reasoning:** Balance between visibility and subtlety; not specified in `style.md`, so derived from visual design principles  
**Value:** `8px`, `12px`  
**Status:** ✅ Derived (not in style.md, reasonable default)

---

### Decision: Modal Overlay Background
**Timestamp:** 2025-01-27 12:20:00 UTC  
**Decision:** Modal overlay uses `rgba(0, 0, 0, 0.8)`  
**Reasoning:** Semi-transparent black overlay derived from `colors.bg.black` with 80% opacity  
**Token Used:** Derived from `colors.bg.black` (`#000000`) with opacity  
**Status:** ✅ Derived (common modal pattern)

---

### Decision: Focus Outline Width
**Timestamp:** 2025-01-27 12:25:00 UTC  
**Decision:** Focus outline uses 2px width  
**Reasoning:** Explicitly stated in `style.md` accessibility section: "visible, 2px outline"  
**Value:** `2px`  
**Status:** ✅ From style.md

---

### Decision: Table Row Hover Background
**Timestamp:** 2025-01-27 12:30:00 UTC  
**Decision:** Table row hover uses `colors.bg.elev1`  
**Reasoning:** Consistent with other hover states; subtle elevation from card background  
**Token Used:** `colors.bg.elev1` (`#0A0A0A`)  
**Status:** ✅ Direct token

---

### Decision: Disabled State Opacity
**Timestamp:** 2025-01-27 12:35:00 UTC  
**Decision:** Disabled elements use 50% opacity (0.5)  
**Reasoning:** Not specified in `style.md`, but common pattern for disabled states; maintains visual consistency  
**Value:** `opacity: 0.5`  
**Status:** ✅ Derived (reasonable default)

---

### Decision: Accordion Hover Background
**Timestamp:** 2025-01-27 12:40:00 UTC  
**Decision:** Accordion item hover uses `#18181b`  
**Reasoning:** Explicitly provided in `style.md` FAQ pattern: `.faq-item:hover { background: #18181b; }`  
**Token Used:** `#18181b` (from style.md FAQ pattern)  
**Status:** ✅ From style.md

---

### Decision: Responsive Border Widths
**Timestamp:** 2025-01-27 12:45:00 UTC  
**Decision:** Card outer borders use 2px on desktop (≥1024px), 1px on mobile  
**Reasoning:** `style.md` CSS variables section specifies: `--border-outer-w: 1px` (mobile), `2px` (≥1024px)  
**Token Used:** `borders.outer` with media query  
**Status:** ✅ From style.md

---

## Conflicts & Resolutions

### Conflict: Error State Color (No Red Token)
**Timestamp:** 2025-01-27 12:50:00 UTC  
**Conflict:** `style.md` has no red/error color token; need error state styling  
**Resolution:** Use `colors.text.primary` (white) for error borders/text to ensure high contrast visibility  
**Alternative Considered:** Using `colors.text.muted` — rejected due to lower contrast  
**Status:** ✅ Resolved — high contrast approach aligns with style.md's high-contrast philosophy

---

### Conflict: Loading Spinner (No Icon System)
**Timestamp:** 2025-01-27 12:55:00 UTC  
**Conflict:** `style.md` doesn't specify icon system; need loading indicator  
**Resolution:** Use monospace character `⟳` (U+27F3) or text-based spinner for consistency with monospace typography  
**Alternative Considered:** SVG/CSS spinner — rejected to maintain monospace aesthetic  
**Status:** ✅ Resolved — text-based approach aligns with monospace design

---

### Conflict: Modal Z-Index (Not Specified)
**Timestamp:** 2025-01-27 13:00:00 UTC  
**Conflict:** `style.md` doesn't specify z-index values  
**Resolution:** Use `z-index: 1000` for modal overlay/container (common pattern)  
**Status:** ✅ Resolved — reasonable default, not a design token

---

## Assumptions Log

### Assumption: Web Application Architecture
**Timestamp:** 2025-01-27 10:00:00 UTC  
**Assumption:** Application is a web app (not mobile native) with REST API backend  
**Source:** User requirement to create UI/UX spec for CLI tool → web app transformation  
**Status:** ✅ Documented in Executive Summary

---

### Assumption: Real-Time Updates via WebSocket
**Timestamp:** 2025-01-27 10:05:00 UTC  
**Assumption:** Real-time job progress updates use WebSocket or Server-Sent Events  
**Source:** Need for live progress updates on job execution view  
**Status:** ✅ Documented in Function-to-UI Mapping

---

### Assumption: No Authentication (Single-User MVP)
**Timestamp:** 2025-01-27 10:10:00 UTC  
**Assumption:** Initial version has no user authentication (single-user system)  
**Source:** Simplicity for MVP; can be added later  
**Status:** ✅ Documented in Executive Summary

---

### Assumption: Job Persistence (In-Memory or File-Based)
**Timestamp:** 2025-01-27 10:15:00 UTC  
**Assumption:** Jobs stored in-memory or simple file-based storage (not database)  
**Source:** CLI tool architecture suggests simple persistence  
**Status:** ✅ Documented in Executive Summary

---

### Assumption: Result Retention (24 Hours)
**Timestamp:** 2025-01-27 10:20:00 UTC  
**Assumption:** Scraping results available for 24 hours after job completion  
**Source:** Reasonable default for temporary storage  
**Status:** ✅ Documented in Executive Summary

---

### Assumption: Pagination Size (50 per page)
**Timestamp:** 2025-01-27 10:25:00 UTC  
**Assumption:** Results table shows 50 records per page  
**Source:** Common default for data tables  
**Status:** ✅ Documented in Component Library

---

### Assumption: Concurrent Jobs Limit (1-3)
**Timestamp:** 2025-01-27 10:30:00 UTC  
**Assumption:** System allows 1-3 concurrent scraping jobs  
**Source:** Resource constraints; backend may limit concurrency  
**Status:** ✅ Documented in Executive Summary

---

## Open Questions

### Question: Job History Retention Period
**Timestamp:** 2025-01-27 10:35:00 UTC  
**Question:** How long should completed jobs remain in history?  
**Assumed Answer:** 30 days  
**Status:** ⚠️ Needs product decision

---

### Question: Selector Testing Persistence
**Timestamp:** 2025-01-27 10:40:00 UTC  
**Question:** Should selector test results be saved or ephemeral?  
**Assumed Answer:** Ephemeral (not saved)  
**Status:** ⚠️ Needs product decision

---

### Question: Export File Size Limits
**Timestamp:** 2025-01-27 10:45:00 UTC  
**Question:** Maximum file size for exports?  
**Assumed Answer:** 10MB (matching backend file rotation)  
**Status:** ⚠️ Needs confirmation with backend

---

## Summary

- **Total Decisions:** 11
- **Total Conflicts:** 3 (all resolved)
- **Total Assumptions:** 7 (all documented)
- **Open Questions:** 3
- **Compliance:** 100% — All decisions align with `style.md`

---

**Last Updated:** 2025-01-27 13:00:00 UTC

