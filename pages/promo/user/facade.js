export const columns = [
    {
        title: "优惠活动id",
        dataIndex: "promocodeGroupId",
        width: 200,
        scopedSlots: { customRender: "promocodeGroupId" }
    },
    {
        title: "用户昵称",
        dataIndex: "nickName",
        width: 200,
        scopedSlots: { customRender: "nickName" }
    },
    {
        title: "优惠码",
        dataIndex: "promocode",
        width: 200,
        scopedSlots: { customRender: "promocode" }
    },
    {
        title: "备注",
        dataIndex: "remark",
        width: 200,
        scopedSlots: { customRender: "remark" },
        filters: [
            { text: "微博", value: "微博" },
            { text: "bilibili", value: "bilibili" },
            { text: "客服", value: "客服" },
            { text: "测试", value: "测试" },
            { text: "问卷", value: "问卷" },
            { text: "访谈", value: "访谈" },
            { text: "其他", value: "其他" },
        ],
        onFilter: (value, record) => value === '其他' ? ['微博', "bilibili", "客服", "测试", "问卷", "访谈"].every(item => record.remark !== item) : record.remark.includes(value)
    },
    {
        title: "使用优惠券的订单",
        dataIndex: "promocodeUsage",
        sorter: (a, b) => a.promocodeUsage - b.promocodeUsage
    },
    {
        title: "使用优惠券的订单总金额(¥)",
        dataIndex: "totalPromoTurnover",
        sorter: (a, b) => a.totalPromoTurnover - b.totalPromoTurnover
    },
    {
        title: "操作",
        // fixed: "right",
        children: [
            {
                title: "修改",
                dataIndex: "operation_edit",
                scopedSlots: { customRender: "edit" }
            },
            {
                title: "查看",
                dataIndex: "operation_action",
                scopedSlots: { customRender: "operation" }
            }
        ]
    }
]

export const editions = ["nickName", "promocodeGroupId", "promocode", "remark"]

export const queryColumns = [
    {
        title: "订单ID",
        dataIndex: "id",
        scopedSlots: { customRender: "id" }
    },
    {
        title: "订单状态",
        dataIndex: "status"
    },
    {
        title: "来源",
        dataIndex: "from"
    },
    {
        title: "用户ID",
        dataIndex: "user_id"
    },
    {
        title: "收件人",
        dataIndex: "receiver_name"
    },
    {
        title: "身份证号",
        dataIndex: "identity_card"
    },
    {
        title: "电话",
        dataIndex: "receiver_tel"
    },
    {
        title: "省",
        dataIndex: "delivery_province"
    },
    {
        title: "市",
        dataIndex: "delivery_city"
    },
    {
        title: "区",
        dataIndex: "delivery_district"
    },
    {
        title: "详细地址",
        dataIndex: "delivery_address"
    },
    {
        title: "下单时间",
        dataIndex: "create_time"
    },
    {
        title: "付款时间",
        dataIndex: "pay_time"
    },
    {
        title: "总金额价格",
        dataIndex: "total_fee"
    },
    {
        title: "实际支付价格",
        dataIndex: "paid"
    },
    {
        title: "运费",
        dataIndex: "transport_fee"
    },
    {
        title: "优惠减免",
        dataIndex: "benefit"
    },
    {
        title: "优惠卷ID",
        dataIndex: "coupon_id"
    },
    {
        title: "优惠卷名称",
        dataIndex: "coupon_title"
    },
    {
        title: "优惠卷额度",
        dataIndex: "coupon_desc"
    },
]