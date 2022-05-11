import React from 'react'
import { useFocusVisible } from '@vkontakte/vkui/dist/hooks/useFocusVisible'
import { callMultiple } from '@vkontakte/vkui/dist/lib/callMultiple'
import { FocusVisible } from '@vkontakte/vkui/dist/components/FocusVisible/FocusVisible'
import {
   VisuallyHiddenInput,
   VisuallyHiddenInputProps,
} from '@vkontakte/vkui/dist/components/VisuallyHiddenInput/VisuallyHiddenInput'

import './ActionControlOption.css'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'

export const ActionControlOption: React.FC<VisuallyHiddenInputProps> = ({
   className,
   style,
   children,
   ...restProps
}) => {
   const { focusVisible, onBlur, onFocus } = useFocusVisible()
   return (
      <label
         style={style}
         className={classNamesString(
            'ActionControlOption',
            className,
            restProps.checked && 'ActionControlOption--checked',
            focusVisible && 'ActionControlOption--focus-visible'
         )}
      >
         <VisuallyHiddenInput
            {...restProps}
            type='radio'
            onBlur={callMultiple(onBlur, restProps.onBlur)}
            onFocus={callMultiple(onFocus, restProps.onFocus)}
         />
         <div className='ActionControlOption__content'>{children}</div>
         <FocusVisible mode='inside' />
      </label>
   )
}
