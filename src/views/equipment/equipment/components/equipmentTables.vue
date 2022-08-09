<template>
  <div>
    <el-table
      :data="taskInfoList"
      style="width: 100%"
      :border="false"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
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
      <el-table-column prop="node.name" label="详细地址" width="200">
      </el-table-column>
      <el-table-column prop="node.ownerName" label="合作商" width="200">
      </el-table-column>
      <el-table-column
        prop="vmStatus"
        label="设备状态"
        width="300"
        :formatter="vmStatus"
      >
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small">货道</el-button>
          <el-button type="text" size="small" @click="strategy(scope.row)"
            >策略</el-button
          >
          <el-button type="text" size="small" @click="editStrategy(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 选择策略 -->
    <StrategyEquipmentDialog
      dialogTitle="选择策略"
      :dialogVisible="dialogVisible"
      @closeDialog="closeDialog"
      :strategyList="strategyList"
      :currentStrategy="currentStrategy"
      :isShow="true"
    ></StrategyEquipmentDialog>
    <!-- 策略管理 -->
    <QuitStrategyEquipmentDialog
      dialogTitle="策略管理"
      :dialogVisible="visible"
      :strategyObj="strategyObj"
      @strategyCloseDialog="strategyCloseDialog"
      :isShow="true"
    ></QuitStrategyEquipmentDialog>
    <!-- 修改 -->
    <EditequipmentDialog
      dialogTitle="策略管理"
      :dialogVisible="EditVisible"
      @EditCloseDialog="EditCloseDialog"
      :isShow="true"
      :EditCurrentStrategy="EditCurrentStrategy"
      :EditNodeListAddress="EditNodeListAddress"
      @getEquipment="getEquipment"
      v-if="EditVisible"
    ></EditequipmentDialog>
  </div>
</template>

<script>
import * as moment from "moment";
import { getVmPolicy, postPolicy, getNode } from "@/api";
import StrategyEquipmentDialog from "./strategyEquipmentDialog.vue";
import QuitStrategyEquipmentDialog from "./QuitStrategyEquipmentDialog.vue";
import InputStrategy from "./inputStrategy.vue";
import EditequipmentDialog from "./EditequipmentDialog.vue";
export default {
  data() {
    return {
      multipleSelection: [],
      strategyObj: {},
      dialogVisible: false,
      visible: false,
      EditVisible: false,
      strategyList: [],
      currentStrategy: {},
      EditCurrentStrategy: {},
      EditNodeListAddress: "",
    };
  },
  created() {
    // console.log(this.totalCount);
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
  components: {
    StrategyEquipmentDialog,
    QuitStrategyEquipmentDialog,
    InputStrategy,
    EditequipmentDialog,
  },
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
    // 格式化时间
    times(row) {
      return moment(row.updateTime).format("YYYY.MM.DD hh:mm:ss");
    },
    // 计算序号
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    // 接收选中值
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 打开策略弹窗 查询策略
    async strategy(val) {
      const res = await getVmPolicy(val.innerCode);
      // console.log(res);
      if (res !== "") {
        //显示策略管理
        this.strategyObj = res;
        this.visible = true;
      } else {
        //显示选择策略
        this.currentStrategy = val;
        const datas = await postPolicy(this.strategyObj);
        this.strategyList = datas;
        this.dialogVisible = true;
      }
    },
    // 打开修改弹框
    async editStrategy(val) {
      this.EditCurrentStrategy = val;
      const res = await getNode({ pageIndex: this.pageIndex, pageSize: 9999 });
      console.log(res);
      this.EditNodeListAddress = res.currentPageRecords;
      this.EditVisible = true;
    },
    // 关闭选择策略弹窗
    closeDialog(val) {
      this.dialogVisible = val;
    },
    //关闭策略管理弹窗
    strategyCloseDialog(val) {
      this.visible = val;
    },
    //关闭修改弹窗
    EditCloseDialog(val) {
      this.EditVisible = val;
    },
    getEquipment() {
      this.$emit("getEquipment");
    },
  },
};
</script>

<style scoped lang="less"></style>
