<template>
  <div id="plus">
    <div class="up-index" v-show="true">
      <a-input placeholder="请输入产品编号" allow-clear class="pu-inp" v-model="seq"  />
      <a-popconfirm placement="top" ok-text="Yes" cancel-text="No" :visible="pop" @cancel="cancel" @confirm="confirm">
        <template slot="title">
          <p>当前数据不存在,是否添加?</p>
        </template>
        <a-button html-type="button" :loading="loading" @click="getFirstDat">确定</a-button>
      </a-popconfirm>
      <a-modal v-model="visible" title="基本信息" centered :footer="null" @cancel="clear">
        <a-form v-bind="formItemLayout" :form="form" @submit="handle">
          <a-form-item label="产品名称">
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入名称' }] }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="批次">
            <a-input 
              v-decorator="[
                'batch',
                { rules: [{ required: true, message: '请输入批次', pattern: /^[0-9]{10}$/ }] }
              ]"
            ></a-input>
          </a-form-item>
          <a-button type="primary" htmlType="submit" style="margin-left:200px">保存</a-button>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "plus",
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'basic-form'})
  },
  data() {
    return {
      visible: false,
      pop: false,
      seq: '',
      loading: false,
      stepStyle: {
        marginBottom: "60px",
        boxShadow: "0px -1px 0 0 #e8e8e8 inset",
      },
      formItemLayout: {
        labelCol: {
          sm: { span: 8 }
        },
        wrapperCol: { span: 16 }
      }
    };
  },
  methods: {
    clear() {
      this.form.resetFields()
    },
    confirm() {
      this.pop = false
      this.visible = true
    },
    cancel() {
      this.pop = false
    },
    handle(e) {
      e.preventDefault()
      this.form.validateFields((err, value) => {
        if (!err) {
          this.$axios.put('/plus', {...value, seq: this.seq}).then(
            res => {
              if (res.data == 'ok') {
                this.$message.success('操作成功')
                this.$router.push({name: 'record'})
              } else {
                this.$message.warning('服务器故障')
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
    getFirstDat() {
      if (!/^[0-9]{8}$/.test(this.seq)) return
      this.loading = true;
      this.$axios.get('/plus', {params: { seq: this.seq }}).then(
        res => {
          this.loading = false;
          if (res.data == 'success') {
            this.$message.success("操作成功!");
            this.$router.push({name: 'record'})
          } else if (res.data == 'fail') {
            this.$message.error('服务器故障')
          } else {
            this.pop = true
          }
        }
      ).catch(
        err => {
          console.error(err)
        }
      )
    }
  },
};
</script>

<style lang="scss">
#plus {
  width: 100%;
  height: 100%;
  .up-index {
    text-align: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .pu-inp {
      width: 300px;
      height: 40px;
      margin-right: 20px;
    }
  }
}
.ant-modal-root {
  .ant-input {
    width: 200px;
  }
}
</style>
