const GardenInfo = {
	components: {
		'garden-card': GardenCard,
		'sensors': Sensors,
		'meteo': Meteo,
		'to-do': Todo
	},
	template: `
		<div class="garden-info">
			<div class="row mx-0">
				<div class="col-md-12">
					<div class="card-body">
						<garden-card :garden="garden" @hide-info="hideInfo"/>
						<div class="garden-info-components">
							<hr class="green-hr"/>
							<sensors :gardenid="$props.gardenid"/>
							<hr class="green-hr"/>
							<meteo :garden="garden"/>
							<hr class="green-hr"/>
							<to-do :gardenid="$props.gardenid"/>
							<div v-if="showNotLogged" class="row">
								<div class="col-1"></div>
								<div class="col-10 not-logged mt-3">
									<h5 class="not-logged-title mt-1"> Errore! </h5>
									<p class="mb-1">Devi effettuare il login per poter accedere al calendario.</p>
								</div>
								<div class="col-1"></div>
							</div>
							<div class="row">
								<div class="mx-auto open-calendar-btn">
									<button type="button" class="center btn btn-success" @click="openCalendar($props.gardenid)"> Apri il calendario </button>
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
			garden: {},
			showNotLogged: false
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
						this.garden = response.data;
						this.showNotLogged = false;
					})
					.catch(error => (console.log(error)));
			}
		},
		hideInfo() {
			this.$emit('hidesidebar');
		},
		openCalendar(id){
			if(localStorage.user && localStorage.idGardener){
				this.showNotLogged = false
				this.$router.push("/garden-board/" + id)
			} else {
				this.showNotLogged = true
			}
		}
	},
	mounted() {
		this.getGarden()
	}
}
