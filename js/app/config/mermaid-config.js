export function initMermaid() {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        fontFamily: 'DM Sans, sans-serif',
        themeVariables: {
            background: '#04091b',
            mainBkg: '#09102a',
            primaryColor: '#09102a',
            primaryTextColor: '#edf2ff',
            primaryBorderColor: '#00ddb3',
            lineColor: '#38c8fa',
            secondaryColor: '#0f1c3e',
            tertiaryColor: '#04091b',
            nodeBorder: '#00ddb3',
            clusterBkg: '#0f1c3e',
            titleColor: '#edf2ff',
            edgeLabelBackground: '#09102a',
            fontSize: '14px',
            nodeTextColor: '#edf2ff',
        },
        flowchart: {
            useMaxWidth: true,
            curve: 'basis',
            nodeSpacing: 45,
            rankSpacing: 55,
            htmlLabels: true,
        },
    });
}
//# sourceMappingURL=mermaid-config.js.map