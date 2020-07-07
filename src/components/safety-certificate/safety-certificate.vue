<template>
  <div id="certificate">
    <div id="tourist">
      <h1 style="fontWeight:bold">你当前的身份是游客</h1>
      <p style="margin:20px 0">你只具有查询信息的权限</p>
      <a-button type="primary" @click="showModal">更改权限</a-button>
      <collection-create-form
        ref="collectionForm"
        :visible="visible"
        @cancel="handleCancel"
        @create="handleCreate"
      />
    </div>
  </div>
</template>

<script>
import CollectionCreateForm from "./CollectionCreateForm";
export default {
  name: "SafetyCertificate",
  components: { CollectionCreateForm },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleCreate() {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        form.resetFields();
        this.visible = false;
      });
    }
  }
};
</script>

<style lang="scss">
#certificate {
  height: 100%;
  #tourist {
    text-align: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>