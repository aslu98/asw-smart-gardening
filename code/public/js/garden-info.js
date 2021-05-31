const DBURL = "http://localhost:3000/api"

const Sensors = {
	template:`
		<div class="sensors-template">
			<h6>Sensors</h6>
			<div class="card my-custom-scrollbar">
				<table class="table">
				  <tbody>
					<tr v-for="sensor in sensors">
					  <th scope="row">#{{sensor.API}}</th>
					  <td>{{sensor.where}}</td>
					  <td>{{sensor.fieldname}} </td>
					  <td>
						  {{sensor.value}} {{getMeasureUnit(sensor.fieldname)}}
						  <i v-if="sensor.flagOn" class="fas fa-circle red-state"></i>
						  <i v-else class="fas fa-circle green-state"></i>
					  </td>
					</tr>
				  </tbody>
				</table>
			</div>
		</div>
	`,
	data() {
		return {
			gardenID: this.$route.params.id,
			sensors: []
		}
	},
	methods: {
		getSensors: function () {
			axios.get(DBURL + "/sensors/garden/" + this.gardenID)
				.then(response => {
					this.sensors = response.data
				})
				.catch(error => (console.log(error)));
		},
		getMeasureUnit: function (fieldname){
			switch(fieldname){
				case "Temperature":
					return "°C"
				case "Humidity":
					return "%"
				default:
					return ""
			}
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
		<div class="weather-template">
			<h6>Meteo</h6>
				<div class="weather-card green-border row">
					<div class="col-4 today-weather">
						<div class="row">
							<p class="center p-weather-date">{{today.date}}</p>
						</div>
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
							<div class="col-4 weather-cell"  v-for="day in nextdays">
								<div class="row">
									<p class="center p-weather-date">{{day.date}}</p>
								</div>
								<div class="row">
									<div class="mx-auto">
										<img class="center" :src=day.icon :alt=day.description />
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
			today_options : { weekday: 'short', day: 'numeric', month: 'long'},
			date_options : { weekday: 'short', day: 'numeric', month: 'short'},
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
		capitalizeDate: function (d) {
			return d[0].toUpperCase() + d.substr(1, d.lastIndexOf(' '))
				+ d[d.lastIndexOf(' ')+1].toUpperCase() + d.substr(d.lastIndexOf(' ')+2)
		},
		updateInfo: function () {
			axios.get("https://api.openweathermap.org/data/2.5/onecall?" +
				"lat=" + this.lat +
				"&lon=" + this.lon +
				"&units=metric&exclude=hourly&" +
				"appid=d4cf4658574ecc23eeaee6f3c187d8c9")
				.then(response => {
					let data = response.data
					var dt = new Date(data.current.dt * 1000)
					var dtstring = dt.toLocaleDateString("it-IT", this.today_options).toString()
					this.today = {
						//icon: "http://openweathermap.org/img/wn/" + data.current.weather[0].icon +"@2x.png",
						icon: "/static/img/weather-icons/" + data.current.weather[0].icon + ".png",
						description: data.current.weather[0].icon.description,
						temp: data.current.temp.toFixed(1) + "°C",
						humidity: data.current.humidity + "%",
						date: this.capitalizeDate(dtstring)
					}
					for (let i = 0; i<3; i++){
						dt = new Date(data.daily[i+1].dt * 1000)
						dtstring = dt.toLocaleDateString("it-IT", this.date_options)
						this.nextdays[i] = {
							//icon: "http://openweathermap.org/img/wn/" + data.daily[i+1].weather[0].icon +"@2x.png",
							icon: "/static/img/weather-icons/" + data.daily[i+1].weather[0].icon + ".png",
							description: data.daily[i+1].weather[0].icon.description,
							temp: data.daily[i+1].temp.day.toFixed(0) + "°C",
							humidity: data.daily[i+1].humidity + "%",
							date: this.capitalizeDate(dtstring)
						}
					}
				})
				.catch(error => (console.log(error)));
		}
	}
}

const Todo = {
	template:`
		<div class="to-do-template">
			<h6>TO DO</h6>
				<div class="to-do-card green-border">
					<div v-for="maint in maints" class="to-do-maint text-center">
						<div class="row to-do-date">
							<div class="col-4"> {{maint.weekday}} </div>
							<div class="col-4"> {{maint.date}} </div>
							<div class="col-4"> {{maint.from_to}} </div>
						</div>
						<div class="row">
							<div class="col-12">{{maint.description}}</div>
						</div>
						<hr v-if="maint.last" class="green-hr to-do-hr"/>
					</div>
				</div>
			</div>
	`,
	data(){
		return {
			gardenID: this.$route.params.id,
			n: 2,
			maints: [],
			weekday_options: {weekday: 'long'},
			date_format: "DD/MM/YYYY",
			from_to_format: "HH:mm"
		}
	},
	methods: {
		getToDo: function () {
			axios.get(DBURL + "/maintenances/garden/" + this.gardenID + "/next/" + this.n)
				.then(response => {
					this.maints = response.data
					for (let i = 0; i < this.maints.length; i++) {
						let date = new Date(this.maints[i].startTime)
						this.maints[i].weekday = date.toLocaleDateString("it-IT", this.weekday_options).toString()
						this.maints[i].weekday = this.maints[i].weekday[0].toUpperCase() + this.maints[i].weekday.substr(1)
						this.maints[i].date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
						this.maints[i].from_to = date.toISOString().substr(11,5) + " - "
						date.setMinutes(date.getMinutes() + (this.maints[i].duration))
						this.maints[i].from_to += date.toISOString().substr(11,5)
						this.maints[i].last = i != this.maints.length - 1
					}
				})
				.catch(error => (console.log(error)));
		},
		init: function(){
			this.getToDo()
		}
	},
	mounted(){
		this.init()
	}
}

const CalendarButton = {
	template: `
		<div class="row">
			<div class="mx-auto open-calendar-btn">
				<button type="button" class="center btn btn-success"> Open Calendar </button>
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
		<div class="card garden-info green-border">
			<div class="row">
				<div class="col-md-12">
					<div class="card-body">
						<div class="row">
							<div class="mx-auto">
								<h5 class="card-title text-center"> {{ garden.name }}</h5>
								<p class="card-text text-center"> {{ garden.city }} </p>
							</div>
							<div class="col-2 garden-info-back">
								<i class="fas fa-chevron-circle-right fa-2x"></i>
							</div>
						</div>
						<div class="garden-info-components">
							<hr class="green-hr"/>
							<sensors></sensors>
							<hr class="green-hr"/>
							<meteo :garden="garden"></meteo>
							<hr class="green-hr"/>
							<to-do></to-do>
							<cal-btn></cal-btn>
						</div>
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
			axios.get(DBURL + "/gardens/" + this.$route.params.id)
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