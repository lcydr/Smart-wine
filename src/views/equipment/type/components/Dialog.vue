<template>
  <!-- 弹框 -->
  <el-dialog
    :title="dialogTitle"
    :visible="dialogVisible"
    width="35%"
    @close="handleClose"
    :close-on-click-modal="false"
  >
    <div class="dialogMain">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="活动名称：" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="型号编码：" prop="model">
          <el-input
            v-model="form.model"
            placeholder="请输入（限制数字、字母、中划线、下划线）"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="货道行数：" prop="vmRow">
          <el-input-number
            v-model="form.vmRow"
            controls-position="right"
            @change="handleChangeVmRow"
            placeholder="请输入"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="货道列数：" prop="vmCol">
          <el-input-number
            v-model="form.vmCol"
            controls-position="right"
            @change="handleChangesVmCol"
            placeholder="请输入"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="货道容量：" prop="channelMaxCapacity">
          <el-input-number
            v-model="form.channelMaxCapacity"
            controls-position="right"
            @change="channelMaxCapacityCount"
            placeholder="请输入"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="设备图片：" prop="image">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer" v-if="isShow">
      <Button category="configuration" @click.native="handleClose"
        >取 消</Button
      >
      <Button category="news" @click.native="addVmType">确 定</Button>
    </span>
  </el-dialog>
</template>

<script>
import Button from "@/components/Button";
import { postFileUpload, postVmType } from "@/api";
export default {
  data() {
    return {
      form: {
        vmRow: undefined, //行数
        vmCol: undefined, //列数
        channelMaxCapacity: undefined, // 货道最大容量
        name: "", //名称
        model: "", //型号编码
        image: "", //图片url
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "change" }],
        model: [
          { required: true, message: "请输入", trigger: "change" },
          {
            pattern: /^[a-zA-Z0-9_-]*$/g,
            message: "请输入合法的型号编码",
            trigger: "change",
          },
        ],
        vmRow: [{ required: true, message: "请输入", trigger: "change" }],
        vmCol: [{ required: true, message: "请输入", trigger: "change" }],
        channelMaxCapacity: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        image: [{ required: true, message: "请上传", trigger: "change" }],
      },
      imageUrl: "",
    };
  },
  props: {
    dialogTitle: {
      type: String,
      default: "提示",
    },
    isShow: {
      type: Boolean,
    },
    dialogVisible: {
      type: Boolean,
    },
  },
  created() {},
  components: {
    Button,
  },
  mounted() {},
  methods: {
    // 表单提交
    async addVmType() {
      // try {
      await this.$refs.ruleForm.validate();
      const res = await postVmType(this.form);
      console.log(res);
      this.handleClose();
      this.$emit("getvmType");
      // } catch (error) {
      //   this.$message.error("已存在此名称的对象");
      // }
    },
    // 关闭弹窗
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit("closeDialog", false);
      this.imageUrl = "";
    },
    // 货道行数：
    handleChangeVmRow(value) {
      console.log(value);
    },
    // 货道列数：
    handleChangesVmCol(value) {
      console.log(value);
    },
    //货道容量：
    channelMaxCapacityCount(value) {
      console.log(value);
    },
    // ----------------------------------------------------------------
    // 图片成功回调
    async handleAvatarSuccess(res, file) {
      console.log(file);
      const formData = new FormData();
      formData.append("fileName", file.raw);
      console.log(formData);

      const reg = await postFileUpload(formData);
      // console.log(reg);
      this.form.image = reg;
      console.log(this.form.image);
      this.imageUrl = reg;
    },
    // 文件上传的钩子
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";

      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }

      // if (!isPNG) {
      //   this.$message.error("上传头像图片只能是 PNG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      return (isPNG && isLt2M) || (isJPG && isLt2M);
    },
  },
};
</script>

<style scoped lang="less">
// 弹框

/deep/.el-dialog__title {
  font-weight: 700;
}

/deep/.el-dialog__footer {
  text-align: center;
}
/deep/.el-dialog__body {
  padding: 30px 30px 30px;

  // 主体
  .dialogMain {
    .el-input-number {
      width: 100%;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 84px;
      height: 84px;
      line-height: 84px;
      text-align: center;
    }
    .avatar {
      width: 84px;
      height: 84px;
      display: block;
    }
  }

  // .dialogInfo {
  //   width: 579px;
  //   margin: 0px auto;

  //   .dialogInfoTitleRow {
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-around;
  //     height: 54px;
  //     background: rgba(227, 233, 245, 0.39);
  //     text-align: center;

  //     .dialogInfoTitleRowSpan {
  //       color: #5f84ff;
  //     }
  //   }

  //   .sku-title {
  //     margin: 20px 0 12px 6px;
  //   }
  //   .tipInfo {
  //     text-align: center;
  //   }
  //   .sku-list {
  //     border-top: 1px solid #d8dde3;
  //     border-left: 1px solid #d8dde3;
  //     .sku-item {
  //       padding: 0 10px;
  //       line-height: 40px;
  //       border-right: 1px solid #d8dde3;
  //       border-bottom: 1px solid #d8dde3;

  //       .sku-name {
  //         overflow: hidden;
  //         white-space: nowrap;
  //         text-overflow: ellipsis;
  //       }
  //     }
  //   }
  // }
}
</style>
