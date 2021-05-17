const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name:'Home', component: Home },
      { path: '/gardens', name: 'Gardens', component: Gardens },
        { path: '/sensors', name: 'Sensors', component: Sensors },
      { path: '/404', component: NotFound },  
      { path: '*', redirect: '/404' }
    ]
  })
  