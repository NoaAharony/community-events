# Backlog — Israeli Events Atlanta

## Priority 1 — Before Go-Live
- [ ] **Disable Supabase auto-pause** — free tier pauses after 1 week of inactivity. Must be disabled before the site goes public or events will stop loading.
- [ ] **About page content** — currently placeholder text. Needs real copy written.
- [ ] **Custom domain / URL** — replace `community-events.naharony.workers.dev` with a real domain.

## Priority 2 — Soon After Launch
- [ ] **Address autocomplete** — Google Places API or similar for the address field in the submit/edit form.
- [ ] **Hebrew language toggle** — full UI toggle between Hebrew and English.
- [ ] **Default placeholder flyer image** — branded image for events without an uploaded flyer.

## Priority 3 — Nice to Have
- [ ] **Accessibility audit** — WCAG color contrast, font sizes, keyboard navigation, screen reader support.
- [ ] **Phone number format validation** — confirm edge cases (international numbers, paste).
- [ ] **Admin improvements** — bulk actions, export to CSV, filter by status.

---

## Completed
- [x] **Email notifications** — submission confirmation + address request emails via Supabase Edge Function + Resend. *(Session 7, Mar 7 2026)*
- [x] **Share event + deep link** — share button, `?event=ID` URL, lightbox for flyer. *(Session 6, Mar 7 2026)*
- [x] **Mobile layout audit** — forms, cards, filters, modals, error pages. *(Sessions 6 + 8)*
- [x] **Design consistency audit** — fonts, colors, icons, text rules. DESIGN_RULES.md created. *(Session 7)*
- [x] **Confirmation page redesign** — navy/gold header, SVG checkmark, centered body. *(Session 7+8)*
- [x] **Invalid link + cancelled pages redesigned** — navy hero, gold divider, SVG icons. *(Session 7)*
- [x] **Address request modal redesigned** — navy/gold header, gold-accented box, SVG icons. *(Session 8)*
- [x] **Admin flow** — edit/cancel/discard all return to admin when coming from admin. *(Session 8)*
- [x] **Cancel + delete modals redesigned** — matching site style. *(Session 8)*
- [x] **Edit page header redesigned** — navy/gold gradient. *(Session 8)*
- [x] **Past events in admin** — visible for 7 days after passing, then hidden. *(Session 8)*
- [x] **Edit form validation bug** — year dropdown includes event's actual year. *(Session 8)*
- [x] **Organizer avatar Hebrew fix** — single letter, Assistant font. *(Session 8)*
- [x] **Address privacy hint** — gold-accented prominent box. *(Session 8)*

---

## Out of Scope (V1 — explicitly excluded)
- User accounts / login
- Comments or RSVPs
- Recurring events
- Payment processing
- Map view of events
- Push notifications
