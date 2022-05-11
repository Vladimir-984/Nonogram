import React from 'react'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'

import { ContainerSegment } from '../ContainerSegment/ContainerSegment'

import { Health } from './Health/Health'
import './GameHeader.css'
import { CountPaintedCells } from './CountPaintedCells/CountPaintedCells'
export const GameHeader: React.FC = () => {
   return (
      <ContainerSegment className={classNamesString('GameHeader')}>
         <div className='GameHeader__in'>
            {/* <Health /> */}
            <CountPaintedCells />
         </div>
      </ContainerSegment>
   )
}
