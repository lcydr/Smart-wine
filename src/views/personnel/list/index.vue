<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="人员搜索">
          <Input ref="input"></Input>
        </el-form-item>
        <el-form-item @click.native="searchs">
          <Button category="select" icon="el-icon-search"></Button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="main-title">
        <Button category="news" icon="el-icon-circle-plus-outline">新建</Button>
      </div>
      <div class="bable">
        <Tables :taskInfoList="taskInfoList" :pageIndex="pageIndex"></Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          @getTaskInfo="getTaskInfo"
          Events="getTaskInfo"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import { taskInfo } from "@/api";
// 人员列表
import { getPersonnelList } from "@/api/personnel";
import Button from "./components/list-button.vue";
import Input from "./components/list-input.vue";
import Tables from "./components/list-text.vue";
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
      inputData: "",
    };
  },
  components: {
    Button,
    Input,
    Tables,
    Pagination,
  },
  created() {
    this.getTaskInfo();
  },
  mounted() {},
  methods: {
    // 人员列表
    async getTaskInfo(pageIndex) {
      this.pageIndex = pageIndex;
      // console.log(this.pageIndex);
      const res = await getPersonnelList({
        pageIndex: pageIndex,
        pageSize: 10,
      });
      // console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      // console.log(this.pages);
      // console.log(this.totalPage);
      this.totalCount = Number(res.totalCount);
      this.taskInfoList = res.currentPageRecords;
    },
    // 搜索
    async searchs() {
      const inputDatas = this.$refs.input.input;
      // console.log(inputData);
      if (inputDatas == "") {
        this.getTaskInfo();
      } else {
        const res = await getPersonnelList({
          pageIndex: this.pageIndex,
          pageSize: 10,
          userName: inputDatas,
        });
        this.pages = res.pageIndex;
        this.totalPage = res.totalPage;
        // console.log(this.pages);
        // console.log(this.totalPage);
        this.totalCount = Number(res.totalCount);
        this.taskInfoList = res.currentPageRecords;
      }
    },
  },
  computed: {},
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
