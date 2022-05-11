import { useLocation } from '@happysanta/router'
import { NavIdProps, View } from '@vkontakte/vkui'
import React from 'react'
import { PANELS, VIEWS } from 'router/routes'
import { PanelGameMode } from '../panels/PanelGameMode'
import { PanelOptions } from '../panels/PanelOptions'
import { PanelSettings } from '../panels/PanelSettings'

export const ViewOptions: React.FC<NavIdProps> = ({ id, nav }) => {
   const activePanel = useLocation().getViewActivePanel(VIEWS.OPTIONS) || PANELS.OPTIONS
   return (
      <View nav={nav} activePanel={activePanel}>
         <PanelOptions nav={PANELS.OPTIONS} />
         <PanelSettings nav={PANELS.SETTINGS} />
         <PanelGameMode nav={PANELS.GAME_MODE} />
      </View>
   )
}
