import { ActionSheetItem } from '@vkontakte/vkui'
import React from 'react'

export const CloseItem: React.FC = () => {
   return (
      <ActionSheetItem mode='cancel' autoclose>
         Отмена
      </ActionSheetItem>
   )
}
