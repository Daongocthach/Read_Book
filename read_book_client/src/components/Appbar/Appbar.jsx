import { ShoppingCart, HelpOutline } from '@mui/icons-material'
import { Box, Button, Badge, Tooltip, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ModeSelect from './ModeSelect/ModeSelect'
import Account from './Account/Account'
import Search from './Search/Search'
import G2Logo from '../../assets/img/G2Logo.png'
import { setSubCategory } from '../../redux/actions/subCategory'

const useStyles = {
  button: {
    color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'), border: 'none', fontWeight: 'bold', '&:hover': { color: 'red' }
  }
}
const subCategory = {
  id: '0',
  name: ''
}

function AppBar() {
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()

  const onClickGenreDetail = () => {
    dispatch(setSubCategory(subCategory))
    navigate('/genre-detail')
  }
  useEffect(() => {
    setQuantity(cart?.cartItems.length)
  }, [cart])
  return (
    <Box sx={{
      position: 'static', width: '100%', height: (theme) => theme.webCustom.appBarHeight, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', border: 'none', overflow: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1C1C1C' : '#FFFAFA')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingX: 3 }}>
        <img src={G2Logo} style={{ height: '60px', width: '60px', color: 'black' }} />
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <Typography variant="h4" fontWeight="bold" color={(theme) => (theme.palette.mode === 'dark' ? 'white' : '#363636')}> G2Store</Typography>
        </Link>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button sx={useStyles.button} onClick={onClickGenreDetail}>Sản phẩm</Button>
          <Link to={'/promotion'}><Button sx={useStyles.button}>Khuyến mãi</Button></Link>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingX: 3 }}>
        <Search />
        <ModeSelect />
        <Tooltip title="Cart">
          <Badge color="warning" badgeContent={quantity} sx={{ cursor: 'pointer' }}>
            <ShoppingCart sx={useStyles.button} onClick={() => navigate('/cart')} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
          <HelpOutline sx={useStyles.button} />
        </Tooltip>
        <Account />
      </Box>
    </Box>
  )
}

export default AppBar