// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Router from 'preact-router';


export default class Page3 extends Component {
	//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props) {
		super(props);
		// temperature state
		this.state = {
			temp: "10",
			cond: "Cloudy",
			locate: "London",
			forecast: [
				{ temp: 'time', time: "temp" }
			],
			icon: "./assets/icons/weather/unknown.png",
			display: false,
			description: "The weather today is perfect for hiking! It is a great day to get out and explore the outdoors. Don't forget to bring plenty of water and enjoy your hike!"
		}
		//set longitude and latitude from localstorage to state
		this.setState({ lat: localStorage.getItem('lat'), lon: localStorage.getItem('lon') });

		//fetch weather data
		this.fetchWeatherData();
	}


	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=Lake District&units=metric&APPID=816ad1d938e146bfc941e4c329307fc3";
		//ajax call to the API URL with jsonp datatype
		$.ajax({
			url: url,
			dataType: "jsonp",
			//on success handle the success data with parseResponse function
			success: this.parseResponse,
			//if there is an error show it the error on the console
			error: function (req, err) { console.log('API call failed ' + err); }
		})

		//fetch wether data from different cities and the state latitude and longitude
		this.fetchWeatherData2();
		this.fetchWeatherData3();
		this.fetchWeatherData4();
	}

	fetchWeatherData2 = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=Manchester&units=metric&APPID=816ad1d938e146bfc941e4c329307fc3";
		//ajax call to the API URL with jsonp datatype
		$.ajax({
			url: url,
			dataType: "jsonp",
			//on success handle the success data with parseResponse2 function
			success: this.parseResponse2,
			//if there is an error show it the error on the console
			error: function (req, err) { console.log('API call failed ' + err); }
		})

	}

	fetchWeatherData3 = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=Yorkshire&units=metric&APPID=816ad1d938e146bfc941e4c329307fc3";
		//ajax call to the API URL with jsonp datatype
		$.ajax({
			url: url,
			dataType: "jsonp",
			//on success handle the success data with parseResponse3 function
			success: this.parseResponse3,
			//if there is an error show it the error on the console
			error: function (req, err) { console.log('API call failed ' + err); }
		})

	}

	fetchWeatherData4 = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&units=metric&APPID=816ad1d938e146bfc941e4c329307fc3";
		//ajax call to the API URL with jsonp datatype
		$.ajax({
			url: url,
			dataType: "jsonp",
			//on success handle the success data with parseResponse4 function
			success: this.parseResponse4,
			//if there is an error show it the error on the console
			error: function (req, err) { console.log('API call failed ' + err); }
		})

	}


	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		//const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div>
				<p class={style.p2title}>Top UK Hiking Locations</p>
				<div class={style.locations}>
					<div>
						<p>Yorkshire</p>
						<p>{this.state.temp_y}°C </p>
					</div>
					<div>
						<p>Manchester</p>
						<p>{this.state.temp_m}°C </p>
					</div>
					<div>
						<p>Lake District</p>
						<p>{this.state.temp_ld}°C </p>
					</div>
				</div>
				<div class={style.message}>
					<p class={style.p2title}>Weather for the day</p>
					<div class={style.messagest}>
						<p style="font-size: large; font-weight: bold;">{this.state.description}</p>
						<img class={style.messageimg} src={this.state.image}></img>
					</div>

				</div>
			</div>
		);
	}

	// parse json data 
	parseResponse = (parsed_json) => {
		//set temp_c variable
		var temp_c = parsed_json['main']['temp'];
		// set states for fields so they could be rendered later on
		this.setState({
			temp_ld: temp_c

		});
	}

	// parse json data 2
	parseResponse2 = (parsed_json) => {
		//set temp_c variable
		var temp_c = parsed_json['main']['temp'];

		// set states for fields so they could be rendered later on
		this.setState({
			temp_m: temp_c

		});
	}

	// parse json data 3
	parseResponse3 = (parsed_json) => {
		//set temp_c variable
		var temp_c = parsed_json['main']['temp'];

		// set states for fields so they could be rendered later on
		this.setState({
			temp_y: temp_c,

		});
	}

	// parse json data 4
	parseResponse4 = (parsed_json) => {
		//set variables
		var name = parsed_json['name'];
		var main = parsed_json['weather'][0]['main'];
		var message = '';
		var image = '';


		//delends on the weather type (main varianle) set the message and image to show to user
		if (main == 'Drizzle') {
			message = "Don't forget your umbrella today. Its raining. Its a good day to stay inside and curl up with a book unless you enjoy getting wet.";
			image = "../../assets/message/rain.jpg";
		} else if (main == 'Rain') {
			message = "Don't forget your umbrella today. Its raining. Its a good day to stay inside and curl up with a book unless you enjoy getting wet.";
			image = "../../assets/message/rain.jpg";
		} else if (main == 'Snow') {
			message = "The snow is falling fast and thick, so give yourself extra time to get where you are going. Don't forget your mitten and scarf.";
			image = "../../assets/message/snow.jpg";
		} else if (main == 'Clouds') {
			message = "The clouds are rolling in, but there is no need to cancel your plans. The weather is still mild.";
			image = "../../assets/message/new-clouds.png";
		} else if (main == 'Clear') {
			message = "Enjoy the sunshine today! Perfect for a picnic or a walk in the park. Don't forget to wear sunscreen and stay hydrated.";
			image = "../../assets/message/sun.jpeg";
		} else if (main == 'Thunderstorm') {
			message = "A storm is brewing, so be sure to stay indoors and avoid any unneccesary travel. Seek Shelter and keep an eye on the weather updates.";
			image = "../../assets/message/thunder.jpg";
		} else {
			message = "The weather today is perfect for hiking! It is a great day to get out and explore the outdoors. Don't forget to bring plenty of water and enjoy your hike!";
			image = "../../assets/message/nice.jpg";
		}

		//set the message and image to render
		this.setState({
			description: message,
			image: image,
		});
	}
}