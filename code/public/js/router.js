const DBURL = "http://localhost:3000/api"

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/calendar/:id', name: 'GardenerCalendar', component: GardenerCalendar },
      { path: '/gardener-board/:id', name: 'Gardener', component: GardenerBoard },
      { path: '/404', component: NotFound },  
      { path: '*', redirect: '/404' }
    ]
})

  