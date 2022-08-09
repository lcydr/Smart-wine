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
        <Button category="configuration" @click.native="ImportData"
          >导入数据</Button
        >
      </div>
      <div class="bable">
        <Tables
          :list="list"
          :pageIndex="pageIndex"
          @btnChange="btnChange"
        ></Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          @getGood="getGood"
          Events="getGood"
        ></Pagination>
        <!-- 新增/修改弹窗 -->
        <el-dialog
          :title="changeTitle"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <el-form
            ref="formData"
            :model="formData"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="商品名称" prop="skuName">
              <el-input
                maxlength="10"
                v-model="formData.skuName"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="brandName">
              <el-input
                maxlength="10"
                show-word-limit
                v-model="formData.brandName"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品价格(元)" prop="price">
              <el-input-number
                v-model="formData.price"
                controls-position="right"
                :min="0"
                :step="0.5"
                style="width: 100%"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="商品类型" prop="classId">
              <el-select
                placeholder="请选择商品类型"
                v-model="formData.classId"
                style="width: 100%"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.classId"
                  :label="item.className"
                  :value="item.classId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="规格" prop="unit">
              <el-input
                maxlength="10"
                v-model="formData.unit"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="skuImage">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="formData.skuImage"
                  :src="formData.skuImage"
                  class="avatar"
                />
                <i v-else class="el-icon-upload avatar-uploader-icon"></i>
              </el-upload>
              <div class="text" style="color: #bac0cd">
                支持扩展名：jpg、png，文件不得大于100kb
              </div>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click.native="addGoods">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 导入数据 -->
        <el-dialog title="导入数据" :visible.sync="dialogVisible2" width="30%">
          <el-form>
            <el-form-item label="标题" style="margin-left: 100px">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview2"
                :on-remove="handleRemove2"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                  @click="submitUpload"
                  style="font-size: 14px; color: #fff"
                >
                  <i class="el-icon-upload2"></i>
                  选取文件</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  支持扩展名：xls、xlsx，文件不得大于1M
                </div>
              </el-upload>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible2 = false"
                  >确 定</el-button
                >
              </span>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getList,
  getGoodsList,
  addGoods,
  Picture,
  changeGoods,
} from "@/api/goods";
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
      dialogVisible2: false,
      num: "",
      imageUrl: "",
      fileList: [],
      addChange: true,
      formData: {
        skuImage: "",
        unit: "",
        classId: "",
        price: "",
        brandName: "",
        skuName: "",
        skuId: "",
      }, // 新增数据
      rules: {
        // 表单校验
        skuImage: [{ required: true, message: "请选择图片", trigger: "blur" }],
        unit: [{ required: true, message: "请输入商品规格", trigger: "blur" }],
        classId: [
          { required: true, message: "请选择商品类型", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        brandName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
        ],
        skuName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
      },
      typeList: [],
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
    this.getGoodsList();
  },
  computed: {
    changeTitle() {
      return this.addChange ? "新增商品 " : "修改商品";
    },
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
    // 图片上传
    async handleAvatarSuccess(reg, file) {
      // console.log(reg);
      // console.log(file);
      const formData = new FormData();
      formData.append("fileName", file.raw); //

      const res = await Picture(formData);
      // console.log(res);
      this.formData.skuImage = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      return (isJPG && isLt2M) || (isPNG && isLt2M);
    },
    // 添加商品
    async addGoods() {
      // console.log(this.formData);
      await this.$refs.formData.validate();
      if (this.addChange) {
        const res = await addGoods(this.formData);
        // console.log(res);
        this.$message.success("添加成功");
        this.getGood();
        this.dialogVisible = false;
        this.formData = {
          skuImage: "",
          unit: "",
          classId: "",
          price: "",
          brandName: "",
          skuName: "",
        };
      } else {
        console.log(34534);
        const res = await changeGoods(this.formData, this.formData.skuId);
        this.$message.success("编辑成功");
        this.getGood();
        this.dialogVisible = false;
        this.formData = {
          skuImage: "",
          unit: "",
          classId: "",
          price: "",
          brandName: "",
          skuName: "",
        };
        this.addChange = true;
      }
    },
    // 修改商品
    btnChange(val) {
      console.log(val);
      this.formData.skuImage = val.skuImage;
      this.formData.unit = val.unit;
      this.formData.classId = val.classId;
      this.formData.price = val.price;
      this.formData.brandName = val.brandName;
      this.formData.skuName = val.skuName;
      this.formData.skuId = val.skuId;
      this.dialogVisible = true;
      this.addChange = false;
    },
    // 获取商品类型
    async getGoodsList() {
      const res = await getGoodsList();
      // console.log(res);
      this.typeList = res.currentPageRecords;
      // console.log(this.typeList);
    },
    // 关闭弹框
    close() {
      this.dialogVisible = false;
      this.addChange = true;
      this.formData = {
        skuImage: "",
        unit: "",
        classId: "",
        price: "",
        brandName: "",
        skuName: "",
      };
    },
    // 导入数据
    ImportData() {
      this.dialogVisible2 = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview2(file) {
      console.log(file);
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
/deep/.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
/deep/.el-dialog__footer {
  text-align: center;
}

/deep/.el-button--small {
  background-color: #5f84ff;
  width: 220px;
  height: 36px;
  text-align: center;
}
</style>
