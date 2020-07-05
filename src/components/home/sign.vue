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
                  }
                ]
              }
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
                  }
                ]
              }
            ]"
            type="password"
            autocomplete
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="确认密码"
          has-feedback
        >
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
                  }
                ]
              }
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
                  }
                ]
              }
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
                  }
                ]
              }
            ]"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
            >
              <a-select-option value="86">
                +86
              </a-select-option>
              <a-select-option value="87">
                +87
              </a-select-option>
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
                        message: '请输入你得到的验证码!',
                      }
                    ]
                  }
                ]"
              />
            </a-col>
            <a-col :span="12">
              <a-button>获取验证码</a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item class="u-btn">
          <a-button type="primary" html-type="submit">
            注册
          </a-button>
          <a-button type="primary" html-type="button" class="sign-back" @click="backLog">
            返回
          </a-button>
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
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 10 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          }
        }
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    backLog() {
      this.$router.push('/log')
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
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
      cursor: pointer;
      margin-top: 20px;
      margin-bottom: 0;
      &:hover {
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
