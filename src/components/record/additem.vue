<template>
  <a-modal
    :visible="visible"
    title="填写信息"
    @cancel="() => { $emit('cancel') }"
    :footer="null"
  >
    <a-form :form="form" v-bind="formItemLayout" @submit="savehandle">
      <a-form-item label="请选择工序名称">
        <a-select
          mode="default"
          style="width: 100%"
          show-arrow
          label-in-value
          v-decorator="[
            'process',
            {rules: [{required: true, message: '工序不能为空'}]}
          ]"
        >
          <a-select-option v-for="(val, key, index) in sourcedata[0]" :value="key" :key="index">
            {{val}}
          </a-select-option>
        </a-select>
      </a-form-item> 
      <a-form-item label="请选择信息项">
        <a-select
          mode="multiple"
          style="width: 100%"
          show-arrow
          label-in-value
          v-decorator="[
            'items',
            {rules: [{required: true, message: '条目不能为空'}]}
          ]"
        >
          <a-select-option v-for="(val, key, index) in sourcedata[1]" :value="key" :key="index">
            {{val}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-for="(item) in createdata" :key="item.key" :label="item.label">
        <a-input v-decorator="[item.key, {rules: [{required: true, message: '值不能为空'}]}]"></a-input>
      </a-form-item>
      <a-form-item class="pos-btn">
        <a-button type="dashed" html-type="button" @click="createitems" style="margin-right: 30px">
          添加
        </a-button>
        <a-button type="primary" html-type="submit">
          保存
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: "AddItem",
  props: {
    visible: Boolean,
    sourcedata: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      createdata: null,
      formItemLayout: {
        labelCol: {
          sm: { span: 8 },
        },
        wrapperCol: {
          sm: { span: 16 },
        }
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' });
  },
  watch: {
    sourcedata: function (newval, oldval) {
      for(let key in this.sourcedata[1]) {
        if (key === 'id' || key === 'seq') {
          this.$delete(this.sourcedata[1], key)
        }
      }
    }
  },
  methods: {
    createitems() {
      this.form.validateFields(['items', 'process'],(err, values) => {
        if (!err) {
          this.createdata = values.items
        }
      })
    },
    savehandle(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          delete values.items
          delete values.process
          this.$axios.post('/record', {...values, dbname: 'ship', seq: '12345678'}).then(
            (res) => {
              if (res.data === 'ok') {
                this.$message.success('保存成功')
                this.$emit('cancel')
              } else {
                this.$message.success('保存失败')
              }
            }
          ).catch(
            (err) => {
              console.error(err)
            }
          )
        }
      })
    }
  }
};
</script>

<style lang="scss">
.pos-btn {
  display: flex;
  justify-content: center;
  .ant-form-item-control {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>