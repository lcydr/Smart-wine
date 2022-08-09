<template>
  <!-- 弹框 -->
  <el-dialog
    :title="dialogTitle"
    :visible="dialogVisible"
    width="33%"
    @close="handleClose"
    :close-on-click-modal="false"
  >
    <div>
      <div class="dialogInfo">
        <el-row class="dialogInfoTitleRow">
          <el-col :span="6"
            >销售量：
            <span class="dialogInfoTitleRowSpan"
              >{{ OrderCount }} 个</span
            ></el-col
          ><el-col :span="6"
            >销售额：
            <span class="dialogInfoTitleRowSpan"
              >{{ OrderAmount }} 元</span
            ></el-col
          ><el-col :span="6"
            >补货次数：
            <span class="dialogInfoTitleRowSpan"
              >{{ SupplyCount }} 次</span
            ></el-col
          ><el-col :span="6"
            >维修次数：
            <span class="dialogInfoTitleRowSpan"
              >{{ RepairCount }} 次</span
            ></el-col
          >
        </el-row>
        <div class="sku-title">商品销量（月）</div>
        <div v-if="SkuCollectList.length === 0" class="tipInfo">
          当前设备未销售商品
        </div>
        <el-row class="sku-list" v-else>
          <el-col
            :span="6"
            v-for="(item, index) in SkuCollectList"
            :key="index"
          >
            <el-row class="sku-item">
              <el-col :span="14">
                <div class="sku-name">
                  {{ item.skuName }}
                </div>
              </el-col>
              <el-col :span="10"
                ><span class="dialogInfoTitleRowSpan">：{{ item.count }} </span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <span slot="footer" class="dialog-footer" v-if="isShow">
      <Button category="configuration" @click.native="handleClose"
        >取 消</Button
      >
      <Button category="news" @click.native="handleClose">确 定</Button>
    </span>
  </el-dialog>
</template>

<script>
import Button from "@/components/Button";
import {
  getOrderCount,
  getOrderAmount,
  getSupplyCount,
  getRepairCount,
  getSkuCollect,
} from "@/api";
import * as moment from "moment";

export default {
  data() {
    return {
      OrderCount: "",
      OrderAmount: "",
      SupplyCount: "",
      RepairCount: "",
      SkuCollectList: [],
    };
  },
  props: {
    dialogTitle: {
      type: String,
      default: "提示",
    },
    isShow: {
      type: Boolean,
    },
    dialogVisible: {
      type: Boolean,
    },
  },
  created() {},
  components: {
    Button,
  },
  mounted() {
    // console.log(this.getFirstMonthDay());
    // console.log(this.getLastMonthDay());
  },
  methods: {
    // 获取一段时间内的销售总数
    async getOrderCount(id) {
      const res = await getOrderCount({
        start: this.getFirstDay(),
        end: this.getLastDay(),
        innerCode: id,
      });
      this.OrderCount = res;
    },
    // 获取一定时间范围之内的收入
    async getOrderAmount(id) {
      const res = await getOrderAmount({
        start: this.getFirstDay(),
        end: this.getLastDay(),
        innerCode: id,
      });
      this.OrderAmount = res / 100;
    },
    // 获取售货机补货次数
    async getSupplyCount(id) {
      const innerCode = id;
      const start = this.getFirstMonthDay();
      const end = this.getLastMonthDay();
      const res = await getSupplyCount(innerCode, start, end);
      // console.log(res);
      this.SupplyCount = res;
    },
    // 获取售货机维修次数
    async getRepairCount(id) {
      const innerCode = id;
      const start = this.getFirstMonthDay();
      const end = this.getLastMonthDay();
      const res = await getRepairCount(innerCode, start, end);
      // console.log(res);
      this.RepairCount = res;
    },
    // 获取售货机商品销量
    async getSkuCollect(id) {
      const innerCode = id;
      const start = this.getFirstMonthDay();
      const end = this.getLastMonthDay();
      const res = await getSkuCollect(innerCode, start, end);
      // console.log(res);
      this.SkuCollectList = res;
    },

    // 获取当月第一天起始时间
    getFirstDay() {
      var y = new Date().getFullYear(); //获取年份
      var m = new Date().getMonth() + 1; //获取月份
      var d = "01";
      var time = new Date(new Date().toLocaleDateString()).getTime(); // 获取当天起始时间
      m = m < 10 ? "0" + m : m; //月份补 0
      var times = moment(time).format("HH:mm:ss"); //转化格式
      return `${[y, m, d].join("-")} ${times}`; //拼接
    },
    // 获取当天的最后时间
    getLastDay() {
      let dayEnd = new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
      );
      var tiems = moment(dayEnd).format("YYYY-MM-DD HH:mm:ss"); // 转化格式
      return tiems;
    },
    // 关闭弹窗
    handleClose() {
      this.$emit("closeDialog", false);
    },
    // 获取当前月份的第一天
    getFirstMonthDay() {
      var y = new Date().getFullYear(); //获取年份
      var m = new Date().getMonth() + 1; //获取月份
      var d = "01";
      m = m < 10 ? "0" + m : m; //月份补 0
      return [y, m, d].join("-"); //拼接
    },
    // 获取当天的最后时间
    getLastMonthDay() {
      var y = new Date().getFullYear(); //获取年份
      var m = new Date().getMonth() + 1; //获取月份
      var d = new Date().getDate(); //
      m = m < 10 ? "0" + m : m; //月份补 0
      d = d < 10 ? "0" + d : d; //月份补 0
      return [y, m, d].join("-"); //拼接
    },
  },
};
</script>

<style scoped lang="less">
// 弹框
/deep/.el-dialog__title {
  font-weight: 700;
}
/deep/.el-dialog__footer {
  text-align: center;
}
/deep/.el-dialog__body {
  padding: 20px 20px 30px;

  .dialogInfo {
    width: 579px;
    // height: 100px;
    margin: 0px auto;
    // background-color: pink;

    .dialogInfoTitleRow {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 54px;
      background: rgba(227, 233, 245, 0.39);
      text-align: center;

      .dialogInfoTitleRowSpan {
        color: #5f84ff;
      }
    }

    .sku-title {
      margin: 20px 0 12px 6px;
    }
    .tipInfo {
      text-align: center;
    }
    .sku-list {
      border-top: 1px solid #d8dde3;
      border-left: 1px solid #d8dde3;
      .sku-item {
        padding: 0 10px;
        line-height: 40px;
        border-right: 1px solid #d8dde3;
        border-bottom: 1px solid #d8dde3;

        .sku-name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
