import { Box, TextField, Typography, Menu, MenuItem, Slider, Button } from '@mui/material'
import { useState } from 'react'
import { formatCurrency } from '../../../utils/price'
import { sortByMaxIdAndPriceRange } from '../../../utils/price'

function FilterByPrice({ products, setProducts }) {
    const [minPrice, setMinPrice] = useState(1000)
    const [maxPrice, setMaxPrice] = useState(1000000)
    const [value, setValue] = useState([1, 1000])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue)
        setMinPrice(newValue[0] * 1000)
        setMaxPrice(newValue[1] * 1000)
    }
    // useEffect(() => {
    //     setProducts(sortByMaxIdAndPriceRange(products, minPrice, maxPrice))
    //   }, [minPrice, maxPrice])
    return (
        <>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem >
                    <Box sx={{ width: 500, height: 100 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <TextField value={formatCurrency(minPrice)} InputProps={{ readOnly: true }} />
                            ---
                            <TextField value={formatCurrency(maxPrice)} InputProps={{ readOnly: true }} />
                        </Box>
                        <Slider value={value} onChange={handleChange} min={1} max={1000} />
                    </Box>
                </MenuItem>
            </Menu>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                <Typography variant='body1' fontWeight={'bold'} minWidth={'70px'}>Chọn giá</Typography>
                <TextField onClick={handleClick} sx={{ minWidth: '250px' }} size='small' value={'Từ ' + formatCurrency(minPrice) + ' - ' + formatCurrency(maxPrice)} />
                <Button onClick={() => { setProducts(sortByMaxIdAndPriceRange(products, minPrice, maxPrice)) }}>abc</Button>

            </Box>
        </>
    )
}

export default FilterByPrice