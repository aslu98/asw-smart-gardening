const Gardens = {
	//this template will be the one of the side info for the garden -> fare query con tutte le info necessarie (garden + sensori)
	//there will be another component for the garden calendar (query on the maint.)
	template: `
	<div class="row">
		<div class="col">
			<div class="card" v-for="garden in gardens" :key="garden._id">
				<div class="row no-gutters">
					<div class="col-md-10">
						<div class="card-body">
							<h5 class="card-title">Name: {{ garden.name }}</h5>
							<p class="card-text">ObjectId: {{ garden._id }}</p>
							<p class="card-text">City: {{ garden.city }}</p>
							<p class="card-text">Lat: {{ garden.lat }}</p>
							<p class="card-text">Any flags on: {{ garden.flagsOn }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	`,
	data() {
		return {
			gardens: [],
			called: 'chiamato'
		}
	},
	methods: {
		listGardens: function () {
			axios.get("http://localhost:3000/api/gardens")
			.then(response => {
				console.log("got response from gardens");
				this.gardens = response.data
			})
			.catch(error => (console.log(error)));

		},
		init: function(){
			this.listGardens();
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