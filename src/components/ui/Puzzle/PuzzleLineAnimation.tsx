import React from 'react'

interface PuzzleLineAnimationProps {}

export const PuzzleLineAnimation: React.FC<PuzzleLineAnimationProps> = () => {
   const canvasLineAnimationRef = React.useRef<HTMLCanvasElement>(null)

   React.useLayoutEffect(() => {
      if (!(canvasLineAnimationRef.current instanceof HTMLCanvasElement)) return

      const ctx = canvasLineAnimationRef.current.getContext('2d')

      if (!ctx) return

      ctx.fillStyle = 'rgba(255,255,255,.2)'
   }, [])

   return <canvas ref={canvasLineAnimationRef} className='Puzzle Puzzle--line-animation' />
}
