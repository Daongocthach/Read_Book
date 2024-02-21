
import { combineReducers } from 'redux'
import authReducer from './auth'
import ordersReducer from './orders'
import categoriesReducer from './categories'
import subCategoriesReducer from './subCategories'
import providersReducer from './providers'
import productsReducer from './products'
import usersReducer from './users'
import promotionsReducer from './promotions'

const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
    subCategories: subCategoriesReducer,
    providers: providersReducer,
    products: productsReducer,
    users: usersReducer,
    promotions: promotionsReducer
})

export default rootReducer