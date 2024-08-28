import { Box, Typography } from "@mui/material";
import CCQPlusLogo from '../assets/CCQPluslogo.png';
import SignInWithMicrosoftButton from "./SignInWithMicrosoftButton";
function SignInPageMobile() {



    return (
        <Box sx={{
            display: 'flex',

        }}>

            {/* Left Half of Screen */}
            <Box sx={{

                width: '100%',
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
                <Box sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                    paddingTop: '15%',


                }}>




                    <Box sx={{
                        width: '70%',

                    }}>

                        <SignInWithMicrosoftButton />
                    </Box>

                </Box>

            </Box>




        </Box>
    )
}




export default SignInPageMobile;