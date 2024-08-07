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
theme = responsiveFontSizes(theme);
// Adding the rest here so we can access the palette variables
theme = createTheme(theme, {
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

export default theme;
