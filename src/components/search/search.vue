<template>
  <div id="components-form-demo-advanced-search">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSearch"
    >
      <a-form-item label="日期">
        <a-date-picker
          :default-value="moment('01/01/2015', dateFormatList[0])"
          :format="dateFormatList"
        />
      </a-form-item>
      <a-form-item label="产品编号">
        <a-input class="pro-num pro"></a-input>
      </a-form-item>
      <a-form-item label="负责人">
        <a-input class="pro-man pro"></a-input>
      </a-form-item>
      <a-form-item label="生产批次">
        <a-input class="pro-cnt pro"></a-input>
      </a-form-item>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'left' }">
          <a-button type="primary" html-type="submit">
            搜索
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            清空
          </a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list">
      搜索结果
    </div>
    <a-pagination
      class="u-page"
      show-quick-jumper
      :default-current="1"
      :total="500"
      show-less-items
      disabled
      @change="onChange"
    />
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Search",
  data() {
    return {
      form: this.$form.createForm(this, { name: "advanced_search" }),
      // dateFormat: 'YYYY/MM/DD',
      // monthFormat: 'YYYY/MM',
      dateFormatList: ["YYYY/MM/DD", "DD/MM/YY"],
    };
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log("error", error);
        console.log("Received values of form: ", values);
      });
    },
    handleReset() {
      this.form.resetFields();
    },
    moment,
    onChange(pageNumber) {
      console.log("Page: ", pageNumber);
    },
  },
};
</script>

<style lang="scss">
#components-form-demo-advanced-search {
  .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    height: 400px;
    width: 500px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    &::before {
      content: "";
      width: 0;
      height: 100%;
      background-color: #000;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .ant-advanced-search-form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .u-page {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
