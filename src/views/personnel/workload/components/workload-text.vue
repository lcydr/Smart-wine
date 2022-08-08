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
          <el-button
            @click="dialogVisible = true"
            type="text"
            size="small"
            @click.native="see(scope.row.userId)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="人员详情" :visible.sync="dialogVisible" width="40%">
      <div class="top">
        <div class="tops">
          <div>人员名称:{{ details.userName }}</div>
          <div>角色:{{ details.roleName }}</div>
          <div>联系电话:{{ details.mobile }}</div>
        </div>
        <div>负责区域:{{ details.regionName }}</div>
      </div>
      <div class="bottom">
        <div class="a">1</div>
        <div class="a">总工单数</div>
        <div class="a">拒绝工单</div>
        <div class="a">完成工单</div>
        <div class="a">进行中工单</div>
      </div>
      <div class="data">
        <div class="a">本周</div>
        <div class="a">{{ dayData.total }}</div>
        <div class="a">{{ dayData.cancelCount }}</div>
        <div class="a">{{ dayData.workCount }}</div>
        <div class="a">{{ dayData.progressTotal }}</div>
      </div>
      <div class="data">
        <div class="a">本月</div>
        <div class="a">{{ monthData.total }}</div>
        <div class="a">{{ monthData.cancelCount }}</div>
        <div class="a">{{ monthData.workCount }}</div>
        <div class="a">{{ monthData.progressTotal }}</div>
      </div>
      <div class="data">
        <div class="a">本年</div>
        <div class="a">{{ yearData.total }}</div>
        <div class="a">{{ yearData.cancelCount }}</div>
        <div class="a">{{ yearData.workCount }}</div>
        <div class="a">{{ yearData.progressTotal }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as moment from "moment";
import { getUserInfo, getUserWorkload } from "@/api/personnel";
export default {
  data() {
    return {
      dialogVisible: false,
      details: [],
      // gettime:''
      yearData: [], //年
      monthData: [], //月
      dayData: [],
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
    // 详情
    async see(id) {
      const res = await getUserInfo(id);
      // console.log(res);
      this.details = res;
      // console.log(this.details);

      // 年
      //获取当天到23.59.59时间
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = 23;
      let mf = 59;
      let ss = 59;
      this.gettime =
        yy + "-0" + mm + "-0" + dd + " " + hh + ":" + mf + ":" + ss;
      // console.log(this.gettime);
      // 年初时间
      let yy1 = new Date().getFullYear();
      let mm1 = 1;
      let dd1 = 1;
      let hh1 = 0;
      let mf1 = 0;
      let ss1 = 0;
      this.gettime1 =
        yy1 + "-0" + mm1 + "-0" + dd1 + " 0" + hh1 + ":0" + mf1 + ":0" + ss1;
      // console.log(this.gettime1);
      const ress = await getUserWorkload({
        userId: id,
        start: this.gettime1,
        end: this.gettime,
      });
      this.yearData = ress;
      // console.log(this.yearData);

      // 月
      let yy2 = new Date().getFullYear();
      let mm2 = new Date().getMonth() + 1;
      let dd2 = 1;
      let hh2 = 0;
      let mf2 = 0;
      let ss2 = 0;
      this.gettime2 =
        yy2 + "-0" + mm2 + "-0" + dd2 + " 0" + hh2 + ":0" + mf2 + ":0" + ss2;
      // console.log(this.gettime2);
      const resss = await getUserWorkload({
        userId: id,
        start: this.gettime2,
        end: this.gettime,
      });
      this.monthData = resss;
      // console.log(this.monthData);

      // 周
      let yy3 = new Date().getFullYear();
      let mm3 = new Date().getMonth() + 1;
      let dd3 = new Date().getDay() + 7;
      let hh3 = 0;
      let mf3 = 0;
      let ss3 = 0;
      this.gettime3 =
        yy3 + "-0" + mm3 + "-0" + dd3 + " 0" + hh3 + ":0" + mf3 + ":0" + ss3;
      // console.log(this.gettime3);
      const ressss = await getUserWorkload({
        userId: id,
        start: this.gettime3,
        end: this.gettime,
      });
      this.dayData = ressss;
    },
  },
};
</script>

<style scoped lang="less">
.top {
  height: 86px;
  padding: 19px 19px 0;
  background: #f3f6fb;
  .tops {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 15px;
  }
}
.bottom {
  margin-top: 26px;
  background: #f7f8fd;
  height: 40px;
  border: 1px solid #d8dde3;
  display: flex;
  align-items: center;
  .a {
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    width: 20%;
    text-align: center;
  }
}
.data {
  height: 40px;
  border: 1px solid #d8dde3;
  display: flex;
  align-items: center;
  .a {
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    width: 20%;
    text-align: center;
  }
}
/deep/.el-dialog {
  border-radius: 0.5rem !important;
}
/deep/.el-dialog__body {
  border-radius: 0.5rem !important;
}
</style>
