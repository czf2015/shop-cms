export const columns = [{
    title: "商品编号",
    dataIndex: "id",
    align: 'center',
    scopedSlots: { customRender: "id" }
},
{
    title: "中文名",
    dataIndex: "Chinese",
    align: 'center',
    scopedSlots: { customRender: "Chinese" }
},
{
    title: "英文名",
    dataIndex: "English",
    align: 'center',
    scopedSlots: { customRender: "English" }
}, {
    title: "库存",
    dataIndex: "num",
    align: 'center',
    scopedSlots: { customRender: "num" }
}, {
    title: "操作",
    dataIndex: "edit",
    align: 'center',
    scopedSlots: { customRender: "edit" }
},]

export const editions = ['num']
