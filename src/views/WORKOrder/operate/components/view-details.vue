<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">查看详情</el-button>

    <el-dialog
      title="工单详情"
      :visible.sync="dialogVisible"
      width="30%"
      center="false"
    >
      <span slot="footer" class="dialog-footer">
        <el-button>重新加载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

    <script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
</style>


