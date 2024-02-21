import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import AddCircle from '@mui/icons-material/AddCircle'
import providerApi from '../../../../apis/providerApi'
import { addProvider } from '../../../../redux/actions/providers'

function AddProvider({ setUpdate }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = () => {
        providerApi.addProvider(name, brand, phone, address)
        .then((response) => {
            alert('Add Success')
            dispatch(addProvider(response.data))
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
                New Provider
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Add New Provider</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>Name: </Typography>
                            <TextField fullWidth size='small' onChange={(e) => setName(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>Brand: </Typography>
                            <TextField fullWidth size='small' onChange={(e) => setBrand(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>PhoneNo: </Typography>
                            <TextField fullWidth size='small' onChange={(e) => setPhone(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>Address: </Typography>
                            <TextField fullWidth size='small' onChange={(e) => setAddress(e.target.value)} />
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
export default AddProvider