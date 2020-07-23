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
export default {
  name: "plus",
  data() {
    return {
      state: null, //用vuex.state代替
      seq: '',
      pop: false,
      loading: false,
    };
  },
  created() {
    this.$axios.get('/plus', {params: {company: '能力有限公司'}}).then(
      res => {
        if (res.data !== 'fail') {
          this.state = res.data[0]
        }
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  },
  methods: {
    getFirstDat() {
      const regseq = new RegExp(this.state.seq)
      if (!regseq.test(this.seq)) return
      this.loading = true;
      this.$axios.get('/plus/getdata', {params: { seq: this.seq, tablename: this.state.tablename }}).then(
        res => {
          this.loading = false;
          if (res.data === 'empty') {
            this.pop = true
          } else if (res.data === 'exist') {
            this.$router.push({name: 'record'})
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
        this.$router.push('/record')
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
