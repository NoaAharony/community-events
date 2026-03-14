# Backlog — Israeli Events Atlanta

## Priority 1 — Before Go-Live
- [x] **Supabase auto-pause — resolved.** Supabase has removed auto-pause from the free tier dashboard. The database will not pause automatically. No action needed. *(Confirmed Session 11, Mar 12 2026)*
- [x] **Add "Show" as an event type** — added to form, edit form, filter bar, tag color, and emoji. *(Session 11, Mar 12 2026)*
- [x] **Mobile responsiveness overhaul** — full rewrite of mobile CSS, viewport fixes, touch targets, Samsung S22 and iOS/Android compatibility. *(Session 14, Mar 14 2026)*
- [x] **Audience filter redesign** — removed Parents, added Women and Men. Applied to filter bar, submit form, and edit form. *(Session 14, Mar 14 2026)*
- [x] **Header & footer visibility** — both improved for mobile and desktop readability. Footer height matched to header (60px desktop, 52px mobile). Footer links unified as plain text. Button text wrapping fixed globally. *(Session 14, Mar 14 2026)*
- [x] **Skeleton loader fix** — removed gold border from loading placeholders, softened style, reduced from 3 to 2 cards. *(Session 14, Mar 14 2026)*

## Priority 2 — Soon After Launch
- [ ] **Analytics** — add website behavior tracking (visits, event clicks, contact organizer clicks, share clicks, traffic sources). Options: Google Analytics (detailed) or Plausible (simpler, privacy-friendly). ~10 min to set up.
- [ ] **Address autocomplete** — Google Places API or similar for the address field in the submit/edit form. Note: address field intentionally kept autocomplete="off" to avoid conflict with future Places dropdown.
- [ ] **Hebrew language toggle** — full UI toggle between Hebrew and English.
- [ ] **Spam / fake event submissions** — no verification exists; anyone can post anything. Options: admin approval before events go live, or a "Report this event" button for visitors.
- [ ] **Old event cleanup (database only)** — The website and admin panel already handle display correctly: past events disappear from the site the day after, and from the admin panel after 7 days. This task is only about permanently deleting raw data from Supabase after a long period (e.g. 90 days) to keep the database lean at high usage. Not urgent — Supabase free tier allows 500MB and current usage is well under 5MB. Revisit only if the site grows significantly. *(Low priority)*
- [ ] **Save event / reminder** — visitors can share but not save an event or get a reminder. Common feature for event sites.
- [ ] **"Add to Calendar" button** — add an ICS file download button inside the event detail modal. Generates a standard calendar file compatible with Google Calendar, Apple Calendar, Outlook, and all major apps. Fields to include: event name, date, start/end time, description, organizer name. **Address:** only included if `address_public = true` — if private, calendar shows city only (same privacy rule as the site). No third-party service needed, ~20 lines of code.
- [ ] **Location field UI improvement** — the relationship between "Online Event" checkbox and the city dropdown is not clear enough. A first-time user may not understand it's an either/or choice. Consider redesigning as two clear options (e.g. toggle or radio buttons: "In Person" / "Online") with the city dropdown only appearing for in-person, and a clearer visual separation or label like "or" between them.
- [ ] **Submission guidelines** — add content rules explaining what is and isn't allowed on the site. Likely to live on the About page. Exact wording to be decided.

## Admin Panel
- [ ] **Message all organizers** — button in admin panel to send an email to all organizers with active events. For maintenance notices, policy updates, holiday reminders, etc.
- [ ] **Admin password protection** — currently only protected by a secret URL. If someone finds it, they have full access. Add a simple password login to the admin panel.
- [ ] **Bulk actions** — select multiple events and delete/cancel at once.
- [ ] **Export to CSV** — download all event data as a spreadsheet.
- [ ] **Filter by status** — filter admin table by upcoming, cancelled, past.

## Priority 3 — Nice to Have
- [ ] **Accessibility audit** — WCAG color contrast, font sizes, keyboard navigation, screen reader support.
- [ ] **Phone number format validation** — confirm edge cases (international numbers, paste).
- [x] **Repeat organizer memory** — added autocomplete="name" and autocomplete="email" to organizer fields. Browser will suggest previously typed values from the second submission onward. *(Session 13, Mar 13 2026)*
- [ ] **Google indexing** — add sitemap.xml and robots.txt so the site appears in Google search results (e.g. "Israeli events Atlanta"). Skipped for now for privacy reasons — revisit in the future.

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

## Priority 2 — Soon After Launch
- [ ] **Analytics** — add website behavior tracking (visits, event clicks, contact organizer clicks, share clicks, traffic sources). Options: Google Analytics (detailed) or Plausible (simpler, privacy-friendly). ~10 min to set up.
- [ ] **Address autocomplete** — Google Places API or similar for the address field in the submit/edit form. Note: address field intentionally kept autocomplete="off" to avoid conflict with future Places dropdown.
- [ ] **Hebrew language toggle** — full UI toggle between Hebrew and English.
- [ ] **Spam / fake event submissions** — no verification exists; anyone can post anything. Options: admin approval before events go live, or a "Report this event" button for visitors.
- [ ] **Save event / reminder** — visitors can share but not save an event or get a reminder. Common feature for event sites.
- [x] **Image size limit + Storage cleanup** — 2MB hard limit on upload enforced in both submit and edit forms with clear error message. Images now deleted from Supabase Storage on all delete paths: admin delete, organizer remove completely, image replace, image removal in edit form. deleteStorageImage() helper added. *(Session 14, Mar 14 2026)*
- [ ] **Location field UI improvement** — the relationship between "Online Event" checkbox and the city dropdown is not clear enough. A first-time user may not understand it's an either/or choice. Consider redesigning as two clear options (e.g. toggle or radio buttons: "In Person" / "Online") with the city dropdown only appearing for in-person, and a clearer visual separation or label like "or" between them.
- [ ] **Submission guidelines** — add content rules explaining what is and isn't allowed on the site. Likely to live on the About page. Exact wording to be decided.

## Admin Panel
- [ ] **Message all organizers** — button in admin panel to send an email to all organizers with active events. For maintenance notices, policy updates, holiday reminders, etc.
- [ ] **Admin password protection** — currently only protected by a secret URL. If someone finds it, they have full access. Add a simple password login to the admin panel.
- [ ] **Bulk actions** — select multiple events and delete/cancel at once.
- [ ] **Export to CSV** — download all event data as a spreadsheet.
- [ ] **Filter by status** — filter admin table by upcoming, cancelled, past.

## Priority 3 — Nice to Have
- [ ] **Accessibility audit** — WCAG color contrast, font sizes, keyboard navigation, screen reader support.
- [ ] **Phone number format validation** — confirm edge cases (international numbers, paste).
- [x] **Repeat organizer memory** — added autocomplete="name" and autocomplete="email" to organizer fields. Browser will suggest previously typed values from the second submission onward. *(Session 13, Mar 13 2026)*
- [ ] **Google indexing** — add sitemap.xml and robots.txt so the site appears in Google search results (e.g. "Israeli events Atlanta"). Skipped for now for privacy reasons — revisit in the future.

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
