import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import AddCircle from '@mui/icons-material/AddCircle'
import promotionApi from '../../../../apis/promotionApi'
import { addPromotion } from '../../../../redux/actions/promotions'

function AddPromotion({ setUpdate }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [code, setCode] = useState('')
    const [value, setValue] = useState('')
    const [quantity, setQuantity] = useState('')
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = () => {
        promotionApi.addPromotion(startDate, endDate, code, value, quantity)
            .then((response) => {
                alert('Add Success')
                dispatch(addPromotion(response.data))
                setUpdate(response.data.id + 1)
            })
            .catch(error => {
                console.log(error)
                alert('Add Fail')
            })
        handleClose()
    }
    return (
        <div>
            <Button sx={{ fontWeight: 'bold' }} startIcon={<AddCircle />} variant="outlined" onClick={handleClickOpen}>
                New Promotion
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Add New Promotion</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>Code: </Typography>
                            <TextField fullWidth size='small' onChange={(e) => setCode(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>Value: </Typography>
                            <TextField fullWidth size='small' onChange={(e) => setValue(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>Quantity: </Typography>
                            <TextField fullWidth size='small' onChange={(e) => setQuantity(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>StartDate: </Typography>
                            <TextField fullWidth size='small' type='date' onChange={(e) => setStartDate(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>EndDate: </Typography>
                            <TextField fullWidth size='small' type='date' onChange={(e) => setEndDate(e.target.value)} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddPromotion