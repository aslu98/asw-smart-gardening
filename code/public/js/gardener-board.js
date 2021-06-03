const GardenerBoard = {
	components: {
		'meteo': Meteo,
		'maintenance-card': MaintenanceCard,
		'gardens-in-need': GardensInNeed,
		'gardener-calendar': GardenerCalendar
	},
	template: `
		<div class="gardener-board">
			<div class="row"> 
				<div class="col-12 col-md-7">
					<gardener-calendar></gardener-calendar>
				</div>
				<div class="col-12 col-md-5">
					<div class="row">
						<maintenance-card :garden="garden" :maintenance="maintenance"></maintenance-card>
					</div>
					<div class="row">
						<meteo :garden="garden"></meteo>
					</div>
					<div>
						<gardens-in-need></gardens-in-need>
					</div>
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			maintenance:{
				garden: "609412d316b7f0346c54a093",
				startTime: new Date("2021-05-30T17:00:00.000"),
				duration: 60,
				done: false,
				gardener: "60944e8316b7f0346c54a49d"
			}, //quando arriva una evento clicked-maint dal calendar (figlio)
			// deve cambiare la maintenance e fare una getGarden() per cambiare anche il garden
			garden:{}
		}
	},
	methods: {
		getGarden: function () {
			axios.get(DBURL + "/gardens/" + this.maintenance.garden)
				.then(response => {
					this.garden = response.data
				})
				.catch(error => (console.log(error)));

		}
	},
	mounted() {
		this.getGarden()
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