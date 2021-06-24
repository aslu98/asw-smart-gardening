const GardenBoard = {
	components: {
		'meteo': Meteo,
		'maintenance-card': MaintenanceCard,
		'sensors': Sensors,
		'garden-calendar': Calendar,
		'garden-card': GardenCard
	},
	template: `
		<div class="gardener-board row mt-3">
			<div class="col-12 col-md-7">
				<div class= "row mt-2">
					<h5>Calendario </h5>
				</div>
				<garden-calendar :from="'garden'"
								 :gardener=localStorage.idGardener
								 :garden="garden"
								 :deleted_maint="deleted_maintenance"
								 @clicked-maint="showMaint" />
			</div>
			<div class="col-12 col-md-5 garden-board-components">
				<garden-card :garden="garden" @hide-info="goBack"/>
				<hr class="green-hr"/>
				<sensors :gardenid="this.garden._id"></sensors>
				<hr class="green-hr"/>
				<meteo :garden="garden"></meteo>
				<div v-if="!emptyMaint" class="row">
					<hr class="green-hr"/>
					<maintenance-card :garden="garden" :maintenance="maintenance" @delete-maint="sendToCalendar"></maintenance-card>
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			gardenerName: "",
			maintenance:{},
			deleted_maintenance:{},
			garden:{_id:""},
			emptyMaint: true
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
		showMaint: function(maint) {
			this.maintenance = maint
			this.emptyMaint = false
		},
		goBack: function (){
			this.$router.go(-1)
		},
		sendToCalendar: function (maint){
			this.emptyMaint = true
			this.deleted_maintenance = maint
		}
	},
	mounted() {
		this.getGarden()
	}
}