import { Container, Grid, Typography, Box, FormControl, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Menu, Slider, TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Product from '../Dashboard/BoardContent/ListRow/Row/ListProduct/Product/Product'
import productApi from '../../apis/productApi'
import { sortByMaxId, sortByMaxPrice, sortByMinPrice, sortByMaxIdAndPriceRange } from '../../utils/price'
import { formatCurrency } from '../../utils/price'
import providerApi from '../../apis/providerApi'

function GenreDetail() {
  const subCategoryId = useSelector(state => state.subCategory.id)
  const [products, setProducts] = useState([])
  const [productsBySelect, setProductsBySelect] = useState([])
  const [providers, setProviders] = useState([])
  const [checked, setChecked] = useState([])
  const [select, setSelect] = useState(1)
  const [minPrice, setMinPrice] = useState(1000)
  const [maxPrice, setMaxPrice] = useState(1000000)
  const [value, setValue] = useState([1000, 1000000])
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleSelect = (event) => {
    setSelect(event.target.value)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
    setMinPrice(newValue[0])
    setMaxPrice(newValue[1])
  }
  const handleCheck = (id) => {
    setChecked(prev => {
      const isChecked = checked.includes(id)
      if (isChecked) {
        return checked.filter(item => item != id)
      }
      else {
        return [...prev, id]
      }
    })
  }
  useEffect(() => {
    if (subCategoryId == 0) {
      productApi.getAllEnabledProducts()
        .then(response => {
          setProducts(response.data)
          setProductsBySelect(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      productApi.getProductsBySubCategoryId(subCategoryId)
        .then(response => {
          setProducts(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
    providerApi.getAllEnabledProviders()
      .then(response => {
        setProviders(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [subCategoryId])
  useEffect(() => {
    switch (select) {
      case 1:
        setProducts(sortByMaxId(productsBySelect))
        break
      case 2:
        setProducts(sortByMinPrice(productsBySelect))
        break
      case 3:
        setProducts(sortByMaxPrice(productsBySelect))
        break
      default:
        break
    }
  }, [select])
  useEffect(() => {
    setProducts(sortByMaxIdAndPriceRange(products, minPrice, maxPrice))
  }, [minPrice, maxPrice])
  useEffect(() => {
    const productsByProviders = productsBySelect.filter(product => checked.includes(product.provider.id))
    setProducts(productsByProviders)
  }, [checked])
  return (
    <Container sx={{ mb: 2 }}>
      <Grid container mt={2} maxWidth='lg' spacing={1} >
        <Grid item xs={12} sm={12} md={2} lg={2} >
          <Typography variant="body1" mb={2} >Trang chủ / Sản phẩm</Typography>
          <Typography variant="h6" fontWeight={'bold'} >Thương hiệu</Typography>
          <FormGroup>
            {providers.map((provider, index) => (<FormControlLabel key={index} control={
              <Checkbox
                checked={checked.includes(provider.id)}
                onChange={() => handleCheck(provider.id)}
              />
            } label={provider?.brand} />))}
          </FormGroup>
        </Grid>
        <Grid mt={1} item container xs={12} sm={12} md={10} lg={10} >
          <Box sx={{}}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
              <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
              <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
                <Select value={select} onChange={handleSelect} >
                  <MenuItem value={1}>Mới nhất</MenuItem>
                  <MenuItem value={2}>Giá thấp</MenuItem>
                  <MenuItem value={3}>Giá cao</MenuItem>
                </Select>
              </FormControl>
              <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem >
                  <Box sx={{ width: 500, height: 100 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <TextField value={formatCurrency(minPrice)} InputProps={{ readOnly: true }} />
                      ---
                      <TextField value={formatCurrency(maxPrice)} InputProps={{ readOnly: true }} />
                    </Box>
                    <Slider value={value} onChange={handleChange} min={1000} max={1000000} />
                  </Box>
                </MenuItem>
              </Menu>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                <Typography variant='body1' fontWeight={'bold'} minWidth={'70px'}>Chọn giá</Typography>
                <TextField onClick={handleClick} sx={{ minWidth: '250px' }} size='small' value={'Từ ' + formatCurrency(minPrice) + ' - ' + formatCurrency(maxPrice)} />
              </Box>
            </Box>
            <Grid container spacing={1} >
              {products.map((product) => (
                <Grid key={product.id} item xs={12} sm={12} md={4} lg={3} >
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container >
  )
}

export default GenreDetail