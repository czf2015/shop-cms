export function convert(item, method = 'GET') {
    return method === 'GET'
        ? {
            id: typeof item === 'undefined' ? '' : item.id,
            type: typeof item === 'undefined' ? '' : item.type,
            _title: typeof item === 'undefined' ? '' : item.title,
            desc: typeof item === 'undefined' ? '' : item.desc,
            start_at: typeof item === 'undefined' ? '' : item.start_at,
            end_at: typeof item === 'undefined' ? '' : item.end_at,
            condition_type: typeof item === 'undefined' ? '' : item.condition && item.condition[0].type,
            condition_content: typeof item === 'undefined' ? '' : item.condition && item.condition[0].content,
            condition_total_fee: typeof item === 'undefined' ? '' : item.condition && item.condition[0].total_fee,
            max_usage: typeof item === 'undefined' ? '' : item.max_usage,
            left_usage: typeof item === 'undefined' ? '' : item.left_usage,
            max_cur_usage: typeof item === 'undefined' ? '' : item.max_cur_usage || 1,
            valid: typeof item === 'undefined' ? '' : item.valid,
            neworder: typeof item === 'undefined' ? '' : item.neworder ? "true" : "false",
            remark: typeof item === 'undefined' ? '' : item.remark || "",
            // takenby: typeof item === 'undefined' ? '' : JSON.stringify(item.takenby),
            operation_edit: "edit",
            operation_delete: "delete",
            operation_takeCoupon: "takeCoupon"
        }
        : {
            id: item.id || undefined, //优惠活动id，如有此字段，为更新group，否则为创建
            type: item.type, //可能值：newuser、dragon； newuser表示新用户自动发放，dragon表示龙计划优惠券
            title: item._title,
            desc: item.desc,
            valid: parseInt(item.valid) || undefined,
            start_at: item.start_at.trim(),
            end_at: item.end_at.trim(),
            condition: [
                {
                    total_fee: parseInt(item.condition_total_fee),
                    content: parseFloat(item.condition_content), //示例：如type=subtract，50代表优惠50元，如type=discount，0.8代表8折优惠
                    type: item.condition_type.trim() //subtract为减价，discount为折扣
                }
            ],
            max_usage: parseInt(item.max_usage), //最大总领取次数
            // left_usage: parseInt(item.left_usage),
            max_cur_usage: parseInt(item.max_cur_usage), //每人最大领取次数
            neworder: item.neworder.trim() === "true", //是否限首单使用
            remark: item.remark //备注
        };
}
