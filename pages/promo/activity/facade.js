export const columns = [
    {
        title: "id",
        dataIndex: "id",
        align: 'center',
        scopedSlots: { customRender: "id" }
    },
    {
        title: "类型",
        dataIndex: "type",
        className: "col-2",
        align: 'center',
        scopedSlots: { customRender: "type" },
        filters: [
            { text: "KOL", value: "KOL" },
            { text: "客服", value: "客服" },
            { text: "免单", value: "免单" },
            { text: "测试", value: "测试" }
        ],
        onFilter: (value, record) => record.type === value
    },
    {
        title: "名称",
        dataIndex: "_title",
        className: "col-2",
        align: 'center',
        scopedSlots: { customRender: "_title" }
    },
    {
        title: "内容",
        dataIndex: "desc",
        className: "col-2",
        align: 'center',
        scopedSlots: { customRender: "desc" }
    },
    {
        title: "有效时间(小时)",
        dataIndex: "valid",
        className: "col-1",
        align: 'center',
        scopedSlots: { customRender: "valid" }
    },
    {
        title: "开始日期",
        dataIndex: "start_at",
        className: "col-2",
        align: 'center',
        scopedSlots: { customRender: "start_at" }
    },
    {
        title: "结束日期",
        dataIndex: "end_at",
        className: "col-2",
        align: 'center',
        scopedSlots: { customRender: "end_at" }
    },
    {
        title: "优惠条件",
        children: [
            {
                title: "优惠类型",
                dataIndex: "condition_type",
                className: "col-2",
                align: 'center',
                scopedSlots: { customRender: "condition_type" },
                filters: [
                    { text: "subtract", value: "subtract" },
                    { text: "discount", value: "discount" }
                ],
                onFilter: (value, record) => record.condition_type === value
            },
            {
                title: "满足金额",
                dataIndex: "condition_total_fee",
                className: "col-1",
                align: 'center',
                scopedSlots: { customRender: "condition_total_fee" },
                sorter: (a, b) => a.condition_total_fee - b.condition_total_fee
            },
            {
                title: "优惠内容",
                dataIndex: "condition_content",
                className: "col-1",
                align: 'center',
                scopedSlots: { customRender: "condition_content" }
            }
        ]
    },
    {
        title: "最多使用次数",
        dataIndex: "max_usage",
        className: "col-1",
        align: 'center',
        scopedSlots: { customRender: "max_usage" }
    },
    {
        title: "库存",
        dataIndex: "left_usage",
        className: "col-1",
        align: 'center',
        scopedSlots: { customRender: "left_usage" }
    },
    {
        title: "个人最多使用次数",
        dataIndex: "max_cur_usage",
        className: "col-1",
        align: 'center',
        scopedSlots: { customRender: "max_cur_usage" }
    },
    {
        title: "是否是首单",
        dataIndex: "neworder",
        className: "col-1",
        align: 'center',
        scopedSlots: { customRender: "neworder" },
        filters: [
            { text: "true", value: "true" },
            { text: "false", value: "false" }
        ],
        onFilter: (value, record) => record.neworder === value,
    },
    {
        title: "标签",
        dataIndex: "remark",
        className: 'col-3',
        align: 'center',
        scopedSlots: { customRender: "remark" }
    },
    // {
    //     title: "使用优惠券的订单",
    //     dataIndex: "takenby",
    //     className: 'col-5',
    //     align: 'center'
    // },
    {
        title: "操作",
        fixed: "right",
        children: [
            {
                title: "修改",
                dataIndex: "operation_edit",
                align: 'center',
                scopedSlots: { customRender: "edit" }
            },
            // {
            //     title: "删除",
            //     dataIndex: "operation_delete",
            //     scopedSlots: { customRender: "delete" }
            // },
            {
                title: "发放优惠码",
                dataIndex: "operation_takeCoupon",
                align: 'center',
                scopedSlots: { customRender: "operation" }
            }
        ]
    }
];

export const editions = [
    "type",
    "_title",
    "desc",
    "valid",
    "start_at",
    "end_at",
    "condition_type",
    "condition_content",
    "condition_total_fee",
    "max_usage",
    // "left_usage",
    "max_cur_usage",
    "neworder",
    "remark"
];