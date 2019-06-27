<template>
  <section id="inventory_product">
    <label>
      产品编号：
      <input v-model.number="productId" style="width: 20%">
      <button @click="fetch({opt: 'query', productId})">查询</button>
    </label>
    <label>
      数量增减：
      <input v-model.number="inc" style="width: 20%">
      <button @click="fetch({opt: 'inc', data: [[productId, inc]]})">确认</button>
    </label>
    <editable
      title="产品库存"
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
const url = "/v1/inventory";
import { productName } from "@/mocks/productName.js";

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
      productId: "",
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
          if (
            param.opt === "query" &&
            param.productId &&
            param.productId !== -1
          ) {
            this.data = [
              {
                id: param.productId,
                ...productName[param.productId],
                num: result,
                edit: "edit"
              }
            ];
          } else {
            const { products } = result;
            if (this.data.length === 1) {
              this.data = this.data.map(item => ({
                id: item.id,
                ...productName[item.id],
                num: (products || result)[item.id].num,
                edit: "edit"
              }));
            } else {
              this.data = Object.keys(products || result).map(key => ({
                id: key,
                ...productName[key],
                num: (products || result)[key].num,
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
