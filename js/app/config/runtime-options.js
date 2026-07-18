function isTruthyFlag(value) {
    if (!value)
        return false;
    const normalized = value.trim().toLowerCase();
    return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}
export function resolveRuntimeOptions(search = window.location.search) {
    const params = new URLSearchParams(search);
    return {
        liteMode: isTruthyFlag(params.get('lite')),
        validationMode: isTruthyFlag(params.get('validate')),
    };
}
//# sourceMappingURL=runtime-options.js.map