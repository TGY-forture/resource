<template>
  <div id="steptwo">
    <a-form :form="form" :labelCol="{ span: 10 }" class="steptwo-form">
      <a-form-item label="模具">
        <a-input allow-clear></a-input>
      </a-form-item>
      <a-form-item label="模具设计人">
        <a-input allow-clear></a-input>
      </a-form-item>
      <a-form-item label="浇筑人员">
        <a-input allow-clear></a-input>
      </a-form-item>
      <a-form-item label="冶炼人员">
        <a-input allow-clear></a-input>
      </a-form-item>
      <a-form-item label="打磨人员">
        <a-input allow-clear></a-input>
      </a-form-item>
    </a-form>
    <a-button class="plus-btn" type="default" html-type="button">保存</a-button>
  </div>
</template>

<script>
export default {
  name: 'StepTwo',
  beforeCreate() {
    this.form = this.$form.createForm('this', {name: 'plus-two'})
  }
}
</script>

<style lang="scss">
#steptwo {
  .steptwo-form {
    .ant-form-item {
      display: flex;
    }
  }
}
</style>