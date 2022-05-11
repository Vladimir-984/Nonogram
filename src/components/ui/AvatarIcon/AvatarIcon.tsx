import React from 'react'
import { Icon24AddProps } from '@vkontakte/icons/dist/24/add'
import { Avatar } from '@vkontakte/vkui'

import './AvatarIcon.css'
interface AvatarIconProps {
   color: 'red' | 'green' | 'blue' | 'orange'
}
export const AvatarIcon: React.FC<AvatarIconProps> = ({ children, color }) => {
   return (
      <Avatar size={32} mode='image' shadow={false} className={`AvatarIcon--${color}`}>
         {React.isValidElement(children) &&
            React.cloneElement<Icon24AddProps>(children, { fill: '#fff', width: 24, height: 24 })}
      </Avatar>
   )
}
