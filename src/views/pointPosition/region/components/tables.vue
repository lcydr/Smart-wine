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
      <el-table-column prop="name" label="区域名称" width="=500">
      </el-table-column>
      <el-table-column prop="nodeCount" label="点位数" width="500">
      </el-table-column>
      <el-table-column prop="remark" label="备注说明" width="500">
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template>
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
