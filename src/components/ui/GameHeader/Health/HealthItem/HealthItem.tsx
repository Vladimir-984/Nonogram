import React from 'react'
import { Icon28Like } from '@vkontakte/icons'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'

import './HealthItem.css'
import { TypeAnimationEndHealth } from '../Health'

interface HealthsItemProps {
   id: number
   active: boolean
   intro: boolean
   shake: boolean
   hide: boolean
   onEnd: (id: number, typeAnimation: TypeAnimationEndHealth) => void
}
export const HealthItem: React.FC<HealthsItemProps> = ({ id, active, intro, shake, hide, onEnd }) => {
   const onAnimationEnd = (e: React.AnimationEvent) => {
      if (!(e.target instanceof HTMLElement) || !e.target.dataset.iconId) return

      const id = +e.target.dataset.iconId

      if (e.animationName === 'health-item-animation-shake') {
         onEnd(id, 'shake')
      } else if (e.animationName === 'health-item-animation-intro') {
         onEnd(id, 'intro')
      }
   }

   return (
      <div
         data-icon-id={id}
         onAnimationEnd={onAnimationEnd}
         className={classNamesString(
            'HealthItem',
            shake && 'HealthItem--shake',
            active && 'HealthItem--active',
            hide && 'HealthItem--hide',
            intro && 'HealthItem--intro'
         )}
      >
         <Icon28Like width={32} height={32} />
      </div>
   )
}
