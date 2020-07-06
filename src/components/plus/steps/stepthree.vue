<template>
  <div id="stepthree">
    <a-form :form="form" :labelCol="{ span: 10 }" class="stepthree-form">
      <a-form-item label="韧性">
          <a-select
            label-in-value
            :default-value="{ key: 'strong' }"
            style="width: 250px"
            @change="handleChange"
          >
            <a-select-option value="weak">
              低
            </a-select-option>
            <a-select-option value="strong">
              强
            </a-select-option>
            <a-select-option value="extremelystrong">
              极强
            </a-select-option>
          </a-select>
      </a-form-item>
      <a-form-item label="锋利度">
          <a-select
            label-in-value
            :default-value="{ key: 'low' }"
            style="width: 250px"
            @change="handleChange"
          >
            <a-select-option value="low">
              低
            </a-select-option>
            <a-select-option value="middle">
              中
            </a-select-option>
            <a-select-option value="high">
              高
            </a-select-option>
          </a-select>
      </a-form-item>
      <a-form-item label="测试人员">
        <a-input allow-clear style="width: 250px"></a-input>
      </a-form-item>
    </a-form>
    <div id="step-btn">
      <a-button class="plus-three-btn" type="default" html-type="button">保存</a-button>
      <a-button class="plus-three-btn" type="default" html-type="button">生成二维码</a-button>
    </div>   
  </div>
</template>

<script>
export default {
  name: 'StepThree',
  beforeCreate() {
    this.form = this.$form.createForm('this', {name: 'plus-three'})
  },
  methods: {
     handleChange(value) {
      console.log(value); 
    }
  }
}
</script>

<style lang="scss">
#stepthree #step-btn {
  display: flex;
  justify-content: center;
  .plus-three-btn {
    margin: 20px;
  }
}
</style>