<template>
  <a-layout-sider collapsible v-model="collapsed">
    <div class="logo">
      <img src="~/assets/img/Logo.png">
    </div>
    <a-menu @click="routeToView" theme="dark" :defaultSelectedKeys="['1']" mode="inline">
      <a-sub-menu v-for="items in routeView" :key="items.id">
        <span slot="title">
          <a-icon :type="items.icon"/>
          <span>{{items.name}}</span>
        </span>
        <a-menu-item v-for="item in items.children" :key="item.id">{{item.name}}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script>


export default {
  data() {
    return {
      collapsed: false,
      routeView: [
        {
          name: "订单相关",
          url: "",
          icon: "file-done",
          id: "101",
          children: [
            {
              name: "订单查询",
              url: "/order/queryData",
              id: 1,
              children: []
            },
            {
              name: "订单信息修改",
              url: "/order/changeOrderData",
              id: 2,
              children: []
            }
            // {
            //   name: "订单处理",
            //   url: "/order/orderDeal",
            //   id: 2,
            //   children: []
            // },
            // {
            //   name: "订单状态修改",
            //   url: "/status_change",
            //   id: 3,
            //   children: []
            // }
          ]
        },
        {
          name: "生产相关",
          url: "",
          id: "102",
          icon: "cluster",
          children: [
            {
              name: "生产指令查询",
              url: "/product/productCommand",
              id: 3,
              children: []
            },
            {
              name: "修改生产单元",
              url: "/product/productUnits",
              id: 4,
              children: []
            }
            // {
            //   name: "生成生产总表",
            //   url: "product/productTotalList",
            //   id: 8,
            //   children: []
            // }
          ]
        },
        {
          name: "库存相关",
          url: "",
          id: "103",
          icon: "dashboard",
          children: [
            {
              name: "产品库存",
              url: "/inventory/product",
              id: 5,
              children: []
            },
            {
              name: "物料库存",
              url: "/inventory/wrap",
              id: 6,
              children: []
            }
          ]
        },
        {
          name: "物流相关",
          url: "",
          id: "104",
          icon: "interation",
          children: [
            {
              name: "生成运单",
              url: "/logistics/freight",
              id: 7,
              children: []
            },
            {
              name: "物流查询",
              url: "/logistics/queryLogistics",
              id: 8,
              children: []
            },
            {
              name: "发货管理",
              url: "/logistics/delivery",
              id: 9,
              children: []
            }
          ]
        },
        {
          name: "优惠相关",
          url: "",
          id: "105",
          icon: "gift",
          children: [
            {
              name: "优惠活动",
              url: "/promo/activity",
              id: 10,
              children: []
            },
            {
              name: "推广用户",
              url: "/promo/user",
              id: 11,
              children: []
            },
            {
              name: "优惠券",
              url: "/promo/coupon",
              id: 12,
              children: []
            }
          ]
        },
        {
          name: "用户相关",
          url: "",
          id: "106",
          icon: "user",
          children: [
            {
              name: "龙计划邀请码信息",
              url: "/user/queryUserDargonInfo",
              id: 13,
              children: []
            },
            {
              name: "问卷信息查询",
              url: "/user/queryAnswer",
              id: 14,
              children: []
            }
          ]
        },
        {
          name: "后台监测",
          url: "",
          id: "107",
          icon: "warning",
          children: [
            {
              name: "错误日志",
              url: "/error",
              id: 15,
              children: []
            }
          ]
        }
      ]
    };
  },
  methods: {
    routeToView({ item, key, selectedKeys }) {
      this.routeView.map(d => {
        d.children.map(data => {
          if (data.id == key) this.$router.push(data.url);
        });
      });
    }
  }
};
</script>

<style lang="scss">
#components-layout-demo-side .logo {
  height: 50px;
  display: flex;
  justify-content: center;
  margin: 12px;
  img {
    height: 50px;
  }
}
</style>