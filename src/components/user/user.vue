<template>
  <div id="u-user">
    <div class="user-head">
      <!-- <a-avatar :size="200" :src="avatar" style="cursor:pointer" @click="changePic"/> -->
      <a-upload
        name="avatar"
        action="http://localhost:3000/user"
        @change="handleChange"
        list-type="picture"
      >
        <a-button> <a-icon type="upload" />上传头像</a-button>
      </a-upload>
    </div>
    <div class="user-body">
      <a-form :form="form" @submit="saveInfo">
        <a-form-item label="用户名">
          <a-input v-decorator="['username']"></a-input>
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-decorator="['email']"></a-input>
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-decorator="['nickname']"></a-input>
        </a-form-item>
        <a-form-item label="年龄">
          <a-input-number v-decorator="['age']" id="inputNumber" :min="18" :max="50" />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-decorator="['sex', {initialValue: 'man'}]">
            <a-radio value="man">
              男
            </a-radio>
            <a-radio value="woman">
              女
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <a-button type="primary" html-type="submit">保存</a-button>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/img/bee-5069160_1280.png'
export default {
  name: 'User',
  data() {
    return {
      avatar
    }
  },
  created() {
    this.form = this.$form.createForm(this, ['user_info'])
  },
  methods: {
    changePic() {
      this.avatar = require('../../assets/img/camp-4363073_1280.png')
    },
    saveInfo(e) {
      e.preventDefault()
    },
    handleChange(info) {
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name}上传成功`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name}上传失败`);
      }
      console.log(info.file.response)
    }
  },
  mounted() {
    this.form.setFieldsValue(
      {
        username: 'tgy',
        nickname: 'hhhhhh',
        email: '1981472181@qq.com',
        age: 21,
        sex: 'woman'
      }
    )
  }
}
</script>

<style lang="scss">
#u-user {
  height: 100%;
  .user-head {
    float: left;
    height: 100%;
    width: 50%;
    // text-align: center;
    // &::before {
    //   content: '';
    //   height: 100%;
    //   display: inline-block;
    //   vertical-align: middle;
    // }
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
}
</style>