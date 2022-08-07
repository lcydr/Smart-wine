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
      <el-table-column
        prop="userName"
        label="人员名称
      "
        width="330"
      >
      </el-table-column>
      <el-table-column prop="regionName" label="归属区域" width="340">
      </el-table-column>
      <el-table-column prop="role.roleName" label="角色" width="330">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="340">
        <!-- :formatter="repairDrder" -->
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template>
          <el-button type="text" size="small" style="color: #5f84ff"
            >修改</el-button
          >
          <el-button type="text" size="small" style="color: #ff5a5a"
            >删除</el-button
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
    // repairDrder(row) {
    //   return row.createType === "1" ? "自动" : "手动";
    // },
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
