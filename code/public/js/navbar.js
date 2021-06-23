const Navbar = {
    template: `
        <nav class="navbar px-2">
            <div id="logo-container" class="col-xxl-7 col-lg-5 col-sm-12 col-12 d-flex align-items-center">
                <input type="button" @click="openMap" value="Home" class="btn btn-success rounded-pill mx-4">
<!--                <i class="fas fa-home fa-3x px-4" @click="openMap" style="cursor: pointer;"></i>-->
                <a href="/" id="main-title">
                    <img src="/static/img/GardenCareSmall.png" alt="GardenCare Logo">
                </a>
            </div>
            <form v-if="!token" id="form-login" method="post" @submit.prevent="login" class="col-xxl-5 col-lg-7 col-sm-12 col-12">
                <div class="row mx-0 align-items-center">
                    <div class="col col-7">
                        <div class="row mx-0">
                            <div class="col input-group input-group-sm ps-0">
                                <input id="userLogin" v-model="usernameLogin" class="form-control" :class="{ 'is-invalid': loginError }"
                                     placeholder="User" type="text" alt="Username" required/>
                            </div>
                            <div class="col input-group input-group-sm pe-0">
                                <input id="passwordLogin" v-model="passwordLogin" class="form-control" :class="{ 'is-invalid': loginError }"
                                     placeholder="Password" type="password" alt="Password" required/>
                            </div>        
                        </div>
                        <div v-if="loginError" class="login-alert-error text-center mt-1"> {{ loginError }} </div>
                    </div>                    
                    <div id="form-button-container" class="col col-5">
                        <input type="submit" value="Login" class="btn btn-success rounded-pill"/>
                        <input type="button" @click="openRegistrationForm" value="Registrati" class="btn btn-success rounded-pill"/>
                    </div>
                </div>
            </form>
            <div v-else class="row col-xxl-5 col-lg-7 col-sm-12 col-12 d-flex justify-content-end mx-0">
                <div class="col-3 text-center">
                    <input type="button" @click="openBoard" value="Manutenzioni" class="btn btn-success rounded-pill">
                </div> 
                <div class="col-3 text-center">
                    <input type="button" value="Logout" @click="logout" class="btn btn-danger rounded-pill">
                </div>
            </div>
        </nav>
    `,
    data() {
        return {
            usernameLogin: "",
            passwordLogin: "",
            loginError: "",
            token: "",
            idGardener: ""
        };
    },
    methods: {
        login() {
            this.loginError = "";
            axios
                .post(DBURL + '/login', {
                    params: {
                            userId: this.usernameLogin,
                            password: this.passwordLogin
                        }
                })
                .then(res => {
                    let isLoginOk = res.data.result;
                    if(isLoginOk) {
                        let token = res.data.token;
                        localStorage.user = token;
                        this.token = token;

                        let id = res.data.id;
                        localStorage.idGardener = id;
                        this.idGardener = id;

                        this.usernameLogin = "";
                        this.passwordLogin = "";
                        this.$router.replace('/').catch(err => {});
                    } else {
                        this.loginError = "Username o password errati";
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        logout() {
            localStorage.user = "";
            this.token = "";
            localStorage.idGardener = "";
            this.idGardener = "";
            this.$router.replace('/').catch(err => {});
        },
        openBoard() {
            if(localStorage.user) {
                this.$router.replace('/gardener-board/' + this.idGardener).catch(err => {});
            }
        },
        openRegistrationForm() {
            this.$router.replace('/registration-form').catch(err => {});
        },
        openMap() {
            this.$router.replace('/').catch(err => {});
        }
    },
    mounted() {
        if (localStorage.user) {
            this.token = localStorage.user;
        }
        if (localStorage.idGardener) {
            this.idGardener = localStorage.idGardener;
        }
    }
}
