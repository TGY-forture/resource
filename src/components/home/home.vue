<template>
  <div id="home">
    <Welcome />  
    <p class="title">欢迎来到溯源信息平台，这里提供不同产品的详细信息，如果你是工厂管理人员，请完成员工认证。</p>
    <div class="hpos">
      <div class="turn">
        <a-carousel autoplay>
          <img src="@/assets/img/chan.png" alt="logo">
          <img src="@/assets/img/ka.png" alt="logo">
          <img src="@/assets/img/wa.png" alt="logo">
        </a-carousel>
      </div>
      <div class="content">
        <p>本平台拥有安卓App和网站两大平台，给你不一样的体验。</p>
        <p>我们拥有完善的信息系统，每一件产品都有其身份编号，能随时查询相关信息。</p>
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
    <div class="beian">
		 		<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50024302000197">
         <img src="../../assets/img/beian.png" style="float:left;"/>
         <p style="float:left;color:#939393;margin-bottom:0">渝公网安备 50024302000197号</p>
        </a>
        <a href="http://www.beian.miit.gov.cn" style="float:right;color:#939393;">渝ICP备20004410号-1</a>
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
#home {
  .ant-carousel {
    width: 400px;
    ::v-deep .slick-slide {  //v::deep深度作用（/deep/,>>>）
      height: 250px;
      line-height: 250px;
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
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
  .beian {
    width: 400px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: 20px;
  }
}
</style>