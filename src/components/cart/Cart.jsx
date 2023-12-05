import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useSelector } from 'react-redux';
import FlightListCard from '../flightListCard/FlightListCard';
import CloseIcon from '@mui/icons-material/Close';

export default function Cart({ openCartDrawer, setOpenCartDrawer }) {
    const { data } = useSelector(state => state.cart)

    return (
        <div>
            <Drawer
                anchor="right"
                open={openCartDrawer}
                onClose={() => setOpenCartDrawer(false)}
            >
                <Box
                    sx={{ width: 'auto', minWidth:'400px', padding: '5px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                    role="presentation"
                    onKeyDown={() => setOpenCartDrawer(false)}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Your Cart</h3>
                        <CloseIcon  onClick={() => setOpenCartDrawer(false)}/>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {
                            data.length > 0 ? data.map(item => <FlightListCard data={item} key={item} disableBooking={true} disablePadding />) : <h3>No Items in cart</h3>
                        }
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}