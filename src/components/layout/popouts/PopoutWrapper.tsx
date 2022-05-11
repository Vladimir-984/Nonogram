import { useLocation } from '@happysanta/router'
import React from 'react'

export const PopoutWrapper: React.FC = ({ children }) => {
   const popups = React.useRef(React.Children.toArray(children) as any as React.ReactElement<{ nav: string }>[]).current

   const activePopup = useLocation().getPopupId()
   if (activePopup === null) return null

   const popup = popups.find((popup) => React.isValidElement(popup) && popup.props.nav === activePopup)
   if (popup) return popup

   return null
}
