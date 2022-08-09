<template>
  <el-dialog title="提示" :visible="isshow" width="30%">
    <div style="margin: 20px"></div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <!-- //点位 -->
      <el-form-item label="点位名称" prop="name">
        <el-input
          label-width="50px"
          v-model="ruleForm.name"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <!-- 所属商圈 -->
      <el-form-item label="所属商圈" label-width="100px" prop="region">
        <el-select
          v-model="ruleForm.region"
          placeholder="请选择活动区域"
          label-width="100px"
          size="medium"
        >
          <el-option
            v-for="item in districtlist"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 所在区域 -->
      <el-form-item label="所在区域">
        <el-select
          v-model="ruleForm.region.remark"
          placeholder="请选择活动区域"
          size="medium"
        >
          <el-option
            :label="item.name"
            :value="item.name"
            v-for="(item, index) in arealist"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 合作商 -->
      <el-form-item label="归属合作商" prop="region">
        <el-select
          v-model="ruleForm.ownerName"
          placeholder="请选择活动区域"
          size="medium"
        >
        </el-select>
      </el-form-item>
      <!-- //地址 -->
      <el-form-item label="详细地址" prop="addtions">
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
          :value="ruleForm.addr1"
        >
        </el-cascader>
      </el-form-item>
      <!-- 表单 -->
      <el-form-item>
        <el-input
          :rows="4"
          placeholder="请输入内容"
          v-model="ruleForm.addr"
          maxlength="60"
          show-word-limit
        >
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="tijiao">确 定</el-button>
    </span>
    <span slot="footer" class="dialog-footer"> </span>
  </el-dialog>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";
import { getbusinessdistrict, getPartnerlist, postRevise } from "@/api";
export default {
  name: "pop",
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      addtions: {}, //存储地址数据
      textarea: "", //文本框值
      ruleForm: {
        name: "", //点位名称
        region: "", //商圈
        quyu: "", //区域
        ownerName: "", //合作商
        addr1: "", //地址
        addr: "", //介绍
        id: "",
        areaCode: "",
        businessId: "",
        ownerId: "",
        createUserId: "",
        regionId: "",
      },

      //商圈列表
      districtlist: [],
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        addtions: [{ required: true, message: "请选择区域", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getbusinessdistrict();
    this.ruleForm = this.shujuxuanran;
    // console.log(this.ruleForm);
    this.selectedOptions = this.shujuxuanran.addr1;
    console.log(this.shujuxuanran);
  },
  mounted() {},
  props: {
    isshow: {
      type: Boolean,
    },
    Detailslist: {
      type: Array,
    },
    shujuxuanran: {
      type: Object,
    },
    arealist: {
      type: Array,
    },
    taskInfoList: {
      type: Array,
    },
  },
  methods: {
    async getPartnerlist() {
      const res = await getPartnerlist();
      console.log(res);
    },
    handleChange(value) {
      //我们选择地址后，selectedOptions 会保存对应的区域码，例如北京的区域码为'110000'
      //我们要取出区域码对应的汉字，就需要用CodeToText(区域码)进行输出
      this.addtions.selectedOptions = value;
      var name = "";
      this.selectedOptions.map((item) => (name += CodeToText[item] + "/"));
      this.addtions.name = name;
      // console.log(this.addtions.names);
      // console.log(this.addtions);
    },
    //获取商圈列表
    async getbusinessdistrict() {
      const res = await getbusinessdistrict();
      // console.log(res);
      this.districtlist = res;
    },
    //修改数据
    async tijiao() {
      // console.log();
      const res = await postRevise( this.shujuxuanran.id,{
        addr: this.addtions.name,
        areaCode: 0,
        businessId: this.ruleForm.businessId,
        createUserId: this.ruleForm.createUserId,
        name: this.ruleForm.name,
        ownerId: this.ruleForm.ownerId,
        ownerName: this.ruleForm.ownerName,
        regionId: this.ruleForm.regionId,
      });
      // this.ruleForm.id,
      // this.ruleForm

      console.log(res);
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped lang="less">
/deep/.el-input__inner {
  width: 500px;
}
</style>
