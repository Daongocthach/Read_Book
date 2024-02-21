import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { Create } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import subCategoryApi from '../../../../apis/subCategoryApi'
import { updateSubCategory } from '../../../../redux/actions/subCategories'

function UpdateCategory({ setUpdate, subCategory }) {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.categories)
  const [name, setName] = useState()
  const [select, setSelect] = useState()
  const [enabled, setEnabled] = useState()
  const [open, setOpen] = useState(false)
  const handleChange = (event) => {
    setSelect(event.target.value)
  }
  const handleClickOpen = () => {
    setOpen(true)
    setName(subCategory?.name)
    setSelect(subCategory?.category?.id)
    setEnabled(subCategory?.enabled)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleUpdate = () => {
    subCategoryApi.updateSubCategory(subCategory?.id, name, select, enabled)
      .then((response) => {
        alert('Update Success')
        setUpdate(response.data.id)
        dispatch(updateSubCategory(response.data))
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
        <DialogTitle>Update SubCategory</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '350px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Name: </Typography>
              <TextField fullWidth size='small' value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography minWidth={'100px'}>Category: </Typography>
              <FormControl size={'small'} fullWidth>
                <Select value={select} onChange={handleChange}>
                  {Array.isArray(categories) && categories?.map((category, index) => {
                    return (
                      <MenuItem key={index} value={category?.id}>{category?.name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
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