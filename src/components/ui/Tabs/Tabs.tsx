import React from 'react'

import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import { HasRootRef } from '@vkontakte/vkui/dist/types'

import './Tabs.css'

interface TabsProps extends React.HTMLAttributes<HTMLDivElement>, HasRootRef<HTMLDivElement> {}

export const Tabs: React.FC<TabsProps> = ({ children, getRootRef, ...restProps }: TabsProps) => {
   return (
      <div {...restProps} ref={getRootRef} className={classNamesString('Tabs')}>
         <div className='Tabs__in'>{children}</div>
      </div>
   )
}
