
import { combineReducers } from 'redux'
import authReducer from './auth'
import subCategoryReducer from './subCategory'
import cartReducer from './cart'
const rootReducer = combineReducers({
    auth: authReducer,
    subCategory: subCategoryReducer,
    cart: cartReducer
})

export default rootReducer