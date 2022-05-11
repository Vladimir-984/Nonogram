import React from 'react'
import { Tabbar as VKUITabbar } from '@vkontakte/vkui'
import { Icon28HomeOutline, Icon28PictureStackOutline } from '@vkontakte/icons'
import { useLocation, useRouter } from '@happysanta/router'
import { PAGE_COLLECTION, PAGE_MAIN, ROOTS } from 'router/routes'
import { TabbarItem } from 'components/ui/TabbarItem/TabbarItem'

export const Tabbar: React.FC = () => {
   const router = useRouter()
   const activeStory = useLocation().getRootId()

   const onClickMain = () => {
      router.pushPage(PAGE_MAIN)
   }
   const onClickCollection = () => {
      if (window.scrollY >= 30) {
         return window.scrollTo({ top: 0, behavior: 'auto' })
      }
      router.pushPage(PAGE_COLLECTION)
   }
   return (
      <VKUITabbar shadow itemsLayout='vertical'>
         <TabbarItem text='Главная' onClick={onClickMain} selected={activeStory === ROOTS.MAIN}>
            <Icon28HomeOutline />
         </TabbarItem>
         <TabbarItem text='Коллекция' onClick={onClickCollection} selected={activeStory === ROOTS.COLLECTION}>
            <Icon28PictureStackOutline />
         </TabbarItem>
      </VKUITabbar>
   )
}
