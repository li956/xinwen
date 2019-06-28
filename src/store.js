import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isread:''
  },
  mutations: {
    changeisread(state){
      state.isread=true;
    },
  },
  getters:{
    optisread:function(state){
      return state.isread;
    }
  },
  actions: {

  }
})
