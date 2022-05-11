import { useRouter } from '@happysanta/router'
import { Icon24Education, Icon24Help, Icon24Info, Icon24Settings } from '@vkontakte/icons'
import {
   Avatar,
   Card,
   CardGrid,
   FixedLayout,
   Group,
   Panel,
   PanelHeader,
   PanelProps,
   Separator,
   SimpleCell,
} from '@vkontakte/vkui'
import { AvatarIcon } from 'components/ui/AvatarIcon/AvatarIcon'
import { PanelHeaderButton } from 'components/ui/PanelHeaderButton/PanelHeaderButton'
import React from 'react'
import { PAGE_SETTINGS } from 'router/routes'

export const PanelOptions: React.FC<PanelProps> = (panelProps) => {
   const router = useRouter()
   const onClickSubmit = () => {
      router.popPage()
   }
   const onClickSettings = () => {
      router.pushPage(PAGE_SETTINGS)
   }
   return (
      <Panel {...panelProps} className='Panel--background'>
         <PanelHeader separator={false} right={<PanelHeaderButton onClick={onClickSubmit}>Готово</PanelHeaderButton>}>
            Опции
         </PanelHeader>
         <FixedLayout vertical='top'>
            <Separator wide />
         </FixedLayout>

         <Group mode='plain'>
            <Group mode='plain' separator='hide'>
               <CardGrid size='l'>
                  <Card mode='tint'>
                     <SimpleCell
                        activeEffectDelay={200}
                        activeMode='Tappable--active-background-highlighted-darken'
                        onClick={onClickSettings}
                        before={
                           <AvatarIcon color='red'>
                              <Icon24Settings />
                           </AvatarIcon>
                        }
                        expandable
                     >
                        Настройки
                     </SimpleCell>
                     <Separator wide className='Separator--after-avatar' />
                     <SimpleCell
                        activeEffectDelay={200}
                        activeMode='Tappable--active-background-highlighted-darken'
                        before={
                           <AvatarIcon color='orange'>
                              <Icon24Education />
                           </AvatarIcon>
                        }
                        expandable
                     >
                        Правила игры
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
                        before={
                           <AvatarIcon color='green'>
                              <Icon24Help />
                           </AvatarIcon>
                        }
                        expandable
                     >
                        Помошь
                     </SimpleCell>
                     <Separator wide className='Separator--after-avatar' />
                     <SimpleCell
                        activeEffectDelay={200}
                        activeMode='Tappable--active-background-highlighted-darken'
                        before={
                           <AvatarIcon color='blue'>
                              <Icon24Info />
                           </AvatarIcon>
                        }
                        expandable
                     >
                        Об игре
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
                        before={
                           <Avatar size={32} mode='image' shadow={false}>
                              <Icon24Settings width={24} height={24} />
                           </Avatar>
                        }
                     >
                        Убрать рекламу
                     </SimpleCell>
                  </Card>
               </CardGrid>
            </Group>
         </Group>
      </Panel>
   )
}
