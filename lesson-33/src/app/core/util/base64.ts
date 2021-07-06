export const b64EncodeUnicode = (str: string) => {
	// first we use encodeURIComponent to get percent-encoded UTF-8,
	// then we convert the percent encodings into raw bytes which
	// can be fed into btoa.
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
		(_, p1: string) => String.fromCharCode(Number('0x' + p1))));
}