import React from 'react'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'

import './GoalsOfDay.css'
import { Caption, Card, Header, Headline, Subhead, Title } from '@vkontakte/vkui'
import { Icon24ClockOutline } from '@vkontakte/icons'
import { FcLock, FcClock } from 'react-icons/fc'
export const GoalsOfDay: React.FC = () => {
   return (
      <div className={classNamesString('GoalsOfDay')}>
         <Card mode='tint'>
            <Header
               mode='primary'
               aside={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     <FcClock size={24} className='Clock' style={{ marginRight: 4 }} />
                     <Headline weight='medium' style={{ color: 'var(--text_secondary)' }}>
                        12ч 30м
                     </Headline>
                  </div>
               }
            >
               Цели дня
            </Header>
            <div className='GoalsOfDay__goals'>
               <Card className='GoalOfDay' mode='shadow'>
                  <div className='CardContent'>
                     <div className='CardContent__header'>
                        <Title level='2'>1/2</Title>
                     </div>
                     <div className='CardContent__description'>
                        <Caption level='1' weight='3'>
                           Полученные жизни
                        </Caption>
                     </div>
                  </div>
               </Card>
               <Card className='GoalOfDay' mode='shadow'>
                  <div className='CardContent'>
                     <div className='CardContent__header'>
                        <Title level='2'>0/5</Title>
                     </div>
                     <div className='CardContent__description'>
                        <Caption level='1' weight='3'>
                           Уровни события
                        </Caption>
                     </div>
                  </div>
               </Card>
               <Card className='GoalOfDay' mode='shadow'>
                  <div className='CardContent'>
                     <div className='CardContent__header'>
                        <Title level='2'>0/8</Title>
                     </div>
                     <div className='CardContent__description'>
                        <Caption level='1' weight='3'>
                           Любые уровни
                        </Caption>
                     </div>
                  </div>
               </Card>
               <Card className='GoalOfDay' mode='shadow'>
                  <div className='CardContent'>
                     <div className='CardContent__header'>
                        {/* <Title level='2'>1/2</Title> */}
                        <FcLock size={28} />
                     </div>
                     <div className='CardContent__description'>
                        <Caption level='1' weight='3'>
                           Секретный уровень
                        </Caption>
                     </div>
                  </div>
               </Card>
            </div>
         </Card>
      </div>
   )
}
