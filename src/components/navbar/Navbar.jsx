import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Logo from '../logo/Logo';
import { Avatar, Badge, Container, Tooltip } from '@mui/material';
import { logout } from '../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Cart from '../cart/Cart';

export default function Navbar() {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.cart)
    const { userDetails } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openCartDrawer, setOpenCartDrawer] = useState();
    const userName = localStorage.getItem('userName')

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ flexGrow: 1, background: 'transparent', border: 'none', boxShadow: 'none', position: 'absolute', top: '0', left: '0' }}>
                <Container>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Logo fontSize="2.5rem" />
                        </Typography>

                        <Box sx={{ flexGrow: 0, display: 'flex', gap: '20px' }}>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={() => setOpenCartDrawer(true)}
                            >
                                <Badge badgeContent={data.length} color="error">
                                    <LocalMallIcon style={{ color: 'white' }} />
                                </Badge>
                            </IconButton>

                            <Tooltip>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                                    <Avatar alt={userName} src={"no"} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
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
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={() => dispatch(logout(navigate))}>Logout</Typography>
                                </MenuItem>
                            </Menu>

                            <Cart openCartDrawer={openCartDrawer} setOpenCartDrawer={setOpenCartDrawer} />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}