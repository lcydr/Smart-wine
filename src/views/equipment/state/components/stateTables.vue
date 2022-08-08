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
  </div>
</template>

<script>
import * as moment from "moment";
export default {
  data() {
    return {};
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
    stateDetails(info) {
      console.log(info);
      console.log(info.type.typeId);
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
