import { createTheme } from '@mui/material/styles';

export default createTheme({
    typography: {
        button: {
            textTransform: 'none', // 将按钮文本转换为小写
            borderRadius: '6px',
        },
        fontFamily: "Inter",
        body1: {
            margin: 'none',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '150%',
            fontStyle: 'normal'
        },
        h2: {
            fontSize: '60px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '120%',
        },
        h4: {
            margin: 'none',
            fontSize: '34px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '123.5%'
        },
        h5: {
            margin: 'none',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '133.4%'
        },
    },
});