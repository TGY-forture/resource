<template>
  <div id="top">
    <p>Fantasy Factory</p>
    <a-input-search placeholder="请输入产品编号" enter-button style="width:300px;margin-right:50px" />     
    <a-avatar size="default" icon="user" />
    <span class="user">采蘑菇的小菇凉</span>
    <a-icon type="logout" style="font-size:24px" />
  </div>
</template>

<script>
export default {
  name: 'Top'
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