import { useLocation } from '@happysanta/router'
import { Epic } from '@vkontakte/vkui'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import React from 'react'
import { PANELS_WITHOUT_TABBAR, ROOTS } from 'router/routes'
import { RootCollection } from './roots/RootCollection'
import { RootMain } from './roots/RootMain'
import { Tabbar } from './Tabbar'

export const Main: React.FC = () => {
   const location = useLocation()
   const activeStory = location.getRootId()
   const activePanel = location.getPanelId()
   const isTabbar = !PANELS_WITHOUT_TABBAR.includes(activePanel)
   return (
      <Epic
         activeStory={activeStory}
         className={classNamesString(isTabbar && 'vkuiEpic--tabbar', !isTabbar && 'vkuiEpic--no-tabbar')}
         tabbar={isTabbar && <Tabbar />}
      >
         <RootMain nav={ROOTS.MAIN} />
         <RootCollection nav={ROOTS.COLLECTION} />
      </Epic>
   )
}
