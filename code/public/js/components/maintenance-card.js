const MaintenanceCard = {
    components: {
        "delete-maintenance": DeleteMaintenance
    },
    template: `
      <div class="mb-3">
        <div class="row">
          
          <div class="col-8">
            <h6> Manutenzione selezionata </h6>
          </div>
          <div class="col-4">
              <delete-maintenance :maint="$props.maintenance" @delete-maint="sendToCalendar"/>
              <button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" class="center btn btn-danger btn-delete-maint py-0"> Elimina </button>
          </div>
        </div>
		<div v-if="$props.maintenance != {} " class="maintenance-card center">
		  <div v-if="$props.from == 'gardener'">
            <div class="row">
              <div class="col-3 grey-state grey-label">
                  WHERE
              </div>
              <div class="col-9 gardener-info">
                <p>{{$props.garden.name}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3 grey-state grey-label">
                CITY
              </div>
              <div class="col-9 gardener-info">
                <p>{{$props.garden.city}}</p>
              </div>
            </div>
          </div>
          <div class="row">
              <div class="col-3 grey-state grey-label">
                TO DO
              </div>
              <div class="col-9 gardener-info">
                <p>{{$props.maintenance.description}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-3 grey-state grey-label">
                DONE
              </div>
              <div class="col-1 gardener-info">
                <p v-if="$props.maintenance.done"> SI </p>
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
            inneed:"green"
        }
    },
    props: {
        'garden':{},
        'maintenance': {
            required: true
        },
        from:{}
    },
    watch: {
        garden(n, o) {
            if (this.garden.flagsOn == 0){
                this.inneed = "green"
            } else if (this.garden.flagsOn == 1){
                this.inneed = "orange"
            } else {
                this.inneed = "red"
            }
        }
    },
    methods:{
        sendToCalendar: function(maint){
            this.$emit('delete-maint', maint)
        }
    }
}