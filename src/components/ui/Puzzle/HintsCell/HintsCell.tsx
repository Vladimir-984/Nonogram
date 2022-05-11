import React from 'react'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'

import './HintsCell.css'

interface HintsCellProps {
   mode: 'vertical' | 'horizontal'
   solved: boolean
   animation: boolean
}

export const HintsCell: React.FC<HintsCellProps> = ({ children, mode, animation, solved }) => {
   return (
      <div
         className={classNamesString(
            'HintsCell',
            `HintsCell--m-${mode}`,
            animation && 'HintsCell--animation',
            solved && 'HintsCell--solved'
         )}
      >
         {children}
      </div>
   )
}
