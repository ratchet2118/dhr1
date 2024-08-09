import { createTheme } from '@mui/material/styles';
export const commonSkeletonTheme = createTheme({
    components: {
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    height: 'auto',
                    transform: 'scale(1,1)',
                },
            },
        },
    },
});
