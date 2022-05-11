import React from 'react'
import { Tappable } from '@vkontakte/vkui'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import './ActionButton.css'

interface ActionButtonProps {
   mode?: 'click' | 'selectable'
   value?: string
   optionValue?: string
   onClick?: React.MouseEventHandler
   indicator?: React.ReactNode
}

export const ActionButton: React.FC<ActionButtonProps> = ({
   children,
   mode,
   value,
   optionValue,
   onClick,
   indicator,
}) => {
   const isSelected = value !== undefined && optionValue !== undefined && value === optionValue
   let hasActive = mode === 'click'

   return (
      <Tappable
         onClick={onClick}
         activeEffectDelay={200}
         hasActive={hasActive}
         //  hasHover={hasHover}
         hoverMode='opacity'
         activeMode='ActionButton--active'
         className={classNamesString('ActionButton', `ActionButton--m-${mode}`, isSelected && 'ActionButton--selected')}
      >
         <div className='ActionButton__content'>{children}</div>
         {!!indicator && <div className='ActionButton__indicator'>{indicator}</div>}
      </Tappable>
   )
}
