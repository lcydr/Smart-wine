<template>
  <el-select
    v-model="select"
    slot="prepend"
    :placeholder="placeholder"
    class="selects"
  >
    <el-option
      v-for="item in Arrlist"
      :key="item.typeId"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: "InputSelectVmType",
  data() {
    return {
      select: "",
      currentUserId: 0,
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    Arrlist: {
      type: [Array, Object],
      required: true,
    },
  },

  watch: {
    select: {
      handler(news, old) {
        // console.log(news);
        const id = this.Arrlist.find((item) => item.id === news);
        // console.log(id);
        this.currentUserId = id.createUserId;
        // console.log(this.currentUserId);
      },
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped lang="less">
/deep/.el-input__inner {
  // width: 100%;
  height: 36px;
  line-height: 30px;
  padding-right: 30px;
}
.el-select {
  width: 90%;
}
</style>
