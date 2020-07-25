<template>
  <div id="sign">
    <section class="sign-top">
      <p>登录</p>
      <p>注册</p>
    </section>
    <section class="sign-body">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="邮箱">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: '不合法的邮箱!',
                  },
                  {
                    required: true,
                    message: '请输入你的邮箱!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入你的密码!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              },
            ]"
            type="password"
            autocomplete
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: '请确认你的密码!',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              },
            ]"
            type="password"
            @blur="handleConfirmBlur"
            autocomplete
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            昵称&nbsp;
            <a-tooltip title="What do you want others to call you?">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            v-decorator="[
              'nickname',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入你的昵称!',
                    whitespace: true,
                  },
                  {
                    max: 10,
                    message: '昵称不能超过十个字符',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="电话号码">
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入你的电话号码!',
                  },
                  {
                    len: 11,
                    message: '电话号码为十一位数字',
                  },
                ],
              },
            ]"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
            >
              <a-select-option value="86">+86</a-select-option>
              <a-select-option value="87">+87</a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="验证码"
          extra="We must make sure that your are a human."
        >
          <a-row :gutter="8">
            <a-col :span="12">
              <a-input
                v-decorator="[
                  'captcha',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入你得到的验证码!'
                      },
                      {validator: certiftcate}
                    ],
                  },
                ]"
              />
            </a-col>
            <a-col :span="12">
              <a-button :loading="loading" @click="getCode">获取验证码</a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item class="u-btn">
          <a-button type="primary" html-type="submit">注册</a-button>
          <a-button type="primary" html-type="button" class="sign-back" @click="backLog">返回</a-button>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "Sign",
  data() {
    return {
      code: '',
      loading: false,
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 10 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    backLog() {
      this.$router.push("/log");
    },
    getCode() {
      this.loading = true
      this.$axios.get('/sign').then(
        res => {
          this.loading = false
          this.code = res.data
          this.$notification.open({
            message: `你的验证码为${res.data}`,
            icon: <a-icon type="smile" style="color: #108ee9" />,
          });
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    certiftcate(rule, value, callback) {
      if (value === this.code) {
        callback();
      } else {
        callback("");
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$axios.post('/sign', values).then(
            res => {
              if (res.data == 'success') {
                this.$message.success('注册成功')
                this.form.resetFields()
              } else if (res.data == 'same') {
                this.$message.warning('该用户已注册')
              } else if (res.data === 'fail') {
                this.$message.error('注册失败，服务器故障')
              }
            }
          ).catch(
            err => {
              console.error(err)
            }
          )
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      if (value === this.form.getFieldValue("password")) {
        callback();
      } else if (value === "") {
        callback("");
      } else {
        callback("两次密码不一致!");
      }
    },
    validateToNextPassword(rule, value, callback) {
      let pass = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W]).{8}$/;
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      if (pass.test(value)) {
        callback();
      } else if (value === "" || value == undefined) {
        callback("");
      } else {
        callback("密码不符合要求");
      }
    }
  }
};
</script>

<style lang="scss">
#sign {
  .sign-top {
    display: flex;
    justify-content: space-evenly;
    p {
      font-size: 20px;
      font-weight: bold;
      width: 300px;
      height: 30px;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 0;
      &:last-child {
        border-bottom: 3px solid #0984e3;
      }
    }
  }
  .sign-body {
    padding-top: 20px;
    .u-btn {
      .ant-form-item-control {
        text-align: center;
        .sign-back {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
