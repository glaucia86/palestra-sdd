# Arquitetura JavaScript (Clean by Feature)

## Objetivo
Organizar a lógica da apresentação por responsabilidade para reduzir acoplamento e facilitar manutenção.

## Estrutura
- `src-ts/app/i18n/`
  - `language.ts`: locales suportados, fallback PT-BR e manifest por idioma
  - `messages.ts`: metadata, shell e mensagens de erro localizadas
- `js/app/config/`
  - `mermaid-config.js`: inicialização do Mermaid
  - `reveal-config.js`: configuração do Reveal.js
- `js/app/features/`
  - `starfield.js`: fundo global (nebula + stars)
  - `particles.js`: partículas por slide
  - `section-cosmos.js`: cometas/micro-estrelas em section pages
  - `special-backgrounds.js`: efeitos especiais por slide (`#sobre-mim`)
  - `demo-experience.js`: interações e áudio do easter egg da demo
  - `speaker-notes.js`: paridade localizada das notes
  - `the-end-experience.js`: trilha final opt-in e efeitos de `#the-end`
- `js/app/quiz/`
  - `data.js`: banco de questões
  - `controller.js`: estado e comportamento do quiz
- `js/app/`
  - `bootstrap.js`: composição e orquestração do app
  - `slide-loader.js`: carrega partes do manifest em paralelo, preservando ordem e degradação localizada
  - `init.js`: resolve locale, aplica metadata e inicia loader/bootstrap

## Ordem de inicialização (preservada)
1. `init.ts` resolve `?lang=pt-BR|en-US|es-ES` (fallback `pt-BR`) e carrega o manifest localizado.
2. O loader injeta as partes na ordem canônica e chama o bootstrap uma única vez.
3. `initMermaid()` e `ensureSpeakerNotesParity(locale)`.
4. `Reveal.initialize(...)`.
5. `Reveal.on('ready', ...)`:
   - `createStarfield()`
   - `createParticles()`
   - `createSectionCosmics()`
   - `syncSpecialSlideBackgrounds(...)`
   - `syncDemoExperience(...)`
   - `syncTheEndExperience(...)`
   - `lucide.createIcons()`
   - `mermaid.run(...)`
   - `quiz.mount()` e `quiz.renderQuestion(0)`
6. `Reveal.on('slidechanged', ...)`:
   - `syncSpecialSlideBackgrounds(...)`
   - `syncDemoExperience(...)`
   - `syncTheEndExperience(...)`
   - Mermaid lazy render

## Compatibilidade com HTML atual
- Os botões com `onclick` continuam funcionando via binding global no `QuizController.bindGlobals()`.
- A troca de idioma recarrega a página para limpar estado do Reveal e preserva os demais parâmetros/hash.
- Áudio nunca inicia automaticamente: demo e encerramento dependem de ação explícita da pessoa usuária.
