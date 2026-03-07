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

---

## Known Issues / Watch Points
- Supabase free tier auto-pauses after 1 week of inactivity — must disable before go-live
- Agent cannot test the live site directly — owner must verify after each deploy
- GitHub token must be reshared at the start of every new session
