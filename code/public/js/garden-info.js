const Sensors = {
	template:`
		<p>Sensors</p>
	`
}

const Meteo = {
	template: `
		<div class="meteo-template">
			<h6> Meteo </h6>
				<div class="meteo-card row">
					<div class="col-md-1"/>
					<div class="col-md-3">
						<div class="row">
							<div class="mx-auto">
								<img :src=today.icon :alt=today.description />
							</div>
							<div class="mx-auto today-weather-info">
								<p>{{today.temp}}</p>
								<p>{{today.humidity}}</p>
							</div>
						</div>
					</div>
					<div class="col-md-7">
						<div class="row">
							<div class="col-md-4 border-left"  v-for="day in nextdays">
								<div class="row">
									<div class="mx-auto">
										<img :src=day.icon :alt=day.description />
									</div>
								</div>
								<div class="row weather-info">
									<div class="mx-auto">
										{{day.temp}}
									</div>
									<div class="mx-auto">
										{{day.humidity}}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-1"/>
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
					console.log(this.today)
					for (let i = 0; i<3; i++){
						this.nextdays[i] = {
							icon: "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon +"@2x.png",
							description: data.daily[i].weather[0].icon.description,
							temp: data.daily[i].temp.day.toFixed(0) + "°C",
							humidity: data.daily[i].humidity + "%"
						}
						console.log(this.nextdays[i])
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
		<div class="card">
			<div class="row">
				<div class="col-md-12">
					<div class="card-body">
						<h5 class="card-title"> {{ garden.name }}</h5>
						<p class="card-text"> {{ garden.city }} </p>
						<hr/>
						<sensors></sensors>
						<hr/>
						<meteo :garden="garden"></meteo>
						<hr/>
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