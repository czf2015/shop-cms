export function convert(item) {
    return {
        opt: 'set',
        productId: item.id,
        num: parseInt(item.num)
    }
}