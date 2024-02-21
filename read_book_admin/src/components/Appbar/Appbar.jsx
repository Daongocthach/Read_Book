import { HelpOutline } from '@mui/icons-material'
import { Box, Tooltip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ModeSelect from './ModeSelect/ModeSelect'
import Account from './Account/Account'
import G2Logo from '../../assets/img/G2Logo.png'

const useStyles = {
  container: {
    position: 'static',
    width: '100%',
    height: (theme) => theme.webCustom.appBarHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    overflow: 'auto',
    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1C1C1C' : '#FFFAFA')
  }
}

function AppBar() {
  return (
    <Box sx={useStyles.container}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingX: 3 }}>
        <Link to={'/dashboard'} >
          { <img src={G2Logo} style={{ height: '60px', width: '75px', objectFit: 'contain' }} />}
        </Link>
        <Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
          <Typography variant="h4" fontWeight="bold" color={(theme) => (theme.palette.mode === 'dark' ? 'white' : '#222222')}> G2Store</Typography>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingX: 3 }}>
        <ModeSelect />
        <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
          <HelpOutline sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'), border: 'none', fontWeight: 'bold' }} />
        </Tooltip>
        <Account />
      </Box>
    </Box>
  )
}

export default AppBar