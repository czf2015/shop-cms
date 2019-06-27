<template>
  <div>
    <div style="margin-bottom: 16px"></div>
    <a-table
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :dataSource="dataSource"
    />
  </div>
</template>


<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      default: [
        {
          title: "Name",
          dataIndex: "name"
        },
        {
          title: "Age",
          dataIndex: "age"
        },
        {
          title: "Address",
          dataIndex: "address"
        }
      ]
    }
  },

  data() {
    return {
      selectedRowKeys: []
    };
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    }
  }
};
</script>