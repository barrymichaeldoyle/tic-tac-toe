import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

export const Row = styled.div`
  display: flex;
`

export const Block = styled.div`
  align-items: center;
  border: solid 1px black;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  transition: 0.3s;
  width: 50px;

  &:hover {
    background-color: lightgray;
  }
`

export const Button = styled.button`
  width: 156px;
`
