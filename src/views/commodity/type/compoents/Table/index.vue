<template>
  <div>
    <el-table :data="goodsList" style="width: 100%" :border="false">
      <el-table-column
        type="index"
        :index="indexChange"
        label="序号"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="className" label="商品类型名称" width="860">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope"
          ><el-button @click.native="btnChange(scope.row)" type="text"
            >修改</el-button
          >
          <el-button
            @click.native="btnDel(scope.row.classId)"
            type="text"
            style="color: red"
            >删除</el-button
          ></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Button from "../Button/index.vue";
export default {
  data() {
    return {};
  },
  created() {
    // console.log(this.totalCount);
  },
  props: {
    goodsList: {
      type: Array,
      required: true,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
    text: {
      type: String,
      required: true,
    },
  },
  created() {},
  components: {
    Button,
  },

  methods: {
    indexChange(index) {
      // console.log(index, "index");
      return (this.pageIndex - 1) * 10 + index + 1;
    },
    // 修改商品类型
    btnChange(val) {
      // console.log(this.goodsList);
      this.$emit("btnChange", val);
      // console.log(val);
    },
    btnDel(classId) {
      this.$emit("btnDel", classId);
    },
  },
};
</script>

<style scoped lang="less"></style>
