<template>
  <el-dialog
    title="新增人员"
    :visible="visible"
    width="790px"
    @close="isShow"
    :close-on-click-modal="false"
  >
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      :rules="fromRules"
    >
      <el-form-item label="人员名称:" prop="userName">
        <el-input
          v-model="formData.userName"
          maxlength="5"
          placeholder="请输入"
          type="text"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="roleId">
        <el-select v-model="formData.roleId" placeholder="请输入" width="100%">
          <el-option label="运营员" :value="2"></el-option>
          <el-option label="维修员" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话:" prop="mobile">
        <el-input
          v-model="formData.mobile"
          maxlength="11"
          placeholder="请输入"
          type="text"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="负责区域:" prop="regionName">
        <el-select
          v-model="formData.regionName"
          placeholder="请选择"
          width="100%"
        >
          <el-option
            v-for="(item, index) in getRegionName"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像:" prop="img">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.image" :src="formData.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span class="text">支持扩展名：jpg、png，文件不得大于100kb</span>
      </el-form-item>
      <el-form-item label="活动性质" prop="status">
        <el-checkbox-group v-model="formData.status">
          <el-checkbox label="是否解决" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow">取 消</el-button>
      <el-button type="primary" @click="isShows">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getRegion,
  photo,
  modifyPersonnel,
  getTaskInfo,
} from "@/api/personnel";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    modifyData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        image: "",
        loginName: "",
        mobile: "",
        regionId: "",
        regionName: "",
        roleCode: "",
        roleId: "",
        roleName: "",
        status: "",
        userId: "",
        userName: "",
      },
      fromRules: {
        userName: [{ required: true, message: "请输入", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择", trigger: "change" }],
        mobile: [{ required: true, message: "请输入", trigger: "blur" }],
        regionName: [{ required: true, message: "请选择", trigger: "change" }],
        // img: [{ required: true, message: "请上传", trigger: "change" }],
        status: [{ required: true, message: "请选择", trigger: "change" }],
      },
      imageUrl: "",
      getRegionName: [],
      getRegionId: [],
      getRegionData: [],
    };
  },

  created() {
    this.getRegion();
  },
  mounted() {
    this.formData = this.modifyData;
    // console.log(this.formData);
    this.getRegionId[this.formData.regionName] = this.formData.regionId;
    this.getRegionName[this.formData.regionName] = this.formData.regionName;
  },
  methods: {
    isShow() {
      this.$emit("isSHOW", false);
      this.$refs.form.resetFields();
    },
    // 负责区域
    async getRegion() {
      const res = await getRegion({
        pageSize: 1000,
      });
      this.getRegionData = res.currentPageRecords;
      // console.log(this.getRegionData);
      this.getRegionData.findIndex((item) => {
        this.getRegionName.push(item.name);
      });
      this.getRegionData.findIndex((item) => {
        this.getRegionId.push(item.id);
      });
      // console.log(this.getRegionName);
      // console.log(this.getRegionId);
    },

    // 图片上传
    async handleAvatarSuccess(file) {
      const formData = new FormData();
      formData.append("fileName", file.file); //   console.log(file.file);
      const res = await photo(formData);
      console.log(res);
      this.formData.image = res;
      // this.imageUrl = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      // const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      return (isJPG && isLt2M) || (isPNG && isLt2M);
    },

    // 点击确认按钮 修改人员
    async isShows() {
      await this.$refs.form.validate();

      try {
        const res = await modifyPersonnel({
          userName: this.formData.userName,
          roleId: this.formData.roleId,
          mobile: this.formData.mobile,
          regionId: this.getRegionId[this.formData.regionName],
          regionName: this.getRegionName[this.formData.regionName],
          status: this.formData.status,
          image: this.formData.image,
          userId: this.formData.userId,
        });
        // console.log(res);
        this.$message.success("新增成功");
        console.log(333);
        this.$emit("modifyUser");
      } catch (error) {
      } finally {
        this.$emit("isSHOW", false);
      }
    },
  },
};
</script>

<style scoped lang="less">
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #bac0cd;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  // color: #bac0cd;
  width: 89px;
  height: 89px;
  line-height: 89px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.text {
  color: #bac0cd;
}
/deep/.el-dialog__body {
  padding: 20px 20px 0 20px;
}
/deep/ .el-dialog__footer {
  .dialog-footer {
    padding-right: 290px;
    .el-button--default {
      margin-right: 30px;
    }
  }
}
</style>
