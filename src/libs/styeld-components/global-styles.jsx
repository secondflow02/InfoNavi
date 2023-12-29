import { createGlobalStyle } from 'styled-components'
import '../../assets/fonts/font.css'
import { BREAK_POINT, COLOR, FONT_SIZE, FONT_WEIGHT } from './tokens'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: 'KkomaNabi';
        font-size: ${FONT_SIZE.md};
        font-weight: ${FONT_WEIGHT.normal};
    }
    html {
        background-color: ${COLOR.main};
        color: ${COLOR.black};

        font-size: 80%;
        @media screen and (max-width: ${BREAK_POINT.md}){
          font-size: 65%;
        }
        @media screen and (max-width: ${BREAK_POINT.sm}){
          font-size: 50%;
        }
    }
    ul, li {
        list-style: none;
    }

    h1 {
      font-weight: ${FONT_WEIGHT.bold};
      font-size: ${FONT_SIZE.xl};
    }
    h2 {
      font-weight: ${FONT_WEIGHT.bold};
      font-size: ${FONT_SIZE.lg};
    }
    h3 {
      font-weight: ${FONT_WEIGHT.bold};
      font-size: ${FONT_SIZE.bg};
    }
    h4 {
      font-weight: ${FONT_WEIGHT.bold};
      font-size: ${FONT_SIZE.md};
    }
    button {
        border: none;
    }
    input {
        outline: none;
    }
    textarea {}
    p, div, span {
      font-size: ${FONT_SIZE.md};
    }
`
export default GlobalStyles
