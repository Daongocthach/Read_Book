import DashBoard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Auth/Login/Login'
import Register from '../pages/Auth/Register/Register'
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import Promotion from '../pages/Promotion/Promotion'
import GenreDetail from '../pages/GenreDetail/GenreDetail'
import NotFound from '../pages/NotFound/NotFound'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import AuthLayout from '../layouts/AuthLayout'
import Thanks from '../pages/Thanks/Thanks'
import Account from '../pages/Account/Account'
const publicRoutes = [
    { path:'/login', component: Login, layout: AuthLayout },
    { path:'/register', component: Register, layout: AuthLayout },
    { path:'/reset-password', component: ResetPassword, layout: AuthLayout },
    { path:'/', component: DashBoard },
    { path:'/account', component: Account },
    { path:'/cart', component: Cart },
    { path:'/checkout', component: Checkout },
    { path:'/promotion', component: Promotion },
    { path:'/thanks', component: Thanks },
    { path:'/genre-detail', component: GenreDetail },
    { path:'/product-detail', component: ProductDetail },
    { path:'*', component: NotFound }
]

const privateRoutes = [
]

export { publicRoutes, privateRoutes }