import { Container, Grid, Typography, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';


function DAForm({logs, date}) {

    return (
        <>

     
            <Container>
                <Grid container spacing={2} >
                    {/* HEADING of FORM */}
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
                        <Typography
                            variant="body2"
                            sx={{
textAlign:"center"
                            }}
                        >USCC</Typography>

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

                            <Grid item xs={6} sx={{
                                        border: '1px solid black',
                                    }}>
                            <Typography
                                    variant="body2"
                                    
                                >
                                    FROM

                                </Typography>
                                
                                
                            </Grid>
                            <Grid item xs={6} sx={{
                                        border: '1px solid black',
                                    }} >
                            <Typography
                                    variant="body2"
                                    
                                >
                                    TO

                                </Typography>
                            </Grid>
 
                            <Grid item xs={2} sx={{
                                        border: '1px solid black',
                                    }}>
                            <Typography
                                    variant="body2"
                                    
                                >
                                    HOUR

                                </Typography>
                                <Typography variant="body2"> {logs?.[0]?.time} </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{
                                        border: '1px solid black',
                                    }} >
                            <Typography
                                    variant="body2"
                                    
                                >
                                    DATE

                                </Typography>
                                <Typography variant="body2">{date}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{
                                        border: '1px solid black',
                                    }} >
                            <Typography
                                    variant="body2"
                                    
                                >
                                    HOUR

                                </Typography>
                                <Typography variant="body2"> {logs?.[logs?.length - 1]?.time} </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{
                                        border: '1px solid black',
                                    }}>
                            <Typography
                                    variant="body2"
                                    
                                >
                                    DATE

                                </Typography>
                                <Typography variant="body2">{date}</Typography>
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


                    {/* LOGS*/}

                    {logs.map((log, logIndex) => (<>
                    

                        <Grid item xs={1} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >{logIndex + 1}</Typography>
                      
                    </Grid>
                    <Grid item xs={1} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >{log.time}</Typography>
                        
                    </Grid>
                    <Grid item xs={1} sx={{ 
    border: '1px solid black', 
    textAlign: 'center',
    wordWrap: 'break-word', // Break long words to fit within the container
    whiteSpace: 'normal',  // Allow text to wrap onto the next line
    overflow: 'hidden',    // Prevent overflow
  }}>
                        <Typography variant='body2' >{log.timeOut}</Typography>
                    
                    </Grid>
                    <Grid item xs={6} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >{log.message}</Typography>
                        
                    </Grid>
                    <Grid item xs={2} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >{log.action}</Typography>
                        
                    </Grid>
                    <Grid item xs={1} sx={{ border: '1px solid black' , textAlign:"center"}}>
                        <Typography variant='body2' >{log.name}</Typography>
                        
                    </Grid>


                    
                    </>))}

                    

                    {/* Signature Block */}
                    <Grid item xs={7} sx={{ border: '1px solid black' , textAlign:"left"}}>
                        <Typography variant='body2'>TYPE NAME AND GRADE OF OFFICER OR OFFICIAL ON DUTY</Typography>
                        <br></br>
                        <br></br>
                    </Grid>
                    <Grid item xs={5} sx={{ border: '1px solid black' , textAlign:"left"}}>
                        <Typography variant='body2'>SIGNATURE</Typography>

                    </Grid>



                </Grid>
            </Container>

        </>

    )

}


export default DAForm;