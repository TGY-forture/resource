<template>
  <div id="home">
    <Welcome />  
    <p>欢迎来到梦幻之剑信息平台，这里提供每一把刀剑的详细信息，如果你是工厂管理人员，请完成员工认证。</p>
    <div class="content">
       <a-carousel autoplay>
         <div class="slick-slide"><h3>1</h3></div>
         <div class="slick-slide"><h3>2</h3></div>
         <div class="slick-slide"><h3>3</h3></div>
         <div class="slick-slide"><h3>4</h3></div>
       </a-carousel>
    </div>
  </div>
</template>

<script>
import Welcome from './welcome'
export default {
  name: 'Home',
  components: {
    Welcome
  }
}
</script>

<style lang="scss" scoped>
p {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}
</style>