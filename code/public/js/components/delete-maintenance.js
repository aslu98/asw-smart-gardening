const DeleteMaintenance = {
    template: `
      <div class="delete-maint">
          <div class="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
               aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-body">
                    <p> Confermi di voler cancellare la manutenzione? </p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"> NO</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="deleteMaintenance()"> SI </button>
                  </div> 
              </div>
            </div>
          </div>
      </div>
    `,
    props: ['maint'],
    methods: {
        deleteMaintenance: function () {
            axios.delete(DBURL + "/maintenance/" + this.$props.maint._id)
                .then(r => {
                    if (r.data.deletedCount == 1){
                        let maint = this.$props.maint
                        this.$emit("delete-maint", maint)
                    }
                })
                .catch(error => (console.log(error)));
        }
    }
}