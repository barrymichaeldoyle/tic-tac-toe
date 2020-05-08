import styled, { css } from 'styled-components'

export const Button = styled.button`
  ${({ theme }) => css`
    align-items: center;
    background-color: ${theme.colors.black};
    border: 2px solid ${theme.colors.black};
    border-radius: 4px;
    color: ${theme.colors.white};
    cursor: pointer;
    display: flex;
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    justify-content: center;
    margin: 4px 2px;
    min-height: 40px;
    opacity: 0.9;
    padding: 0;
    transition: ${theme.transition};
    width: 100%;

    &:focus {
      border-color: ${theme.colors.blue};
      outline: none;
    }

    &:hover {
      opacity: 0.6;
    }
  `}
`
