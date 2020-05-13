import styled, { css } from 'styled-components'

export const H3 = styled.h3`
  ${({ theme }) => css`
    border-bottom: 1px solid grey;
    cursor: pointer;
    color: ${theme.colors.black};
    text-align: center;
  `}
`
