import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', 'Segoe UI', sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Стили для скроллбара */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.greyLight};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const theme = {
  colors: {
    primary: '#3f51b5',
    primaryLight: '#757de8',
    primaryDark: '#002984',
    secondary: '#f50057',
    secondaryLight: '#ff4081',
    secondaryDark: '#c51162',
    background: '#f5f5f5',
    paper: '#ffffff',
    text: '#212121',
    textSecondary: '#757575',
    greyLight: '#e0e0e0',
    grey: '#9e9e9e',
    greyDark: '#616161',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3'
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)',
    extraLarge: '0 12px 24px rgba(0,0,0,0.1)'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    circle: '50%'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  typography: {
    fontFamily: "'Roboto', 'Segoe UI', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4
    }
  }
};