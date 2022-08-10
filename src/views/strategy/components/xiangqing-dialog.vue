<template>
  <el-dialog
    title="详情策略"
    :visible="visible"
    width="600px"
    :close-on-click-modal="false"
    @close="isShow"
  >
    <span>策略名称：{{ formData.policyName }}</span>
    <div>策略方案:</div>
    <div>
      <div class="bable">
        <Tables :taskInfoList="taskInfoList" :pageIndex="pageIndex"></Tables>

        <Pagination
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          @getTaskInfo="getTaskInfo"
          Events="getTaskInfo"
        ></Pagination>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow">取 消</el-button>
      <el-button type="primary" @click="isShow">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Tables from "./xiangqing-list.vue";
import { getXiangQing } from "@/api/strategy";
import Pagination from "@/components/Pagination";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    xiangqingData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      pageIndex: 1,
      taskInfoList: [],
      totalCount: 0,
      totalPage: "", //全部页数
      pages: "", //当前页数
      formData: {
        createTime: "",
        discount: 1,
        policyId: 1,
        policyName: "",
        updateTime: "",
      },
    };
  },

  created() {
    this.getTaskInfo();
  },
  mounted() {
    this.formData = this.xiangqingData;
    console.log(this.formData);
  },
  methods: {
    isShow() {
      this.$emit("isShow", false);
    },
    // 列表
    async getTaskInfo(pageIndex) {
      this.pageIndex = pageIndex;
      const res = await getXiangQing({
        pageIndex: pageIndex,
        pageSize: 10,
        policyId: this.xiangqingData.policyId,
      });
      // console.log(res);
      this.pages = res.pageIndex;
      this.totalPage = res.totalPage;
      // console.log(this.pages);
      // console.log(this.totalPage);
      this.totalCount = Number(res.totalCount);
      this.taskInfoList = res.currentPageRecords;
    },
  },
  components: {
    Tables,
    Pagination,
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
