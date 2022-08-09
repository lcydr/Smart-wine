<template>
  <div>
    <el-table :data="taskInfoList" style="width: 100%" :border="false">
      <el-table-column
        type="index"
        :index="indexChange"
        label="序号"
        width="140"
      >
      </el-table-column>
      <!-- <el-table-column prop="name" label="点位名称" width="=100">
      </el-table-column> -->
      <el-table-column prop="name" label="合作商名称" width="350">
      </el-table-column>
      <el-table-column prop="account" label="账号" width="200">
      </el-table-column>
      <el-table-column prop="vmCount" label="设备数量" width="200">
      </el-table-column>
      <el-table-column prop="ratio" label="分成比例" width="200">
      </el-table-column>
      <el-table-column prop="contact" label="联系人" width="200">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="200">
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template>
          <el-button type="text" size="small">重置密码</el-button>
          <el-button type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" class="btndel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import * as moment from "moment";
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
    // times(row) {
    //   return moment(row.updateTime).format("YYYY.MM.DD hh:mm:ss");
    // },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
  },
};
</script>

<style scoped lang="less">
.btndel {
  color: red;
}
</style>
