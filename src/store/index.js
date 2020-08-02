import Vue from 'vue'
import Vuex from 'vuex'
import {axios} from '@/assets/js/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {
      nickname: 'Hello',
      age: 18,
      sex: 'woman',
      username: '',
      email: ''
    },
    companyinfo: {},
    copyinfo: {
      company: ''
    },
    avatar: ''
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
      return state.copyinfo.company
    },
    name(state) {
      return state.copyinfo.name
    },
    stranger(state) {
      return state.copyinfo.company == '' ? true : false
    },
    companyinfo(state) {
      return state.companyinfo
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
    },
    resetRootinfo() {
      let sourcedata = {
        userinfo: {nickname: 'Hello',age: 18,sex: 'woman',username: '',email: ''},
        companyinfo: {},
        copyinfo: {
          company: ''
        },
        avatar: ''
      }
      this.replaceState(sourcedata)
    },
    addInfo(state, data) {
      state.copyinfo.name = data.name 
      state.copyinfo.company = data.company 
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
    getCompanyinfo({commit, state}) {
      if (!state.copyinfo.company) return  //用户未完成员工认证则不获取工厂数据
      axios.get('/addinfo/all', {params: {company: state.copyinfo.company}}).then(
        (res) => {
          if (res.data !== 'fail') {
            commit({type: 'initCompanyinfo', data: res.data})
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
    product: {
      namespaced: true,
      state: () => ({
        proinfo: {},      //工序名称
        fields: {},       //工序对应字段名
        fieldsvalue: {},  //字段对应值
        steps: [],        //步骤信息,
        havedone: 0       //当前已完成的工序
      }),
      mutations: {
        injectdata(state, value) {      //模块中接收 mutations 的 state 为局部的 state
          state.proinfo = value[0][0]  //每道工序名称
            let items = value[0][1]      //每道工序所需添加信息对应的字段名
            for(let key in items) {         //将字段名拆分为数组
              items[key] = items[key].split('&')
            }
            state.fields = items;
            state.fieldsvalue = value[1]
        },
        flashsteps(state, data) {
          state.steps = data.sort((previous, after) => {
            if (previous.id < after.id) {
              return -1
            } else if (previous.id > after.id) {
              return 1
            } else {
              return 0
            }
          })
        },
        setHavedone(state, value) {
          state.havedone = value
        },
        clearSteps(state) {
          state.steps = []
        }
      },
      actions: {
        getProinfo({rootGetters, commit}) {
          axios.get("/record", {
            params: {
              tablename: rootGetters.companyinfo.tablename,
              totalprocess: rootGetters.companyinfo.totalprocess,
              company: rootGetters.companyinfo.company,
            }
          })
          .then((res) => {
            if (res.data) {
              commit('injectdata', res.data)
            }
          })
          .catch((err) => {
            console.error(err);
          });
        },
        getFlashValue({commit, rootGetters}, seq) {
          axios.get('/record/data', {params: {seq, company: rootGetters.company}}).then(
            (res) => {
              if (res.data !== 'fail') {
                commit('flashsteps', res.data)
              }
            }
          ).catch(
            (err) => {
              console.error(err)
            }
          )
        },
        dataCRUD({rootState, rootGetters}, additional) {
          let stateval = {
            table: rootState.companyinfo.tablename,
            seq: additional.seq,
            name: rootGetters.name,
            action: additional.action,
            date: new Date().toLocaleDateString(),
            company: rootGetters.company
          }
          return axios.post('/record',{values: additional.values, stateval})
        },
        getHavedone({commit, rootGetters}, seq) {
          axios.get('/record/pronum', {params: {seq, tablename: rootGetters.companyinfo.tablename}}).then(
            res => {
              if (res.data !=='fail') {
                commit('setHavedone', res.data.havedone)
              } else {
                console.error('can not get "havecode"!')
              }
            }
          ).catch(
            err => {
              console.error(err)
            }
          )
        }
      }
    },
    search: {
      namespaced: true,
      state: () => ({
        totalcompany: []
      }),
      mutations: {
        init(state, value) {
          state.totalcompany = value
        }
      },
      actions: {
        pullData({commit}) {
          axios.get('/search').then(
            res => {
              commit('init', res.data)
            }
          ).catch(
            err => {
              console.error(err)
            }
          )
        }
      }
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
