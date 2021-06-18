const Navbar = {
    template: `
        <nav class="navbar px-2">
            <div id="logo-container" class="col-xxl-7 col-lg-4 col-sm-12 col-12">
                <a href="/" id="main-title">
                    <img src="/static/img/GardenCareSmall.png" alt="GardenCare Logo">
                </a>
            </div>
            <form id="form-login" method="post" class="col-xxl-5 col-lg-8 col-sm-12 col-12">
                <div class="row mx-0 align-items-center">
                    <div class="col input-group input-group-sm">
                        <input id="user" v-model="username" class="form-control" placeholder="User" type="text" alt="Username"/>
                    </div>
                    <div class="col input-group input-group-sm">
                        <input id="password" v-model="password" class="form-control" placeholder="Password" type="password" alt="Password"/>
                    </div>
                    <div id="form-button-container" class="col">
                        <input type="submit" value="Login" class="btn btn-success rounded-pill"/>
                        <input type="button" value="Registrati" @click="registerNewGardener" class="btn btn-success rounded-pill">
                    </div>
                </div>
            </form>
        </nav>
    `,
    data() {
        return {
            username: "",
            password: "",
            logged: false
        };
    },
    methods: {
        registerNewGardener() {
            console.log("Registrazione");
        }
    }
}
