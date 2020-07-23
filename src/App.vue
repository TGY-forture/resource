<template>
  <div id="app">
    <Top class="top" />
    <Lside class="lside" />   
    <Rside class="rside">
      <router-view></router-view>
    </Rside>
  </div>
</template>
<script>
import Top from './views/Top'
import Lside from './views/Lside'
import Rside from './views/Rside'
import {docCookies} from './assets/js/cookie'

export default {
  name: 'App',
  components: {
    Top,
    Lside,
    Rside
  },
  mounted
}
function mounted() {
  let username = docCookies.getItem('username')
  let remember = docCookies.getItem('remember')
  if (username && remember) {
    //初始化用户数据
    this.$axios.put('/index', {islog: 'active', username}).then(
      (res) => {
        if (res.data === 'ok') {
          return this.$axios.get('/index', {params: {username}})
        } else {
          return Promise.reject('server error')
        }
      }
    ).then(
      (res) => {
        if (res.data === 'server error') {
          this.$message.error('server fail!')
        } else {
          this.$store.state.initdat = res.data
        }
      }
    ).catch(
      err => {
        console.error(err)
    })
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  .top {
    grid-row: 1 / 2;
    grid-column: 1 / 11;
  }
  .lside {
    grid-area: 2 / 1 / 11 / 2;
  }
  .rside {
    grid-area: 2 / 2 / 11 / 11;
    position: relative;
  }
}
</style>
