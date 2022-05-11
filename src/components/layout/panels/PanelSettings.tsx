import { useRouter } from '@happysanta/router'
import { Icon28ChevronBack } from '@vkontakte/icons'
import {
   Card,
   CardGrid,
   FixedLayout,
   Group,
   Panel,
   PanelHeader,
   PanelProps,
   Separator,
   SimpleCell,
   Switch,
} from '@vkontakte/vkui'
import { PanelHeaderButton } from 'components/ui/PanelHeaderButton/PanelHeaderButton'
import { useAppSelector } from 'hooks/redux'
import React from 'react'
import { PAGE_GAME_MODE } from 'router/routes'
import { TypeGameMode } from 'store/slices/appSlice'

type TypeMapGameMode = {
   [key in TypeGameMode]: string
}
export const MAP_GAME_MODE: TypeMapGameMode = {
   standard: 'Стандартный',
   classic: 'Классический',
}

export const PanelSettings: React.FC<PanelProps> = (panelProps) => {
   const router = useRouter()
   const gameMode = useAppSelector((state) => state.app.gameMode)

   const onClickBack = () => router.popPage()
   const onClickSubmit = () => router.popPageTo(-2)
   const onClickGameMode = () => {
      router.pushPage(PAGE_GAME_MODE)
   }
   return (
      <Panel {...panelProps} className='Panel--background'>
         <PanelHeader
            separator={false}
            left={
               <PanelHeaderButton primary={false} label={'Назад'} onClick={onClickBack}>
                  <Icon28ChevronBack />
               </PanelHeaderButton>
            }
            right={<PanelHeaderButton onClick={onClickSubmit}>Готово</PanelHeaderButton>}
         >
            Настройки
         </PanelHeader>
         <FixedLayout vertical='top'>
            <Separator wide />
         </FixedLayout>
         <Group mode='plain'>
            <Group mode='plain' separator='hide'>
               <CardGrid size='l'>
                  <Card>
                     <SimpleCell disabled after={<Switch />}>
                        Звуки
                     </SimpleCell>
                     <Separator wide />
                     <SimpleCell disabled after={<Switch />}>
                        Автоблокировка
                     </SimpleCell>
                  </Card>
               </CardGrid>
            </Group>
            <Group mode='plain' separator='hide'>
               <CardGrid size='l'>
                  <Card>
                     <SimpleCell
                        activeEffectDelay={200}
                        activeMode='Tappable--active-background-highlighted-darken'
                        expandable
                        indicator={MAP_GAME_MODE[gameMode]}
                        onClick={onClickGameMode}
                     >
                        Режим игры
                     </SimpleCell>
                     <Separator wide />
                     <SimpleCell disabled after={<Switch />}>
                        Автозачёркивание
                     </SimpleCell>
                  </Card>
               </CardGrid>
            </Group>
         </Group>
      </Panel>
   )
}
