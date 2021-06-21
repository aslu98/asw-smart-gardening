const GardenerBoard = {
	components: {
		'meteo': Meteo,
		'maintenance-card': MaintenanceCard,
		'gardens-in-need': GardensInNeed,
		'gardener-calendar': GardenerCalendar
	},
	template: `
		<div class="gardener-board row">
			<div class="col-12 col-md-7">
				<div class= "row">
					<h5 class="mt-3">Calendario di {{gardenerName}}</h5>
				</div>
				<gardener-calendar @clicked-maint="updateMaint"></gardener-calendar>
			</div>
			<div class="col-12 col-md-5">
				<div v-if="!emptyMaint" class="row">
					<maintenance-card :garden="garden" :maintenance="maintenance"></maintenance-card>
				</div>
				<div v-if="!emptyMaint" class="row">
					<meteo :garden="garden"></meteo>
				</div>
				<div>
					<gardens-in-need></gardens-in-need>
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			gardenerName: "",
			maintenance:{},
			garden:{},
			emptyMaint: true
		}
	},
	methods: {
		getGardenerName: function() {
			axios.get(DBURL + "/gardener/" + this.$route.params.id)
				.then(response => {
					this.gardenerName = response.data.name + " " + response.data.surname
				})
				.catch(error => (console.log(error)));
		},
		getGarden: function () {
			axios.get(DBURL + "/gardens/" + this.maintenance.garden)
				.then(response => {
					this.garden = response.data
				})
				.catch(error => (console.log(error)));

		},
		updateMaint: function(maint) {
			this.maintenance = maint
			this.emptyMaint = false
			this.getGarden()
		}
	},
	mounted() {
		this.getGardenerName()
	}
}