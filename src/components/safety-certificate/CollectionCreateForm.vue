<template>
  <a-modal
    :visible="visible"
    title="填写信息"
    okText="验证"
    cancelText="取消"
    @cancel="() => { $emit('cancel') }"
    @ok="() => { $emit('create') }"
  >
    <a-form
      :form="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-form-item label="姓名">
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: '请输入姓名' }] }]"
        />
      </a-form-item>
      <a-form-item label="请选择公司">
        <a-select
          v-decorator="[
          'company',
          { rules: [{ required: true, message: '请选择公司' }] }
        ]"
        >
          <a-select-option v-for="(item, index) in company" :key="index" :value="item.company">
            {{item.company}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="员工码">
        <a-input v-decorator="['workcode', { rules: [{ required: true, message: '请输入员工号' }] }]"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: "CollectionCreateForm",
  props: ["visible"],
  data() {
    return {
      company: null
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "form_in_modal" });
  },
  created() {
    this.$axios.get('/addinfo').then(
      (res) => {
        if (res.data !== 'fail') {
          this.company = res.data
        }
      }
    ).catch(
      (err) => {
        console.error(err)
      }
    )
  }
};
</script>

<style>
</style>