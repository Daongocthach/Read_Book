import { useEffect, useState } from 'react'
import { FiberManualRecord, KeyboardArrowDown } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Menu, MenuItem, Chip, Typography } from '@mui/material'
import subCategoryApi from '../../../apis/subCategory'
import { setSubCategory } from '../../../redux/actions/subCategory'

export default function MenuCategory({ category }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [subCategories, setSubCategories] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickItem = (subCategory) => {
    dispatch(setSubCategory(subCategory))
    navigate(`/genre-detail?${1}`)
  }

  useEffect(() => {
    subCategoryApi.getSubCategoriesByCateId(category?.id)
      .then(response => {
        setSubCategories(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  return (
    <div>
      <Button onClick={handleClick} endIcon={<KeyboardArrowDown />} sx={{ minWidth: '210px', color: 'inherit' }}>
        <Typography variant='body1' sx={{ fontSize: '12px', fontWeight: 'bold' }}>{category?.name}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {subCategories?.map((subCategory) => (
          <MenuItem key={subCategory.id} onClick={() => handleClickItem(subCategory)}>{subCategory.name}</MenuItem>
        ))}
      </Menu>
    </div>
  )
}