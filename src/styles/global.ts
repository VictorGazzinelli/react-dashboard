import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }
    body {
        background: ${(props) => props.theme.SYSTEM_BACKGROUND};
        font-size: 13px;
        color:${(props) => props.theme.ITENS_TEXT};
        height:100vh;
        width:100vw;
        overflow: hidden;
        transition: background 0.5s;
        display: flex;
    }



    #root{ 
        display: flex;
        flex: 1;
        overflow:hidden;
    }

    *::-webkit-scrollbar {
        width: 8px;
    }

    *::-webkit-scrollbar-track {
        -webkit-box-shadow: none;
    }

  *::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.1);
        border-radius: 60px;
    }

    // Mapa leaflet

    .leaflet-container {
      font: inherit;
    }

    /* ANTD colors  */
 
    .ant-btn-primary {
        background: ${(props) => props.theme.PRIMARY_MAIN};
        border-color: ${(props) => props.theme.PRIMARY_MAIN};

        :hover {
            background: ${(props) => props.theme.PRIMARY_LIGTH};
            border-color: ${(props) => props.theme.PRIMARY_LIGTH};
        }
        :focus {
            background: ${(props) => props.theme.PRIMARY_MAIN};
            border-color: ${(props) => props.theme.PRIMARY_MAIN};
        }

        :active {
            background: ${(props) => props.theme.PRIMARY_DARK};
            border-color: ${(props) => props.theme.PRIMARY_DARK};
        }
    }

    .ant-btn:hover, .ant-btn:focus {
        color: ${(props) => props.theme.PRIMARY_MAIN};
        border-color: ${(props) => props.theme.PRIMARY_MAIN};
    }

    .ant-tooltip{
        z-index:2000;
    }
`;
