import { Panel, Spinner } from '@vkontakte/vkui'
import React from 'react'

export const PanelLoading: React.FC = () => {
   return (
      <Panel centered>
         <Spinner size='large' />
      </Panel>
   )
}
