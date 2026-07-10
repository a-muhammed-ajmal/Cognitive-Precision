# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Cognitive Precision" (package name `ai-studio-applet`) — a Next.js App Router app implementing a Schulte Table game (tap numbers 1-25 in order as fast as possible, to train focus/processing speed). The repo was originally scaffolded by Google AI Studio (see `metadata.json`, the AI Studio banner in `README.md`, and the `DISABLE_HMR` webpack hook in `next.config.ts`) and has since been repurposed for the Schulte Table feature.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start dev server (Next.js)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — `eslint .` (flat config, see below)
- `npm run clean` — `next clean`

There is no test suite configured (no test runner dependency, no `*.test.*` files). Don't assume Jest/Vitest exists — check with the user before adding one.

## Architecture

- **Routing**: `app/` (App Router) — `/` (home), `/game`, `/results`, `/stats`. All game pages are client components (`'use client'`).
- **Feature module**: game logic lives under `src/features/schulte/` (`components/SchulteGrid.tsx`, `components/TimerDisplay.tsx`, `store/schulteStore.ts`), separate from the thin `app/*/page.tsx` route files. New feature logic should follow this `src/features/<name>/{components,store}` pattern rather than living directly in `app/`.
- **State**: `src/features/schulte/store/schulteStore.ts` (Zustand) is the single source of truth for both live game state (`grid`, `nextNumber`, `startTime`, `isActive`) and session history (`sessions`). It's persisted via `zustand/middleware`'s `persist` to **`sessionStorage`, not `localStorage`** — session history and stats are cleared when the browser tab/session ends. This is a deliberate existing choice, not a bug.
- **Game flow**: `GamePage` calls `startGame()` on mount (shuffles 1-25 into `grid`) → `SchulteGrid` calls `tapCell(num)` on each tap, which advances `nextNumber` on a correct match → tapping 25 calls `endGame(time)`, appending to `sessions` (capped at last 20) and setting `isActive: false` → a `GamePage` effect watches `isActive` and routes to `/results` → `ResultsPage`/`StatsPage` read `sessions` directly from the store.
- **Path alias**: `@/*` maps to the repo root (`tsconfig.json`), so imports look like `@/src/features/schulte/store/schulteStore` and `@/lib/utils`.
- **Leftover scaffolding**: `lib/utils.ts` (`cn` helper) and `hooks/use-mobile.ts` are shadcn/ui-style boilerplate carried over from the original template. There is no `components.json` and no shadcn components installed — don't assume a shadcn setup exists.
- **Unused AI dependency**: `@google/genai` is a dependency and the README/`metadata.json` reference a `GEMINI_API_KEY`, but no code in the repo currently calls the Gemini API. Treat any Gemini integration as net-new work, not something to wire into existing behavior.
- **Build config quirks** (`next.config.ts`): `output: 'standalone'`; `eslint.ignoreDuringBuilds: true` means `npm run build` will NOT fail on lint errors — always run `npm run lint` directly to check lint cleanliness. The `webpack()` hook disables file watching when `DISABLE_HMR=true` (set by the AI Studio agent environment to prevent flicker during automated edits) — leave this as-is.
- **ESLint config duplication**: both `eslint.config.mjs` (flat config, extends `eslint-config-next`) and a legacy `.eslintrc.json` (`{"extends": "next"}`) exist. ESLint 9's default is flat config, so `eslint.config.mjs` is what actually governs `npm run lint`; the `.eslintrc.json` is effectively vestigial.
