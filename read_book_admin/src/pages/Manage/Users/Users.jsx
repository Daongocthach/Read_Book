import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, TableFooter, TablePagination, FormControl, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import SearchUser from './SearchUser/SearchUser'
import userApi from '../../../apis/userApi'
import { sortByMaxId, sortByMinId } from '../../../utils/sort'

function Users() {
  const [users, setUsers] = useState([])
  const [update, setUpdate] = useState()
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
  const handleUpdateStatus = (id, enabled) => {
    userApi.updateStatus(id, enabled)
      .then(() => {
        alert('Update Success')
      })
      .catch(() => alert('Update Fail'))
      setUpdate(enabled)
  }
  useEffect(() => {
    userApi.getAllCustomers()
      .then(response => {
        setUsers(sortByMaxId(response.data))
      })
      .catch(error => {
        console.error(error)
      })
  }, [update])

  useEffect(() => {
    switch (select) {
      case 1:
        setUsers(sortByMaxId(users))
        break
      case 2:
        setUsers(sortByMinId(users))
        break
      default:
        break
    }
  }, [select])

  return (
    <Box sx={{ m: 5 }}>
      <Typography variant='h7' >Trang chủ / Quản lý tài khoản khách hàng</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
          <SearchUser setUsers={setUsers} />
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
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Fullname</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Phone</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Avatar</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(users) && users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{user?.id}</TableCell>
                    <TableCell align="center">{user?.fullName}</TableCell>
                    <TableCell align="center">{user?.username}</TableCell>
                    <TableCell align="center">{user?.email}</TableCell>
                    <TableCell align="center">{user?.phoneNo}</TableCell>
                    <TableCell align="center">{user?.address}</TableCell>
                    <TableCell align="center"><img src={user?.avatar} alt='avatar' width={'50px'} height={'50px'} /></TableCell>
                    <TableCell align="center">
                      <FormControl size={'small'} fullWidth>
                        <Select value={user?.enabled} onChange={(e) => handleUpdateStatus(user?.id, e.target.value)} >
                          <MenuItem value={true}>Enable</MenuItem>
                          <MenuItem value={false}>Disable</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={12}
                  rowsPerPageOptions={[5, 10, { value: users?.length, label: 'All' }]}
                  count={Array.isArray(users) ? users.length : 0}
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

export default Users
