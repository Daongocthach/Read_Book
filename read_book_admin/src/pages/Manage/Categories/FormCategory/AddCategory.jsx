import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import AddCircle from '@mui/icons-material/AddCircle'
import categoryApi from '../../../../apis/categoryApi'
import { addCategory } from '../../../../redux/actions/categories'

function AddCategory({ setUpdate }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickAdd = () => {
        categoryApi.addCategory(name)
        .then((response) => {
            alert('Add Success')
            dispatch(addCategory(response.data))
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
                New Category
            </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle >Add New Category</DialogTitle>
                <DialogContent >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography minWidth={'100px'}>Name: </Typography>
                            <TextField fullWidth size='small' label="Name" onChange={(e) => setName(e.target.value)} />
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
export default AddCategory