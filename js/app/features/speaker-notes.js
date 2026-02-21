const CURATED_TALK_TRACK = {
    'en-US': [
        ['Welcome everyone: today is a mindset shift from loose prompting to specification-driven engineering; structured context drives predictable outcomes.', 'Practical goal: less rework, more traceability, and speed with quality.'],
        ['This is the talk map: SDD foundations, spec-kit operationalization, Copilot, context architecture, demo, and adoption checklist.', 'If time is short, prioritize the most relevant blocks without breaking the narrative.'],
        ['Transition to fundamentals: what SDD is, why it matters with agents, and where it fits in engineering flow.'],
        ['SDD means treating specification as an executable engineering artifact, not decorative documentation.', 'Blueprint analogy: human defines intent and acceptance criteria, agent executes within contract; SDD complements tests and review.'],
        ['Read this comparison line by line: without SDD each iteration renegotiates the problem; with SDD, PRD and AGENTS become persistent memory.', 'Percentages are field references and should be validated with your own team metrics.'],
        ['Daily benefits: fewer late correction loops, less context loss, better alignment across dev, product, and architecture.', 'Speed comes from less rework, not from skipping steps.'],
        ['Grounding point: SDD does not replace engineering discipline.', 'Automated tests, code review, security, and evals remain mandatory.'],
        ['Current reality: agents are more capable but still highly sensitive to weak context.', 'Without product constraints and objective criteria, output drifts and review cost rises.'],
        ['Section close: spec-first, human-in-the-loop, architecture-first, and traceability.', 'These pillars also improve compliance and auditability through explicit decision origin.'],
        ['Now we move from concept to operation: how to turn SDD into a real team routine.'],
        ['spec-kit operationalizes SDD by replacing improvisation with a reproducible flow.', 'Open source, community traction, GitHub maintenance, Specify CLI, and slash commands reinforce trust and execution speed.'],
        ['Present this as recipe: prerequisites, installation, and initialization with clear team standard.', 'Permanent install for daily use; uvx for low-coupling trials.'],
        ['Full cycle: specify, plan, tasks, implement; each stage leaves evidence and reduces improvisation.', 'If slash commands are unavailable, CLI remains the official path.'],
        ['Risk control: the human gate exists to stop weak plans from becoming production code.', 'If not approved, go back to planning.'],
        ['PRD is a product contract for humans and agents.', 'Clear FRs and acceptance criteria reduce ambiguity and improve traceability over time.'],
        ['This is the ready-to-execute checklist.', 'A few minutes of review now can save hours of correction later.'],
        ['Portability close: SDD is a method, not dependence on one tool.', 'Artifacts and process keep value even if the agent changes.'],
        ['Now connect SDD to a tool many teams already use daily: GitHub Copilot.'],
        ['Copilot Chat is technical collaboration, not only autocomplete.', 'Think in levels: ask to understand, inline iterate, and agent mode for complex execution.'],
        ['Timeline point: maturity moved from suggestions to autonomous multi-step execution.', 'As autonomy increases, governance and specification quality become more critical.'],
        ['Recommended flow: understand first, then plan, then execute.', 'Explore and Ask reduce assumptions; Plan lowers risk before edits; Agent accelerates when path is clear.'],
        ['This slide is a time snapshot: models, costs, and multipliers change often.', 'Start with Auto, switch models based on depth or speed needs.'],
        ['Group by category for memorization: participants, commands, variables, and integrations.', 'Response quality follows context quality.'],
        ['Copilot CLI extends IDE flow into shell and local automation.', 'Goal is less context switching with traceability preserved across environments.'],
        ['Operational governance: autonomy with responsibility.', 'Review commands, run in trusted environment, inspect diff before commit.'],
        ['Agent Skills are modular knowledge loading.', 'SKILL.md enables on-demand depth with less context noise.'],
        ['Close this section with artifact-oriented prompting.', 'With PRD and AGENTS in context, output becomes verifiable delivery instead of arbitrary code.'],
        ['Now we enter the structural core: context architecture as the foundation of reliable AI collaboration.'],
        ['Read this as engineering pipeline: strong inputs produce consistent outputs.', 'Great models still fail with weak context.'],
        ['AGENTS.md is the operational manual for AI in the repository.', 'Keep it at root with objective language, actionable rules, and clear limits.'],
        ['Simple distinction: Rules are global policy, AGENTS is local project contract.', 'Alignment gives consistency without losing local adaptation.'],
        ['Skills provide modular specialization.', 'Load depth only when needed to improve focus, cost, and quality.'],
        ['Recap the four governance pillars: PRD, AGENTS, Rules, Skills.', 'More agent autonomy requires stronger context architecture.'],
        ['Transition to scaling principle: progressive disclosure.'],
        ['Progressive disclosure means loading only context needed for current task.', 'Use minimal global base plus on-demand specialization to reduce noise and improve precision.'],
        ['Layered structure is replicable: lean AGENTS at root, domain docs, and separate global rules.', 'Avoid monolithic files for long-term maintainability.'],
        ['These six principles are context hygiene.', 'Structural clarity lowers cost and increases reliability.'],
        ['In the demo, the goal is not speed theater; it is controlled predictability.', 'Follow a short script: input context, command, result, validation.'],
        ['Reference curation: start with official sources, then deepen with community content.', 'Separate product norms from market interpretation.'],
        ['Practical close: start small but disciplined with PRD and AGENTS.', 'Then evolve to full flow with planning and human approval gates.'],
        ['Quiz objective: reinforce key concepts and open room for real operational questions.', 'Explain rationale and map each answer to the corresponding slide.'],
        ['Personal intro should stay objective: technical track, practical experience, and applied projects.', 'Invite the audience to continue the conversation with real cases.'],
        ['Final message: AI performs better with structured context and clear criteria.', 'This is how you gain speed without sacrificing quality and technical responsibility.'],
    ],
    'es-ES': [
        ['Bienvenidos: hoy el cambio es pasar de prompt suelto a ingenieria guiada por especificacion; contexto estructurado produce resultados predecibles.', 'Objetivo practico: menos retrabajo, mas trazabilidad y velocidad con calidad.'],
        ['Este es el mapa de la charla: fundamentos de SDD, operacionalizacion con spec-kit, Copilot, arquitectura de contexto, demo y checklist de adopcion.', 'Si falta tiempo, priorizamos bloques clave sin perder el hilo narrativo.'],
        ['Transicion a fundamentos: que es SDD, por que importa con agentes y donde encaja en el flujo de ingenieria.'],
        ['SDD es tratar la especificacion como artefacto ejecutable de ingenieria, no como documentacion decorativa.', 'Analogia del plano: humano define intencion y criterios, agente ejecuta dentro del contrato; SDD complementa pruebas y revision.'],
        ['Lee la comparacion linea a linea: sin SDD cada iteracion renegocia el problema; con SDD, PRD y AGENTS son memoria persistente.', 'Los porcentajes son referencia de campo y deben validarse con metricas del equipo.'],
        ['Beneficios diarios: menos correccion tardia, menos perdida de contexto y mejor alineacion entre dev, producto y arquitectura.', 'La velocidad viene de menos retrabajo, no de saltar etapas.'],
        ['Punto de realidad: SDD no sustituye disciplina de ingenieria.', 'Pruebas automatizadas, code review, seguridad y evals siguen siendo obligatorios.'],
        ['Contexto actual: los agentes son mas capaces pero siguen sensibles a contexto debil.', 'Sin restricciones de producto y criterios objetivos, el resultado se desvía y sube el costo de revision.'],
        ['Cierre de seccion: spec-first, human-in-the-loop, architecture-first y trazabilidad.', 'Estos pilares tambien fortalecen compliance y auditoria por origen explicito de decisiones.'],
        ['Ahora vamos de concepto a operacion: como convertir SDD en rutina real de equipo.'],
        ['spec-kit operacionaliza SDD al cambiar improvisacion por flujo reproducible.', 'Open source, traccion de comunidad, mantenimiento de GitHub, Specify CLI y slash commands refuerzan confianza y velocidad.'],
        ['Presenta esto como receta: prerequisitos, instalacion e inicializacion con estandar claro para el equipo.', 'Instalacion permanente para uso diario; uvx para pruebas sin acoplamiento.'],
        ['Ciclo completo: specify, plan, tasks, implement; cada etapa deja evidencia y reduce improvisacion.', 'Si no hay slash command, el CLI sigue siendo camino oficial.'],
        ['Control de riesgo: el gate humano evita que un mal plan llegue a produccion.', 'Si no se aprueba, se vuelve a plan.'],
        ['PRD es contrato de producto para humanos y agentes.', 'RF y criterios de aceptacion claros reducen ambiguedad y mejoran trazabilidad.'],
        ['Este es el checklist de listo para ejecutar.', 'Pocos minutos de revision ahora ahorran horas de correccion despues.'],
        ['Cierre de portabilidad: SDD es metodo, no dependencia de una herramienta.', 'Artefactos y proceso mantienen valor aunque cambie el agente.'],
        ['Ahora conecta SDD con una herramienta de uso diario en muchos equipos: GitHub Copilot.'],
        ['Copilot Chat es colaboracion tecnica, no solo autocomplete.', 'Piensa en niveles: preguntar para entender, iterar inline y agent mode para ejecucion compleja.'],
        ['Timeline: la madurez paso de sugerencias a ejecucion autonoma multi-etapa.', 'Cuanta mas autonomia, mas critica es la gobernanza y la calidad de especificacion.'],
        ['Flujo recomendado: primero entender, despues planear, despues ejecutar.', 'Explore y Ask reducen supuestos; Plan baja riesgo antes de editar; Agent acelera con camino claro.'],
        ['Esta diapositiva es foto temporal: modelos, costos y multiplicadores cambian seguido.', 'Empieza en Auto y cambia de modelo segun profundidad o velocidad necesaria.'],
        ['Agrupa por categoria para memorizar: participantes, comandos, variables e integraciones.', 'La calidad de respuesta depende de la calidad del contexto.'],
        ['Copilot CLI extiende el flujo del IDE hacia shell y automatizacion local.', 'Objetivo: menos cambio de contexto con trazabilidad entre entornos.'],
        ['Gobernanza operacional: autonomia con responsabilidad.', 'Revisar comandos, ejecutar en entorno confiable e inspeccionar diff antes de commit.'],
        ['Agent Skills es carga modular de conocimiento.', 'SKILL.md permite profundidad bajo demanda con menos ruido de contexto.'],
        ['Cierra esta seccion con prompting orientado a artefacto.', 'Con PRD y AGENTS en contexto, la salida pasa a ser entrega verificable y no codigo arbitrario.'],
        ['Ahora entramos en el nucleo estructural: arquitectura de contexto como base de colaboracion confiable con IA.'],
        ['Lee esto como pipeline de ingenieria: entradas fuertes producen salidas consistentes.', 'Ni el mejor modelo compensa contexto debil.'],
        ['AGENTS.md es el manual operacional de IA en el repositorio.', 'Mantenlo en la raiz con lenguaje objetivo, reglas accionables y limites claros.'],
        ['Distincion simple: Rules es politica global, AGENTS es contrato local del proyecto.', 'La alineacion trae consistencia sin perder adaptacion local.'],
        ['Skills aporta especializacion modular.', 'Carga profundidad solo cuando la tarea lo requiere para mejorar foco, costo y calidad.'],
        ['Recap de cuatro pilares: PRD, AGENTS, Rules y Skills.', 'A mayor autonomia del agente, mayor necesidad de arquitectura de contexto.'],
        ['Transicion al principio de escalabilidad: progressive disclosure.'],
        ['Progressive disclosure es cargar solo el contexto necesario para la tarea actual.', 'Base global minima mas especializacion bajo demanda reduce ruido y mejora precision.'],
        ['La estructura por capas se replica facil: AGENTS ligero en raiz, documentos por dominio y rules globales separadas.', 'Evita archivos monoliticos y mejora mantenimiento a largo plazo.'],
        ['Estos seis principios son higiene de contexto.', 'Claridad estructural reduce costo y aumenta confiabilidad.'],
        ['En la demo, el objetivo no es mostrar velocidad por si sola; es previsibilidad con control.', 'Guion corto: contexto de entrada, comando, resultado y validacion.'],
        ['Curaduria de referencias: empieza por fuentes oficiales y luego profundiza con comunidad.', 'Separa norma de producto de interpretacion de mercado.'],
        ['Cierre practico: empieza pequeno pero con disciplina usando PRD y AGENTS.', 'Luego evoluciona al flujo completo con plan y gates de aprobacion humana.'],
        ['Objetivo del quiz: consolidar conceptos clave y abrir espacio para dudas reales del dia a dia.', 'Explica el racional y conecta cada respuesta con la diapositiva correspondiente.'],
        ['Presentacion personal objetiva: trayectoria tecnica, experiencia practica y proyectos aplicados.', 'Invita a la audiencia a continuar la conversacion con casos reales.'],
        ['Mensaje final: la IA entrega mejor con contexto estructurado y criterio claro.', 'Asi se gana velocidad sin perder calidad ni responsabilidad tecnica.'],
    ],
};
const FALLBACK_BY_LOCALE = {
    'en-US': {
        lead: 'Presenter note: explain the core message of this slide.',
        close: 'Close with one practical takeaway before advancing.',
        focusLabel: 'Slide focus',
        keyPointsLabel: 'Key points',
        transitionLabel: 'Transition',
    },
    'es-ES': {
        lead: 'Nota para presentar: explica el mensaje central de esta diapositiva.',
        close: 'Cierra con una conclusion practica antes de avanzar.',
        focusLabel: 'Enfoque',
        keyPointsLabel: 'Puntos clave',
        transitionLabel: 'Transicion',
    },
};
function isLeafSection(section) {
    return !Array.from(section.children).some((child) => child.tagName === 'SECTION');
}
function getSlideTitle(section) {
    const titleEl = section.querySelector('h2, h1, .section-label');
    return titleEl?.textContent?.trim() ?? '';
}
function normalizeText(input) {
    return input.replace(/\s+/g, ' ').trim();
}
function collectKeyPoints(section) {
    const selectors = 'h3, .card h3, li, .highlight-box p, .card p, p';
    const candidates = Array.from(section.querySelectorAll(selectors))
        .map((el) => normalizeText(el.textContent ?? ''))
        .filter((text) => text.length >= 24 && text.length <= 120);
    const unique = [];
    candidates.forEach((point) => {
        if (!unique.includes(point))
            unique.push(point);
    });
    return unique.slice(0, 2);
}
function appendParagraph(note, text) {
    const p = document.createElement('p');
    p.textContent = text;
    note.appendChild(p);
}
function appendFallback(note, copy, slide, slides, index) {
    const title = getSlideTitle(slide);
    const nextTitle = index < slides.length - 1 ? getSlideTitle(slides[index + 1]) : '';
    appendParagraph(note, copy.lead);
    if (title)
        appendParagraph(note, `${copy.focusLabel}: ${title}.`);
    const points = collectKeyPoints(slide);
    if (points.length)
        appendParagraph(note, `${copy.keyPointsLabel}: ${points.join(' | ')}`);
    if (nextTitle)
        appendParagraph(note, `${copy.transitionLabel}: ${nextTitle}.`);
    appendParagraph(note, copy.close);
}
export function ensureSpeakerNotesParity(locale) {
    if (locale === 'pt-BR')
        return;
    const curated = CURATED_TALK_TRACK[locale];
    const fallback = FALLBACK_BY_LOCALE[locale];
    if (!curated || !fallback)
        return;
    const slides = Array.from(document.querySelectorAll('.reveal .slides section')).filter(isLeafSection);
    let trackIndex = 0;
    slides.forEach((slide, index) => {
        const hasNotes = Boolean(slide.querySelector(':scope > aside.notes'));
        if (hasNotes)
            return;
        const note = document.createElement('aside');
        note.className = 'notes';
        const block = curated[trackIndex];
        trackIndex += 1;
        if (block?.length) {
            block.forEach((line) => appendParagraph(note, line));
        }
        else {
            appendFallback(note, fallback, slide, slides, index);
        }
        slide.appendChild(note);
    });
}
//# sourceMappingURL=speaker-notes.js.map