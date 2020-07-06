<template>
  <div id="u-user">
    <div class="user-head">
      <img style="width: 200px;height:200px" src="../../assets/img/nature-5060531_1280.png" />
    </div>
    <div class="user-body">
      <a-form>
        <a-form-item label="用户名">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="昵称">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="年龄">
          <a-input-number id="inputNumber" :min="18" :max="50" />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-model="value" @change="onChange">
            <a-radio value="man">
              男
            </a-radio>
            <a-radio value="woman">
              女
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <a-button type="primary" disabled>保存</a-button>
      <a-button type="primary">修改</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      value: 'man'
    }
  },
  methods: {
    onChange(e) {
      console.log('radio checked', e.target.value);
    }
  }
}
</script>

<style lang="scss">
#u-user {
  height: 100%;
  .user-head {
    float: left;
    height: 100%;
    width: 50%;
    text-align: center;
    img {
      border-radius: 50%;
      cursor: pointer;
    }
    &::before {
      content: '';
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .user-body {
    float: left;
    padding-top: 20px;
    .ant-form-item {
      margin-bottom: 0;
      .ant-input {
        width: 300px;
      }
    }
    .ant-btn {
      margin-top: 20px;
      margin-right: 30px;
    }
  }
}
</style>