export interface RuntimeOptions {
  liteMode: boolean;
  validationMode: boolean;
}

function isTruthyFlag(value: string | null): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

export function resolveRuntimeOptions(search: string = window.location.search): RuntimeOptions {
  const params = new URLSearchParams(search);
  return {
    liteMode: isTruthyFlag(params.get('lite')),
    validationMode: isTruthyFlag(params.get('validate')),
  };
}
