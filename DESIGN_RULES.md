# Atlanta IL Community Events — Design Rules

## Fonts
- **Site name / Page titles / Modal titles / Event titles** → `Source Serif 4`, serif
- **Everything else** (body, buttons, labels, tags, nav, filters) → `Nunito`, sans-serif
- **Fields that may contain Hebrew text** (event name, description, organizer name, address request message) → `Assistant` first, then `Nunito` fallback
- **Emails** → `Georgia`, serif for headings (closest email-safe equivalent to Source Serif 4); `Helvetica Neue`, Arial for body

## Colors
- `--blue: #1a3a5c` — primary navy (headers, buttons, links)
- `--blue-light: #2a5a8c` — hover states
- `--gold: #c8963e` — accents, borders, dividers
- `--gold-light: #e8b86a` — IL in site name, icon strokes, subtle highlights
- `--cream: #f9f5ef` — page background
- `--white: #ffffff` — cards, modal bodies, form sections
- `--gray-100: #f4f1ec` — subtle backgrounds inside cards/forms
- `--gray-200: #e8e2d8` — borders
- `--gray-400: #a09880` — placeholder text, labels, hints
- `--gray-600: #6b6355` — secondary body text
- `--gray-800: #3a342a` — primary body text
- `--red: #b83030` — errors, cancel actions, danger buttons
- `--green: #2d6a3f` — success states

## Header / Topbar Style
- Background: `linear-gradient(160deg, #1e4068 0%, #0f2035 100%)`
- Site name: Source Serif 4, white, font-weight 600
- "IL" in site name: gold-light (#e8b86a), italic, font-weight 400
- Page headers and modal headers: same gradient + **3px solid gold bottom border**

## Icons & Symbols
- All icons are SVG, stroke-based (not filled), stroke-width 1.5, stroke-linecap round
- Icon circles: 44px, border-radius 50%, 1px border with low opacity gold/red/green
- No emoji icons anywhere in the UI (✅ ⚠️ 🚫 etc.) — use SVG instead
- Exception: upload area and small decorative uses are acceptable

## Text Rules
- Never use em dashes (—) anywhere in user-facing text. Use a regular hyphen (-) instead.
- Button for adding events: always "Add Event" or "Add a New Event" — never "Submit"
- Confirmation text: "added successfully" — never "submitted"

## Site Name Format
- Always: Atlanta **IL** Community Events
- "IL" is always gold (#e8b86a) and italic
- "Atlanta" and "Community Events" are white (on dark) or navy (on light)

## Modals
- Header: navy gradient + 3px gold bottom border
- Title font: Source Serif 4, font-weight 400
- Small icon in header: 36px circle with 1px gold border, SVG icon inside
- Body: white background, 20px padding
- Buttons: Nunito, font-weight 600-700

## Forms
- Section titles: Nunito, uppercase, letter-spacing 2px, navy color
- Labels: Nunito, 11px, uppercase, letter-spacing 0.5px, gray-600
- Inputs: Nunito, 13px, 1px gray-200 border, focus → blue-light border
- Hints: Nunito, 11px, italic, gray-400
- Required marker: red (*)

## Emails
- Header: same navy gradient as site + 3px gold bottom border
- Site name in header: Georgia bold white + IL in gold italic (matching site)
- Body: white, Georgia for headings, Helvetica Neue/Arial for body text
- No "Metro Atlanta" in footer — just "Atlanta IL Community Events"
- No em dashes anywhere
