## Purpose
This file gives concise, actionable guidance for AI coding agents working on the crypto-dashboard repo. Focus on concrete, discoverable patterns, commands, and files so an agent can be productive immediately.

## Big picture
- Frontend-only React app bootstrapped with Vite. Dev server: `vite` (see `package.json` scripts).
- UI built with Tailwind CSS and simple component composition inside `src/components`.
- No global state library: local React `useState` and `useEffect` handle data flows.
- External integration: CoinGecko REST API is queried directly from `CryptoDashboard.jsx` to populate the list and chart data.

## Where to look first
- App entry: `src/main.jsx` and styles in `src/index.css` / `src/App.css`.
-- Core UI and data flow: src/components/CryptoDashboard.jsx — fetch logic, loading/error states, and chart data formatting.
-- List + item patterns: src/components/CryptoList.jsx and src/components/CryptoCard.jsx.
-- Charts: src/components/CryptoCharts.jsx — uses `recharts` and expects `{date, price}` shaped objects.
-- Small UI helpers: src/components/SearchBar.jsx.

## Conventions & patterns
- Styling: Tailwind utility classes inline in JSX (no CSS modules). Expect classes like `bg-gray-900`, `rounded-xl`, `text-gray-400` throughout components.
- Data fetching: performed directly in `useEffect` (see `CryptoDashboard.jsx`). Errors flow into a `error` state string and displayed as plain text.
- Chart data: build a `[{date, price}, ...]` array from CoinGecko `prices` array before passing to `CryptoCharts`.
- List rendering: parent component filters data and maps to `CryptoCard` components; keys use `coin.id`.
- Number formatting: components call `toLocaleString()` and `toFixed()` directly on numeric fields.

## Important scripts & commands
- Install: `npm install`
- Dev server (HMR): `npm run dev` (runs `vite`).
- Build: `npm run build` (runs `vite build`).
- Preview production build: `npm run preview`.
- Lint: `npm run lint` (runs `eslint .`).

## Dependencies & integrations
- React 19 + Vite — fast dev loop. See `package.json` scripts and `vite.config.js`.
- Tailwind CSS configured (see `tailwind.config.js` and `postcss.config.js`).
- Charting: `recharts` — components expect typical Recharts props (`LineChart`, `ResponsiveContainer`).
- External API: CoinGecko endpoints used in `CryptoDashboard.jsx`. Treat network calls as unauthenticated, rate-limited public endpoints.

## Editing guidance for AI agents
- Keep changes small and local. This is a single-page UI; avoid adding global state libraries or backend services.
- When modifying data fetching, preserve: loading state, error state, and the chart-data formatting pipeline (dates -> toLocaleDateString, price values preserved as numbers).
- When altering UI, follow existing Tailwind utility patterns and the compact, component-per-file structure in `src/components`.
- Add unit tests only if adding business logic that benefits from test coverage; otherwise prefer manual verification via `npm run dev`.

## Examples (explicit pointers)
- Add a defensive fetch check: in `CryptoDashboard.jsx` ensure `data && data.length` before referencing `data[0].id` to avoid runtime errors on empty responses.
- If extending charts, maintain the `{date, price}` keys so `CryptoCharts.jsx` continues to work without change.

## What not to do
- Don't introduce a server or SSR; this repo is client-side only.
- Don't convert to TypeScript automatically — the repo is plain JS and ESLint is configured accordingly.

## Final notes & feedback
If any of these points are unclear or you want additional examples (tests, new components, or a local mock for CoinGecko), say which area and I'll update this file.
