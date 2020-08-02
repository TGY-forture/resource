<template>
  <div id="u-user">
    <div class="user-head">
      <div class="photo">
        <a-avatar :size="200" :src="avatar"/>
        <a-upload
          name="avatar"
          action="http://localhost:3000/user"
          @change="handleChange"
          list-type="picture"
          accept="image/*"
          :data="username"
        >
          <a-button style="margin-left: 20px">
            <a-icon type="upload" />上传头像
          </a-button>
        </a-upload>
      </div>
    </div>
    <div class="user-body">
      <a-form :form="form" @submit="saveInfo">
        <a-form-item label="用户名" >
          <a-input v-decorator="['username']" disabled></a-input>
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-decorator="['email']"></a-input>
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-decorator="['nickname']"></a-input>
        </a-form-item>
        <a-form-item label="年龄">
          <a-input-number v-decorator="['age']" id="inputNumber" :min="18" :max="100" />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-decorator="['sex', {initialValue: 'man'}]">
            <a-radio value="man">男</a-radio>
            <a-radio value="woman">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">保存</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: "User",
  created() {
    this.form = this.$form.createForm(this, ["user_info"]);
  },
  computed: {
    ...mapState(['avatar', 'userinfo']),
    ...mapGetters(['username', 'commonuser'])
  },
  methods: {
    saveInfo(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$axios.put('/user', values).then(
            (res) => {
              if (res.data === 'ok') {
                this.$message.success('保存成功')
                this.resetUserinfo(values)
              } else if (res.data === 'fail') {
                this.$message.error('保存失败')
              }
            }
          ).catch(
            (err) => {
              console.error(err)
            }
          )
        }
      })
    },
    handleChange({ file, fileList, event }) {
      if (file.status === "done" && file.response === 'ok') {
        this.$message.success(`${file.name}上传成功`);
        this.getAvatar()
        if (fileList.length > 1) {
            fileList.shift()
        }
      } else if (file.status === "error" || file.response === 'fail') {
        this.$message.error(`${file.name}上传失败`);
      }
    },
    ...mapMutations(['resetUserinfo']),
    ...mapActions(['getAvatar'])
  },
  mounted() { 
    this.form.setFieldsValue(this.userinfo);
  }
};
// 辅助转换函数
function blobToBase64(blob, imgsrc) {
  let filereader = new FileReader();
  filereader.onloadend = (e) => {
    imgsrc = e.target.result;
  };
  filereader.readAsDataURL(blob);
}
</script>

<style lang="scss">
#u-user {
  height: 100%;
  .user-head {
    float: left;
    height: 100%;
    width: 50%;
    .photo {
      text-align: center;
      margin-top: 20%;
    }
  }
  .user-body {
    float: left;
    padding-top: 20px;
    .ant-form-item {
      margin-bottom: 0;
      .ant-input {
        width: 300px;
      }
    }
    .ant-btn {
      margin-top: 20px;
      margin-right: 30px;
    }
  }
  .ant-upload-list-item-done, .ant-upload-list-item-error {
      width: 60%;
      margin: 8px auto;
    }
}
</style>