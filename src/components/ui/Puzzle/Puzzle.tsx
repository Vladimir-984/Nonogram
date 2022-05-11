import React from 'react'
import { calcX, calcY, COLORS_PUZZLE, PuzzleCellEnum, IPuzzleCell, PuzzleSizesEnum } from 'utils/puzzle'
import './Puzzle.css'
import { PuzzleLineAnimation } from './PuzzleLineAnimation'
import { PuzzleSections } from './PuzzleSections'

interface PuzzleProps {
   puzzleSize: PuzzleSizesEnum
   cellsAnswers: PuzzleCellEnum[]
}

export const Puzzle: React.FC<PuzzleProps> = ({ cellsAnswers, puzzleSize }) => {
   const canvasRef = React.useRef<HTMLCanvasElement>(null!)

   React.useLayoutEffect(() => {
      drawCanvas()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [cellsAnswers])

   const drawCanvas = () => {
      if (!(canvasRef.current instanceof HTMLCanvasElement)) return

      const ctx = canvasRef.current.getContext('2d')

      if (!ctx) return

      canvasRef.current.width = canvasRef.current.clientWidth
      canvasRef.current.height = canvasRef.current.clientHeight

      drawCells(ctx, puzzleSize, cellsAnswers)
   }

   return (
      <>
         <canvas ref={canvasRef} className='Puzzle' />
         <PuzzleSections puzzleSize={puzzleSize} />
         <PuzzleLineAnimation />
      </>
   )
}

const drawCells = (ctx: CanvasRenderingContext2D, puzzleSize: number, cells: PuzzleCellEnum[]) => {
   const sizeRect = ctx.canvas.clientWidth / puzzleSize

   for (let idx = 0; idx < cells.length; idx++) {
      const x = calcX(idx, puzzleSize, sizeRect)
      const y = calcY(idx, puzzleSize, sizeRect)

      ctx.lineWidth = 1
      const solution = cells[idx]

      ctx.fillStyle = getFillStyleRect(solution)
      ctx.strokeStyle = getStrokeStyleRect(solution)

      ctx.strokeRect(x, y, sizeRect, sizeRect)

      ctx.fillRect(x, y, sizeRect, sizeRect)

      if (solution === PuzzleCellEnum.MARK) {
         drawMark(ctx, x, y, sizeRect)
      }
   }
}

const drawMark = (ctx: CanvasRenderingContext2D, x: number, y: number, sizeRect: number) => {
   ctx.strokeStyle = COLORS_PUZZLE.FILL_GAME_GRID_FILLED
   ctx.lineWidth = 2

   const x1Start = x + sizeRect * 0.25
   const y1Start = y + sizeRect * 0.25

   const x1End = x + sizeRect * 0.75
   const y1End = y + sizeRect * 0.75

   const x2Start = x + sizeRect * 0.75
   const y2Start = y + sizeRect * 0.25

   const x2End = x + sizeRect * 0.25
   const y2End = y + sizeRect * 0.75

   ctx.beginPath()
   ctx.moveTo(x1Start, y1Start)
   ctx.lineTo(x1End, y1End)

   ctx.moveTo(x2Start, y2Start)
   ctx.lineTo(x2End, y2End)
   ctx.closePath()
   ctx.stroke()
}

const getFillStyleRect = (solution: PuzzleCellEnum): string => {
   if (solution === PuzzleCellEnum.FILL) return COLORS_PUZZLE.FILL_GAME_GRID_FILLED
   return COLORS_PUZZLE.FILL_GAME_GRID_EMPTY
}
const getStrokeStyleRect = (solution: PuzzleCellEnum): string => {
   if (solution === PuzzleCellEnum.FILL) return COLORS_PUZZLE.STROKE_GAME_GRID_FILLED
   return COLORS_PUZZLE.STROKE_GAME_GRID_EMPTY
}
