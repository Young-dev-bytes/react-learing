
/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

// 引入createStore,用于创建redux中最为核心的store对象
import { legacy_createStore as createStore, applyMiddleware,combineReducers } from "redux";
// 引入count组件服务的reducer
import countReducer from './reducers/count'
import personReducer from './reducers/person'
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'

// 创建root reducer
const rootReducer = combineReducers({
    he: countReducer,
    personArray: personReducer
})

export default createStore(
    rootReducer,
    applyMiddleware(thunk))
    
