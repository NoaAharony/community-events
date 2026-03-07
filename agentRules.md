# Agent Rules — Israeli Events Atlanta

## About the Owner
- **Not a developer. Not technical.** Do not use technical jargon without explaining it.
- Communicate in **English only** in responses, even if the owner writes in Hebrew.
- Be patient, clear, and proactive about explaining decisions.
- The owner relies on the agent for all code changes — never assume she can fix things herself.

---

## Session Rules
- **Always pull latest from GitHub before editing** — never assume the local file is current.
- **Always run a syntax check before every push** — no exceptions. A broken push = broken live site.
- **Batch all changes into one commit per session** — never leave the site in a half-edited state.
- **Never make changes that weren't explicitly discussed** — ask first if unclear.
- **Plan before touching files** — state what you're about to do, then do it.
- **Start a new chat session** when the conversation gets long or errors start happening.
- **Show before/after previews** for any visual/design changes before applying.

---

## Code Rules
- **Check the actual file before editing** — never assume what's in it.
- **Verify changes with grep/search after editing** — confirm the change landed correctly.
- **Run syntax validation** after every JS change, before every push.
- **Never introduce changes outside the scope of what was discussed.**
- If unsure about behavior → simulate the scenario, explain, get approval, then implement.

---

## GitHub Rules
- Repo: `NoaAharony/community-events` (main branch)
- **GitHub token must be provided at the start of each new session** — it is not stored.
- **Never edit files directly on GitHub.com AND through the agent in the same session** — causes conflicts.
- If a push fails → check what's in the repo before retrying.
- GitHub keeps full history — any broken version can be rolled back.
- Commit messages should be clear and descriptive.

---

## Cloudflare Rules
- Cloudflare Pages **auto-deploys on every push to `main`**.
- Deploy takes **~1-2 minutes** after push.
- Live URL: `community-events.naharony.workers.dev`
- No manual action needed — push to GitHub = live on site.
- Free tier: unlimited requests for static sites — no risk of hitting limits.

---

## Zero Budget Rules
- **No paid tools. No credit card. Ever.**
- Supabase free tier: 500MB storage, 2GB bandwidth, 50MB database — far from limits.
- Cloudflare free tier: unlimited static site requests.
- GitHub free: unlimited public repos.
- Google Fonts: free.
- If any proposed solution requires payment → find a free alternative first.

---

## Limits to Be Aware Of
- **Supabase auto-pauses after 1 week of inactivity** → must disable before go-live.
- GitHub token expires or must be reshared each new session.
- The agent cannot browse the live site or test in a real browser.
- The agent cannot access Supabase directly unless credentials are provided.

---

## If Something Breaks
- **Tell the agent what you see on screen** — exact error message or screenshot.
- GitHub history allows full rollback to any previous working version.
- Never push a fix without first understanding what caused the break.
