import { combineReducers } from "redux";
import countReducer from './count'
import personReducer from './person'

const rootReducer = combineReducers({
    count: countReducer,
    persons: personReducer
})

export default rootReducer
