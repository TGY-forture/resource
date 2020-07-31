<template>
  <a-modal :footer="null" :visible="show" 
    @cancel="() => { $emit('cancel') }"
    title="编辑信息"
  >
    <a-form :form="form" v-bind="formItemLayout" @submit="submitUpdate">
      <a-form-item label="选择工序">
        <a-select 
          v-decorator="['process',{rules: [{required: true, meaasge: '工序不能为空'}]}]"
          @change="valueChange"
        >
          <a-select-option v-for="(val, key) in havepro" :key="key" :value="key">
            {{val}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-for="item in havelist" :key="item.decorator" :label="item.label">
        <a-input v-decorator="[item.decorator, {rules:[{required: true, meaasge: '值不能为空'}]}]"></a-input>
      </a-form-item>
      <a-form-item class="change-button">
        <a-button type="default" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'ChangeItem',
  props: {
    show: Boolean,
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
      havepro: {},
      havelist: [],
      assistvalue: 0
    }
  },
  computed: {
    formItemLayout() {
      return {
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
    this.form = this.$form.createForm(this, ['change-item'])
  },
  watch: {
    proinfo: function (newval, oldval) {
      this.assistvalue += 1
    },
    steps: function (newval, oldval) {
      this.assistvalue += 1
    },
    assistvalue: function (nval, oval) {
      if (nval === 2) {
        this.steps.forEach((val) => {
        this.$set(this.havepro, val.process, this.proinfo[val.process])
        })
      }
    }
  },
  methods: {
    valueChange(value) {
      let trans = []
      this.fields[value].forEach((val) => {
        trans.push({
          label: this.fieldsvalue[val],
          decorator: val
        })
      })
      this.havelist = trans
    },
    submitUpdate(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          let stateval = {
            table: this.$store.state.companyinfo.tablename,
            seq: this.$route.query.seq,
            name: this.$store.state.copyinfo.name,
            action: 'edit',
            date: new Date().toLocaleDateString(),
            company: this.$store.state.copyinfo.company
          }
          this.$axios.post('/record/add', {
            values,
            stateval
          }).then(
            res => {
              if (res.data === 'ok') {
                this.$message.info('信息已更新')
                this.$emit('cancel')
                this.$emit('refresh')
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
    }
  }
}
</script>

<style lang="scss">
.change-button {
  display: flex;
  justify-content: center;
  .ant-form-item-control {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>