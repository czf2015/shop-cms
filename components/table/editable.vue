<template>
  <div class="wrapper">
    <h4>{{title}}</h4>
    <a-button class="editable-add-btn" @click="handleAdd" v-if="hasAdd">Add</a-button>
    <a-table
      :columns="columns"
      :dataSource="data"
      bordered
      :scroll="scroll"
      :pagination="pagination"
      :loading="loading"
    >
      <template v-for="col in editions" :slot="col" slot-scope="text, record, index">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.id, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span>
            <a @click="() => action(record.id)">{{operation}}</a>
          </span>
        </div>
      </template>
      <template slot="edit" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.id)">保存</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.id)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.id)">编辑</a>
          </span>
        </div>
      </template>
      <template slot="delete" slot-scope="text, record">
        <a-popconfirm
          v-if="data.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.id)"
        >
          <a href=" ">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>


<script>
export default {
  props: {
    title: String,
    hasAdd: {
      type: Boolean,
      default: true
    },
    newData: Array,
    data: Array,
    columns: Array,
    editions: Array,
    operation: String,
    scroll: {
      type: Object,
      default: { x: 1600 }
    },
    pagination: Object,
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cacheData: []
    };
  },
  methods: {
    action(key) {
      this.$emit("action", {
        type: this.operation,
        msg: key
      });
    },
    edit(key) {
      debugger;
      const newData = [...this.data];
      const target = newData.find(item => item.id === key);
      if (target) {
        target.editable = true;
        this.$emit("edit", {
          type: "edit",
          msg: newData
        });
      }
    },
    save(key) {
      debugger;
      this.$emit("save", {
        type: "save",
        msg: key
      });
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.find(item => item.id === key);
      if (target) {
        Object.assign(target, this.cacheData.find(item => item.id === key));
        delete target.editable;
        this.data = newData;
      }
    },
    onDelete(key) {
      const data = [...this.data];
      this.data = data.filter(item => item.id !== key);
    },
    handleAdd() {
      this.data = [this.newData, ...this.data];
      this.edit("");
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.find(item => item.id === key);
      if (target) {
        target[column] = value;
        this.data = newData;
      }
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

.input {
  margin-bottom: 8px;
}

.editable-row-operations a {
  margin-right: 8px;
}

.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>