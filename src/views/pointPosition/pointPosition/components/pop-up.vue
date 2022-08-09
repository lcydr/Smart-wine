<template>
  <el-dialog title="提示" :visible="isshow" width="30%" @close="onClose">
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
      <!-- 所在区域 -->
      <el-form-item label="所在区域" label-width="100px" prop="region">
        <el-select
          v-model="ruleForm.region"
          placeholder="请选择活动区域"
          label-width="100px"
          size="medium"
        >
          <el-option
            v-for="item in quyu"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 所属商圈 -->
      <el-form-item label="所属商圈">
        <el-select v-model="value" placeholder="请选择活动区域" size="medium">
          <el-option
            v-for="item in diqu"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 合作商 -->
      <el-form-item label="归属合作商" prop="region">
        <el-select
          v-model="ruleForm.name"
          placeholder="请选择活动区域"
          size="medium"
        >
          <el-option
            v-for="item in getfanfan"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
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
          v-model="ruleForm.desc"
          maxlength="60"
          show-word-limit
        >
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="tijiao">确 定</el-button>
    </span>
    <span slot="footer" class="dialog-footer"> </span>
  </el-dialog>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";

import {
  getbusinessdistrict,
  getPartnerlist,
  postRevise,
  getArealist,
} from "@/api";
export default {
  name: "pop",
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      addtions: [], //存储地址数据
      textarea: "", //文本框值
      diqu: [], //商圈
      quyu: [], //区域
      getfanfan: [],
      value: "1",
      ruleForm: {
        name: "", //点位名称
        region: "", //所在区域
        businessType: "", //所属区域
        diquId: "",
        desc: "", //介绍
        hezuo: "", //合作
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
      },
    };
  },
  created() {
    this.getbusinessdistrict();
    this.ruleForm = this.shujuxuanran;
    // console.log(this.ruleForm);
    this.getArealist();
    this.getPartnerlist();
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
    onClose() {
      this.$emit("update:isshow", false);
    },
    async getArealist() {
      const res = await getArealist({ pageIndex: 1, pageSize: 50 });
      // console.log(res);
      this.quyu = res.currentPageRecords;
    },
    async getbusinessdistrict() {
      const res = await getbusinessdistrict();
      this.diqu = res;
      console.log(res);
    },
    async getPartnerlist() {
      const res = await getPartnerlist({ pageIndex: 1, pageSize: 50 });
      this.getfanfan = res.currentPageRecords;
    },
    handleChange(value) {
      //我们选择地址后，selectedOptions 会保存对应的区域码，例如北京的区域码为'110000'
      //我们要取出区域码对应的汉字，就需要用CodeToText(区域码)进行输出
      this.addtions.selectedOptions = value;
      var name = "";
      this.selectedOptions.map((item) => (name += CodeToText[item] + "/"));
      this.addtions = [name, value[value.length - 1]];
      console.log(this.addtions);
    },

    //修改数据
    async tijiao() {
      console.log(this.shujuxuanran);
      try {
        const res = await postRevise(
          {
            name: this.ruleForm.name,
            addr: this.addtions[0] + "-" + this.ruleForm.addr1,
            areaCode: this.addtions[1],
            // createUserId: 1,
            createUserId: this.$store.state.user.userId,
            regionId: this.ruleForm.regionId,
            businessId: this.ruleForm.businessId,
            ownerId: this.ruleForm.ownerId,
            ownerName: this.ruleForm.ownerName,
          },
          this.ruleForm.id
        );
        this.$success.message("修改成功");
        this.$parent.isshow = false;
        this.onClose();
      } catch (error) {
        this.$success.error("修改失败");
      }
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
