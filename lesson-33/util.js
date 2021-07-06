function hexToRGB(h) {
	let r, g, b;

	if (h.length == 4) {
		r = '0x' + h[1] + h[1];
		g = '0x' + h[2] + h[2];
		b = '0x' + h[3] + h[3];
	} else if (h.length == 7) {
		r = '0x' + h[1] + h[2];
		g = '0x' + h[3] + h[4];
		b = '0x' + h[5] + h[6];
	}

	return [+r, +g, +b];
	// return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
}

function RGBToHSL(r, g, b) {
	// Make r, g, and b fractions of 1
	r /= 255;
	g /= 255;
	b /= 255;

	// Find greatest and smallest channel values
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	// Calculate hue
	// No difference
	if (delta == 0) h = 0;
	// Red is max
	else if (cmax == r) h = ((g - b) / delta) % 6;
	// Green is max
	else if (cmax == g) h = (b - r) / delta + 2;
	// Blue is max
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	// Make negative hues positive behind 360°
	if (h < 0) h += 360;

	// Calculate lightness
	l = (cmax + cmin) / 2;

	// Calculate saturation
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	// Multiply l and s by 100
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

const lstLight = [
'#bcc6c8',
'#a28e9d',
'#7c6076',
'#603e58',
'#441c3b',
'#3e1935',
'#35142d',
'#2d1126',
'#1f0919',
'#ff5ec9',
'#ff2bb8',
'#f700a5',
'#de0094',
'#3c3c3c',
'#2c2c2c',
'#1c1c1c',
'#bebebe',
'#c1c1c1',
'#dedede',
'#dedede',
'#dedede',
'#eeeeee',
'#fefefe',
'#3c3c3c',
'#dedede',
'#dedede',
'#dedede',
];

lstLight.map((c) => {
	const rgb = hexToRGB(c);
	return RGBToHSL(rgb[0], rgb[1], rgb[2]);
}).forEach(c => console.log(c));
