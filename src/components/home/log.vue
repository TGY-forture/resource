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
        <a-form-item label="用户名" has-feedback :validate-status="vicon">
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{ validator: validateUserName }],
              },
            ]"
            placeholder="用户名"
            autocomplete
            allow-clear
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item label="密码" has-feedback :validate-status="picon">
          <a-input-password
            allow-clear
            placeholder="密码"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, validator: passwordValidate }],
              },
            ]"
            autocomplete
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input-password>
        </a-form-item>
        <a-form-item label="验证码">
          <div class="validate">
            <a-input
              class="vertify"
              placeholder="验证码"
              v-decorator="[
                'vertify',
                { rules: [{ required: true, validator: vertifyCode }] }
              ]"
            />
            <canvas id="canvas" width="100" height="30"></canvas>
          </div>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: false
              },
            ]"
          >
            记住我
          </a-checkbox>
          <a class="login-form-forgot" href="javascript:;" @click="toHelp">忘记密码</a>
          <a-button type="primary" html-type="submit" class="login-form-button" :loading="loading">登录</a-button>
          <a-button class="sign" @click="toSign">前往注册</a-button>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<script>
import { draw, randomColor } from "@/assets/js/vertifycode";
import { mapMutations, mapActions } from 'vuex'
import {docCookies} from '@/assets/js/cookie';
import $ from 'jquery'
export default {
  name: "Log",
  data() {
    return {
      form: this.$form.createForm(this, { name: "log" }),
      vicon: null,
      picon: null,
      vertifycode: [],
      loading: false
    };
  },
  mounted() {
    let _this = this;
    $(function() {
      draw(_this.vertifycode);
      $("#canvas").on("click", function() {
        draw(_this.vertifycode);
      });
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      let preuser = docCookies.getItem('username')
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this.$axios.post("/log", values).then(
            (res) => {
              this.loading = false
              if (res.data === 'success') {
                this.vicon = this.picon = null
                this.form.resetFields()
                this.$message.loading({ content: '登陆成功,正在加载数据......', key: 'loading' })
                return this.$axios.get('/log', {params: {username: values.username}})
                //已取得用户全部数据
              } else if (res.data === 'empty') {
                this.$message.warning('该用户不存在')
              } else if (res.data === 'active') {
                this.$message.warning('该用户已在其它地方登陆')
              } else if (res.data === 'fail'){
                this.$message.error('用户名或密码错误')
              }
            }).then(
              (res) => {
                if (res) {
                  if (res.data !== 'fail') {              
                    this.initUserinfo(res.data) //初始化用户数据到vuex
                    this.getAvatar()   //获取用户头像
                    this.getCompanyinfo() //得到用户公司数据
                    this.$message.success({ content: '数据加载成功', key: 'loading'})
                    if (preuser) { //将已经登录的不同用户下线
                      this.$axios.put('/log', {username: preuser})
                    }
                  } else {
                    this.$message.error({ content: '数据加载失败', key: 'loading'})
                  }
                }
              }
            ).catch(
              (err) => {
                this.loading = false;
                this.$message.error('连接超时或其它错误');
                console.error(err)
            });
        }
      });
    },
    toSign() {
      this.$router.push("/sign");
    },
    toHelp() {
      this.$router.push({ name: "help" });
    },
    validateUserName(rule, value, callback) {
      if (/^[0-9]{11}$/.test(value)) {
        this.vicon = "success";
        callback();
      } else {
        this.vicon = "warning";
        callback("请输入合法的用户名");
      }
    },
    passwordValidate(rule, value, callback) {
      const pass = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W]).{8}$/;
      if (pass.test(value)) {
        this.picon = "success";
        callback();
      } else {
        this.picon = "warning";
        callback("密码不合法");
      }
    },
    vertifyCode(rule, value, callback) {
      if (this.vertifycode.join("") !== value) callback("Not Right");
      else callback();
    },
    ...mapMutations(['initUserinfo']),
    ...mapActions(['getAvatar', 'getCompanyinfo'])
  }
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
      margin-top: 20px;
      margin-bottom: 0;
      &:first-child {
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
    .validate {
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
      margin: 20px auto 0;
    }
  }
}
</style>
