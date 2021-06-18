String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.capitalizeMonth = function() {
    return this.substr(0,3) + this.charAt(3).toUpperCase() + this.slice(4);
}

const GardenerCalendar = {
    components:{
        "add-button": AddButton
    },
    template:
        `<div class="gardener-calendar">
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
                                <p class="weekday">{{date.toLocaleDateString("it-IT", weekday_options).toString().capitalize()}}</p>
                                <p>{{date.toLocaleDateString("it-IT", day_options).toString().capitalizeMonth()}}</p>
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                      <tr v-for="timeslot in timeslots">
                        <td v-for="date in weekDates" class="calendar-timeslot clickable">
                          <p v-if="maintInTimeSlot(timeslot,date)" class="maint-timeslot">{{timeslot.toLocaleTimeString("it-IT", time_options).toString()}}</p>
                          <div v-else class="no-maint-timeslot row">
                            <div class="col-6">
                              <p>{{timeslot.toLocaleTimeString("it-IT", time_options).toString()}}</p>
                            </div>
                            <div class="col-6 pt-1 calendar-add-btn">
                              <add-button></add-button>
                            </div>
                          </div>
                        </td>
                      </tr>
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
            maintenances: [],
            weekDates: [new Date()],
            timeslots: [],
            weekday_options: { weekday: 'long'},
            day_options: {day: 'numeric', month: 'short'},
            time_options: {hour: '2-digit'}
        }
    },
    methods: {
        getMaintenances: function () {
            axios.get(DBURL + "/maintenances/gardener/" + this.$route.params.id)
                .then(response => {
                    this.maintenances = response.data
                    for (let i=0; i<this.maintenances.length; i++){
                        this.maintenances[i].startTime = new Date(this.maintenances[i].startTime)
                        this.maintenances[i].endTime = new Date(new Date(this.maintenances[i].startTime).setMinutes(this.maintenances[i].startTime.getMinutes() + this.maintenances[i].duration))
                    }
                })
                .catch(error => (console.log(error)));
        },
        setTimeSlots: function (){
            let d = new Date()
            for (let i=7; i<=19; i++){
                this.timeslots[i-7] = new Date(d.setHours(i))
            }
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
        maintInTimeSlot: function (timeslot,date){
            return this.maintenances.filter(m => m.startTime.getDate() == date.getDate())
                .filter(m => (timeslot.getHours() >= m.startTime.getHours() && timeslot.getHours() <= m.endTime.getHours()))
                .length > 0;
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
        this.getMaintenances()
        this.setWeekDates()
        this.setTimeSlots()
    }
    //quando viene cliccata una maint. deve inviarla al padre
    //inizialmente gli invia
}