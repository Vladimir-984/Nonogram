import { useRouter } from '@happysanta/router'
import { ActionSheet, ActionSheetItem, Card, NavIdProps } from '@vkontakte/vkui'
import React from 'react'
import { CloseItem } from './CloseItem'

export const ActionSheetPuzzle: React.FC<NavIdProps> = () => {
   const router = useRouter()
   const onClose = () => router.popPageIfPopup()
   return (
      <>
         <Card className='ActionSheetPuzzle'>
            <div style={{ width: 250, height: 250 }} />
         </Card>
         <ActionSheet
            // className='ActionSheetPuzzle'
            onClose={onClose}
            iosCloseItem={<CloseItem />}
         >
            <ActionSheetItem>Начать заново</ActionSheetItem>
         </ActionSheet>
      </>
   )
}
