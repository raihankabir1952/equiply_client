<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Equiply client

Next.js 16 / React 19 App Router **frontend only**, plain JavaScript (no TypeScript). The API, database, and auth server live in a separate repo; this app only calls them over HTTP.

## Commands

- Package manager is npm (`package-lock.json`); don't introduce pnpm/yarn.
- `npm run dev` — dev server on :3000. `npm run build` / `npm start` for production. Build succeeds without the backend running.
- `npm run lint` — bare `eslint` over the whole repo (flat config, `eslint.config.mjs`). For a single file: `npx eslint app/equipment/page.jsx`.
- No test runner, no typecheck script, no CI config. Verify changes with `npm run build` + `npm run lint` and by exercising the page in `npm run dev`.
- **Lint is not clean at baseline**: ~19 errors / 16 warnings, mostly `@next/next/no-img-element`, `react/no-unescaped-entities`, and `react-hooks/set-state-in-effect`. Don't treat those as regressions or "fix" unrelated ones.

## Environment

- Only env var: `NEXT_PUBLIC_API_URL` (currently `http://localhost:5000`) in `.env.local`, which is gitignored. Without it, every API/auth call fails.
- `lib/auth.js` (better-auth + MongoDB adapter) is **unused dead code**: nothing imports it, no `app/api/**` route exists, and `MONGODB_URI` is not configured. Auth is served by the external API — don't wire this file up by accident.

## Architecture

- `lib/auth-client.js` — `authClient`/`useSession`/`signIn`/`signUp`/`signOut` from `better-auth/react` against `NEXT_PUBLIC_API_URL` with `basePath: "/auth"` and cookie credentials.
- `lib/api.js` — `apiFetch(endpoint, options)` first calls `GET /auth/token` (cookie-authenticated) to get a JWT, then calls `${NEXT_PUBLIC_API_URL}${endpoint}` with `Authorization: Bearer <token>`. Always use it for API calls; don't call the backend directly except where existing code already does (e.g. the public equipment listing in `app/equipment/page.jsx`).
- Roles are `admin` | `owner` | `customer`; the dashboard path is `/dashboard/<role>`. Access control is **client-side only** (`useSession` + `router.replace`); there is no middleware. Treat it as UX, not security.
- Nearly every page is `"use client"` and fetches in `useEffect` via `apiFetch`; there is no server-side data fetching, and the build prerenders pages statically. Follow that pattern instead of introducing server components/data loaders.
- Query params are read from `window.location.search` (see `app/equipment/page.jsx`) rather than `useSearchParams`, which avoids Suspense requirements under `cacheComponents`. Route params use `useParams`.
- Payments: Stripe checkout is created by the backend; `/payment/success` verifies via `GET /payments/verify-session/:sessionId`.

## UI / styling

- Tailwind v4 is loaded through a **turbopack loader rule** in `next.config.mjs` (`@tailwindcss/turbopack`); there is no PostCSS config. Keep that rule when touching build config.
- `app/globals.css` starts with `@import "tailwindcss"`, `tw-animate-css`, and `shadcn/tailwind.css`; theme tokens are CSS variables mapped in `@theme inline`.
- shadcn/ui is configured for the `base-nova` style (`components.json`) and the primitives in `components/ui/*` are built on **`@base-ui/react`, not Radix**. `cn` comes from the `cn` npm package (re-exported by `lib/utils.js`) — don't swap in `clsx` + `tailwind-merge` or add Radix packages.
- Brand colors are hard-coded hex values everywhere: `#35C77A` (green), `#23995A` (green hover), `#142B45` (navy). Reuse them rather than inventing theme colors.
- `next/image` remote hosts are allowlisted in `next.config.mjs` (`lh3.googleusercontent.com`, `i.ibb.co`); add a host there before using a new external image URL.

## Gotchas

- `app/loading.jsx` is a **directory** containing `page.jsx`, so it renders a real `/loading.jsx` route and provides no root loading UI. Move it to `app/loading.jsx` if you actually need the fallback.
- `next.config.mjs` sets `cacheComponents: true`, `partialPrefetching: true`, and `turbopack.root: process.cwd()` (needed for deployment); changing these affects routing/prerender behavior.
- `app/dashboard/layout.jsx` renders its own Navbar/Footer; `ConditionalLayout` hides them only for `/dashboard/*`. Don't add a third set of chrome in a dashboard page.
- `console.log("User role :", ...)` in `components/shared/Navbar.jsx` is leftover debug noise.
