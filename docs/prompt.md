Quero que você atue como um Engenheiro de Software Sênior especializado em desenvolvimento web e criação de apresentações interativas, com experiência em metodologias ágeis e integração de IA em fluxos de trabalho. Seu objetivo é criar uma apresentação completa sobre SDD (Spec-Driven Development), mas no formato de uma aplicação web que simule uma apresentação em PPTX, executável diretamente no navegador. Não crie um arquivo PPTX real; em vez disso, gere código para uma apresentação web moderna, inovadora e visualmente atraente, com efeitos de transição interessantes, animações suaves e elementos interativos, voltados para o público de tecnologia e desenvolvimento de software.

### Análise da Tecnologia para a Apresentação Web
Antes de prosseguir, realize uma análise rápida da melhor tecnologia para isso. Baseado em pesquisas sobre frameworks para apresentações web (como Reveal.js, Slidev, Impress.js, Spectacle para React), a melhor escolha é **Reveal.js**. Razões:
- É uma biblioteca JavaScript leve e poderosa para criar apresentações HTML5 com transições, zoom, parallax e efeitos 3D opcionais, perfeita para uma experiência "moderna e inovadora".
- Suporta Markdown para slides, facilitando a criação de conteúdo técnico com destaque de código, diagramas e embeds.
- Não requer frameworks pesados como React (embora possa ser integrado), tornando-o simples para um projeto standalone em VS Code.
- Alternativas como React (com Spectacle) seriam overkill para uma apresentação simples, aumentando a complexidade sem benefícios claros aqui. Slidev (Vue-based) é ótima para devs, mas Reveal.js é mais versátil e amplamente adotada em talks tech.
- Benefícios: Cross-browser, mobile-friendly, temas customizáveis, plugins para interatividade (ex: notes, multiplex para controle remoto), e fácil deploy em GitHub Pages ou Netlify.

Use Reveal.js como base. Gere um projeto web completo com HTML, CSS, JS, incluindo a biblioteca via CDN ou local. Estrutura o projeto assim:
- index.html: Arquivo principal com os slides em HTML/Markdown.
- css/: Estilos customizados para um tema tech moderno (cores escuras, gradients, fonts como Montserrat).
- js/: Scripts para inicializar Reveal.js e adicionar efeitos.
- assets/: Imagens, diagramas (ex: Mermaid para fluxos).

### Requisitos Gerais da Apresentação
- **Estilo e Design**: Moderna, com tema dark mode tech (azul escuro, verde neon para destaques). Use animações sutis (fade, slide, zoom) em transições. Inclua elementos inovadores como parallax background, embeds de vídeos (ex: YouTube refs fornecidas), e interatividade (cliques para expandir seções).
- **Estrutura**: Divida em slides/slides seções, como uma PPTX. Inclua capa, sumário, conteúdo principal, conclusão e referências. Cada slide deve ter título, bullets, tabelas, diagramas onde aplicável.
- **Interatividade**: Adicione navegação não-linear (links entre slides), quizzes simples ou polls fictícios sobre SDD para engajar.
- **Otimização**: Responsiva para desktop/mobile. Mantenha leve (<5MB total).
- **Integração de Conteúdo**: Use o material fornecido abaixo como base principal. Adicione informações extras extremamente importantes de pesquisas sobre SDD, como:
  - Definição atualizada: SDD é uma abordagem onde especificações estruturadas (specs) são o artefato primário, guiando AI agents para gerar código sem alucinações, enfatizando "spec-first" e "human-in-the-loop" (de fontes como Martin Fowler e GitHub Spec Kit).
  - Benefícios adicionais: Reduz tempo de iteração em 70% (de estudos em Progressive Disclosure), integra com tools como Tessl ou Spec Kit para specs executáveis.
  - Arquitetura de Contexto: Expanda AGENTS.md como "contrato vivo" para agents, Rules como diretrizes globais/don'ts, Skills.md como arquivos especializados para progressive disclosure (evitando overload de contexto), PRD.md como ponte entre negócio e tech.
- **Pesquisa Adicional**: Se necessário, pesquise referências públicas sobre SDD, AGENTS.md, PRD.md, mas não copie; use como inspiração para enriquecer o conteúdo sem inventar.

### Conteúdo Detalhado da Apresentação
Baseie-se fielmente no material fornecido, estruturando como slides. Adicione extras apenas se cruciais (ex: exemplos reais de SDD em projetos open-source como GitHub Spec Kit). Estrutura sugerida de slides:

1. **Capa**: Título "SDD - Spec-Driven Development: Programação Orientada a Especificação". Seu nome como autor. Imagem tech de fundo (ex: código com specs).
2. **Sumário**: Lista de seções com links navegáveis.
3. **O que é SDD?**: Definição, importância com AI (tabela de problemas/soluções), benefícios (bullets).
4. **Por que SDD Hoje?**: Avanço de AI assistants, redução de alucinações, previsibilidade.
5. **PRD - Product Requirement Document**: Definição, estrutura (lista numerada), tabela de comparação sem/com PRD, importância para IA.
6. **Fluxo SDD com GitHub Copilot Agent Mode**: Diagrama Mermaid do fluxo, passo a passo detalhado (sub-slides para cada etapa).
7. **Preparar spec.md**: Instruções, estrutura de arquivos.
8. **Gerar PRD.md e AGENTS.md**: Prompt fornecido, princípios de Progressive Disclosure.
9. **Revisão Humana**: Importância, checklist.
10. **Implementar com Agent Mode**: Prompt final, estrutura de arquivos.
11. **Por que o Fluxo Funciona?**: Tabela de etapas/benefícios, tips.
12. **Arquitetura de Contexto Adicional**: Slides sobre AGENTS.md (minimalista, raiz), Rules (do/don'ts globais), Skills.md (arquivos especializados para skills sob demanda), PRD.md (expansão).
13. **Referências e Aprofundamento**: Links/vídeos fornecidos, mais extras de pesquisa (ex: GitHub Spec Kit, Tessl).
14. **Conclusão**: Resumo, call to action para adotar SDD.
15. **Q&A**: Slide interativo com perguntas comuns.

Inclua diagramas (Mermaid para fluxos), tabelas Markdown, código snippets destacados (ex: prompts).

### Instruções de Implementação
Siga estes passos estritamente:
1. **Planeje**: Resuma seu entendimento do conteúdo e tech stack. Liste arquivos a criar.
2. **Gere Código**: Crie o projeto completo em uma pasta (ex: sdd-presentation-web). Use Reveal.js via CDN. Escreva slides em <section> tags.
3. **Adicione Efeitos**: Configure opções como parallaxBackground, transition: 'zoom', plugins para Markdown e highlights.
4. **Teste**: Instrua como rodar (abrir index.html no browser).
5. **Validação**: Certifique-se de que segue o material fornecido sem invenções. Mantenha fiel ao escopo.

Regras Finais:
- Não adicione conteúdo irrelevante ou fora do tema.
- Foque em qualidade: Código limpo, comentários, sem erros.
- Se ambiguidades, registre em um README.md.
- Finalize gerando apenas os arquivos necessários, sem outputs extras.