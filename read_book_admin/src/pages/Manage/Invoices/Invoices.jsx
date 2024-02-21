import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableFooter, TablePagination, TableContainer, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DownloadForOffline, ReceiptLong } from '@mui/icons-material'

function createData(id, user, total, start, end, status) {
  return { id, user, total, start, end, status }
}
const invoices = [
  createData(1, 'Frozen yoghurt', '12345', 6.0, 24, 4.0),
  createData(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9)
]

function Invoices() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(3)

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <Box sx={{ m: 5 }}>
      <Typography variant='h7' >Trang chủ / Xem hóa đơn</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <ReceiptLong />
        <Typography variant='h6' fontWeight={'bold'}>Invoice List</Typography>
        <DownloadForOffline/>
      </Box>
      <Box sx={{ height: 'fit-content', bgcolor: 'white', boxShadow: '0px 0px 10px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">User</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Start</TableCell>
                <TableCell align="center">End</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{invoice?.id}</TableCell>
                    <TableCell align="center">{invoice?.user}</TableCell>
                    <TableCell align="center">{invoice?.total}</TableCell>
                    <TableCell align="center">{invoice?.start}</TableCell>
                    <TableCell align="center">{invoice?.end}</TableCell>
                    <TableCell align="center">{invoice?.status}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[6, 10]}
                  count={invoices?.length}
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

export default Invoices