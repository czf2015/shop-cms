<template>
  <a-table :columns="outerColumns" :dataSource="outerData" class="components-table-demo-nested">
    <a slot="operation" slot-scope="text" href="javascript:;">Publish</a>
    <a-table
      slot="expandedRowRender"
      slot-scope="text"
      :columns="innerColumns"
      :dataSource="innerData"
      :pagination="false"
    >
      <span slot="status" slot-scope="text">
        <a-badge status="success"/>Finished
      </span>
      <span slot="operation" slot-scope="text" class="table-operation">
        <a href="javascript:;">Pause</a>
        <a href="javascript:;">Stop</a>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item>Action 1</a-menu-item>
            <a-menu-item>Action 2</a-menu-item>
          </a-menu>
          <a href="javascript:;">More
            <a-icon type="down"/>
          </a>
        </a-dropdown>
      </span>
    </a-table>
  </a-table>
</template>


<script>
export default {
  props: {
    outerData: {
      type: Array,
      default: [
        {
          key: 1,
          name: "Screem",
          platform: "iOS",
          version: "10.3.4.5654",
          upgradeNum: 500,
          creator: "Jack",
          createdAt: "2014-12-24 23:12:00"
        }
      ]
    },
    innerData: {
      type: Array,
      default: [
        {
          key: 1,
          date: "2014-12-24 23:12:00",
          name: "This is production name",
          upgradeNum: "Upgraded: 56"
        }
      ]
    },
    outerColumns: {
      type: Array,
      default: [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Platform", dataIndex: "platform", key: "platform" },
        { title: "Version", dataIndex: "version", key: "version" },
        { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
        { title: "Creator", dataIndex: "creator", key: "creator" },
        { title: "Date", dataIndex: "createdAt", key: "createdAt" },
        {
          title: "Action",
          key: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ]
    },
    innerColumns: {
      type: Array,
      default: [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Platform", dataIndex: "platform", key: "platform" },
        { title: "Version", dataIndex: "version", key: "version" },
        { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
        { title: "Creator", dataIndex: "creator", key: "creator" },
        { title: "Date", dataIndex: "createdAt", key: "createdAt" },
        {
          title: "Action",
          key: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ]
    }
  },
  data() {
    return {};
  }
};
</script>