const GardenInfo = {
	components: {
		'sensors': Sensors,
		'meteo': Meteo,
		'to-do': Todo
	},
	template: `
		<div class="garden-info">
			<div class="row">
				<div class="col-md-12">
					<div class="card-body">
						<div class="row">
							<div class="col-2 garden-info-back">
								<i class="fas fa-chevron-circle-right fa-2x"></i>
							</div>
							<div class="col-10">
								<h5 class="card-title text-center"> {{ garden.name }}</h5>
								<p class="card-text text-center"> {{ garden.city }} </p>
							</div>
						</div>
						<div class="garden-info-components">
							<hr class="green-hr"/>
							<sensors :gardenid="$props.gardenid"></sensors>
							<hr class="green-hr"/>
							<meteo :garden="garden"></meteo>
							<hr class="green-hr"/>
							<to-do :gardenid="$props.gardenid"></to-do>
							<div class="row">
								<div class="mx-auto open-calendar-btn">
									<button type="button" class="center btn btn-success"> Open Calendar </button>
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
			garden: {}
		}
	},
	props: ['gardenid'],
	watch: {
		gardenid() {
			this.getGarden()
		}
	},
	methods: {
		getGarden: function () {
			if(this.$props.gardenid !== "") {
				axios.get(DBURL + "/gardens/" + this.$props.gardenid)
					.then(response => {
						this.garden = response.data
					})
					.catch(error => (console.log(error)));
			}
		}
	},
	mounted() {
		this.getGarden()
	}
}
