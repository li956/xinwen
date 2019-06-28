import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
//引入lodash
import _ from 'lodash'
Vue.prototype._ = _
//引入懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  error:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2216208700,2020871444&fm=27&gp=0.jpg',
  loading:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=532061903,274890027&fm=117&gp=0.jpg'
})

Vue.config.productionTip = false
Vue.filter('newtime',function(value){
  var create_time = isNaN(value) ? value.getTime() : value;
  return moment(create_time).format("YYYY-MM-DD HH:mm:ss");
})
new Vue({
  el:"#app",
  router,
  store,
  render: h => h(App)
})
