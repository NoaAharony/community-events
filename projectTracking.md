# Project Tracking — Israeli Events Atlanta

## What This Project Is
A community events platform for Israelis and the broader Jewish community in Metro Atlanta, Georgia. Anyone can submit an event — no account needed. Organizers manage their events via a private edit link. There is an admin panel at a secret URL.

**Live site:** `community-events.naharony.workers.dev`  
**GitHub:** `NoaAharony/community-events` (single file: `index.html`)  
**Database:** Supabase — `pscedpbjswyajgledixu.supabase.co`  
**Deployment:** Cloudflare Pages — auto-deploys on every push to `main`  

---

## Tech Stack
- **Frontend:** Single HTML file (`index.html`) — all HTML, CSS, and JavaScript in one file
- **Database:** Supabase (PostgreSQL) — free tier
- **Storage:** Supabase Storage — event images uploaded here
- **Hosting:** Cloudflare Pages — free tier, auto-deploy from GitHub
- **Fonts:** Google Fonts — Nunito (UI), Source Serif 4 (headings/logo), Assistant (Hebrew text)

---

## Database Schema (`events` table)
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | auto-generated |
| name | text | event name |
| event_date | date | YYYY-MM-DD |
| start_time | time | HH:MM:SS |
| end_time | time | nullable |
| event_type | text | Party, Meetup, Food Market, Conference, Talk / Lecture, Workshop, Other |
| audience | text | comma-separated: All Ages, Adults, Parents, Families, Kids, Teens |
| cost | text | Free or Paid |
| amount | text | e.g. "$25", only if Paid |
| description | text | nullable, Hebrew or English |
| registration_link | text | nullable, opens in new tab |
| city | text | Alpharetta, Sandy Springs, Dunwoody, Roswell, Johns Creek, Brookhaven, Atlanta, Other |
| full_address | text | nullable |
| address_public | boolean | true = show publicly, false = city only |
| organizer_name | text | |
| org_type | text | Business or Individual |
| contact_email | text | required, private |
| contact_phone | text | nullable, private |
| contact_opt_in | boolean | true = show contact info publicly |
| image_url | text | nullable, Supabase Storage URL |
| edit_key | text | UUID, used for edit/cancel link |
| status | text | active or cancelled |
| created_at | timestamp | auto |

---

## Site Structure
All pages are a single HTML file with JS toggling visibility between sections:
- **Main page** — event list with filter bar
- **Submit form** — 4 sections: Event Info, Location, Organizer, Media
- **Confirmation page** — shown after submit, displays edit link
- **Edit form** — loaded via `?edit=KEY` URL param
- **Event detail modal** — slides up when clicking an event card
- **Cancel event modal** — confirmation popup
- **Admin panel** — secret URL, shows all events in a table with delete/edit
- **About page** — community info
- **Error page** — invalid edit link

---

## Design Decisions Made
- **Color palette:** Navy (#1e4068), Gold (#c8963e), Cream (#f5f0e8)
- **Fonts:** Nunito for UI, Source Serif 4 for logo/headings, Assistant for Hebrew
- **Hebrew rendering:** Assistant font applied via unicode-range U+0590-05FF so Hebrew text uses Assistant and English text uses Nunito
- **Card style:** Gold left border (3.5px), floating shadow, 14px border-radius
- **Event thumbnail:** 120px wide left panel, `object-position: center top` for portrait flyers
- **Filter chips:** Pill shape, white background, gold gradient when active
- **Tags:** Outline only (no fill background), separated from meta by border-top
- **Free badge:** Gold outline pill — `✦ Free`
- **Organizer display:** Avatar circle with initials + name
- **Date headers:** Bold uppercase, gold gradient underline
- **Topbar:** Navy gradient
- **Background:** Subtle SVG grain texture (opacity 0.04)
- **No emoji icons** in filter chips or meta rows

---

## Form Logic
### Submit Form
- Required: Name, Date, Start Time, Event Type, Audience, City, Organizer Name, Email
- Optional: End Time, Description, Registration Link, Full Address, Phone, Image
- **Audience:** checkboxes — All Ages, Adults, Parents, Families, Kids, Teens. Selecting "All Ages" auto-deselects others.
- **Cost:** Free/Paid toggle. If Paid → amount field appears with $ prefix, numbers only.
- **Address:** optional. If entered → show/hide toggle appears. Hint text updates dynamically.
- **Contact opt-in:** Yes = email/phone appear publicly on event. No = private request form shown to visitors. Hint text and privacy notes update dynamically.
- **Phone:** auto-formats as `(404) 555-0000` on input.
- **Start time:** defaults to 5:00 PM.
- **Year:** defaults to current year.

### Edit Form
- Same fields as submit form, pre-populated from database.
- Accessed via `?edit=KEY` URL.
- Organizer can also cancel event from here.

### Filter Logic (Main Page)
- Date, City, Event Type, Cost, Audience filters
- **Audience filter:** events tagged "All Ages" appear under every audience filter
- Selecting "All" resets filter, shows everything

---

## What Was Built — Session History

### Session 1 (Mar 5, 2026) — Setup
- Reviewed original requirements doc and live Netlify prototype
- Set up Supabase account, created `events` table with full schema
- Connected frontend to Supabase via API

### Session 2 (Mar 6, 2026) — Backend + Deployment
- Completed Supabase setup and storage bucket configuration
- Integrated API keys into frontend
- Deployed to Netlify (later migrated away)
- Identified time display bug

### Session 3 (Mar 6, 2026) — Migration + Bug Fixes
- **Migrated from Netlify to Cloudflare Pages** after hitting Netlify bandwidth limit
- Fixed filter bar behavior
- Fixed contact display
- Fixed image sizing
- Fixed city list
- Fixed date/time formatting
- Established working guidelines

### Session 4 (Mar 6, 2026) — UI Redesign Start
- Font selection: Nunito + Source Serif 4 (chose over DM Sans / DM Serif)
- Placeholder design for events without images
- Style direction established (navy/gold/cream palette)
- Multiple design option previews created
- Partial implementation of redesign

### Session 5 (Mar 7, 2026) — UI Redesign Complete + Logic Fixes
- Completed full UI redesign implementation
- Fixed filter bar (gold gradient active chips, no emoji icons)
- Fixed card design (gold left border, D+A combined shadow style)
- Fixed meta display (plain text dots, no emoji)
- Fixed free badge (gold outline pill)
- Fixed organizer avatar + name display
- Fixed date headers (bold uppercase, gold line)
- Added grain texture to background
- Added Hebrew font support (Assistant via unicode-range)
- **Audience logic overhaul:**
  - Form options: All Ages, Adults, Parents, Families, Kids, Teens (required)
  - All Ages auto-deselects others when chosen
  - Filter: All, Adults, Parents, Families, Kids, Teens
  - All Ages events appear in every audience filter
- Fixed audience dropdown duplicates
- Fixed year dropdown defaulting to current year
- Made email required (was optional)
- Made contact hint text dynamic (updates on Yes/No toggle)
- Made address hint text dynamic (updates on Yes/No toggle)
- Made privacy notes dynamic on email/phone fields
- Added phone auto-formatting `(404) 555-0000`
- Start time defaults to 5:00 PM
- Amount field: $ prefix, numbers only, validates if Paid selected
- Description text made larger/more prominent in event modal
- Event thumbnail increased from 82px to 120px wide
- Audience tag colors fixed (All Ages, Parents added)
- Syntax check added to pre-push routine after a syntax error broke the site

### Session 6 (Mar 7, 2026) — Share, Lightbox, Mobile Fixes
- **Share event feature:** Share button added to every event card (icon) and inside event modal (full button)
- **Deep link:** `?event=ID` URL param — opens specific event modal on page load
- **Share behavior:** Native share sheet on mobile, clipboard copy + toast on desktop
- **Lightbox:** Clicking event image in modal opens full flyer on black overlay, X to close
- **Mobile layout audit:** Expanded media query with fixes for filter bar (horizontal scroll), cards, forms, topbar, confirmation page, edit/cancel bar
- **Default flyer placeholder:** Decided to design a branded default image for events without an uploaded flyer (pending — next session)
- **projectTracking.md updated** to reflect session history
- Supabase free tier auto-pauses after 1 week of inactivity — must disable before go-live
- Agent cannot test the live site directly — owner must verify after each deploy
- GitHub token must be reshared at the start of every new session

### Session 7 (Mar 7, 2026) — Email System + Design Consistency
- **Email system built and deployed:** Two emails via Supabase Edge Function + Resend API
  - Email 1: Submission confirmation — edit link, event details, branding
  - Email 2: Address request notification to organizer
- **Email design:** Navy/gold gradient header, Source Serif 4 headings, Georgia serif fallback
- **Edge Function:** `send-email` at Supabase — must be manually deployed (not auto from GitHub)
- **Design consistency audit — text fixes:**
  - "Submit" → "Add" throughout (button, header, success message)
  - All em dashes (—) replaced with hyphens (-) sitewide
- **Confirmation page redesigned:** Navy/gold header, SVG checkmark in gold circle, centered body
- **Invalid link page redesigned:** Navy hero block, gold divider, info SVG icon
- **Cancelled event page redesigned:** Same structure, gold circle with X icon
- **DESIGN_RULES.md created** and pushed to GitHub — full font, color, icon, and text rules

### Session 8 (Mar 8, 2026) — Admin, Modals, Flow, Mobile
- **Address request modal redesigned:** Navy/gold header with location pin SVG, gold-accented intro box, lock SVG privacy note, refined success state
- **Email Outlook fix:** Both emails updated with `bgcolor` fallback so header renders in Outlook
- **Confirmation page:** Body text and buttons centered
- **Mobile audit:** Fixed error pages, confirmation, address modal, overlay padding
- **Admin flow fixes:**
  - Edit from admin → returns to admin after save, discard, or cancel
  - `editFromAdmin` flag added to distinguish admin vs personal edit link flow
- **Cancel event modal redesigned:** Navy/gold header with info SVG icon
- **Delete event modal redesigned:** Dark red header with trash SVG icon
- **Edit page header redesigned:** Navy/gold gradient header matching site style; back link says "Back to Admin" when coming from admin
- **Past events in admin:** Hidden after 7 days, visible for 7 days after passing
- **Admin status badge:** Changed "Active" → "Upcoming"
- **Edit form validation bug fixed:** Year dropdown now includes event's actual year, preventing false validation errors on past-year events
- **Organizer avatar:** Hebrew names now show single first letter using Assistant font; English names show 2 initials as before
- **Address privacy hint:** Upgraded from small gray italic to gold-accented prominent box

### Session 9 (Mar 8, 2026) — Email Polish + UX Logic
- **Default placeholder flyer:** Branded navy/gold placeholder (inline SVG-style HTML) used for events without an uploaded image - shown on both event cards and event modal
- **Email 1 (submission confirmation):**
  - Event box: fixed Outlook border-left using table instead of div
  - "Manage Your Event" box: stronger styling, Georgia serif title, bold dark text
- **Email 2 (address request):**
  - Body redesigned to match email 1 - Georgia greeting, gold accent box, centered CTA
  - "Reply to [name]" button: subject line pre-filled as `Address for: [event name]`
  - Reply button: body pre-filled with address, date, time, and organizer name
  - Event date/time/address/organizer_name added to payload from frontend
- **Both emails:** Fixed full-width stretch on desktop with proper Outlook table centering (560px)
- **Send Email button (event modal):** subject pre-filled as `Question about: [event name]`
- **All helper texts sitewide:** color darkened from gray-400 to gray-600
- **Address hint text updated:** explains the pre-filled reply benefit
- **Confirmation page:** Removed raw edit link — replaced with clean "Copy Edit Link" button only
- **Subject line:** address request email subject includes event date
- ### Session 10 (Mar 9, 2026) — Domain, Emails, About Page
- **Domain:** `ilcommunityevents.com` purchased and configured via Cloudflare
- **Resend domain verified:** `ilcommunityevents.com` added and verified in Resend
- **Email fix:** Updated Edge Function `send-email` — FROM address changed from `onboarding@resend.dev` to `noreply@ilcommunityevents.com`. Emails now send to all users (not just account owner)
- **About page:** Real content written and added — community story, Noa credit, business/individual/online mention
- **Cloudflare:** Domain auto-connected to Cloudflare Pages (purchased directly via Cloudflare)

### Session 11 (Mar 11, 2026) — Modal UX, Mobile Positioning, and Navigation
- **Share button on cards:** Repositioned and enlarged for better tap target visibility (desktop + mobile), with spacing/layout adjustments to avoid overlap with card content.
- **Card right rail consistency:** Standardized arrow column sizing so spacing next to share icon is consistent across cards.
- **Event modal mobile placement:** Anchored event details modal directly below top toolbar/filter area on mobile/tablet, with dynamic viewport-based max height.
- **Address modal mobile placement:** Applied same toolbar-anchored placement behavior to the address/contact modal.
- **Home footer behavior:** Home page footer made fixed/static while event list scrolls, with extra bottom padding and safe-area handling.
- **Topbar home navigation:** Clicking the site title now reliably returns users to the top of Home from any page/device (including iOS/Safari reliability ticks).
- **Filter wording:** Main filter chip label changed from `City` to `Location` (including reset state text).

### Session 12 (Mar 11–12, 2026) — Add/Edit Form Flow Overhaul + Contact Modal Enhancements
- **Edit Location UX redesigned:**
  - Replaced `Online Event` city option with dedicated checkbox above City.
  - Checkbox disables/hides city fields and behaves exactly like `city = Online Event` in logic.
  - Required marker moved from `City` label to `Location` section title.
- **Add Location UX mirrored to match Edit:**
  - Added same `Online Event` checkbox behavior, city hiding/restore logic, and validation parity.
- **Organizer contact logic simplified (Add/Edit):**
  - Removed phone input/checkbox/public-display controls from both forms.
  - Email visibility behavior now state-driven by Registration Link / Online / Private Address scenarios.
  - Helper texts and private-address email note copy updated for clarity.
- **Address/Location copy and layout updates:**
  - Full Address field moved directly below City in Add/Edit.
  - Added explicit `Full Address *` label and improved generic placeholder text.
  - Private address toggle copy changed from `Keep address private` to `Show City only`.
  - Address hint text simplified: `Visitors can submit an address request on the site`.
- **Paid amount validation parity:** Edit form now enforces Amount as required when Cost = Paid (matching submit form behavior).
- **Event details private-location CTA update:**
  - Changed button from `Request Address` to `Contact Organizer`.
  - Replaced icon with email icon and added helper text explaining this is how to request full address.
- **Address/contact modal enhancements:**
  - Header updated to `Contact Organizer` with email icon.
  - Added `Request Type` dropdown (`Request Address` / `Other`) at top.
  - Intro guidance box now conditionally shown only for `Request Address`.
  - Email and phone fields hardened with proper input behavior (`type`, `inputmode`, formatting/autocomplete).
  - Success message updated to: `The organizer will contact you directly.`
- **Address request email subject logic:**
  - If `Request Address`: `Address Request for [event name, date]`
  - If `Other`: `Other Request for [event name, date]`
  - Request type + computed subject now included in payload sent to the email function.
### Session 11 (Mar 12, 2026) — Supabase Auto-Pause Resolved
- **Supabase auto-pause:** Confirmed that Supabase has removed auto-pause from the free tier. Dashboard now shows only a manual "Pause project" button. Database stays awake automatically — no action needed.

### Session 13 (Mar 13, 2026) — Mobile Bug Fixes
- **Contact Organizer modal off-screen on iPhone 17 Pro:** Changed positioning from toolbar-anchored to safe screen-centering. Uses `100svh` and proper safe-area padding so the X button and submit button are always reachable.
- **Image delay explained:** Newly uploaded images may take 1-5 minutes to appear publicly after submission (Supabase Storage free tier propagation delay). The uploader sees a local preview instantly - other users must wait. Not a bug.
- **Android modal cut off at bottom:** Changed `100vh` to `100dvh` for the event modal. Android Chrome's `100vh` includes the browser address bar, hiding the modal bottom.
- **Android keyboard pushing modals:** Added `interactive-widget=resizes-content` to viewport meta tag. Prevents Android keyboard from repositioning fixed/modal elements.
- **Background scroll while modal open:** Added body scroll lock (`overflow: hidden`) when any modal opens, released when all modals are closed. Fixes iOS Safari background jump bug.
- **Contact Organizer form fields cramped on small phones:** Confirmed `.form-row` single-column rule applies globally on mobile (already in place).
- **Notice bar completely unstyled:** The `.notice-bar` CSS class selector was accidentally missing - only the style block `{ background:... }` remained with no class name attached. The yellow fallback banner (shown when no events match filters) had no background, border, or padding on any device. Restored the selector. Also fixed missing space between sentences, added `white-space:nowrap` to "Clear filters" link, and bumped mobile font size from 12px to 13px.
