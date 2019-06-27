<template>
  <section id="inventory_wrap">
    <label>
      物料编号：
      <input v-model="id" style="width: 20%">
      <!-- <button @click="fetch({opt: 'query', id})">查询</button> -->
    </label>
    <label>
      数量增减：
      <input v-model.number="inc" style="width: 20%">
      <button @click="fetch({opt: 'inc', data: [[id, inc]]})">确认</button>
    </label>
    <editable
      title="物料库存"
      :hasAdd="false"
      :data="data"
      :rowKey="data.id"
      :columns="columns"
      :editions="editions"
      :newData="newData"
      @edit="edit"
      @save="save"
      :scroll="{x: 1200}"
      :pagination="pagination"
      :loading="loading"
    />
  </section>
</template>


<script>
import api from "@/utils/api.js";
import editable from "@/components/table/editable.vue";
import { columns, editions } from "./facade.js";
import { convert } from "./convert.js";
const url = "/v1/inventory_wrap";

export default {
  components: {
    editable
  },

  asyncData() {},

  mounted() {
    this.fetch();
  },

  data() {
    const that = this;
    return {
      newData: [],
      data: [],
      columns,
      editions,
      id: "",
      inc: 0,
      pagination: {},
      loading: false
    };
  },

  computed: {},

  methods: {
    fetch(param = { opt: "query" }) {
      this.loading = true;
      api.post(url, param).then(res => {
        const { status, result } = res.data;
        if (status === "success") {
          this.loading = false;
          if (param.opt === "query" && param.id && param.id !== -1) {
            this.data = [
              {
                id: param.id,
                ...result,
                edit: "edit"
              }
            ];
          } else {
            const { products } = result;
            if (this.data.length === 1) {
              this.data = this.data.map(item => ({
                id: item.id,
                ...(products || result)[item.id],
                edit: "edit"
              }));
            } else {
              this.data = Object.keys(products || result).map(key => ({
                id: key,
                ...(products || result)[key],
                edit: "edit"
              }));
            }
            this.setPagination(this.data.length);
          }
        } else {
          //
          window.alert(res.data.error);
        }
      });
    },
    edit({ type, msg }) {
      this.data = msg;
    },
    save({ type, msg }) {
      const newData = [...this.data];
      const target = newData.find(item => item.id === msg);
      this.fetch(convert(target));
    },
    setPagination(total, pageSize = 10) {
      this.pagination.total =
        total % pageSize ? parseInt(total / pageSize) + 1 : total / pageSize;
    }
  }
};
</script>


<style scoped>
</style>
