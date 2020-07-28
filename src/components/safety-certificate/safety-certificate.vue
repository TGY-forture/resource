<template>
  <div id="certificate">
    <div id="tourist">
      <h1 style="fontWeight:bold">你当前的身份是{{stranger ? '游客' : '员工'}}</h1>
    </div>
    <div v-if="stranger" class="stranger">
      <p style="margin:20px 0">你只具有查询信息的权限</p>
      <a-button type="primary" @click="showModal">更改权限</a-button>
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
import {mapGetters, mapMutations, mapActions, mapState} from 'vuex'
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
    ...mapGetters(['commonuser', 'company', 'name']),
    ...mapState(['stranger'])
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
                this.getCompanyinfo();
                // this.changeName(values.name)
              } else if (res.data === 'fail') {
                this.$message.error('认证失败')
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
    ...mapActions(['getCompanyinfo']),
    ...mapMutations(['changeName'])
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