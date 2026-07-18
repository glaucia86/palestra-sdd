const quizDataByLocale = {
    'pt-BR': [
        {
            question: '1. Qual é o artefato primário no Spec-Driven Development (SDD)?',
            options: [
                'O código-fonte já implementado',
                'A especificação estruturada e seus critérios de aceite',
                'O histórico completo de prompts',
                'A ferramenta de IA escolhida pelo time',
            ],
            correct: 1,
            explanation: '✅ Correto! No SDD, a especificação explicita intenção, restrições e critérios verificáveis antes de orientar código, testes e documentação.',
        },
        {
            question: '2. Por que SDD combina com AI Coding Agents?',
            options: [
                'Porque elimina revisão humana e testes',
                'Porque transforma intenção e aceitação em contexto verificável para o agente',
                'Porque exige um único agente para todo projeto',
                'Porque substitui decisões técnicas por prompts longos',
            ],
            correct: 1,
            explanation: '✅ Correto! Specs reduzem ambiguidade e dão aos agentes um contrato rastreável para planejar, implementar e verificar o resultado.',
        },
        {
            question: '3. Qual é o papel de AGENTS.md em um repositório?',
            options: [
                'Guardar o transcript completo de todas as sessões',
                'Substituir os critérios de aceite da feature',
                'Orientar agentes com regras persistentes, contexto e limites do projeto',
                'Instalar automaticamente dependências e ferramentas',
            ],
            correct: 2,
            explanation: '✅ Correto! AGENTS.md funciona como orientação persistente: explica como trabalhar no repositório sem substituir a spec da tarefa ativa.',
        },
        {
            question: '4. Qual é o papel de uma Agent Skill e de seu SKILL.md?',
            options: [
                'Guardar credenciais usadas pelo agente',
                'Empacotar instruções especializadas reutilizáveis, carregadas quando a capacidade é necessária',
                'Substituir todo o código da aplicação',
                'Registrar cada mensagem trocada com o agente',
            ],
            correct: 1,
            explanation: '✅ Correto! Uma Agent Skill organiza uma capacidade especializada; SKILL.md é seu ponto de entrada para instruções e recursos associados.',
        },
        {
            question: '5. O que Progressive Disclosure significa para o contexto do agente?',
            options: [
                'Carregar todo o repositório antes de entender a tarefa',
                'Ocultar permanentemente regras importantes',
                'Carregar primeiro o mínimo necessário e aprofundar somente sob demanda',
                'Dividir toda resposta em vários agentes',
            ],
            correct: 2,
            explanation: '✅ Correto! Progressive Disclosure começa com metadata e orientação curta, abrindo detalhes e recursos apenas quando forem relevantes.',
        },
        {
            question: '6. Por que a janela máxima do modelo não equivale a contexto útil?',
            options: [
                'Porque o modelo sempre ignora arquivos pequenos',
                'Porque capacidade disponível não garante relevância, atenção ou boa relação sinal-ruído',
                'Porque contexto útil é sempre exatamente metade da janela',
                'Porque cached tokens ampliam a atenção do modelo',
            ],
            correct: 1,
            explanation: '✅ Correto! Contexto útil é o subconjunto relevante para decidir e agir; preencher a janela pode aumentar custo, latência, distração e risco.',
        },
        {
            question: '7. Qual afirmação descreve melhor a Smart Zone?',
            options: [
                'É sempre uma porcentagem fixa da janela',
                'É uma heurística calibrável de contexto pequeno, relevante e com headroom',
                'Começa apenas quando a janela está quase cheia',
                'É um modo que dispensa verificação',
            ],
            correct: 1,
            explanation: '✅ Correto! Smart Zone não é um número universal; é uma faixa operacional calibrada por modelo, workload, risco e qualidade observada.',
        },
        {
            question: '8. O que torna uma tarefa uma Vertical Slice?',
            options: [
                'Implementar primeiro toda uma camada técnica',
                'Alterar o maior número possível de arquivos de uma vez',
                'Entregar um outcome pequeno end-to-end com aceitação e validação independentes',
                'Separar trabalho somente pelo número de tokens',
            ],
            correct: 2,
            explanation: '✅ Correto! Uma Vertical Slice atravessa as camadas necessárias para produzir um comportamento pequeno, demonstrável e verificável.',
        },
        {
            question: '9. O que um AI Handoff precisa preservar?',
            options: [
                'Somente o último prompt da sessão',
                'Todo o transcript, sem resumo',
                'Apenas a lista de arquivos modificados',
                'Objetivo, estado, decisões, evidências, riscos, próxima ação e terminal state',
            ],
            correct: 3,
            explanation: '✅ Correto! Um handoff compacto preserva o estado necessário para continuar com segurança, sem obrigar a próxima sessão a reconstruir toda a história.',
        },
        {
            question: '10. Qual política de model routing e custo é mais defensável?',
            options: [
                'Usar sempre o modelo mais caro',
                'Usar sempre o modelo mais barato',
                'Rotear por risco e fase, medir qualidade e considerar o custo total do outcome',
                'Remover verificadores para reduzir tokens',
            ],
            correct: 2,
            explanation: '✅ Correto! Routing responsável considera risco, fase e evidência; o custo real inclui contexto, tools, retries, infraestrutura, verificação e review.',
        },
        {
            question: '11. O que Harness Engineering adiciona ao fluxo?',
            options: [
                'Um prompt maior para substituir a spec',
                'Um catálogo fixo de modelos e preços',
                'Ambiente, tools, políticas, estado e verificadores que tornam critérios executáveis',
                'Autonomia irrestrita para publicar mudanças',
            ],
            correct: 2,
            explanation: '✅ Correto! O harness conecta intenção a execução confiável com ambiente, ferramentas, limites, estado e sensores que produzem evidência.',
        },
        {
            question: '12. O que diferencia Loop Engineering de um retry infinito?',
            options: [
                'Repetir a mesma instrução até funcionar',
                'Ter trigger, estado, verificação, budget, condição de parada, terminal states e human gates',
                'Executar sem registrar resultados intermediários',
                'Eliminar limites para maximizar autonomia',
            ],
            correct: 1,
            explanation: '✅ Correto! Um loop confiável é limitado e observável: reconcilia estado, verifica progresso e termina por sucesso, bloqueio, budget ou decisão humana.',
        },
    ],
    'en-US': [
        {
            question: '1. What is the primary artifact in Spec-Driven Development (SDD)?',
            options: [
                'The already implemented source code',
                'The structured specification and its acceptance criteria',
                'The complete prompt history',
                'The AI tool selected by the team',
            ],
            correct: 1,
            explanation: '✅ Correct! In SDD, the specification captures intent, constraints, and verifiable criteria before guiding code, tests, and documentation.',
        },
        {
            question: '2. Why does SDD work well with AI Coding Agents?',
            options: [
                'Because it removes human review and tests',
                'Because it turns intent and acceptance into verifiable context for the agent',
                'Because it requires one agent for the whole project',
                'Because it replaces technical decisions with long prompts',
            ],
            correct: 1,
            explanation: '✅ Correct! Specs reduce ambiguity and give agents a traceable contract for planning, implementation, and verification.',
        },
        {
            question: '3. What is the role of AGENTS.md in a repository?',
            options: [
                'Store the full transcript of every session',
                'Replace the feature acceptance criteria',
                'Guide agents with persistent project rules, context, and boundaries',
                'Automatically install dependencies and tools',
            ],
            correct: 2,
            explanation: '✅ Correct! AGENTS.md provides persistent repository guidance without replacing the specification for the active task.',
        },
        {
            question: '4. What is the role of an Agent Skill and its SKILL.md?',
            options: [
                'Store credentials used by the agent',
                'Package reusable specialized instructions that load when the capability is needed',
                'Replace all application source code',
                'Record every message exchanged with the agent',
            ],
            correct: 1,
            explanation: '✅ Correct! An Agent Skill packages a specialized capability, and SKILL.md is its entry point for instructions and related resources.',
        },
        {
            question: '5. What does Progressive Disclosure mean for agent context?',
            options: [
                'Load the whole repository before understanding the task',
                'Permanently hide important rules',
                'Load the minimum first and reveal deeper detail only on demand',
                'Split every response across multiple agents',
            ],
            correct: 2,
            explanation: '✅ Correct! Progressive Disclosure starts with concise guidance and opens detailed instructions and resources only when relevant.',
        },
        {
            question: '6. Why is the maximum context window not the same as useful context?',
            options: [
                'Because the model always ignores small files',
                'Because available capacity does not guarantee relevance, attention, or a good signal-to-noise ratio',
                'Because useful context is always exactly half of the window',
                'Because cached tokens expand model attention',
            ],
            correct: 1,
            explanation: '✅ Correct! Useful context is the relevant subset needed to decide and act; filling the window can add cost, latency, distraction, and risk.',
        },
        {
            question: '7. Which statement best describes the Smart Zone?',
            options: [
                'It is always a fixed percentage of the context window',
                'It is a calibratable heuristic for small, relevant context with headroom',
                'It begins only when the context window is almost full',
                'It is a mode that removes the need for verification',
            ],
            correct: 1,
            explanation: '✅ Correct! The Smart Zone is not universal; it is calibrated by model, workload, risk, and observed quality.',
        },
        {
            question: '8. What makes a task a Vertical Slice?',
            options: [
                'Implementing one entire technical layer first',
                'Changing as many files as possible at once',
                'Delivering a small end-to-end outcome with independent acceptance and validation',
                'Splitting work only by token count',
            ],
            correct: 2,
            explanation: '✅ Correct! A Vertical Slice crosses the layers needed to produce a small, demonstrable, and independently verifiable behavior.',
        },
        {
            question: '9. What must an AI Handoff preserve?',
            options: [
                'Only the final prompt from the session',
                'The entire transcript without a summary',
                'Only the list of changed files',
                'Goal, state, decisions, evidence, risks, next action, and terminal state',
            ],
            correct: 3,
            explanation: '✅ Correct! A compact handoff preserves the state required to continue safely without forcing the next session to reconstruct the full history.',
        },
        {
            question: '10. Which model-routing and cost policy is the most defensible?',
            options: [
                'Always use the most expensive model',
                'Always use the cheapest model',
                'Route by risk and phase, measure quality, and consider total outcome cost',
                'Remove verifiers to save tokens',
            ],
            correct: 2,
            explanation: '✅ Correct! Responsible routing considers risk, phase, and evidence; total cost includes context, tools, retries, infrastructure, verification, and review.',
        },
        {
            question: '11. What does Harness Engineering add to the workflow?',
            options: [
                'A larger prompt that replaces the spec',
                'A fixed catalog of models and prices',
                'Environment, tools, policies, state, and verifiers that make criteria executable',
                'Unrestricted autonomy to publish changes',
            ],
            correct: 2,
            explanation: '✅ Correct! The harness connects intent to reliable execution through environment, tools, boundaries, state, and sensors that produce evidence.',
        },
        {
            question: '12. What distinguishes Loop Engineering from infinite retries?',
            options: [
                'Repeating the same instruction until it works',
                'Having a trigger, state, verification, budget, stop condition, terminal states, and human gates',
                'Running without recording intermediate results',
                'Removing limits to maximize autonomy',
            ],
            correct: 1,
            explanation: '✅ Correct! A reliable loop is bounded and observable: it reconciles state, verifies progress, and stops on success, blockage, budget, or human decision.',
        },
    ],
    'es-ES': [
        {
            question: '1. ¿Cuál es el artefacto principal en Spec-Driven Development (SDD)?',
            options: [
                'El código fuente ya implementado',
                'La especificación estructurada y sus criterios de aceptación',
                'El historial completo de prompts',
                'La herramienta de IA elegida por el equipo',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! En SDD, la especificación captura intención, restricciones y criterios verificables antes de guiar código, pruebas y documentación.',
        },
        {
            question: '2. ¿Por qué SDD funciona bien con AI Coding Agents?',
            options: [
                'Porque elimina la revisión humana y las pruebas',
                'Porque transforma intención y aceptación en contexto verificable para el agente',
                'Porque exige un único agente para todo el proyecto',
                'Porque sustituye decisiones técnicas por prompts largos',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! Las specs reducen ambigüedad y dan a los agentes un contrato trazable para planificar, implementar y verificar.',
        },
        {
            question: '3. ¿Cuál es el papel de AGENTS.md en un repositorio?',
            options: [
                'Guardar el transcript completo de cada sesión',
                'Sustituir los criterios de aceptación de la feature',
                'Guiar agentes con reglas persistentes, contexto y límites del proyecto',
                'Instalar dependencias y herramientas automáticamente',
            ],
            correct: 2,
            explanation: '✅ ¡Correcto! AGENTS.md ofrece orientación persistente del repositorio sin sustituir la especificación de la tarea activa.',
        },
        {
            question: '4. ¿Cuál es el papel de una Agent Skill y de su SKILL.md?',
            options: [
                'Guardar credenciales utilizadas por el agente',
                'Empaquetar instrucciones especializadas reutilizables que se cargan cuando se necesita la capacidad',
                'Sustituir todo el código de la aplicación',
                'Registrar cada mensaje intercambiado con el agente',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! Una Agent Skill empaqueta una capacidad especializada y SKILL.md es su punto de entrada para instrucciones y recursos relacionados.',
        },
        {
            question: '5. ¿Qué significa Progressive Disclosure para el contexto del agente?',
            options: [
                'Cargar todo el repositorio antes de entender la tarea',
                'Ocultar permanentemente reglas importantes',
                'Cargar primero el mínimo y profundizar solo bajo demanda',
                'Dividir cada respuesta entre varios agentes',
            ],
            correct: 2,
            explanation: '✅ ¡Correcto! Progressive Disclosure comienza con orientación breve y abre instrucciones y recursos detallados solo cuando son relevantes.',
        },
        {
            question: '6. ¿Por qué la ventana máxima no equivale a contexto útil?',
            options: [
                'Porque el modelo siempre ignora archivos pequeños',
                'Porque la capacidad disponible no garantiza relevancia, atención ni buena relación señal-ruido',
                'Porque el contexto útil es siempre exactamente la mitad de la ventana',
                'Porque los cached tokens amplían la atención del modelo',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! El contexto útil es el subconjunto relevante para decidir y actuar; llenar la ventana puede añadir coste, latencia, distracción y riesgo.',
        },
        {
            question: '7. ¿Qué afirmación describe mejor la Smart Zone?',
            options: [
                'Es siempre un porcentaje fijo de la ventana',
                'Es una heurística calibrable de contexto pequeño, relevante y con margen',
                'Comienza solo cuando la ventana está casi llena',
                'Es un modo que elimina la necesidad de verificación',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! La Smart Zone no es universal; se calibra según modelo, workload, riesgo y calidad observada.',
        },
        {
            question: '8. ¿Qué convierte una tarea en una Vertical Slice?',
            options: [
                'Implementar primero una capa técnica completa',
                'Cambiar el mayor número posible de archivos a la vez',
                'Entregar un outcome pequeño end-to-end con aceptación y validación independientes',
                'Dividir el trabajo solo por cantidad de tokens',
            ],
            correct: 2,
            explanation: '✅ ¡Correcto! Una Vertical Slice atraviesa las capas necesarias para producir un comportamiento pequeño, demostrable y verificable de forma independiente.',
        },
        {
            question: '9. ¿Qué debe preservar un AI Handoff?',
            options: [
                'Solo el último prompt de la sesión',
                'Todo el transcript sin resumen',
                'Solo la lista de archivos modificados',
                'Objetivo, estado, decisiones, evidencias, riesgos, próxima acción y terminal state',
            ],
            correct: 3,
            explanation: '✅ ¡Correcto! Un handoff compacto preserva el estado necesario para continuar con seguridad sin reconstruir toda la historia.',
        },
        {
            question: '10. ¿Qué política de model routing y coste es más defendible?',
            options: [
                'Usar siempre el modelo más caro',
                'Usar siempre el modelo más barato',
                'Enrutar por riesgo y fase, medir calidad y considerar el coste total del outcome',
                'Eliminar verificadores para ahorrar tokens',
            ],
            correct: 2,
            explanation: '✅ ¡Correcto! El routing responsable considera riesgo, fase y evidencia; el coste total incluye contexto, tools, retries, infraestructura, verificación y review.',
        },
        {
            question: '11. ¿Qué añade Harness Engineering al flujo?',
            options: [
                'Un prompt mayor que sustituye la spec',
                'Un catálogo fijo de modelos y precios',
                'Entorno, tools, políticas, estado y verificadores que hacen ejecutables los criterios',
                'Autonomía sin límites para publicar cambios',
            ],
            correct: 2,
            explanation: '✅ ¡Correcto! El harness conecta intención y ejecución fiable mediante entorno, herramientas, límites, estado y sensores que producen evidencia.',
        },
        {
            question: '12. ¿Qué diferencia Loop Engineering de retries infinitos?',
            options: [
                'Repetir la misma instrucción hasta que funcione',
                'Tener trigger, estado, verificación, budget, condición de parada, terminal states y human gates',
                'Ejecutar sin registrar resultados intermedios',
                'Eliminar límites para maximizar la autonomía',
            ],
            correct: 1,
            explanation: '✅ ¡Correcto! Un loop fiable está limitado y es observable: reconcilia estado, verifica progreso y termina por éxito, bloqueo, budget o decisión humana.',
        },
    ],
};
export function getQuizData(locale) {
    return quizDataByLocale[locale];
}
//# sourceMappingURL=data.js.map