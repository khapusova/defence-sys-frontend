import styled, { css } from 'styled-components';
import {
  color,
  layout,
  border,
  space,
  variant,
  position,
  typography
} from 'styled-system';


const Input = styled.input`
  ${({ theme: { colors, sizes }, type, fontSize}) => css`
    ${border}
    ${layout}
    ${space}
    ${color}
    ${position}
    ${typography}
    font-family: Rubik Mono One;
    font-size: ${fontSize || "24px"};
    &::placeholder {
      color: black;
    }
    
    ${variant({
      prop: 'type',
      variants: {
        "inp1": {
          border: "none",
          borderBottom: "2px solid black",
          background: 'none',
        }
    }})}
    ${variant({
      variants: {
        'w400-s12': {
          fontWeight: '400',
          fontSize: '12px'
        },
        'w400-s14': {
          fontWeight: '400',
          fontSize: '14px'
        },
        'w700-s14': {
          fontWeight: '700',
          fontSize: '14px'
        },
        'w700-s16': {
          fontWeight: '700',
          fontSize: '16px'
        },
        'w400-s16': {
          fontWeight: '400',
          fontSize: '16px'
        },
        'w500-s17': {
          fontWeight: '500',
          fontSize: '17px'
        },
        'w400-s17': {
          fontWeight: '400',
          fontSize: '17px'
        },
        'w700-s24': {
          fontWeight: '700',
          fontSize: '24px'
        }
      }
    })}
  `}
`;

export default Input;
