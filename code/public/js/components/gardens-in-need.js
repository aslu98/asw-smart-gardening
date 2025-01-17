const MAX = 10;
const GardensInNeed = {
    components : {
        "add-button": AddButton,
        "maintenance-modal": CreateMaintenance,
    },
    template: `
		<div class="gardens-in-need-card my-4">
            <h6>Giardini</h6>
            <div v-if="nothing"> <p class="empty-card"> No gardens in need! </p> </div>
            <div v-else class="card gardens-scrollbar">
              <div v-for="(garden, gindex) in gardens" class="row mx-0">
                <div class="col-10">
                  <div class="row">
                    <div class="col-3 grey-state in-need-info grey-label">
                      WHERE
                    </div>
                    <div class="col-7 gardener-info">
                      <p>{{garden.name}}</p>
                    </div>
                    <div class="col-2 gardener-info">
                      <i v-if="garden.inneed == 'green'" class="fas fa-circle green-state"></i>
                      <i v-if="garden.inneed == 'orange'" class="fas fa-circle orange-state"></i>
                      <i v-if="garden.inneed == 'red'" class="fas fa-circle red-state"></i>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-3 grey-state in-need-info grey-label">
                      CITY
                    </div>
                    <div class="col-9 gardener-info">
                      <p>{{garden.city}}</p>
                    </div>
                  </div>
                  <div v-if="garden.sensors != []" v-for="sensor in garden.sensors" class="row">
                    <div class="row sensor-row">
                      <div class="col-3 grey-state in-need-info grey-label">
                        SENSOR
                      </div>
                      <div class="col-5 ml-5 gardener-info">
                        <p>{{sensor.fieldname}} ({{sensor.where}})</p>
                      </div>
                      <div class="col-2 grey-state in-need-info grey-label">
                        IS
                      </div>
                      <div class="col-2 gardener-info">
                        <p>{{sensor.value}} {{getMeasureUnit(sensor.fieldname)}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <add-button :modalid="getModalId(gindex)"/>
                <maintenance-modal :gardener="getGardener()" 
                                   :garden="garden" 
                                   :modalid="getModalId(gindex)"
                                   @new-maint="sendToCalendar"/>
                <hr class="green-hr"/>
              </div>
            </div>
		</div>
	`,
    data() {
        return {
            nothing: true,
            gardens: [],
            maint_creation_completed: false,
        }
    },
    props: {
        gardener: {
            required:true
        },
    },
    methods:{
        getGardensInNeed: function(){
            axios.get(DBURL +'/gardens-in-need/' + MAX)
                .then(response => {
                    this.nothing = false
                    this.gardens = response.data
                    for (let i = 0; i < response.data.length; i++){
                        if (this.gardens[i].flagsOn == 0){
                            this.gardens[i].inneed = "green"
                        } else if (this.gardens[i].flagsOn == 1){
                            this.gardens[i].inneed = "orange"
                        } else {
                            this.gardens[i].inneed = "red"
                        }
                        axios.get(DBURL +'/sensors/garden/' + this.gardens[i]._id +"/on")
                            .then(response => {
                                this.gardens[i].sensors = response.data
                            })
                            .catch(error => {
                                console.log(error)
                            });
                    }
                })
                .catch(error => {
                    this.nothing = true
                    console.log(error)
                });
        },
        getGardener: function () {
            return this.$props.gardener
        },
        getMeasureUnit: function (fieldname){
            switch(fieldname){
                case "Temperature":
                    return "°C"
                case "Humidity":
                    return "%"
                default:
                    return ""
            }
        },
        getModalId: function(gindex){
            return "modalGarden" + gindex;
        },
        sendToCalendar: function(maint){
            this.$emit('maint-to-calendar', maint)
        }
    },
    mounted() {
        this.getGardensInNeed()
    }
}