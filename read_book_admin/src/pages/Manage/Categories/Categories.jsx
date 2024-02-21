import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, Paper, TablePagination, TableContainer, FormControl, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddCategory from './FormCategory/AddCategory'
import UpdateCategory from './FormCategory/UpdateCategory'
import DeleteCategory from './FormCategory/DeleteCategory'
import SearchCategory from './SearchCategory/SearchCategory'
import { sortByMaxId, sortByMinId } from '../../../utils/sort'

function Categories() {
  const [update, setUpdate] = useState(0)
  var categoriesRedux = useSelector(state => state.categories.categories)
  const [categories, setCategories] = useState(sortByMaxId(categoriesRedux))
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
    setCategories(sortByMaxId(categoriesRedux))
    setUpdate(0)
  }, [update])
  useEffect(() => {
    switch (select) {
      case 1:
        setCategories(sortByMaxId(categories))
        break
      case 2:
        setCategories(sortByMinId(categories))
        break
      default:
        break
    }
  }, [select])
  return (
    <Box sx={{ m: 5 }}>
      <Typography variant='h7' >Trang chủ / Quản lý loại sản phẩm</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <AddCategory setUpdate={setUpdate}/>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <SearchCategory setCategories={setCategories}/>
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
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Update</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {Array.isArray(categories) && categories?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{category?.id}</TableCell>
                    <TableCell align="center">{category?.name}</TableCell>
                    <TableCell align="center">{category?.enabled == 1 ? 'Enable': 'Disable'}</TableCell>
                    <TableCell align="center"><UpdateCategory setUpdate={setUpdate} category={category} /></TableCell>
                    {category.enabled == 1 && <TableCell align="center"><DeleteCategory setUpdate={setUpdate} categoryId={category?.id} /></TableCell>}
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[5, 10, { value: categories?.length, label: 'All' }]}
                  count={Array.isArray(categories) ? categories?.length : 0}
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

export default Categories