import axios from 'axios'
const subCategoryApi = {
    getAllEnabledSubCategories() {
        const url = 'http://localhost:8080/api/v1/sub-categories-enabled'
        return axios.get(url)
    },
    getSubCategoryById(id) {
        const url = `http://localhost:8080/api/v1/sub-category/${id}`
        return axios.get(url)
    },
    getSubCategoriesByCateId(id) {
        const url = `http://localhost:8080/api/v1/sub-categories/${id}`
        return axios.get(url)
    },
}

export default subCategoryApi