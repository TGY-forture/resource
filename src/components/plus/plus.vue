<template>
  <div id="plus">
    <div class="up-index" v-show="true">
      <a-input placeholder="请输入产品编号" allow-clear class="pu-inp" />
      <a-button html-type="button" :loading="loading" @click="chan">确定</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "plus",
  data() {
    return {
      loading: false,
      current: 0,
      stepStyle: {
        marginBottom: "60px",
        boxShadow: "0px -1px 0 0 #e8e8e8 inset",
      }
    };
  },
  beforeCreate() {
    // this.$router.push({name: 'stepone'})
  },
  methods: {
    chan() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$message.success("操作成功!");
        this.$router.push({name: 'record'})
      }, 2000);
    },
    changeStep(current) {
      if (current == 0) {
        this.$router.push({name: 'stepone'})
      } else if (current == 1) {
        this.$router.push({name: 'steptwo'})
      } else if (current == 2) {
        this.$router.push({name: 'stepthree'})
      }
    }
  },
};
</script>

<style lang="scss">
#plus {
  width: 100%;
  height: 100%;
  .up-index {
    text-align: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .pu-inp {
      width: 300px;
      height: 40px;
      margin-right: 20px;
    }
  }
}
</style>
