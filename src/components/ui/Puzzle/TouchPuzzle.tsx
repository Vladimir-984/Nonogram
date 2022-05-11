import React from 'react'
import { Touch } from '@vkontakte/vkui'
import { TouchEventHandler } from '@vkontakte/vkui/dist/components/PullToRefresh/PullToRefresh'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import { touchEnabled } from '@vkontakte/vkui/dist/lib/touch'
import { IPuzzleCell, PuzzleCellEnum } from 'utils/puzzle'
import { useFormContext, useWatch } from 'react-hook-form'
import { IGameForm } from 'components/layout/panels/PanelGame'
import { TypeGameAction, TypeGameMode } from 'store/slices/appSlice'
// import { useGameDispatch, useGamePuzzleCells, useGamePuzzleSize } from './PuzzleWrapper/PuzzleWrapper'

interface TouchPuzzleProps extends React.AllHTMLAttributes<HTMLDivElement> {
   // puzzleSize: PuzzleSizesEnum
   // puzzleCells: IPuzzleCell[]
}

type TypeGestureAction = 'fill' | 'mark' | 'hint' | 'unfill' | 'unmark' | 'fillMarked' | 'markFilled'

type TypeTouchedCells = { [key: number]: boolean }

interface IGesture {
   touchedCells: TypeTouchedCells
   startCellIdx: number
   xStartEdgeIndex: number
   xEndEdgeIndex: number
   action: TypeGestureAction
   isX: boolean
   isY: boolean

   cellsAnswers: PuzzleCellEnum[]
}
const touchedCells: TypeTouchedCells = {}

const defaultGesture: IGesture = {
   touchedCells: { ...touchedCells },
   startCellIdx: -1,
   xStartEdgeIndex: -1,
   xEndEdgeIndex: -1,
   action: 'fill',
   isX: false,
   isY: false,
   cellsAnswers: [],
}

const fillTouchedCells = (maxIdx: number) => {
   const touchedCells: TypeTouchedCells = {}

   for (let idx = 0; idx <= maxIdx; ++idx) {
      touchedCells[idx] = false
   }

   return touchedCells
}

export const TouchPuzzle: React.FC<TouchPuzzleProps> = ({ children, className, ...restProps }) => {
   // const gameDispatch = useGameDispatch()
   // const puzzleCells = useGamePuzzleCells()
   // const puzzleSize = useGamePuzzleSize()
   const { getValues, setValue } = useFormContext<IGameForm>()

   const puzzleSize = getValues('puzzleSize')
   const gameMode = useWatch<IGameForm, 'gameMode'>({ name: 'gameMode' })
   const gameAction = useWatch<IGameForm, 'gameAction'>({ name: 'gameAction' })

   const maxIdx = React.useRef(puzzleSize ** 2 - 1).current

   const touchRef = React.useRef<HTMLDivElement>(null)

   const touchedCellsRef = React.useRef(fillTouchedCells(maxIdx)).current

   const gesture = React.useRef<IGesture>({ ...defaultGesture, touchedCells: { ...touchedCellsRef } })

   console.log('render touch', gameMode, gameAction, puzzleSize, maxIdx)

   const setSolution = (idx: number) => {
      const cellsAnswers = gesture.current.cellsAnswers

      switch (gesture.current.action) {
         case 'fill': {
            if (cellsAnswers[idx] === PuzzleCellEnum.EMPTY) {
               cellsAnswers[idx] = PuzzleCellEnum.FILL
            }
            break
         }
         case 'unfill': {
            if (cellsAnswers[idx] === PuzzleCellEnum.FILL) {
               cellsAnswers[idx] = PuzzleCellEnum.EMPTY
            }
            break
         }
         case 'mark': {
            if (cellsAnswers[idx] === PuzzleCellEnum.EMPTY) {
               cellsAnswers[idx] = PuzzleCellEnum.MARK
            }
            break
         }
         case 'unmark': {
            if (cellsAnswers[idx] === PuzzleCellEnum.MARK) {
               cellsAnswers[idx] = PuzzleCellEnum.EMPTY
            }
            break
         }
         case 'fillMarked': {
            if (cellsAnswers[idx] === PuzzleCellEnum.MARK) {
               cellsAnswers[idx] = PuzzleCellEnum.FILL
            }
            break
         }
         case 'markFilled': {
            if (cellsAnswers[idx] === PuzzleCellEnum.FILL) {
               cellsAnswers[idx] = PuzzleCellEnum.MARK
            }
            break
         }
         case 'hint': {
            break
         }
      }

      setValue('cellsAnswers', cellsAnswers)
   }

   const onStart: TouchEventHandler = (e) => {
      let x = 0
      let y = 0
      let idx = -1

      if (touchEnabled()) {
         const {
            originalEvent: { changedTouches },
         } = e
         const { pageX, pageY } = changedTouches[0]
         x = getX(pageX, touchRef.current!)
         y = getY(pageY, touchRef.current!)

         idx = calcIdx(x, y, touchRef.current!.clientWidth, puzzleSize)
      } else {
         const {
            originalEvent: { pageX, pageY },
         } = e
         x = getX(pageX, touchRef.current!)
         y = getY(pageY, touchRef.current!)

         idx = calcIdx(x, y, touchRef.current!.clientWidth, puzzleSize)
      }
      const cellsAnswers = getValues('cellsAnswers')

      gesture.current.cellsAnswers = [...cellsAnswers]

      const xStartEdgeIndex = idx - (idx % puzzleSize)

      gesture.current.startCellIdx = idx
      gesture.current.touchedCells[idx] = true

      gesture.current.xStartEdgeIndex = xStartEdgeIndex
      gesture.current.xEndEdgeIndex = xStartEdgeIndex + puzzleSize
      gesture.current.action = getAction({ gameAction, gameMode, answer: cellsAnswers[idx] })

      setSolution(idx)
   }

   const onMove: TouchEventHandler = (e) => {
      const { xStartEdgeIndex, xEndEdgeIndex, isX, isY, startCellIdx, touchedCells } = gesture.current

      let x = 0
      let y = 0
      let idxTarget = -1
      if (touchEnabled()) {
         const {
            originalEvent: { changedTouches },
         } = e
         const { pageX, pageY } = changedTouches[0]
         x = getX(pageX, touchRef.current!)
         y = getY(pageY, touchRef.current!)
         idxTarget = calcIdx(x, y, touchRef.current!.clientWidth, puzzleSize)
      } else {
      }

      if (touchedCells[idxTarget]) return

      const _isX = idxTarget >= xStartEdgeIndex && idxTarget <= xEndEdgeIndex
      const _isY = startCellIdx % puzzleSize === idxTarget % puzzleSize

      let idx: number = -1

      if (!isX && !isY && (_isX || _isY)) {
         //если ещё не определились
         gesture.current.isX = _isX
         gesture.current.isY = _isY
         gesture.current.touchedCells[idxTarget] = true

         idx = idxTarget
      } else if ((isX && _isX) || (isY && _isY)) {
         //определились

         gesture.current.touchedCells[idxTarget] = true
         idx = idxTarget
      } else {
         //уехали
         if (isX) {
            idx = xStartEdgeIndex + (idxTarget % puzzleSize)
         } else if (isY) {
            idx = Math.floor(idxTarget / puzzleSize) * puzzleSize + (startCellIdx % puzzleSize)
         }
         gesture.current.touchedCells[idx] = true
      }

      if (idx > -1 && idx <= maxIdx) {
         gesture.current.touchedCells[idx] = true
         setSolution(idx)
      }
   }

   const onEnd: TouchEventHandler = (e) => {
      gesture.current = {
         ...defaultGesture,
         touchedCells: { ...touchedCellsRef },
      }
   }
   return (
      <Touch
         getRootRef={touchRef}
         className={classNamesString('TouchPuzzle', className)}
         {...restProps}
         onStart={onStart}
         onMove={onMove}
         onEnd={onEnd}
      >
         {children}
      </Touch>
   )
}

const getX = (pageX: number, el: HTMLDivElement): number => {
   const { offsetLeft, offsetWidth } = el
   if (pageX < offsetLeft) return 0
   else if (pageX >= offsetWidth + offsetLeft) return offsetWidth
   return pageX - offsetLeft
}
const getY = (pageY: number, el: HTMLDivElement): number => {
   const { offsetTop, offsetHeight } = el
   if (pageY < offsetTop) return 0
   else if (pageY >= offsetHeight + offsetTop) return offsetHeight
   return pageY - offsetTop
}
const calcIdx = (x: number, y: number, sizeCanvas: number, puzzleSize: number): number => {
   const sizeRect = sizeCanvas / puzzleSize
   if (x >= sizeCanvas) x -= 1
   if (y >= sizeCanvas) y -= 1

   const row = Math.floor(y / sizeRect)
   const column = Math.floor(x / sizeRect)
   const index = row * puzzleSize + column

   return index
}

interface IGetAction {
   answer: PuzzleCellEnum
   gameAction: TypeGameAction
   gameMode: TypeGameMode
   gestureAction?: TypeGestureAction
}
const getAction = ({ gameAction, gameMode, answer }: IGetAction): TypeGestureAction => {
   let action: TypeGestureAction = 'fill'
   if (gameAction === 'fill') {
      if (gameMode === 'classic') {
         if (answer === PuzzleCellEnum.FILL) action = 'unfill'
         else if (answer === PuzzleCellEnum.MARK) action = 'fillMarked'
      } else {
         action = 'fill'
      }
   } else if (gameAction === 'mark') {
      if (gameMode === 'classic') {
         if (answer === PuzzleCellEnum.MARK) action = 'unmark'
         else if (answer === PuzzleCellEnum.FILL) action = 'markFilled'
         else {
            action = 'mark'
         }
      } else {
         action = 'mark'
      }
   } else {
      action = 'hint'
   }

   return action
}
