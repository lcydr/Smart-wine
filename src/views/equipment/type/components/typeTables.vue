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
        <template>
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" style="color: red"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as moment from "moment";
export default {
  data() {
    return {};
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
    // 计算序号
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
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
