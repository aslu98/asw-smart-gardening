const DBURL = "http://localhost:3000/api"

const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/404', component: NotFound },  
      { path: '*', redirect: '/404' }
    ]
})

