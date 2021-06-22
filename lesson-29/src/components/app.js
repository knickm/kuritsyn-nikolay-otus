import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { CityList } from './city-list';
import { Weather } from './weather';
import '../styles/app.css';

class NotFound extends React.Component {
	render() {
		return (
			<div className="flex-column">
				<h2><Link to="/">На главную</Link></h2>
				<h2 style={{ color: 'red' }}>Ресурс не найден</h2>
			</div>
		);
	}
}

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
					<Router>
						<Switch>
							<Route exact path="/" component={CityList} />
							<Route path="/weather/:name" component={Weather} />
							<Route component={NotFound} />
						</Switch>
					</Router>
					{/* <CityList onSetWeather={(e) => this.setWeather(e)} />
					<Weather key={this.state.weather.main ? this.state.weather.main.temp : ""} weather={this.state.weather} ref={this.myRef}/> */}
				</div>
			</>
		);
	}
}

export default App;
