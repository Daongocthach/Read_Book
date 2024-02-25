
import { combineReducers } from 'redux'
import authReducer from './auth'
import categoryReducer from './category'
import authorReducer from './author'
const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    author: authorReducer
})

export default rootReducer