<template>
  <div id="lside">
    <ul>
      <li v-for="item in icon" :key="item.type" class="list" @click="jump(item.path)">
        <a-icon :type="item.type" style="fontSize:24px" />
        <span>{{ item.name }}</span>
      </li>
    </ul>   
  </div>
</template>
<script>
let icon = [
  {
    type: 'home',
    name: '首页',
    path: 'home'
  },
  {
    type: 'search',
    name: '搜索信息',
    path: 'search'
  },
  {
    type: 'plus',
    name: '信息记录',
    path: 'plus'
  },
  {
    type: 'user',
    name: '用户信息',
    path: 'user'
  },
  {
    type: 'safety-certificate',
    name: '权限查看',
    path: 'safety-certificate'
  },
  {
    type: 'question-circle',
    name: '帮助',
    path: 'help'
  }
]
export default {
  data () {
    return {
      icon
    }
  },
  methods: {
    jump(path) {
      this.$router.push(`/${path}`)
    }
  }
};
</script>
<style lang="scss" scoped>
#lside {
  // background-color: #304156;
  border-right: 1px solid #dfe6e9;
  ul {
    padding: 0;
    .list {
      padding: 0 0 0 20px;
      list-style: none;
      height: 60px;
      display: flex;
      align-items: center;
      // border-bottom: 1px solid #dfe6e9;
      span {
        font-size: 14px;
        margin-left: 10px;
      }
      &:hover {
        background-color: #b2bec3;
        cursor: pointer;
      }
    }
  }
}
</style>