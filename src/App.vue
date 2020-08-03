<template>
  <div id="app">
    <Top class="top" />
    <Lside class="lside" />
    <Rside class="rside">
      <keep-alive include="Search">  <!--和 transition 使用时 transition 放在外面-->
        <router-view></router-view>
      </keep-alive>
    </Rside>
  </div>
</template>
<script>
import Top from "./views/Top";
import Lside from "./views/Lside";
import Rside from "./views/Rside";
import { docCookies } from "./assets/js/cookie";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Top,
    Lside,
    Rside,
  },
  mounted,
  methods: {
    ...mapMutations(["initUserinfo"]),
    ...mapActions(["getAvatar", "getCompanyinfo"]),
  },
};
function mounted() {
  //用户已经登录时点击浏览器刷新按钮时重新加载数据到vuex
  let username = docCookies.getItem("username");
  if (username) {
    //初始化用户数据
    this.$axios.get("/log", { params: { username } }).then(
      (res) => {
        if (res.data !== "fail") {
          this.initUserinfo(res.data);
          this.getAvatar();
          this.getCompanyinfo();
        }
      }).catch(
        (err) => {
        console.error(err);
      });
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