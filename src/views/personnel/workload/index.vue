<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="人员搜索">
          <Input ref="input"></Input>
        </el-form-item>
        <el-form-item label="角色">
          <InputSelect ref="select"></InputSelect>
        </el-form-item>
        <el-form-item @click.native="search">
          <Button category="select" icon="el-icon-search"></Button>
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
          @getTaskInfo="getTaskInfo"
          Events="getTaskInfo"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import { getPersonnelWorkload } from "@/api/personnel";
import Button from "@/components/Button";
import Input from "./components/input.vue";
import InputSelect from "./components/seccess-xiala.vue";
import Tables from "./components/workload-text.vue";
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
    };
  },
  components: {
    Button,
    Input,
    InputSelect,
    Tables,
    Pagination,
  },
  created() {
    this.getTaskInfo();
    // console.log(this.$store.state.user.userInfo);
  },
  mounted() {},
  methods: {
    // 工作量列表
    async getTaskInfo(pageIndex) {
      this.pageIndex = pageIndex;
      const res = await getPersonnelWorkload({
        pageIndex: pageIndex,
        pageSize: 10,
        // userName: this.$store.state.user.userInfo.userName,
        // roleId: this.$store.state.user.userInfo.roleId,
      });
      console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      // console.log(this.pages);
      // console.log(this.totalPage);
      this.totalCount = Number(res.totalCount);
      this.taskInfoList = res.currentPageRecords;
    },
    // 搜索
    async search() {
      if (this.$refs.select.select != "" && this.$refs.input.input != "") {
        const res = await getPersonnelWorkload({
          pageIndex: this.pageIndex,
          pageSize: 10,
          userName: this.$refs.input.input,
          isRepair: this.$refs.select.select,
        });
        this.pages = res.pageIndex;
        this.totalPage = res.totalPage;
        this.totalCount = Number(res.totalCount);
        this.taskInfoList = res.currentPageRecords;
        // this.getTaskInfo();
      } else if (this.$refs.select.select != "") {
        console.log(this.$refs.select.select);
        const res = await getPersonnelWorkload({
          pageIndex: this.pageIndex,
          pageSize: 10,
          isRepair: this.$refs.select.select,
        });
        this.pages = res.pageIndex;
        this.totalPage = res.totalPage;
        this.totalCount = Number(res.totalCount);
        this.taskInfoList = res.currentPageRecords;
      } else if (this.$refs.input.input != "") {
        const res = await getPersonnelWorkload({
          pageIndex: this.pageIndex,
          pageSize: 10,
          userName: this.$refs.input.input,
        });
        this.pages = res.pageIndex;
        this.totalPage = res.totalPage;
        this.totalCount = Number(res.totalCount);
        this.taskInfoList = res.currentPageRecords;
      } else {
        this.getTaskInfo();
      }
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
