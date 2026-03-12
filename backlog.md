# Backlog — Israeli Events Atlanta

## Priority 1 — Before Go-Live
- [x] **Supabase auto-pause — resolved.** Supabase has removed auto-pause from the free tier dashboard. The database will not pause automatically. No action needed. *(Confirmed Session 11, Mar 12 2026)*

## Priority 2 — Soon After Launch
- [ ] **Analytics** — add website behavior tracking (visits, event clicks, contact organizer clicks, share clicks, traffic sources). Options: Google Analytics (detailed) or Plausible (simpler, privacy-friendly). ~10 min to set up.
- [ ] **Address autocomplete** — Google Places API or similar for the address field in the submit/edit form.
- [ ] **Hebrew language toggle** — full UI toggle between Hebrew and English.

## Priority 3 — Nice to Have
- [ ] **Accessibility audit** — WCAG color contrast, font sizes, keyboard navigation, screen reader support.
- [ ] **Phone number format validation** — confirm edge cases (international numbers, paste).
- [ ] **Admin improvements** — bulk actions, export to CSV, filter by status.

---

## Completed
- [x] **Default placeholder flyer image** — branded navy/gold placeholder for events without an uploaded flyer. *(Session 9)*
- [x] **Email desktop width fix** - proper 560px centering via Outlook table. *(Session 9)*
- [x] **Email 2 body redesign** - Georgia greeting, gold accent box, centered CTA. *(Session 9)*
- [x] **Reply pre-fill** - address request reply email pre-filled with address, date, time, organizer. *(Session 9)*
- [x] **Confirmation page** - removed raw link, clean Copy Edit Link button. *(Session 9)*
- [x] **mailto subjects** - Send Email and Reply to buttons all have pre-filled subjects. *(Session 9)*
- [x] **Helper texts** - all hint/privacy/optional texts darkened sitewide. *(Session 9)*
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
- [x] **Email fix** — FROM address updated to `noreply@ilcommunityevents.com`, emails now work for all users. *(Session 10)*
- [x] **Custom domain** — `ilcommunityevents.com` purchased via Cloudflare, verified in Resend. *(Session 10)*
- [x] **About page content** — Real content written, styled per DESIGN_RULES. *(Session 10)*
---

## Out of Scope (V1 — explicitly excluded)
- User accounts / login
- Comments or RSVPs
- Recurring events
- Payment processing
- Map view of events
- Push notifications

## Annual Reminders
- [ ] **Domain renewal** — `ilcommunityevents.com` expires Mar 09, 2027. Auto renew is ON (Cloudflare will charge card 60 days before expiry - around Jan 2027). Verify card is still valid before then.
