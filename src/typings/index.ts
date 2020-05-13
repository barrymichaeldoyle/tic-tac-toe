export type BLOCK = SYMBOL | null
export type SYMBOL = 'X' | 'O'

export interface Room {
  board: Array<SYMBOL | null>
  isGameDone: boolean
  message: string
  playerOId?: string
  playerTurn: SYMBOL
  playerXId?: string
  startingTurn: SYMBOL
  turnNumber: number
}

export interface User {
  displayName: string
  id: string
}
