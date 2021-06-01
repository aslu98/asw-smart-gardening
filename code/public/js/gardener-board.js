const GardenerBoard = {
	template: `
		<div class="gardener-board">
			<div class="row"> 
				<div class="col-8">
					BOARD
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			gardener: {}
		}
	},
	methods: {
		getGardener: function () {
			axios.get(DBURL + "/gardens/" + this.$route.params.id)
			.then(response => {
				this.garden = response.data
			})
			.catch(error => (console.log(error)));
		}
	},
	mounted(){
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