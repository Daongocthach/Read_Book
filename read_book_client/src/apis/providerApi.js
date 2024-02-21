import axios from 'axios'
const providerApi = {
    getAllEnabledProviders() {
        const url = 'http://localhost:8080/api/v1/providers-enabled'
        return axios.get(url)
    },
    getProviderById(id) {
        const url = `http://localhost:8080/api/v1/provider/${id}`
        return axios.get(url)
    }
}
export default providerApi