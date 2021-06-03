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
							<div class="col-7 today-weather-icon">
								<img class="img-fluid" :src=today.icon :alt=today.description />
							</div>
							<div class="col-5 today-weather-info">
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
									<div class="col-6 center">
										<p>{{day.temp}}</p>
									</div>
									<div class="col-6 center">
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
            if(this.$props.garden !== "") {
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
                            icon: "/static/img/weather-icons/" + data.current.weather[0].icon.substr(0, 2) + "d.png",
                            description: data.current.weather[0].icon.description,
                            temp: data.current.temp.toFixed(1) + "°C",
                            humidity: data.current.humidity + "%",
                            date: this.capitalizeDate(dtstring)
                        }
                        for (let i = 0; i < 3; i++) {
                            dt = new Date(data.daily[i + 1].dt * 1000)
                            dtstring = dt.toLocaleDateString("it-IT", this.date_options)
                            this.nextdays[i] = {
                                icon: "/static/img/weather-icons/" + data.daily[i + 1].weather[0].icon.substr(0, 2) + "d.png",
                                description: data.daily[i + 1].weather[0].icon.description,
                                temp: data.daily[i + 1].temp.day.toFixed(0) + "°C",
                                humidity: data.daily[i + 1].humidity + "%",
                                date: this.capitalizeDate(dtstring)
                            }
                        }
                    })
                    .catch(error => (console.log(error)));
            }
        }
    }
}
