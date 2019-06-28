import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Regist from './views/Regist.vue'
import Alterpwd from './views/Alterpwd.vue'
import NewsList from './views/NewsList.vue'
import NewsDetails from './views/NewsDetails.vue'
import MyAccount from './views/MyAccount.vue'
import Setting from './views/Setting.vue'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/regist',
      component:Regist
    },
    {
      path:'/alterpwd',
      component:Alterpwd
    },
    {
      path:'/newslist',
      component:NewsList
    },
    {
      path:'/newsdetails/:id',
      component:NewsDetails
    },
    {
      path:'/setting',
      component:Setting
    },
    {
      path:'/myaccount',
      component:MyAccount
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})