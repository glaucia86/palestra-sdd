const quizDataByLocale = {
    'pt-BR': [
        {
            question: '1. Qual é o principal artefato no Spec-Driven Development (SDD)?',
            options: [
                'Código-fonte da aplicação',
                'Especificações estruturadas (Specs)',
                'Testes unitários automatizados',
                'Documentação técnica gerada por IA',
            ],
            correct: 1,
            explanation: '✅ Correto! No SDD as Especificações (Specs) são o artefato primário — elas guiam tudo o mais: código, testes e documentação.',
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
            explanation: '✅ Correto! AGENTS.md é um "contrato vivo" que guia o comportamento dos AI agents com contexto, regras e restrições do projeto.',
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
            explanation: '✅ Correto! Progressive Disclosure é carregar apenas as Skills necessárias para cada tarefa, evitando sobrecarga de contexto no agente.',
        },
        {
            question: '4. Qual comando do spec-kit gera o plano técnico de implementação (PRD.md)?',
            options: ['/speckit.specify', '/speckit.tasks', '/speckit.plan', '/speckit.implement'],
            correct: 2,
            explanation: '✅ Correto! O /speckit.plan gera o PRD.md — documento vivo que serve como fonte única de verdade para o AI agent durante a implementação.',
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
            explanation: '✅ Correto! O specify init baixa os templates do spec-kit, instala os slash commands (/speckit.*) e cria a estrutura de pastas do projeto. AGENTS.md não é gerado automaticamente.',
        },
        {
            question: '6. Qual modo do GitHub Copilot cria um plano de implementação SEM modificar código?',
            options: ['Agent Mode', 'Ask Mode', 'Edit Mode', 'Plan Mode'],
            correct: 3,
            explanation: '✅ Correto! O Plan Mode cria um plano detalhado para revisão humana antes de qualquer alteração no código — perfeito para o fluxo SDD.',
        },
        {
            question: '7. Em fevereiro de 2026, quais modelos estavam incluídos gratuitamente no plano Free do GitHub Copilot?',
            options: [
                'Claude Opus 4.6 e GPT-5.2',
                'GPT-4.1 e GPT-5 mini',
                'Gemini 3.1 Pro e Claude Sonnet 4.6',
                'Apenas modelos internos sem nome público',
            ],
            correct: 1,
            explanation: '✅ Correto! Em fevereiro de 2026, o plano Free incluía GPT-4.1 e GPT-5 mini sem custo de créditos. Verifique sempre a tabela oficial de modelos suportados.',
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
            explanation: '✅ Correto! O agentskills.io define o padrão de diretórios com SKILL.md como entrypoint — habilidades que os agentes carregam sob demanda, implementando Progressive Disclosure na prática.',
        },
    ],
    'en-US': [
        {
            question: '1. What is the primary artifact in Spec-Driven Development (SDD)?',
            options: ['Application source code', 'Structured Specifications (Specs)', 'Automated unit tests', 'AI-generated technical docs'],
            correct: 1,
            explanation: '✅ Correct! In SDD, Specifications (Specs) are the primary artifact. They guide everything else: code, tests, and documentation.',
        },
        {
            question: '2. What is the main purpose of the AGENTS.md file?',
            options: [
                'Configure VS Code plugins',
                'Define database schemas',
                'Guide AI agents with context, rules, and behaviors',
                'Generate code reports automatically',
            ],
            correct: 2,
            explanation: '✅ Correct! AGENTS.md is a living contract that guides AI agent behavior with project context, rules, and constraints.',
        },
        {
            question: '3. What does Progressive Disclosure mean in the Skills.md context?',
            options: [
                'Show progressive animations in slides',
                'Show all docs at once',
                'Load specialized skills on demand',
                'Reveal source code gradually to the user',
            ],
            correct: 2,
            explanation: '✅ Correct! Progressive Disclosure means loading only the skills needed for each task, reducing context overload for the agent.',
        },
        {
            question: '4. Which spec-kit command generates the technical implementation plan (PRD.md)?',
            options: ['/speckit.specify', '/speckit.tasks', '/speckit.plan', '/speckit.implement'],
            correct: 2,
            explanation: '✅ Correct! /speckit.plan generates PRD.md, the living document used as the single source of truth for implementation.',
        },
        {
            question: '5. What does `specify init` configure automatically in a project?',
            options: [
                'Only AGENTS.md',
                'Templates, slash commands (/speckit.*), and folder structure',
                'Only dependencies in package.json',
                'Only initial unit tests',
            ],
            correct: 1,
            explanation: '✅ Correct! `specify init` downloads spec-kit templates, installs slash commands (/speckit.*), and creates project structure.',
        },
        {
            question: '6. Which GitHub Copilot mode creates an implementation plan without changing code?',
            options: ['Agent Mode', 'Ask Mode', 'Edit Mode', 'Plan Mode'],
            correct: 3,
            explanation: '✅ Correct! Plan Mode creates a detailed implementation plan for human review before any code changes.',
        },
        {
            question: '7. As of February 2026, which models were included for free in GitHub Copilot Free?',
            options: [
                'Claude Opus 4.6 and GPT-5.2',
                'GPT-4.1 and GPT-5 mini',
                'Gemini 3.1 Pro and Claude Sonnet 4.6',
                'Only unnamed internal models',
            ],
            correct: 1,
            explanation: '✅ Correct! As of February 2026, the Free plan included GPT-4.1 and GPT-5 mini at no credit cost. Always verify the official supported-models page.',
        },
        {
            question: '8. What is the purpose of the agentskills.io standard adopted by GitHub Copilot in December/2025?',
            options: [
                'Define database schemas for AI agents',
                'Standardize folders with SKILL.md to load specialized knowledge on demand',
                'Configure AI-based CI/CD pipelines',
                'Create VS Code Marketplace extensions',
            ],
            correct: 1,
            explanation: '✅ Correct! agentskills.io defines folder conventions with SKILL.md as an entrypoint to load skills on demand.',
        },
    ],
    'es-ES': [
        {
            question: '1. ¿Cuál es el artefacto principal en Spec-Driven Development (SDD)?',
            options: [
                'Código fuente de la aplicación',
                'Especificaciones estructuradas (Specs)',
                'Pruebas unitarias automatizadas',
                'Documentación técnica generada por IA',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! En SDD, las especificaciones (Specs) son el artefacto principal y guían el código, las pruebas y la documentación.',
        },
        {
            question: '2. ¿Cuál es la función principal del archivo AGENTS.md?',
            options: [
                'Configurar plugins de VS Code',
                'Definir esquemas de base de datos',
                'Guiar agentes de IA con contexto, reglas y comportamientos',
                'Generar reportes de código automáticamente',
            ],
            correct: 2,
            explanation: '✅ ¡Correcto! AGENTS.md es un contrato vivo que guía el comportamiento de agentes de IA con contexto y restricciones del proyecto.',
        },
        {
            question: '3. ¿Qué significa Progressive Disclosure en el contexto de Skills.md?',
            options: [
                'Mostrar animaciones progresivas en las diapositivas',
                'Mostrar toda la documentación de una vez',
                'Cargar habilidades especializadas bajo demanda',
                'Revelar el código fuente gradualmente al usuario',
            ],
            correct: 2,
            explanation: '✅ ¡Correcto! Progressive Disclosure es cargar solo las habilidades necesarias en cada tarea para evitar sobrecarga de contexto.',
        },
        {
            question: '4. ¿Qué comando de spec-kit genera el plan técnico de implementación (PRD.md)?',
            options: ['/speckit.specify', '/speckit.tasks', '/speckit.plan', '/speckit.implement'],
            correct: 2,
            explanation: '✅ ¡Correcto! /speckit.plan genera el PRD.md, documento vivo y fuente única de verdad para implementar.',
        },
        {
            question: '5. ¿Qué configura automáticamente `specify init` en el proyecto?',
            options: [
                'Solo el archivo AGENTS.md',
                'Plantillas, slash commands (/speckit.*) y estructura de carpetas',
                'Solo dependencias en package.json',
                'Solo pruebas unitarias iniciales',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! `specify init` descarga plantillas, instala comandos /speckit.* y crea la estructura del proyecto.',
        },
        {
            question: '6. ¿Qué modo de GitHub Copilot crea un plan de implementación sin modificar código?',
            options: ['Agent Mode', 'Ask Mode', 'Edit Mode', 'Plan Mode'],
            correct: 3,
            explanation: '✅ ¡Correcto! Plan Mode crea un plan detallado para revisión humana antes de realizar cambios en el código.',
        },
        {
            question: '7. En febrero de 2026, ¿qué modelos estaban incluidos gratis en GitHub Copilot Free?',
            options: [
                'Claude Opus 4.6 y GPT-5.2',
                'GPT-4.1 y GPT-5 mini',
                'Gemini 3.1 Pro y Claude Sonnet 4.6',
                'Solo modelos internos sin nombre público',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! En febrero de 2026, el plan Free incluía GPT-4.1 y GPT-5 mini sin costo de créditos. Verifica siempre la tabla oficial de modelos soportados.',
        },
        {
            question: '8. ¿Para qué sirve el estándar agentskills.io adoptado por GitHub Copilot en diciembre/2025?',
            options: [
                'Definir esquemas de base de datos para agentes IA',
                'Estandarizar carpetas con SKILL.md para cargar conocimiento especializado bajo demanda',
                'Configurar pipelines de CI/CD automatizados con IA',
                'Crear extensiones para VS Code Marketplace',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! agentskills.io define carpetas con SKILL.md como punto de entrada para cargar skills bajo demanda.',
        },
    ],
};
export function getQuizData(locale) {
    return quizDataByLocale[locale];
}
//# sourceMappingURL=data.js.map