import React from 'react'
import { Button, Headline, NavIdProps } from '@vkontakte/vkui'
import { useRouter } from '@happysanta/router'
import { ActionsContainer } from 'components/ui/ActionsContainer/ActionsContainer'
import { ButtonContent } from 'components/ui/ButtonContent/ButtonContent'
import { AlertContentContainer } from 'components/ui/AlertContentContainer/AlertContentContainer'
import { Alert } from 'components/ui/Alert/Alert'

export const AlertHideBaseLevels: React.FC<NavIdProps> = ({ nav }) => {
   const router = useRouter()

   const [closing, setClosing] = React.useState(false)

   const onClose = () => router.popPageIfPopup()

   const onClickHide = () => {
      setClosing(true)
   }

   const onClickClose = () => {
      setClosing(true)
   }

   return (
      <Alert onClose={onClose} closing={closing}>
         <AlertContentContainer>
            <Headline weight='regular' className='Typography--subhead'>
               Вы уверены?
            </Headline>
            <Headline weight='regular' className='Typography--subhead'>
               Если вы скроете базовые уровни, текущий прогресс будет потерян.
            </Headline>
         </AlertContentContainer>
         <ActionsContainer>
            <Button
               activeEffectDelay={200}
               size='l'
               mode='primary'
               appearance='accent'
               stretched
               className='Button--round'
               onClick={onClickHide}
            >
               <ButtonContent>Скрыть базовые уровни</ButtonContent>
            </Button>
            <Button
               activeEffectDelay={200}
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
