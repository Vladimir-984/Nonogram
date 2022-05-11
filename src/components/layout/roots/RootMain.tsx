import { useLocation } from '@happysanta/router'
import { NavIdProps, Root } from '@vkontakte/vkui'
import React from 'react'
import { VIEWS } from 'router/routes'
import { ViewMain } from '../views/ViewMain'
import { ViewOptions } from '../views/ViewOptions'

export const RootMain: React.FC<NavIdProps> = ({ nav }) => {
   const activeView = useLocation().getViewId()
   return (
      <Root nav={nav} activeView={activeView}>
         <ViewMain nav={VIEWS.MAIN} />
         <ViewOptions nav={VIEWS.OPTIONS} />
      </Root>
   )
}
