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
      <el-form-item label="选择策略：">
        <InputStrategy
          :Arrlist="AddStrategyList"
          ref="InputSelectVmType"
        ></InputStrategy>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer" v-if="isShow">
      <Button category="configuration" @click.native="handleClose"
        >取 消</Button
      >
      <Button category="news" @click.native="applyPolicy">确 定</Button>
    </span>
  </el-dialog>
</template>

<script>
import Button from "@/components/Button";
import InputStrategy from "./inputStrategy.vue";
import { putApplyPolicy } from "@/api";
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
    AddStrategyList: {
      type: [Object, Array],
      required: true,
    },
    innerCodeList: {
      type: [Object, Array],
      required: true,
    },
  },
  created() {},
  components: {
    Button,
    InputStrategy,
  },
  mounted() {},
  methods: {
    async applyPolicy() {
      try {
        await putApplyPolicy({
          innerCodeList: this.innerCodeList,
          policyId: this.$refs.InputSelectVmType.select,
        });
        this.handleClose();
      } catch (error) {
        // this.$message.error("请正确操作");
      }
    },
    // 关闭弹窗
    handleClose() {
      this.$emit("closeDialog", false);
      this.$refs.InputSelectVmType.select = "";
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
