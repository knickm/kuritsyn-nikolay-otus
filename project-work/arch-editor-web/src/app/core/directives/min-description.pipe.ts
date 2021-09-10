import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | MinDescriptionPipe:length
 * Example:
 *   {{ desc | MinDescription:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'MinDescription' })
export class MinDescriptionPipe implements PipeTransform {
	transform(value: string, length?: number): string {
		let len = 70;
		if (length) {
			len = length;
		}

		let str: string = value;
		if (value && value.length > (len + 3)) {
			str = value.slice(0, len);
			const pos = str.lastIndexOf(' ');
			str = str.slice(0, pos === -1 ? len : pos) + '...';
		}
		return str;
	}
}
