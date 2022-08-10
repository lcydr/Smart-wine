<template>
  <div>
    <el-table :data="taskInfoList" style="width: 100%" :border="false">
      <el-table-column
        type="index"
        :index="indexChange"
        label="序号"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="policyName" label="策略名称" width="390">
      </el-table-column>
      <el-table-column prop="discount" label="策略方案" width="390">
      </el-table-column>
      <el-table-column
        :formatter="times"
        prop="createTime"
        label="创建日期"
        width="210"
      >
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            class="aaa2"
            @click.native="xiangqing(scope.row)"
            >查看详情</el-button
          >

          <el-button
            type="text"
            size="small"
            class="aaa2"
            @click.native="xiugai(scope.row)"
            >修改</el-button
          >

          <el-button
            type="text"
            size="small"
            class="aaa3"
            plain
            @click.native="open1(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改弹窗 -->
    <AddDialog
      :visible="visible"
      @isShow="isShow"
      :datas="datas"
      v-if="visible"
      @aaaaa="aaaaa"
    ></AddDialog>
    <!-- 详情弹窗 -->
    <XiangQing
      :visible="visible"
      @isShow="isShow"
      v-if="visible"
      :xiangqingData="xiangqingData"
    ></XiangQing>
  </div>
</template>

<script>
import * as moment from "moment";
import { xiuGaiStrategy, delStrategy } from "@/api/strategy.js";
import AddDialog from "./xiugai-dialog.vue";
import XiangQing from "./xiangqing-dialog.vue";
export default {
  data() {
    return {
      visible: false,
      datas: {},
      xiangqingData: {},
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
    times(row) {
      return moment(row.updateTime).format("YYYY.MM.DD hh:mm:ss");
    },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    // 删除
    async open1(val) {
      // this.$notify({
      //   title: "提示",
      //   message: "演示系统，不支持此操作",
      //   type: "warning",
      // });
      try {
        await delStrategy({
          policyId: val.policyId,
          policyName: val.policyName,
        });
        this.$message.success("删除成功");
      } catch (e) {}
    },
    // 修改
    xiugai(val) {
      this.visible = true;
      this.datas = val;
      // console.log(this.datas);
    },
    isShow(val) {
      this.visible = val;
    },
    aaaaa() {
      this.$$emit("aaaaa");
    },
    // 详情
    xiangqing(val) {
      this.visible = true;
      // console.log(val);
      this.xiangqingData = val;
    },
  },

  components: {
    AddDialog,
    XiangQing,
  },
};
</script>

<style scoped lang="less">
.aaa2 {
  color: #5f84ff;
}
.aaa3 {
  color: #ff5a5a;
}
</style>
