// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
export default class Page2 extends Component {

	constructor(props) {
		super(props);

		//weather state
		this.state = {
			wind_speed: '',
			wind_direction: '',
			pressure: '',
			humidity: '',
			visibility: '',
			locate: "London",
			icon: "../../assets/icons/weather/unknown.png",
			display: false
		}

		//set longitude and latitude from localstorage to state
		this.setState({ lat: localStorage.getItem('lat'), lon: localStorage.getItem('lon') });

		//fetch weather data
		this.fetchWeatherData();
	}

	//fetch weather data
	fetchWeatherData = () => {
		//API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&units=metric&APPID=816ad1d938e146bfc941e4c329307fc3";

		//ajax call to the API URL with jsonp datatype
		$.ajax({
			url: url,
			dataType: "jsonp",
			//on success handle the success data with parseResponse function
			success: this.parseResponse,
			//if there is an error show it the error on the console
			error: function (req, err) { console.log('API call failed ' + err); }
		})
	}

	//parse reponse data with given json parameter
	parseResponse = (parsed_json) => {
		//set variables from the json parameter
		var wind_speed = parsed_json['wind']['speed'];
		var wind_direction = parsed_json['wind']['deg'];
		var pressure = parsed_json['main']['pressure'];
		var humidity = parsed_json['main']['humidity'];
		var visibility = parsed_json['visibility'];

		//set state with wariables
		this.setState({
			wind_speed: wind_speed,
			wind_direction: wind_direction,
			pressure: pressure,
			humidity: humidity,
			visibility: visibility
		});
	}

	render() {
		return (
			<div>
				<div class={style.extrainfo}>
					<img src='./assets/icons/humidity.png' class={style.infoicons}></img>
					<h2>Humidity</h2>
					{this.state.humidity}%
				</div>
				<div class={style.extrainfo}>
					<img src='./assets/icons/barometer-.png' class={style.infoicons}></img>
					<h2>Pressure</h2>
					{this.state.pressure}hPa
				</div>
				<div class={style.extrainfo}>
					<img src='./assets/icons/eye-solid.svg' class={style.infoicons}></img>
					<h2>Visibility</h2>
					<p>{this.state.visibility}km</p>
				</div>
				<div class={style.extrainfo}>
					<img src='./assets/icons/wind-solid.svg' class={style.infoicons}></img>
					<h2>Wind Speed</h2>
					{this.state.wind_speed}mph
				</div>
			</div>
		)
	}


}
