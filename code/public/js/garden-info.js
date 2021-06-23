const GardenInfo = {
	components: {
		'garden-card': GardenCard,
		'sensors': Sensors,
		'meteo': Meteo,
		'to-do': Todo
	},
	template: `
		<div class="garden-info">
			<div class="row">
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
							<div class="row">
								<div class="mx-auto open-calendar-btn">
									<button type="button" class="center btn btn-success" @click="openCalendar($props.gardenid)"> Open Calendar </button>
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
		},
		hideInfo() {
			this.$emit('hidesidebar');
		},
		openCalendar(id){
			this.$router.push("/garden-board/"+id)
		}
	},
	mounted() {
		this.getGarden()
	}
}

//@click="this.$router.push({ name: '/garden-board/' + $props.gardenid })
