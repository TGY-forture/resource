<template>
  <div id="top">
    <p>Fantasy Factory</p>
    <!-- <a-input-search placeholder="请输入产品编号" enter-button style="width:300px;margin-right:50px" />      -->
    <a-avatar size="default" :src="avatar" style="cursor: pointer" />
    <span class="user">{{ nickname }}</span>
    <a-icon
      type="logout"
      style="font-size: 24px; cursor: pointer"
      @click="logout"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "Top",
  computed: {
    ...mapGetters(["nickname"]),
    ...mapState(["avatar", "userinfo"]),
  },
  methods: {
    ...mapMutations(["resetRootinfo"]),
    logout() {
      if (this.userinfo.username == "") return;
      this.$axios
        .put("/log", { username: this.userinfo.username })
        .then((res) => {
          if (res.data === "ok") {
            this.$message.warning("已下线!");
            if (this.$route.name !== "home") {
              this.$router.push("/home");
            }
            this.resetRootinfo(); //替换 vuex根节点, 影响了 search模块, bug已解决
          } else {
            this.$message.warning("操作失败");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#top {
  padding: 0 20px;
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
    margin-right: 20px;
    margin-left: 10px;
  }
}
</style>