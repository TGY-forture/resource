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
          style="width: 70%"
          show-arrow
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
        <a-input style="width: 70%" v-decorator="[key, {rules: [{required: true, message: '值不能为空'}]}]"></a-input>
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
import {mapState, mapActions} from 'vuex'
export default {
  name: "AddItem",
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
  props: {
    action: String,
    visible: Boolean,
    proinfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('product', ['fields', 'fieldsvalue', 'steps'])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' });
  },
  methods: {
    ...mapActions('product', ['dataCRUD']),
    savehandle(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.action === 'add') {
            for (let val of this.steps) {
              if (val.process === values.process) {
                this.$message.warning('当前工序已添加')
                return 
              }
            }
          }
          this.dataCRUD({values, seq: this.$route.query.seq, action: this.action}).then(
            res => {
              if (res.data === 'ok') {
                this.$message.info('操作成功')
                this.$emit('refresh', this.$route.query.seq)
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
      let data = this.fields[value] //数组
      let repobj = {}  //每次重新用一个新对象代替
      for(let val of data) {
        repobj[val] = this.fieldsvalue[val]
      }
      this.partfields = repobj
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