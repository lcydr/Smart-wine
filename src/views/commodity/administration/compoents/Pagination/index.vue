<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="10"
      layout="total"
      :total="totalCount"
    >
    </el-pagination>
    <span class="paginationButtomInfo"
      >第{{ pages }}/{{ totalPage }}页
      <el-button style="margin-left: 880px">上一页</el-button
      ><el-button>下一页</el-button></span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage1: 1,
    };
  },
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
    Events: {
      type: String,
      required: true,
    },
    pages: {
      type: String,
      required: true,
    },
    totalPage: {
      type: String,
      required: true,
    },
  },
  created() {},

  methods: {
    handleSizeChange() {},
    handleCurrentChange() {
      this.$emit(this.Events, this.currentPage1);
    },
  },
};
</script>

<style scoped lang="less">
.block {
  position: relative;
}
.el-pagination {
  
  /deep/.btn-prev {
    position: absolute;
    right: 240px;
  }
  /deep/.btn-next {
    position: absolute;
    right: 120px;
  }
  /deep/.el-pagination__total {
    margin-top: 15px;
    font-size: 16px;
  }
}
.paginationButtomInfo {
  font-size: 16px;
  color: #606266;
  position: absolute;
  top: 7px;
  left: 100px;
  height: 46px;
  line-height: 46px;
}

/deep/.el-pagination button {
  height: 40px;
  width: 80px;
  border-radius: 5px;
  background-color: #eee;
}
</style>
