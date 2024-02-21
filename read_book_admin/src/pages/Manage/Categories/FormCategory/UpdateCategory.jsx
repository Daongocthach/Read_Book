import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { Create } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import categoryApi from '../../../../apis/categoryApi'
import { updateCategory } from '../../../../redux/actions/categories'

function UpdateCategory({ setUpdate, category }) {
  const dispatch = useDispatch()
  const [name, setName] = useState()
  const [enabled, setEnabled] = useState()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
    setName(category?.name)
    setEnabled(category?.enabled)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleUpdate = () => {
    categoryApi.updateCategory(category?.id, name, enabled)
    .then((response) => {
        alert('Update Success')
        setUpdate(response.data.id)
        dispatch(updateCategory(response.data))
    })
    .catch(error => {
        console.log(error)
        alert('Update Fail')
    })
    handleClose()
  }
  return (
    <div>
      <Button sx={{ bgcolor: 'orange', color: 'black' }} variant="outlined" onClick={handleClickOpen}><Create /></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Name: </Typography>
              <TextField fullWidth size='small' value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Status: </Typography>
              <FormControl size={'small'} fullWidth>
                <Select value={enabled} onChange={(e) => setEnabled(e.target.value)} >
                    <MenuItem value={true}>Enable</MenuItem>
                    <MenuItem value={false}>Disable</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default UpdateCategory