import React from 'react'
import { NavIdProps, Gallery, Button, Title } from '@vkontakte/vkui'
import { useRouter } from '@happysanta/router'
import { AlertContentContainer } from 'components/ui/AlertContentContainer/AlertContentContainer'
import { ButtonContent } from 'components/ui/ButtonContent/ButtonContent'

import './AlertStyles.css'
import { Alert } from 'components/ui/Alert/Alert'
export const AlertPreviewCollection: React.FC<NavIdProps> = () => {
   const router = useRouter()

   const [closing, setClosing] = React.useState(false)

   const [slideIndex, setSlideIndex] = React.useState(0)

   const onClose = () => router.popPageIfPopup()

   const onClickNextSlide = () => setSlideIndex(1)
   const onClickClose = () => setClosing(true)
   return (
      <Alert onClose={onClose} closing={closing} className='AlertPreviewCollection'>
         <AlertContentContainer>
            <Title level='1' weight='1' className='AlertPreviewCollection__title'>
               Добро пожаловать в Коллекцию
            </Title>
         </AlertContentContainer>
         <Gallery
            slideIndex={slideIndex}
            onChange={setSlideIndex}
            showArrows={false}
            isDraggable
            slideWidth='100%'
            align='center'
            bullets='light'
         >
            <div>
               <Title level='2' weight='3' className='AlertPreviewCollection__title'>
                  Собирайте картинки для коллекции и отслеживайте прогресс в игре
               </Title>
            </div>
            <div>
               <Title level='2' weight='3' className='AlertPreviewCollection__title'>
                  Решайте свои любимые уровни заново
               </Title>
            </div>
         </Gallery>
         {slideIndex === 0 && (
            <Button
               size='l'
               mode='primary'
               appearance='accent'
               stretched
               className='Button--round'
               onClick={onClickNextSlide}
            >
               <ButtonContent>Продолжить</ButtonContent>
            </Button>
         )}
         {slideIndex === 1 && (
            <Button
               size='l'
               mode='primary'
               appearance='accent'
               stretched
               className='Button--round'
               onClick={onClickClose}
            >
               <ButtonContent>ОК</ButtonContent>
            </Button>
         )}
      </Alert>
   )
}
