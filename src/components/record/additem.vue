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
          @change="changeFields"
        >
          <a-select-option v-for="(val, key) in proinfo" :value="key" :key="key">
            {{val}}
          </a-select-option>
        </a-select>
      </a-form-item> 
      <a-form-item v-for="(val, key) in partfields" :key="key" :label="val">
        <a-input style="width: 100%" v-decorator="[key, {rules: [{required: true, message: '值不能为空'}]}]"></a-input>
      </a-form-item>
      <a-form-item class="pos-btn">
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
    proinfo: {
      type: Object,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    fieldsvalue: {
      type: Object,
      required: true
    },
    steps: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          sm: { span: 8 },
        },
        wrapperCol: {
          sm: { span: 16 },
        }
      },
      partfields: {}
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' });
  },
  methods: {
    savehandle(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          for (let val of this.steps) {
            if (val.process === values.process.key) {
              this.$message.warning('当前工序已添加')
              return 
            }
          }
          let stateval = {
            table: this.$store.state.companyinfo.tablename,
            seq: this.$route.query.seq,
            name: this.$store.state.copyinfo.name,
            action: 'add',
            date: new Date().toLocaleDateString(),
            company: this.$store.state.copyinfo.company
          }
          this.$axios.post('/record/add',{values, stateval}).then(
            res => {
              if (res.data === 'ok') {
                this.$message.info('信息已保存')
                this.$emit('refresh')
                this.$emit('cancel')
              } else if (res.data === 'fail') {
                this.$message.error('操作失败')
              }
            }
          ).catch(
            err => {
              console.error(err)
            }
          )
        }
      })
    },
    changeFields(value) {
      let data = this.fields[value.key] //数组
      let variable = {}
      for(let val of data) {
        variable[val] = this.fieldsvalue[val]
      }
      this.partfields = variable
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