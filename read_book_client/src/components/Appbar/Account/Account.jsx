import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Box, Divider, MenuItem, ListItemIcon, Avatar, IconButton, Tooltip } from '@mui/material'
import { Settings, PersonAdd } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCookie } from '../../../utils/cookie'
import { logout } from '../../../redux/actions/auth'
import { persistor } from '../../../redux/store'

function Account() {
    const dispatch = useDispatch()
    const avatar = useSelector(state => state.auth.avatar)
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        deleteCookie()
        dispatch(logout())
        persistor.purge()
        alert('Logout sucessfull')
        navigate('/')
    }
    return (
        <Box>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ padding: 0, marginRight: '10px', color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {avatar && <img src={avatar} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu-account"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {avatar && <MenuItem onClick={handleClose}>
                    <Link to={'/account'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 3 }} />
                        Cá nhân
                    </Link>

                </MenuItem>}
                <Divider />
                {!avatar && <MenuItem onClick={handleClose}>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <PersonAdd fontSize="small" />
                        Login
                    </Link>
                </MenuItem>}
                {avatar && <MenuItem onClick={handleLogout}>
                    <Settings fontSize="small" />
                    Log out
                </MenuItem>}
            </Menu>
        </Box>
    )
}

export default Account