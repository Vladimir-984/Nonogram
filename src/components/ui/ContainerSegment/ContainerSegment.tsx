import React from 'react'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'

import './ContainerSegment.css'

interface ContainerSegmentProps extends React.AllHTMLAttributes<HTMLDivElement> {}

export const ContainerSegment: React.FC<ContainerSegmentProps> = ({ className, children, ...restProps }) => {
   return (
      <div className={classNamesString('ContainerSegment', className)} {...restProps}>
         {children}
      </div>
   )
}
