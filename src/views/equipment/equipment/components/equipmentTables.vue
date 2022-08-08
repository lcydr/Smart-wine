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
        <template>
          <el-button type="text" size="small">货道</el-button>
          <el-button type="text" size="small">策略</el-button>
          <el-button type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as moment from "moment";
export default {
  data() {
    return {
      multipleSelection: [],
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
  },
};
</script>

<style scoped lang="less"></style>
