<template>
  <div id="help">
    <a-form :form="form" :labelCol="{span: 10}">
      <a-form-item label="用户名">
        <a-input allow-clear></a-input>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input allow-clear></a-input>
      </a-form-item>
      <a-form-item label="验证码">
        <a-input allow-clear></a-input>
        <a-button html-type="button" style="margin-left:30px">发送验证码</a-button>
      </a-form-item>
    </a-form>
    <a-button style="display:block;margin:20px auto" type="primary" html-type="submit">找回密码</a-button>
  </div>
</template>

<script>
export default {
  name: 'Help',
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'help'})
  }
}
</script>

<style lang="scss">
#help .ant-form {
  margin-top: 140px;
  .ant-form-item {
    .ant-input {
      width: 220px;
    }
  }
}
</style>