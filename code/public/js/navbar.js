const Navbar = {
    template: `
        <nav class="navbar px-2">
            <div id="logo-container" class="col-xxl-7 col-lg-4 col-sm-12 col-12">
                <a href="#" id="main-title">
                    <img src="/static/img/GardenCareSmall.png" alt="GardenCare Logo">
                </a>
            </div>
            <form id="form-login" class="col-xxl-5 col-lg-8 col-sm-12 col-12">
                <div class="row mx-0 align-items-center">
                    <div class="col input-group input-group-sm">
                        <input id="user" class="form-control" placeholder="User" type="text" alt="Username"/>
                    </div>
                    <div class="col input-group input-group-sm">
                        <input id="password" class="form-control" placeholder="Password" type="password" alt="Password"/>
                    </div>
                    <div id="form-button-container" class="col">
                        <button class="btn btn-success rounded-pill">Login</button>
                        <button class="btn btn-success rounded-pill">Registrati</button>
                    </div>
                </div>
            </form>
        </nav>
    `
}
