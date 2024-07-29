import { AppBar, Toolbar, Typography } from "@mui/material";

function CCQPlusAppBar() {


    return(

        <>
        
        <AppBar position="static" color="primary"> 


            <Toolbar>


                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>CCQ Plus</Typography>
            </Toolbar>
        </AppBar>
        
        </>
    )
}

export default CCQPlusAppBar;