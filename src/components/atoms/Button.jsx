import styled, { css } from 'styled-components';
import {
  variant,
  layout,
  border,
  space,
  position,
  color,
  typography
} from 'styled-system';


const Button = styled.button`
  ${({ theme: { colors, sizes }, disabled, styleType }) => css`
    border-radius: ${sizes.radius.standart};
    border: 3px solid #000;
    cursor: pointer;
    font-size: 20px;
    font-family: 'Rubik Mono One', sans-serif;
    padding: 16px;
    ${styleType !== "default" && "box-shadow: 3.114px 3.114px 28.809px 0px rgba(0, 3, 4, 0.40);"}


    ${variant({
      prop: "styleType",
      variants: {
        primary: {
          backgroundColor: colors.btn1,
          color: colors.black,
          fontSize: "40px"
        },
        secondary: {
          backgroundColor: colors.btn2,
          color: colors.black,
        },
        default: {
          backgroundColor: "none",
          border: "none",
        }
      }
    })}
    ${position}
    ${typography}
    ${border}
    ${layout}
    ${space}
    ${color}
  `}
`;

export default Button;
