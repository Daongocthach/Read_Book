import { useEffect, useState } from 'react'
import { Rating, Box, Typography, Button, Avatar, Breadcrumbs, Link, Grid, Divider } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import reviewApi from '../../apis/reviewApi'
import { mockData } from '../../apis/mockdata'



function ReadBook() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  var bookId = window.location.search.substring(1)
  const [book, setBook] = useState(mockData?.books[0])
  const [reviews, setReviews] = useState([])
  const [showMore, setShowMore] = useState(3)

  function handleShowMoreClick() {
    setShowMore(showMore + 3)
  }
  function handleClickView() {

  }
  function handleClickAdd() {

  }

  return (
    <div>
      <Box sx={{
        width: '100%', display: 'flex', justifyContent: 'center',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : '#E6E6FA')
      }}>
        <Box sx={{
          width: { xs: '95%', sm: '80%' }, height: '100%', overflow: 'hidden', mt: 2
        }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">Trang chủ</Link>
            <Link underline="hover" color="inherit" href="/genre-detail" >Danh sách</Link>
            <Link underline="hover" color="inherit" href="/book-detail" >Thông tin sách</Link>
            <Typography color="text.primary">Chương 1</Typography>
          </Breadcrumbs>
          <Box >
            <Box gap={1} display={'flex'} flexDirection={'column'} >
              <Typography variant='h5' fontWeight={'bold'} textAlign={'center'}>{book?.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Button sx={{ color: 'white', ':hover': { bgcolor: 'gray' }, bgcolor: '#1E90FF' }} onClick={handleClickView}>Chương trước</Button>
                <Button sx={{ bgcolor: '#1E90FF', color: 'white', ':hover': { bgcolor: 'gray' } }} onClick={handleClickAdd}>Danh sách</Button>
                <Button sx={{ bgcolor: '#1E90FF', color: 'white', ':hover': { bgcolor: 'gray' } }} onClick={handleClickAdd}>Chương tiếp</Button>
              </Box>
              <Divider />
              <Box>
                <Typography variant='subtitle1' fontSize={{ xs: 24, sm: 26, md: 28 }} fontFamily={'revert-layer'} letterSpacing={1} lineHeight={2}>
                  Ngày 24/2/2024, Cơ quan CSĐT Bộ Công an đã ban hành Kết luận điều tra bổ sung vụ án hình sự về tội “Thao túng thị trường chứng khoán”, “Lừa đảo chiếm đoạt tài sản”, “Lợi dụng chức vụ, quyền hạn trong khi thi hành công vụ” và “Cố ý công bố thông tin sai lệch hoặc che giấu thông tin trong hoạt động chứng khoán", xảy ra tại Công ty CP Tập đoàn FLC, Công ty CP Chứng khoán BOS, Công ty CP Xây dựng Faros, các công ty liên quan thuộc hệ sinh thái của Công ty CP Tập đoàn FLC, Sở Giao dịch chứng khoán TP Hồ Chí Minh, Vụ Giám sát công ty đại chúng thuộc Ủy ban Chứng khoán Nhà nước và Trung tâm Lưu ký chứng khoán Việt Nam, do Trịnh Văn Quyết, nguyên Chủ tịch HĐQT Công ty CP Tập đoàn FLC cùng đồng phạm và các cá nhân thuộc cơ quan quản lý Nhà nước về lĩnh vực chứng khoán thực hiện.

                  Bộ Công an thông báo kết quả điều tra, xử lý vụ án xảy ra tại Công ty CP Tập đoàn FLC
                  Cơ quan CSĐT Bộ Công an chuyển toàn bộ hồ sơ vụ án đến Viện Kiểm sát nhân dân Tối cao (Vụ 5) đề nghị truy tố 51 bị can theo quy định tại khoản 2 Điều 211, khoản 4 Điều 174, khoản 3 Điều 356 và khoản 2 Điều 209 Bộ luật Hình sự năm 2015.

                  Kết quả điều tra đến nay có đủ căn cứ xác định:

                  1. Đối với hành vi “Thao túng thị trường chứng khoán”

                  Trong thời gian từ ngày 26/5/2017 đến ngày 10/1/2022, Trịnh Văn Quyết chỉ đạo Trịnh Thị Minh Huế (em gái Quyết) cùng đồng phạm mượn danh nghĩa của nhân viên, người thân, họ hàng lập hồ sơ, thủ tục để Huế thành lập công ty, mở tài khoản chứng khoán, tài khoản ngân hàng để Huế quản lý, sử dụng thực hiện hành vi thao túng thị trường chứng khoán đối với 5 mã cổ phiếu AMD, HAI, GAB, FLC, ART. Khi giá cổ phiếu tăng, theo chỉ đạo của Quyết, Trịnh Thị Minh Huế bán cổ phiếu ra thị trường thu lợi bất chính 723.322.534.069 đồng.
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Button sx={{ color: 'white', ':hover': { bgcolor: 'gray' }, bgcolor: '#1E90FF' }} onClick={handleClickView}>Chương trước</Button>
                <Button sx={{ bgcolor: '#1E90FF', color: 'white', ':hover': { bgcolor: 'gray' } }} onClick={handleClickAdd}>Danh sách</Button>
                <Button sx={{ bgcolor: '#1E90FF', color: 'white', ':hover': { bgcolor: 'gray' } }} onClick={handleClickAdd}>Chương tiếp</Button>
              </Box>
            </Box>
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant='h5' fontWeight={'bold'}>Bình luận và đánh giá</Typography>
              {reviews?.slice(0, showMore).map((review, index) =>
                <Box key={index} sx={{ display: 'flex', borderRadius: 3, width: '100%', gap: 2, alignItems: 'center', mt: 3 }}>
                  <Avatar>{review?.customerId}</Avatar>
                  <Box sx={{}}>
                    <Typography variant='subtitle1'>User {review?.customerId}</Typography>
                    <Typography variant='body1'>{review?.comment}</Typography>
                  </Box>
                </Box>
              )}
              {reviews.length > showMore && (
                <Button onClick={handleShowMoreClick} sx={{ color: 'gray', '&:hover': { bgcolor: 'darkgray' } }}>Show More</Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default ReadBook