import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, Paper, TablePagination, TableContainer, FormControl, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddSubCategory from './FormSubCategory/AddSubCategory'
import UpdateSubCategory from './FormSubCategory/UpdateSubCategory'
import DeleteSubCategory from './FormSubCategory/DeleteSubCategory'
import { sortByMaxId, sortByMinId } from '../../../utils/sort'
import SearchSubCategory from './SearchSubCategory/SearchSubCategory'

function SubCategories() {
  const [update, setUpdate] = useState(0)
  var subCategoriesRedux = useSelector(state => state.subCategories.subCategories)
  const [subCategories, setSubCategories] = useState(sortByMaxId(subCategoriesRedux))
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [select, setSelect] = useState(1)

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleChange = (event) => {
    setSelect(event.target.value)
  }
  useEffect(() => {
    setSubCategories(sortByMaxId(subCategoriesRedux))
    setUpdate(0)
  }, [update])
  useEffect(() => {
    switch (select) {
      case 1:
        setSubCategories(sortByMaxId(subCategories))
        break
      case 2:
        setSubCategories(sortByMinId(subCategories))
        break
      default:
        break
    }
  }, [select])
  return (
    <Box sx={{ m: 5 }}>
      <Typography variant='h7' >Trang chủ / Quản lý loại sản phẩm</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <AddSubCategory setUpdate={setUpdate} />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <SearchSubCategory setSubCategories={setSubCategories} />
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange} >
              <MenuItem value={1}>Mới nhất</MenuItem>
              <MenuItem value={2}>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Update</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(subCategories) && subCategories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((subCategory, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{subCategory?.id}</TableCell>
                    <TableCell align="center">{subCategory?.name}</TableCell>
                    <TableCell align="center">{subCategory?.category?.name}</TableCell>
                    <TableCell align="center">{subCategory?.enabled == 1 ? 'Enable' : 'Disable'}</TableCell>
                    <TableCell align="center"><UpdateSubCategory setUpdate={setUpdate} subCategory={subCategory} /></TableCell>
                    {subCategory.enabled == 1 && <TableCell align="center"><DeleteSubCategory setUpdate={setUpdate} subCategoryId={subCategory?.id} /></TableCell>}
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[5, 10, { value: subCategories?.length, label: 'All' }]}
                  count={Array.isArray(subCategories) ? subCategories?.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default SubCategories