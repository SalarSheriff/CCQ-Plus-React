import { Paper, Box, Typography, Button } from '@mui/material';
import imageMapper from '../imageMapper';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

function CompanyDisplayPaper({ company, mascot }) {
    // Load appropriate image based on company name
    const companyLogo = imageMapper[company] || imageMapper['default']; // Use 'default' as a fallback if needed

    return (
        <Paper
            elevation={5}
            sx={{
                width: '100%',
                height: '100%', // Adjust the height as needed
            
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
                    fontSize: "2.5vw",
                    
                }}>{company + " " + mascot + " CCQ"}</Typography>
                <Button variant='contained' endIcon={<PlayCircleIcon
                
                sx={{
                    width: '3.3vw',
                    height: '3.3vw',
                }} />} sx={{
                    width: '100%',
                    height: '4vw',
                    fontSize: '2vw',
                }}>
                
                
                Begin Shift
                
                
                </Button>
            </Box>
            
                
        </Paper>
    );
}

export default CompanyDisplayPaper;
