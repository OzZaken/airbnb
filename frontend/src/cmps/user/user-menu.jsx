import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box' //  component from the Material-UI library, which is used to group and organize other components. In this case, it is used to group the tooltip and icon button.
import Tooltip from '@mui/material/Tooltip' // displays a tooltip (title) when the user hovers over the wrapped element.
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar' // display the user's profile image inside the icon button.
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton' // displays an icon inside a button. 

import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'


import { onLogout } from '../../store/user.action'

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = ev => setAnchorEl(ev.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const onLogOut = async () => {
    await dispatch(onLogout())
    navigate('/')
  }

  return (
    <div className='user-menu'>
      
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">

          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={isOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {/* imgUrl */}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
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
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>

      </Menu>
    </div>
  )
}