<template>
  <a-modal
    :visible="visible"
    title="填写信息"
    okText="验证"
    cancelText="取消"
    @cancel="() => { $emit('cancel') }"
    @ok="() => { $emit('create') }"
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="姓名">
        <a-input v-decorator="['username',{rules:[{required: true,message: '请填写姓名'}]}]" />
      </a-form-item>
      <a-form-item label="公司">
        <a-select
          style="width: 200px"
          v-decorator="['usermat',{rules:[{required: true}],initialValue: 'mat'}]"
        >
          <a-select-option value="mat">材料负责人</a-select-option>
          <a-select-option value="process">加工负责人</a-select-option>
          <a-select-option value="quality">质检责任人</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="员工认证码">
        <a-input v-decorator="['usercode',{rules:[{required: true,message: '请填写员工码'}]}]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: "CollectionCreateForm",
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form_in_modal" });
  }
};
</script>

<style>
</style>