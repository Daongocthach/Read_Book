import { Box, Typography, Table, TableBody, TableCell, TableHead, Paper, TableRow, TableFooter, TablePagination, TableContainer, FormControl, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import AddPromotion from './FormPromotion/AddPromotion'
import UpdatePromotion from './FormPromotion/UpdatePromotion'
import DeletePromotion from './FormPromotion/DeletePromotion'
import SearchPromotion from './SearchPromotion/SearchPromotion'
import { sortByMaxId, sortByMinId } from '../../../utils/sort'
import promotionApi from '../../../apis/promotionApi'

function Promotions() {
  const [promotions, setPromotions] = useState([])
  const [update, setUpdate] = useState(0)
  const [select, setSelect] = useState(1)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

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
    promotionApi.getAllPromotions()
      .then(response => {
        setPromotions(sortByMaxId(response.data))
      })
      .catch(error => {
        console.error(error)
      })
  }, [update])
  useEffect(() => {
    switch (select) {
      case 1:
        setPromotions(sortByMaxId(promotions))
        break
      case 2:
        setPromotions(sortByMinId(promotions))
        break
      default:
        break
    }
  }, [select])
  return (
    <Box sx={{ m: 5 }}>
      <Typography variant='h7' >Trang chủ / Quản lý khuyến mãi</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <AddPromotion setUpdate={setUpdate} />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <SearchPromotion setPromotions={setPromotions}/>
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
        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Code</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Value</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">DateStart</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">DateEnd</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Quantity</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Update</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(promotions) && promotions?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((promotion, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{promotion?.id}</TableCell>
                    <TableCell align="center">{promotion?.code}</TableCell>
                    <TableCell align="center">{promotion?.value}</TableCell>
                    <TableCell align="center">{format(new Date(promotion?.startDate), 'yyyy-MM-dd')}</TableCell>
                    <TableCell align="center">{format(new Date(promotion?.endDate), 'yyyy-MM-dd')}</TableCell>
                    <TableCell align="center">{promotion?.quantity}</TableCell>
                    <TableCell align="center"><UpdatePromotion setUpdate={setUpdate} promotion={promotion} /></TableCell>
                    <TableCell align="center"><DeletePromotion setUpdate={setUpdate} promotionId={promotion?.id} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow >
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[5, 10, { value: promotions?.length, label: 'All' }]}
                  count={Array.isArray(promotions) ? promotions?.length : 0}
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

export default Promotions