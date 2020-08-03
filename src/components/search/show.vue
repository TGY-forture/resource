<template>
  <div id="detailifo">
    <a-button type="default" style="margin: 10px" @click="back">返回</a-button>
    <div class="info">
      <div class="inner">
        <a-descriptions title="Basin Information" bordered>
          <a-descriptions-item v-for="(item, index) in prodata" :label="item.label" :key="index">
            {{item.val}}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="Process Information" bordered>
          <a-descriptions-item v-for="(item, index) in process" :label="item.process" :key="index">
            {{item.val}}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="Detail" bordered>
          <a-descriptions-item v-for="(item, index) in detail" :label="item.description" :key="index">
            {{item.detailvalue}}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Show',
  data() {
    return {
      basicinfo: {},
      processinfo: {},
      items: {}
    }
  },
  computed: {
    prodata() {
      let fields = {
        name: '产品名称',
        seq: '产品编号',
        company: '公司',
        batch: '批次',
        date: '生产日期'
      };
      let comarr = []
      for (let key in fields) {
        comarr.push({
          label: fields[key],
          val: this.basicinfo[key]
        })
      }
      return comarr
    },
    process() {
      let ret = [];
      for (let key in this.processinfo) {
        if (/^p/.test(key)) {
          ret.push({
            process: '第' + key.slice(-1) + '道工序',
            val: this.processinfo[key]
          })
        }
      }
      return ret
    },
    detail() {
      let val = [];
      for (let key in this.items[0]) {
        if (key !== 'seq' && key !== 'id' && key !== 'havedone') {
          val.push({
            description: this.items[0][key],
            detailvalue: this.items[1][key]
          })
        }
      }
      return val
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'search') {
      this.$message.warning('本页不能跳转')
      next(false)
    } else {
      next()
    }
  },
  beforeMount() {
    let params = this.$route.params;
    this.$axios.get('/', {params: {seq: params.seq, company: params.company}}).then(
      res => {
        if (res.data !== 'fail') {
          this.basicinfo = res.data[0];
          this.processinfo = res.data[1][0][0];
          this.items = res.data[1][1];
        }
      }
    ).catch(
      err => {
        console.error(err)
      }
    )
  }
}
</script>

<style lang="scss">
#detailifo {
  height: 100%;
  .info {
    height: 80%;
    width: 80%;
    position: relative;
    // background-color: red;
    margin: 0 auto;
    .inner {
      height: 100%;
      overflow-y: scroll;
    }
    &::after {
      content: '';
      width: 17px;
      height: 100%;
      background-color: white;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .ant-descriptions {
    margin-bottom: 20px;
      .ant-descriptions-title {
      margin-bottom: 0;
    }
  }
}
</style>