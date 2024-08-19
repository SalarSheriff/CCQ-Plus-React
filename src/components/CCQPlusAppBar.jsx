import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import ProfileImage from '../assets/logos/I1logo.png';
import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import BTDLogo from '../assets/logos/btdlogo.png';
import { useNavigate } from 'react-router-dom';
function CCQPlusAppBar() {



    const { instance } = useMsal();

    const navigate = useNavigate();

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

    function goToAdminView() {
        navigate('/adminview');
    }
    function goToImageView() {
        navigate('/imageview');
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


                    <Tooltip title="AO Image Viewer">


<IconButton onClick={goToImageView}>
<Typography variant="h6">AO Image Viewer</Typography>
    {/* <Avatar src={BTDLogo} /> */}
</IconButton>

</Tooltip>
                    <Tooltip title="Command Team Login">


<IconButton onClick={goToAdminView}>
<Typography variant="h6">Command Team Login</Typography>
    {/* <Avatar src={BTDLogo} /> */}
</IconButton>

</Tooltip>
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