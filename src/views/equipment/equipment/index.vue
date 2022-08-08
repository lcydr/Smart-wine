<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备编号">
          <Input></Input>
        </el-form-item>

        <el-form-item>
          <Button category="select" icon="el-icon-search">查询</Button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="main-title">
        <Button category="news" icon="el-icon-circle-plus-outline">新建</Button>
        <Button category="configuration">批量操作</Button>
      </div>
      <div class="bable">
        <Tables :taskInfoList="taskInfoList" :pageIndex="pages"></Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pageIndex"
          :totalPage="totalPage"
          @getEquipment="getEquipment"
          Events="getEquipment"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getEquipment } from "@/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import Tables from "./components/equipmentTables.vue";
import Pagination from "@/components/Pagination";
export default {
  name: "Approvals",
  data() {
    return {
      formInline: {},
      taskInfoList: [],
      pageIndex: "", //当前页数
      totalCount: 0, //总条数
      totalPage: "", //全部页数
      pages: 1,
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
    this.getEquipment();
  },
  mounted() {},
  methods: {
    async getEquipment(pages) {
      this.pages = pages;
      const res = await getEquipment({ pageIndex: pages, pageSize: 10 });
      console.log(res);
      this.pageIndex = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = Number(res.totalCount);
      this.taskInfoList = res.currentPageRecords;
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

/deep/.is-leaf {
  padding-left: 2px;
}
</style>
