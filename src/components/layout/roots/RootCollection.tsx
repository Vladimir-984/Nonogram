import { useLocation } from '@happysanta/router'
import { NavIdProps, Root } from '@vkontakte/vkui'
import React from 'react'
import { VIEWS } from 'router/routes'
import { ViewCollection } from '../views/ViewCollection'

export const RootCollection: React.FC<NavIdProps> = ({ nav, id }) => {
   const activeView = useLocation().getViewId()
   return (
      <Root nav={nav} activeView={activeView}>
         <ViewCollection nav={VIEWS.COLLECTION} />
      </Root>
   )
}
