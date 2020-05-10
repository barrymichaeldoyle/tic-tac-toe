import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`

export const Input = styled.input<{ error?: string }>`
  ${({ error, theme }) => css`
    background-color: ${theme.colors.white};
    border: solid 2px ${error ? 'red' : theme.colors.lightGray};
    border-radius: 10px;
    color: ${theme.colors.black};
    height: 40px;
    padding: 0 15px;

    &:focus {
      border: solid 2px ${theme.colors.blue};
      outline: none;
    }
  `}
`

export const Label = styled.label<{ error?: string }>`
  ${({ error, theme }) => css`
    color: ${error ? 'red' : theme.colors.black};
    font-weight: bold;
    margin-bottom: 5px;
    padding-left: 10px;
  `}
`
