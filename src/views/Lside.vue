<template>
  <div id="lside">
    <ul>
      <li v-for="item in icon" :key="item.type" class="list">
        <a-icon :type="item.type" style="fontSize:28px" />
        <span>{{ item.name }}</span>
      </li>
    </ul>   
  </div>
</template>
<script>
let icon = [
  {
    type: 'home',
    name: '首页'
  },
  {
    type: 'search',
    name: '搜索信息'
  },
  {
    type: 'plus',
    name: '添加信息'
  },
  {
    type: 'edit',
    name: '更改信息'
  },
  {
    type: 'user',
    name: '用户信息'
  },
  {
    type: 'safety-certificate',
    name: '权限管理'
  }
]
export default {
  data () {
    return {
      icon
    }
  },
  methods: {
    
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