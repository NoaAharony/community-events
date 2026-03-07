# Backlog — Israeli Events Atlanta

## Priority 1 — Before Go-Live
- [ ] **Disable Supabase auto-pause** — free tier pauses after 1 week of inactivity. Must be disabled before the site goes public or events will stop loading.
- [ ] **Mobile layout audit** — test and fix the full site on mobile (iPhone/Android). Forms, cards, filters, modals.
- [ ] **Site display name** — decide on final name shown in topbar and browser tab. Currently "Israeli Events Atlanta".
- [ ] **About page content** — currently placeholder text. Needs real copy written.
- [ ] **Email notifications** — automatically send edit link to organizer's email after event submission. Requires Supabase Edge Function or third-party email service (both free tier available).

## Priority 2 — Soon After Launch
- [ ] **Custom domain / URL** — replace `community-events.naharony.workers.dev` with a real domain.
- [ ] **Share event + deep link** — share button on event cards, URL like `?event=ID` so a specific event opens directly when link is shared.
- [ ] **Address autocomplete** — Google Places API or similar for the address field in the submit/edit form.
- [ ] **Hebrew language toggle** — full UI toggle between Hebrew and English.

## Priority 3 — Nice to Have
- [ ] **Accessibility audit** — WCAG color contrast, font sizes, keyboard navigation, screen reader support.
- [ ] **Phone number format validation** — currently auto-formats on input; confirm it handles edge cases (international numbers, paste).
- [ ] **Admin improvements** — currently admin can delete/edit events via table. Possible additions: bulk actions, export to CSV, filter by status.
- [ ] **Save design files to GitHub** — before/after design previews from the redesign sessions. Decision pending.

---

## Decided but Not Yet Implemented
_(Items where a decision was made but no code change was pushed)_
- None currently pending.

---

## Out of Scope (V1 — explicitly excluded)
- User accounts / login
- Comments or RSVPs
- Recurring events
- Payment processing
- Map view of events
- Push notifications
