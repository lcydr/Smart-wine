<template>
  <el-dialog title="新增点位" :visible="isshow" width="30%" @close="onclose">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="区域名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.region"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="adddesp">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { pushxinzeng } from "@/api";
export default {
  name: "post",
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
      },

      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "blur" },
        ],
      },
    };
  },

  props: {
    isshow: {
      type: Boolean,
      required: true,
    },
  },
  created() {},
  methods: {
    onclose() {
      this.$emit("update:isshow", false);
    },
    async adddesp() {
      try {
        pushxinzeng({
          regionName: this.ruleForm.name,
          remark: this.ruleForm.region,
        });
        this.$message.success("添加成功");
        this.onclose();
        this.$emit('getArealist')
      } catch (error) {
        this.$message.success("添加失败");
      }

      //   this.onclose();
    },
  },
};
</script>

<style scoped lang="less">
/deep/.el-input__inner {
  width: 500px;
}
</style>
