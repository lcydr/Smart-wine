<template>
  <el-select v-model="select" slot="prepend" class="selects">
    <el-option
      v-for="(item, index) in partners"
      :key="item.id"
      :label="item.name"
      :value="index"
    ></el-option>
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
    partners: {
      type: Array,
      required: true,
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
