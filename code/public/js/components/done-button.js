const DoneButton = {
    template: `
        <div :class="{'disabled-div':isDisabled()}">
            <button type="button" class="btn btn-success p-1 py-0 mt-1" :class="{'disabled':isDisabled()}" @click="maintDone"> ✓ </button>
        </div>
    `,
    props: {
        maint:{},
        disabled:{default: false}
    },
    methods: {
        maintDone: function() {
            axios.get(DBURL + "/maintenances/" + this.$props.maint._id + "/done")
                .then(
                    this.$emit('maint-done')
                )
                .catch(error => (console.log(error)));
        },
        isDisabled: function (){
            return this.$props.disabled
        }
    }
}