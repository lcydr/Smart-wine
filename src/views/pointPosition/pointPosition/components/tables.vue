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
      <el-table-column prop="name" label="点位名称" width="300">
      </el-table-column>
      <el-table-column prop="region.name" label="所在区域" width="300">
      </el-table-column>
      <el-table-column prop="businessType.name" label="商圈类型" width="300">
      </el-table-column>
      <el-table-column prop="ownerName" label="合作商" width="300">
      </el-table-column>
      <el-table-column prop="addr" label="详细地址" width="300">
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template>
          <el-button type="text" size="small" @click.native="Details"
            >查看详情</el-button
          >
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" class="btndel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- //详情弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%">
      <el-table style="width: 100%" :border="false" :data="taskInfoList">
        <el-table-column
          type="index"
          :index="indexChange"
          label="序号"
          key=""
          width="100"
        >
        </el-table-column>
        <!-- <el-table-column prop="name" label="点位名称" width="=100">
      </el-table-column> -->
        <el-table-column label="机器编号" width="200"> </el-table-column>
        <el-table-column label="设备状态" width="200"> </el-table-column>
        <el-table-column label="最后一次供货时间" width="200">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRegionalDetails } from "@/api";
// import * as moment from "moment";
export default {
  data() {
    return {
      dialogVisible: false,
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
    // times(row) {
    //   return moment(row.updateTime).format("YYYY.MM.DD hh:mm:ss");
    // },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    async Details() {
      console.log(this.taskInfoList);
      console.log(this);
      this.dialogVisible = true;

      // const res = await getRegionalDetails(this.regionId);
      // console.log(res);
    },
  },
};
</script>

<style scoped lang="less">
.btndel {
  color: red;
}
</style>
