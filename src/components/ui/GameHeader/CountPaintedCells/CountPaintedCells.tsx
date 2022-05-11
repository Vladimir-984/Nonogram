import React from 'react'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import { CellRect } from 'components/ui/CellRect/CellRect'
import { Title } from '@vkontakte/vkui'

import './CountPaintedCells.css'
interface CountPaintedCellsProps {}

export const CountPaintedCells: React.FC<CountPaintedCellsProps> = () => {
   const onAnimationEnd = () => {}

   return (
      <div className={classNamesString('CountPaintedCells')}>
         <CellRect className='CountPaintedCells__rect' size={24} />
         <Title className='CountPaintedCells__text' level='2' weight='2'>{`1/32`}</Title>
         <div className='CountPaintedCells__after'>
            <Title
               onAnimationEnd={onAnimationEnd}
               className={classNamesString('CountPaintedCells__error', 'CountPaintedCells__error--animation')}
               level='2'
               weight='2'
            >{`(!)`}</Title>
         </div>
      </div>
   )
}
