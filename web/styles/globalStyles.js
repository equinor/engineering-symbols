import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;

    p,
    h1,
    h2,
    strong,
    span {
      color: ${({ theme }) => theme.text} !important;
    }

    input,
    output {
      background: ${({ theme }) => theme.body} !important;
      color: ${({ theme }) => theme.text} !important;
    }

    .eq_dialog {
      background: ${({ theme }) => theme.body};

      svg {
        fill: ${({ theme }) => theme.fill};
      }
    }
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
  `;
