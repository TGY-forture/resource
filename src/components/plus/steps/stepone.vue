<template>
  <div>
    <a-form :form="form" class="u-form" :labelCol="{span: 10}">
        <a-form-item label="钢材来源提供商">
          <a-input allow-clear></a-input>
        </a-form-item>
        <a-form-item label="钢材强度">
          <a-input allow-clear addonAfter="MPa"></a-input>
        </a-form-item>
        <a-form-item label="钢材韧性">
          <a-input allow-clear addonAfter="AKV"></a-input>
        </a-form-item>
        <a-form-item label="冷弯性能">
          <a-select
            label-in-value
            :default-value="{ key: 'good' }"
            style="width: 250px"
            @change="handleChange"
          >
            <a-select-option value="good">
              合格
            </a-select-option>
            <a-select-option value="bad">
              不合格
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="耐久性">
          <a-select
            label-in-value
            :default-value="{ key: 'tired' }"
            style="width: 250px"
            @change="handleChange"
          >
            <a-select-option value="corrosion">
              耐腐蚀
            </a-select-option>
            <a-select-option value="Ageing">
              耐老化
            </a-select-option>
            <a-select-option value="tired">
              耐疲劳
            </a-select-option>
            <a-select-option value="temperature">
              耐长期高温
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-button html-type="button" class="plus-btn">保存</a-button>
    </div>
</template>

<script>
export default {
  name: 'StepOne',
  beforeCreate() {
    this.form = this.$form.createForm('this', {name: 'plus'})
  },
  methods: {
    handleChange(value) {
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
    }
  }
}
</script>

<style>

</style>