import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination, Paper, TableContainer, FormControl, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddProduct from './FormProduct/AddProduct'
import UpdateProduct from './FormProduct/UpdateProduct'
import DeleteProduct from './FormProduct/DeleteProduct'
import SearchProduct from './SearchProduct/SearchProduct'
import { sortByMaxId, sortByMinId } from '../../../utils/sort'

function Products() {
  const [update, setUpdate] = useState(0)
  var productsRedux = useSelector(state => state.products.products)
  const [products, setProducts] = useState(sortByMaxId(productsRedux))
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
    setProducts(sortByMaxId(productsRedux))
    setUpdate(0)
  }, [update])
  useEffect(() => {
    switch (select) {
      case 1:
        setProducts(sortByMaxId(products))
        break
      case 2:
        setProducts(sortByMinId(products))
        break
      default:
        break
    }
  }, [select])
  return (
    <Box sx={{ m: 5 }}>
      <Typography variant='h7' >Trang chủ / Quản lý sản phẩm</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <AddProduct setUpdate={setUpdate}/>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <SearchProduct setProducts={setProducts} />
          <Typography variant='body1' fontWeight={'bold'} >Sắp xếp</Typography>
          <FormControl size={'small'} sx={{ m: 1, minWidth: 120 }}>
            <Select value={select} onChange={handleChange} >
              <MenuItem value={1}>Mới nhất</MenuItem>
              <MenuItem value={2}>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px  ' }}>
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Discount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">SubCategory</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Provider</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Image</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Update</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(products) && products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{product?.id}</TableCell>
                    <TableCell align="center">{product?.name}</TableCell>
                    <TableCell align="center">{product?.price}</TableCell>
                    <TableCell align="center">{product?.description}</TableCell>
                    <TableCell align="center">{product?.discount}</TableCell>
                    <TableCell align="center">{product?.subCategory?.name}</TableCell>
                    <TableCell align="center">{product?.provider?.name}</TableCell>
                    <TableCell align="center">{<img src={product?.image} alt='avatar' width={'50px'} height={'50px'} />}</TableCell>
                    <TableCell align="center">{product?.enabled == 1 ? 'Enable': 'Disable'}</TableCell>
                    <TableCell align="center"><UpdateProduct setUpdate={setUpdate} product={product} /></TableCell>
                    {product.enabled == 1 && <TableCell align="center"><DeleteProduct setUpdate={setUpdate} productId={product?.id} /></TableCell>}
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[5, 10, { value: products?.length, label: 'All' }]}
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

export default Products