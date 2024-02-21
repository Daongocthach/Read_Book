import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, Paper, TablePagination, TableContainer, FormControl, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Search from '../../../components/Search/Search'


function createData(productId, productName, phone, address) {
  return { productId, productName, phone, address }
}
const products = [
  createData(1, 'Frozen yoghurt', '12345', 6.0),
  createData(2, 'Ice cream sandwich', 237, 3),
  createData(3, 'Eclair', 262, 3),
  createData(4, 'Cupcake', 305, 3),
  createData(5, 'Gingerbread', 356, 3)
]

function Inventory() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const [select, setSelect] = useState(1)
  const handleChange = () => {

  }
  return ( <Box sx={{ m: 5 }}>
      <Typography variant='h7' >Trang chủ / Quản lý kho hàng</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <Search />
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange} defaultValue={1} >
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
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Update</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((iventory, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{iventory?.id}</TableCell>
                    <TableCell align="center">{iventory?.name}</TableCell>
                    <TableCell align="center">{iventory?.phone}</TableCell>
                    <TableCell align="center">{iventory?.address}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[6, 10]}
                  count={products?.length}
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

export default Inventory