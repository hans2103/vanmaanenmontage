# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Van Maanen Klus- en Montagebedrijf** (Dutch handyman/construction business in De Kempen). Single-page Next.js App Router site. UI copy and metadata are in Dutch (`<html lang="nl">`).

## Commands

```bash
npm run dev    # next dev --turbopack --experimental-https (serves on https://localhost:3000 using ./certificates/*.pem)
npm run build  # production build
npm run start  # serve built app
npm run lint   # next lint (extends next/core-web-vitals + next/typescript)
```

There is no test runner configured.

The dev server requires the local TLS files in `./certificates/` (`localhost-key.pem`, `localhost.pem`) — they are gitignored, so a fresh checkout needs them generated (e.g. via `mkcert`) before `npm run dev` will work.

## Environment

- `NEXT_PUBLIC_FORMSPREE_ID` — Formspree form ID used by `ContactForm.tsx`. Stored in `.env.local` (gitignored). The contact form silently no-ops if it's missing.

## Architecture

- **Next.js 15 App Router + React 19**, TypeScript strict mode, path alias `@/* → src/*`.
- **Tailwind v4** via `@tailwindcss/postcss` (note: there is also a legacy `tailwind.config.{js,ts}` from the shadcn init, but v4 uses CSS-first config in `src/app/globals.css`).
- **shadcn/ui** ("new-york" style, RSC, Lucide icons) — generated primitives live in `src/components/ui/` (button, dropdown-menu, navigation-menu). Aliases configured in `components.json`. `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge).
- **Theming**: `next-themes` with class-based dark mode. `ThemeProvider` wraps the app in `src/app/layout.tsx`; `ThemeToggler` switches modes; `use-meta-color` hook keeps the browser theme-color meta in sync. The root `<html>` uses `suppressHydrationWarning` because `next-themes` mutates the class on mount.
- **Layout shell** (`src/app/layout.tsx`) renders a fixed centered card background, then `Header` → `{children}` → `Contact` → `Footer`. Contact and Footer are part of the layout, not page-level — every page gets them.
- **Contact form** (`src/components/ContactForm.tsx`) is a client component using `@formspree/react`. It includes a hidden `_gotcha` honeypot field; do not unhide it or rename it (Formspree relies on that exact name for spam filtering).
- **Color palette** is `sky-*` throughout (light: sky-50/100, dark: sky-900/950). Stick to this scale rather than introducing new color families.
- **Animations**: `framer-motion` is available; `tailwindcss-animate` is configured.

## Conventions

- Components are default-exported PascalCase files directly under `src/components/` (no per-component folders). shadcn primitives are kebab-case under `src/components/ui/`.
- Use the `@/` alias for internal imports — relative imports across `src/` are not used elsewhere in the codebase.
- The `Header` menu links to `/diensten`, `/over-mij`, `/contact` — these routes don't exist yet (only `/` is implemented). When adding pages, place them under `src/app/<route>/page.tsx`.
