import React from 'react'
import { Subhead, Title } from '@vkontakte/vkui'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import './ButtonContent.css'
interface ButtonContentProps {
   subhead?: string
}
export const ButtonContent: React.FC<ButtonContentProps> = ({ children, subhead }) => {
   return (
      <div className={classNamesString('ButtonContent', !!subhead && 'ButtonContent--with-subhead')}>
         <Title level='3' weight='2'>
            {children}
         </Title>
         {!!subhead && <Subhead weight='2'>{subhead}</Subhead>}
      </div>
   )
}
