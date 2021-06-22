const AddButton = {
    template: `
        <div class="col-2 vcenter-item">
            <button type="button" class="btn btn-success py-0 px-1 add-btn" data-bs-toggle="modal" :data-bs-target="getModalId()"> + </button>
        </div>
    `,
    props:['modalid'],
    methods: {
        getModalId: function(){
            return "#" + this.$props.modalid;
        }
    }
}