import React, { Component } from 'react';
import { CityList } from './city-list';
import { Weather } from './weather';
import '../styles/app.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weather: {},
		};
		this.myRef = React.createRef();
	}

	setWeather(weather) {
		this.setState({ weather });
	}

	render() {
		return (
			<>
				<h1>Погода</h1>
				<div className="flex-row">
					<CityList onSetWeather={(e) => this.setWeather(e)} />
					<Weather key={this.state.weather.main ? this.state.weather.main.temp : ""} weather={this.state.weather} ref={this.myRef}/>
				</div>
			</>
		);
	}
}

export default App;
