import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import React from 'react'
import './PuzzleContainer.css'

interface PuzzleContainerProps extends React.AllHTMLAttributes<HTMLDivElement> {}

export const PuzzleContainer: React.FC<PuzzleContainerProps> = ({ children, className, ...restProps }) => {
   return <div className={classNamesString('PuzzleContainer', className)}>{children}</div>
}
