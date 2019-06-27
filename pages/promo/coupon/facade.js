export const columns = [
    {
        title: "优惠活动id",
        dataIndex: "id",
        scopedSlots: { customRender: "id" }
    },
    {
        title: "用户id",
        dataIndex: "user_id",
        scopedSlots: { customRender: "user_id" }
    },
    {
        title: "优惠码",
        dataIndex: "promocode",
        scopedSlots: { customRender: "promocode" }
    },
    {
        title: "是否可用",
        dataIndex: "activate",
        scopedSlots: { customRender: "activate" }
    },
    {
        title: "优惠开始日期",
        dataIndex: "start_at",
        scopedSlots: { customRender: "start_at" }
    },
    {
        title: "优惠结束日期",
        dataIndex: "end_at",
        scopedSlots: { customRender: "end_at" }
    },
    {
        title: "详细信息",
        width: 300,
        children: [
            {
                title: "优惠类型",
                dataIndex: "group_type",
                scopedSlots: { customRender: "group_type" },
                filters: [
                    { text: "substract", value: "substract" },
                    { text: "discount", value: "discount" }
                ],
                width: 100
            },
            {
                title: "满足金额",
                dataIndex: "group_total_fee",
                scopedSlots: { customRender: "group_total_fee" },
                sorter: true,
                width: 100
            },
            {
                title: "优惠券名称",
                dataIndex: "group_title",
                scopedSlots: { customRender: "group_title" },
                width: 100
            },
            {
                title: "描述",
                dataIndex: "group_desc",
                scopedSlots: { customRender: "group_desc" },
                width: 100
            },
            {
                title: "开始日期",
                dataIndex: "group_start_at",
                scopedSlots: { customRender: "group_start_at" },
                width: 100
            },
            {
                title: "结束日期",
                dataIndex: "group_end_at",
                scopedSlots: { customRender: "group_end_at" },
                width: 100
            },
            {
                title: "最多可用次数",
                dataIndex: "group_max_usage",
                scopedSlots: { customRender: "group_max_usage" },
                width: 100
            },
            {
                title: "库存",
                dataIndex: "group_left_usage",
                scopedSlots: { customRender: "group_left_usage" },
                width: 100
            },
            {
                title: "是否是首单",
                dataIndex: "group_neworder",
                scopedSlots: { customRender: "group_neworder" },
                width: 100
            },
            {
                title: "使用优惠券的订单",
                dataIndex: "group_takenby",
                scopedSlots: { customRender: "group_takenby" },
                width: 100
            },
            {
                title: "优惠条件",
                children: [
                    {
                        title: "优惠类型",
                        dataIndex: "group_condition_type",
                        scopedSlots: { customRender: "group_condition_type" },
                        filters: [
                            { text: "substract", value: "substract" },
                            { text: "discount", value: "discount" }
                        ],
                        width: 100
                    },
                    {
                        title: "满足金额",
                        dataIndex: "group_condition_total_fee",
                        scopedSlots: { customRender: "group_condition_total_fee" },
                        sorter: true,
                        width: 100
                    },
                    {
                        title: "优惠内容",
                        dataIndex: "group_condition_content",
                        scopedSlots: { customRender: "group_condition_content" },
                        width: 100
                    }
                ]
            }
        ]
    },
    // {
    //     title: "操作",
    //     width: 400,
    //     children: [
    //         {
    //             title: "修改",
    //             dataIndex: "operation_edit",
    //             scopedSlots: { customRender: "edit" },
    //             width: 200
    //         },
    //         {
    //             title: "删除",
    //             dataIndex: "operation_delete",
    //             scopedSlots: { customRender: "delete" },
    //             width: 200
    //         }
    //     ]
    // }
];

export const editions = [
    "id",
    "user_id",
    "promocode",
    "activate",
    "start_at",
    "end_at",
    "group_id",
    "group_type",
    "group_title",
    "group_desc",
    "group_start_at",
    "group_end_at",
    "group_max_usage",
    "group_left_usage",
    "group_condition_type",
    "group_condition_total_fee",
    "group_condition_content",
    "group_neworder",
    "group_takenby"
]