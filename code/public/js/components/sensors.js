const Sensors = {
    template:`
      <div class="sensors-template">
      <h6>Sensors</h6>
      <div class="card my-custom-scrollbar">
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
                    this.sensors = response.data
                })
                .catch(error => (console.log(error)));
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