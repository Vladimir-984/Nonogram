import { PanelHeaderButtonProps, Tappable, Title } from '@vkontakte/vkui'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import { isPrimitiveReactNode } from '@vkontakte/vkui/dist/lib/utils'
import React from 'react'

import './PanelHeaderButton.css'

interface ButtonTypographyProps extends React.AllHTMLAttributes<HTMLElement> {
   primary?: PanelHeaderButtonProps['primary']
}

const ButtonTypography: React.FC<ButtonTypographyProps> = ({ primary, children }: ButtonTypographyProps) => {
   return (
      <Title Component='span' level='3' weight={primary ? '1' : '3'}>
         {children}
      </Title>
   )
}

export const PanelHeaderButton: React.FC<PanelHeaderButtonProps> = ({
   label,
   primary = true,
   children,
   className,
   ...restProps
}) => {
   const isPrimitive = isPrimitiveReactNode(children)
   const isPrimitiveLabel = isPrimitiveReactNode(label)
   return (
      <Tappable
         {...restProps}
         Component={restProps.href ? 'a' : 'button'}
         activeEffectDelay={200}
         hoverMode='Tappable--hover-brightness'
         activeMode='Tappable--active-brightness'
         className={classNamesString(
            'PanelHeaderButton',
            'Tappable--brightness',
            className,
            primary && 'PanelHeaderButton--primary',
            isPrimitive && 'PanelHeaderButton--primitive',
            !isPrimitive && !isPrimitiveLabel && 'PanelHeaderButton--notPrimitive'
         )}
      >
         {isPrimitive ? <ButtonTypography primary={primary}>{children}</ButtonTypography> : children}
         {isPrimitiveLabel ? <ButtonTypography primary={primary}>{label}</ButtonTypography> : label}
      </Tappable>
   )
}
