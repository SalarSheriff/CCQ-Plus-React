import { Paper, Box, Typography, Button } from '@mui/material';
import imageMapper from '../imageMapper';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

function CompanyDisplayPaper({ company, mascot, buttonText }) {
    // Load appropriate image based on company name
    const companyLogo = imageMapper[company] || imageMapper['default']; // Use 'default' as a fallback if needed

    return (
        <Paper
            elevation={5}
            sx={{
                width: '350px',
                height: '350px', // Adjust the height as needed

            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70%', // Match the Box height to the Paper height
                    width: '100%', // Match the Box width to the Paper width
                    overflow: 'hidden',
                }}
            >
                <img
                    src={companyLogo}
                    alt={`${company} Logo`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain', // Ensure the image scales without losing aspect ratio
                    }}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                paddingLeft: '5%',
                paddingRight: '5%',
            }}>

            <Typography
                variant="h4"
                sx={{
                    
                    fontFamily: "Archivo Black",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "2rem",
                    
                }}>{company + " " + mascot}</Typography>
                <Button variant='contained' color={buttonText == "Sign In" ? "primary" : "warning"} endIcon={<PlayCircleIcon
                
                sx={{
                    width: '30px',
                    height: '30px',
                }} />} sx={{
                    width: '100%',
                    height: '50px',
                    fontSize: buttonText === "Sign In" ? '1.5rem': '1rem',
                  
                }}>
                
                
                {buttonText}
                
                
                </Button>
            </Box>
            
                
        </Paper>
    );
}

export default CompanyDisplayPaper;
