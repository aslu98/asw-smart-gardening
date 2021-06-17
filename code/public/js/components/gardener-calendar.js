String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const GardenerCalendar ={
    template:
        `<div class="gardener-calendar">
            <div class= "row"> 
              <h5>Calendario di {{gardenerName}}</h5>
            </div>
            <div class= "row">
                <div class="col-1">
                  <div class='clickable prevWeek' v-on:click="previousWeek()">
                    <i class="fas fa-arrow-circle-left fa-lg"></i>
                  </div>
                </div>
                <div class="col-10">
                    <table class="table calendar-table">
                      <thead>
                          <tr>
                              <th class='day-heading' scope="column" v-for="date in weekDates"> 
                                <p>{{date.toLocaleDateString("it-IT", weekday_options).toString().capitalize()}}</p>
                                <p>{{date.toLocaleDateString("it-IT", day_options).toString()}}</p>
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                      
                      </tbody>
                    </table>
                </div>
                <div class="col-1">
                  <div class='clickable nextWeek' v-on:click="nextWeek()">
                    <i class="fas fa-arrow-circle-right fa-lg"></i>
                  </div>
                </div>
            </div>
        </div>`,
    data() {
        return {
            gardenerName: "",
            maintenances: [],
            weekDates: [new Date()],
            weekday_options: { weekday: 'long'},
            day_options: {day: 'numeric', month: 'short'}
        }
    },
    methods: {
        getGardenerName: function() {
            axios.get(DBURL + "/gardener/" + this.$route.params.id)
                .then(response => {
                    console.log(response.data)
                    this.gardenerName = response.data.name + " " + response.data.surname
                })
                .catch(error => (console.log(error)));
        },
        getMaintenances: function () {
            axios.get(DBURL + "/maintenances/gardener/" + this.$route.params.id)
                .then(response => {
                    this.maintenances = response.data
                })
                .catch(error => (console.log(error)));
        },
        setWeekDates: function() {
            let d = this.weekDates[0]
            let day = d.getDay()
            let diff = d.getDate() - day + (day == 0 ? -6:1);
            let startingDate = new Date(d.setDate(diff));
            Vue.set(this.weekDates, 0, new Date(startingDate))
            for (let i = 1; i<7; i++) {
                this.weekDates[i] =  new Date(startingDate.setDate(startingDate.getDate() + 1));
            }
        },
        previousWeek: function () {
            this.weekDates[0].setDate(this.weekDates[0].getDate() - 7)
            this.setWeekDates()
            console.log(this.weekDates[2])
        },
        nextWeek: function () {
            this.weekDates[0].setDate(this.weekDates[0].getDate() + 7)
            this.setWeekDates()
            console.log(this.weekDates[2])
        }
    },
    mounted(){
        this.getGardenerName()
        this.getMaintenances()
        this.setWeekDates()
    }
    //quando viene cliccata una maint. deve inviarla al padre
    //inizialmente gli invia
}