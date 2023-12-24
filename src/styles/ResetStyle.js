import { createGlobalStyle } from 'styled-components';

const ResetStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Rubik+Mono+One&display=swap');
  *,
  *::before,
  *::after {
    box-sizing: content-box;
  }
  *:focus {
    outline: none;
  }

  ul[class],
  ol[class] {
    padding: 0;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  body {
    background-color: #BBD0AF;
    font-family: 'Rubik Mono One', sans-serif;

    min-height: 100%;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  ul[class],
  ol[class] {
    list-style: none;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

export default ResetStyle;
