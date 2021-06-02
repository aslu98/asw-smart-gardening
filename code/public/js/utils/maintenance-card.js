const MaintenanceCard = {
    template: `
		<div class="maintenace-card">
		    <div class="row">
              <div class="col-3 grey-state">
                  WHERE
              </div>
              <div class="col-9">
                <p>{{garden.name}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3 grey-state">
                CITY
              </div>
              <div class="col-9">
                <p>{{garden.city}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3 grey-state">
                TO DO
              </div>
              <div class="col-9">
                <p>{{maintenance.description}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3 grey-state">
                DONE
              </div>
              <div class="col-3">
                <p>{{maintenance.done}}</p>
              </div>
              <div class="col-3 grey-state">
                URGENCY
              </div>
              <div class="col-3">
                <i v-if="inneed == 'green'" class="fas fa-circle green-state"></i>
                <i v-if="inneed == 'orange'" class="fas fa-circle orange-state"></i>
                <i v-if="inneed == 'red'" class="fas fa-circle red-state"></i>
              </div>
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
        },
        maintenance(n, o) {
            this.maintenance = n
            if (this.garden.flagsOn == 0){
                this.inneed = "green"
            } else if (this.garden.flagsOn == 1){
                this.inneed = "orange"
            } else {
                this.inneed = "red"
            }
        }
    }
}