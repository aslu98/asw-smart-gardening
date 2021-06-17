const MaintenanceCard = {
    template: `
		<div class="maintenace-card center my-4">
		    <div class="row">
              <div class="col-3 grey-state grey-label">
                  WHERE
              </div>
              <div class="col-9 gardener-info">
                <p>{{garden.name}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3 grey-state grey-label">
                CITY
              </div>
              <div class="col-9 gardener-info">
                <p>{{garden.city}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3 grey-state grey-label">
                TO DO
              </div>
              <div class="col-9 gardener-info">
                <p>{{maintenance.description}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3 grey-state grey-label">
                DONE
              </div>
              <div class="col-3 gardener-info">
                <p v-if="maintenance.done"> SI </p>
                <p v-else> NO </p>
              </div>
              <div class="col-3 grey-state grey-label">
                STATE
              </div>
              <div class="col-1 urgency gardener-info">
                <i v-if="inneed == 'green'" class="fas fa-circle green-state"></i>
                <i v-if="inneed == 'orange'" class="fas fa-circle orange-state"></i>
                <i v-if="inneed == 'red'" class="fas fa-circle red-state"></i>
              </div>
              <div class="col-2"></div>
            </div>
		</div>
	`,
    data() {
        return {
            garden:{},
            maintenance:{},
            inneed:"green"
        }
    },
    props: ['garden', 'maintenance'],
    watch: {
        garden(n, o) {
            this.garden = n
            if (this.garden.flagsOn == 0){
                this.inneed = "green"
            } else if (this.garden.flagsOn == 1){
                this.inneed = "orange"
            } else {
                this.inneed = "red"
            }
        },
        maintenance(n, o) {
            this.maintenance = n
        }
    }
}