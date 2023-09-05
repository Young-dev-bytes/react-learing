

const initialCount = 100
export default function countReducer(preState = initialCount, action) {
    console.log(preState, action);
    // action对象获取type, data
    const { type, data } = action
    // 根据type决定如何加工数据
    switch (type) {
        case 'increment'://如果是加
            return preState + data
        case 'decrement'://如果是减
            return preState - data
        case 'incrementIfOdd':
            return preState + data
        case 'incrementAsync':
            return preState + data
        default:
            return preState
    }

}