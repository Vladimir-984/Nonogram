import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import React from 'react'
import './CellRect.css'
interface CellRectProps {
   size?: number
   round?: boolean
   className?: string
}
export const CellRect: React.FC<CellRectProps> = ({ round = false, size = 28, className }) => {
   return (
      <div
         className={classNamesString('CellRect', className, round && 'CellRect--round')}
         style={{ width: size, height: size }}
      />
   )
}
