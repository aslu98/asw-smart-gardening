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
                        <input id="userLogin" v-model="usernameLogin" class="form-control" placeholder="User" type="text" alt="Username"/>
                    </div>
                    <div class="col input-group input-group-sm">
                        <input id="passwordLogin" v-model="passwordLogin" class="form-control" placeholder="Password" type="password" alt="Password"/>
                    </div>
                    <div id="form-button-container" class="col">
                        <input type="submit" value="Login" class="btn btn-success rounded-pill"/>
                        <a href="/registration-form" class="btn btn-success rounded-pill">Registrati</a>
                    </div>
                </div>
            </form>
        </nav>
    `,
    data() {
        return {
            usernameLogin: "",
            passwordLogin: "",
            logged: false
        };
    },
    methods: {
        /*async login() {
            const { username, password } = this;
            const res = await fetch(
                "https://SomberHandsomePhysics--five-nine.repl.co/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password })
                }
            );
            const data = await res.json();
            console.log(data);
        },*/
    }
}
