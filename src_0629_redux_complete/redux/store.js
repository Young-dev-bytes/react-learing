
/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

// 引入createStore,用于创建redux中最为核心的store对象
import { legacy_createStore as createStore } from "redux";
// 引入count组件服务的reducer
import countReducer from './count_reducer'


export default createStore(countReducer)
