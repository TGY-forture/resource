<template>
  <div id="record">
    <div id="step" class="slay">
      <div class="nest" v-if="steps.length > 0 ? true : false">
        <a-steps :current="steps.length - 1" direction="vertical">
          <a-step v-for="item of steps" :key="item.id">
            <span slot="title">{{ proinfo[item.process] }}</span>
            <span slot="subTitle" style="font-size: 10px">
              {{ item.date }}
            </span>
            <a-icon slot="icon" :type="icon(item.action)"></a-icon>
            <p slot="description">
              员工{{ item.name }}执行操作{{
                item.action === "add" ? "增加工序" : "修改信息"
              }}
            </p>
          </a-step>
        </a-steps>
      </div>
      <div v-else>
        <h2 class="empty">暂无记录!</h2>
      </div>
    </div>
    <div id="operation" class="slay">
      <a-button type="primary" @click="showModal('add')" :disabled="disabled"
        >增加工序</a-button
      >
      <a-button
        type="default"
        @click="showModal('change')"
        :disabled="havedone > 0 ? false : true"
        >修改信息</a-button
      >
      <a-button
        type="danger"
        @click="showDeleteConfirm"
        :disabled="steps.length > 0 ? false : true"
        >删除记录</a-button
      >
      <a-button
        type="dashed"
        @click="createQrcode"
        :loading="loading"
        :disabled="!disabled"
        >生成二维码</a-button
      >
    </div>
    <add-item
      :visible="visible"
      :action="action"
      ref="additem"
      v-on="{ cancel: handleCancel, refresh: getFlashValue }"
      :proinfo="processprop"
    >
    </add-item>
  </div>
</template>

<script>
import AddItem from "./additem";
import QRCode from "qrcode";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import moment from "moment";

export default {
  name: "Record",
  data() {
    return {
      visible: false,
      show: false,
      loading: false,
      processprop: {},
      action: "",
      src: null,
    };
  },
  components: {
    AddItem,
  },
  computed: {
    ...mapGetters(["companyinfo"]),
    ...mapState("product", [
      "proinfo",
      "fields",
      "fieldsvalue",
      "steps",
      "havedone",
    ]),
    disabled() {
      return this.havedone === this.companyinfo.totalprocess;
    },
  },
  beforeRouteEnter(to, from, next) {
    //新增情况
    if (to.params.exist === false) {
      next((vm) => {
        vm.$axios
          .put("/record", {
            seq: to.query.seq,
            batch: to.query.batch,
            table: vm.companyinfo.tablename,
          })
          .then((res) => {
            if (res.data === "ok") {
              vm.$message.success("操作成功");
              vm.getHavedone(to.query.seq);
            } else if (res.data === "fail") {
              vm.$message.error("操作失败");
              return Promise.reject("fail");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      });
    } else if (to.params.exist === true) {
      next((vm) => {
        vm.$message.success("操作成功");
        vm.getHavedone(to.query.seq);
      });
    }
  },
  mounted() {
    if (this.$route.params.exist === true) {
      this.getFlashValue(this.$route.query.seq);
    } else {
      this.clearSteps();
    }
  },
  //不使用beforeCreate,data观测和event|watcher尚未配置
  created() {
    this.getProinfo();
  },
  methods: {
    ...mapMutations("product", ["clearSteps"]),
    ...mapActions("product", ["getProinfo", "getFlashValue", "getHavedone"]),
    makeHaveData() {
      let readydata = {};
      let arr = [];
      for (let i = 1; i <= this.havedone; i++) {
        arr.push("process" + i); //根据已添加过得工序生成可修改的工序项
      }
      arr.forEach((value, index) => {
        readydata[value] = this.proinfo[value];
      });
      return readydata;
    },
    showModal(val) {
      this.action = val;
      if (val === "add") {
        this.processprop = this.proinfo;
      } else if (val === "change") {
        this.processprop = this.makeHaveData();
      }
      this.visible = true;
    },
    handleCancel() {
      let additem = this.$refs.additem;
      additem.form.resetFields();
      additem.partfields = {};
      this.visible = false;
    },
    icon(action) {
      let icon;
      switch (action) {
        case "add":
          icon = "file-add";
          break;
        case "change":
          icon = "edit";
          break;
        default:
          break;
      }
      return icon;
    },
    onOk() {
      this.$axios
        .delete("/record", { params: { company: this.companyinfo.company } })
        .then((res) => {
          if (res.data === "ok") {
            this.$message.info("操作成功");
            this.getFlashValue(this.$route.query.seq);
          } else if (res.data === "fail") {
            this.$message.error("操作失败");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    showDeleteConfirm() {
      this.$confirm({
        title: "你确定要删除吗?",
        content: "此操作会删除最新的工序记录，对于已经添加的数据，请选择修改！",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: this.onOk,
      });
    },
    createQrcode() {
      this.loading = true;
      let seq = this.$route.query.seq;
      let values = {
        seq,
        name: this.companyinfo.proname,
        date: moment(new Date()).format("YYYY-MM-DD"),
        company: this.companyinfo.company,
      };
      this.$axios
        .post("/", { ...values })
        .then((res) => {
          if (res.data === "ok" || res.data === "exist") {
            QRCode.toDataURL(`http://10.146.232.80:8081/show?seq=${seq}&company=` + encodeURI(this.companyinfo.comapny), {
              width: 200,
            })
              .then((url) => {
                this.loading = false;
                this.src = url;
                this.$confirm({
                  title: "success!",
                  icon: function() {
                    return (
                      <a-icon
                        type="check-circle"
                        theme="twoTone"
                        two-tone-color="#52c41a"
                      ></a-icon>
                    );
                  },
                  okText: "下载",
                  cancelText: "关闭",
                  // JSX support ,vue/cli当前已默认安装插件
                  content: (
                    <div>
                      <img src={url} />
                    </div>
                  ),
                  onOk: this.downloadImage,
                  destroyOnClose: true,
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    downloadImage() {
      if (window.navigator.msSaveOrOpenBlob) {
        let bstr = atob(this.src.split(",")[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, "QRCode.png");
      } else {
        var tag = document.createElement("a");
        tag.href = this.src;
        tag.download = "QRCode.png";
        tag.click();
      }
    },
  },
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
