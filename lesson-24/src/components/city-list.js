import React, { Component } from 'react';

import '../styles/app.css';
const API_key = '3f6a6ba8da7150b7e7e2c1157b8dcfe5';

export class CityList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			selected: { name: '' },
		};
	}

	Load() {
		if (this.state.selected.name) {
			console.log(`api.openweathermap.org/data/2.5/weather?q=${this.state.selected.name}&appid=${API_key}`);
			fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.selected.name}&appid=${API_key}`)
			.then(response => response.json())
			.then((d) => {
				this.state.selected.weather = d
				const list = this.state.list.filter(n => n.name !== this.state.selected.name)
				list.push(this.state.selected)
				this.setState({
					list
				})
				this.props.onSetWeather(d);
			});
		}
	}

	ShowWeather(w) {
		const res = this.state.list.find((e) => e.name === w.name);
		if (res) {
			this.setState({selected: res})
			this.props.onSetWeather(res.weather);
		}
	}

	setCity(evt) {
		this.setState({
			selected: { name: evt.target.value },
		});
	}

	render() {
		return (
			<div className="flexColumn">
				<input type="text" name="city" placeholder="Введите город" value={this.state.selected.name} onChange={(e) => this.setCity(e)} />
				<button className="square" onClick={() => this.Load()}>
					Показать
				</button>
				<div className="flex-column">
					{this.state.list.map((w,i) => (
						<a href="#" onClick={() => this.ShowWeather(w)} key={i}>
							{w ? w.name : ''}
						</a>
					))}
				</div>
			</div>
		);
	}
}
