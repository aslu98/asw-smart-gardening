const Todo = {
    template:`
      <div class="to-do-template">
      <h6>TO DO</h6>
      <div class="to-do-card green-border">
        <div v-if="nothing"> <p class="empty-card"> Nessuna manutenzione presente! </p> </div>
        <div v-else v-for="maint in maints" class="to-do-maint container text-center px-1">
          <div class="row row-in-containter to-do-date">
            <div class="col-4 px-1"> {{maint.weekday}} </div>
            <div class="col-4 px-1"> {{maint.date}} </div>
            <div class="col-4 px-1"> {{maint.from_to}} </div>
          </div>
          <div class="row">
            <div class="col-12">{{maint.description}}</div>
          </div>
          <hr v-if="maint.last" class="green-hr to-do-hr"/>
        </div>
      </div>
      </div>
    `,
    data(){
        return {
            nothing: true,
            n: 2,
            maints: [],
            weekday_options: {weekday: 'long'},
            date_format: "DD/MM/YYYY",
            from_to_format: "HH:mm"
        }
    },
    props: {'gardenid':{
            required: true}
            },
    watch: {
        gardenid() {
            this.getToDo()
        }
    },
    methods: {
        getToDo: function () {
            if(this.$props.gardenid !== "") {
                axios.get(DBURL + "/maintenances/garden/" + this.$props.gardenid + "/next/" + this.n)
                    .then(response => {
                        if (response.data.length > 0) {
                            this.nothing = false;
                            this.maints = response.data
                            console.log(this.maints)
                            for (let i = 0; i < this.maints.length; i++) {
                                let date = new Date(this.maints[i].startTime)
                                this.maints[i].weekday = date.toLocaleDateString("it-IT", this.weekday_options).toString()
                                this.maints[i].weekday = this.maints[i].weekday[0].toUpperCase() + this.maints[i].weekday.substr(1)
                                this.maints[i].date = date.getDate() + "/" + (parseInt(date.getMonth())+1).toString() + "/" + date.getFullYear()
                                this.maints[i].from_to = date.getHours() + ":00 - "
                                date.setHours(date.getHours() + (this.maints[i].duration))
                                this.maints[i].from_to += date.getHours() + ":00"
                                this.maints[i].last = i != this.maints.length - 1
                            }
                        } else {
                            this.nothing = true;
                        }
                    })
                    .catch(error => {
                        this.nothing = true;
                        console.log(error)
                    });
            }
        },
        init: function(){
            this.getToDo()
        }
    },
    mounted(){
        this.init()
    }
}
