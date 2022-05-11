import React from 'react'

import { Headline, Tappable } from '@vkontakte/vkui'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'

import './TabsItem.css'

interface TabsItemProps extends React.HTMLAttributes<HTMLElement> {
   selected?: boolean
}

export const TabsItem: React.FC<TabsItemProps> = ({ children, selected = false, ...restProps }: TabsItemProps) => {
   return (
      <Tappable
         {...restProps}
         className={classNamesString('TabsItem', 'Tappable--brightness', selected && 'TabsItem--selected')}
         hoverMode='Tappable--hover-brightness'
         activeMode='Tappable--active-brightness'
         activeEffectDelay={200}
         focusVisibleMode='inside'
      >
         <Headline Component='span' className='TabsItem__in' weight='medium'>
            {children}
         </Headline>
      </Tappable>
   )
}
