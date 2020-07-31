<template>
  <div id="record">
    <div id="step" class="slay">
      <div class="nest" v-if="steps.length > 0 ? true : false">
        <a-steps  direction="vertical">
          <a-step
            v-for="item of steps"
            :key="item.id"
          >
            <span slot="title">{{proinfo[item.process]}}</span>
            <span slot="subTitle" style="font-size: 10px">
              {{item.date}}
            </span>
            <a-icon slot="icon" :type="icon(item.action)"></a-icon>
            <p slot="description">员工{{item.name}}执行操作{{'增加记录'}}</p>
          </a-step>
        </a-steps>
      </div>
      <div v-else>
        <h2 class="empty">暂无记录!</h2>
      </div>
    </div>
    <div id="operation" class="slay">
      <a-button type="primary" @click="showModal" :disabled="steps.length === 5 ? true : false">增加工序</a-button>
      <a-button type="default" @click="changeDat" :diabled="steps.length > 0 ? false : true">修改信息</a-button>
      <a-tooltip placement="top">
        <template slot="title">
          <span>只能删除最新记录</span>
        </template>
        <a-button type="danger" @click="showDeleteConfirm" :diabled="steps.length > 0 ? false : true">删除记录</a-button>
      </a-tooltip>
      <a-button type="dashed" :disabled="steps.length === 5 ? false : true">生成二维码</a-button>
    </div>
    <add-item 
      :visible="visible" 
      v-bind="propobj" 
      ref="additem" 
      v-on="{cancel: handleCancel, refresh: getFlashValue}"
    >
    </add-item>
    <change-item 
      :show="show" ref="changeitem"
      @cancel="cancelChange"
      @refresh="getFlashValue"
      v-bind="propobj"
    >
    </change-item>
  </div>
</template>

<script>
import AddItem from "./additem";
import ChangeItem from "./changeitem"
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "Record",
  data() {
    return {
      visible: false,
      show: false,
      proinfo: {},   //工序名称
      fields: {},    //工序对应字段名
      fieldsvalue: {},  //字段对应值
      steps: []        //步骤信息
    };
  },
  components: {
    AddItem,
    ChangeItem
  },
  computed: {
    ...mapGetters(["companyinfo"]),
    propobj() {
      return {
        proinfo: this.proinfo,
        fields: this.fields,
        fieldsvalue: this.fieldsvalue,
        steps: this.steps
      }
    }
  },
  beforeRouteEnter(to, from, next) { //新增情况
    if (to.params.exist === false) {
      next(vm => {
        vm.$axios.put('/record', {seq: to.query.seq, table: vm.$store.state.companyinfo.tablename}).then(
          res => {
            if (res.data === 'ok') {
              vm.$message.success('操作成功')
            } else if (res.data === 'fail') {
              vm.$message.error('操作失败')
            } 
          }
        ).catch(
          err => {
            console.error(err)
          }
        )
      })
    } else if (to.params.exist === true) {
      next(vm => {
        vm.$message.success('操作成功')
      })
    }
  },
  mounted() {
    if (this.$route.params.exist === true) {
      this.getFlashValue()
    }
  },
  //不使用beforeCreate,data观测和event|watcher尚未配置
  created() {
    this.getProinfo()
  },
  methods: {
    // ...mapMutations('product', ['injectdata']),
    ...mapActions('product', ['getProinfo']),
    showModal() {
      this.visible = true;
    },
    changeDat() {
      this.show = true
    },
    handleCancel() {
      let additem = this.$refs.additem;
      additem.form.resetFields();
      additem.partfields = null;
      this.visible = false;
    },
    cancelChange() {
      let changeitem = this.$refs.changeitem;
      changeitem.form.resetFields();
      changeitem.havelist = null;
      this.show = false
    },
    getFlashValue() {
      this.$axios.get('/record/data', {params: {seq: this.$route.query.seq, company: this.$store.state.copyinfo.company}}).then(
        (res) => {
          if (res.data !== 'fail') {
            this.steps = res.data.sort((previous, after) => {
              if (previous.id < after.id) {
                return -1
              } else if (previous.id > after.id) {
                return 1
              } else {
                return 0
              }
            })
          }
        }
      ).catch(
        (err) => {
          console.error(err)
        }
      )
    },
    icon(action) {
      let icon;
      switch(action) {
        case 'add': icon = 'file-add'; break
        case 'edit': icon = 'edit'; break
        case 'delete': icon = 'delete'; break 
        case 'create': icon = 'check'; break 
        default: break 
      }
      return icon
    },
    onOk() {
      let stateval = {
        table: this.$store.state.companyinfo.tablename,
        seq: this.$route.query.seq,
        name: this.$store.state.copyinfo.name,
        action: 'delete',
        date: new Date().toLocaleDateString(),
        company: this.$store.state.copyinfo.company
      }
      let last = this.steps[this.steps.length - 1] //获得最后一个元素
      let process = last.process;
      let values = {};
      for (let val of this.fields[process]) {
        values[val] = ''
      }
      values['process'] = process
      this.$axios.post('/record/add', {
        values,
        stateval
      }).then(
        res => {
          if (res.data === 'ok') {
            this.$message.info('信息已删除')
            this.getFlashValue()
          } else if (res.data === 'fail') {
            this.$message.error('操作失败')
          }
        }
      ).catch(
        err => {
          console.error(err)
        }
      )
    },
    showDeleteConfirm() {
      this.$confirm({
        title: '你确定要删除最新的记录吗?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: this.onOk
      });
    }
  }
};
</script>

<style lang="scss">
#record {
  height: 100%;
  display: flex;
  .slay {
    width: 50%;
    height: 100%;
  }
  #step {
    position: relative;
    .nest {
      padding: 20px;
      height: 100%;
      box-sizing: border-box;
      overflow-y: scroll;
      .ant-steps-item {
        width: 300px;
        margin: 0 auto;
        .ant-steps-item-content {
          width: inherit;
        }
      }
    }
    &::before {
      content: "工序记录";
      min-width: 1em;
      // height: auto;
      position: absolute;
      top: 50%;
      left: 10px;
      padding: 7px;
      border: 1px solid #b2bec3;
      border-radius: 3px;
      transform: translateY(-50%);
      box-shadow: 2px -2px 5px 0 #dfe6e9, 2px 2px 5px 0 #dfe6e9,
        -2px 2px 5px 0 #dfe6e9, -2px -2px 5px 0 #dfe6e9;
    }
    &::after {
      content: "";
      width: 20px;
      height: 100%;
      background-color: #fff;
      position: absolute;
      top: 0;
      right: 0;
    }
    .empty {
      font-weight: 600;
      text-align: center;
      margin-top: 45%;
    }
  }
  #operation {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .ant-btn {
      width: 200px;
    }
  }
}
</style>