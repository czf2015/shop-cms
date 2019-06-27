<template>
  <section id="promo_user">
    <selectSearch
      :options="selectSearch.options"
      @action="selectSearch.action"
      :operation="selectSearch.operation"
    />
    <editable
      title="推广用户"
      :data="data"
      :rowKey="data.id"
      :columns="columns"
      :editions="editions"
      :newData="newData"
      @edit="edit"
      @save="save"
      operation="查看"
      @action="query"
      :scroll="{x: 1000}"
      :pagination="pagination"
      :loading="loading"
    />
    <modalTable
      title="使用用户"
      :data="queryData"
      :columns="queryColumns"
      :visible="visible"
      @visible="onVisible"
      :scroll="{x: 2400}"
    />
  </section>
</template>


<script>
import api from "@/utils/api.js";
import selectSearch from "@/components/form/selectSearch.vue";
import editable from "@/components/table/editable.vue";
import modalTable from "@/components/table/modalTable.vue";
import { columns, editions, queryColumns } from "./facade.js";
import { convert, convertToQuery } from "./convert.js";
const getUrl = "/v1/promousers";
const saveUrl = "/v1/promouser";
const queryUrl = "/v2/query_orders_by_id";

export default {
  components: {
    selectSearch,
    editable,
    modalTable
  },

  asyncData() {},

  mounted() {
    this.fetch();
  },

  data() {
    const that = this;
    return {
      newData: convert(),
      data: [],
      columns,
      editions,
      selectSearch: {
        options: ["类型", "promocode"],
        operation: "查询",
        action({ type, msg }) {
          that.fetch({
            type,
            value: msg
          });
        }
      },
      usage: {},
      queryData: [],
      queryColumns,
      visible: false,
      pagination: {},
      loading: false
    };
  },

  computed: {},

  methods: {
    fetch({ type, value } = {}) {
      const that = this;
      this.loading = true;
      if (type && value) {
        api.get(`${getUrl}?${type}=${value}`).then(res => {
          if (res.data.status === "success") {
            this.loading = false;
            this.data = res.data.result.map(item => convert(item));
          } else {
            //
            window.alert(res.data.error);
          }
        });
      } else {
        api.get(getUrl).then(res => {
          if (res.data.status === "success") {
            this.loading = false;
            const result = res.data.result;
            this.data = result.reverse().map(item => convert(item));
            const usage = {};
            res.data.result.forEach(item => {
              usage[item._id] = item.promocodeUsage;
            });
            this.usage = usage;
            this.setPagination(result.length);
          } else {
            //
            window.alert(res.data.error);
          }
        });
      }
    },
    edit({ type, msg }) {
      this.data = msg;
    },
    save({ type, msg }) {
      const newData = [...this.data];
      const target = newData.find(item => item.id === msg);
      api.post(saveUrl, convert(target, "POST")).then(res => {
        if (res.data.status === "success") {
          this.fetch();
        } else {
          window.alert(res.data.error);
        }
      });
    },
    query({ type, msg }) {
      api
        .post(queryUrl, {
          ordersId: this.usage[msg] || []
        })
        .then(res => {
          if (res.data.status === "success") {
            this.queryData = res.data.result.data.map(item =>
              convertToQuery(item)
            );
            this.visible = true;
          } else {
            window.alert(res.data.error);
          }
        });
    },
    onVisible({ type, msg }) {
      this.visible = msg;
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
