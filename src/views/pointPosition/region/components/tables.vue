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
      <el-table-column prop="name" label="区域名称" width="=500">
      </el-table-column>
      <el-table-column prop="nodeCount" label="点位数" width="500">
      </el-table-column>
      <el-table-column prop="remark" label="备注说明" width="500">
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native="Details(scope.row)"
            >查看详情</el-button
          >
          <el-button type="text" size="small" @click="xiugai(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            class="btndel"
            @click.native="open2"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看详情 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%">
      <div>
        <p>区域名称：{{ name }}</p>
      </div>
      <div>
        <p>包含点位：</p>
        <el-table style="width: 80%" :border="false" :data="list">
          <el-table-column
            type="index"
            :index="indexChange"
            label="序号"
            key=""
            width="100"
          >
          </el-table-column>
          <el-table-column label="点位名称" width="200" prop="name">
          </el-table-column>
          <el-table-column label="设备数量" width="200" prop="vmCount">
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      :model="fromdata"
      title="新增点位"
      :visible.sync="isshow"
      width="30%"
      @close="onclose"
    >
      <el-form
        :model="fromdata"
        ref="fromdata"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="区域名称" prop="name">
          <el-input v-model="fromdata.name"></el-input>
        </el-form-item>

        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="fromdata.remark"></el-input>
        </el-form-item>

        <span>
          <el-button @click="onclose">取 消</el-button>
          <el-button type="primary" @click.native="adddesp">确 定</el-button>
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getxiangqingquyu, xiugaiquyu } from "@/api";
// import * as moment from "moment";
export default {
  data() {
    return {
      fromdata: {
        name: "",
        remark: "",
        nodeCount: "",
        id: "",
      }, //回显
      dialogVisible: false,
      regionId: "",
      list: [],
      name: "",
      isshow: false,
      ruleForm: {
        name: "",
        region: "",
      },
    };
  },
  created() {
    // console.log(this.totalCount);
  },
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
  created() {},

  methods: {
    async Details(val) {
      const res = await getxiangqingquyu({
        pageIndex: 1,
        pageSize: 10,
        regionId: val.id,
      });
      // console.log(res);
      this.list = res.currentPageRecords;
      // console.log(this.list);
      // console.log(val);
      this.name = val.name;
      // this.Detailslist = res;

      this.dialogVisible = true;
    },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    open2() {
      this.$notify({
        title: "警告",
        message: "演示系统，不支持此操作",
        type: "warning",
      });
    },
    xiugai(val) {
      this.isshow = true;
      console.log(val);
      this.fromdata = val;
    },
    onclose() {
      this.isshow = false;
    },
    async adddesp() {
      try {
        await xiugaiquyu(this.fromdata.id, {
          regionName: this.fromdata.name,
          remark: this.fromdata.remark,
        });
        this.$message.success("修改成功");

        this.onclose();
      } catch (error) {
        this.$message.success("修改失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.btndel {
  color: red;
}
</style>
