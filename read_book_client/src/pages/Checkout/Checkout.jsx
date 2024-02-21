import { Container, Grid, Typography, Button, Box, Input, Radio, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/price'
import imgMomo from '../../assets/img/imgMomo.png'
import Product from './Product/Product'
import orderApi from '../../apis/orderApi'
import promotionApi from '../../apis/promotionApi'
import { getCurrentTime } from '../../utils/date'
import { useEffect, useState } from 'react'
import useStyles from './useStyles'
import ghnApi from '../../apis/ghnApi'

function Checkout() {
  const [code, setCode] = useState('')
  const [voucher, setVoucher] = useState()
  const [feeShip, setFeeShip] = useState(0)
  const cart = useSelector(state => state.cart)
  var valueVoucher = voucher?.value || 0
  var total = cart?.total ? cart.total + feeShip - valueVoucher : 0
  const cartItems = cart.cartItems
  const user = useSelector(state => state.auth)
  const navigate = useNavigate()

  function handleClickPromotion() {
    promotionApi.checkPromotion(code)
      .then(response => {
        setVoucher(response.data)
        total = total - response.data
        alert('Thêm voucher thành công')
      })
      .catch(err => {
        console.log(err)
        alert('Thêm voucher thất bại')
      })
  }
  function handleClickOrder() {
    if (user) {
      const currentTimeString = getCurrentTime()
      const orderItems = cartItems.map(cartItem => ({
        product: {
          id: cartItem.product.id,
          price: cartItem.product.price
        },
        quantity: cartItem.quantity
      }))
      const order = {
        'createdDate': currentTimeString,
        'orderStatus': 'PENDING',
        'customer': {
          'id': user?.id
        },
        'orderItems': orderItems
      }
      orderApi.addOrder(order)
        .then(() => {
          if (voucher) {
            promotionApi.usePromotion(voucher?.id)
          }
          alert('Đặt hàng thành công')
          navigate(`/thanks?${cartItems.length}`)
        })
        .catch(error => {
          console.error('Lỗi khi đặt hàng:', error)
          navigate('/cart')
        })
    } else {
      alert('Vui lòng đăng nhập!')
      navigate('/login')
    }
  }
  useEffect(() => {
    if (user)
      ghnApi.calculateFeeShip(user.districtId)
        .then((response) => {
          setFeeShip(response.data.data.total)
        })
        .catch(err => {
          console.log(err)
        })
  }, [])
  return (
    <Container maxWidth="lg" sx={{ mb: 2 }}>
      <Grid container spacing={3} mt={2}>
        {/* Phần thông tin đơn hàng */}
        <Grid item xs={12} sm={6} md={6} lg={8}>
          <Typography variant="body1" mb={2}>Trang chủ / Checkout</Typography>
          <Typography variant='h5'>Thông tin người nhận</Typography>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={useStyles.titleAddress}>Họ và tên:</Typography>
            <Input sx={{ minWidth: '200px', width: '500px' }} value={user?.fullName} />
          </Box>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={useStyles.titleAddress}>Phone:</Typography>
            <Input sx={{ minWidth: '200px', width: '500px' }} value={user?.phoneNo} />
          </Box>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={useStyles.titleAddress}>Địa chỉ:</Typography>
            <Input sx={{ minWidth: '200px', width: '500px' }} value={user?.address + ', ' + user?.ward + ', ' + user?.district + ', Tỉnh ' + user?.province} />
          </Box>
          <Button sx={useStyles.button} onClick={() => { navigate('/account') }}>Chỉnh sửa thông tin</Button>
          <Typography variant="h5" mt={2}>Thông tin đơn hàng</Typography>
          {Array.isArray(cartItems) && cartItems.map((cartItem, index) =>
            <Product key={index} product={cartItem.product} quantity={cartItem.quantity} />)}
        </Grid>

        {/* Phần tổng cộng và thanh toán */}
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Box sx={{ ...useStyles.flexBoxPrice, alignItems: 'center' }}>
            <Typography variant='h8' >Mã khuyến mãi: </Typography>
            <TextField value={code} size='small' sx={{ width: '150px' }} onChange={(e) => { setCode(e.target.value) }}></TextField>
            <Button sx={useStyles.buttonVoucher} onClick={handleClickPromotion}>Nhập</Button>
          </Box>
          <Box sx={{ ...useStyles.flexBoxPrice, borderTop: '1px solid gray' }}>
            <Typography variant='h5' >Tổng tiền: </Typography>
            <Typography variant='h7' sx={{ color: 'red', fontWeight: 'bold' }}>{formatCurrency(total)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='h7' >Tiền hàng: </Typography>
            <Typography variant='h7' >{formatCurrency(cart?.total)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='h7' >Phí vận chuyển: </Typography>
            <Typography variant='h7' >{formatCurrency(feeShip)}</Typography>
          </Box>
          <Box sx={useStyles.flexBoxPrice}>
            <Typography variant='h7' >Giảm giá khuyến mãi: </Typography>
            <Typography variant='h7' >{formatCurrency(0)}</Typography>
          </Box>
          {voucher && <Box sx={{ ...useStyles.flexBoxPrice, borderBottom: '1px solid gray' }}>
            <Typography variant='h7' >Giảm giá voucher: </Typography>
            <Typography variant='h7' >{formatCurrency(voucher?.value)}</Typography>
          </Box>}
          <Typography variant='h5' sx={{ mt: 3 }}>Phương thức thanh toán</Typography>
          <Box sx={useStyles.flexBox}>
            <Radio sx={useStyles.radio} checked={true} />
            <Typography variant='h7'>Thanh toán khi nhận hàng</Typography>
          </Box>
          <Box sx={useStyles.flexBox}>
            <Radio sx={useStyles.radio} />
            <Typography variant='h7' >Thanh toán bằng momo</Typography>
            <img src={imgMomo} alt='thanh toan momo' style={{ height: '30px', width: '30px' }} />
          </Box>
          <Button sx={useStyles.button} onClick={handleClickOrder}> Hoàn tất đặt hàng </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Checkout
