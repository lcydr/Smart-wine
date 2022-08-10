<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="策略搜索：">
          <Input ref="value"></Input>
        </el-form-item>

        <el-form-item>
          <Button
            category="select"
            icon="el-icon-search"
            @click.native="search"
          ></Button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="main-title">
        <Button
          category="news"
          icon="el-icon-circle-plus-outline"
          @click.native="add"
        ></Button>
      </div>
      <div class="bable">
        <Tables
          :taskInfoList="taskInfoList"
          :pageIndex="pageIndex"
          @aaaaa="getTaskInfo"
        ></Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          @getTaskInfo="getTaskInfo"
          Events="getTaskInfo"
        ></Pagination>
      </div>
    </div>
    <!-- 弹窗 -->
    <AddDialog
      :visible="visible"
      @isShow="isShow"
      @isShows="getTaskInfo"
    ></AddDialog>
  </div>
</template>

<script>
import AddDialog from "./components/add-dialog.vue";
import { getStrategy } from "@/api/strategy";
import Button from "@/components/Button";
import Input from "@/components/Input";

import Tables from "./components/strategy-list.vue";
import Pagination from "@/components/Pagination";
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
      visible: false,
    };
  },
  components: {
    Button,
    Input,
    Tables,
    Pagination,
    AddDialog,
  },
  created() {
    this.getTaskInfo();
  },
  mounted() {},
  methods: {
    // 策略列表
    async getTaskInfo(pageIndex) {
      this.pageIndex = pageIndex;
      const res = await getStrategy({ pageIndex: pageIndex, pageSize: 10 });
      // console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      // console.log(this.pages);
      // console.log(this.totalPage);
      this.totalCount = Number(res.totalCount);
      this.taskInfoList = res.currentPageRecords;
    },
    // 搜索
    async search() {
      console.log(this.$refs.value.input);
      const res = await getStrategy({
        pageIndex: this.pageIndex,
        pageSize: 10,
        policyName: this.$refs.value.input,
      });
      // console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      // console.log(this.pages);
      // console.log(this.totalPage);
      this.totalCount = Number(res.totalCount);
      this.taskInfoList = res.currentPageRecords;
    },
    // 新增
    add() {
      this.visible = true;
      // console.log(111);
    },
    isShow(val) {
      this.visible = val;
    },
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
// /deep/.el-table--scrollable-y .el-table__body-wrapper {
//   overflow-y: hidden;
// }
// /deep/.el-table__fixed-right-patch {
//   display: none;
// }
// /deep/.el-table--scrollable-x .el-table__body-wrapper {
//   overflow-x: hidden;
// }

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
