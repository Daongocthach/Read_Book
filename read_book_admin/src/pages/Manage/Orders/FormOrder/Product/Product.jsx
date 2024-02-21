import { Box, Typography } from '@mui/material'
import { formatCurrency } from '../../../../../../../ecommerce_website_client/src/utils/price'

function Product({ product, quantity }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4, gap: 1 }}>
            <img src={product?.image} alt='omachi'
                style={{ objectFit: 'cover', borderRadius: '5px', height: '70px', with: '70px' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                <Typography variant='h7' fontWeight={'bold'}>{product?.name}</Typography>
                <Typography variant='h7' color={'red'} fontWeight={'bold'}>{formatCurrency(product?.price)}</Typography>
                <Typography variant='h7' fontWeight={'bold'} color={'gray'} >Số lượng: {quantity}</Typography>
            </Box>
        </Box>
    )
}

export default Product