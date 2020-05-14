import styled, { css } from 'styled-components'

export const Block = styled.div`
  ${({ theme }) => css`
    align-items: center;
    border: solid 1px ${theme.colors.black};
    cursor: pointer;
    display: flex;
    height: 70px;
    justify-content: center;
    transition: ${theme.transition};
    width: 70px;
  `}
`

export const Container = styled.div<{ marking: boolean }>`
  ${({ marking, theme }) => css`
    border: solid 1px ${theme.colors.black};
    margin-bottom: 30px;

    & > div > div {
      background-color: ${marking
        ? theme.colors.lightGray
        : theme.colors.white};

      &:hover {
        background-color: ${marking
          ? theme.colors.lightGray
          : theme.colors.lightBlue};
      }
    }
  `}
`

export const Row = styled.div`
  display: flex;
`
