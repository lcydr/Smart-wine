<template>
  <div>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="点位搜索">
          <Input ref="searchlist"></Input>
        </el-form-item>
        <el-form-item label="区域搜索">
          <InputSelect :arealist="arealist" ref="xuanxianglist"></InputSelect>
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
        <Button category="news" icon="el-icon-circle-plus-outline">新建</Button>
      </div>
      <div class="bable">
        <Tables :taskInfoList="taskInfoList" :pageIndex="pageIndex"></Tables>

        <Pagination
          v-show="zzz"
          :arealist="arealist"
          :totalCount="totalCount"
          :pages="pages"
          :totalPage="totalPage"
          @getPointlist1="getPointlist1"
          Events="getPointlist1"
          @edit="showedit"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getPointlist1 } from "@/api";
import Button from "./components/Button/index.vue";
import Input from "@/components/Input";
import InputSelect from "./components/InputSelect/index.vue";
import Tables from "./components/tables.vue";
import Pagination from "@/components/Pagination";
export default {
  name: "Approvals",
  data() {
    return {
      formInline: {},
      taskInfoList: [],
      pageIndex: 1,
      totalCount: 0,
      totalPage: "", //全部页数
      pages: "", //当前页数
      arealist: [], //区域列表
      zzz: true,
    };
  },
  components: {
    Button,
    Input,
    InputSelect,
    Tables,
    Pagination,
  },
  created() {
    this.getPointlist1();
  },
  mounted() {
    // console.log(this.$refs.searchlist);
    // console.log(this.$refs.xuanxianglist);
  },
  methods: {
    async getPointlist1(pageIndex) {
      this.pageIndex = pageIndex;
      const res = await getPointlist1({ pageIndex: pageIndex });
      this.taskInfoList = res.currentPageRecords;

      //全部条数
      this.totalCount = Number(res.totalCount);
      //当前页
      this.pages = res.pageIndex;
      // console.log(this.pages);
      //全部页数
      this.totalPage = res.totalPage;
      //截取地址
      this.taskInfoList.forEach((item) => {
        item.addr = item.addr.slice(12);
      });
      res.currentPageRecords.forEach((item) => {
        this.arealist.push(item.region);
      });
      // this.arealist = [...new Set(this.arealist)];
      // console.log(this.arealist);
    },
    //搜索
    async search() {
      const res = await getPointlist1({
        name: this.$refs.searchlist.input || null,
        regionId: this.$refs.xuanxianglist.select || null,
      });
      this.taskInfoList = res.currentPageRecords;
      // console.log(res);
      if (
        this.$refs.searchlist.input.length === 0 &&
        this.$refs.xuanxianglist.select.length === 0
      ) {
        this.zzz = true;
      } else {
        this.zzz = false;
      }
    },
    //查看详情
    showedit() {
      console.log(111);
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
