import React from 'react'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import './HintsCellItem.css'
import { Caption, Subhead } from '@vkontakte/vkui'
import { useWatch } from 'react-hook-form'
import { IGameForm } from 'components/layout/panels/PanelGame'

interface HintsCellItemProps {
   solved: boolean
   animation: boolean
}

export const HintsCellItem: React.FC<HintsCellItemProps> = ({ children, animation, solved }) => {
   const size = useWatch<IGameForm, 'size'>({ name: 'size' })
   const props = {
      className: classNamesString(
         'HintsCellItem',
         solved && 'HintsCellItem--solved',
         animation && 'HintsCellItem--animation'
      ),
      children,
      weight: '2' as const,
   }
   switch (size) {
      case 's': {
         return <Subhead {...props} />
      }
      case 'm': {
         return <Caption {...props} level='2' />
      }
      case 'l': {
         return <Caption {...props} level='3' />
      }
      case 'xl': {
         return <Caption {...props} level='4' />
      }
   }
}
