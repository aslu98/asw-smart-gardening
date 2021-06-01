const Todo = {
    template:`
		<div class="to-do-template">
			<h6>TO DO</h6>
				<div class="to-do-card green-border">
					<div v-if="nothing"> <p class="empty-card"> Nothing to do! </p> </div>
					<div v-else v-for="maint in maints" class="to-do-maint text-center">
						<div class="row to-do-date">
							<div class="col-4"> {{maint.weekday}} </div>
							<div class="col-4"> {{maint.date}} </div>
							<div class="col-4"> {{maint.from_to}} </div>
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
            nothing: false,
            gardenID: this.$route.params.id,
            n: 2,
            maints: [],
            weekday_options: {weekday: 'long'},
            date_format: "DD/MM/YYYY",
            from_to_format: "HH:mm"
        }
    },
    methods: {
        getToDo: function () {
            axios.get(DBURL + "/maintenances/garden/" + this.gardenID + "/next/" + this.n)
                .then(response => {
                    this.nothing = false;
                    this.maints = response.data
                    for (let i = 0; i < this.maints.length; i++) {
                        let date = new Date(this.maints[i].startTime)
                        this.maints[i].weekday = date.toLocaleDateString("it-IT", this.weekday_options).toString()
                        this.maints[i].weekday = this.maints[i].weekday[0].toUpperCase() + this.maints[i].weekday.substr(1)
                        this.maints[i].date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
                        this.maints[i].from_to = date.toISOString().substr(11,5) + " - "
                        date.setMinutes(date.getMinutes() + (this.maints[i].duration))
                        this.maints[i].from_to += date.toISOString().substr(11,5)
                        this.maints[i].last = i != this.maints.length - 1
                    }
                })
                .catch(error => {
                    this.nothing = true;
                    console.log(error)
                });
        },
        init: function(){
            this.getToDo()
        }
    },
    mounted(){
        this.init()
    }
}