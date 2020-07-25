import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initdat: null,
    userinfo: null
  },
  getters: {
    
  },
  mutations: {
    initUserinfo(state, value) {
      state.userinfo = value
    }
  },
  actions: {
    
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production'
})
