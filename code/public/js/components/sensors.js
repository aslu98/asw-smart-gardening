const Sensors = {
    template:`
      <div class="sensors-template">
      <h6>Sensors</h6>
      <div v-if="nothing"> <p class="empty-card"> No sensors here! </p> </div>
      <div v-else class="card my-custom-scrollbar">
        <table class="table sensors-table">
          <tbody>
          <tr v-for="sensor in sensors">
            <th scope="row">#{{sensor.API}}</th>
            <td>{{sensor.where}}</td>
            <td>{{sensor.fieldname}} </td>
            <td>
              {{sensor.value}} {{getMeasureUnit(sensor.fieldname)}}
              <i v-if="sensor.flagOn" class="fas fa-circle red-state"></i>
              <i v-else class="fas fa-circle green-state"></i>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      </div>
    `,
    data() {
        return {
            nothing: false,
            sensors: []
        }
    },
    props: ['gardenid'],
    watch: {
        gardenid() {
            this.getSensors()
        }
    },
    methods: {
        getSensors: function () {
            axios.get(DBURL + "/sensors/garden/" + this.$props.gardenid)
                .then(response => {
                    this.nothing = false
                    this.sensors = response.data
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
        init: function(){
            this.getSensors();
        }
    },
    mounted(){
        this.init()
    }
}