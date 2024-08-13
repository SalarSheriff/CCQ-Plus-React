import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#4B0082', // Dark Purple
        },
        secondary: {
            main: '#FF6F61', // Bright Pink
            light: '#FFB6C1', // Lighter shade of Bright Pink
            contrastText: '#FFFFFF', // White for text on secondary elements
        },
        background: {
            default: '#FFFFFF', // White background
            paper: '#E0FFFF', // Light Cyan for paper background
        },
        action: {
            hover: '#8B0000', // Dark Red for hover
        },
        text: {
            primary: '#4B0082', // Dark Purple for primary text
            secondary: '#800000', // Dark Brownish Purple for secondary text
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});
// theme = responsiveFontSizes(theme);
// Adding the rest here so we can access the palette variables
theme = createTheme(theme, {
    typography: {
        h6: {
            // Media query for screen widths larger than 600px
            '@media (min-width:200px)': {
                fontSize: '0.4rem', // Adjust font size for larger screens
            },
             // Media query for screen widths larger than 600px
             '@media (min-width:500px)': {
                fontSize: '1.1rem', // Adjust font size for larger screens
            },
        },
        body1: {
            // Media query for screen widths larger than 600px
            '@media (min-width:200px)': {
                fontSize: '0.4rem', // Adjust font size for larger screens
            },
             // Media query for screen widths larger than 600px
             '@media (min-width:500px)': {
                fontSize: '0.9rem', // Adjust font size for larger screens
            },
        }
    },
    components: {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover, // Accessing palette variable
                    },
                },
            },
        },
    },
});
let theme2 = createTheme({
    palette: {
        primary: {
            main: '#19381F', // Dark Green
        },
        secondary: {
            main: '#EEE82C', // Bright Yellow
            light: '#91CB3E', // Light Green
            contrastText: '#FFFFFF', // White for text on secondary elements
        },
        background: {
            default: '#53A548', // Medium Green background
            paper: '#4C934C', // Darker Green for paper background
        },
        action: {
            hover: '#8B0000', // Dark Red for hover (unchanged)
        },
        text: {
            primary: '#19381F', // Dark Green for primary text
            secondary: '#4C934C', // Darker Green for secondary text
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

// Adjust font sizes with media queries
theme2 = createTheme(theme2, {
    typography: {
        h6: {
            '@media (min-width:200px)': {
                fontSize: '0.4rem', // Adjust font size for smaller screens
            },
            '@media (min-width:500px)': {
                fontSize: '1.1rem', // Adjust font size for larger screens
            },
        },
        body1: {
            '@media (min-width:200px)': {
                fontSize: '0.4rem', // Adjust font size for smaller screens
            },
            '@media (min-width:500px)': {
                fontSize: '0.9rem', // Adjust font size for larger screens
            },
        }
    },
    components: {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: theme2.palette.action.hover, // Accessing palette variable
                    },
                },
            },
        },
    },
});




let westPointTheme = createTheme({
    palette: {
        primary: {
            main: '#B3A369', // West Point Gold
        },
        secondary: {
            main: '#000000', // Black
            light: '#7F7F7F', // Light Grey (as a lighter shade of black)
            contrastText: '#FFFFFF', // White for text on secondary elements
        },
        background: {
            default: '#F5F5F5', // Light Grey for background
            paper: '#D3D3D3', // Lighter Grey for paper background
        },
        action: {
            hover: '#B3A369', // Gold for hover
        },
        text: {
            primary: '#000000', // Black for primary text
            secondary: '#B3A369', // Gold for secondary text
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});
// theme = responsiveFontSizes(theme);
// Adding the rest here so we can access the palette variables
westPointTheme = createTheme(westPointTheme, {
    typography: {
        h6: {
            // Media query for screen widths larger than 600px
            '@media (min-width:200px)': {
                fontSize: '0.4rem', // Adjust font size for smaller screens
            },
            '@media (min-width:500px)': {
                fontSize: '1.1rem', // Adjust font size for larger screens
            },
        },
        body1: {
            // Media query for screen widths larger than 600px
            '@media (min-width:200px)': {
                fontSize: '0.4rem', // Adjust font size for smaller screens
            },
            '@media (min-width:500px)': {
                fontSize: '0.9rem', // Adjust font size for larger screens
            },
        }
    },
    components: {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover, // Accessing palette variable
                    },
                },
            },
        },
    },
});




export {theme, theme2, westPointTheme}
