// src/components/SignInWithMicrosoftButton.jsx
import React from 'react';
import { Button,Typography } from '@mui/material';
import MicrosoftLogo from '../assets/Microsoft_logo.png'; // Replace with the path to your Microsoft logo


function SignInWithMicrosoftButton() {


    return (
        <Button
      variant="contained"
      color="primary"
 
      sx={{
        display: 'flex',
        
        
        backgroundColor: '#2F2F2F',
        color: '#FFFFFF',
    
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#3E3E3E',
        },
        
        paddingLeft: '5%',
        paddingTop: '3%',
        paddingBottom: '3%',
        width: '100%',
      }}
    >
      <img
        src={MicrosoftLogo}
        alt="Microsoft Logo"
        style={{
          width: '80px',
          height: '80px',
          
        }}
      />
      <Typography variant="button" sx={{
        fontSize: '1.7rem',
        width: '100%',
        marginLeft: '10%',
      }}>Sign in with Microsoft</Typography>
      
    </Button>
    )




}

export default SignInWithMicrosoftButton;