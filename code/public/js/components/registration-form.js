const RegistrationForm = {
    template: `   
    <div class="container">
        <div class="d-flex justify-content-center">
            <div class="mt-2 card col-12 col-sm-8 col-md-6 col-xl-5">
                <div class="card-header">
                    <div class="row">
                        <h3 class="text-center">Iscriviti</h3>
                    </div>
                </div>
                <div class="card-body">
                    <form name="subscribe" method="post" @submit.prevent="registerNewGardener">
                        <div class="pb-1">
                            <h5>Informazioni personali</h5>
                            <div class="pb-2">
                                <label class="control-label" for="name">Nome</label>
                                <input type="text" class="form-control form-control-sm" id="name"
                                       placeholder="Nome" name="name" v-model.trim="form.name" required>
                            </div>
                            <div class="pb-2">
                                <label class="control-label" for="surname">Cognome</label>
                                <input type="text" class="form-control form-control-sm" id="surname"
                                       placeholder="Cognome" name="surname" v-model.trim="form.surname" required>
                            </div>
                            <div class="pb-2">
                                <label class="control-label" for="fiscal">Codice Fiscale</label>
                                <input type="text" class="form-control form-control-sm" id="fiscal"
                                       placeholder="Codice Fiscale" name="fiscal" v-model.trim="form.fiscalCode" required>
                            </div>
                            <div class="pb-2">
                                <label class="control-label" for="address">Indirizzo</label>
                                <input type="text" class="form-control form-control-sm" id="address"
                                       placeholder="Indirizzo" name="address" v-model.trim="form.address" required>
                            </div>
                            <div class="pb-2">
                                <label class="control-label" for="telephone">Telefono</label>
                                <input type="tel" class="form-control form-control-sm" id="telephone" :class="{ 'is-invalid': telephoneError }"
                                       placeholder="Telefono" name="tel" v-model.trim="form.telephone" required>
                                <small v-if="telephoneError" class="invalid-feedback alert alert-danger"> {{ telephoneError }} </small>
                            </div>
                        </div>
                        <div class="pt-2">
                            <h5>Credenziali</h5>
                            <div class="pb-2">
                              <label class="control-label" for="user">Nome Utente</label>
                                <input type="text" class="form-control form-control-sm" id="user" :class="{ 'is-invalid': userError }"
                                       placeholder="Nome Utente" name="user" v-model.trim="form.user" required>
                                <small v-if="userError" class="invalid-feedback alert alert-danger"> {{ userError }} </small>
                            </div>
                            <div class="pb-2">
                              <label class="control-label" for="password">Password</label>
                                <input type="password" class="form-control form-control-sm" id="password"
                                       placeholder="Password" name="password" v-model.trim="form.password" required>
                            </div>
                            <div class="pb-2">
                                <label class="control-label" for="password2">Conferma Password</label>
                                    <input type="password" class="form-control form-control-sm" id="password2" :class="{ 'is-invalid': passwordError }"
                                       placeholder="Conferma password" name="password2" v-model.trim="form.password2" required>
                                    <small v-if="passwordError" class="invalid-feedback alert alert-danger"> {{ passwordError }} </small>
                            </div>
                        </div>
                        <div v-if="registrationError || registrationSuccess" class="pt-2 pb-2">
                            <div v-if="registrationError" class="alert alert-danger"> {{ registrationError }} </div>
                            <div v-if="registrationSuccess" class="alert alert-success"> {{ registrationSuccess }} </div>
                        </div>
                        <div class="form-group text-end pt-2">
                            <input type="submit" value="Conferma" class="btn btn-success rounded-pill" :class="{ 'disabled': redirecting}">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            form: {
                name: "",
                surname: "",
                fiscalCode: "",
                address: "",
                telephone: "",
                user: "",
                password: "",
                password2: ""
            },
            telephoneError: "",
            userError: "",
            passwordError: "",
            registrationError: "",
            registrationSuccess: "",
            redirecting: false
        }
    },
    methods: {
        registerNewGardener() {
            let existingError = false;
            this.telephoneError = "";
            this.passwordError = "";
            this.userError = "";
            this.registrationError = "";
            this.registrationSuccess = "";
            if(isNaN(this.form.telephone)) {
                this.telephoneError = "Il numero di telefono non è valido. Inserire un numero di telefono valido (inserire solo numeri)";
                existingError = true;
            }
            if(this.form.password!==this.form.password2) {
                this.passwordError = "Le password non coincidono";
                existingError = true;
            }

            if(this.form.user !== '') {
                axios
                    .get(DBURL + '/registration', {
                        params: {
                            userId: this.form.user
                        }
                    })
                    .then(res => {
                        let existingUser = res.data;
                        if(existingUser) {
                            this.userError = "Nome utente non disponibile";
                        } else if (!existingError){
                            axios
                                .post(DBURL + '/registration', {
                                    params: {
                                        name: this.form.name,
                                        surname: this.form.surname,
                                        telephone: this.form.telephone,
                                        address: this.form.address,
                                        fiscal_code: this.form.fiscalCode,
                                        user_id: this.form.user,
                                        password: this.form.password
                                    }
                                })
                                .then(res => {
                                    let userCreated = res.data;
                                    if(userCreated) {
                                        this.registrationSuccess = "Utente creato con successo, ora verrai reindirizzato alla Home";
                                        this.redirecting = true;
                                        setTimeout(() => {this.$router.push('/')}, 1000)
                                    } else {
                                        this.registrationError = "Errore durante la registrazione, provare più tardi";
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });

            }
        }
    },
    mounted() {
        if (localStorage.user && localStorage.idGardener) {
            this.$router.replace('/').catch(err => {});
        }
    }
}