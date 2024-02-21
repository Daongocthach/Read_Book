import { Button, Typography, Tooltip, CardActions, CardMedia, CardContent, Card as MuiCard } from '@mui/material'
import { Help, Visibility, ShoppingCart } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { formatCurrency } from '../../../../../../../utils/price'
import cartItemApi from '../../../../../../../apis/cartItemApi'
import { addToCart, updateQuantity } from '../../../../../../../redux/actions/cart'

const color = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')

function Product({ product }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const cartItems = useSelector(state => state.cart.cartItems)

  const navigate = useNavigate()
  function handleClickAddToCart() {
    if (user && product && cartItems) {
      var update = false
      var quantity = 1
      cartItems.forEach(cartItem => {
        if (cartItem.product.id == product.id) {
          update = true
          quantity = cartItem.quantity + 1
        }
      })
      const cartItem = {
        'id': {
          'customerId': user.id,
          'productId': product.id
        },
        'customer': {
          'id': user.id
        },
        'product': {
          'id': product.id
        },
        'quantity': quantity
      }
      if (update) {
        cartItemApi.updateCartItem(cartItem)
          .then(response => {
            alert('Cập nhật số lượng sản phẩm')
            dispatch(updateQuantity(response.data))
          })
          .catch(err => {
            console.log(err)
          })
      }
      else {
        cartItemApi.addCartItem(cartItem)
          .then(response => {
            alert('Thêm vào giỏ hàng thành công')
            dispatch(addToCart(response.data))
          })
          .catch(error => {
            console.error('Lỗi khi thêm vào giỏ hàng:', error)
          })
      }
    } else {
      console.error('User hoặc Product không tồn tại.')
    }
  }
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : 'white'),
        borderRadius: '10px',
        height: '280px',
        width: '220px',
        p: 0.5
      }}>
      {product?.image &&
        <Link to={`/product-detail?${product?.id}`}>
          <CardMedia sx={{ height: '150px', borderRadius: '6px', objectFit: 'contain' }}
            image={product?.image} />
        </Link>
      }
      <CardContent sx={{ p: 0 }}>
        <Typography variant='body1' sx={{ fontWeight: 'bold', height: '50px' }}>
          {product?.name}
        </Typography>
        <Typography variant='body1' fontWeight={'bold'} color={'red'}>
          {formatCurrency(product?.price)}
        </Typography>
      </CardContent>

      <CardActions>
        <Tooltip title="View"><Button size="small" startIcon={<Visibility />} sx={{ color: 'red' }} onClick={() => { navigate(`/product-detail?${product?.id}`) }}></Button></Tooltip>
        <Tooltip title="Add To Cart"><Button size="small" startIcon={<ShoppingCart />} sx={{ color: color }} onClick={handleClickAddToCart}></Button></Tooltip>
        <Tooltip title="Help"><Button size="small" startIcon={<Help />} sx={{ color: color }}></Button></Tooltip>
      </CardActions>

    </MuiCard>
  )
}

export default Product