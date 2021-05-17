const Querytesting = {
	//this template will be the one of the side info for the garden -> fare query con tutte le info necessarie (garden + sensori)
	//there will be another component for the garden calendar (query on the maint.)
	template: `
	<div class="row">
		<div class="col">
			<div class="card" v-for="t in test">
				<div class="row no-gutters">
					<div class="col-md-10">
						<div class="card-body">
							<h5 class="card-title"> {{t}} </h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	`,
	data() {
		return {
			test: [],
		}
	},
	methods: {
		getSensors: function () {
			axios.get("http://localhost:3000/api/maintenances/garden/609412d316b7f0346c54a093/next")
			.then(response => {
				this.test = response.data
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


// EXAMPLE v-if
// <p v-if="movie.hasOwnProperty('imdb') && movie.imdb.rating != null" class="card-text">{{movie.imdb.rating}}/10</p>

//EXAMPLE filters
/*filters: {
	limit: function(text, length) {
		if(text==null) return "";
		return text.substring(0, length);
	}
},*/