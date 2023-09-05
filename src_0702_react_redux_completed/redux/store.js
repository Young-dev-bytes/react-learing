
/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

// 引入createStore,用于创建redux中最为核心的store对象
import { legacy_createStore as createStore, applyMiddleware } from "redux";

import rootReducer from './reducers'

// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";


export default createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk)))

