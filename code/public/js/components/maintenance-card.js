const MaintenanceCard = {
    template: `
      <div>
        <h6 class="mt-3"> Manutenzione selezionata </h6>
		<div v-if="this.maintenance != {} " class="maintenance-card center mb-4">
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
              <div class="col-1 gardener-info">
                <p v-if="maintenance.done"> SI </p>
                <p v-else> NO </p>
              </div>
              <div class="col-5 grey-state grey-label">
                GARDEN STATE
              </div>
              <div class="col-1 urgency gardener-info">
                <i v-if="inneed == 'green'" class="fas fa-circle green-state"></i>
                <i v-if="inneed == 'orange'" class="fas fa-circle orange-state"></i>
                <i v-if="inneed == 'red'" class="fas fa-circle red-state"></i>
              </div>
              <div class="col-2"></div>
            </div>
		</div>
        <div v-else> Nessuna manutenzione selezionata</div>
      </div>
	`,
    data() {
        return {
            garden:{},
            maintenance:{},
            inneed:"green"
        }
    },
    props: {
        'garden':{
            required: true
        },
        'maintenance': {
            required: true
        }
    },
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