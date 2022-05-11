import { useLocation } from '@happysanta/router'
import { NavIdProps, View } from '@vkontakte/vkui'
import React from 'react'
import { PANELS, VIEWS } from 'router/routes'
import { PanelCollection } from '../panels/PanelCollection'

export const ViewCollection: React.FC<NavIdProps> = ({ id, nav }) => {
   const activePanel = useLocation().getViewActivePanel(VIEWS.COLLECTION) || PANELS.COLLECTION
   return (
      <View nav={nav} activePanel={activePanel}>
         <PanelCollection nav={PANELS.COLLECTION} />
      </View>
   )
}
