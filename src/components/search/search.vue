<template>
  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-form-item label="日期">
        <a-date-picker v-decorator="['dateselect',{rules:[{type: 'object'}]}]" />
      </a-form-item>
      <a-form-item label="产品编号">
        <a-input class="pro-num pro" v-decorator="['pronum']"></a-input>
      </a-form-item>
      <a-form-item label="负责人">
        <a-input class="pro-man pro" v-decorator="['proman']"></a-input>
      </a-form-item>
      <a-form-item label="生产批次">
        <a-input class="pro-cnt pro" v-decorator="['procnt']"></a-input>
      </a-form-item>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'left' }">
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清空</a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list" v-if="reshow">搜索结果</div>
    <div v-else>
      <a-table :columns="columns" :data-source="data" :pagination="false">
        <template slot="detail" slot-scope="text,record">
          <a slot="detail" @click="getDat(record)">{{ text }}</a>
        </template>  
      </a-table>
    </div>
    <a-pagination
      class="u-page"
      show-quick-jumper
      :default-current="1"
      :total="total"
      show-less-items
      :disabled="reshow"
      @change="onChange"
      :page-size="7"
    />
  </div>
</template>

<script>
// E:\WebDoc\resource\node_modules\async-validator\dist-web\index.js 注释验证警告
import moment from "moment";
const columns = [
  {
    title: "产品名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "产品编号",
    dataIndex: "num",
    key: "num"
  },
  {
    title: "产品批次",
    dataIndex: "period",
    key: "period"
  },
  {
    title: "出厂日期",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "负责人",
    dataIndex: "powman",
    key: "powman"
  },
  {
    title: "详细信息",
    dataIndex: "detail",
    key: "detail",
    scopedSlots: { customRender: "detail" }
  }
];
const data = [
  {
    key: "1",
    name: "杰克逊饿哦举动深没是大是",
    num: "12345678",
    period: "uhsck8746vhd",
    date: "2019-1-12",
    powman: "李晓明",
    detail: "查看"
  },
  {
    key: "2",
    name: "杰克逊是大是",
    num: '45678',
    period: "ck8746vhd",
    date: "2019d-1-12",
    powman: "李明",
    detail: "查看"
  },
  {
    key: "3",
    name: "杰饿哦举动深没是大是",
    num: 'ghghgh',
    period: "u565757",
    date: "2013-1-12",
    powman: "晓明",
    detail: "查看"
  },
  {
    key: "4",
    name: "杰克逊饿哦举动深没是大是",
    num: 12345678,
    period: "uhsck8746vhd",
    date: "2019-1-12",
    powman: "李晓明",
    detail: "查看"
  },
  {
    key: "5",
    name: "杰克逊饿哦举动深没是大是",
    num: 12345678,
    period: "uhsck8746vhd",
    date: "2019-1-12",
    powman: "李晓明",
    detail: "查看"
  },
  {
    key: "6",
    name: "杰克逊饿哦举动深没是大是",
    num: 12345678,
    period: "uhsck8746vhd",
    date: "2019-1-12",
    powman: "李晓明",
    detail: "查看"
  },
  {
    key: "7",
    name: "杰克逊饿哦举动深没是大是",
    num: 12345678,
    period: "uhsck8746vhd",
    date: "2019-1-12",
    powman: "李晓明",
    detail: "查看"
  }
];
export default {
  name: "Search",
  data() {
    return {
      data,
      columns,
      total: 50,
      reshow: true,
      form: this.$form.createForm(this, { name: "advanced_search" })
    };
  },
  methods: {
    getDat(value) {
      console.log(value)
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log(values);
      });
    },
    handleReset() {
      this.form.resetFields();
      this.reshow = !this.reshow;
    },
    moment,
    onChange(pageNumber) {
      console.log("Page: ", pageNumber);
    }
  }
};
</script>

<style lang="scss">
#components-form-demo-advanced-search {
  .ant-spin-container {
    width: 90%;
    margin: 0 auto;
  }
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
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
