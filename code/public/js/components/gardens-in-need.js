const MAX = 10;
const GardensInNeed = {
    components:{
        "add-button": AddButton
    },
    template: `
		<div class="gardens-in-need-card my-4">
            <h6>Giardini</h6>
            <div v-if="nothing"> <p class="empty-card"> No gardens in need! </p> </div>
            <div v-else class="card gardens-scrollbar">
              <div v-for="garden in gardens" class="row">
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
                      <div class="col-2 grey-state grey-label">
                        IS
                      </div>
                      <div class="col-2 gardener-info">
                        <p>{{sensor.value}} {{getMeasureUnit(sensor.fieldname)}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <add-button> </add-button>
                <hr class="green-hr"/>
              </div>
            </div>
		</div>
	`,
    data() {
        return {
            nothing: true,
            gardens: []
        }
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
    },
    mounted() {
        this.getGardensInNeed()
    }

    /*<div v-for="sensor in garden.sensors" class="row">
                    <div class="row">
                      <div class="col-3 grey-state in-need-info">
                        SENSOR
                      </div>
                      <div class="col-9 maintenance-info">
                        <p>{{sensor.fieldname}}</p>
                      </div>
                    </div>
                  </div>*/
}