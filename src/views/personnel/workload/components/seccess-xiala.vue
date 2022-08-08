<template>
  <el-select
    v-model="select"
    slot="prepend"
    :placeholder="placeholder"
    class="selects"
  >
    <el-option label="运营员" value="false"></el-option>
    <el-option label="维修员" value="true"></el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      select: "",
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped lang="less">
/deep/.el-input__inner {
  width: 206px;
  height: 36px;
  line-height: 30px;
  padding-right: 30px;
}
</style>
