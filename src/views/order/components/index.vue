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
      <el-table-column prop="orderNo" label="订单编号" width="240">
      </el-table-column>
      <el-table-column prop="skuName" label="商品名称" width="240">
      </el-table-column>
      <el-table-column prop="price" label="订单金额(元)" width="240">
      </el-table-column>
      <el-table-column prop="innerCode" label="设备编号" width="240">
      </el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="240"
        :formatter="repairDrder"
      >
      </el-table-column>
      <el-table-column
        :formatter="times"
        prop="updateTime"
        label="订单日期"
        width="200"
      >
      </el-table-column>
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            
            @click="handleEdit(scope.$index, scope.row)"
            >查看详情</el-button
          >
          <el-dialog title="订单详情" :visible.sync="dialogVisible" width="33%">
            <div class="details">
              <img src="" class="icon" /> <span>出货成功</span>
              <img src="" class="pic" />
            </div>
            <el-row class="demo-autocomplete">
              <el-form ref="form" label-width="80px" size="mini">
                <el-col :span="12">
                  <el-form-item label="订单编号">
                    <span>{{ scope.row.orderNo }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="商品名称:">
                    <span>{{ scope.row.skuName }}</span>
                  </el-form-item> </el-col
                ><el-col :span="12">
                  <el-form-item label="设备编号:">
                    <span>{{ scope.row.innerCode }}</span>
                  </el-form-item> </el-col
                ><el-col :span="12">
                  <el-form-item label="订单金额:">
                    <span>{{ scope.row.price }}</span>
                  </el-form-item> </el-col
                ><el-col :span="12">
                  <el-form-item label="完成时间:">
                    <span>{{ scope.row.updateTime }}</span>
                  </el-form-item> </el-col
                ><el-col :span="12">
                  <el-form-item label="创建时间:">
                    <span>{{ scope.row.createTime }}</span>
                  </el-form-item> </el-col
                ><el-col :span="12">
                  <el-form-item label="设备地址:">
                    <span>{{ scope.row.addr }}</span>
                  </el-form-item> </el-col
                ><el-col :span="12">
                  <el-form-item label="支付方式:">
                    <span>{{
                      scope.row.payType === "1" ? "支付宝支付" : "微信支付"
                    }}</span>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as moment from "moment";
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
    repairDrder(row) {
      if (row.status === "0") {
        return "创建";
      } else if ((row.status = "1")) {
        return "支付成功";
      } else if ((row.status = "2")) {
        return "出货成功";
      } else {
        return "出货失败";
      }
      // return row.createType === "1" ? "出货" : "手动";
    },
    times(row) {
      return moment(row.updateTime).format("YYYY.MM.DD hh:mm:ss");
    },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    handleEdit(index,row){
      this.dialogVisible = true
      console.log(row);
    }
  },
};
</script>

<style scoped lang="less">
.details {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
  font-size: 14px;
  .icon {
    margin-left: 22px;
  }
}
</style>
