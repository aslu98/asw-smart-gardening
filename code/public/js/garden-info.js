const Sensors = {
	template:`
		<div class="sensors-template">
			<h6>Sensors</h6>
				<table class="table table-bordered">
				  <tbody>
					<tr v-for="sensor in sensors">
					  <th scope="row">#{{sensor.API}}</th>
					  <td>{{sensor.where}}</td>
					  <td>{{sensor.temperature}} °C</td>
					  <td>{{sensor.humidity}} %</td>
					</tr>
				  </tbody>
				</table>
		</div>
	`,
	data(){
		return {
			gardenID: this.$route.params.id,
			sensors: []
		}
	},
	props: ['garden'],
	watch: {
		garden(n, o) {
			this.gardenID = n._id;
			this.getSensors()
		}
	},
	methods: {
		getSensors: function () {
			axios.get("http://localhost:3000/api/sensors/garden/" + this.gardenID)
				.then(response => {
					this.sensors = response.data
					console.log(this.sensors)
				})
				.catch(error => (console.log(error)));
		},
		init: function(){
			this.getSensors();
		}
	},
	mounted(){
		this.init()
	}
}

const Meteo = {
	template: `
		<div class="meteo-template">
			<h6>Meteo</h6>
				<div class="meteo-card border border-success rounded row">
					<div class="col-4 today-weather">
						<div class="row">
							<div class="col-6 today-weather-icon">
								<img :src=today.icon :alt=today.description />
							</div>
							<div class="col-6 today-weather-info">
								<p>{{today.temp}}</p>
								<p>{{today.humidity}}</p>
							</div>
						</div>
					</div>
					<div class="col-8">
						<div class="row">
							<div class="col-4 border-left border-success"  v-for="day in nextdays">
								<div class="row">
									<div class="mx-auto">
										<img :src=day.icon :alt=day.description />
									</div>
								</div>
								<div class="row weather-info">
									<div class="mx-auto">
										<p>{{day.temp}}</p>
									</div>
									<div class="mx-auto">
										<p>{{day.humidity}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	`,
	data() {
		return {
			lat: 0,
			lon: 0,
			today:{},
			nextdays: []
		}
	},
	props: ['garden'],
	watch: {
		garden(n, o) {
			this.lat = n.lat
			this.lon = n.lon
			this.updateInfo()
		}
	},
	methods: {
		updateInfo: function () {
			console.log("updateInfo called")
			axios.get("https://api.openweathermap.org/data/2.5/onecall?" +
				"lat=" + this.lat +
				"&lon=" + this.lon +
				"&units=metric&exclude=hourly&" +
				"appid=d4cf4658574ecc23eeaee6f3c187d8c9")
				.then(response => {
					let data = response.data
					this.today = {
						icon: "http://openweathermap.org/img/wn/" + data.current.weather[0].icon +"@2x.png",
						description: data.current.weather[0].icon.description,
						temp: data.current.temp.toFixed(1) + "°C",
						humidity: data.current.humidity + "%"
					}
					for (let i = 0; i<3; i++){
						this.nextdays[i] = {
							icon: "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon +"@2x.png",
							description: data.daily[i].weather[0].icon.description,
							temp: data.daily[i].temp.day.toFixed(0) + "°C",
							humidity: data.daily[i].humidity + "%"
						}
					}
				})
				.catch(error => (console.log(error)));
		}
	}
}

const Todo = {
	template:`
		<p>Todo</p>
	`
}

const CalendarButton = {
	template: `
		<div class="row">
			<div class="mx-auto">
				<button> Open Calendar </button>
			</div>
		</div>
	`
}

const GardenInfo = {
	//this template will be the one of the side info for the garden -> fare query con tutte le info necessarie (garden + sensori)
	//there will be another component for the garden calendar (query on the maint.)
	components: {
		'sensors': Sensors,
		'meteo': Meteo,
		'to-do': Todo,
		'cal-btn': CalendarButton
	},
	template: `
		<div class="card border border-success">
			<div class="row">
				<div class="col-md-12">
					<div class="card-body">
						<div class="row">
							<div class="col-2 garden-info-back">
								<i class="fas fa-chevron-circle-left fa-2x"></i>
							</div>
							<div class="mx-auto">
								<h5 class="card-title text-center"> {{ garden.name }}</h5>
								<p class="card-text text-center"> {{ garden.city }} </p>
							</div>
						</div>
							<hr class="border-success"/>
							<sensors></sensors>
							<hr class="border-success"/>
							<meteo :garden="garden"></meteo>
							<hr class="border-success"/>
							<to-do></to-do>
							<cal-btn></cal-btn>
					</div>
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			garden: {}
		}
	},
	methods: {
		getGarden: function () {
			axios.get("http://localhost:3000/api/gardens/" + this.$route.params.id)
			.then(response => {
				this.garden = response.data
			})
			.catch(error => (console.log(error)));

		},
		init: function(){
			this.getGarden();
		}
	},
	mounted(){
		this.init()
	}
}



// EXAMPLE v-if
// <p v-if="movie.hasOwnProperty('imdb') && movie.imdb.rating != null" class="card-text">{{movie.imdb.rating}}/10</p>

//EXAMPLE filters
/*filters: {
	limit: function(text, length) {
		if(text==null) return "";
		return text.substring(0, length);
	}
},*/