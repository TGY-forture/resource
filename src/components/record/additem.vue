<template>
  <a-modal
    :visible="visible"
    title="填写信息"
    okText="保存"
    cancelText="取消"
    @cancel="() => { $emit('cancel') }"
    @ok="() => { $emit('create') }"
  >
    <a-form :form="form">
      <a-form-item 
        label="工序名称"
        v-bind="formItemLayout"
      >
        <a-input 
          allow-clear 
          style="width: 60%" 
          v-decorator="[
            'processname',
            { rules: [{ required: true, message: '请输入工序名称' }] }
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="请输入条目项" v-bind="formItemLayout">
        <a-input 
          placeholder="不同条目项以一个空格分隔" 
          v-decorator="[
            'labelitems',
            { rules: [{ required: true, message: '请输入条目项' }] }
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item 
        v-for="(item, index) in processing" 
        :key="index" 
        :label="item"
        v-bind="formItemLayout"
      >
        <a-input 
          allow-clear 
          v-decorator="[
          `item${index + 1}`,
          { rules: [{ required: true, message: '值不能为空' }] }
          ]"
          style="width: 60%"
        >
        </a-input>
      </a-form-item>
      <a-form-item v-bind="{wrapperCol: {sm: { span: 20, offset: 6 }}}">
        <a-button type="dashed" style="width: 60%" @click="add">
          <a-icon type="plus" />添加
        </a-button>
      </a-form-item>      
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: "AddItem",
  props: ["visible"],
  data() {
    return {
      processing: null,
      formItemLayout: {
        labelCol: {
          sm: { span: 6 },
        },
        wrapperCol: {
          sm: { span: 18 },
        }
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' });
  },
  methods: {
    add() {
      let data = this.form.getFieldValue('labelitems')
      if (!data) return
      this.processing = data.trim().split(' ')
    }
  }
};
</script>

<style lang="scss">
</style>