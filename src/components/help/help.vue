<template>
  <div id="help">
    <a-form :form="form" v-bind="{labelCol:{span: 10},wrapperCol:{span: 14}}">
      <a-form-item label="用户名">
        <a-input v-decorator="['username', {rules:[{required: true, message: '必填项'}]}]"></a-input>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-decorator="['email', {rules:[{required: true, message: '必填项'}]}]"></a-input>
      </a-form-item>
      <a-form-item label="验证码">
        <a-input v-decorator="['code', {rules:[{required: true, message: '必填项'}]}]" @search="sendEmail">
        </a-input>
        <a-button style="margin-left:20px" @click="sendEmail" :loading="loading">发送验证码</a-button>
      </a-form-item>
    </a-form>
    <a-button style="display:block;margin:20px auto" type="primary" :loading="wait" @click="getPass">找回密码</a-button>
  </div>
</template>

<script>
import {Email} from '@/assets/js/smtp.js'
export default {
  name: "Help",
  data() {
    return {
      loading: false,
      wait: false,
      vertifycode: ''
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "help" });
  },
  methods: {
    sendEmail() {
      if (!/@/.test(this.code)) return;
      this.loading = true;
      let code;
      do {
        code = (Math.random() * 10000).toFixed();
      } while (code.length != 4);
      Email.send({
        Host: "smtp.qq.com",
        Username: "1981472184@qq.com",
        Password: "",
        To: this.code,
        From: "1981472184@qq.com",
        Subject: "密码找回",
        Body: "你的验证码为：" + code
      }).then(
        message => {
          this.loading = false
          if (message === 'OK') {
            this.vertifycode = code;
            this.$message.success('发送成功')
          } else {
            this.$message.error('发送失败')
          }
      }).catch(
        err => {
          this.loading = false;
          console.error(err)
        }
      )
    },
    getPass() {
      this.form.validateFields((err, values) => {
        if (!err && this.vertifycode === values.code) {
          this.wait = true;
          this.$axios.get('/help', {params: {username: values.username, email: values.email}}).then(
            res => {
              this.wait = false;
              if (res.data !== 'fail') {
                 this.$notification.info({
                   message: '密码',
                   description: res.data.password,
                   duration: 6
                });
              } else {
                this.$message.warning('请保证信息无误')
              }
            }
          ).catch(
            err => {
              console.error(err);
              this.$message.error('操作失败');
              this.wait = false;
            }
          )
        }
      })
    }
  }
};
</script>

<style lang="scss">
#help .ant-form {
  margin-top: 100px;
  .ant-input {
    width: 220px;
  }
  .ant-form-item {
    .ant-input-affix-wrapper, .ant-input-search {
      width: 220px;
    }
  }
}
</style>