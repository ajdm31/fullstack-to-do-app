import React from 'react';
import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const Nav = () => (
    <nav>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink to="/" style={{ color: "white  ", textDecoration: "none" }}>Home</NavLink>
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    </nav>
);

export default Nav;