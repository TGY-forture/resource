<template>
  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-form-item label="出厂日期">
        <a-date-picker v-decorator="['date',{rules:[{type: 'object'}]}]" />
      </a-form-item>
      <a-form-item label="产品编号">
        <a-input v-decorator="['seq']" allow-clear></a-input>
      </a-form-item>
      <a-form-item label="公司">
        <a-select 
          v-decorator="['company']"
          show-arrow
          style="min-width: 193px"
          allow-clear
        >
          <a-select-option v-for="item in totalcompany" :value="item.company" :key="item.totalprocess">
            {{item.company}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="生产批次">
        <a-input v-decorator="['batch']" allow-clear></a-input>
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
      <a-table :columns="columns" :data-source="chdata" :pagination="false" :row-key="(record) => record.id">
        <template slot="detail" slot-scope="text,record">
          <a slot="detail" @click="getDat(record)">查看</a>
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
    <a-spin size="large" class="u-spin" :spinning="spinning"></a-spin>
  </div>
</template>

<script>
// E:\WebDoc\resource\node_modules\async-validator\dist-web\index.js 注释验证警告
import {mapActions, mapState} from 'vuex'
import moment from "moment";
const columns = [
  {
    title: "产品名称",
    dataIndex: "name"
  },
  {
    title: "产品编号",
    dataIndex: "seq"
  },
  {
    title: "产品批次",
    dataIndex: "batch"
  },
  {
    title: "出厂日期",
    dataIndex: "date"
  },
  {
    title: "公司",
    dataIndex: "company"
  },
  {
    title: "详细信息",
    dataIndex: "detail",
    scopedSlots: { customRender: "detail" }
  }
];
export default {
  name: "Search",
  data() {
    return {
      sourcedata: [],
      chdata: [],
      columns,
      total: 0,
      spinning: false,
      reshow: true
    };
  },
  computed: {
    ...mapState('search', ['totalcompany'])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "advanced_search" })
  },
  mounted() {
    this.pullData()
  },
  methods: {
    moment,
    ...mapActions('search', ['pullData']),
    handleSearch(e) {
      e.preventDefault();
      const value = this.form.getFieldsValue()
      this.form.validateFields((err, values) => {
        if (!err) {
          for (let key in values) {    //删除没有选择值的条件项
            values[key] ? null : delete values[key];
          }
          if (Object.keys(values).length === 0) return;
          if (!!values.date) {
            values.date = value.date.format('YYYY-MM-DD')
          }
          this.spinning = true;
          this.$axios.get('/search/data', {params: values}).then(
            (res) => {
              this.spinning = false
              if (res.data !== 'fail') {
                this.reshow = false;
                this.sourcedata = res.data;
                this.total = res.data.length;
                this.chdata = this.sourcedata.slice(0, 7)
              }
            }
          ).catch(
            (err) => {
              this.spinning = false
              console.error(err)
            }
          )
        }
      })
    },
    handleReset() {
      this.form.resetFields();
      this.chdata = [];
      this.total = 0;
    },
    onChange(pageNumber) {
      let start = (pageNumber - 1) * 7
      this.chdata = this.sourcedata.slice(start, start + 7)
    },
    getDat(value) {
      console.log(value)
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
  .u-spin {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2;  //在空数据表格上显示加载状态
  }
}
</style>
