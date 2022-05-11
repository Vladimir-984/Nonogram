import { TypeSize } from 'components/ui/Puzzle/GameWrapper/GameWrapper'
import { IGame, TypeGameMode } from 'store/slices/appSlice'

const MAP_SIZE: { [key: number]: TypeSize } = {
   5: 's' as const,
   10: 'm' as const,
   15: 'l' as const,
   20: 'xl' as const,
}

export enum PuzzleCellEnum {
   FILL = 'fill',
   EMPTY = 'empty',
   MARK = 'mark',
}
export enum PuzzleComplexitiesEnum {
   EASY = 'easy',
   MEDIUM = 'medium',
   HARD = 'hard',
   EXPERT = 'expert',
}

// export enum PuzzleCategoriesEnum {
//    DAILY_CHALLENGE = 'dailyChallenge',
//    PROGRESS = 'progress',
//    LEARNING = 'learning',
//    EVENT = 'event',
// }
export enum PuzzleSizesEnum {
   SMALL = 5,
   MEDIUM = 10,
   LARGE = 15,
   EXTRALARGE = 20,
}

export const calcX = (idx: number, inLine: number, width: number) => {
   return (idx % inLine) * width
}
export const calcY = (idx: number, inLine: number, height: number) => {
   return Math.floor(idx / inLine) * height
}

interface IPopulateGameParams {
   gameMode: TypeGameMode
   numberOfHints: number
   puzzle: IPuzzleDraft
}
export const populateNewGame = ({ gameMode, numberOfHints, puzzle }: IPopulateGameParams) => {
   const populatedGame: IGame = {
      gameMode,
      gameIsStarted: false,
      numberOfHints,
      numberOfReceivedHints: 0,
      numberOfUsedHints: 0,

      numberOfPaintedCells: 0,

      numberOfErrorsStandardGame: 0,
      numberOfHealthStandardGame: 3,
      numberOfReceivedHealthStandardGame: 0,

      numberOfIncorrectlyPaintedCellsClassicGame: 0,
      errorInSolvingClassicGame: false,

      solvingCompleted: false,
      puzzle: populatePuzzleFromSource(puzzle),
   }

   return populatedGame
}

export interface IPopulatedPuzzle {
   puzzleSize: number
   puzzleName: string
   complexity: string
   totalNumberOfPaintedCells: number
   cells: IPuzzleCell[]
   cellsAnswers: PuzzleCellEnum[]
   rowHints: IPuzzleHint[]
   columnHints: IPuzzleHint[]
   colorsPuzzle: string[]

   size: TypeSize
}
export interface IPuzzleCell {
   idx: number
   idxRow: number
   idxColumn: number
   value: number
}
export interface IPuzzleHint {
   solved: boolean
   animation: boolean
   hints: IPuzzleHintItem[]
}
export interface IPuzzleHintItem {
   value: number

   solved: boolean
   animation: boolean
}

function populatePuzzleFromSource(_puzzle: IPuzzleDraft): IPopulatedPuzzle {
   const { game_grid, colors_grid, complexity, puzzle_name, size: puzzleSize, allowAutoMarking } = _puzzle

   if (!(game_grid instanceof Array)) throw Error('grid is not an array')

   const MAP_EMPTY_CELLS: { [key: number]: boolean } = {}

   const size = getSize(puzzleSize)

   const puzzle: IPopulatedPuzzle = {
      puzzleName: puzzle_name,
      puzzleSize,
      colorsPuzzle: colors_grid,
      totalNumberOfPaintedCells: 0,
      complexity,
      cells: [],
      cellsAnswers: [],
      rowHints: [],
      columnHints: [],

      size,
   }

   let rowKey = 0
   let columnKey = 0

   let solution = 0
   let currentVal = 0
   let lastVal = 0
   let lastValColumn = 0

   for (let cellKey = 0; cellKey < game_grid.length; cellKey++) {
      rowKey = Math.floor(cellKey / puzzleSize)
      columnKey = cellKey % puzzleSize

      solution = game_grid[cellKey] // 0 | 1
      currentVal = solution
      lastVal = columnKey > 0 ? game_grid[cellKey - 1] : 0

      lastValColumn = rowKey > 0 ? game_grid[cellKey - puzzleSize] : 0

      if (solution === 1) {
         puzzle.totalNumberOfPaintedCells++
      } else {
         MAP_EMPTY_CELLS[cellKey] = true
      }

      // populate cells

      puzzle.cells.push({
         idx: cellKey,
         idxColumn: columnKey,
         idxRow: rowKey,
         value: solution,
      })
      puzzle.cellsAnswers.push(PuzzleCellEnum.EMPTY)

      // populate row hints

      if (columnKey === 0) {
         puzzle.rowHints[rowKey] = { hints: [], solved: false, animation: false }
      }
      if (currentVal === 1 && lastVal === 0) {
         puzzle.rowHints[rowKey].hints.push({
            value: 1,

            solved: false,
            // start: columnKey,
            // end: columnKey,
            animation: false,
         })
      } else if (currentVal === 1 && lastVal === 1) {
         const cur = puzzle.rowHints[rowKey].hints
         cur[cur.length - 1].value++
         // cur[cur.length - 1].end++
      }

      // populate column hints

      if (rowKey === 0) {
         puzzle.columnHints[columnKey] = { solved: false, hints: [], animation: false }
      }

      if (currentVal === 1 && lastValColumn === 0) {
         puzzle.columnHints[columnKey].hints.push({
            value: 1,
            solved: false,

            // start: rowKey,
            // end: rowKey,
            animation: false,
         })
      } else if (currentVal === 1 && lastValColumn === 1) {
         const cur = puzzle.columnHints[columnKey].hints
         cur[cur.length - 1].value++
         // cur[cur.length - 1].end++
      }
   }

   if (allowAutoMarking) {
      const idxs = Object.keys(MAP_EMPTY_CELLS)
      const randomCellsForMarking = idxs
         .sort(() => Math.random() - 0.5)
         .slice(0, Math.floor(idxs.length / 2))
         .map(Number)

      randomCellsForMarking.forEach((idx) => {
         puzzle.cellsAnswers[idx] = PuzzleCellEnum.MARK
      })
   }
   return puzzle
}

// const populateRowHints = () => {}

export const getSize = (puzzleSize: number): TypeSize => {
   let size = MAP_SIZE[puzzleSize]

   if (size === undefined) {
      if (puzzleSize >= PuzzleSizesEnum.SMALL) {
         size = 's'
      } else if (puzzleSize >= PuzzleSizesEnum.MEDIUM) {
         size = 'm'
      } else if (puzzleSize >= PuzzleSizesEnum.LARGE) {
         size = 'l'
      } else {
         size = 'xl'
      }
   }
   return size
}
type TypePuzzleDraft = {
   /**
    * Format: bigint
    * @description Note:
    * This is a Primary Key.<pk/>
    */
   id: number
   /** Format: timestamp without time zone */
   created_at: string
   /** Format: timestamp without time zone */
   updated_at?: string
   /** Format: character varying */
   puzzle_name: string
   /** Format: character varying */
   complexity: string
   /** Format: ARRAY */
   game_grid: unknown[]
   /** Format: ARRAY */
   colors_grid: unknown[]
   /** Format: smallint */
   size: number
}

export interface IPuzzleDraft extends TypePuzzleDraft {
   game_grid: number[]
   colors_grid: string[]
   allowAutoMarking: boolean
}

export const puzzle: IPuzzleDraft = {
   id: 0,
   allowAutoMarking: true,
   created_at: new Date().toJSON(),
   size: PuzzleSizesEnum.MEDIUM,
   // category: PuzzleCategoriesEnum.PROGRESS,
   complexity: PuzzleComplexitiesEnum.EXPERT,
   puzzle_name: 'Баобаб',
   game_grid: [
      0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1,
      0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
   ],
   colors_grid: [
      '#cbf2ff',
      '#cbf2ff',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#32510d',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#32510d',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#87b586',
      '#676518',
      '#676518',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
   ],
}
export const puzzleLarge: IPuzzleDraft = {
   id: 0,
   allowAutoMarking: true,
   created_at: new Date().toJSON(),
   size: PuzzleSizesEnum.EXTRALARGE,
   // category: PuzzleCategoriesEnum.PROGRESS,
   complexity: PuzzleComplexitiesEnum.EXPERT,
   puzzle_name: 'Баобаб',
   game_grid: [
      0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1,
      0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0,
      0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
      1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1,
      0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
   ],
   colors_grid: [
      '#cbf2ff',
      '#cbf2ff',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#32510d',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#32510d',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#87b586',
      '#676518',
      '#676518',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#32510d',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#32510d',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#87b586',
      '#676518',
      '#676518',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#32510d',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#32510d',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#87b586',
      '#676518',
      '#676518',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#32510d',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#32510d',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#417506',
      '#417506',
      '#355d04',
      '#32510d',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#355d04',
      '#355d04',
      '#355d04',
      '#355d04',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#87b586',
      '#87b586',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#87b586',
      '#676518',
      '#676518',
      '#87b586',
      '#cbf2ff',
      '#87b586',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#8b562a',
      '#8b562a',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
      '#cbf2ff',
   ],
}

export const COLORS_PUZZLE = {
   STROKE_SECTION: '#000000',
   // STROKE_GAME_GRID_FILLED: '#152942',
   STROKE_GAME_GRID_FILLED: '#162a43',
   STROKE_GAME_GRID_EMPTY: '#cbcfd8',
   STROKE_ANY_GRID: '#cbcfd8',

   FILL_GAME_GRID_FILLED: '#344861',
   FILL_GAME_GRID_EMPTY: '#ffffff',
}
