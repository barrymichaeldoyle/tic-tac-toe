import styled, { css } from 'styled-components'

export const H1 = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    text-align: center;
  `}
`
