export type BLOCK = SYMBOL | null
export type SYMBOL = 'X' | 'O'

export interface Room {
  board: Array<SYMBOL | null>
  isGameDone: boolean
  message: string
  playerTurn: SYMBOL
  turnNumber: number
}
