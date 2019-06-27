<template>
  <a-input-group compact>
    <a-select :defaultValue="options[0]" @change="selectType">
      <a-select-option v-for="(value, index) in options" :value="value" :key="index">{{value}}</a-select-option>
    </a-select>
    <a-input-search style="width: 50%" placeholder="请选择类型后再输入" @search="action">
      <a-button slot="enterButton">{{operation}}</a-button>
    </a-input-search>
  </a-input-group>
</template>


<script>
export default {
  props: {
    options: {
      type: Array,
      default: ["Option1", "Option2"]
    },
    operation: {
      type: String,
      default: "搜索"
    }
  },

  data() {
    return {
      type: ""
    };
  },

  methods: {
    selectType(val) {
      this.type = val;
    },
    action(val) {
      this.$emit("action", {
        type: this.type,
        msg: val
      });
    }
  }
};
</script>