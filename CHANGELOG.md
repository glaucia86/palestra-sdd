# Changelog

All notable changes to this project are documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning.

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

