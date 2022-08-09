<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单编号:">
          <Input placeholder="请输入订单编号" ref="value"></Input>
        </el-form-item>
        <el-form-item ref="Data" label="选择日期:">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <Button category="select" icon="el-icon-search" @click.native="query"
            >查询</Button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="bable">
        <Tables :taskInfoList="taskInfoList" :pageIndex="pageIndex"></Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          @getOrder="getOrder"
          Events="getOrder"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import { taskInfo } from "@/api";
import { getOrderApi } from "@/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Pagination from "@/components/Pagination";
import Tables from "./components/index.vue";
export default {
  name: "Approvals",
  data() {
    return {
      formInline: {},
      taskInfoList: [],
      pageIndex: 1,
      totalCount: 0,
      totalPage: "", //全部页数
      pages: "", //当前页数
      value1: "",
    };
  },
  components: {
    Button,
    Input,
    InputSelect,
    Pagination,
    Tables,
  },
  created() {
    // this.getTaskInfo();
    this.getOrder();
  },
  mounted() {},
  methods: {
    // 订单管理列表
    async getOrder(pageIndex) {
      this.pageIndex = pageIndex;
      const res = await getOrderApi({ pageIndex: pageIndex, pageSize: 10 });
      console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = Number(res.totalCount);
      this.taskInfoList = res.currentPageRecords;
    },
    async query() {
      console.log(this.$refs.value.input);
      const res = await getOrderApi({
        pageIndex: this.pageIndex,
        pageSize: 10,
        orderNo: this.$refs.value.input,
      });
      console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = Number(res.totalCount);
      this.taskInfoList = res.currentPageRecords;
      console.log(111);
    },
    // 运营工单列表
    // async getTaskInfo(pageIndex) {
    //   this.pageIndex = pageIndex;
    //   const res = await taskInfo({ pageIndex: pageIndex, pageSize: 10 });
    //   console.log(res);
    //   this.pages = res.pageIndex;
    //   this.totalPage = res.totalPage;
    //   // console.log(this.pages);
    //   // console.log(this.totalPage);
    //   this.totalCount = Number(res.totalCount);
    //   this.taskInfoList = res.currentPageRecords;
    // },
  },
};
</script>

<style scoped lang="less">
// 头部样式
.title {
  display: flex;
  height: 64px;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  /deep/.el-form-item__label {
    font-weight: normal;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
// 主体样式
.main {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}

// 表格相关样式
/deep/.el-table--scrollable-y .el-table__body-wrapper {
  overflow-y: hidden;
}
/deep/.el-table__fixed-right-patch {
  display: none;
}
/deep/.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}

// 消除表格下划线
/deep/.el-table td,
.el-table th.is-leaf {
  border: none;
}
/deep/.el-table th,
.el-table th.is-leaf {
  border: none;
}
/deep/.el-table::before {
  height: 0;
}
</style>
