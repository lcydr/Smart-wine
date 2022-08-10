<template>
  <div>
    <div class="top">
      <el-row>
        <el-col :span="12"
          ><el-card class="box">
            <el-row style="font-size: 16px; color: #000">日统计销量</el-row
            ><el-row class="middle"
              ><el-col :span="8">1</el-col> <el-col :span="8">2</el-col>
              <el-col :span="8">3</el-col>
            </el-row>
            <el-row class="footer"
              ><el-col :span="8">当日销售量（个）</el-col>
              <el-col :span="8">当日（元）</el-col>
              <el-col :span="8">当日句（元）</el-col>
            </el-row>
          </el-card></el-col
        >
        <el-col :span="12"
          ><el-card class="box box2">
            <el-row style="font-size: 16px; color: #000">月统计销量</el-row
            ><el-row class="middle middle2"
              ><el-col :span="8">1</el-col> <el-col :span="8">2</el-col>
              <el-col :span="8">3</el-col>
            </el-row>
            <el-row class="footer footer2"
              ><el-col :span="8">当月销售量（个）</el-col>
              <el-col :span="8">当月（元）</el-col>
              <el-col :span="8">当月句（元）</el-col>
            </el-row></el-card
          ></el-col
        >
      </el-row>
    </div>
    <div class="main">
      <el-card style="margin-top: 20px">
        <el-form>
          <el-row
            ><el-col :span="5"
              ><el-form-item label="合作商:">
                <InputSelect :partners="partners"></InputSelect> </el-form-item
            ></el-col>
            <el-col :span="7"
              ><el-form-item label="日期:"
                ><template>
                  <div class="block">
                    <el-date-picker
                      v-model="value"
                      type="daterange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['00:00:00', '23:59:59']"
                    >
                    </el-date-picker>
                  </div> </template></el-form-item
            ></el-col>
            <el-col :span="6">
              <Button
                style="height: 40.5px; background-color: #5f84ff; color: #fff"
                >查询</Button
              ></el-col
            >
          </el-row>
          <el-form-item>
            <el-row>
              <el-col :span="3">
                笔数统计:
                <span style="color: #ff5757; font-size: 20px">5342</span>
                个</el-col
              >
              <el-col :span="3">
                收入统计:
                <span style="color: #ff5757; font-size: 20px">5342</span>
                元</el-col
              >
              <el-col :span="3">
                分成统计:
                <span style="color: #ff5757; font-size: 20px">5342</span>
                元</el-col
              >
            </el-row>
          </el-form-item>
          <el-form-item>
            <Tables></Tables>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPartnersApi, getPartnerCollectApi } from "@/api/statistical";
import InputSelect from "./component/InputSelect/index.vue";
import Button from "./component/Button/index.vue";
import Tables from "./component/Tables/index.vue";
export default {
  data() {
    return {
      value: "",
      partners: [],
    };
  },
  components: {
    InputSelect,
    Button,
    Tables,
  },

  created() {
    this.getPartners();
    this.getPartnerCollect();
  },

  methods: {
    async getPartners(pageIndex) {
      this.pageIndex = pageIndex;
      const res = await getPartnersApi({ pageIndex: pageIndex, pageSize: 10 });
      // console.log(res);
      this.partners = res.currentPageRecords;
      // console.log(this.partners);
    },
    async getPartnerCollect() {
      const res = await getPartnerCollectApi();
      console.log(res);
    },
  },
};
</script>

<style scoped lang="less">
/deep/.box {
  padding: 10px;
  height: 166px;
  border-radius: 15px;
  background-color: rgb(233, 243, 255);
  background-image: url("../../assets/day.4272ef60.png");
  background-repeat: no-repeat, no-repeat;
  background-position: right 10px bottom 5px;
}
/deep/.box2 {
  margin-left: 20px;
  background-color: #fbefe8;
  background-image: url("../../assets/month.5c71f45f.png");
}

/deep/.middle {
  padding-top: 20px;
  .el-col-8 {
    font-weight: 700;
    font-size: 36px;
    color: #072074;
    // text-align: center;
    padding-left: 60px;
  }
}
/deep/.middle2 {
  .el-col-8 {
    color: #ff5757;
  }
}
/deep/.footer {
  margin-top: 10px;
  // text-align: center;
  .el-col-8 {
    font-size: 12px;
    color: #91a7dc;
    padding-left: 60px;
  }
}
/deep/.footer2 {
  .el-col-8 {
    color: #de9690;
  }
}
/deep/.has-gutter {
  font-size: 14px;
  color: #666;
}
</style>
