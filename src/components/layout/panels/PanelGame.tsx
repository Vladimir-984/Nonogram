import { useRouter } from '@happysanta/router'
import { Icon28ChevronBack, Icon28SettingsOutline } from '@vkontakte/icons'
import { Panel, PanelHeader, PanelProps } from '@vkontakte/vkui'
import { PanelHeaderButton } from 'components/ui/PanelHeaderButton/PanelHeaderButton'
import { Container } from 'components/ui/Container/Container'

import React from 'react'
import { PAGE_OPTIONS } from 'router/routes'

import { GameActions } from 'components/ui/GameActions/GameActions'
import { GameWrapper, TypeSize } from 'components/ui/Puzzle/GameWrapper/GameWrapper'
import { GameHeader } from 'components/ui/GameHeader/GameHeader'
import { FormProvider, useForm } from 'react-hook-form'
import { TypeGameAction, TypeGameMode } from 'store/slices/appSlice'
import { IPuzzleCell, IPuzzleHint, PuzzleCellEnum } from 'utils/puzzle'
import { useAppSelector } from 'hooks/redux'

export interface IGameForm {
   gameMode: TypeGameMode
   gameAction: TypeGameAction
   size: TypeSize
   disabled: boolean

   cells: IPuzzleCell[]
   cellsAnswers: PuzzleCellEnum[]
   columnHints: IPuzzleHint[]
   rowHints: IPuzzleHint[]
   puzzleSize: number
}

export const PanelGame: React.FC<PanelProps> = (panelProps) => {
   const router = useRouter()
   const { cellsAnswers, columnHints, rowHints, puzzleSize, size, cells } = useAppSelector(
      (state) => state.app.game.puzzle
   )

   const { gameMode } = useAppSelector((state) => state.app.game)
   const { gameAction } = useAppSelector((state) => state.app)
   const gameForm = useForm<IGameForm>({
      defaultValues: {
         gameMode,
         gameAction,
         puzzleSize,
         size,
         disabled: false,
         cellsAnswers: [...cellsAnswers],
         cells,
         columnHints,
         rowHints,
      },
   })

   const onClickBack = () => router.popPage()
   const onClickOptions = () => router.pushPage(PAGE_OPTIONS)
   return (
      <Panel {...panelProps} className='Panel--game'>
         <PanelHeader
            visor={false}
            separator={false}
            left={
               <PanelHeaderButton onClick={onClickBack}>
                  <Icon28ChevronBack />
               </PanelHeaderButton>
            }
            right={
               <PanelHeaderButton onClick={onClickOptions}>
                  <Icon28SettingsOutline />
               </PanelHeaderButton>
            }
         >
            Игра
         </PanelHeader>
         <Container>
            <FormProvider {...gameForm}>
               <GameHeader />

               <GameWrapper />

               <GameActions />
            </FormProvider>
         </Container>
         {/* <div style={{ visibility: 'hidden' }}>
            <PromoBanner bannerData={promoBannerProps} onClose={() => {}} />
         </div>
         <FixedLayout vertical='bottom'>
            <PromoBanner bannerData={promoBannerProps} onClose={() => {}} />
         </FixedLayout> */}
      </Panel>
   )
}
// const promoBannerProps = {
//    title: 'Заголовок',
//    domain: 'vk.com',
//    trackingLink: 'https://vk.com',
//    ctaText: 'Перейти',
//    advertisingLabel: 'Реклама',
//    iconLink: 'https://sun9-7.userapi.com/c846420/v846420985/1526c3/ISX7VF8NjZk.jpg',
//    description: 'Описание рекламы',
//    ageRestrictions: '14+',
//    statistics: [
//       { url: '', type: 'playbackStarted' as const },
//       { url: '', type: 'click' as const },
//    ],
// }
