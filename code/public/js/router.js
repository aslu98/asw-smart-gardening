const DBURL = "http://localhost:3000/api"

const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name:'Home', component: Home },
      { path: '/gardener-board/:id', name:'Gardener', component: GardenerBoard },
      { path: '/garden-info/:id', name: 'Garden', component: GardenInfo },
      { path: '/404', component: NotFound },  
      { path: '*', redirect: '/404' }
    ]
})

  