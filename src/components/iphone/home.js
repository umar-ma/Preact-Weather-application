// import preact
import { h, render, Component, useState } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';




export default class Iphone extends Component {
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
			lat: 51.5085,
			lon: -0.1257,
		}
		//if there is no latitude or longitude set them depends on what the state has
		if (localStorage.getItem("lat") === null | localStorage.getItem("lon") === null) {
			this.fetchme();
		}
		//get latitude and longitude from the localstorage and set them on state
		this.setState({ lat: localStorage.getItem('lat'), lon: localStorage.getItem('lon') });

		//fetch werther data
		this.fetchWeatherData();

	}


	//function to set latitude and longitude from state to localstorage
	fetchme = () => {
		localStorage.setItem('lat', this.state.lat);
		localStorage.setItem('lon', this.state.lon);
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {

		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&units=metric&APPID=816ad1d938e146bfc941e4c329307fc3";
		//ajax call with jsonp datatype to fetch weather 
		$.ajax({
			url: url,
			dataType: "jsonp",
			//on success handle the success data with parseResponse function
			success: this.parseResponse,
			//if there is an error show it the error on the console
			error: function (req, err) { console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
		this.fetchHourlyData();
	}

	//fetch forecast or hourly weather data
	fetchHourlyData = () => {
		//set the API call with the api.open-meteo.com API v1
		var url = "https://api.open-meteo.com/v1/forecast?latitude=" + this.state.lat + "&longitude=" + this.state.lon + "&hourly=temperature_2m,precipitation_probability&daily=precipitation_probability_max&timezone=GMT";

		//ajax call with json datatype to fetch weather 
		$.ajax({
			url: url,
			dataType: "json",
			//on success handle the success data with parseResponse function
			success: this.parseHourly,
			//if there is an error show it the error on the console
			error: function (req, err) { console.log('API call failed ' + err + url); }
		})

	}

	//handle the input cha ge and show weather depends on the search query
	change = () => {
		//get search value by id
		var val = document.getElementById('search').value;

		//set the api url with the search value
		var url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=' + val;

		//fetch function options
		const options = {
			method: 'GET',
			headers: {
				//rapidAPI keys from rapidAPI
				'X-RapidAPI-Key': '7b0f75eedemsh16104bf387f7b57p15845fjsnec609cf4beed',
				'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
			}
		};

		//javascript fetch builtin function
		fetch(url, options)
			//parse the response to json
			.then(response => response.json())
			.then(response => {
				//now response is json so we will handle it

				// get the dropopdown element by id
				const drop = document.getElementById('searchdropdown')

				//if the dropdown contains any child remove it
				while (drop.firstChild) {
					drop.removeChild(drop.firstChild);
				}

				//loop over the reponse json data
				response.data.map((city) => {

					//create button element (good way to prevent XSS attacks)
					const button = document.createElement("button");

					//set some variables
					const name = city.name;
					const lat = city.latitude;
					const lon = city.longitude;

					//set button text
					button.innerText = city.name;

					//add event listener click to the button so when we click it it runs the given functiom
					button.addEventListener('click', () => {
						// When there is a "click"
						// it shows an alert in the browser

						//if the dropdown conatisn any childs remove them
						while (drop.firstChild) {
							drop.removeChild(drop.firstChild);
						}
						//set the state with the new data
						{ this.setState({ 'locate': name, 'lat': lat, 'lon': lon }) }

						//fetch weather data
						this.fetchWeatherData();

						//set localstorage latitude and longitude
						this.fetchme();

					})

					//finally append the button to the dropdown
					drop.appendChild(button);
				})

				//when all data is lopped on make the search value equals ''
				document.getElementById('search').value = '';

			})
			//catch any error and show it in the console
			.catch(err => console.error(err));

	}


	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		//const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div>
				<div class={style.topthird}>

					<div class={style.search}>
						<input class={style.searchinput} id='search' type='search' placeholder='Search for cities' onChange={this.change}></input>
						<div id='searchdropdown' class={style.searchdropdown}>


						</div>
					</div>

					<div class={style.temp}>
						{this.state.temp}°C
					</div>
					<div class={style.loc}>
						in {this.state.locate}
						<p>{this.state.description}</p>
					</div>
					<div class={style.minmax}>
						H:{this.state.temp_max}° L:{this.state.temp_min}°
					</div>

					<img src={this.state.icon} alt="weather" class={style.weatherIcon}></img>
					<div class={style.details}>
						<p>Average Temp: {this.state.avg_temp}°C | Probability of Rain: {this.state.rain}%</p>
					</div>
				</div>

				<div class={style.forecast}>
					{
						this.state.forecast.map((f, i) => (
							<div key={i} class={style.forecast_item}>
								<span>{f.time}</span>
								<span>{f.temp}°C</span>

							</div>
						))
					}
				</div>

				<div class={style.sun}>
					<div>
						<img src="./assets/icons/sunrise.png"></img>
						<p>{this.state.sunrise}</p>
					</div>
					<div>
						<img src="./assets/icons/sunset.png"></img>
						<p>{this.state.sunset}</p>
					</div>
				</div>


			</div>
		);
	}

	//parse jreponse data takes a json data
	parseResponse = (parsed_json) => {

		//set variables from parsed_json param
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var lat = parsed_json['coord']['lat'];
		var lon = parsed_json['coord']['lon'];
		var icon = "./assets/icons/weather/" + parsed_json['weather'][0]['icon'] + ".png";
		var description = parsed_json['weather'][0]['description'];

		var temp_max = parsed_json['main']['temp_max'];
		var temp_min = parsed_json['main']['temp_min'];
		var main = parsed_json['weather']['main'];
		var sunrise = parsed_json['sys']['sunrise'];
		var sunset = parsed_json['sys']['sunset'];

		{
			//parse the sunrise date
			var rise = new Date(parseInt(sunrise) * 1000);
			//parse the sunset date
			var set = new Date(parseInt(sunset) * 1000);
			//calculate and set sunrise and sunset in state
			this.setState({
				sunrise: ('0' + rise.getHours()).slice(-2) + ':' + ('0' + rise.getMinutes()).slice(-2),
				sunset: ('0' + set.getHours()).slice(-2) + ':' + ('0' + set.getMinutes()).slice(-2),
			})
		}

		//set all variables in state (very simple)
		this.setState({

			temp: temp_c,
			cond: conditions,
			lat: lat,
			lon: lon,
			icon: icon,
			description: description,
			temp_max: temp_max,
			temp_min: temp_min,
			main: main
		});
	}

	//parse hourly (forecast) data
	parseHourly = (parsed_json) => {
		//set variables from parsed_json param
		var hourly_times = parsed_json['hourly']['time'];
		var hourly_temp = parsed_json['hourly']['temperature_2m'];
		var rain = parsed_json['daily']['precipitation_probability_max'];
		var avg_temp = 0;


		{
			var newArray = [];
			// loop over all the day hours (24h)
			for (var i = 0; i < 24; i++) {
				//push time and temp to the array
				newArray.push({ "time": hourly_times[i].split('T')[1], "temp": hourly_temp[i] })
				avg_temp += hourly_temp[i];
			}
			avg_temp = Math.round((avg_temp / 24) * 10) / 10;

			//set forecast and rain and avg temp to state
			this.setState({ forecast: newArray, rain: rain[0], avg_temp: avg_temp });
		}

	}



}