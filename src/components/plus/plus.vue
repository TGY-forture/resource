<template>
  <div id="plus">
    <div class="up-index" v-show="true">
      <a-input placeholder="请输入产品编号" allow-clear class="pu-inp" v-model="seq" />
      <a-popconfirm 
        placement="top" ok-text="ok" 
        cancel-text="close" :visible="pop" 
        @cancel="pop = false" @confirm="confirm"
      >
        <a slot="icon"></a>
        <template slot="title">
          <a-input v-model="batch" placeholder="请输入产品编号"></a-input>
        </template>
        <a-button html-type="button" :loading="loading" @click="getFirstDat">确定</a-button>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Plus",
  data() {
    return {
      seq: '',
      batch: '',
      pop: false,
      loading: false,
    };
  },
  computed: {
    ...mapState(['companyinfo']),
    regseq() {
      return new RegExp(this.companyinfo.seq)
    },
    regbatch() {
      return new RegExp(this.companyinfo.batch)
    }
  },
  methods: {
    getFirstDat() {
      if (!this.regseq.test(this.seq)) return;
      this.loading = true;
      this.$axios.get('/plus', {params: { seq: this.seq, tablename: this.companyinfo.tablename }}).then(
        res => {
          this.loading = false;
          if (res.data === 'empty') {
            this.pop = true
          } else if (res.data === 'exist') {
            this.$router.push({name: 'record', params: {exist: true}, query: {seq: this.seq}})
          }
        }
      ).catch(
        err => {
          console.error(err)
        }
      )
    },
    confirm() {
      if (!this.regbatch.test(this.batch)) return;
      this.pop = false;
      this.$nextTick(() => {  
        this.$router.push({name: 'record', params: {exist:false}, query: {seq: this.seq, batch: this.batch}})
      })
    }
  },
};
</script>

<style lang="scss">
#plus {
  width: 100%;
  height: 100%;
  .up-index {
    text-align: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .pu-inp {
      width: 300px;
      height: 40px;
      margin-right: 20px;
    }
  }
}
.ant-modal-root {      //不在当前组件样式下，全局的
  .ant-input {
    width: 200px;
  }
}
.ant-popover-message-title {   //不在当前组件样式下，全局的
    padding-left: 0;
  }
</style>
