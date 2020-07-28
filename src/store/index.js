import Vue from 'vue'
import Vuex from 'vuex'
import {axios} from '@/assets/js/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {
      nickname: 'hello world',
      age: 18,
      sex: 'woman',
      username: '',
      email: ''
    },
    companyinfo: {},
    copyinfo: null,
    avatar: '',
    stranger: true,
    name: null
  },
  getters: {
    nickname(state) {
      return state.userinfo.nickname;
    },
    username(state) {
      return {username: state.userinfo.username}
    },
    commonuser(state) {
      return state.userinfo.username
    },
    company(state) {
      return state.companyinfo.company
    },
    name(state) {
      return state.copyinfo.name
    }
  },
  mutations: {
    initUserinfo(state, value) {
      for (let key in state.userinfo) {
        state.userinfo[key] = value[key]
      }
      state.copyinfo = value
    },
    initAvatar(state, bloburl) {
      state.avatar = bloburl
    },
    resetUserinfo(state, value) {
      state.userinfo = value
    },
    initCompanyinfo(state, value) {
      state.companyinfo = value.data
      state.stranger = false
    },
    resetRootinfo() {
      let sourcedata = {
        userinfo: {nickname: 'hello world',age: 18,sex: 'woman',username: '',email: ''},
        company: {},
        copyinfo: {},
        avatar: '',
        stranger: true,
        name: null
      }
      this.replaceState(sourcedata)
    }
  },
  actions: {
    getAvatar({state, commit}) {
      axios.get('/user', {params: {username: state.userinfo.username}, responseType: "blob"}).then(
        (res) => {
          if (res.data) {
            let src = window.URL.createObjectURL(res.data)
            commit('initAvatar', src)
          }
        }
      ).catch(
        (err) => {
          console.error(err)
        }
      )
    },
    getCompanyinfo({commit, state}) { //待改写
      console.log(state.copyinfo.company)
      axios.get('/addinfo/all', {params: {company: state.copyinfo.company}}).then(
        res => {
          if (res.data !== 'fail') { 
            commit({type: 'initCompanyinfo', data: res.data})
            return axios.get('/log')
          }
        }
      ).then(
        (res) => {
          if (res && res.data !== 'fail') {
            commit('initUserinfo', res.data)
          }
        }
      ).catch(
        err => {
          console.error(err)
        }
      )
    }
  },
  modules: {

  },
  strict: process.env.NODE_ENV !== 'production'
})
