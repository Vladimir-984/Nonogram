import { useRouter } from '@happysanta/router'
import { Icon28ChevronBack, Icon28DoneOutline } from '@vkontakte/icons'
import {
   Card,
   CardGrid,
   Div,
   FixedLayout,
   Group,
   Panel,
   PanelHeader,
   PanelProps,
   Separator,
   SimpleCell,
   Subhead,
   Switch,
} from '@vkontakte/vkui'
import { AvatarIcon } from 'components/ui/AvatarIcon/AvatarIcon'
import { PanelHeaderButton } from 'components/ui/PanelHeaderButton/PanelHeaderButton'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import React from 'react'
import { setComplexitySelection, setGameMode } from 'store/slices/appSlice'

export const PanelGameMode: React.FC<PanelProps> = (panelProps) => {
   const router = useRouter()
   const dispatch = useAppDispatch()
   const { gameMode, complexitySelection } = useAppSelector((state) => state.app)
   const onClickBack = () => router.popPage()

   const onClickSubmit = () => router.popPageTo(-3)

   const onClickClassic = () => {
      dispatch(setGameMode('classic'))
   }
   const onClickStandard = () => {
      dispatch(setGameMode('standard'))
   }
   const onChangeComplexitySelection = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked
      dispatch(setComplexitySelection(value))
   }
   return (
      <Panel {...panelProps} className='Panel--background'>
         <PanelHeader
            separator={false}
            left={
               <PanelHeaderButton primary={false} label='Назад' onClick={onClickBack}>
                  <Icon28ChevronBack />
               </PanelHeaderButton>
            }
            right={<PanelHeaderButton onClick={onClickSubmit}>Готово</PanelHeaderButton>}
         >
            Режим игры
         </PanelHeader>
         <FixedLayout vertical='top'>
            <Separator wide />
         </FixedLayout>
         <Group mode='plain'>
            <Group mode='plain' separator='hide'>
               <CardGrid size='l'>
                  <Card>
                     <SimpleCell
                        activeEffectDelay={200}
                        activeMode='Tappable--active-background-highlighted-darken'
                        before={<AvatarIcon color='red'></AvatarIcon>}
                        after={gameMode === 'standard' && <Icon28DoneOutline />}
                        onClick={onClickStandard}
                     >
                        Стандартный режим
                     </SimpleCell>
                  </Card>
               </CardGrid>
               <Div style={{ padding: '12px 28px' }}>
                  <Subhead weight='3' style={{ color: 'var(--text_secondary)' }}>
                     Играйте с мгновенным отображением ошибок на игровом поле и ограниченным количеством жизней (3 жизни
                     на одну игру) и завершайте уровки без ошибок
                  </Subhead>
               </Div>
            </Group>
            <Group mode='plain' separator='hide'>
               <CardGrid size='l'>
                  <Card>
                     <SimpleCell
                        activeEffectDelay={200}
                        activeMode='Tappable--active-background-highlighted-darken'
                        before={<AvatarIcon color='orange'></AvatarIcon>}
                        after={gameMode === 'classic' && <Icon28DoneOutline />}
                        onClick={onClickClassic}
                     >
                        Классический режим
                     </SimpleCell>
                  </Card>
               </CardGrid>
               <Div style={{ padding: '12px 28px' }}>
                  <Subhead weight='3' style={{ color: 'var(--text_secondary)' }}>
                     Закрашивайте и очищайте ячейки на игровом поле в свободном режиме, используйте кнопку "Отменить"
                     для отмены ходов и самостоятельно находите ошибки
                  </Subhead>
               </Div>
            </Group>
            <Group mode='plain' separator='hide'>
               <CardGrid size='l'>
                  <Card>
                     <SimpleCell
                        disabled
                        after={<Switch checked={complexitySelection} onChange={onChangeComplexitySelection} />}
                     >
                        Выбор сложности
                     </SimpleCell>
                  </Card>
               </CardGrid>
               <Div style={{ padding: '12px 28px' }}>
                  <Subhead weight='3' style={{ color: 'var(--text_secondary)' }}>
                     Выбирайте сложность для каждого нового уровня в зависимости от ваших навыков
                  </Subhead>
               </Div>
            </Group>
         </Group>
      </Panel>
   )
}
