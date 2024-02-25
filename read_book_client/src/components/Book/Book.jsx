import { Button, Typography, Tooltip, CardActions, CardMedia, CardContent, Card as MuiCard } from '@mui/material'
import { AddCircleOutline, Visibility } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/price'

function Book({ book }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : '#E8E8E8'),
        borderRadius: '10px',
        height: '200px',
        width: { xs: '45vw', sm: '180px' },
        p: 0.5
      }}>
      {book?.image &&
        <Link to={`/book-detail?${book?.id}`}>
          <CardMedia sx={{ height: '140px', borderRadius: '6px', objectFit: 'contain' }}
            image={book?.image} />
        </Link>
      }
      <CardContent sx={{ p: 0 }}>
        <Typography variant='body1' sx={{ fontWeight: 'bold', fontSize: 13 }} noWrap >
          {book?.name} Nguời đưa thư lái đò qua sông hằng asg ags gsd ags Nguời đưa thư lái đò qua sông hằng
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 0, justifyContent: 'center' }}>
        <Tooltip title="Thêm vào tủ sách"><Button size="small" startIcon={<AddCircleOutline />} sx={{ color: '#1C86EE' }} onClick={() => { navigate(`/book-detail?${book?.id}`) }}></Button></Tooltip>
      </CardActions>
    </MuiCard>
  )
}

export default Book