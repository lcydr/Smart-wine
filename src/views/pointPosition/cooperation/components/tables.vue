<template>
  <div>
    <el-table :data="taskInfoList" style="width: 100%" :border="false">
      <el-table-column
        type="index"
        :index="indexChange"
        label="序号"
        width="140"
      >
      </el-table-column>
      <!-- <el-table-column prop="name" label="点位名称" width="=100">
      </el-table-column> -->
      <el-table-column prop="name" label="合作商名称" width="350">
      </el-table-column>
      <el-table-column prop="account" label="账号" width="200">
      </el-table-column>
      <el-table-column prop="vmCount" label="设备数量" width="200">
      </el-table-column>
      <el-table-column prop="ratio" label="分成比例" width="200">
      </el-table-column>
      <el-table-column prop="contact" label="联系人" width="200">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="200">
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native="chongzhi(scope.row)"
            >重置密码</el-button
          >
          <el-button type="text" size="small" @click.native="open(scope.row)"
            >查看详情</el-button
          >
          <el-button type="text" size="small" @click="xiugai(scope.row)"
            >修改</el-button
          >
          <el-button type="text" size="small" class="btndel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看详情 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <p>合作商名称：{{ this.list.name }}</p>
      <p>联系人：{{ this.list.contact }}</p>
      <p>联系电话：{{ this.list.account }}</p>
      <p>分成比例：{{ this.list.ratio }}</p>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改合作商" :visible.sync="isshow" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="合作商名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="region">
          <el-input v-model="ruleForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="region1">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="分成比例" prop="region2" width="200">
          <el-input-number
            v-model="ruleForm.ratio"
            controls-position="right"
            :min="0"
            :max="100"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isshow = false">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { chongzhimima, xiugaihezuoshang } from "@/api";

export default {
  data() {
    return {
      dialogVisible: false,
      list: {},
      isshow: false,
      ruleForm: {
        name: "",
        contact: "",
        account: "",
        ratio: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        region1: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        region2: [{ required: true, trigger: "blur" }],
      },
    };
  },
  created() {},
  props: {
    taskInfoList: {
      type: Array,
      required: true,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
  },
  created() {
    console.log(this.taskInfoList);
  },
  components: {},
  methods: {
    async queding() {
      this.isshow = false;
      const res = await xiugaihezuoshang(this.ruleForm.id, {
        mobile: this.ruleForm.mobile,
        account: this.ruleForm.account,
        ratio: this.ruleForm.ratio,
        name: this.ruleForm.name,
        contact: this.ruleForm.contact,
      });
      console.log(res);
    },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    //重置密码
    chongzhi(val) {
      console.log(val);
      this.$confirm("此操作将重置密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          chongzhimima(val.id);
          this.$message({
            type: "success",
            message: "重置成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置",
          });
        });
    },
    //查看详情
    open(val) {
      console.log(val);
      this.dialogVisible = true;
      this.list = val;
    },
    //修改
    xiugai(val) {
      this.isshow = true;
      console.log(val);
      this.ruleForm = val;
    },
  },
};
</script>

<style scoped lang="less">
.btndel {
  color: red;
}
</style>
