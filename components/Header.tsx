import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Drawer,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { addUser, getUser } from 'services/local';
import { User } from '@prisma/client';

export const Header = () => {
  const { user, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);

  /* clean the code below up a bit */
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  /* clean the code below up a bit */
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawer(open);
  };

  useEffect(() => {
    if (typeof user !== 'undefined' && isLoading === false) {
      addUser(user);
    }
  }, [user, isLoading]);

  return user ? (
    <Box>
      <AppBar position='static' sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            aria-label='open drawer'
            sx={{ mr: 2, color: 'secondary.main' }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link href={{ pathname: '/' }}>
            <Typography
              variant='h1'
              noWrap
              component='div'
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                textDecoration: 'none',
                color: 'black',
                ':hover': {
                  cursor: 'pointer',
                  color: 'deeppink',
                },
              }}
            >
              Tunes & Friends
            </Typography>
          </Link>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '70px',
            }}
          >
            <Search sx={{ margin: '0 30px', color: 'secondary.main' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            {/*  Searcfield don't work at the moment */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='users avatar' src={user.picture} />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={'profile'}>
                <Link
                  href={{
                    pathname: `/friend/[slug]`,
                    query: { slug: `${user.sid}` },
                  }}
                >
                  <Typography textAlign='center'>{'Profile'}</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={'account'}>
                <Link href='/account'>
                  <Typography textAlign='center'>{'Account'}</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={'daschboard'}>
                <Link href='/daschboard'>
                  <Typography textAlign='center'>{'Daschboard'}</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <Drawer anchor='left' open={drawer} onClose={toggleDrawer(false)}>
          <List>
            <Typography
              variant='h4'
              component='div'
              sx={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {user.name}
            </Typography>
            <Divider />
            <Link href='/api/auth/logout'>
              <ListItemButton key={'Logga ut'} component='a'>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'Logga ut'} />
              </ListItemButton>
            </Link>
            <Link href='/tunes'>
              <ListItemButton key={'tunes'} component='a'>
                <ListItemText primary={'Tunes'} />
              </ListItemButton>
            </Link>
            <Link href='/friends'>
              <ListItemButton key={'friends'} component='a'>
                <ListItemText primary={'Friends'} />
              </ListItemButton>
            </Link>
          </List>
        </Drawer>
      </AppBar>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px',
        backgroundColor: 'primary.main',
      }}
    >
      <Typography
        variant='h1'
        noWrap
        component='div'
        sx={{
          flexGrow: 1,
          display: { xs: 'none', sm: 'block' },
          textDecoration: 'none',
          color: 'black',
        }}
      >
        Tunes & Friends
      </Typography>
      <Button variant='contained' href='/api/auth/login'>
        Logga in
      </Button>
    </Box>
  );
};

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
