<template>
  <div>
    <el-table :data="list" style="width: 100%" :border="false">
      <el-table-column
        type="index"
        :index="indexChange"
        label="序号"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="skuName" label="商品名称" width="140">
      </el-table-column>
      <el-table-column prop="skuImage" label="商品图片" width="140">
        <template slot-scope="scope">
          <img class="goodsImg" :src="scope.row.skuImage" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="brandName" label="品牌" width="140">
      </el-table-column>
      <el-table-column prop="unit" label="规格" width="140"> </el-table-column>
      <el-table-column prop="price" label="商品价格" width="140">
      </el-table-column>
      <el-table-column prop="skuClass.className" label="商品类型" width="140">
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="240">
      </el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            style="color: #5f84ff"
            @click.native="btnChange(scope.row)"
            type="text"
            >修改</el-button
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
    list: {
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
    repairDrder(row) {
      return row.createType === "1" ? "自动" : "手动";
    },
    times(row) {
      return moment(row.updateTime).format("YYYY.MM.DD hh:mm:ss");
    },
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    btnChange(val) {
      // console.log(val);
      this.$emit("btnChange", val);
    },
  },
};
</script>

<style scoped lang="less">
.cell .goodsImg {
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
