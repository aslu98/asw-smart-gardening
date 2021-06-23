const GardenCard = {
    template:
        `
            <div class="row">
                <div class="col-10">
                    <h5 class="card-title text-center"> {{ this.$props.garden.name }}</h5>
                    <p class="card-text text-center"> {{ this.$props.garden.city }} </p>
                </div>
                <div class="col-2 garden-info-back">
                    <i class="far fa-times-circle fa-2x clickable" @click="hideInfo"></i>
                </div>
            </div>
        `,
    props:['garden'],
    methods: {
        hideInfo() {
            this.$emit('hide-info');
        }
    }
}