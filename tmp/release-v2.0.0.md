## Highlights
- Breaking change: migration of presentation runtime to TypeScript with incremental ESM emit.
- New TypeScript workflow scripts: `typecheck`, `build:ts`, `build:ts:watch`.
- Runtime kept browser-compatible via `js/app/*.js` emitted from `src-ts/app/*`.
- `index.html` entrypoint preserved (`js/app/init.js`).
- No CSS changes in this migration (`css/custom.css` unchanged).

## Added
- `tsconfig.json`
- `tsconfig.typecheck-js.json`
- `src-ts/` source tree
- `src-ts/types/globals.d.ts`

## Changed
- `js/app/*` now generated from TypeScript sources.
