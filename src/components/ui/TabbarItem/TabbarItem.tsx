import * as React from 'react'

import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import { hasReactNode } from '@vkontakte/vkui/dist/lib/utils'
import { HasComponent, HasRootRef } from '@vkontakte/vkui/dist/types'

import './TabbarItem.css'
import { Tappable } from '@vkontakte/vkui'

export interface TabbarItemProps
   extends React.AllHTMLAttributes<HTMLButtonElement>,
      HasRootRef<HTMLButtonElement>,
      HasComponent {
   selected?: boolean
   /**
    * Тест рядом с иконкой
    */
   text?: React.ReactNode
   /**
    * Индикатор над иконкой. Принимает `<Badge mode="prominent" />` или `<Counter size="s" mode="prominent" />`
    */
   indicator?: React.ReactNode
}

export const TabbarItem: React.FunctionComponent<TabbarItemProps> = ({
   children,
   selected,
   indicator,
   text,
   className,
   disabled,
   getRootRef,
   type,
   ...restProps
}: TabbarItemProps) => {
   return (
      <Tappable
         {...restProps}
         disabled={disabled}
         role='presentation'
         Component='div'
         hoverMode='Tappable--hover-brightness'
         activeMode='Tappable--active-brightness'
         activeEffectDelay={200}
         hasHover={false}
         className={classNamesString(
            'TabbarItem',
            'Tappable--brightness',
            className,
            selected && 'TabbarItem--selected',
            !!text && 'TabbarItem--text'
         )}
      >
         <div className='TabbarItem__in'>
            <div className='TabbarItem__icon'>
               {children}
               <div className='TabbarItem__label'>{hasReactNode(indicator) && indicator}</div>
            </div>
            {text && <div className='TabbarItem__text'>{text}</div>}
         </div>
      </Tappable>
   )
}
