import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { CCity } from './city';

import '../styles/app.css';

import config from './config.json';
const { API_URL, API_KEY } = config;

export class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: CCity.find(props.match.params.name),
			current: null,
			list: [],
		};
		// console.log(this.state.city);
	}

	componentDidMount() {
		this.Load();
	}

	Load() {
		if (this.state.city) {
			const { lon, lat } = this.state.city.weather.coord;
			fetch(`${API_URL}/onecall?lon=${lon}&lat=${lat}&exclude=minutely,hourly,alert&appid=${API_KEY}`)
				.then((response) => response.json())
				.then((d) => {
					const current = { ...d.current };
					const list = [...d.daily];
					// console.log('RESULT:::', current, list);
					this.setState({
						current,
						list,
					});
				});
		}
	}

	render() {
		return (
			<div className="flex-column">
				<h2>
					<Link to="/">На главную</Link>
				</h2>
				<h2>{this.state.city.name}</h2>
				<div className="flex-row">
					<div className="title">
						Температура(F<sup>o</sup>):
					</div>
					<div className="flex-column align-items-center mr-1">
						<div>Now</div>
						<div className="temp">{this.state.current ? this.state.current.temp : ''}</div>
					</div>
					{this.state.list.map((w, i) => (
						<div key={'w_' + i} className="flex-column align-items-center mr-1">
							<div>{(new Date(w.dt * 1000)).toISOString().slice(0,10)}</div>
							<div className="temp">{w.temp.day}</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}
