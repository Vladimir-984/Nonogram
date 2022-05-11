import { useRouter } from '@happysanta/router'
import { ActionSheet, ActionSheetItem, NavIdProps } from '@vkontakte/vkui'
import React from 'react'
import { CloseItem } from './CloseItem'

const dataComplexities = [
   { label: 'Лёгкий', value: 'easy' as const },
   { label: 'Средний', value: 'medium' as const },
   { label: 'Сложный', value: 'hard' as const },
   { label: 'Эксперт', value: 'expert' as const },
]
export const ActionSheetSelectComplexity: React.FC<NavIdProps> = ({ nav }) => {
   const router = useRouter()
   const onClose = () => router.popPageIfPopup()

   const onClickItem = (complexity: TypeComplexities) => {
      console.log(complexity)
   }
   return (
      <ActionSheet onClose={onClose} iosCloseItem={<CloseItem />}>
         {dataComplexities.map(({ label, value }) => (
            <CompexityItem key={value} onClick={onClickItem} value={value}>
               {label}
            </CompexityItem>
         ))}
      </ActionSheet>
   )
}

type TypeComplexities = typeof dataComplexities[number]['value']

interface CompexityItemProps {
   value: TypeComplexities
   onClick: (complexity: TypeComplexities) => void
}

const CompexityItem: React.FC<CompexityItemProps> = ({ children, value, onClick }) => {
   const onClickItem = () => onClick(value)
   return (
      <ActionSheetItem autoclose={false} onClick={onClickItem}>
         {children}
      </ActionSheetItem>
   )
}
