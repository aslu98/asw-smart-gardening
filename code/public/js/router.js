const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', name:'Home', component: Home },
      { path: '/gardens', name: 'Gardens', component: Gardens },
        { path: '/querytesting', name: 'querytesting', component: Querytesting },
      { path: '/404', component: NotFound },  
      { path: '*', redirect: '/404' }
    ]
  })
  