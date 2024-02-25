import { useEffect, useState } from 'react'
import { Rating, Box, Typography, Button, Avatar, Breadcrumbs, Link, Grid, Stack } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import reviewApi from '../../apis/reviewApi'
import { mockData } from '../../apis/mockdata'

const listChapter = [
  'chap 1', 'chap 2', 'chap 3', 'chap 4', 'chap 5', 'chap 6', 'chap 7', 'chap 8'
]

function BookDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  // useEffect(() => {
  //   bookApi.getbookById(bookId)
  //     .then(response => {
  //       setbook(response.data)
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  //   reviewApi.getReviewBybook(bookId)
  //     .then(response => {
  //       setReviews(response.data)
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }, [bookId])
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
            <Typography color="text.primary">Thông tin sách</Typography>
          </Breadcrumbs>
          <Grid container maxWidth='lg' spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6} >
              <img src={book?.image} style={{ objectFit: 'contain', borderRadius: '15px', width: '100%', height: '100%' }} />
            </Grid>
            <Grid mt={1} item xs={12} sm={12} md={6} lg={6} >
              <Box gap={1} display={'flex'} flexDirection={'column'}>
                <Typography variant='h5' fontWeight={'bold'} >{book?.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant='body1' color={'blue'}>{'1583 Đánh giá'}</Typography>
                  <Rating name="size-medium" size='large' value={4.5} precision={0.1} />
                  <Typography variant='subtitle2'>Your Rating: 5</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <b>Thể loại: </b> <Typography variant='body1'>{book?.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <b>Tác giả: </b> <Typography variant='body1'>{book?.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <b>Trạng thái: </b> <Typography variant='body1'>{book?.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <b>Nguồn: </b> <Typography variant='body1'>Sưu tầm</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button sx={{ color: 'white', ':hover': { bgcolor: 'gray' }, bgcolor: '#EE3B3B' }} onClick={handleClickView}>Đọc từ đầu</Button>
                  <Button sx={{ bgcolor: '#1E90FF', color: 'white', ':hover': { bgcolor: 'gray' } }} onClick={handleClickAdd}>Thêm vào tủ</Button>
                </Box>
                <Typography variant='h5' fontWeight={'bold'} >Mô tả</Typography>
                <Typography variant='body1' sx={{ maxHeight: '5em', overflow: 'scroll' }}> {book?.description}
                  Sách Nói Online là trang web cung cấp các bộ sách nói tiếp nối tập 1 và 2 của Nguyên Phong, Liêu Trí Phong, Shunmyo Masuno, Liễu Thuật Quân, James Rickards, Mario Puzo, Donald J.Trump, Hồ Tiến Huân, Grant …
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mb: 2, mt: 2 }}>
            <Typography variant='h6' fontWeight={'bold'}>Danh sách các chương</Typography>
            <Box>
              <Stack spacing={{ xs: 4, sm: 7 }} direction="row" useFlexGap flexWrap="wrap">
                {
                  listChapter?.map((chap, index) => (
                    <Button key={index} display={'flex'} gap={2} color='inherit' onClick={() => navigate('/read-book')}>
                      <BookIcon sx={{ color: '#4F4F4F' }} />
                      <Typography variant='body1' >{chap}</Typography>
                    </Button>
                  ))
                }
              </Stack>
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
    </div>
  )
}

export default BookDetail