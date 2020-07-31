<template>
  <div id="plus">
    <div class="up-index" v-show="true">
      <a-input placeholder="请输入产品编号" allow-clear class="pu-inp" v-model="seq" />
      <a-popconfirm 
        placement="top" ok-text="Yes" 
        cancel-text="No" :visible="pop" 
        @cancel="pop = false" @confirm="confirm"
      >
        <template slot="title">
          <p>当前数据不存在,是否添加?</p>
        </template>
        <a-button html-type="button" :loading="loading" @click="getFirstDat">确定</a-button>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Plus",
  data() {
    return {
      seq: '',
      pop: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(['companyinfo']),
    regseq() {
      return RegExp(this.companyinfo.seq)
    }
  },
  methods: {
    getFirstDat() {
      if (!this.regseq.test(this.seq)) return
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
      this.pop = false;
      this.$nextTick(() => {
        this.$router.push({name: 'record', params: {exist:false}, query: {seq: this.seq}})
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
.ant-modal-root {
  .ant-input {
    width: 200px;
  }
}
</style>
