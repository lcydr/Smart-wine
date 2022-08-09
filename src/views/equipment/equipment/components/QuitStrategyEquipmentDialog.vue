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
      <el-row>
        <el-col :span="12">
          <el-form-item label="机器编号："
            >{{ strategyObj.innerCode }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="策略名称："
            >{{ strategyObj.policyName }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="策略方案："
            >{{ strategyObj.discount }}%
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="isShow">
      <Button category="configuration" @click.native="handleClose"
        >取消策略</Button
      >
    </span>
  </el-dialog>
</template>

<script>
import Button from "@/components/Button";
import InputSelectVmType from "./inputSelectVmType.vue";
import InputSelectVmNode from "./inputSelectVmNode.vue";
import { putCancelPolicy } from "@/api";
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
    strategyObj: {
      type: [Object, Array],
      required: true,
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
    async handleClose() {
      // console.log(this.strategyObj);
      await putCancelPolicy({
        innerCode: this.strategyObj.innerCode,
        policyId: this.strategyObj.policyId,
      });
      this.$emit("strategyCloseDialog", false);
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
