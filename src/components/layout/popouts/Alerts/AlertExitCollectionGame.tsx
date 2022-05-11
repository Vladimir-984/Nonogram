import React from 'react'

import { Button, Headline, NavIdProps } from '@vkontakte/vkui'
import { useRouter } from '@happysanta/router'

import { ActionsContainer } from '../../../ui/ActionsContainer/ActionsContainer'
import { ButtonContent } from '../../../ui/ButtonContent/ButtonContent'
import { AlertContentContainer } from 'components/ui/AlertContentContainer/AlertContentContainer'
import { Alert } from 'components/ui/Alert/Alert'

export const AlertExitCollectionGame: React.FC<NavIdProps> = ({ nav }) => {
   const router = useRouter()

   const [closing, setClosing] = React.useState(false)

   const onClose = () => router.popPageIfPopup()

   const onClickExit = () => {
      setClosing(true)
   }
   const onClickClose = () => setClosing(true)

   return (
      <Alert onClose={onClose} closing={closing}>
         <AlertContentContainer>
            <Headline weight='regular' className='Typography--subhead'>
               Вы уверены?
            </Headline>
            <Headline weight='regular' className='Typography--subhead'>
               Если вы выйдете, текущий прогресс будет потерян.
            </Headline>
         </AlertContentContainer>
         <ActionsContainer>
            <Button
               size='l'
               mode='primary'
               appearance='accent'
               stretched
               className='Button--round'
               onClick={onClickExit}
            >
               <ButtonContent>Покинуть уровень</ButtonContent>
            </Button>
            <Button
               size='l'
               mode='tertiary'
               appearance='accent'
               stretched
               className='Button--round'
               onClick={onClickClose}
            >
               <ButtonContent>Отмена</ButtonContent>
            </Button>
         </ActionsContainer>
      </Alert>
   )
}
