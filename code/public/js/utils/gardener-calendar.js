const GardenerCalendar ={
    template: '<p>GardenerCalendar</p>',
    data() {
        return {
            maintenances: []
        }
    },
    methods: {
        getMaintenances: function () {
            axios.get(DBURL + "/maintenance/gardener" + this.$route.params.id)
                .then(response => {
                    this.maintenances = response.data
                })
                .catch(error => (console.log(error)));
        }
    },
    mounted(){
        this.getMaintenances()
    }
    //quando viene cliccata una maint. deve inviarla al padre
    //inizialmente gli invia
}