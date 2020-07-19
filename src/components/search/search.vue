<template>
  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-form-item label="日期">
        <a-date-picker v-decorator="['date',{rules:[{type: 'object'}]}]" />
      </a-form-item>
      <a-form-item label="产品编号">
        <a-input class="pro-num pro" v-decorator="['seq']" allow-clear></a-input>
      </a-form-item>
      <a-form-item label="负责人">
        <a-input class="pro-man pro" v-decorator="['manager']" allow-clear></a-input>
      </a-form-item>
      <a-form-item label="生产批次">
        <a-input class="pro-cnt pro" v-decorator="['batch']" allow-clear></a-input>
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
      <a-table :columns="columns" :data-source="dat" :pagination="false" :row-key="(record) => record.id">
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
    title: "负责人",
    dataIndex: "manager"
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
      sourcedat: null,
      dat: null,
      columns,
      total: 0,
      spinning: false,
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
      const value = this.form.getFieldsValue()
      for (let key in value) {
        value[key] ? null : delete(value[key])
      }
      if (Object.keys(value).length == 0) return
      this.spinning = true
      if (value.date) {
        value.date = value.date.format('YYYY-MM-DD')
      }
      this.$axios.get('/search', {
        params: value
      }).then(
        (res) => {
          this.spinning = false
          if (res.data != 'err') {
            this.reshow = false
            this.dat = res.data.slice(0, 7)
            this.sourcedat = res.data
            this.total = res.data.length
            // console.log(res.data)
          } else {
            throw(new Error('服务器故障'))
          }
        }
      ).catch(
        (errval) => {
          this.$message.error(errval.message)
        }
      )
    },
    handleReset() {
      this.form.resetFields();
      this.dat = null
      this.total = 0
    },
    moment,
    onChange(pageNumber) {
      let start = (pageNumber - 1) * 7
      this.dat = this.sourcedat.slice(start, start + 7)
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
