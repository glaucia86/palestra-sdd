# Arquitetura JavaScript (Clean by Feature)

## Objetivo
Organizar a lógica da apresentação por responsabilidade para reduzir acoplamento e facilitar manutenção.

## Estrutura
- `js/app/config/`
  - `mermaid-config.js`: inicialização do Mermaid
  - `reveal-config.js`: configuração do Reveal.js
- `js/app/features/`
  - `starfield.js`: fundo global (nebula + stars)
  - `particles.js`: partículas por slide
  - `section-cosmos.js`: cometas/micro-estrelas em section pages
  - `special-backgrounds.js`: efeitos especiais por slide (`#sobre-mim`)
- `js/app/quiz/`
  - `data.js`: banco de questões
  - `controller.js`: estado e comportamento do quiz
- `js/app/`
  - `bootstrap.js`: composição e orquestração do app
  - `init.js`: entrypoint

## Ordem de inicialização (preservada)
1. `initMermaid()`
2. `Reveal.initialize(...)`
3. `Reveal.on('ready', ...)`:
   - `createStarfield()`
   - `createParticles()`
   - `createSectionCosmics()`
   - `syncSpecialSlideBackgrounds(...)`
   - `lucide.createIcons()`
   - `mermaid.run(...)`
   - `quiz.renderQuestion(0)`
4. `Reveal.on('slidechanged', ...)`:
   - `syncSpecialSlideBackgrounds(...)`
   - Mermaid lazy render

## Compatibilidade com HTML atual
- Os botões com `onclick` continuam funcionando via binding global no `QuizController.bindGlobals()`.
