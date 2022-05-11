import React from 'react'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import './Container.css'

export const Container: React.FC = ({ children }) => {
   return <div className={classNamesString('Container')}>{children}</div>
}
