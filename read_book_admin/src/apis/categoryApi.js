import axios from 'axios'
const categoryApi = {
    getAllCategories() {
        const url = 'http://localhost:8080/api/v1/admin/categories'
        return axios.get(url)
    },
    getCategoryById(id) {
        const url = `http://localhost:8080/api/v1/category/${id}`
        return axios.get(url)
    },
    addCategory(name) {
        const url = 'http://localhost:8080/api/v1/admin/add-category'
        return axios.post(url, { name })
    },
    updateCategory(id, name, enabled) {
        const url = 'http://localhost:8080/api/v1/admin/update-category'
        return axios.put(url, { id, name, enabled } )
    },
    deleteCategory(id) {
        const url = `http://localhost:8080/api/v1/admin/delete-category/${id}`
        return axios.put(url)
    }
}
export default categoryApi