const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name:'Home', component: Home },
      { path: '/garden-info/:id', name: 'Garden', component: GardenInfo },
      { path: '/404', component: NotFound },  
      { path: '*', redirect: '/404' }
    ]
})

  