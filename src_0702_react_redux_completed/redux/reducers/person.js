import { ADD_PERSON } from "../constant"


// 初始化人的列表
const initialPerson = [{ id: '001', name: 'tom', age: 90 }]
export default function countReducer(preState = initialPerson, action) {
    // action对象获取type, data
    const { type, data } = action
    console.log('perState->', preState);
    console.log('action->', action);
    // 根据type决定如何加工数据
    switch (type) {
        case ADD_PERSON:// 增加一个人
            return [data, ...preState]
        default:
            return preState
    }

}