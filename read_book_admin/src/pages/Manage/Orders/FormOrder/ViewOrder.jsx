import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, Box } from '@mui/material'
import { Visibility } from '@mui/icons-material'
import { format } from 'date-fns'
import Product from './Product/Product'
import { formatCurrency } from '../../../../../../ecommerce_website_client/src/utils/price'

function ViewOrder({ order }) {
  const orderItems = order?.orderItems
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <Button sx={{ bgcolor: '#EE6363', color: 'black' }} variant="outlined" onClick={handleClickOpen}><Visibility /></Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>View Order</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>UserName: </Typography>
              <TextField fullWidth size='small' value={order?.customer?.fullName} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Email: </Typography>
              <TextField fullWidth size='small' value={order?.customer?.email} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>PhoneNo: </Typography>
              <TextField fullWidth size='small' value={order?.customer?.phoneNo} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Address: </Typography>
              <TextField fullWidth size='small' value={order?.customer?.address} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>CreatedDate: </Typography>
              <TextField fullWidth size='small' value={format(new Date(order?.createdDate), 'yyyy-MM-dd')} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>OrderStatus: </Typography>
              <TextField fullWidth size='small' value={order?.orderStatus} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'} >Tổng tiền: </Typography>
              <Typography minWidth={'100px'} variant='h6'fontWeight={'bold'} color={'red'}>{formatCurrency(order?.total)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h5">Thông tin đơn hàng</Typography>
              {Array.isArray(orderItems) && orderItems.map((orderItem, index) =>
                <Product key={index} product={orderItem.product} quantity={orderItem.quantity} />)}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default ViewOrder