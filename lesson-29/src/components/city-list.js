import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import { CCity } from './city';
import config from './config.json';

import '../styles/app.css';
const { API_URL, API_KEY } = config;

export class CityList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: CCity.load(),
			filter: '',
			selected: null,
		};
	}

	Load() {
		if (this.state.selected) {
			fetch(`${API_URL}/weather?q=${this.state.selected.name}&appid=${API_KEY}`)
				.then((response) => response.json())
				.then((d) => {
					const selected = { ...this.state.selected };
					selected.weather = d;
					const list = this.state.list.filter((n) => n.name !== selected.name);
					list.push(selected);
					this.setState({
						list,
						selected,
					});
					CCity.store(list);
					// this.props.onSetWeather(d);
				});
		}
	}

	setCity(evt) {
		let selected = this.state.list.find((c) => c.name.toUpperCase() === evt.target.value.toUpperCase());
		if (!selected) {
			selected = new CCity(evt.target.value);
		}
		this.setState({ selected });
	}

	findCity(evt) {
		this.setState({
			filter: evt.target.value,
		});
	}

	render() {
		return (
			<div className="flexColumn">
				<h2>Добавить город</h2>
				<input type="text" name="city" placeholder="Введите город" value={this.state.selected?.name} onChange={(e) => this.setCity(e)} />
				<button className="square" onClick={() => this.Load()}>
					Показать
				</button>

				<div className="flex-column">
					<h2>Найти город</h2>
					<input type="text" name="filter" placeholder="Введите город" value={this.state.filter} onChange={(e) => this.findCity(e)} />
					<Router>
						<ul>
							{this.state.list
								.filter((c) => c.name.indexOf(this.state.filter) === 0)
								.map((c, i) => (
									<li key={'f_' + i}>
										<Link to={`/weather/${c.name}`}>
											{c.name} [{c.weather.main.temp} F<sup>o</sup>]
										</Link>
									</li>
								))}
						</ul>
					</Router>
				</div>
			</div>
		);
	}
}
