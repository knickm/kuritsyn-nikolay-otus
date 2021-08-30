/**
 * Генерирует массив целых чисел заполненый значениями с N по M с шагом S
 * @param N - начальное значение
 * @param M - конечное значение
 * @param S - шаг (если не указано, то 1)
 */
export const range = (N: number, M: number, S = 1) => Array.from({ length: (M - N) / S + 1 }, (v, k) => N + k*S);
