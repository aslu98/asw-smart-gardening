const DBURL = "http://localhost:3000/api"

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name:'Home', component: Home },
        { path: '/registration-form', component: RegistrationForm },
        { path: '/gardener-board/:id', name: 'Gardener', component: GardenerBoard },
        { path: '/garden-board/:id', name: 'Garden', component: GardenBoard },
        { path: '/404', component: NotFound },
        { path: '/401', component: Unauthorized },
        { path: '*', redirect: '/404' }
    ]
})

  