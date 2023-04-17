import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { onLogout } from '../../store/user.action'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

import Tooltip from '@mui/material/Tooltip' // title
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

export default function UserMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = ev => setAnchorEl(ev.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const loggedInUser = useSelector(state => state.userModule.loggedInUser)

  const onLogOut = async () => {
    await dispatch(onLogout())
    navigate('/')
  }

  const boxUserMenu = {
    sx: { display: 'flex', alignItems: 'center', textAlign: 'center' }
  }

  const btnUserMenu = {
    onClick: ev => handleClick(ev),
    size: 'small',
    sx: { ml: 2 },
    'aria-controls': open ? 'account-menu' : undefined,
    'aria-haspopup': 'true',
    'aria-expanded': open ? 'true' : undefined
  }

  const userMenuContainer = {
    id: 'account-menu',
    anchorEl,
    open,
    onClose: () => handleClose(),
    onClick: () => handleClose(),
    PaperProps: {
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 320,
          height: 320,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      }
    },
    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
  }

  const userAvatar = {
    src: loggedInUser ? loggedInUser.imgUrl : null,
    sx: { width: 32, height: 32 },
  }

  return <div className='user-menu'>

    {/* button */}
    <Box {...boxUserMenu}>
      <Tooltip title="Account settings">
        <IconButton {...btnUserMenu}>
          <Avatar {...userAvatar} />
        </IconButton>
      </Tooltip>
    </Box>

    {/* Menu */}
    <Menu {...userMenuContainer}>

      {loggedInUser
        ? <MenuItem>
          <Avatar {...userAvatar} />
          <Link> profile</Link>
        </MenuItem>

        : <div>
          {/* Log in */}
          <MenuItem>
            <Link to='login'><strong>Log in</strong></Link>
          </MenuItem>

          {/* sign up */}
          <MenuItem>{/* <ListItemIcon><PersonAdd fontSize="small" /></ListItemIcon> */}
            <Link to='signup'>sing up</Link>
          </MenuItem>
        </div>
      }

      <Divider />

      {/* About */}
      <MenuItem onClick={handleClose}>
        <ListItemIcon><InfoOutlinedIcon fontSize="small" /></ListItemIcon>
        About
      </MenuItem>

      {/* settings */}
      <MenuItem onClick={handleClose}>
        <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
        settings
      </MenuItem>

      {/* Logout */}
      {loggedInUser &&
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <button onClick={() => onLogOut()}></button>
        </MenuItem>}
    </Menu>
  </div>
}