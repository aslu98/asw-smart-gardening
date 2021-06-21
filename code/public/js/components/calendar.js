String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.capitalizeMonth = function() {
    let capPos = 3
    if (this.length < 6){
        capPos = 2
    }
    return this.substr(0, capPos) + this.charAt(capPos).toUpperCase() + this.slice(capPos+1);
}

const Calendar = {
    components:{
        "add-button": AddMaintenance,
        "maintenance-modal": MaintenancePopUp,
    },
    template:
        `
          <div class="gardener-calendar">
          <div class="row">
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
                    <p class="weekday">
                      {{ date.toLocaleDateString("it-IT", weekday_options).toString().capitalize() }}</p>
                    <p>{{ date.toLocaleDateString("it-IT", day_options).toString().capitalizeMonth() }}</p>
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(timeslot, slotindex) in timeslots">
                  <td v-for="(date, dateindex) in weekDates" class="calendar-timeslot clickable" v-on:click="clickedSlot(timeslot, date)">
                    <div v-if="checkMaintInTimeslot(timeslot,date)" class="maint-timeslot">
                      <p :class="{'first-maint': isFirstMaint(timeslot, date), 'last-maint': isLastMaint(timeslot, date)}"> {{ timeslot.toLocaleTimeString("it-IT", time_options).toString() }}</p>
                    </div>
                    <div v-else class="no-maint-timeslot row"
                         v-on:mouseover="switchActiveAddOn(slotindex, dateindex)"
                         v-on:mouseleave="switchActiveAddOff(slotindex, dateindex)">
                      <div class="col-6">
                        <p>{{ timeslot.toLocaleTimeString("it-IT", time_options).toString() }}</p>
                      </div>
                      <div class="col-6 pt-1 calendar-add-btn">
                        <add-button v-if="activeAdd[slotindex][dateindex]"/>
                        <maintenance-modal :timeslot="timeslot" :datestr="date" :gardener="getGardener()"></maintenance-modal>
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
            activeAdd: [],
            maintenances: [],
            weekDates: [new Date()],
            timeslots: [],
            weekday_options: { weekday: 'long'},
            day_options: {day: 'numeric', month: 'short'},
            time_options: {hour: '2-digit'},
            gardener: ""
        }
    },
    props: {
        gardener: {
            required:true
        },
        from: {
            required: true
        }
    },
    methods: {
        getMaintenancesFrom: function (from) {
            axios.get(DBURL + "/maintenances/" + from + "/" + this.$route.params.id)
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
        getGardener: function () {
            return this.$props.gardener
        },
        initializeActiveAdd: function () {
            for (let i= 0 ; i < this.timeslots.length; i++){
                this.activeAdd[i] = []
                for (let j= 0 ; j < this.weekDates.length; j++){
                    this.activeAdd[i][j] = false
                }
            }
        },
        getMaintsInTimeSlot: function (timeslot, date) {
            return this.maintenances.filter(m => m.startTime.getDate() == date.getDate())
                .filter(m => (timeslot.getHours() >= m.startTime.getHours() && timeslot.getHours() <= m.endTime.getHours()));
        },
        checkMaintInTimeslot: function (timeslot, date){
            return this.getMaintsInTimeSlot(timeslot, date).length > 0;
        },
        isFirstMaint: function (timeslot, date) {
            return this.checkMaintInTimeslot(timeslot, date)
                && !this.checkMaintInTimeslot(new Date(new Date(timeslot).setHours(timeslot.getHours() - 1)), date)
        },
        isLastMaint: function (timeslot, date) {
            return this.checkMaintInTimeslot(timeslot, date)
                && !this.checkMaintInTimeslot(new Date(new Date(timeslot).setHours(new Date(timeslot).getHours()+1)), date)
        },
        clickedSlot: function (timeslot, date){
            if (this.checkMaintInTimeslot(timeslot, date)){
                let maint = this.getMaintsInTimeSlot(timeslot, date)[0]
                this.$emit('clicked-maint', maint)
            }
        },
        switchActiveAddOn: function (ti, di){
            let activeTi = this.activeAdd[ti]
            if (!activeTi[di]) {
                activeTi[di] = true
                Vue.set(this.activeAdd, ti, activeTi)
            }
        },
        switchActiveAddOff: function (ti, di){
            let activeTi = this.activeAdd[ti]
            if (activeTi[di]){
                activeTi[di] = false
                Vue.set(this.activeAdd, ti, activeTi)
            }
        },
        previousWeek: function () {
            this.weekDates[0].setDate(this.weekDates[0].getDate() - 7)
            this.setWeekDates()
        },
        nextWeek: function () {
            this.weekDates[0].setDate(this.weekDates[0].getDate() + 7)
            this.setWeekDates()
        }
    },
    mounted(){
        this.getMaintenancesFrom(this.$props.from)
        this.setWeekDates()
        this.setTimeSlots()
        this.initializeActiveAdd()
    }
}