const KEY_CITY = 'key_city';
export class CCity {
	constructor(name, weather) {
		this.name = name;
		this.weather = weather || {};
	}

	static store(list) {
		// console.log('store:::', list);
		localStorage.setItem(KEY_CITY, JSON.stringify(list.map((c) => ({ name: c.name, weather: c.weather }))));
	}

	static load() {
		const str = localStorage.getItem(KEY_CITY);
		// console.log('load:::', str);
		if (str) {
			return JSON.parse(str).map((c) => new CCity(c.name, c.weather));
		}
		return [];
	}

	static find(name) {
		return CCity.load().find((c) => c.name === name);
	}
}
