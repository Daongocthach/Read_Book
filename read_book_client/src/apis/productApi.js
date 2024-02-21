import axios from 'axios'
const productApi = {
    getAllEnabledProducts() {
        const url = 'http://localhost:8080/api/v1/products-enabled'
        return axios.get(url)
    },
    getProductById(id) {
        const url = `http://localhost:8080/api/v1/product/${id}`
        return axios.get(url)
    },
    getProductsByProviderId(id) {
        const url = `http://localhost:8080/api/v1/products-provider/${id}`
        return axios.get(url)
    },
    getProductsBySubCategoryId(id) {
        const url = `http://localhost:8080/api/v1/products-subcategory/${id}`
        return axios.get(url)
    },
    getProductsByCategoryId(id) {
        const url = `http://localhost:8080/api/v1/products-category/${id}`
        return axios.get(url)
    }
}

export default productApi