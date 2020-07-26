<template>
  <div id="top">
    <p>Fantasy Factory</p>
    <a-input-search placeholder="请输入产品编号" enter-button style="width:300px;margin-right:50px" />     
    <a-avatar size="default" :src="avatar" v-if="true"/>
    <span class="user">{{username}}</span>
    <a-icon type="logout" style="font-size:24px;cursor:pointer" @click="logout"/>
  </div>
</template>

<script>
const avatar = require('../assets/img/bee-5069160_1280.png')
export default {
  name: 'Top',
  data() {
    return {
      
    }
  },
  computed: {
    username() {
      return this.$store.state.userinfo.nickname || '未登录'
    },
    avatar() {
      return this.$store.state.avatar
    }
  },
  methods: {
    logout() {
      this.$axios.put('/log', {username: '18361812729'}).then(
        res => {
          if (res.data === 'ok') {
            this.$message.warning('已下线!')
          } else {
            this.$message.warning('操作失败')
          }
        }
      ).catch(
        err => {
          console.error(err)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
#top {
  padding: 0 20px;
  // background: #95a5a6;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfe6e9;
  p {
    display: inline-block;
    font-size: 28px;
    margin-bottom: 0;
    margin-right: auto;
    cursor: default;
  }
  .user {
    margin-right: 50px;
    margin-left: 10px;
  }
}
</style>