<template>
  <div>
    <el-table :data="taskInfoList" style="width: 100%" :border="false">
      <el-table-column
        type="index"
        :index="indexChange"
        label="序号"
        width="100"
      >
      </el-table-column>
      <el-table-column prop="userName" label="人员名称" width="230">
      </el-table-column>
      <el-table-column prop="roleName" label="角色" width="235">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="210">
      </el-table-column>
      <el-table-column prop="workCount" label="完成工单(本月)" width="249">
      </el-table-column>
      <el-table-column prop="progressTotal" label="进行中工单" width="240">
      </el-table-column>
      <el-table-column prop="cancelCount" label="拒绝工单(本月)" width="230">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native="see(scope.row)"
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
    times(row) {
      return moment(row.updateTime).format("YYYY.MM.DD hh:mm:ss");
    },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    see(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped lang="less"></style>
