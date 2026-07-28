# heytruffle.ai

Marketing and lead-generation site for **heytruffle** — the managed voice AI
service that answers restaurant calls 24/7 in English and Spanish.

Formerly branded RestoHost; `restohost.ai` now redirects here.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| Content | Markdown (`marked`) with a hand-rolled frontmatter parser |
| Host | Render |
| Analytics | Microsoft Clarity |

No database and no CMS — every page is statically prerendered at build time.

## Getting started

```bash
npm ci
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

### Environment

All variables live in `.env.local` locally, and in the service's Environment
tab on Render. Nothing is committed.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_DEMO_ASSISTANT_URL` | no | Autocomplete backend for the hero demo. Defaults to the shared instance. |
| `NEXT_PUBLIC_DEMO_ASSISTANT_API_KEY` | **yes** | Authenticates against that backend. Without it autocomplete returns 401 and the hero search silently fails. |
| `NEXT_PUBLIC_DEMO_APP_URL` | no | Where a chosen restaurant's Place ID is handed off. Defaults to `demo.heytruffle.ai`. |
| `LEADS_WEBHOOK_URL` | no | Automation webhook (Make, Zapier, …) that leads are forwarded to. Unset means leads are only logged server-side. |

## Scripts

```bash
npm run dev       # dev server
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint (flat config, no args)
npx tsc --noEmit  # typecheck — no script for this one
```

## Branches

| Branch | Purpose |
|---|---|
| `development` | **Active branch.** All work happens here. |
| `main` | Maintenance mode — `proxy.ts` restricts the site to the coming-soon landing plus the legal pages. |

## Layout

```
app/                 routes; case studies are one page.tsx per client,
                     integrations and blog posts are dynamic
components/          flat, PascalCase; only macbook-dashboard/ and
                     roi-calculator/ get their own folder
lib/                 blog loader, demo-assistant client, voice hosts,
                     integrations data, shared noise texture
content/blog/        50 posts as .md with frontmatter
public/images/       all imagery as WebP
public/audio/        voice host samples
```

## Conventions

- **Read the Next.js docs before writing code.** This version has breaking
  changes; see `AGENTS.md`. The relevant guides ship in
  `node_modules/next/dist/docs/`.
- Components are PascalCase and split into a folder with an `index.ts` only
  once they get large.
- Styles live in `app/globals.css`. No `<style>` blocks inside components.
- Images go through `next/image`. Source files are capped at 2560px wide and
  `quality` never exceeds 90 — 100 was measured at 5-9x the bytes for no
  visible gain, and the optimizer rejects it.
- Rendered markdown escapes raw HTML (`lib/blog.ts`); it goes into
  `dangerouslySetInnerHTML`, so don't route new content around that helper.
- Conventional commits (`feat:`, `fix:`, `seo:`, `perf:`, `style:`).
</content>
