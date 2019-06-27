<template>
  <section id="promo_coupon">
    <!-- <selectSearch
      :options="selectSearch.options"
      @action="selectSearch.action"
      :operation="selectSearch.operation"
    />-->
    <label>
      优惠活动id：
      <input v-model="group_id" style="width: 50%">
    </label>
    <selectSearch
      :options="selectTake.options"
      @action="selectTake.action"
      :operation="selectTake.operation"
    />
    <!-- <editable
      title="优惠券"
      :data="data"
      :columns="columns"
      :editions="editions"
      :newData="newData"
      :pagination="pagination"
      :loading="loading"
    />-->
  </section>
</template>


<script>
import api from "@/utils/api.js";
import selectSearch from "@/components/form/selectSearch.vue";
import editable from "@/components/table/editable.vue";
import { columns, editions } from "./facade.js";
import { convert } from "./convert.js";
const getUrl = "/v1/coupon";
const operateUrl = "/v1/take_coupon";

export default {
  components: { selectSearch, editable },

  asyncData() {},

  // mounted() {
  //   this.fetch();
  // },

  data() {
    const that = this;
    return {
      newData: convert(),
      data: [],
      columns,
      editions,
      selectSearch: {
        options: ["类型", "id"],
        operation: "查询优惠券",
        action({ type, msg }) {
          that.fetch({
            type,
            value: msg
          });
        }
      },
      selectTake: {
        options: ["类型", "user_id"],
        operation: "发放优惠券",
        action({ type, msg }) {
          that.takeCoupon({
            type,
            value: msg
          });
        }
      },
      group_id: "",
      pagination: {},
      loading: false
    };
  },

  computed: {},

  methods: {
    takeGroupId(val) {
      debugger;
      this.group_id = val;
    },
    takeCoupon({ type, value }) {
      if (type !== "类型") {
        debugger;
        api
          .post(operateUrl, {
            group_id: this.group_id,
            [type]: value
          })
          .then(res => {
            debugger;
            if (res.status === "success") {
              debugger;
              window.alert("已发放");
            } else {
              window.alert("发放失败");
            }
          });
      } else {
        window.alert("请选择类型");
      }
    },
    fetch({ type, value }) {
      this.loading = true;
      debugger;
      if (type !== "类型") {
        api.get(`${getUrl}?${type}=${value}`).then(res => {
          if (res.data.status === "success") {
            this.loading = false;
            const result = res.data.result;
            this.data = [result].map(item => convert(item));
            this.setPagination(result.length);
          } else {
            window.alert(res.data.error);
          }
        });
      } else {
        window.alert("请选择类型");
      }
    },
    setPagination(total, pageSize = 10) {
      this.pagination.total =
        total % pageSize ? parseInt(total / pageSize) + 1 : total / pageSize;
    }
  }
};
</script>

<style scoped></style>
