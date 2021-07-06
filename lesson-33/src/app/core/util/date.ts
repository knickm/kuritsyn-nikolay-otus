const _today: Date = new Date(Date.now());

export const today = (): Date => new Date(_today.getFullYear(), _today.getMonth(), _today.getDate());

