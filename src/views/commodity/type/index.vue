<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品类型搜索">
          <Input ref="ipt"></Input>
        </el-form-item>
        <el-form-item @click.native="btnSearch">
          <Button category="select" icon="el-icon-search">查询</Button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="main-title">
        <Button
          category="news"
          icon="el-icon-circle-plus-outline"
          @click.native="dialogVisible = true"
          >新建</Button
        >
      </div>
      <div class="bable">
        <Tables
          :goodsList="goodsList"
          @btnChange="btnChange"
          @btnDel="btnDel"
          :text="text"
        >
        </Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          Events="getGoods"
          @getGoods="getGoods"
        ></Pagination>
        <el-form :model="form" ref="form" :rules="rules">
          <el-dialog
            style="border-radius: 20px"
            :title="type"
            :visible.sync="dialogVisible"
            width="40%"
          >
            商品类型名称:
            <el-input
              type="text"
              prop="text"
              placeholder="请输入内容"
              v-model="text"
              maxlength="10"
              show-word-limit
              style="width: 500px"
            ></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="btnAdd">确 定</el-button>
            </span>
          </el-dialog>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./compoents/Button/index.vue";
import Input from "./compoents/Input/index.vue";
import Tables from "./compoents/Table/index.vue";
import Pagination from "./compoents/Pagination/index.vue";
import { getGoodsList, addGoodsType, changeType, DelType } from "@/api/goods";
export default {
  name: "Approvals",
  data() {
    return {
      formInline: {},
      taskInfoList: [],
      pageIndex: 1,
      totalCount: 0,
      totalPage: "", //全部页数
      pages: "", //当前页数，
      goodsList: [],
      dialogVisible: false,
      goodsType: true,
      text: "",
      value: "",
      form: {
        text: "",
      },
      rules: {
        text: [
          { required: true, message: "请输入商品类型名称", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    Button,
    Input,
    Tables,
    Pagination,
  },
  created() {
    this.getGoods();
  },
  computed: {
    type() {
      return this.goodsType ? "新增商品类型" : "修改商品类型";
    },
  },
  mounted() {},
  methods: {
    // 获取商品数据
    async getGoods(pageIndex) {
      this.pageIndex = pageIndex;
      const res = await getGoodsList();
      // console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      // console.log(this.pages);
      // console.log(this.totalPage);
      this.totalCount = Number(res.totalCount);
      this.goodsList = res.currentPageRecords;
      // console.log(this.goodsList);
    },
    // 搜索商品类型
    async btnSearch(className) {
      // 输入框有值
      if (this.$refs.ipt.value) {
        this.goodsList.className = className;
        // console.log(this.goodsList.className);
        const res = await getGoodsList({ className: this.$refs.ipt.value });
        // console.log(res);
        this.goodsList = res.currentPageRecords;
        // console.log(this.goodsList);
      } else {
        this.$message("请输入内容");
        this.getGoods();
      }
    },
    // 新建商品类型
    async btnAdd() {
      // console.log(this.text);
      await this.$refs.form.validate();
      if (this.goodsType) {
        // console.log(this.$refs.form.text)
        try {
          const res = await addGoodsType(this.text);
          // console.log(res);
          this.getGoods();
          this.dialogVisible = false;
          this.form.text = "";
        } catch (error) {
          console.log(error);
        }
      } else {
        const res = await changeType(this.text, this.classId);
        console.log(res);
        this.$message.success("编辑成功");
        this.getGoods();
        this.dialogVisible = false;
        this.form.text = "";
        this.goodsType = true;
      }
    },
    // 修改商品类型
    btnChange(val) {
      this.text = val.className;
      this.classId = val.classId;
      this.dialogVisible = true;
      this.goodsType = false;
      // console.log(val);
    },
    // 删除商品类型
    async btnDel(id) {
      await DelType(id);
      this.$message.success("删除成功");
      this.getGoods();
    },
    // 上一页
    // lastPage() {
    //   if (this.pageIndex > 1) {
    //     this.pageIndex--;
    //     return this.getGoods();
    //   }
    //   this.pageIndex = 1;
    //   this.$message.warning("已经是第一页了");
    // },
    // // 下一页
    // nextPage() {
    //   if (this.pageIndex < this.goodsList.totalPage) {
    //     this.pageIndex++;
    //     return this.getGoods();
    //   }
    //   this.$message.warning("已经是最后一页了");
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
