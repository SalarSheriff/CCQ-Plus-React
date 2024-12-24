import { Box, TextField, Typography, Checkbox, Button, FormControlLabel } from '@mui/material';
import CCQPlusLogo from '../assets/CCQPluslogo.png';
import SignInWithMicrosoftButton from "./SignInWithMicrosoftButton";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SignInPage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()

    const[honorAgree, setHonorAgree] = useState(false)


    

    return (
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

                }}>Welcome To</Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography variant="h1" align="center" sx={{

                        fontFamily: 'Archivo Black, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        color: 'white',
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
                    color: 'white',
                }}>Sign In To Get Started</Typography>

                <Typography variant="h6" align="center" sx={{

                    color: 'white',

                }} >Ditch the ineffective paper logs, switch to a feature rich site accessible on all platforms </Typography>


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

                    {/* <SignInWithMicrosoftButton /> */}

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400, margin: '0 auto' }}>
                    <Typography variant="h4" align="center" sx={{
                    fontFamily: 'Archivo Black, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    color: 'black',
                }}>Sign In To CCQ Plus</Typography>
                
                        <TextField onChange={(e) => {
                            setUsername(e.target.value);
                            Cookies.set("username", e.target.value)
                        }} value={username} id="name" label="Name" variant="outlined" />
                        
                        
                        <TextField onChange={(e)=> {
                            setEmail(e.target.value)
                            Cookies.set("email", e.target.value)
                        }} value={email} id="email" label="Email" variant="outlined" />

<FormControlLabel
        control={
          <Checkbox
            checked={honorAgree}
            onChange={(e) => setHonorAgree(e.target.checked)}
            color="primary"
          />
        }
        label="I understand that if I impersonate or enter another person's credentials I am subject to the USMA Honor Code"
      />
      <Button
        variant="contained"
        color="primary"
        disabled={!honorAgree}
        onClick={()=>{
            navigate("/companySelect")
        }}
      >
        Sign In
      </Button>
                    </Box>


                </Box>

            </Box>


        </Box>
    )
}




export default SignInPage;