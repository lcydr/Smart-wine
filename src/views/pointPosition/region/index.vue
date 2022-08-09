<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="区域搜索">
          <Input ref="taskInfoList"></Input>
        </el-form-item>
        <el-form-item>
          <Button
            category="select"
            icon="el-icon-search"
            @click.native="search"
          ></Button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main">
      <div class="main-title">
        <Button
          category="news"
          icon="el-icon-circle-plus-outline"
          @click.native="xinjian"
          @getArealist="getArealist"
          >新建</Button
        >
      </div>
      <!-- 新建弹窗 -->
      <pushlist v-if="isshow" :isshow.sync="isshow" />
      <div class="bable">
        <Tables :taskInfoList="taskInfoList" :pageIndex="pageIndex"></Tables>

        <Pagination
          v-if="zzz"
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          @getArealist="getArealist"
          Events="getArealist"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import pushlist from "./components/pushlist.vue";
import Input from "@/components/Input";
import InputSelect from "./components/InputSelect.vue";
import Tables from "./components/tables.vue";
import Pagination from "@/components/Pagination";
import { getArealist, pushxinzeng } from "@/api";
export default {
  name: "Approvals",
  data() {
    return {
      formInline: {},
      pageIndex: 1,
      totalCount: 0,
      totalPage: "", //全部页数
      pages: "", //当前页数
      taskInfoList: [],
      zzz: true,
      isshow: false,
    };
  },
  components: {
    Button,
    Input,
    InputSelect,
    Tables,
    Pagination,
    pushlist,
  },
  created() {
    this.getArealist();
  },
  mounted() {},
  methods: {
    //查询
    async search() {
      const res = await getArealist({
        name: this.$refs.taskInfoList.input || null,
        // regionId: this.$refs.taskInfoList.select || null,
      });
      this.taskInfoList = res.currentPageRecords;
      if (
        this.$refs.taskInfoList.input.length === 0
      ) {
        this.getArealist();
        this.zzz = true;
      } else {
        this.zzz = false;
      }
    },
    async getArealist(pageIndex) {
      this.pageIndex = pageIndex;
      const res = await getArealist({ pageIndex: pageIndex, pageSize: 10 });
      // console.log(res);
      this.taskInfoList = res.currentPageRecords;
      this.pages = res.pageIndex; //当前页数
      // console.log(this.pages);
      this.totalCount = Number(res.totalCount); //全部条数
      this.totalPage = res.totalPage; //全部页数
    },
    xinjian() {
      this.isshow = true;
    },
  },
};
</script>

<style scoped lang="less">
// 头部样式
.title {
  display: flex;
  height: 64px;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  /deep/.el-form-item__label {
    font-weight: normal;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
// 主体样式
.main {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  height: 800px;
}

// 表格相关样式
/deep/.el-table--scrollable-y .el-table__body-wrapper {
  overflow-y: hidden;
}
/deep/.el-table__fixed-right-patch {
  display: none;
}
/deep/.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}

// 消除表格下划线
/deep/.el-table td,
.el-table th.is-leaf {
  border: none;
}
/deep/.el-table th,
.el-table th.is-leaf {
  border: none;
}
/deep/.el-table::before {
  height: 0;
}
</style>
