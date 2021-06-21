const DBURL = "http://localhost:3000/api"

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name:'Home', component: Home },
        { path: '/registration-form', component: RegistrationForm },
        { path: '/gardener-board/:id', name: 'Gardener', component: GardenerBoard },
        { path: '/404', component: NotFound },
        { path: '*', redirect: '/404' }
    ]
})

  