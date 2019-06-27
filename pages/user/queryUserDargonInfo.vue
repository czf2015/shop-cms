<template>
  <div data-query-lagistics-box>
    <div class="query_form">
      <a-form :form="form">
        <a-row>
          <a-col :span="16">
            <a-form-item
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
              label="请输入龙计划邀请码或订单号"
            >
              <a-input
                placeholder="请输入龙计划邀请码或订单号"
                v-decorator="['promoCode',{
            rules: [{
              required: true, message: '请输入龙计划邀请码或订单号',
            }]
          },{'initialValue':''}]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item :wrapper-col="formItemLayout.allCol">
          <a-button class="submit" type="primary" @click="changeOrderStatus">查询</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-if="isSearch">
      <span class="topspan">用户信息</span>
      <a-table
        :scroll="{ x: 1500 }"
        :columns="userInfoColumns"
        :rowKey="userData.userId"
        :dataSource="userData"
        :pagination="false"
      >
        <template slot="avatarUrl" slot-scope="text, record">
          <img :src="record.userData.avatarUrl">
        </template>
      </a-table>
      <span v-show="newOrders.length!=0" class="downspan">优胜美地本人订单信息</span>
      <model-table
        v-show="newOrders.length!=0"
        class="table"
        name="a"
        :orderData="newOrders"
        :product="false"
      />
      <span v-show="oldOrders.length!=0" class="downspan">有赞本人订单信息</span>
      <user-table
        v-show="oldOrders.length!=0"
        name="a"
        class="table"
        :orderData="oldOrders"
        :product="false"
      />
      <span v-show="newOrdersUsage.length!=0" class="downspan">优胜美地邀请订单信息</span>
      <model-table
        v-show="newOrdersUsage.length!=0"
        name="a"
        class="table"
        :orderData="newOrdersUsage"
        :product="false"
      />
      <span v-show="oldOrdersUsage.length!=0" class="downspan">有赞邀请订单信息</span>
      <user-table
        v-show="oldOrdersUsage.length!=0"
        name="b"
        class="table"
        :orderData="oldOrdersUsage"
        :product="false"
      />
    </div>
  </div>
</template>
<script>
import { $v } from "~/assets/js/common/Ajax";
import { CheckString } from "~/assets/js/common/CheckString";
import { YOU_ZAN } from "~/assets/js/common/const";
import { DateFormat } from "~/assets/js/common/DateFormat";
import modelTable from "~/components/order/modelTable";
import userTable from "~/components/user/userTable";
export default {
  components: {
    modelTable,
    userTable
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
        allCol: { span: 16 }
      },
      listData: [
        {
          title: "",
          details: ""
        }
      ],
      isSearch: false,
      newOrdersUsage: [],
      newOrders: [],
      oldOrdersUsage: [],
      oldOrders: [],
      userData: [],
      userInfoColumns: [
        {
          title: "用户昵称",
          dataIndex: "userData.nickName"
        },
        {
          title: "头像",
          scopedSlots: { customRender: "avatarUrl" }
        },
        {
          title: "性别",
          dataIndex: "suggestionsData.gender"
        },
        {
          title: "年龄",
          dataIndex: "suggestionsData.age"
        },
        {
          title: "首次填写问卷日期",
          dataIndex: "suggestionDate"
        },
        {
          title: "填写份数",
          dataIndex: "suggestionsData.suggestionNums"
        },
        {
          title: "首次下单日期",
          dataIndex: "orderDate"
        },
        {
          title: "购买单数",
          dataIndex: "payNums"
        },
        {
          title: "本人订单总金额",
          dataIndex: "allPayBills"
        },
        {
          title: "邀请人数",
          dataIndex: "allUsageNum"
        },
        {
          title: "邀请订单总金额",
          dataIndex: "allUsagePay"
        }
      ]
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    changeOrderStatus() {
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          reject(err);
          return;
        }
        let promoCode = fieldsValue["promoCode"];
        promoCode = CheckString.Number(promoCode);
        let data = {};
        if (promoCode.toString().length == 6) {
          data = {
            promoCode: promoCode
          };
        } else {
          data = {
            orderId: promoCode
          };
        }
        this.isSearch = false;
        $v.get(YOU_ZAN + "/api/v1/get_promo_code_info", data, res => {
          console.log(res);
          this.initUserData(res.result.data);
          this.isSearch = true;
          this.newOrders =
            this.newOrdersToShow(res.result.data.newOrdersData) || [];
          this.newOrdersUsage =
            this.newOrdersToShow(res.result.data.newOrderQueryUsage) || [];
          this.oldOrders = res.result.data.oldOrdersData || [];
          this.oldOrdersUsage = res.result.data.oldOrderQueryUsage || [];
          console.log(this.newOrders, this.newOrdersUsage);
        });
      });
    },
    newOrdersToShow(ordersData) {
      console.log(ordersData);
      if (!ordersData) {
        return;
      }
      let newOrder = ordersData;
      newOrder.map((data, index) => {
        newOrder[index] = newOrder[index].orders.final_orders;
        newOrder[index].user_id = ordersData[index].user_id;
      });
      return newOrder;
    },
    initUserData(userInfo) {
      let userData = userInfo;
      userData.suggestionDate = DateFormat.fullDate(
        new Date(userData.suggestionsData.suggestionsDate)
      );
      if (
        userData.oldOrdersData.length == 0 &&
        userData.newOrdersData.length == 0
      ) {
        userData.orderDate = "";
      } else {
        userData.orderDate =
          userData.oldOrdersData.length == 0
            ? userData.newOrdersData[0].orders.final_orders.msg.full_order_info
                .pay_info.time_pay
            : userData.oldOrdersData[0].msg.full_order_info.order_info.pay_time;
        userData.orderDate = DateFormat.fullDate(new Date(userData.orderDate));
      }

      userData.payNums =
        userData.oldOrdersData.length + userData.newOrdersData.length;
      let allPay = 0;
      if (userData.oldOrdersData.length != 0) {
        userData.oldOrdersData.map((d, index) => {
          allPay += Number(d.msg.full_order_info.pay_info.payment);
        });
      }
      if (userData.newOrdersData.length != 0) {
        userData.newOrdersData.map((d, index) => {
          allPay += Number(
            d.orders.final_orders.msg.full_order_info.pay_info.paid
          );
        });
      }
      userData.allPayBills = "¥" + allPay;
      let allUsageNum = 0;
      let allUsagePay = 0;
      if (userData.oldOrderQueryUsage) {
        allUsageNum += userData.oldOrderQueryUsage.length;
        userData.oldOrderQueryUsage.map((d, index) => {
          allUsagePay += Number(d.msg.full_order_info.pay_info.payment);
        });
      }
      if (userData.newOrderQueryUsage) {
        allUsageNum += userData.newOrderQueryUsage.length;
        userData.newOrderQueryUsage.map((d, index) => {
          allUsagePay += Number(
            d.orders.final_orders.msg.full_order_info.pay_info.paid
          );
        });
      }
      userData.allUsageNum = allUsageNum;
      userData.allUsagePay = "¥" + allUsagePay;
      this.userData = [userData];
    }
  }
};
</script>
<style lang='scss'>
div[data-query-lagistics-box] {
  .submit {
    float: right;
  }
  .ant-row {
    display: flex;
    justify-content: center;
  }
  .table {
    margin-top: 20px;
  }
  .downspan {
    float: left;
    font-size: 24px;
    font-weight: 800;
    margin-top: 20px;
  }
  .topspan {
    font-size: 24px;
    font-weight: 800;
  }
}
</style>