<template>
  <div id="record">
    <div id="step" class="slay">
      <div class="nest">
        <a-steps progress-dot :current="2" direction="vertical">
          <a-step v-for="item in 5" :key="item" title="老八老八老八老八老八老八老八" description="This is a description.This is a descriptionThis is a descriptionThis is a description.This is a description.This is a description. This is a description." /> 
        </a-steps>
      </div>
    </div>
    <div id="operation" class="slay">
      <a-button type="primary" @click="showModal">
        增加工序
      </a-button>
      <a-button @click="changeDat">
        修改信息
      </a-button>
      <a-button type="danger">
        删除记录
      </a-button>
      <a-button type="dashed">
        生成二维码
      </a-button>
    </div>
    <add-item 
      :visible="visible"
      ref="additem"
      @cancel="handleCancel"
      @create="handleCreate"
    >
    </add-item>
  </div>
</template>

<script>
import AddItem from './additem'
export default {
  name: "Record",
  data() {
    return {
      visible: false
    }
  },
  components: {
    AddItem
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleCancel() {
      let additem = this.$refs.additem
      additem.form.resetFields()
      additem.processing = []
      this.visible = false;
    },
    handleCreate() {
      const form = this.$refs.additem.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        form.resetFields();
        this.$refs.additem.processing = []
        this.visible = false;
      })
    },
    changeDat() {
      
    }
  }
};
</script>

<style lang="scss">
#record {
  height: 100%;
  display: flex;
  .slay {
    width: 50%;
    height: 100%;
  }
  #step {
    position: relative;
    .nest {
      padding: 20px;
      height: 100%;
      box-sizing: border-box;
      overflow-y: scroll;
      .ant-steps-item {
        width: 300px;
        margin: 0 auto;
        .ant-steps-item-content {
          width: inherit;
        }
      }
    }
    &::before {
      content: '历史记录';
      min-width: 1em;
      // height: auto;
      position: absolute;
      top: 50%;
      left: 10px;
      padding: 7px;
      border: 1px solid #b2bec3;
      border-radius: 3px;
      transform: translateY(-50%);
      box-shadow: 2px -2px 5px 0 #dfe6e9,
                  2px 2px 5px 0 #dfe6e9,
                  -2px 2px 5px 0 #dfe6e9,
                  -2px -2px 5px 0 #dfe6e9;
    }
    &::after {
      content: '';
      width: 20px;
      height: 100%;
      background-color: #fff;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  #operation {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .ant-btn {
      width: 200px;
    }
  }
}
</style>