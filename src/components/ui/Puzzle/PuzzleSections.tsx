import React from 'react'
import { COLORS_PUZZLE } from 'utils/puzzle'

interface PuzzleSectionsProps {
   puzzleSize: number
}
export const PuzzleSections: React.FC<PuzzleSectionsProps> = ({ puzzleSize }) => {
   const canvasSectionsRef = React.useRef<HTMLCanvasElement>(null)

   React.useLayoutEffect(() => {
      if (!(canvasSectionsRef.current instanceof HTMLCanvasElement)) return

      const ctxSections = canvasSectionsRef.current.getContext('2d')
      if (!ctxSections) return

      canvasSectionsRef.current.width = canvasSectionsRef.current.clientWidth
      canvasSectionsRef.current.height = canvasSectionsRef.current.clientHeight
      drawSections(ctxSections, puzzleSize)
   }, [puzzleSize, canvasSectionsRef])

   return <canvas ref={canvasSectionsRef} className='Puzzle Puzzle--sections' />
}

const drawSections = (ctx: CanvasRenderingContext2D, puzzleSize: number) => {
   const sectionsInLine = puzzleSize / 5
   const sizeSection = ctx.canvas.clientWidth / sectionsInLine

   ctx.beginPath()

   ctx.lineWidth = 2
   ctx.strokeStyle = COLORS_PUZZLE.STROKE_SECTION

   for (let idx = 1; idx < sectionsInLine; idx++) {
      const x = idx * sizeSection
      const y = idx * sizeSection

      ctx.moveTo(x, 0)
      ctx.lineTo(x, ctx.canvas.clientHeight)

      ctx.moveTo(0, y)
      ctx.lineTo(ctx.canvas.clientWidth, y)
   }

   ctx.closePath()
   ctx.stroke()

   ctx.lineWidth = 2

   ctx.strokeRect(1, 1, ctx.canvas.clientWidth - 2, ctx.canvas.clientHeight - 2)
}
