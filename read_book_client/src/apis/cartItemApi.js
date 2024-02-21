import axios from 'axios'

const cartItemApi = {
  getAllCartItems() {
    const url = 'http://localhost:8080/api/v1/cartitems'
    return axios.get(url)
  },
  getCartItemById(customerId, productId) {
    const url = `http://localhost:8080/api/v1/cartitem?customerId=${customerId}&productId=${productId}`
    return axios.get(url)
  },
  addCartItem(cartItem) {
    const url = 'http://localhost:8080/api/v1/add-cartitems'
    return axios.post(url, cartItem)
  },
  updateCartItem(cartItem) {
    const url = 'http://localhost:8080/api/v1/update-cartitems'
    return axios.put(url, cartItem)
  },
  deleteCartItem(customerId, productId) {
    const url = `http://localhost:8080/api/v1/delete-cartitem?customerId=${customerId}&productId=${productId}`
    return axios.delete(url)
  },
  deleteAllCartItemByCustomerId(customerId) {
    const url = `http://localhost:8080/api/v1/delete-cartitems-customer?customerId=${customerId}`
    return axios.delete(url)
  },
  getCartItemsByCustomerId(customerId) {
    const url = `http://localhost:8080/api/v1/cartitems-customer?customerId=${customerId}`
    return axios.get(url)
  }
}

export default cartItemApi
