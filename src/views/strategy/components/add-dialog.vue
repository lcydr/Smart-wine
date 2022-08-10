<template>
  <el-dialog
    title="新增策略"
    :visible="visible"
    width="600px"
    :close-on-click-modal="false"
    @close="isShow"
  >
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      :rules="fromRules"
    >
      <el-form-item label="策略名称:" prop="name">
        <el-input
          v-model="formData.name"
          maxlength="15"
          placeholder="请输入"
          type="text"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="策略方案:" prop="num">
        <el-input-number
          v-model="formData.num"
          controls-position="right"
          :min="1"
          :max="99"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow">取 消</el-button>
      <el-button type="primary" @click="isShows">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addStrategy } from "@/api/strategy";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      formData: {
        name: "",
        num: 1,
      },
      fromRules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        num: [{ required: true, message: "请输入", trigger: "change" }],
      },
    };
  },

  created() {},

  methods: {
    isShow() {
      this.$emit("isShow", false);
      this.$refs.form.resetFields();
    },
    async isShows() {
      this.$refs.form.validate();
      try {
        const res = await addStrategy({
          policyName: this.formData.name,
          discount: this.formData.num,
        });
        this.$emit("isShow", false);
        console.log(res);
        this.$emit("isShows");
      } catch (e) {
        this.$message.error("已存在");
      }
    },
  },
};
</script>

<style scoped lang="less">
/deep/.el-dialog__body {
  padding: 20px 20px 0px 20px;
}
/deep/.el-input {
  width: 426px;
}
/deep/.el-input-number {
  width: 426px;
}
</style>
