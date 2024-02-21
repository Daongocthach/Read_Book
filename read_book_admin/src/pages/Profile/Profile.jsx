import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Typography, Input, Container } from '@mui/material'
import { PersonOutline } from '@mui/icons-material'

const useStyles = {
  flexBox: {
    display: 'flex', alignItems: 'center', gap: 3, mt: 1, mb: 1
  }
}
function Profile() {
  const user = useSelector(state => state.auth)
  const [fullName, setFullName] = useState(user?.fullName)
  const [phone, setPhone] = useState(user?.phoneNo)
  const onUpdate = () => {
  }

  return (
    <Container >
      <Typography variant='h7' >Trang Chủ / Profile</Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        <Box sx={{ ...useStyles.flexBox, mt: 6 }}>
          <Typography variant='h6' sx={useStyles.textContent}>Admin ID: {123456}</Typography>
          <PersonOutline sx={{ color: 'red' }} />
          <Typography variant='h8' sx={useStyles.textContent}>Thành viên từ tháng {5} năm {2021}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Email</Typography>
            <Input sx={{ minWidth: '500px' }} value={'thach752002@gmail.com'} />
          </Box>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Họ và Tên</Typography>
            <Input sx={{ minWidth: '500px' }} value={fullName} onChange={e => setFullName(e.target.value)} />
          </Box>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Điện thoại</Typography>
            <Input sx={{ minWidth: '500px' }} value={phone} onChange={e => setPhone(e.target.value)} />
          </Box>
          <Box sx={useStyles.flexBox}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Địa chỉ</Typography>
            <Input sx={{ minWidth: '500px' }} value={'TPHCM Thủ Đức'} />
          </Box>
        </Box>
        <Box sx={useStyles.flexBox}>
            <Button sx={{ color: 'white', width: '100px', height: '40px', ':hover': { bgcolor: '#666666' }, bgcolor: '#FF0000' }} onClick={() => onUpdate()}>Cập nhật</Button>
            {/* <Button sx={{ color: 'white', width: '100px', height: '40px', ':hover': { bgcolor: '#666666' }, bgcolor: '#EE9A00' }}>Cài Đặt</Button> */}
          </Box>
        <Box sx={useStyles.flexBox}>
          <Typography variant='h6' sx={{ minWidth: '250px', fontWeight: 'bold' }}>Thông tin gói dịch vụ</Typography>
          <Typography variant='h8' sx={{ fontWeight: 'bold', minWidth: '100px' }}>Miễn phí</Typography>
        </Box>
        <Box sx={useStyles.flexBox}>
          <Typography variant='h6' sx={{ minWidth: '250px', fontWeight: 'bold' }}>Bảo mật & Quyền riêng tư</Typography>
          <Typography variant='h8' sx={{ fontWeight: 'bold', minWidth: '100px' }} >Kiểm soát quyền truy cập vào tài khoản này</Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Profile