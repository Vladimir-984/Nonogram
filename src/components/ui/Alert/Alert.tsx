import React from 'react'
import {
   Tappable,
   PopoutWrapper,
   getClassName,
   Button,
   ButtonProps,
   ANDROID,
   VKCOM,
   IOS,
   ViewWidth,
   Headline,
   Title,
   Caption,
   ModalDismissButton,
   usePlatform,
   useAdaptivity,
} from '@vkontakte/vkui'

import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'
import { FocusTrap } from '@vkontakte/vkui/dist/components/FocusTrap/FocusTrap'
import { hasReactNode, noop } from '@vkontakte/vkui/dist/lib/utils'

import './Alert.css'

export interface AlertActionInterface
   extends Pick<ButtonProps, 'Component' | 'href'>,
      React.AnchorHTMLAttributes<HTMLElement> {
   title: string
   action?: VoidFunction
   autoclose?: boolean
   mode: 'cancel' | 'destructive' | 'default'
}

export interface AlertProps extends React.HTMLAttributes<HTMLElement> {
   actionsLayout?: 'vertical' | 'horizontal'
   actions?: AlertActionInterface[]
   header?: React.ReactNode
   text?: React.ReactNode
   closing?: boolean
   onClose?: VoidFunction
}

export interface AlertState {
   closing: boolean
}

type ItemClickHandler = (item: AlertActionInterface) => (e: React.MouseEvent<HTMLElement>) => void

export const Alert: React.FC<AlertProps> = ({
   closing: closingProp,
   actionsLayout = 'horizontal',
   actions = [],
   header,
   text,
   onClose = noop,
   className,
   style,
   children,
   ...restProps
}) => {
   const platform = usePlatform()
   const { viewWidth } = useAdaptivity()

   const elementRef = React.useRef<HTMLDivElement>(null)
   const actionRef = React.useRef<VoidFunction | undefined>(undefined)

   const timeout = React.useRef(platform === ANDROID || platform === VKCOM ? 200 : 300).current

   const [closing, setClosing] = React.useState(false)

   const onItemClick: ItemClickHandler = (item: AlertActionInterface) => (e: React.MouseEvent<HTMLElement>) => {
      const { action, autoclose } = item

      if (autoclose) {
         setClosing(true)
         actionRef.current = action
      } else {
         action && action()
      }
   }

   const onCloseAlert: VoidFunction = () => {
      setClosing(true)
   }

   const onTransitionEnd = (e: React.TransitionEvent<HTMLElement>) => {
      if (e.propertyName === 'opacity') {
         onClose()
         actionRef.current && actionRef.current()
      }
   }

   const stopPropagation: React.MouseEventHandler = (e: React.SyntheticEvent) => {
      e.stopPropagation()
   }

   const resolvedActionsLayout: AlertProps['actionsLayout'] = platform === VKCOM ? 'horizontal' : actionsLayout

   const canShowCloseButton = platform === VKCOM || (platform === ANDROID && viewWidth >= ViewWidth.SMALL_TABLET)

   const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET

   return (
      <PopoutWrapper
         className={classNamesString('vkuiPopoutWrapper--no-autoclose', className)}
         closing={closing || closingProp}
         style={style}
         onClick={onCloseAlert}
      >
         <FocusTrap
            {...restProps}
            getRootRef={elementRef}
            onTransitionEnd={closing || closingProp ? onTransitionEnd : undefined}
            onClick={stopPropagation}
            onClose={onCloseAlert}
            timeout={timeout}
            className={classNamesString(
               getClassName('Alert', platform),
               resolvedActionsLayout === 'vertical' && 'Alert--v',
               resolvedActionsLayout === 'horizontal' && 'Alert--h',
               (closing || closingProp) && 'Alert--closing',
               isDesktop && 'Alert--desktop'
            )}
         >
            {canShowCloseButton && <ModalDismissButton onClick={onCloseAlert} />}
            <div className='Alert__content'>
               {hasReactNode(header) && <AlertHeader>{header}</AlertHeader>}
               {hasReactNode(text) && <AlertText>{text}</AlertText>}
               {children}
            </div>
            {!!actions.length && (
               <footer className='Alert__actions'>
                  {actions.map((action, idx) => (
                     <AlertAction action={action} idx={idx} onClick={onItemClick(action)} />
                  ))}
               </footer>
            )}
         </FocusTrap>
      </PopoutWrapper>
   )
}

const AlertHeader: React.FC = ({ children }) => {
   const platform = usePlatform()

   switch (platform) {
      case VKCOM:
         return (
            <Headline className='Alert__header' weight='medium'>
               {children}
            </Headline>
         )
      case IOS:
         return (
            <Title className='Alert__header' weight='1' level='3'>
               {children}
            </Title>
         )
      case ANDROID:
         return (
            <Title className='Alert__header' weight='2' level='2'>
               {children}
            </Title>
         )
      default:
         return <></>
   }
}
const AlertText: React.FC = ({ children }) => {
   const platform = usePlatform()
   switch (platform) {
      case VKCOM:
         return <Caption className='Alert__text'>{children}</Caption>
      case IOS:
         return (
            <Caption className='Alert__text' level='2'>
               {children}
            </Caption>
         )
      case ANDROID:
         return (
            <Headline className='Alert__text' weight='regular'>
               {children}
            </Headline>
         )
      default:
         return <></>
   }
}

interface AlertActionProps {
   onClick: React.MouseEventHandler<HTMLElement>
   action: AlertActionInterface
   idx: number
}
const AlertAction: React.FC<AlertActionProps> = ({ onClick, action, idx }) => {
   const { viewWidth } = useAdaptivity()
   const platform = usePlatform()

   if (platform === IOS) {
      const { Component = 'button' } = action
      return (
         <Tappable
            Component={action.href ? 'a' : Component}
            className={classNamesString('Alert__action', `Alert__action--${action.mode}`)}
            onClick={onClick}
            href={action.href}
            key={`alert-action-${idx}`}
            target={action.target}
         >
            {action.title}
         </Tappable>
      )
   }

   let mode: ButtonProps['mode'] = action.mode === 'cancel' ? 'secondary' : 'primary'

   if (platform === ANDROID) {
      mode = 'tertiary'

      if (viewWidth === ViewWidth.DESKTOP && action.mode === 'destructive') {
         mode = 'destructive'
      }
   }

   return (
      <Button
         className={classNamesString('Alert__button', `Alert__button--${action.mode}`)}
         mode={mode}
         size='m'
         onClick={onClick}
         Component={action.Component}
         href={action.href}
         key={`alert-action-${idx}`}
         target={action.target}
      >
         {action.title}
      </Button>
   )
}
