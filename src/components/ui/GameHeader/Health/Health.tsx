import React from 'react'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'

import { HealthItem } from './HealthItem/HealthItem'
import './Health.css'

export type TypeAnimationEndHealth = 'shake' | 'intro'
export const Health: React.FC = () => {
   const [animationIntro, setAnimationIntro] = React.useState(false)

   const [idAnimationIntroEnd, setIdAnimationIntroEnd] = React.useState(0)

   React.useEffect(() => {
      setTimeout(() => setAnimationIntro(true), 500)
   }, [])

   const onEnd = (id: number, type: TypeAnimationEndHealth) => {
      switch (type) {
         case 'intro': {
            setIdAnimationIntroEnd(id)
            if (id === 3) setAnimationIntro(false)
            break
         }
         case 'shake': {
         }
      }
   }

   const onAnimationEnd = (e: React.AnimationEvent) => {
      //   setIntro(false)
      // console.log(e)
   }

   const runAnimation = () => {
      setIdAnimationIntroEnd(0)
      setAnimationIntro(true)
   }
   return (
      <>
         <div className={classNamesString('Health')} onAnimationEnd={onAnimationEnd}>
            <HealthItem
               id={1}
               active={true}
               intro={animationIntro}
               shake={false}
               hide={idAnimationIntroEnd < 1}
               onEnd={onEnd}
            />
            <HealthItem
               id={2}
               active={true}
               intro={animationIntro}
               shake={false}
               hide={idAnimationIntroEnd < 2}
               onEnd={onEnd}
            />
            <HealthItem
               id={3}
               active={false}
               intro={animationIntro}
               shake={false}
               hide={idAnimationIntroEnd < 3}
               onEnd={onEnd}
            />
         </div>
         <button onClick={runAnimation}>run anim</button>
      </>
   )
}
