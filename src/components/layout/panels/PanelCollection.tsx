import { useRouter } from '@happysanta/router'
import { Icon28InfoOutline } from '@vkontakte/icons'
import {
   Card,
   CardGrid,
   FixedLayout,
   Group,
   Panel,
   PanelHeader,
   PanelProps,
   Separator,
   Tappable,
} from '@vkontakte/vkui'
import { PanelHeaderButton } from 'components/ui/PanelHeaderButton/PanelHeaderButton'
import { Tabs } from 'components/ui/Tabs/Tabs'
import { TabsItem } from 'components/ui/TabsItem/TabsItem'
import React from 'react'
import { ALERT_NAVS } from 'router/routes'

export const PanelCollection: React.FC<PanelProps> = (panelProps) => {
   const router = useRouter()
   const onClickInfo = () => {
      router.pushPopup(ALERT_NAVS.PREVIEW_COLLECTION)
   }
   return (
      <Panel {...panelProps} className='Panel--background'>
         <PanelHeader
            separator={false}
            right={
               <PanelHeaderButton primary={false} onClick={onClickInfo}>
                  <Icon28InfoOutline />
               </PanelHeaderButton>
            }
         >
            Коллекция
         </PanelHeader>
         <FixedLayout vertical='top' filled>
            <Tabs>
               <TabsItem selected>easy</TabsItem>
               <TabsItem>medium</TabsItem>
               <TabsItem>hard</TabsItem>
               <TabsItem>expert</TabsItem>
            </Tabs>
            <Separator wide />
         </FixedLayout>
         <Tabs style={{ visibility: 'hidden' }}>
            <TabsItem>1</TabsItem>
         </Tabs>
         <Group mode='plain'>
            <CardGrid size='s'>
               {Array.from(Array(30)).map((_, idx) => (
                  <Card key={idx}>
                     <Tappable activeEffectDelay={200} onClick={() => router.pushPopup('popup')}>
                        <div style={{ paddingBottom: '100%' }} />
                     </Tappable>
                  </Card>
               ))}
            </CardGrid>
         </Group>
      </Panel>
   )
}
