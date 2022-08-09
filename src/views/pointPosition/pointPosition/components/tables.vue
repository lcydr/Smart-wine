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
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native="Details(scope.row)"
            >查看详情</el-button
          >
          <el-button type="text" size="small" @click.native="Revise(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            class="btndel"
            @click.native="open2"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- //详情弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%">
      <el-table style="width: 100%" :border="false" :data="Detailslist">
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
        <el-table-column prop="innerCode" label="机器编号" width="200">
        </el-table-column>
        <el-table-column
          prop="vmStatus"
          label="设备状态"
          width="200"
          :formatter="buff"
        >
        </el-table-column>
        <el-table-column
          prop="lastSupplyTime"
          label="最后一次供货时间"
          width="200"
          :formatter="timer"
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <!-- 修改弹框 -->
    <popup
      v-if="isshow"
      :isshow="isshow"
      :Detailslist="Detailslist"
      :shujuxuanran="shujuxuanran"
      :arealist="arealist"
      ref="popup"
      :taskInfoList="taskInfoList"
    ></popup>
  </div>
</template>

<script>
import { getRegionalDetails } from "@/api";
import popup from "./pop-up.vue";
import * as moment from "moment";
export default {
  data() {
    return {
      dialogVisible: false,
      Detailslist: [],
      isshow: false,
      shujuxuanran: {},
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
    arealist: {
      type: Array,
    },
  },
  created() {
    // console.log(this.taskInfoList);
  },
  components: {
    popup,
  },
  methods: {
    indexChange(index) {
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    //查看详情
    async Details(val) {
      const res = await getRegionalDetails(val.id);
      // console.log(res);
      // console.log(val);
      this.Detailslist = res;

      this.dialogVisible = true;
    },
    buff(row) {
      // console.log(row);
      return row.vmStatus === 0 ? "未投放" : "运营";
    },
    timer(row) {
      return moment(row.lastSupplyTime).format("YYYY.MM.DD hh:mm:ss");
    },
    //删除
    open2() {
      this.$notify({
        title: "警告",
        message: "演示系统，不支持此操作",
        type: "warning",
      });
    },
    //修改
    async Revise(val) {
      // const obj = this.taskInfoList.find(
      //   (item) => item.region.name === val.region.name
      // );
      // console.log(obj.region.id);
      // console.log(val);
      const res = await getRegionalDetails(val.businessId);
      // console.log(res);
      // console.log(res.node);
      this.shujuxuanran = val;
      this.$nextTick(() => {
        this.isshow = true;
      });
    },
  },
};
</script>

<style scoped lang="less">
.btndel {
  color: red;
}
</style>
