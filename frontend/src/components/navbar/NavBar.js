import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';

const NavBar = () => {
    return(
        <AppBar>
            <Toolbar>
                <Button color="inherit">NoteVault</Button>
                <div style={{flexGrow: 1}}></div>
                <Button color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;