const AddButton = {
    template: `
        <div class="col-2 vcenter-item">
            <button type="button" class="btn btn-success py-0 px-1 add-btn" data-bs-toggle="modal" data-bs-target="#addMaint"> + </button>
   
        <div class="modal fade" id="addMaint" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"> Crea manutenzione</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ciao
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Chiudi</button>
                <button type="button" class="btn btn-success"> Salva</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    `
}