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
      <el-form-item label="设备编号："> 系统自动生成 </el-form-item>
      <el-form-item label="选择型号：">
        <InputSelectVmType
          :Arrlist="NameList"
          ref="InputSelectVmType"
        ></InputSelectVmType>
      </el-form-item>
      <el-form-item label="选择点位：">
        <InputSelectVmNode
          :Arrlist="NodeList"
          ref="InputSelectVmNode"
        ></InputSelectVmNode>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer" v-if="isShow">
      <Button category="configuration" @click.native="handleClose"
        >取 消</Button
      >
      <Button category="news" @click.native="AddVm">确 定</Button>
    </span>
  </el-dialog>
</template>

<script>
import Button from "@/components/Button";
import InputSelectVmType from "./inputSelectVmType.vue";
import InputSelectVmNode from "./inputSelectVmNode.vue";
import { getvmType, getNode, postVm } from "@/api";
export default {
  data() {
    return {
      form: {
        vmType: 0, //售货机类型id
        nodeId: "", // 所属点位id
        createUserId: 0, //创建人id,
      },
      NameList: [],
      NodeList: [],
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
  },
  created() {},
  components: {
    Button,
    InputSelectVmType,
    InputSelectVmNode,
  },
  mounted() {},
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$emit("closeDialog", false);
    },
    // 获取列表
    async getvmType(pageIndex) {
      const res = await getvmType({ pageIndex, pageSize: 9999 });
      this.NameList = res.currentPageRecords;
      console.log(res);
    },
    // 获取点位信息
    async getNode(pageIndex) {
      const res = await getNode({ pageIndex, pageSize: 9999 });
      this.NodeList = res.currentPageRecords;
      console.log(res);
    },
    // 新增售货机
    async AddVm() {
      this.form.vmType = this.$refs.InputSelectVmType.select;
      this.form.nodeId = this.$refs.InputSelectVmNode.select;
      this.form.createUserId = this.$refs.InputSelectVmNode.currentUserId;
      try {
        const res = await postVm({
          vmType: this.form.vmType,
          nodeId: this.form.nodeId,
          createUserId: this.form.createUserId,
        });
        this.$emit("getEquipment");
        this.handleClose();
        this.$message.success("操作成功");
      } catch (error) {
        // console.log(error);
      }
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
