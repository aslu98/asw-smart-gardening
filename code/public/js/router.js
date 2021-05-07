const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name:'Home', component: Home },
      { path: '/movies', name: 'Movies', component: Movies },
      { path: '/404', component: NotFound },  
      { path: '*', redirect: '/404' }
    ]
  })
  