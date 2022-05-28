import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,

    PRIMARY_MAIN: string,
    PRIMARY_DARK: string,
    PRIMARY_LIGTH: string,

    SECONDARY_MAIN:string,
    SECONDARY_LIGHT:string,
    SECONDARY_DARK:string,

    SYSTEM_BACKGROUND: string,
    BORDER_COLOR: string,
    HOVER_COLOR: string,
    ACTIVE_COLOR: string,
    ITENS_BACKGROUND: string,
    ITENS_TEXT: string
    }
}
