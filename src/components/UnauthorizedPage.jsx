import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function UnauthorizedPage() {
  return (

    <>

    <Box sx={{
            display: 'flex',

        }}>

            {/* Left Half of Screen */}
            <Box sx={{

                width: '60%',
                height: '100vh',
                backgroundColor: 'black',
                paddingTop: '10%',

            }}>

                <Typography variant="h2" align="center" sx={{
                    fontFamily: 'Archivo Black, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    color: 'white',

                }}>Uh ohh...</Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography variant="h1" align="center" sx={{

                        fontFamily: 'Archivo Black, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        color: 'red',
                        fontSize: '5rem',
                    }}>CCQ PLUS</Typography>

                </Box>
                {/* <Box>

                    <img src={CCQPlusLogo} alt="CCQ Plus Logo" style={{
                        width: '400px',
                    
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        
                    }} />
                </Box> */}

                <Typography variant="h4" align="center" sx={{
                    fontFamily: 'Archivo Black, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    color: 'red',
                }}>Is only Authorized to Cadets at West Point</Typography>

                <Typography variant="h6" align="center" sx={{

                    color: 'red',

                }} >Your account is UNAUTHORIZED </Typography>
            
            
            </Box>

            {/* Right half of screen */}
            <Box sx={{
                height: '100vh',
                width: '40%',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',

                paddingTop: '15%',


            }}>




                <Box sx={{
                    width: '70%',

                }}>

                    <Typography variant='h4' align='center' sx={{
                        fontFamily: 'Archivo Black, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        color: 'black',
                    }}>:(</Typography>
                </Box>

            </Box>


        </Box>
     
    </>
   
  );
}

export default UnauthorizedPage;