export function convert(item, method = 'GET') {
    return method === 'GET'
        ? {
            id: typeof item === 'undefined' ? '' : item.id,
            user_id: typeof item === 'undefined' ? '' : item.user_id,
            promocode: typeof item === 'undefined' ? '' : item.promocode,
            activate: typeof item === 'undefined' ? '' : item.activate,
            start_at: typeof item === 'undefined' ? '' : item.start_at,
            end_at: typeof item === 'undefined' ? '' : item.end_at,
            group_id: typeof item === 'undefined' ? '' : item.group && item.group.id,
            group_type: typeof item === 'undefined' ? '' : item.group && item.group.type,
            group_title: typeof item === 'undefined' ? '' : item.group && item.group.title,
            group_desc: typeof item === 'undefined' ? '' : item.group && item.group.desc,
            group_start_at: typeof item === 'undefined' ? '' : item.group && item.group.start_at,
            group_end_at: typeof item === 'undefined' ? '' : item.group && item.group.end_at,
            group_max_usage: typeof item === 'undefined' ? '' : item.group && item.group.max_usage,
            group_left_usage: typeof item === 'undefined' ? '' : item.group && item.group.left_usge,
            group_condition_type: typeof item === 'undefined' ? '' : item.group && item.group.condition.type,
            group_condition_total_fee: typeof item === 'undefined' ? '' : item.group && item.group.condition && item.group.condition.total_fee,
            group_condition_content: typeof item === 'undefined' ? '' : item.group && item.group.condition && item.group.condition.content,
            group_neworder: typeof item === 'undefined' ? '' : item.group && item.group.neworder,
            group_takenby: typeof item === 'undefined' ? '' : item.group && item.group.takenby,
        } : undefined
}