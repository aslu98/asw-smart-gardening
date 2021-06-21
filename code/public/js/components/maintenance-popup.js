const MaintenancePopUp = {
    template: `
      <div class="col-2 vcenter-item">
      <div class="modal fade" id="addMaint" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
           aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <form name="createMaint" method="post" @submit.prevent="registerNewMaint">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title m-0 ml-4" id="exampleModalLabel"> Crea manutenzione</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="pb-1">
                  <div class="pb-2">
                    <div class="bootstrap-select-wrapper">
                      <label class="control-label" for="garden">Giardino</label>
                      <select class="form-control form-control-sm" id="garden" name="garden">
                        <option v-for="garden in gardens" :value="garden._id" :selected="garden._id == getGardenId()">
                          {{ garden.name }} - {{ garden.city }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="pb-2">
                    <label class="control-label" for="date">Data</label>
                    <input type="date" class="form-control form-control-sm" id="date"
                           placeholder="Data" name="date" v-model="date" required>
                  </div>
                  <div class="pb-2">
                    <label class="control-label" for="hour">Ora di inizio</label>
                    <input type="number" min="7" max="19" step="1" class="form-control form-control-sm" id="hour"
                           placeholder="Ora" name="hour" v-model="hour" required>
                  </div>
                  <div class="pb-2">
                    <label class="control-label" for="duration">Durata in ore</label>
                    <input type="number" min="1" max="12" step="1" class="form-control form-control-sm" id="hour"
                           placeholder="Durata" name="duration" v-model="duration" required>
                  </div>
                  <div class="pb-2">
                    <label class="control-label" for="description">Descrizione</label>
                    <input type="textarea" rows="4" class="form-control form-control-sm" id="description"
                           placeholder="Descrizione" name="description" v-model.trim="description" required>
                  </div>
                  <div class="pb-2">
                    <input type="checkbox" id="done" class="form-control form-control-sm"
                           name="done" :checked="done">
                    <label class="control-label" for="done"> Done</label>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <input type="submit" value="Salva" class="btn btn-success rounded-pill"/>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    `,
    props: {
        timeslot: {
            default: ""
        },
        datestr: {
            default: ""
        },
        garden: {
            default: {
                _id: "",
                name: ""
            }
        },
        gardener: {
            required: true
        }
    },
    data() {
        return {
            date: "",
            hour: 7,
            duration: "",
            done: false,
            description: "",
            gardens: {}
        }
    },
    methods: {
        registerNewMaint: function () {
            axios.post(DBURL + "/maintenances", {
                garden: this.$props.garden,
                startTime: new Date(new Date(this.$props.date).setHours(this.$props.timeslot)).toISOString(),
                duration: this.duration,
                done: this.done,
                description: this.description,
                gardener: this.$props.gardener
            })
        },
        getGardens: function () {
            axios.get(DBURL + "/gardens")
                .then(response => {
                    this.gardens = response.data
                })
                .catch(error => (console.log(error)));
        },
        getGardenId: function () {
            return this.$props.garden._id
        },
        setDateAndHour: function () {
            if(this.$props.datestr != "") {
                this.date = new Date(this.$props.datestr).toISOString().split('T')[0]
            }
            this.hour = new Date(this.$props.timeslot).getHours()
        }
    },
    mounted() {
        this.setDateAndHour()
        this.getGardens()
    }
}