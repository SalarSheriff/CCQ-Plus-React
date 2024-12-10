import { Container, Grid, Typography, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';


function DAFormGenerator() {

    return (
        <>

            <h1>DA Form Generator</h1>
            <Container>
                <Grid container spacing={2} >
                    <Grid item xs={10} sx={
                        {
                            border: '1px solid black',

                            textAlign: 'center',

                            paddingTop: '0px',
                            paddingBottom: '4px'

                        }


                    }>
                        <Typography
                            variant="subtitle2"
                            sx={{

                            }}
                        >
                            DAILY STAFF JOURNAL OR DUTY OFFICER'S LOG

                        </Typography>

                        <Typography variant='body2' sx={{ margin: 0 }}>For use of this form, see TC 3-22.6; the proponent agency is TRADOC</Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ border: '1px solid black' }}>
                        <Typography variant='body2' sx={{ margin: 0 }}>NO. OF PAGES</Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        sx={{
                            border: '1px solid black',
                            padding: '1px', // Add 1px padding to the Grid
                      
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{

                            }}
                        >
                            ORGANIZATION OR INSTALLATION

                        </Typography>

                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{
                            border: '1px solid black',
                            padding: '1px', // Add 1px padding to the Grid
                           
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{

                            }}
                        >
                            LOCATION

                        </Typography>



                    </Grid>


                    <Grid
                        item
                        xs={6}
                        sx={{
                            border: '1px solid black',
                            padding: '1px', // Add 1px padding to the Grid
                           
                        }}
                    >
                        <Grid container sx={{textAlign: "center"}}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        border: '1px solid black',
                                        
                                    }}
                                >
                                    PERIOD COVERED

                                </Typography>
                            </Grid>

                            <Grid item xs={6} >
                            <Typography
                                    variant="body2"
                                    sx={{
                                        border: '1px solid black',
                                    }}
                                >
                                    FROM

                                </Typography>
                            </Grid>
                            <Grid item xs={6} >
                            <Typography
                                    variant="body2"
                                    sx={{
                                        border: '1px solid black',
                                    }}
                                >
                                    TO

                                </Typography>
                            </Grid>

                            <Grid item xs={2} >
                            <Typography
                                    variant="body2"
                                    sx={{
                                        border: '1px solid black',
                                    }}
                                >
                                    HOUR

                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                            <Typography
                                    variant="body2"
                                    sx={{
                                        border: '1px solid black',
                                    }}
                                >
                                    DATE

                                </Typography>
                            </Grid>
                            <Grid item xs={2} >
                            <Typography
                                    variant="body2"
                                    sx={{
                                        border: '1px solid black',
                                    }}
                                >
                                    HOUR

                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                            <Typography
                                    variant="body2"
                                    sx={{
                                        border: '1px solid black',
                                    }}
                                >
                                    DATE

                                </Typography>
                            </Grid>

                        </Grid>


                                    

                    </Grid>


                    <Grid item xs={1} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >ITEM</Typography>
                        <Typography variant='body2' >NO.</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >TIME</Typography>
                        <Typography variant='body2' >IN</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >TIME</Typography>
                        <Typography variant='body2' >OUT</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >INCIDENTS, MESSAGES, ORDERS, ETC.</Typography>
                        
                    </Grid>
                    <Grid item xs={2} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >ACTION TAKEN</Typography>
                        
                    </Grid>
                    <Grid item xs={1} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >INL</Typography>
                        
                    </Grid>
                </Grid>
            </Container>

        </>

    )
}

export default DAFormGenerator;