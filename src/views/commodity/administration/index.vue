<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品搜索">
          <Input></Input>
        </el-form-item>
        <el-form-item>
          <Button category="select" icon="el-icon-search">查询 </Button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="main-title">
        <Button category="news" icon="el-icon-circle-plus-outline">新建</Button>
        <Button category="configuration">导入数据</Button>
      </div>
      <div class="bable">
        <Tables :list="list" :pageIndex="pageIndex"></Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          Events="getTaskInfo"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/goods";
import Button from "./compoents/Button/index.vue";
import Input from "./compoents/Input/index.vue";
import Tables from "./compoents/Table/index.vue";
import Pagination from "./compoents/Pagination/index.vue";
export default {
  name: "Approvals",
  data() {
    return {
      formInline: {},
      pageIndex: 1,
      totalCount: 0,
      totalPage: "", //全部页数
      pages: "", //当前页数
      list: [],
    };
  },
  components: {
    Button,
    Input,
    Tables,
    Pagination,
  },
  created() {
    this.getGood();
  },
  mounted() {},
  methods: {
    async getGood() {
      const res = await getList();
      console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = Number(res.totalCount);
      this.list = res.currentPageRecords;
      console.log(this.list);
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
