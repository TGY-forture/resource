<template>
  <div id="edit">
    <a-input-search placeholder="请输入产品编号或批次" enter-button class="edit-inp" @search="showModal" />
    <a-modal v-model="visible" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <p>请选择数据操作</p>
      <a-radio-group v-model="value" @change="onChange">
        <a-radio :style="radioStyle" :value="1">删除信息</a-radio>
        <a-radio :style="radioStyle" :value="2">编辑信息</a-radio>
      </a-radio-group>
    </a-modal>
    <div>
      <a-drawer
        title="编辑信息"
        :width="720"
        :visible="dis"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :form="form" layout="vertical" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="钢材来源提供商">
                <a-input
                  v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: 'please' }],
                  },
                ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="钢材强度">
                <a-input
                  v-decorator="[
                  'url',
                  {
                    rules: [{ required: true, message: 'please enter url' }],
                  },
                ]"
                  style="width: 100%"
                  addon-after="MPa"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :span="12">
              <a-form-item label="钢材强度">
                <a-input
                  v-decorator="[
                  'url',
                  {
                    rules: [{ required: true, message: 'please enter url' }],
                  },
                ]"
                  style="width: 100%"
                  addon-after="AKv"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="模具">
                <a-input
                  v-decorator="[
                  'url',
                  {
                    rules: [{ required: true, message: 'please enter url' }],
                  },
                ]"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="冷弯性能">
                <a-select
                  v-decorator="[
                  'owner',
                  {
                    rules: [{ required: true, message: 'Please select an owner' }],
                  },
                ]"
                >
                  <a-select-option value="nice">合格</a-select-option>
                  <a-select-option value="bad">不合格</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="耐久性">
                <a-select
                  v-decorator="[
                  'type',
                  {
                    rules: [{ required: true, message: 'Please choose the type' }],
                  },
                ]"
                >
                  <a-select-option value="corrosion">耐腐蚀</a-select-option>
                  <a-select-option value="Ageing">耐老化</a-select-option>
                  <a-select-option value="tired">耐疲劳</a-select-option>
                  <a-select-option value="temperature">耐长期高温</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="模具设计人">
                <a-input
                  v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: 'please' }],
                  },
                ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="冶炼人员">
                <a-input
                  v-decorator="[
                  'url',
                  {
                    rules: [{ required: true, message: 'please enter url' }],
                  },
                ]"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="浇筑人员">
                <a-input
                  v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: 'please' }],
                  },
                ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="打磨人员">
                <a-input
                  v-decorator="[
                  'url',
                  {
                    rules: [{ required: true, message: 'please enter url' }],
                  },
                ]"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="锋利度">
                <a-select
                  label-in-value
                  :default-value="{ key: 'low' }"
                  style="width: 100%"
                >
                  <a-select-option value="low">低</a-select-option>
                  <a-select-option value="middle">中</a-select-option>
                  <a-select-option value="high">高</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="韧性">
                <a-select label-in-value :default-value="{ key: 'strong' }" style="width: 100%">
                  <a-select-option value="weak">低</a-select-option>
                  <a-select-option value="strong">强</a-select-option>
                  <a-select-option value="extremelystrong">极强</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="测试人员">
                <a-input
                  v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: 'please' }],
                  },
                ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">取消</a-button>
          <a-button type="primary" @click="onClose">确定</a-button>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      visible: false,
      dis: false,
      value: 1,
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      },
      form: this.$form.createForm(this)
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
      setTimeout(() => {
        this.showDrawer();
      }, 1000);
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    showDrawer() {
      this.dis = true;
    },
    onClose() {
      this.dis = false;
    }
  }
};
</script>

<style lang="scss">
#edit {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .edit-inp {
    width: 400px;
  }
}
</style>