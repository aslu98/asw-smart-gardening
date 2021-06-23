const CreateMaintenance = {
    template: `
      <div class="create-maintenance">
      <div class="modal fade" :id="this.$props.modalid" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
           aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title m-0 ml-4" id="exampleModalLabel"> Crea manutenzione</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form v-if="!this.completed" name="createMaint" method="post" @submit.prevent="registerNewMaint">
              <div class="modal-body">
                <div class="pb-1">
                  <div v-if="errors.length" class="mb-3">
                    <h6 class="form-error-heading">Correggi i seguenti errori:</h6>
                    <div v-for="error in errors" class="form-error" >{{ error }}</div>
                  </div>
                  <div class="pb-3">
                    <div class="bootstrap-select-wrapper">
                      <label class="control-label" :class="this.$props.from" for="garden">Giardino</label>
                      <select class="form-control form-control-sm" id="garden" name="garden" v-model="selectedgarden">
                        <option v-for="garden in gardens" :value="garden._id">
                          {{ garden.name }} - {{ garden.city }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                      <div class="pb-3 col-6">
                        <label class="control-label" for="date">Data</label>
                        <input type="date" class="form-control form-control-sm" id="date"
                               placeholder="Data" name="date" v-model="date" required>
                      </div>
                      <div class="pb-3 col-3">
                        <label class="control-label" for="hour">Ora di inizio</label>
                        <input type="number" :min="minhour" :max="maxhour - 1" step="1" class="form-control form-control-sm" id="hour"
                               placeholder="Ora" name="hour" v-model="hour" required>
                      </div>
                      <div class="pb-3 col-3">
                        <label class="control-label" for="duration">Durata in ore</label>
                        <input type="number" min="1" max="12" step="1" class="form-control form-control-sm" id="hour"
                               placeholder="Durata" name="duration" v-model="duration" required>
                      </div>
                  </div>
                  <div class="row">
                    <div class="pb-3 col-8 form-group">
                        <label class="control-label" for="description">Descrizione</label>
                        <textarea rows="3" class="form-control form-control-sm" id="description"
                               name="description" v-model="description" required></textarea>
                      </div>
                    <div class="col-1"></div>
                    <div class="pt-5 pb-3 col-1 form-check">
                      <input type="checkbox" id="done" class="form-check-input" name="done" :checked="done">
                      <label class="form-check-label" for="done">Done</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <input type="submit" value="Salva" class="btn btn-success rounded-pill"/>
              </div>
          </form>
            <div v-else class="modal-content">
              <h5 class="form-ok"> ✓ Operazione avvenuta con successo </h5>
            </div>
          </div>
        </div>
      </div>
      </div>
    `,
    props: {
        timeslot: {
            default: new Date().toString()
        },
        datestr: {
            default: new Date().toString()
        },
        garden: {
            default: ""
        },
        gardener: {
            required: true
        },
        modalid: {}
    },
    watch:{
        garden(n, o){
            this.setSelectedGarden()
        }
    },
    data() {
        return {
            errors: [],
            minhour: 7,
            maxhour: 20,
            selectedgarden: "",
            date: "",
            hour: 7,
            duration: "",
            done: false,
            description: "",
            gardens: {},
            completed: false,
            maintenances: []
        }
    },
    methods: {
        registerNewMaint: function () {
            this.errors = []
            if (this.checkGardenSelection() & this.checkDuration() & this.checkOverlap()){
                let maint = {
                    garden: this.selectedgarden,
                    startTime: new Date(new Date(this.date).setHours(this.hour)).toISOString(),
                    duration: this.duration,
                    done: this.done,
                    description: this.description,
                    gardener: this.$props.gardener
                }
                axios.post(DBURL + "/maintenances", maint)
                    .then(r => {
                        this.completed = true
                        let resmaint = r.data
                        this.maintenances.push(resmaint)
                        this.$emit('new-maint', resmaint)
                    })
                    .catch(error => {
                        console.log(error)
                        this.errors.push(error)
                    });
            }
        },
        getGardens: function () {
            axios.get(DBURL + "/gardens")
                .then(response => {
                    this.gardens = response.data
                })
                .catch(error => (console.log(error)));
        },
        getMaintenances: function() {
            axios.get(DBURL + "/maintenances/gardener/" + this.$props.gardener)
                .then(response => {
                    this.maintenances = new Array(response.data)
                })
                .catch(error => (console.log(error)));
        },
        getMaintenancesOfGarden: function() {
            axios.get(DBURL + "/maintenances/garden/" + this.$props.garden._id + "/gardener/" + this.$props.gardener)
                .then(response => {
                    this.maintenances = new Array(response.data)
                })
                .catch(error => (console.log(error)));
        },
        setDateAndHour: function () {
            this.date = new Date(this.$props.datestr).toISOString().split('T')[0]
            this.hour = new Date(this.$props.timeslot).getHours()
        },
        setSelectedGarden: function() {
            if (this.$props.garden != ""){
                this.selectedgarden = this.$props.garden._id
                this.getMaintenancesOfGarden()
            }
        },
        checkGardenSelection: function(){
            let check = this.selectedgarden == ""
            if (check) {
                this.errors.push('Non hai selezionato il giardino.');
            }
            return !check
        },
        checkDuration: function() {
            let check = (parseInt(this.hour) + parseInt(this.duration)) > (this.maxhour)
            if (check) {
                this.errors.push("L'orario di fine della manutenzione eccede i limiti dell'orario lavorativo.");
            }
            return !check
        },
        checkOverlap: function (){
            let newmaint = {
                start: new Date(new Date(this.date).setHours(this.hour)),
                end: new Date(new Date(this.date).setHours(parseInt(this.hour) + parseInt(this.duration)))
            }
            let check =
                this.maintenances
                    .filter(m => new Date(new Date(m.startTime).startOfDay()).getTime() == new Date(new Date(newmaint.start).startOfDay()).getTime())
                    .filter(m => (  (new Date(m.startTime).getHours() <= newmaint.start.getHours() && new Date(new Date(m.startTime).setHours(new Date(m.startTime).getHours() + m.duration)).getHours() > newmaint.start.getHours()) ||
                                    (new Date(m.startTime).getHours() < newmaint.end.getHours() && new Date(new Date(m.startTime).setHours(new Date(m.startTime).getHours() + m.duration)).getHours() >= newmaint.end.getHours()))
                    ).length > 0
            if (check) {
                this.errors.push("La manutezione non può essere registrata perchè si sovrappone con una manutenzione già presente.");
            }
            return !check
        }
    },
    mounted() {
        this.getGardens()
        this.getMaintenances()
        this.setSelectedGarden()
        this.setDateAndHour()
    }
}