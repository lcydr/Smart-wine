<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="型号搜索">
          <Input
            ref="inputSearchName"
            @keydown.enter.native="searchVmType"
          ></Input>
        </el-form-item>

        <el-form-item>
          <Button
            category="select"
            icon="el-icon-search"
            @click.native="searchVmType"
            >查询</Button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="main-title">
        <Button
          category="news"
          icon="el-icon-circle-plus-outline"
          @click.native="isShowDialog"
          >新建</Button
        >
      </div>
      <div class="bable">
        <Tables
          :taskInfoList="taskInfoList"
          :pageIndex="pages"
          @delVmType="delVmType"
          @getvmType="getvmType"
        ></Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pageIndex"
          :totalPage="totalPage"
          @getvmType="getvmType"
          Events="getvmType"
        ></Pagination>
      </div>
    </div>

    <!-- 新建弹框 -->
    <Dialog
      dialogTitle="新增设备类型"
      :dialogVisible="dialogVisible"
      @closeDialog="closeDialog"
      @getvmType="getvmType"
      :isShow="true"
    ></Dialog>
  </div>
</template>

<script>
import { getvmType, delVmType } from "@/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Tables from "./components/typeTables.vue";
import Pagination from "@/components/Pagination";
import Dialog from "./components/Dialog.vue";
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
      dialogVisible: false,
    };
  },
  components: {
    Button,
    Input,
    Tables,
    Pagination,
    Dialog,
  },
  created() {
    this.getvmType();
  },
  mounted() {},
  methods: {
    // 获取设备类型管理列表
    async getvmType(pages) {
      this.pages = pages;
      const res = await getvmType({ pageIndex: pages, pageSize: 10 });
      console.log(res);
      this.pageIndex = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = Number(res.totalCount);
      this.taskInfoList = res.currentPageRecords;
    },
    // 搜索设备
    async searchVmType() {
      try {
        if (this.$refs.inputSearchName.input.trim().length === 0) {
          // console.log(123);
          this.getvmType();
          this.$refs.inputSearchName.input = "";
        } else {
          const value = this.$refs.inputSearchName.input;
          const res = await getvmType({
            // pageIndex: this.pages,
            pageSize: 10,
            name: value,
          });
          this.$refs.inputSearchName.input = "";
          this.pageIndex = this.pageIndex;
          this.totalPage = res.totalPage;
          this.totalCount = Number(res.totalCount);
          this.taskInfoList = res.currentPageRecords;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 删除设备
    async delVmType(val) {
      try {
        // console.log(val);
        const res = await delVmType(val.typeId);
        this.getvmType();
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    // 新增弹框
    isShowDialog() {
      this.dialogVisible = true;
    },
    // 关闭弹窗
    closeDialog(val) {
      this.dialogVisible = val;
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
