import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid grey;
    cursor: pointer;
    color: ${theme.colors.black};
    font-size: 18px;
    text-align: center;
  `}
`
