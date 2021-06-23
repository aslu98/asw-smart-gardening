const GardenerBoard = {
	components: {
		'meteo': Meteo,
		'maintenance-card': MaintenanceCard,
		'gardens-in-need': GardensInNeed,
		'gardener-calendar': Calendar
	},
	template: `
		<div class="gardener-board row">
			<div class="col-12 col-md-7">
				<div class= "row">
					<h5 class="mt-3">Calendario di {{gardenerName}}</h5>
				</div>
				<gardener-calendar :from="'gardener'"
								   :gardener="this.$route.params.id"
								   :new_maint="this.new_maint"
								   @clicked-maint="showMaint"/>
			</div>
			<div class="col-12 col-md-5">
				<div v-if="!emptyMaint" class="row mt-3">
					<maintenance-card :garden="garden" :maintenance="maintenance" :from="'gardener'"
									  @delete-maint="sendToCalendarDeleted"/>
				</div>
				<div v-if="!emptyMaint" class="row">
					<meteo :garden="garden"/>
				</div>
				<div>
					<gardens-in-need :gardener="this.$route.params.id"
									 @maint-to-calendar="sendToCalendarNew"/>
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			gardenerName: "",
			maintenance:{},
			garden:{},
			new_maint:"",
			deleted_maintenance: "",
			emptyMaint: true,
			token: ""
		}
	},
	methods: {
		getGardenerName: function() {
			axios
				.get(DBURL + "/gardener/" + this.$route.params.id, {
					headers: {
						Authorization: this.token
					}
				})
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
		showMaint: function(maint) {
			this.maintenance = maint
			this.emptyMaint = false
			this.getGarden()
		},
		sendToCalendarNew: function(maint){
			this.new_maint = maint;
		},
		sendToCalendarDeleted: function (maint){
			this.deleted_maintenance = maint
		}
	},
	mounted() {
		if (localStorage.user && localStorage.idGardener) {
			this.token = localStorage.user;
			this.getGardenerName();
		} else {
			this.$router.replace('/').catch(err => {});
		}
	}
}