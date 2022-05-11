import React from 'react'
import { Icon16VideoAdvertisement, Icon28CancelOutline, Icon28Replay } from '@vkontakte/icons'

import { MdLightbulbOutline } from 'react-icons/md'
import { ActionButton } from '../ActionControl/ActionButton/ActionButton'
import { ActionControl, ActionControlOptionInterface } from '../ActionControl/ActionControl'
import { CellRect } from '../CellRect/CellRect'
import { ContainerSegment } from '../ContainerSegment/ContainerSegment'

import './GameActions.css'
import { Text } from '@vkontakte/vkui'
import { setAnimationIntroGameActions, setGameAction, TypeGameAction } from 'store/slices/appSlice'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import { useFormContext, useWatch } from 'react-hook-form'
import { IGameForm } from 'components/layout/panels/PanelGame'

export const GameActions: React.FC = () => {
   const gameAction = useWatch<IGameForm, 'gameAction'>({ name: 'gameAction' })
   const { setValue } = useFormContext<IGameForm>()

   const { animationIntroGameActions } = useAppSelector((state) => state.app)

   const dispatch = useAppDispatch()

   const onChangeAction = (action: TypeGameAction) => {
      setValue('gameAction', action)
      dispatch(setGameAction(action))
   }

   const onClickHint = () => {
      setValue('gameAction', 'hint')
      dispatch(setGameAction('hint'))
   }

   const onAnimationEnd = () => {
      dispatch(setAnimationIntroGameActions(false))
   }

   const firstOption: ActionControlOptionInterface<'mark'> = {
      label: <Icon28CancelOutline width={32} height={32} />,
      value: 'mark',
   }
   const secondOption: ActionControlOptionInterface<'fill'> = { label: <CellRect />, value: 'fill' }

   return (
      <ContainerSegment className={classNamesString('GameActions')} onAnimationEnd={onAnimationEnd}>
         <div className={classNamesString('GameActions__in', animationIntroGameActions && 'GameActions__in--intro')}>
            <div className='GameAction'>
               <ActionButton mode='click' onClick={() => {}}>
                  <Icon28Replay width={32} height={32} />
               </ActionButton>
            </div>
            <div className='GameAction'>
               <ActionControl<'fill' | 'mark'>
                  firstOption={firstOption}
                  secondOption={secondOption}
                  value={gameAction}
                  onChange={onChangeAction}
               />
            </div>
            <div className='GameAction'>
               <ActionButton
                  indicator={
                     <Text weight='medium'>12</Text>
                     //    <Icon16VideoAdvertisement />
                  }
                  mode='selectable'
                  value={gameAction}
                  optionValue='hint'
                  onClick={onClickHint}
               >
                  <MdLightbulbOutline size={32} />
               </ActionButton>
            </div>
         </div>
      </ContainerSegment>
   )
}
