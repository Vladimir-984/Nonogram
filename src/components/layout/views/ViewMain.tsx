import { useLocation } from '@happysanta/router'
import { NavIdProps, View } from '@vkontakte/vkui'
import React from 'react'
import { PANELS, VIEWS } from 'router/routes'
import { PanelGame } from '../panels/PanelGame'
import { PanelMain } from '../panels/PanelMain'

interface onTransitionParams {
   isBack: boolean
   from: string
   to: string
}
export const ViewMain: React.FC<NavIdProps> = ({ id, nav }) => {
   const activePanel = useLocation().getViewActivePanel(VIEWS.MAIN) || PANELS.MAIN
   const onTransition = (params: onTransitionParams) => {}
   return (
      <View nav={nav} activePanel={activePanel} onTransition={onTransition}>
         <PanelMain nav={PANELS.MAIN} />
         <PanelGame nav={PANELS.GAME} />
      </View>
   )
}
