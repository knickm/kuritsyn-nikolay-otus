export const shuffle = <T>(a: Array<T>) => {
	const m = Math.floor(a.length / 2);
	for (let i = 0; i < m; ++i) {
		const j = Math.floor(Math.random() * a.length);
		const x = a[j];
		a[j] = a[i];
		a[i] = x;
	}
}
