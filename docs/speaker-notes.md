# Guia de Apresentacao com Speaker Notes (Reveal.js)

Este projeto ja tem o plugin de notes ativo (`RevealNotes`) e scripts carregados em `index.html`.

## Onde as notas ficam

As notas de apresentacao estao em cada slide no formato:

```html
<aside class="notes">
  Seu roteiro para fala aqui.
</aside>
```

Essas notas nao aparecem para a audiencia no slide principal.

## Fluxo recomendado em 2 telas (Windows)

1. Conecte o projetor/segunda tela.
2. No Windows, use `Win + P` e selecione `Estender` (nao use `Duplicar`).
3. Abra a apresentacao normal no navegador:
   - Local: `http://localhost:3000`
   - Publica: `https://glaucia86.github.io/palestra-sdd`
4. Com foco na janela da apresentacao, pressione `S` para abrir o Speaker View.
5. Organize as janelas:
   - Janela da apresentacao (sem notas) na tela do projetor.
   - Janela do Speaker View (com notas, timer e preview) na sua tela.
6. Deixe a janela do projetor em tela cheia com `F11`.
7. Nao coloque o Speaker View em tela cheia no projetor.

## Como operar durante a palestra

- Navegue normalmente com `setas`, `espaco` ou click.
- O Speaker View acompanha automaticamente o slide atual.
- Se quiser pausar visualmente para a audiencia, use `B` (blackout) e `B` novamente para voltar.
- Se precisar checar atalhos, use `?`.

## Dicas para nao vazar notas para a audiencia

- Sempre confirme que o modo de tela esta em `Estender`.
- Antes de comecar, valide rapidamente:
  - Projetor mostra apenas o slide.
  - Seu notebook mostra o Speaker View.
- Evite compartilhar a tela inteira no software de videoconferencia; compartilhe apenas a janela da apresentacao.

## Troubleshooting rapido

### O `S` nao abre o Speaker View

- Verifique se a janela da apresentacao esta com foco.
- Libere pop-up para o dominio (`localhost` ou `glaucia86.github.io`).
- Tente abrir em outra aba/janela e pressionar `S` novamente.

### A audiencia esta vendo as notas

- Voce provavelmente esta em `Duplicar` e nao `Estender`.
- Volte para `Win + P` -> `Estender`.
- Reposicione as janelas: apresentacao no projetor, Speaker View no notebook.

### F11 entrou na tela errada

- Tire do fullscreen com `F11`.
- Clique na janela correta (a do slide principal no projetor) e aplique `F11` de novo.

## Checklist de 30 segundos antes de iniciar

1. `Win + P` em `Estender`.
2. Abrir deck e pressionar `S`.
3. Slide principal no projetor + `F11`.
4. Notes no notebook.
5. Pop-up liberado para o dominio.
