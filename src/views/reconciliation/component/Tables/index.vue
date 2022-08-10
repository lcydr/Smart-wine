<template>
  <div>
    <el-table style="width: 100%" :border="false">
      <el-table-column prop="taskCode" label="订单日期" width="240">
      </el-table-column>
      <el-table-column prop="innerCode" label="合作商" width="240">
      </el-table-column>
      <el-table-column prop="taskType.typeName" label="分成比例" width="240">
      </el-table-column>
      <el-table-column prop="createType" label="收入(元)" width="240">
      </el-table-column>
      <el-table-column prop="" label="笔数" width="240"> </el-table-column>
      <el-table-column prop="userName" label="分成金额(元)" width="240">
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
    // taskInfoList: {
    //   type: Array,
    //   required: true,
    // },
    pageIndex: {
      type: Number,
      default: 1,
    },
  },
  created() {},

  methods: {
    repairDrder(row) {
      return row.createType === "1" ? "自动" : "手动";
    },
    times(row) {
      return moment(row.updateTime).format("YYYY.MM.DD hh:mm:ss");
    },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
  },
};
</script>

<style scoped lang="less"></style>
