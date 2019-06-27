<template>
  <section id="promo_activity">
    <selectSearch
      :options="selectSearch.options"
      @action="selectSearch.action"
      :operation="selectSearch.operation"
    />
    <editable
      title="优惠活动"
      :data="data"
      :rowKey="data.id"
      :columns="columns"
      :editions="editions"
      :newData="newData"
      @edit="edit"
      @save="save"
      operation="发放优惠码"
      @action="takeCoupon"
      :scroll="{x: 2400}"
      :pagination="pagination"
      :loading="loading"
    />
  </section>
</template>


<script>
import api from "@/utils/api.js";
import selectSearch from "@/components/form/selectSearch.vue";
import editable from "@/components/table/editable.vue";
import { columns, editions } from "./facade.js";
import { convert } from "./convert.js";
const getUrl = "/v1/promogroup";
const saveUrl = "/v1/promogroup";
const operateUrl = "/v1/create_temp_promocode";

export default {
  components: {
    selectSearch,
    editable
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
        options: ["类型", "id"],
        operation: "查询优惠活动",
        action({ type, msg }) {
          that.fetch({
            type,
            value: msg
          });
        }
      },
      pagination: {},
      loading: false
    };
  },

  computed: {},

  methods: {
    fetch({ type, value } = {}) {
      this.loading = true;
      if (type && value) {
        api.get(`${getUrl}?${type}=${value}`).then(res => {
          if (res.data.status === "success") {
            this.loading = false;
            this.data = [res.data.result].map(item => convert(item));
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
      if (parseInt(target.max_usage) === 0) {
        window.alert("请填写正确的最多使用次数");
      } else if (parseInt(target.max_cur_usage) === 0) {
        window.alert("请填写正确的个人最多使用次数");
      } else if (parseFloat(target.condition_content) <= 0) {
        window.alert("优惠内容必须大于0");
      } else if (target.condition_type === "discount") {
        if (parseFloat(target.condition_content) > 1) {
          window.alert("打折优惠类型优惠内容不能大于1");
        }
      } else if (parseInt(target.condition_total_fee) === 0) {
        window.alert("请填写正确的满足金额");
      } else {
        api.post(saveUrl, convert(target, "POST")).then(res => {
          if (res.data.status === "success") {
            this.fetch();
          } else {
            window.alert(res.data.error);
          }
        });
      }
    },
    takeCoupon({ type, msg }) {
      api
        .post(operateUrl, {
          group_id: msg
        })
        .then(res => {
          if (res.data.status === "success") {
            window.alert(res.data.result);
          } else {
            window.alert(res.data.error);
          }
        });
    },
    setPagination(total, pageSize = 10) {
      this.pagination.total =
        total % pageSize ? parseInt(total / pageSize) + 1 : total / pageSize;
    }
  }
};
</script>

<style lang="scss">
#promo_activity {
  .col-1 {
    min-width: 100px !important;
  }

  .col-2 {
    min-width: 200px !important;
  }

  .col-3 {
    min-width: 300px !important;
  }

  .col-5 {
    min-width: 500px !important;
  }
}
</style>
