<template>
  <div>
    <el-table :data="taskInfoList" style="width: 100%" :border="false">
      <el-table-column
        type="index"
        :index="indexChange"
        label="序号"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="name" label="型号名称" width="200">
      </el-table-column>
      <el-table-column prop="model" label="型号编码" width="200">
      </el-table-column>
      <el-table-column prop="image" label="设备图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt="" class="imgs" />
        </template>
      </el-table-column>
      <el-table-column prop="vmRow" label="货道行" width="200">
      </el-table-column>
      <el-table-column prop="vmCol" label="货道列" width="200">
      </el-table-column>
      <el-table-column prop="channelMaxCapacity" label="设备容量" width="200">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editVmType(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: red"
            @click="delVmType(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <EditDialog
      dialogTitle="修改新增类型"
      :dialogVisible="dialogVisible"
      v-if="dialogVisible"
      @closeDialog="closeDialog"
      :isShow="true"
      :editVmTypeObj="editVmTypeObj"
      @getvmType="getvmType"
    ></EditDialog>
  </div>
</template>

<script>
import EditDialog from "./editDialog.vue";
import { getvmTypeCurrent } from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      editVmTypeObj: {},
    };
  },
  created() {
    // console.log(this.totalCount);
  },
  components: { EditDialog },
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
    // 计算序号
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    // 删除
    delVmType(val) {
      this.$emit("delVmType", val);
    },
    // 修改弹框
    async editVmType(val) {
      // console.log(val);
      const res = await getvmTypeCurrent(val.typeId);
      // console.log(res);
      this.editVmTypeObj = res;
      this.dialogVisible = true;
    },
    // 关闭弹窗
    closeDialog(val) {
      this.dialogVisible = val;
    },
    getvmType() {
      this.$emit("getvmType");
    },
  },
};
</script>

<style scoped lang="less">
.cell .imgs {
  display: block;
  width: 24px;
  height: 24px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 50%;
  background: #f3f6fb;
  border: 1px solid #f3f6fb;
}
</style>
