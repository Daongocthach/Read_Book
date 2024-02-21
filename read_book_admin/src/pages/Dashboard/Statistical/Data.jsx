import { Grid, Chip } from '@mui/material'
import { Filter9Plus, Reorder, Money, Category, AddHomeWork, People } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import orderApi from '../../../apis/orderApi'
import productApi from '../../../apis/productApi'
import providerApi from '../../../apis/providerApi'
import subCategoryApi from '../../../apis/subCategoryApi'
import categoryApi from '../../../apis/categoryApi'
import userApi from '../../../apis/userApi'
import { listOrders } from '../../../redux/actions/orders'
import { listCategories } from '../../../redux/actions/categories'
import { listSubCategories } from '../../../redux/actions/subCategories'
import { listProviders } from '../../../redux/actions/providers'
import { listProducts } from '../../../redux/actions/products'
import { listUsers } from '../../../redux/actions/users'
import { listPromotions } from '../../../redux/actions/promotions'
import promotionApi from '../../../apis/promotionApi'

function Data() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [providers, setProviders] = useState([])
    const [promotions, setPromotions] = useState([])
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    useEffect(() => {
        orderApi.getAllOrders()
            .then(response => {
                setOrders(response.data)
                dispatch(listOrders(response.data))
            })
            .catch(error => {
                console.error(error)
            })
        productApi.getAllProducts()
            .then(response => {
                setProducts(response.data)
                dispatch(listProducts(response.data))
            })
            .catch(error => {
                console.error(error)
            })
        providerApi.getAllProviders()
            .then(response => {
                setProviders(response.data)
                dispatch(listProviders(response.data))
            })
            .catch(error => {
                console.error(error)
            })
        categoryApi.getAllCategories()
            .then(response => {
                setCategories(response.data)
                dispatch(listCategories(response.data))
            })
            .catch(error => {
                console.error(error)
            })
        subCategoryApi.getAllSubCategories()
            .then(response => {
                setSubCategories(response.data)
                dispatch(listSubCategories(response.data))
            })
            .catch(error => {
                console.error(error)
            })
        userApi.getAllCustomers()
            .then(response => {
                setUsers(response.data)
                dispatch(listUsers(response.data))
            })
            .catch(error => {
                console.error(error)
            })
        promotionApi.getAllPromotions()
            .then(response => {
                setPromotions(response.data)
                dispatch(listPromotions(response.data))
            })
            .catch(error => {
                console.error(error)
            })
    }, [])
    return (
        <Grid container spacing={1} mt={2} ml={5}>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Reorder />} label={'Đơn hàng: ' + orders.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Filter9Plus />} label={'Sản phẩm: ' + products.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<AddHomeWork />} label={'Nhà cung cấp: ' + providers.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Category />} label={'Danh mục: ' + categories.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Category />} label={'Danh mục con: ' + subCategories.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<People />} label={'Khách hàng' + users.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Money />} label={'Khuyến mãi: ' + promotions.length} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
                <Chip icon={<Money />} label={'Doanh thu: ' + promotions.length} />
            </Grid>
        </Grid>
    )
}

export default Data