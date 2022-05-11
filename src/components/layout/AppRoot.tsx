import React from 'react'
import { AdaptivityProvider, AppRoot as VKUIAppRoot, ConfigProvider, IOS } from '@vkontakte/vkui'

const AppRoot: React.FC = ({ children }) => {
   return (
      <ConfigProvider platform={IOS} appearance='light'>
         <AdaptivityProvider>
            <VKUIAppRoot mode='full' noLegacyClasses scroll='global'>
               {children}
            </VKUIAppRoot>
         </AdaptivityProvider>
      </ConfigProvider>
   )
}
