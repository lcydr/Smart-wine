<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品搜索">
          <Input ref="ipt"></Input>
        </el-form-item>
        <el-form-item @click.native="btnSearch2">
          <Button category="select" icon="el-icon-search">查询 </Button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="main-title">
        <Button
          category="news"
          @click.native="dialogVisible = true"
          icon="el-icon-circle-plus-outline"
          >新建</Button
        >
        <Button category="configuration">导入数据</Button>
      </div>
      <div class="bable">
        <Tables :list="list" :pageIndex="pageIndex"></Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          @getGood="getGood"
          Events="getGood"
        ></Pagination>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" label-width="100px">
            <el-form-item label="商品名称">
              <el-input maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="品牌">
              <el-input maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <template>
              <el-form-item label="商品价格(元)">
                <el-input-number
                  v-model="num"
                  controls-position="right"
                  :min="0"
                  :max="10"
                  :step="0.5"
                  style="width: 100%"
                ></el-input-number>
              </el-form-item>
            </template>
            <el-form-item label="商品类型">
              <el-select placeholder="请选择活动区域" style="width: 100%">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="规格">
              <el-input maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-upload avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>

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
      value: "",
      dialogVisible: false,
      num: "",
      imageUrl: "",
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
    // 商品信息
    async getGood(pageIndex) {
      this.pageIndex = pageIndex;
      const res = await getList();
      // console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = Number(res.totalCount);
      this.list = res.currentPageRecords;
      // console.log(this.list);
    },
    // 搜索
    async btnSearch2(skuName) {
      console.log(this.$refs.ipt.value);
      if (this.$refs.ipt.value) {
        // console.log(235);
        this.list.skuName = skuName;
        // console.log(this.list.skuName);
        const res = await getList({ skuName: this.$refs.ipt.value });
        // console.log(res);
        this.list = res.currentPageRecords;
        console.log(this.list);
      } else {
        this.$message("请输入内容");
        // this.getGoods();
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 84px;
  height: 84px;
  line-height: 84px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
