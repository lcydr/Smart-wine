<template>
  <el-dialog title="新增点位" :visible="isshow" width="30%" @close="onclose">
    <el-form
      :model="vmCount"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="点位名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="所在区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option
            v-for="(item, index) in arealist"
            :key="index"
            :label="item.remark"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域">
        <el-select v-model="ruleForm.diqu" placeholder="请选择活动区域">
          <el-option
            v-for="item in diqu"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属合作商">
        <el-select v-model="ruleForm.hezuo" placeholder="请选择活动区域">
          <el-option
            v-for="item in hezuolist"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="详细地址">
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="adddesp">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import store from "@/store/modules/user";
import { getbusinessdistrict, postnewlist } from "@/api";
import { regionData, CodeToText } from "element-china-area-data";

export default {
  name: "post",
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      ruleForm: {
        name: "", //点位名称
        region: "", //所在区域
        diqu: "", //所属区域
        diquId: "",
        desc: "", //介绍
        hezuo: "", //合作
      },
      addtions: {}, //存储地址数据
      diqu: [],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "blur" },
        ],
      },
    };
  },

  props: {
    isshow: {
      type: Boolean,
      required: true,
    },
    arealist: {
      type: Array,
      required: true,
    },
    hezuolist: {
      type: Array,
      required: true,
    },
    taskInfoList: {
      type: Array,
    },
  },
  created() {
    this.getbusinessdistrict();
  },
  methods: {
    onclose() {
      this.$emit("update:isshow", false);
    },
    async adddesp() {
      // console.log(this.ruleForm.diquId);
      // console.log(this.addtions);

      // console.log(this.ruleForm);
      await postnewlist({
        name: this.ruleForm.name,
        addr: this.addtions[0] + "-" + this.ruleForm.desc,
        areaCode: this.addtions[1],
        createUserId: 1,
        // createUserId: this.$store.state.user.userId,

        regionId: this.ruleForm.region.id,
        businessId: this.ruleForm.diqu.id,
        ownerId: this.ruleForm.hezuo.id,
        ownerName: this.ruleForm.hezuo.name,
      });
      this.onclose();
      this.$parent.getPointlist1()
    },
    async getbusinessdistrict() {
      const res = await getbusinessdistrict();
      this.diqu = res;
    },
    handleChange(value) {
      //我们选择地址后，selectedOptions 会保存对应的区域码，例如北京的区域码为'110000'
      //我们要取出区域码对应的汉字，就需要用CodeToText(区域码)进行输出
      this.addtions.selectedOptions = value;
      var name = "";
      this.selectedOptions.map((item) => (name += CodeToText[item] + "/"));
      this.addtions = [name, value[value.length - 1]];
      console.log(this.addtions.names);
    },
  },
};
</script>

<style scoped lang="less">
/deep/.el-input__inner {
  width: 500px;
}
</style>
