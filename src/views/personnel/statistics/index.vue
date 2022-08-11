<template>
  <div>
    <!-- 上边区域 -->
    <div class="top">
      <div class="left">
        <div class="operating"><h4>运营人员(当天)</h4></div>
        <div class="sun">
          <div class="text">
            <div class="text1">{{ data.total }}</div>
            <div class="text2">工单总数(个)</div>
          </div>
          <div class="text">
            <div class="text1">{{ data.completedTotal }}</div>
            <div class="text2">完成工单(个)</div>
          </div>
          <div class="text">
            <div class="text1">{{ data.cancelTotal }}</div>
            <div class="text2">拒绝工单(个)</div>
          </div>
          <div class="text">
            <div class="text1">{{ data.workerCount }}</div>
            <div class="text2">运营人员数(个)</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="operating"><h4>运维人员(当天)</h4></div>
        <div class="sun">
          <div class="text">
            <div class="text1">{{ datas.total }}</div>
            <div class="text2">工单总数(个)</div>
          </div>
          <div class="text">
            <div class="text1">{{ datas.completedTotal }}</div>
            <div class="text2">完成工单(个)</div>
          </div>
          <div class="text">
            <div class="text1">{{ datas.cancelTotal }}</div>
            <div class="text2">拒绝工单(个)</div>
          </div>
          <div class="text">
            <div class="text1">{{ datas.workerCount }}</div>
            <div class="text2">运维人员数(个)</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下边区域 -->
    <div class="bottom">
      <div class="left">
        <!-- 日期选择 -->
        <div class="state">
          <div class="aaa1"><h4>工单状态</h4></div>
          <div class="aaa2">
            <template>
              <div class="block">
                <el-date-picker
                  width="100px"
                  v-model="value2"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM"
                >
                </el-date-picker>
              </div>
            </template>
          </div>
          <div class="aaa3"></div>
        </div>
        <!-- 列表 -->
        <div class="imgss">
          <img src="../../../assets/wushujv.png" alt="" />
          <div>暂无数据</div>
        </div>
      </div>
      <div class="right">
        <!-- 顶部 -->
        <div class="topp">
          <div class="text">
            <h4>人效排名（月度）</h4>
          </div>
          <div>
            <el-form>
              <el-form-item label="">
                <el-select v-model="index1" placeholder="全部">
                  <el-option
                    v-for="(item, index) in getRegionName"
                    @click.native="choice"
                    :key="index"
                    :label="item"
                    :value="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="xuanz">
          <div class="falses" @click="dianji">运营人员</div>
          <div class="trues" @click="dianjis">运维人员</div>
        </div>
        <!-- 列表 -->
        <div class="aaaa">
          <img src="../../../assets/wushujv.png" alt="" />
          <div>暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dayjs from "dayjs";
import {
  taskReportInfo,
  getRegion,
  collectReport,
  userWorkTop,
} from "@/api/personnel";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            async onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
              const starts = dayjs(start).format("YYYY-MM-DD");
              const ends = dayjs(end).format("YYYY-MM-DD");
              await collectReport({ start: starts, end: ends });
            },
          },
          {
            text: "最近一个月",
            async onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
              const starts = dayjs(start).format("YYYY-MM-DD");
              const ends = dayjs(end).format("YYYY-MM-DD");
              await collectReport({ start: starts, end: ends });
            },
          },
          {
            text: "最近一年",
            async onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
              const starts = dayjs(start).format("YYYY-MM-DD");
              const ends = dayjs(end).format("YYYY-MM-DD");
              await collectReport({ start: starts, end: ends });
            },
          },
        ],
      },
      value2: "",
      gettime: "",
      gettime3: "",
      formInline: {
        user: "",
        region: "",
      },
      data: [],
      datas: [],
      getRegionName: [],
      getRegionId: [],
      getRegionData: [],
      index1: "",
      isShow: false,
    };
  },

  created() {
    this.taskReportInfo();
    this.getRegion();
  },
  methods: {
    // 顶部信息渲染
    async taskReportInfo() {
      //获取当天到23.59.59时间
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = 23;
      let mf = 59;
      let ss = 59;
      this.gettime = yy + "-0" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      // console.log(this.gettime);
      // 周
      let yy3 = new Date().getFullYear();
      let mm3 = new Date().getMonth() + 1;
      let dd3 = new Date().getDay() + 7;
      let hh3 = 0;
      let mf3 = 0;
      let ss3 = 0;
      this.gettime3 =
        yy3 + "-0" + mm3 + "-" + dd3 + " 0" + hh3 + ":0" + mf3 + ":0" + ss3;
      // console.log(this.gettime3);
      const res = await taskReportInfo({
        start: this.gettime3,
        end: this.gettime,
      });
      this.data = res[0];
      this.datas = res[1];
      // console.log(this.data);
    },
    // 获取下拉信息
    async getRegion() {
      const res = await getRegion({
        pageSize: 1000,
      });
      this.getRegionData = res.currentPageRecords;
      // console.log(this.getRegionData);
      this.getRegionData.findIndex((item) => {
        this.getRegionName.push(item.name);
      });
      this.getRegionData.findIndex((item) => {
        this.getRegionId.push(item.id);
      });
      // console.log(this.getRegionName);
      // console.log(this.getRegionId);
    },
    async choice() {
      const res = await userWorkTop({
        start: this.gettime3,
        end: this.gettime,
        isRepair: this.isShow,
        // regionId: 0,
      });

      console.log(res);
    },
    dianji() {
      this.choice();
      this.isShow = false;
      console.log(this.isShow);
    },
    dianjis() {
      this.choice();
      this.isShow = true;
    },
  },
};
</script>

<style scoped lang="less">
// 上边区域
.top {
  width: 1269px;
  height: 166px;
  // background-color: #333;
  display: flex;
  .left {
    width: 49%;
    background-color: rgb(233, 243, 255);
    border-radius: 15px;
    background-image: url("../../../assets/backimg.png"),
      url("../../../assets/bjimg2.png");
    background-repeat: no-repeat, no-repeat;
    background-position: 0 0, calc(100% - 12px) 100%;
    .operating {
      padding-left: 25px;
      padding-top: 20px;
      padding-bottom: 10px;
      h4 {
        margin: 0;
      }
    }
    .sun {
      display: flex;
      height: 100px;
      justify-content: space-around;
      .text {
        width: 20%;
        // background-color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;
        .text1 {
          padding-top: 20px;
          padding-right: 25px;
          font-size: 36px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
          color: #072074;
        }
        .text2 {
          padding-top: 7px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #91a7dc;
        }
      }
    }
  }
  .right {
    margin-left: 23px;
    width: 49%;
    background-color: rgb(251, 239, 232);
    background: #fbefe8 url("../../../assets/bjimg.png") no-repeat
      calc(100% - 12px) 100%;
    border-radius: 15px;
    .operating {
      padding-left: 25px;
      padding-top: 20px;
      padding-bottom: 10px;
      h4 {
        margin: 0;
      }
    }
    .sun {
      display: flex;
      height: 100px;
      justify-content: space-around;
      .text {
        width: 20%;
        // background-color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;
        .text1 {
          padding-top: 20px;
          padding-right: 25px;
          font-size: 36px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
          color: #ff5757;
        }
        .text2 {
          padding-top: 7px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #91a7dc;
        }
      }
    }
  }
}

// 下
.bottom {
  margin-top: 20px;
  width: 1269px;
  height: 562px;
  // background-color: #333;
  display: flex;
  .left {
    width: 930px;
    height: 562px;
    background-color: #fff;
    border-radius: 20px;
    .state {
      display: flex;
      align-items: center;
      margin: 20px 10px 0 15px;
      width: 900px;
      height: 34px;
      // background-color: #333;
      .aaa1 {
        width: 530px;
        padding-left: 10px;
        h4 {
          margin: 0;
        }
        // background-color: #333;
      }
      .aaa2 {
      }
    }
    .imgss {
      margin-top: 260px;
      margin-left: 300px;
      div {
        margin-left: 40px;
      }
    }
  }
  .right {
    width: 300px;
    height: 562px;
    background-color: #fff;
    border-radius: 20px;
    margin-left: 30px;
    .topp {
      display: flex;
      align-items: center;
      height: 49px;
      // background-color: #333;
      .text {
        padding-left: 10px;
        padding-right: 30px;
        // background-color: #fff;
      }
    }
    .aaaa {
      margin-top: 260px;
      margin-left: 100px;
      div {
        margin-left: 40px;
      }
    }
  }
}
.el-form-item {
  margin: 0;
  width: 120px;
}
</style>
