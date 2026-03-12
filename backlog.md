# Backlog — Israeli Events Atlanta

## Priority 1 — Before Go-Live
- [x] **Supabase auto-pause — resolved.** Supabase has removed auto-pause from the free tier dashboard. The database will not pause automatically. No action needed. *(Confirmed Session 11, Mar 12 2026)*

## Priority 2 — Soon After Launch
- [ ] **Analytics** — add website behavior tracking (visits, event clicks, contact organizer clicks, share clicks, traffic sources). Options: Google Analytics (detailed) or Plausible (simpler, privacy-friendly). ~10 min to set up.
- [ ] **Address autocomplete** — Google Places API or similar for the address field in the submit/edit form.
- [ ] **Hebrew language toggle** — full UI toggle between Hebrew and English.
- [ ] **Spam / fake event submissions** — no verification exists; anyone can post anything. Options: admin approval before events go live, or a "Report this event" button for visitors.
- [ ] **Old event cleanup** — events stay in the database forever. Add auto-delete for events older than 60 days to keep the database clean.
- [ ] **Save event / reminder** — visitors can share but not save an event or get a reminder. Common feature for event sites.
- [ ] **Image size limit** — enforce a hard file size limit on image upload (not just a warning). Prevents large files from slowing the site and consuming Supabase storage.
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
- [ ] **Repeat organizer memory** — organizers who submit multiple events currently fill in all their details from scratch every time. Allow the form to remember name, email, phone, and org type based on their email address.
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
