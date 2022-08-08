<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品类型搜索">
          <Input ref="ipt"></Input>
        </el-form-item>
        <el-form-item>
          <Button
            category="select"
            icon="el-icon-search"
            @click.native="btnSearch"
            >查询</Button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="main-title">
        <Button category="news" icon="el-icon-circle-plus-outline">新建</Button>
      </div>
      <div class="bable">
        <Tables :goodsList="goodsList" @btnChange="btnChange" @btnDel="btnDel">
        </Tables>
        <el-dialog
          style="border-radius: 20px"
          title="商品类型名称"
          :visible.sync="dialogVisible"
          width="50%"
        >
          商品类型名称:
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="text"
            maxlength="10"
            show-word-limit
            style="width: 500px"
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./compoents/Button/index.vue";
import Input from "./compoents/Input/index.vue";
import Tables from "./compoents/Table/index.vue";
import { getGoodsList, changeType, DelType } from "@/api/goods";
export default {
  name: "Approvals",
  data() {
    return {
      formInline: {},
      taskInfoList: [],
      // pageIndex: 1,
      // totalCount: 0,
      // totalPage: "", //全部页数
      // pages: "", //当前页数，
      goodsList: [],
      dialogVisible: false,
      text: "",
    };
  },
  components: {
    Button,
    Input,
    Tables,
  },
  created() {
    this.getGoods();
  },
  mounted() {},
  methods: {
    async getGoods() {
      const res = await getGoodsList();
      // console.log(res);
      this.goodsList = res.currentPageRecords;
      // console.log(this.goodsList);
    },
    async btnSearch(val) {
      console.log(2355);
      this.$refs.ipt.val;
      // const res = await getGoodsList();
      console.log(res);
    },
    btnChange() {
      this.dialogVisible = true;
    },
    async btnDel() {
      // console.log(23456455);
      // console.log(this.goodsList);
      await DelType(this.goodsList.classId);
      this.$message.success("删除成功");
      this.getGoods();
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
/deep/.el-dialog {
  border-radius: 10px;
}
/deep/.el-dialog__title {
  color: #333;
  font-weight: 700;
}

/deep/.el-dialog__footer {
  text-align: center;
}
</style>
