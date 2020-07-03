<template>
  <div id="log">
    <section class="log-top">
      <p>登录</p>
      <p>注册</p>
    </section>
    <section class="log-body">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item label="用户名" has-feedback validate-status="success">
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: '请输入用户名' }],
              },
            ]"
            placeholder="用户名"
            autocomplete
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="密码" has-feedback validate-status="warning">
          <a-input-password
            allow-clear
            placeholder="密码"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码' }],
              },
            ]"
            autocomplete
          />
        </a-form-item>
        <a-form-item label="验证码">
          <div class="validate">
            <a-input class="vertify" placeholder="验证码"></a-input>
            <canvas id="canvas" width="100" height="30"></canvas>
          </div>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: false,
              },
            ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href="#">
            忘记密码
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
          <a href="#" class="sign">
            前往注册
          </a>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script>
import { draw, randomColor } from "@/assets/js/vertifycode";
export default {
  name: "Log",
  data() {
    return {
      form: this.$form.createForm(this, { name: "log" }),
    };
  },
  mounted() {
    $(function() {
      var show_num = [];
      draw(show_num);
      $("#canvas").on("click", function() {
        draw(show_num);
      })
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#log {
  .log-top {
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
  .log-body #components-form-demo-normal-login {
    width: 300px;
    margin: 20px auto;
    .login-form-button {
      width: 200px;
      display: block;
    }
    ::v-deep .ant-input {
      width: 300px;
    }
    .validate {   //在赋予组件id值用作选择器时无效,所以能不能写作#validate
      display: flex;
      align-items: center;
      justify-content: space-between;
      .vertify {
        width: 100px;
      }     
      #canvas {
        box-sizing: border-box;
        border: 1px solid #ddd;
        cursor: pointer;
        border-radius: 5px;
      }
    }
    .login-form-forgot {
      float: right;
    }
    .login-form-button {
      margin: 0 auto;
    }
    .sign {
      display: block;
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
