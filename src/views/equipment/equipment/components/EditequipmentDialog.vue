<template>
  <!-- 弹框 -->
  <el-dialog
    :title="dialogTitle"
    :visible="dialogVisible"
    width="33%"
    @close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="机器编号：">
        {{ EditCurrentStrategy.innerCode }}
      </el-form-item>
      <el-form-item label="供货时间：">
        {{ createTime }}
      </el-form-item>
      <el-form-item label="设备类型：">
        {{ EditCurrentStrategy.type.name }}
      </el-form-item>
      <el-form-item label="设备容量：">
        {{ EditCurrentStrategy.type.channelMaxCapacity }}
      </el-form-item>
      <el-form-item label="设备点位：">
        <InputEditStrategy :Arrlist="EditNodeListAddress"></InputEditStrategy>
      </el-form-item>
      <el-form-item label="合作商：">
        {{ EditCurrentStrategy.ownerName }}
      </el-form-item>
      <el-form-item label="所属地区：">
        {{ EditCurrentStrategy.region.name }}
      </el-form-item>
      <el-form-item label="设备地址：">
        {{ EditCurrentStrategy.node.name }}
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer" v-if="isShow">
      <Button category="configuration" @click.native="handleClose"
        >取 消</Button
      >
      <Button category="news" @click.native="putVmNode">确 定</Button>
    </span>
  </el-dialog>
</template>

<script>
import InputEditStrategy from "./inputEditStrategy.vue";
import Button from "@/components/Button";
import { putVmNode } from "@/api";
import * as dayjs from "dayjs";
export default {
  data() {
    return {
      form: {},
      createTime: "",
    };
  },
  props: {
    dialogTitle: {
      type: String,
      default: "提示",
    },
    isShow: {
      type: Boolean,
    },
    dialogVisible: {
      type: Boolean,
    },
    EditCurrentStrategy: {
      type: Object,
      required: true,
    },
    EditNodeListAddress: {
      type: Array,
      required: true,
    },
  },
  created() {
    const times = this.EditCurrentStrategy.createTime;
    const res = dayjs(times).format("YYYY.MM.DD hh:mm:ss");
    this.createTime = res;
    // let addrs = [];
    // console.log(this.EditNodeListAddress);
    // this.EditNodeListAddress.forEach((item) => {
    //   console.log(item.addr);
    //   console.log(item.addr.split("-"));
    //   const id = item.addr.split("-");

    //   // console.log(id[id.length - 1]);
    //   // if (id[id.length - 1] === "金燕龙写字楼") {

    //   // }
    //   addrs.push(id);
    // });
  },
  components: {
    Button,
    InputEditStrategy,
  },
  mounted() {},
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit("EditCloseDialog", false);
    },
    // 提交
    async putVmNode() {
      const res = await putVmNode({
        id: this.EditCurrentStrategy.id,
        nodeId: this.EditCurrentStrategy.nodeId,
      });
      this.handleClose();
      this.$emit("getEquipment");
    },
  },
};
</script>

<style scoped lang="less">
// 弹框
/deep/.el-dialog__title {
  font-weight: 700;
}
/deep/.el-dialog__footer {
  text-align: center;
}
/deep/.el-dialog__body {
  padding: 20px 20px 30px;
}
</style>
