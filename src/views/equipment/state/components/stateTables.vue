<template>
  <div>
    <el-table :data="taskInfoList" style="width: 100%" :border="false">
      <el-table-column
        type="index"
        :index="indexChange"
        label="序号"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="innerCode" label="设备编号" width="300">
      </el-table-column>
      <el-table-column prop="type.name" label="设备类型" width="300">
      </el-table-column>
      <el-table-column prop="node.name" label="详细地址" width="300">
      </el-table-column>
      <el-table-column
        prop="vmStatus"
        label="运营状态"
        width="200"
        :formatter="vmStatus"
      >
      </el-table-column>
      <el-table-column label="设备状态" width="300">
        <template slot-scope="scope">
          <span
            :class="['span', { cellEquipment: !scope.row.status['10001'] }]"
            >{{ scope.row.status["10001"] ? "设备" : "离线" }}</span
          >
          <span
            :class="['span', { cellEquipment: !scope.row.status['10002'] }]"
            >{{ scope.row.status["10002"] ? "货道" : "故障" }}</span
          >
          <span
            :class="['span', { cellEquipment: !scope.row.status['10003'] }]"
            >{{ scope.row.status["10003"] ? "传动轴" : "故障" }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="stateDetails(scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Dialog
      dialogTitle="设备详情"
      :isShow="false"
      :dialogVisible="dialogVisible"
      @closeDialog="closeDialog"
      ref="Dialog"
    >
    </Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {},
  components: {
    Dialog,
  },
  props: {
    taskInfoList: {
      type: Array,
      required: true,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
  },
  created() {},

  methods: {
    // 处理售货机状态
    vmStatus(row) {
      if (row.vmStatus === 0) {
        return "未投放";
      } else if (row.vmStatus === 1) {
        return "运营";
      } else if (row.vmStatus === 3) {
        return "撤机";
      }
    },
    // 计算序号
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    // 打开弹窗获取信息
    stateDetails(info) {
      this.dialogVisible = true;
      // 获取一段时间内的销售总数
      this.$refs.Dialog.getOrderCount(info.innerCode);
      // 获取一定时间范围之内的收入
      this.$refs.Dialog.getOrderAmount(info.innerCode);
      // 获取售货机补货次数
      this.$refs.Dialog.getSupplyCount(info.innerCode);
      // 获取售货机维修次数
      this.$refs.Dialog.getRepairCount(info.innerCode);
      // 获取售货机商品销量
      this.$refs.Dialog.getSkuCollect(info.innerCode);
    },
    // 关闭弹窗
    closeDialog(val) {
      this.dialogVisible = val;
    },
  },
};
</script>

<style scoped lang="less">
.cell .span {
  background-color: #48d598;
  display: inline-block;
  padding: 0px 10px;
  margin: 0 5px;
  border-radius: 999px;
  color: #fff;
}
.cell .cellEquipment {
  background-color: #ffbd26 !important;
  display: inline-block;
  z-index: 999;
}
</style>
