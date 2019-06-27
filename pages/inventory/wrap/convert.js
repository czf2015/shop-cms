export function convert(item) {
    return {
        opt: 'set',
        id: item.id,
        num: parseInt(item.num)
    }
}