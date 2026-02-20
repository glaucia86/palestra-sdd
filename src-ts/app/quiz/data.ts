import type { QuizQuestion } from './types.js';

export const quizData: QuizQuestion[] = [
  {
    question: '1. Qual é o principal artefato no Spec-Driven Development (SDD)?',
    options: [
      'Código-fonte da aplicação',
      'Especificações estruturadas (Specs)',
      'Testes unitários automatizados',
      'Documentação técnica gerada por IA',
    ],
    correct: 1,
    explanation:
      '✅ Correto! No SDD as Especificações (Specs) são o artefato primário — elas guiam tudo o mais: código, testes e documentação.',
  },
  {
    question: '2. Qual é a principal função do arquivo AGENTS.md?',
    options: [
      'Configurar plugins do VS Code',
      'Definir schemas de banco de dados',
      'Guiar AI agents com contexto, regras e comportamentos',
      'Gerar relatórios de código automaticamente',
    ],
    correct: 2,
    explanation:
      '✅ Correto! AGENTS.md é um "contrato vivo" que guia o comportamento dos AI agents com contexto, regras e restrições do projeto.',
  },
  {
    question: '3. O que é Progressive Disclosure no contexto do Skills.md?',
    options: [
      'Exibir animações progressivas nos slides',
      'Mostrar toda a documentação de uma só vez',
      'Carregar habilidades especializadas sob demanda',
      'Revelar o código-fonte gradualmente ao usuário',
    ],
    correct: 2,
    explanation:
      '✅ Correto! Progressive Disclosure é carregar apenas as Skills necessárias para cada tarefa, evitando sobrecarga de contexto no agente.',
  },
  {
    question: '4. Qual comando do spec-kit gera o plano técnico de implementação (PRD.md)?',
    options: ['/speckit.specify', '/speckit.tasks', '/speckit.plan', '/speckit.implement'],
    correct: 2,
    explanation:
      '✅ Correto! O /speckit.plan gera o PRD.md — documento vivo que serve como fonte única de verdade para o AI agent durante a implementação.',
  },
  {
    question: '5. O que o specify init configura automaticamente no projeto?',
    options: [
      'Apenas o arquivo AGENTS.md',
      'Templates, slash commands (/speckit.*) e estrutura de pastas',
      'Somente as dependências no package.json',
      'Apenas os testes unitários iniciais',
    ],
    correct: 1,
    explanation:
      '✅ Correto! O specify init baixa os templates do spec-kit, instala os slash commands (/speckit.*) e cria a estrutura de pastas do projeto. AGENTS.md não é gerado automaticamente.',
  },
  {
    question: '6. Qual modo do GitHub Copilot cria um plano de implementação SEM modificar código?',
    options: ['Agent Mode', 'Ask Mode', 'Explore Mode', 'Plan Mode'],
    correct: 3,
    explanation:
      '✅ Correto! O Plan Mode (public preview) cria um plano detalhado para revisão humana antes de qualquer alteração no código — perfeito para o fluxo SDD.',
  },
  {
    question: '7. Quais modelos estão incluídos gratuitamente no plano Free do GitHub Copilot?',
    options: [
      'Claude Opus 4.6 e GPT-5.2',
      'GPT-4.1 e GPT-5 mini',
      'Gemini 3.1 Pro e Claude Sonnet 4.6',
      'Apenas modelos internos sem nome público',
    ],
    correct: 1,
    explanation:
      '✅ Correto! O plano Free inclui GPT-4.1 e GPT-5 mini sem custo de créditos. Claude Haiku 4.5 é premium com multiplicador de 0.33x.',
  },
  {
    question: '8. Para que serve o padrão agentskills.io adotado pelo GitHub Copilot em Dezembro/2025?',
    options: [
      'Definir schemas de banco de dados para agentes IA',
      'Padronizar diretórios com SKILL.md para carregar conhecimento especializado sob demanda',
      'Configurar pipelines de CI/CD automatizados com IA',
      'Criar extensões para o VS Code Marketplace',
    ],
    correct: 1,
    explanation:
      '✅ Correto! O agentskills.io define o padrão de diretórios com SKILL.md como entrypoint — habilidades que os agentes carregam sob demanda, implementando Progressive Disclosure na prática.',
  },
];
