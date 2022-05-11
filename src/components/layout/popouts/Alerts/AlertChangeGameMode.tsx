import React from 'react'

import { NavIdProps, Title } from '@vkontakte/vkui'
import { useRouter } from '@happysanta/router'
import { Alert } from 'components/ui/Alert/Alert'
export const AlertChangeGameMode: React.FC<NavIdProps> = ({ nav }) => {
   const router = useRouter()
   const onClose = () => router.popPageIfPopup()

   return (
      <Alert onClose={onClose} actions={[{ mode: 'cancel', title: 'ОК', autoclose: true }]}>
         <Title level='2' weight='1'>
            Изменения будут применены в следующей игре
         </Title>
      </Alert>
   )
}
