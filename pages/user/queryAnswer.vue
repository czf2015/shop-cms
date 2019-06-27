<template >
  <div data-query-data-box>
    <div class="query_form">
      <a-tabs type="card">
        <a-tab-pane tab="批量查询" key="1">
          <a-form :form="ordersForm">
            <a-row>
              <a-col :span="14">
                <a-form-item
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                  label="下单日期及时间"
                >
                  <a-range-picker
                    v-decorator="['range-time-picker']"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item :wrapper-col="formItemLayout.allCol">
              <a-button class="submit" type="primary" @click="handleSubmit(1)">查询</a-button>
              <a-button class="submit" type="primary" @click="handleSubmit(1, 10000,'a')">导出</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="订单号查询" key="2">
          <a-form :form="orderForm">
            <a-row>
              <a-col :span="16">
                <a-form-item
                  :label-col="formItemLayout.labelCol"
                  :wrapper-col="formItemLayout.wrapperCol"
                  label="请输入订单号"
                >
                  <a-textarea
                    placeholder="Basic usage"
                    v-decorator="['orderId',{
            rules: [{
              required: true, message: '请输入订单号',
            }]
          },{'initialValue':''}]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item :wrapper-col="formItemLayout.allCol">
              <a-button class="submit" type="primary" @click="searchOrder(1)">查询</a-button>
              <a-button class="submit" type="primary" @click="searchOrder(1,5000,'b')">导出</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div v-show="tableShow">
      <a-table
        :scroll="{ x: 2000 }"
        :columns="queryTableColumns"
        :rowKey="queryTableData.id"
        :dataSource="queryTableData"
        :pagination="pagination"
        @change="handleTableChange"
      ></a-table>
    </div>
  </div>
</template>


<script>
import { $v } from "~/assets/js/common/Ajax";
import { DateFormat } from "~/assets/js/common/DateFormat";
import { YOU_ZAN } from "~/assets/js/common/const";
import { CheckString } from "~/assets/js/common/CheckString";
import { TableToExcel } from "~/assets/js/common/tableToExcel";
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
        allCol: { span: 14 }
      },
      queryCondition: {},
      orderStatus: this.$store.state.orderStatus.data,
      tableShow: false,
      queryTableData: [],
      pagination: {},
      data: {},
      url: "",
      ajax: "",
      queryTableColumns: [
        {
          title: "订单ID",
          dataIndex: "id"
        },
        {
          title: "商品ID",
          dataIndex: "itemsId"
        },
        {
          title: "商品信息",
          dataIndex: "products"
        },
        {
          title: "购买时间",
          dataIndex: "payTime"
        },
        {
          title: "实付金额",
          dataIndex: "paid"
        },
        {
          title: "订单状态",
          dataIndex: "status"
        },
        {
          title: "优惠卷名称",
          dataIndex: "coupon"
        },
        {
          title: "收件人姓名",
          dataIndex: "name"
        },
        {
          title: "地址",
          dataIndex: "address"
        },
        {
          title: "电话",
          dataIndex: "phone"
        },
        {
          title: "用户ID",
          dataIndex: "user_id"
        },
        {
          title: "报告类型",
          dataIndex: "suggestionId.isMe"
        },
        {
          title: "问卷来源",
          dataIndex: "suggestionId.from"
        },
        {
          title: "问卷完成时间",
          dataIndex: "suggestionId.finishTime"
        },
        {
          title: "年龄",
          dataIndex: "suggestionId.age"
        },
        {
          title: "性别",
          dataIndex: "suggestionId.gender"
        },
        {
          title: "营养目标1",
          dataIndex: "suggestionId.to1"
        },
        {
          title: "营养目标2",
          dataIndex: "suggestionId.to2"
        },
        {
          title: "营养目标3",
          dataIndex: "suggestionId.to3"
        },
        {
          title: "营养目标4",
          dataIndex: "suggestionId.to4"
        }
      ]
    };
  },
  beforeCreate() {
    this.ordersForm = this.$form.createForm(this);
    this.orderForm = this.$form.createForm(this);
  },
  mounted() {},
  methods: {
    handleTableChange(pagination, filters, sorter) {
      //翻页
      console.log(pagination, filters, sorter);
      this.data.page = pagination.current;
      if (this.data.orderInfo) {
        this.data.orderInfo.page = pagination.current;
      } else {
        this.data.page = pagination.current;
      }
      this.dataToTable();
    },
    statusToStatusName(status) {
      //通过状态id查询状态名称
      let label = "";
      this.orderStatus.map(d => {
        if (d.value == status) {
          label = d.label;
        }
      });
      return label;
    },
    handleSubmit(page = 1, pageSize = 10, excel) {
      const rangeTimeTicker = this.ordersForm.getFieldsValue()[
        "range-time-picker"
      ];
      const time = rangeTimeTicker
        ? [
            rangeTimeTicker[0].format("YYYY-MM-DD HH:mm:ss"),
            rangeTimeTicker[1].format("YYYY-MM-DD HH:mm:ss")
          ]
        : ["", ""];
      let data = {
        page: page,
        pageSize: pageSize,
        startDate: time[0],
        endDate: time[1]
      };
      this.data = data;
      this.url = YOU_ZAN + "/api/v2/get_answers_by_date";
      this.ajax = "get";
      this.dataToTable(excel);
    },
    dataToTable(excel) {
      $v[this.ajax](this.url, this.data, res => {
        const pagination = { ...this.pagination };
        pagination.total = res.result.data.count;
        pagination.current = this.data.page;
        pagination.pageSize =
          res.result.data.queryAnswerRst.length < 10
            ? 10
            : res.result.data.queryAnswerRst.length;
        this.pagination = pagination;
        let queryTableData = res.result.data.queryAnswerRst;
        queryTableData.map((data, index) => {
          queryTableData[index].status = this.statusToStatusName(data.status);
          queryTableData[index].payTime = data.payTime
            ? DateFormat.fullDate(new Date(data.payTime))
            : "";
          if (queryTableData[index].suggestionId) {
            queryTableData[index].suggestionId.finishTime = data.suggestionId
              .finishTime
              ? DateFormat.fullDate(new Date(data.suggestionId.finishTime))
              : "";
          }
        });
        this.tableShow = true;
        if (excel == "a") {
          this.outExcel(queryTableData);
          this.handleSubmit(1);
        } else if (excel == "b") {
          this.outExcel(queryTableData);
          this.searchOrder(1);
        } else {
          this.queryTableData = queryTableData;
        }
      });
    },
    searchOrder(page = 1, pageSize = 10, excel) {
      this.checkData().then(orderIds => {
        let data = {
          orderInfo: {
            orderIds,
            page: page,
            pageSize: pageSize
          }
        };
        this.data = data;
        this.ajax = "post";
        this.url = YOU_ZAN + "/api/v2/get_answers_by_id";
        this.dataToTable(excel);
      });
    },
    checkData() {
      return new Promise((resolve, reject) => {
        this.orderForm.validateFields((err, fieldsValue) => {
          if (err) {
            reject(err);
            return;
          }
          const orderVal = fieldsValue["orderId"];
          let orderIdList = CheckString.List(orderVal);
          resolve(orderIdList);
        });
      });
    },
    async outExcel(queryTableData) {
      let excelData = [];
      let excelName = [];
      queryTableData.map(d => {
        var oneData = {};
        var oneName = [];
        this.queryTableColumns.map((res, index) => {
          let name = "";
          let path = d;
          res.dataIndex.split(".").map(data => {
            path ? (path = path[data]) : "";
          });
          oneData["a" + index] = path;
          name = res.title;
          oneName.push(name);
        });
        excelName = oneName;
        excelData.push(oneData);
      });
      TableToExcel.downloadExl(excelData, excelName, "问卷信息");
    }
  }
};
</script>


<style lang='scss'>
div[data-query-data-box] {
  .submit {
    float: right;
    margin-left: 10px;
  }
  .ant-calendar-picker {
    width: 100% !important;
  }
  .ant-row {
    display: flex;
    justify-content: center;
  }
  .query_table {
    overflow: hidden;
    margin-bottom: 20px;
  }
}
.orderAllInOne {
  .ant-modal {
    width: 80% !important;
  }
}
</style>
