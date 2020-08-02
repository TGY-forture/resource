<template>
  <div id="home">
    <Welcome />  
    <p class="title">欢迎来到梦幻之剑信息平台，这里提供每一把刀剑的详细信息，如果你是工厂管理人员，请完成员工认证。</p>
    <div class="hpos">
      <div class="turn">
        <a-carousel autoplay>
          <!-- <img src="@/assets/img/nature-5060531_1280.png" alt="logo">
          <img src="@/assets/img/trees-5014662_1280.png" alt="logo">
          <img src="@/assets/img/church-5022911_1280.png" alt="logo"> -->
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </a-carousel>
      </div>
      <div class="content">
        <p>本工厂拥有先进的锻造工艺，与传统古法相结合每一个步骤都凝聚着先人智慧。</p>
        <p>我们拥有完善的信息系统，每一把剑都有其身份编号，能随时查询相关信息。</p>
      </div>
    </div>
    <p class="bot">如果你还没有登录，请前去<span @click="toLog">登录</span></p>
    <div class="ask">
      <a-popover placement="top">
        <template slot="content">
          <p>1981472184</p>
        </template>
        <template slot="title">
          <span>QQ</span>
        </template>
        <a-icon type="qq" style="fontSize:25px" />
      </a-popover>
      <a-popover placement="top">
        <template slot="content">
          <p>18361812729</p>
        </template>
        <template slot="title">
          <span>Phone</span>
        </template>
        <a-icon type="phone" style="fontSize:25px;margin: 0 50px" />
      </a-popover>
      <a-popover placement="top">
        <template slot="content">
          <p>nulibianqiango</p>
        </template>
        <template slot="title">
          <span>WeChat</span>
        </template>
        <a-icon type="message" style="fontSize:25px" />
      </a-popover>
    </div>
  </div>
</template>

<script>
import Welcome from './welcome'
export default {
  name: 'Home',
  components: {
    Welcome
  },
  methods: {
    toLog() {
      this.$router.push({name: 'log'})
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-carousel {
  width: 400px;
  ::v-deep .slick-slide {  //v::deep深度作用（/deep/,>>>）
    text-align: center;
    height: 250px;
    line-height: 250px;
    background: #364d79;
    h3 {
      color: #fff;
    }
  }
}
p[class="title"] {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}
.hpos {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .content {
    p {
      font-size: 20px;
      font-weight: bold;
      text-indent: 2em;
      width: 300px;
    } 
  }
}
.bot {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  span {
    color: #0984e3;
    cursor: pointer;
  }
}
.ask {
  width: 100%;
  position: absolute;
  bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>