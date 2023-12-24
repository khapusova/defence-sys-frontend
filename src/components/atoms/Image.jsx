import styled, { css } from 'styled-components';
import { border, layout, space, position } from 'styled-system';

const Image = styled.img`
  ${({ alignSelf }) => css`
    align-self: ${alignSelf};
    ${border}
    ${layout}
    ${space}
    ${position}
  `}
`;

export default Image;
