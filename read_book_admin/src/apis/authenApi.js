import axios from 'axios'
const authenApi = {
    adminSignin(username, password) {
        const url = 'http://localhost:8080/api/v1/admin/signin'
        return axios.get(url, { params: { username, password } })
    }
}

export default authenApi