import { DateFormat } from '@/utils/Date.js'

export function convert(item, method = 'GET') {
    return method === 'GET'
        ? {
            id: typeof item === 'undefined' ? '' : item._id,
            nickName: typeof item === 'undefined' ? '' : item.nickName,
            promocodeGroupId: typeof item === 'undefined' ? '' : item.promocodeGroupId,
            promocode: typeof item === 'undefined' ? '' : item.promocode,
            promocodeUsage: typeof item === 'undefined' ? '' : item.promocodeUsage ? item.promocodeUsage.length : 0,
            totalPromoTurnover: typeof item === 'undefined' ? '' : parseFloat(item.totalPromoTurnover || 0).toFixed(2),
            remark: typeof item === 'undefined' ? '' : item.remark || '',
            operation_edit: "edit",
            operation_action: "action"
        }
        : {
            _id: item.id || undefined,
            nickName: item.nickName,
            promocodeGroupId: item.promocodeGroupId,
            promocode: item.promocode,
            remark: item.remark
        }
}

export function convertToQuery(item) {
    const { id, create_time, status, from, user_id, msg } = item
    const { order_promotion, full_order_info } = msg
    const { coupon } = order_promotion.coupon
    const { pay_info, address_info } = full_order_info
    const { time_pay, total_fee, paid, transport_fee, benefit } = pay_info
    const { receiver_name, identity_card, receiver_tel, delivery_province, delivery_city, delivery_district, delivery_address } = address_info
    return {
        id,
        create_time: DateFormat.fullDate(new Date(create_time)),
        status,
        from,
        user_id,
        receiver_name,
        identity_card,
        receiver_tel,
        delivery_province,
        delivery_city,
        delivery_district,
        delivery_address,
        pay_time: DateFormat.fullDate(new Date(time_pay)),
        total_fee,
        paid,
        transport_fee,
        benefit,
        coupon_id: coupon.group.id,
        coupon_title: coupon.group.title,
        coupon_desc: coupon.group.desc
    }
}