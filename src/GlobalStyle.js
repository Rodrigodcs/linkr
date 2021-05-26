import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-style: normal;
        font-weight: normal; 
    }
    
    body{
        background:#333;
    }

    a{
        text-decoration: none;
    }

`

// font-family: 'Lato', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Passion One', cursive;