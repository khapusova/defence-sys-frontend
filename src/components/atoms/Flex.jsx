import styled, { css } from 'styled-components';
import {
  layout,
  border,
  shadow,
  space,
  color,
  position,
  grid,
  flexbox,
  background
} from 'styled-system';

const Flex = styled.div`
  ${() => css`
    display: flex;
    ${background}
    ${layout}
    ${shadow}
    ${border}
    ${space}
    ${color}
    ${position}
    ${grid}
    ${flexbox}
  `}
`;

export default Flex;
