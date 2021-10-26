import 'styled-components';

// import theme from './themes/defaultTheme';
//
// export type Theme = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme {
    colors: {
      primaryColor: string;
      secondaryColor: string;
      white: string;
      mediumGray: string;
    };
    font: {
      family: {
        default: string;
        secondary: string;
      };
    };
  }
}
