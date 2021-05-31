const Navbar = {
    template: `
        <nav class="navbar px-2">
            <div class="col-xxl-4"></div>
            <div class="col-xxl-4 col-md-6 col-sm-12 text-center">
                <a href="#" id="main-title">
                    <img src="/static/img/GardenCareSmall.png" alt="GardenCare Logo">
                </a>
            </div>
            <form class="col-xxl-4 col-md-6 col-sm-12">
                <div class="row mx-0 align-items-center">
                    <div class="col input-group input-group-sm">
                        <input id="user" class="form-control" placeholder="User" type="text" alt="Username"/>
                    </div>
                    <div class="col input-group input-group-sm">
                        <input id="password" class="form-control" placeholder="Password" type="password" alt="Password"/>
                    </div>
                    <div class="col">
                        <button class="btn btn-success rounded-pill">Login</button>
                        <button class="btn btn-success rounded-pill">Registrati</button>
                    </div>
                </div>
            </form>
        </nav>
    `
}
