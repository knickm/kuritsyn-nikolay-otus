import React, { Component } from 'react';

import '../styles/app.css';

export class Weather extends Component {
	constructor(props) {
		super(props);
		console.log('PROPS: ', props);
		this.state = {
			weather: props.weather
		};
	}

	render() {
		return (
			<div className="flex-column">
				<div className="flex-row">
					<div className="title">Температура(F):</div>
					<div className="temp">{this.state.weather && this.state.weather.main ? this.state.weather.main.temp : ""}</div>
				</div>
			</div>
		);
	}
}

