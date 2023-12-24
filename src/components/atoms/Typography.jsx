import styled, { css } from 'styled-components';
import {
  variant,
  layout,
  border,
  space,
  color,
  position,
  background,
  typography
} from 'styled-system';



const Typography = styled.p`
  ${({ theme: { colors }, fontSize, alignSelf }) => css`

    
    
    ${variant({
      prop: 'type',
      variants: {
        'title': {
          fontSize: '50px',
          textAlign: 'center',
        }
      }
    })}
    ${variant({
      variants: {
        'w500-s10': {
          fontWeight: '500',
          fontSize: '10px'
        },
        'w300-s12': {
          fontWeight: '300',
          fontSize: '12px'
        },
        'w400-s12': {
          fontWeight: '400',
          fontSize: '12px'
        },
        'w700-s12': {
          fontWeight: '700',
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
        'w700-s17': {
          fontWeight: '700',
          fontSize: '17px'
        },
        'w400-s18': {
          fontWeight: '400',
          fontSize: '18px'
        },
        'w700-s18': {
          fontWeight: '700',
          fontSize: '18px'
        },
        'w700-s24': {
          fontWeight: '700',
          fontSize: '24px'
        }
      }
    })}
    ${border}
    ${background}
    ${layout}
    ${space}
    ${color}
    ${position}
    ${typography}
    ${alignSelf && "align-self: center;"}
  `}
`;

export default Typography;
