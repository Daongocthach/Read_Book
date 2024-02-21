import DashBoard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import Profile from '../pages/Profile/Profile'
import AuthLayout from '../layouts/AuthLayout'
import Users from '../pages/Manage/Users/Users'
import Categories from '../pages/Manage/Categories/Categories'
import SubCategories from '../pages/Manage/SubCategories/SubCategories'
import Providers from '../pages/Manage/Providers/Providers'
import Promotions from '../pages/Manage/Promotions/Promotions'
import Inventory from '../pages/Manage/Inventory/Inventory'
import Invoices from '../pages/Manage/Invoices/Invoices'
import Orders from '../pages/Manage/Orders/Orders'
import Products from '../pages/Manage/Products/Products'
const publicRoutes = [
    { path:'/', component: Login, layout: AuthLayout },
    { path:'*', component: NotFound },
    { path:'/dashboard', component: DashBoard },
    { path:'/profile', component: Profile },
    { path:'/manage/users', component: Users },
    { path:'/manage/categories', component: Categories },
    { path:'/manage/subCategories', component: SubCategories },
    { path:'/manage/providers', component: Providers },
    { path:'/manage/products', component: Products },
    { path:'/manage/promotions', component: Promotions },
    { path:'/manage/inventory', component: Inventory },
    { path:'/manage/invoices', component: Invoices },
    { path:'/manage/orders', component: Orders }
]

const privateRoutes = [
    { path:'/profile', component: Profile }

]


export { publicRoutes, privateRoutes }