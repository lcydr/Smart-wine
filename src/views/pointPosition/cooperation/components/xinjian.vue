<template>
  <div>
    <el-dialog
      title="修改合作商"
      :visible="dialogVisible"
      width="30%"
      @close="onClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="合作商名称" prop="name">
          <el-input v-model="ruleForm.name" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="region">
          <el-input v-model="ruleForm.contact" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="region1">
          <el-input v-model="ruleForm.mobile" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="分成比例" prop="region2" width="200">
          <el-input-number
            v-model="ruleForm.ratio"
            controls-position="right"
            :min="0"
            :max="100"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="账号" prop="nam3" maxlength="18">
          <el-input v-model="ruleForm.zhanghao"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="nam4" maxlength="20">
          <el-input v-model="ruleForm.mima"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="push">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addshangjia } from "@/api";
export default {
  data() {
    return {
      list: {},
      ruleForm: {
        name: "",
        contact: "",
        mobile: "",
        ratio: "",
        zhanghao: "",
        mima: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入合作商名称", trigger: "blur" },
          { min: 1, max: 10, message: "名字应在10位以内", trigger: "blur" },
        ],
        region: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        region1: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        region2: [{ required: true, trigger: "blur" }],
        nam3: [{ required: true, trigger: "blur" }],
        nam4: [{ required: true, trigger: "blur" }],
      },
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  created() {},

  methods: {
    onClose() {
      this.$emit("update:dialogVisible", false);
    },
    async push() {
      try {
        const res = await addshangjia({
          mobile: this.ruleForm.mobile,
          contact: this.ruleForm.contact,
          name: this.ruleForm.name,
          password: this.ruleForm.mima,
          account: this.ruleForm.zhanghao,
          ratio: this.ruleForm.ratio,
        });
        console.log(res);
        this.onClose();
        this.$emit("getPartnerlist");
        this.$success.massage("添加成功");
      } catch (error) {
        this.$success.error("添加失败");
      }
    },
  },
};
</script>

<style scoped></style>
