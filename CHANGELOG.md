# Changelog

All notable changes to this project are documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning.

## [2.2.0] - 2026-02-21

### Added
- Full multilingual slide runtime (PT-BR, EN-US, ES-ES) with locale-specific manifests:
  - `slides/manifest.pt-BR.json`
  - `slides/manifest.en-US.json`
  - `slides/manifest.es-ES.json`
- Dedicated localized slide-part trees:
  - `slides/parts/pt-BR/*`
  - `slides/parts/en-US/*`
  - `slides/parts/es-ES/*`
- Locale-aware quiz experience (questions, UI labels, validation messages).
- Fixed language switcher in the presentation shell (`PT | EN | ES`) for on-the-fly locale changes via URL query.
- Locale-aware dynamic UX copy for interactive effects:
  - demo hints in `#/demo-talk-code`
  - finale audio/hyperdrive hints in `#/the-end`

### Changed
- Replaced initial language gate flow with a top-right persistent language toggle in `index.html`.
- Bootstrap/init now resolves locale from query (`?lang=`), defaults to `pt-BR`, and keeps URL/locale state synchronized.
- Updated metadata and UI strings to load from locale dictionaries (`src-ts/app/i18n/*`).
- Normalized EN/ES slide content to remove mixed Portuguese text in localized decks.

## [2.1.0] - 2026-02-21

### Added
- Interactive Three.js lightsaber experience in `#demo-talk-code`:
  - ON/OFF blade state with smooth horizontal extension/retraction.
  - Real-time glow pipeline with post-processing bloom.
  - Full-slide rendering layer with resilient fallback behavior.
- Enhanced demo interactions:
  - audio-coupled saber control with explicit reset on slide entry (`OFF + sem som`);
  - staged visual effects (reactive background, ignite shake);
  - easter egg mode (`duel mode`) with timed auto-reset.
- New finale soundtrack experience in `#the-end`:
  - click-to-play/click-to-pause CTA (`star-wars-final-song.mp3`);
  - autoplay-safe interaction flow and per-slide reset behavior;
  - dedicated final slide UX states (`on/off`, active effects).
- New finale easter egg:
  - `Hyperdrive` mode via multi-click gesture;
  - progressive activation feedback;
  - controlled duration with smooth fade-out exit.
- New release notes file:
  - `docs/releases/v2.1.0.md`

### Changed
- Final slide visual direction:
  - full-screen `star-wars.gif` background with calibrated opacity.
- Demo slide visual direction:
  - full-screen `darth-vader.gif` background with calibrated opacity;
  - improved hinting for discoverability of hidden interactions.
- UI copy refinements:
  - subtle progressive hints (“quase lá…”) for easter egg discovery on demo and final slides.

## [2.0.0] - 2026-02-20

### Added
- TypeScript migration scaffolding:
  - `tsconfig.json`
  - `tsconfig.typecheck-js.json`
  - `src-ts/` source tree for typed modules
  - `src-ts/types/globals.d.ts` for browser/CDN globals
- New npm scripts:
  - `typecheck`
  - `build:ts`
  - `build:ts:watch`

### Changed
- Presentation runtime modules in `js/app/*` are now generated from TypeScript sources in `src-ts/app/*`.
- Kept `index.html` module entrypoint unchanged (`js/app/init.js`) to preserve browser runtime behavior.
- No CSS changes in this migration (`css/custom.css` unchanged).

## [1.1.0] - 2026-02-20

### Added
- New slide: `SDD — Limites e Riscos` with explicit boundaries:
  - automated tests
  - code review
  - threat modeling / security review
  - evals/checklists
- New slide: `Mini Checklist de Qualidade (Spec -> Plan -> Tasks)` with operational criteria.
- Real clickable skill references added in Skills section:
  - `find-skills`
  - `vercel-react-best-practices`
  - `web-design-guidelines`
  - `frontend-design`
- Quiz data contract validation utility:
  - `js/app/quiz/validate.js`
- Motion preference utility:
  - `js/app/features/motion-preferences.js`
- Reduced motion CSS fallback for visual effects:
  - `@media (prefers-reduced-motion: reduce)` in `css/custom.css`
- Resilient bootstrap fallback slides when loading manifest/parts fails.

### Changed
- Clarified SDD/TDD analogy messaging:
  - explicit "analogia didática"
  - explicit statement that SDD complements (not replaces) TDD/BDD.
- Updated spec-kit messaging for slash commands availability depending on integration.
- Added fallback guidance for environments where slash commands do not appear.
- Updated AGENTS.md wording:
  - from universal automatic loading to "supported by several tools/agents depending on product/integration".
- Updated Rules path guidance:
  - `.github/copilot-instructions.md` as primary
  - `.github/instructions/**` when supported.
- Quiz controller refactor:
  - centralized selectors
  - cached DOM references via `mount()` + `cacheDomRefs()`
  - delegated events (`data-quiz-action`) replacing inline `onclick`.
- Performance updates for animated effects:
  - batch insertions using `DocumentFragment`
  - replacement of repeated `style.cssText` patterns with direct style setters/CSS variables.
- Bootstrap reliability (`js/app/init.js`):
  - per-part loading with `Promise.allSettled`
  - degraded-mode section error slides instead of hard failure
  - richer error context in logs (manifest/part path + reason)
  - explicit IDs/metadata for load-error slides.

### Removed
- Inline `onclick` wiring in quiz slide/actions in favor of controller-level event delegation.
- Temporary minimal local skill snippet (`api-design.md`, `testing.md`, `security.md`) from slide content.
