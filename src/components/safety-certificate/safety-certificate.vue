<template>
  <div id="certificate">
    <div id="tourist">
      <h1 style="fontWeight:bold">你当前的身份是{{stranger ? '游客' : '员工'}}</h1>
    </div>
    <div v-if="stranger" class="stranger">
      <p style="margin:20px 0">你只具有查询信息的权限</p>
      <a-button type="primary" :disabled="disabled" @click="showModal">更改权限</a-button>
    </div>
    <div class="worker" v-else>
      <a-row>
        <a-col span="12" style="text-align: right">姓名:</a-col>
        <a-col>{{name}}</a-col>
      </a-row>
      <a-row>
        <a-col span="12" style="text-align: right">所属公司:</a-col>
        <a-col>{{company}}</a-col>
      </a-row>
    </div>
    <collection-create-form
      ref="collectionForm"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import CollectionCreateForm from "./CollectionCreateForm";
export default {
  name: "SafetyCertificate",
  components: { CollectionCreateForm },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapGetters(['commonuser', 'company', 'name', 'stranger']),
    disabled() {
      return this.$store.state.copyinfo.islog === 'active' ? false : true
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.$refs.collectionForm.form.resetFields()
    },
    handleCreate() {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (!err) {
          this.$axios.put('/addinfo', {...values, username: this.commonuser}).then(
            res => {
              if (res.data === 'ok') {
                this.$message.info('认证成功')
                form.resetFields();
                this.visible = false;
                //认证成功后重新获取员工数据
                return this.$axios.get('/addinfo/part', {params: {username: this.commonuser}})
              } else if (res.data === 'fail') {
                this.$message.error('认证失败')
              }
            }
          ).then(
            (res) => {
              if (res && res.data !== 'fail') {
                this.addInfo(res.data);
              }
            }
          ).catch(
            (err) => {
              console.error(err)
            }
          )
        }
      });
    },
    ...mapActions(['getCompanyinfo']),
    ...mapMutations(['addInfo'])
  },
};
</script>

<style lang="scss">
#certificate {
  #tourist {
    text-align: center;
    margin-top: 200px;
  }
  .stranger {
    text-align: center;
  }
  .worker {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>