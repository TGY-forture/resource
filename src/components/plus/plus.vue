<template>
  <div id="plus">
    <div class="up-index" v-show="false">
      <a-input placeholder="请输入产品编号" allow-clear class="pu-inp" />
      <a-button html-type="button" :loading="loading" @click="chan">确定</a-button>
    </div>
    <div class="u-step">
      <a-steps
        v-model="current"
        type="navigation"
        size="small"
        :style="stepStyle"
      >
        <a-step
          title="step1"
          status="process"
          description="This is a description."
          :disabled='false'
        />
        <a-step
          title="Step 2"
          status="waitting"
          description="This is a description."
          :disabled="false"
        />
        <a-step
          title="Step 3"
          status="wait"
          description="This is a description."
          :disabled="false"
        />
      </a-steps>
    </div>
    <router-view></router-view>
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
    console.log('dsb')
  },
  methods: {
    chan() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$message.success("操作成功!");
      }, 2000);
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
  .u-form {
    .ant-form-item {
      display: flex;
      .ant-input-affix-wrapper {
      width: 250px;
    }
    }
  }
  .plus-btn {
    display: block;
    margin: 0 auto;
  }
}
</style>
