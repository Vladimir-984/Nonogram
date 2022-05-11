import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPopulatedPuzzle } from 'utils/puzzle'

export type TypeGameAction = 'fill' | 'mark' | 'hint'
type TypeCachedGameAction = Exclude<TypeGameAction, 'hint'>

export type TypeGameMode = 'standard' | 'classic'

export interface IGame {
   gameMode: TypeGameMode

   gameIsStarted: boolean
   numberOfPaintedCells: number

   numberOfHealthStandardGame: number
   numberOfReceivedHealthStandardGame: number
   numberOfErrorsStandardGame: number

   errorInSolvingClassicGame: boolean
   numberOfIncorrectlyPaintedCellsClassicGame: number

   numberOfHints: number
   numberOfReceivedHints: number
   numberOfUsedHints: number

   solvingCompleted: boolean

   puzzle: IPopulatedPuzzle
}

interface IState {
   cachedGameAction: TypeCachedGameAction
   gameAction: TypeGameAction

   gameMode: TypeGameMode
   complexitySelection: boolean

   animationIntroGameActions: boolean
   animationIntroHealth: boolean

   animationIntroErrorStandardGame: boolean

   game: IGame
}

const initialState: IState = {
   cachedGameAction: 'fill',
   gameAction: 'fill',

   gameMode: 'standard',
   complexitySelection: false,
   animationIntroGameActions: true,
   animationIntroHealth: false,
   animationIntroErrorStandardGame: false,
   game: null!,
}

const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      setGameAction: (state, action: PayloadAction<TypeGameAction>) => {
         if (action.payload === 'hint') {
            if (state.gameAction === 'hint') {
               state.gameAction = state.cachedGameAction
            } else {
               state.cachedGameAction = state.gameAction
               state.gameAction = action.payload
            }
         } else if (action.payload === state.gameAction) {
            state.gameAction = action.payload === 'fill' ? 'mark' : 'fill'
         } else {
            state.gameAction = action.payload
         }
      },
      setGameMode: (state, action: PayloadAction<TypeGameMode>) => {
         state.gameMode = action.payload
      },
      setComplexitySelection: (state, action: PayloadAction<boolean>) => {
         state.complexitySelection = action.payload
      },

      setGame: (state, action: PayloadAction<IGame>) => {
         state.game = action.payload
      },
      setAnimationIntroGameActions: (state, action: PayloadAction<boolean>) => {
         state.animationIntroGameActions = action.payload
      },
      setAnimationIntroHealth: (state, action: PayloadAction<boolean>) => {
         state.animationIntroHealth = action.payload
      },
      setAnimationIntroErrorStandardGame: (state, action: PayloadAction<boolean>) => {
         state.animationIntroErrorStandardGame = action.payload
      },
   },
})

export default appSlice.reducer

export const {
   setGameAction,
   setGameMode,
   setComplexitySelection,
   setGame,
   setAnimationIntroGameActions,
   setAnimationIntroHealth,
   setAnimationIntroErrorStandardGame,
} = appSlice.actions
