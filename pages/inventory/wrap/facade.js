export const columns = [{
    title: "编号",
    dataIndex: "id",
    align: 'center',
    scopedSlots: { customRender: "id" }
},
{
    title: "名称",
    dataIndex: "name",
    align: 'center',
    scopedSlots: { customRender: "name" }
},
{
    title: "库存",
    dataIndex: "num",
    align: 'center',
    scopedSlots: { customRender: "num" }
},
{
    title: "预用",
    dataIndex: "preuse",
    align: 'center',
    scopedSlots: { customRender: "preuse" }
}, {
    title: "操作",
    dataIndex: "edit",
    align: 'center',
    scopedSlots: { customRender: "edit" }
},]

export const editions = ['num']
