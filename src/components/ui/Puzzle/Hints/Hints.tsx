import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import React from 'react'
import { TypeSize } from '../GameWrapper/GameWrapper'
import './Hints.css'
interface HintsProps {
   mode: 'vertical' | 'horizontal'
   size: TypeSize
}
export const Hints: React.FC<HintsProps> = ({ mode, size, children }) => {
   return <div className={classNamesString('Hints', `Hints--sz-${size}`, `Hints--m-${mode}`)}>{children}</div>
}
