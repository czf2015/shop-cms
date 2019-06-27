<template>
  <a-modal :visible="visible" width="1080" :confirmLoading="confirmLoading" @cancel="handleCancel">
    <h4>{{title}}</h4>
    <a-table
      :columns="columns"
      :dataSource="data"
      :rowKey="data.id"
      bordered
      :scroll="scroll"
      :pagination="pagination"
      :loading="loading"
    />
  </a-modal>
</template>


<script>
export default {
  props: {
    title: "",
    data: [],
    columns: [],
    visible: false,
    confirmLoading: false,
    scroll: { x: 1600 },
    pagination: Object,
    loading: false
  },
  methods: {
    showModal() {
      this.$emit("visible", {
        type: "visible",
        msg: true
      });
    },
    handleCancel(e) {
      this.$emit("visible", {
        type: "visible",
        msg: false
      });
    }
  }
};
</script>


<style scoped>
h4 {
  text-align: center;
  font-size: large;
  font-weight: bold;
}
</style>
