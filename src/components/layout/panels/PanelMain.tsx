import { useRouter } from '@happysanta/router'
import { Icon28CancelOutline, Icon28SettingsOutline } from '@vkontakte/icons'
import { Button, Panel, PanelHeader, PanelProps, Tappable } from '@vkontakte/vkui'
import { ActionsContainer } from 'components/ui/ActionsContainer/ActionsContainer'
import { PanelHeaderButton } from 'components/ui/PanelHeaderButton/PanelHeaderButton'
import { ButtonContent } from 'components/ui/ButtonContent/ButtonContent'
import { Container } from 'components/ui/Container/Container'
import { ContainerSegment } from 'components/ui/ContainerSegment/ContainerSegment'
import { GoalsOfDay } from 'components/ui/GoalsOfDay/GoalsOfDay'
import { NonogramTitle } from 'components/ui/NonogramTitle/NonogramTitle'
import React from 'react'
import { ACTION_SHEET_NAVS, ALERT_NAVS, PAGE_GAME, PAGE_OPTIONS } from 'router/routes'
import { populateNewGame, puzzle, puzzleLarge } from 'utils/puzzle'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { setGame } from 'store/slices/appSlice'

export const PanelMain: React.FC<PanelProps> = (panelProps) => {
   const router = useRouter()
   const dispatch = useAppDispatch()
   const gameMode = useAppSelector((state) => state.app.gameMode)

   React.useEffect(() => {
      const game = populateNewGame({ gameMode, numberOfHints: 3, puzzle: puzzle })
      dispatch(setGame(game))
   }, [])

   const onClickOptions = () => {
      router.pushPage(PAGE_OPTIONS)
   }
   return (
      <Panel {...panelProps}>
         <PanelHeader
            separator={false}
            right={
               <>
                  <PanelHeaderButton onClick={onClickOptions}>
                     <Icon28SettingsOutline />
                  </PanelHeaderButton>
               </>
            }
         ></PanelHeader>
         <Container>
            <ContainerSegment>1</ContainerSegment>
            <ContainerSegment>
               <GoalsOfDay />
            </ContainerSegment>
            <ContainerSegment>
               <NonogramTitle />
            </ContainerSegment>
            <ContainerSegment>
               <ActionsContainer>
                  {/* <Button
                     size='l'
                     stretched
                     className='Button--round'
                     activeEffectDelay={200}
                     onClick={() => router.pushPopup(ALERT_NAVS.CHANGE_GAME_MODE)}
                  >
                     <ButtonContent subhead='Уровень 2'>Продолжить игру</ButtonContent>
                  </Button> */}
                  <Button
                     size='l'
                     stretched
                     className='Button--round'
                     activeEffectDelay={200}
                     onClick={() => router.pushPopup(ACTION_SHEET_NAVS.SELECT_COMPLEXITY)}
                  >
                     <ButtonContent>Новая игра</ButtonContent>
                  </Button>
                  <Button
                     mode='secondary'
                     size='l'
                     stretched
                     className='Button--round'
                     activeEffectDelay={200}
                     onClick={() => router.pushPage(PAGE_GAME)}
                  >
                     <ButtonContent>Начать уровень заново</ButtonContent>
                  </Button>
                  <Button
                     mode='secondary'
                     size='l'
                     stretched
                     className='Button--round'
                     before={<Icon28CancelOutline style={{ visibility: 'hidden' }} />}
                     after={
                        <Tappable
                           activeEffectDelay={200}
                           // stopPropagation
                           hoverMode='opacity'
                           activeMode='opacity'
                           onClick={(e) => {
                              e.stopPropagation()
                              router.pushPopup(ALERT_NAVS.HIDE_BASE_LEVELS)
                           }}
                        >
                           <Icon28CancelOutline />
                        </Tappable>
                     }
                     activeEffectDelay={200}
                     onClick={() => router.pushPopup(ALERT_NAVS.EXIT_COLLECTION_GAME)}
                  >
                     <ButtonContent subhead='Базовый 5х5'>Продолжить тренировку</ButtonContent>
                  </Button>
               </ActionsContainer>
            </ContainerSegment>
         </Container>

         {/* <Group>
            <Div>
                <Gallery slideWidth={'50%'}>
                  <Card style={{ padding: '0 12px', boxSizing: 'border-box' }} mode='outline'>
                     <div style={{ paddingBottom: '100%', backgroundColor: '#aaa' }} />
                  </Card>
                  <Card style={{ padding: '0 12px', boxSizing: 'border-box' }} mode='outline'>
                     <div style={{ paddingBottom: '100%', backgroundColor: '#bbb' }} />
                  </Card>
                  <Card style={{ padding: '0 12px', boxSizing: 'border-box' }} mode='outline'>
                     <div style={{ paddingBottom: '100%', backgroundColor: '#ccc' }} />
                  </Card>
               </Gallery> 
               
            </Div>
         </Group> */}
      </Panel>
   )
}

/*
<div style={{ borderRadius: 12, backgroundColor: 'var(--nonogram_background_secret_level)' }}>
            <SimpleCell
               activeEffectDelay={200}
               style={{ padding: '6px 12px' }}
               multiline
               before={<Avatar style={{ color: 'rgba(255,255,255, .2)' }} shadow={false} size={48}></Avatar>}
               after={
                  <Button
                     activeEffectDelay={200}
                     size='m'
                     className='Button--round'
                     appearance='overlay'
                     mode='secondary'
                  >
                     Играть
                  </Button>
               }
            >
               <Headline weight='medium' style={{ color: 'var(--white)' }}>
                  Секретный уровень
               </Headline>
            </SimpleCell>
         </div>
*/
