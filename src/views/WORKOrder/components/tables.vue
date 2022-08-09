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
      <el-table-column prop="taskCode" label="工单编号" width="200">
      </el-table-column>
      <el-table-column prop="innerCode" label="设备编号" width="200">
      </el-table-column>
      <el-table-column prop="taskType.typeName" label="工单类型" width="210">
      </el-table-column>
      <el-table-column
        prop="createType"
        label="工单方式"
        width="210"
        :formatter="repairDrder"
      >
      </el-table-column>
      <el-table-column
        prop="taskStatusTypeEntity.statusName"
        label="工单状态"
        width="210"
      >
      </el-table-column>
      <el-table-column prop="userName" label="运营人员" width="210">
      </el-table-column>
      <el-table-column
        :formatter="times"
        prop="updateTime"
        label="创建日期"
        width="210"
      >
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template>
          <el-button type="text" @click="dialog" size="small"
            >查看详情</el-button
          >
          <el-dialog
            title="工单详情"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <div class="details">
              <img src="" class="icon" /> <span>待办</span>
              <img src="" class="pic" />
            </div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-row class="demo-autocomplete">
                <el-col :span="12">
                  <el-form-item label="设备编号:">
                    <el-input :border="false" style="width: 100%"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="创建日期:">
                    <el-input style="width: 100%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="demo-autocomplete">
                <el-col :span="12">
                  <el-form-item label="取消日期:">
                    <el-input :border="false" style="width: 100%"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="运营人员:">
                    <el-input style="width: 100%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="demo-autocomplete">
                <el-col :span="12">
                  <el-form-item label="工单类型:">
                    <el-input :border="false" style="width: 100%"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="补货数量:">
                    <Button><span>补货详情</span></Button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="demo-autocomplete">
                <el-col :span="12">
                  <el-form-item label="工单方式:">
                    <el-input :border="false" style="width: 100%"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="取消原因:">
                    <el-input style="width: 100%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false"
                >重新创建</el-button
              >
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import Button from "@/components/Button";
import * as moment from "moment";
import { getWorkOrder } from "@/api";
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
      return row.createType === "1" ? "自动" : "手动";
    },
    times(row) {
      return moment(row.updateTime).format("YYYY.MM.DD hh:mm:ss");
    },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async dialog() {
      console.log(...this.taskInfoList);
      const res = await getWorkOrder(...this.taskInfoList);
      console.log(res);
      this.dialogVisible = true;
    },
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
.bodys {
  line-height: 36px;
}
</style>



