const MAX = 10;
const GardensInNeed = {
    template: `
		<div class="garden-card">
		    <p>{{gardens[0].name}}</p>
		</div>
	`,
    data() {
        return {
            gardens:[]
        }
    },
    methods:{
        getGardensInNeed: function(){
            axios.get(DBURL +'/gardens-in-need/' + MAX)
                .then(response => {
                    this.gardens = response.data
                })
                .catch(error => (console.log(error)));
        }
    },
    mounted() {
        this.getGardensInNeed()
    }
}