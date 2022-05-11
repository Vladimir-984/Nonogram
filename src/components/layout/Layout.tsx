import { RouterContext } from '@happysanta/router'
import {
   AdaptivityProvider,
   AppRoot,
   ConfigProvider,
   IOS,
   SplitCol,
   SplitLayout,
   // useAdaptivity,
   // ViewWidth,
   WebviewType,
} from '@vkontakte/vkui'
// import { classNamesString } from "@vkontakte/vkui/dist/lib/classNames";
import React from 'react'
import { Provider } from 'react-redux'
import { router } from 'router'
import { store } from 'store'

import { Main } from './Main'
import { PopupRoot } from './popouts/PopupRoot'

export const Layout: React.FC = () => {
   // const { viewWidth } = useAdaptivity()
   // const isAnimate = viewWidth === ViewWidth.SMALL_MOBILE || viewWidth === ViewWidth.MOBILE
   return (
      <ConfigProvider platform={IOS} appearance='light' webviewType={WebviewType.INTERNAL}>
         <AdaptivityProvider>
            <Provider store={store}>
               <RouterContext.Provider value={router}>
                  <AppRoot mode='full' noLegacyClasses scroll='global'>
                     <SplitLayout popout={<PopupRoot />}>
                        <SplitCol animate={true} maxWidth={600}>
                           <Main />
                        </SplitCol>
                     </SplitLayout>
                  </AppRoot>
               </RouterContext.Provider>
            </Provider>
         </AdaptivityProvider>
      </ConfigProvider>
   )
}
