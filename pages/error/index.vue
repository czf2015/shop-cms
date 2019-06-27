<template>
  <section id="error">
      <h4 class="title">错误日志</h4>
      <div>总共{{total}}条{{pageNumber}}页</div>
      <a-table 
        :columns="columns"
        :dataSource="data"
        @change="handleTableChange"
        bordered
        :scroll="{x: 1500}"
        :pagination="pagination"
        :loading="loading"
      />
  </section>
</template>


<script>
import api from "@/utils/api.js";
import { columns } from "./facade.js";
import { convert } from "./convert.js";
const getUrl = "/v2/get_return_error_logs";
let page = 1
let pageSize = 10


export default {
  components: {
  },

  asyncData() {},

  mounted() {
    this.fetch(page, pageSize);
  },

  data() {
    return {
      data: [],
      columns,
      total: 0,
      pagination: {},
      loading: false
    };
  },

  computed: {
    pageNumber() {
      return this.total % pageSize ? parseInt(this.total / pageSize) + 1 : this.total / pageSize
    }
  },

  methods: {
    handleTableChange (pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch(this.pagination.current, pageSize);
    },
    fetch(page = 1, pageSize = 10) {
      this.loading = true;
      api.get(`${getUrl}?page=${page}&pageSize=${pageSize}`).then(res => {
          if (res.data.status === "success") {
            this.loading = false;
            const {errorMessage, total} = res.data.result;
            console.log(errorMessage)
            this.data = errorMessage.map(item => convert(item));
            console.log(this.data)
            const pager = {...this.pagination}
            pager.total = total
            pager.pageSize = pageSize
            this.pagination = pager
            this.total = total
          } else {
          //
            window.alert(res.data.error);
          }
      });
    },
  }
};
</script>

<style scoped>
.title {
    text-align: center;
    font-size: large;
    font-weight: bold;
}
</style>
