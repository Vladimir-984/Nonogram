import React from 'react'
import { classNamesString } from '@vkontakte/vkui/dist/lib/classNames'

import './ActionControl.css'
import { generateRandomId, noop } from '@vkontakte/vkui/dist/lib/utils'
import { ActionControlOption } from './ActionControlOption/ActionControlOption'

// type ActionControlValue = string

export interface ActionControlOptionInterface<T> extends Omit<React.HTMLAttributes<HTMLElement>, 'label'> {
   label: React.ReactChild
   value: T
}

export interface ActionControlProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
   firstOption: ActionControlOptionInterface<T>
   secondOption: ActionControlOptionInterface<T>
   onChange: (value: T) => void
   value: string
   name?: string
}

export const ActionControl = <T extends string>({
   firstOption: { label: labelFirstOption, ...restPropsFirstOption },
   secondOption: { label: labelSecondOption, ...restPropsSecondOption },
   onChange = noop,
   value,
   name,
   ...restProps
}: React.PropsWithChildren<ActionControlProps<T>>) => {
   const [activeOptionIdx, updateActiveOptionIdx] = React.useState<number>(0)
   const optionsRef = React.useRef([restPropsFirstOption, restPropsSecondOption])

   React.useLayoutEffect(() => {
      optionsRef.current = [restPropsFirstOption, restPropsSecondOption]
   }, [restPropsFirstOption, restPropsSecondOption])

   React.useLayoutEffect(() => {
      const _activeOptionIdx = optionsRef.current.findIndex((option) => option.value === value)

      updateActiveOptionIdx(_activeOptionIdx)
   }, [value])

   const translateX = `translateX(${100 * activeOptionIdx}%)`
   const nameRef = React.useRef<string>(name ?? generateRandomId())

   const handleOnChange = (value: T) => {
      onChange(value)
   }

   return (
      <div {...restProps} className={classNamesString('ActionControl')}>
         <div role='radiogroup' className='ActionControl__in'>
            <div
               aria-hidden='true'
               className='ActionControl__slider'
               style={{
                  transform: translateX,
                  WebkitTransform: translateX,
               }}
            />

            <ActionControlOption
               {...restPropsFirstOption}
               className='ActionControl__option'
               name={nameRef.current}
               checked={value === restPropsFirstOption.value}
               onClick={() => handleOnChange(restPropsFirstOption.value)}
               onChange={noop}
               // onChange={() => handleOnChange(restPropsFirstOption.value)}
            >
               {labelFirstOption}
            </ActionControlOption>
            <ActionControlOption
               {...restPropsSecondOption}
               className='ActionControl__option'
               name={nameRef.current}
               checked={value === restPropsSecondOption.value}
               onClick={() => handleOnChange(restPropsSecondOption.value)}
               onChange={noop}
               // onChange={() => handleOnChange(restPropsSecondOption.value)}
            >
               {labelSecondOption}
            </ActionControlOption>
         </div>
      </div>
   )
}
