import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import cartItemApi from '../../../apis/cartItemApi'
import { removeFromCart } from '../../../redux/actions/cart'

function DeleteItem({ customerId, productId }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickDelete = () => {
        cartItemApi.deleteCartItem(customerId, productId)
            .then(response => {
                dispatch(removeFromCart(productId))
                alert('Delete success')
            })
            .catch(err => {
                console.log(err)
                alert('Delete fail')
            })
        handleClose()
    }
    return (
        <div>
            <Button onClick={handleClickOpen}><DeleteIcon sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }} />
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Are you sure you want to delete this item?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { handleClickDelete() }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteItem