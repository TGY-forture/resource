import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {
      nickname: '',
      age: 18,
      sex: 'man',
      username: '',
      email: ''
    },
    avatar: null
  },
  getters: {
    
  },
  mutations: {
    initUserinfo(state, value) {
      state.userinfo = value
    },
    initAvatar(state, bloburl) {
      state.avatar = bloburl
    }
  },
  actions: {
    
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production'
})
