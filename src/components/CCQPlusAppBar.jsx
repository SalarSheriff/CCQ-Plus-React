import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";

import ProfileImage from '../assets/logos/I1logo.png';
import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
function CCQPlusAppBar() {



    const { instance } = useMsal();



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);



    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleMenuClose() {
        setAnchorEl(null);


    }


    //Sign out of Microsoft using redirect
    function handleSignOut() {

        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });

    }
    return (

        <>

            <AppBar position="static" color="primary">


                <Toolbar>
                    <Menu
                    anchorEl={anchorEl}
                    open={open}
        onClose={handleMenuClose}
                    >
<MenuItem onClick={handleSignOut}> <Typography variant="h6">Sign Out</Typography> </MenuItem>

                    </Menu>

                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>CCQ Plus</Typography>

                    <Tooltip title="Manage Profile">


                        <IconButton onClick={handleMenuOpen}>

                            <Avatar src={ProfileImage} />
                        </IconButton>

                    </Tooltip>
                </Toolbar>
            </AppBar>

        </>
    )
}

export default CCQPlusAppBar