import React from 'react'
import { ContainerSegment } from 'components/ui/ContainerSegment/ContainerSegment'

import './GameWrapper.css'
import { Hints } from '../Hints/Hints'
import { Puzzle } from '../Puzzle'
import { HintsCellItem } from '../HintsCellItem/HintsCellItem'
import { HintsCell } from '../HintsCell/HintsCell'
import { TouchPuzzle } from '../TouchPuzzle'

import { useAppDispatch } from 'hooks/redux'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { IGameForm } from 'components/layout/panels/PanelGame'

export type TypeSize = 's' | 'm' | 'l' | 'xl'

interface GameWrapperProps {}

export const GameWrapper: React.FC<GameWrapperProps> = () => {
   const { getValues } = useFormContext<IGameForm>()
   const puzzleSize = getValues('puzzleSize')
   const reduxDispatch = useAppDispatch()

   console.log('render wrapper')

   React.useEffect(() => {
      return () => {
         // reduxDispatch()
      }
   }, [])

   return (
      <ContainerSegment className='GameWrapper'>
         <div className='GameWrapper__in'>
            <div className='GameWrapper__top'>
               <div className='GameWrapper__top--empty-rect' />
               <TopHints />
            </div>
            <div className='GameWrapper__bottom'>
               <LeftHints />
               <div className='GameWrapper__puzzle'>
                  <TouchPuzzle className='PuzzleContainer'>
                     <Controller
                        name='cellsAnswers'
                        render={({ field: { value } }) => <Puzzle cellsAnswers={value} puzzleSize={puzzleSize} />}
                     />
                  </TouchPuzzle>
               </div>
            </div>
         </div>
      </ContainerSegment>
   )
}

export const TopHints: React.FC = () => {
   const { control } = useFormContext<IGameForm>()
   const [columnHints, size] = useWatch<IGameForm, ['columnHints', 'size']>({
      name: ['columnHints', 'size'],
      control,
      exact: true,
      disabled: false,
   })

   // const size = useWatch<IGameForm>({ name: 'size' })
   return (
      <Hints mode='horizontal' size={size}>
         {columnHints.map(({ hints, ...hintCell }, idx) => (
            <HintsCell key={`Hints-Cell-vertical--${idx}`} mode='vertical' {...hintCell}>
               {hints.map(({ value, ...hintItem }, idxHint) => (
                  <HintsCellItem key={`Hints-Cell-vertical--${idx} Hints-Cell-Item--${idxHint}`} {...hintItem}>
                     {value}
                  </HintsCellItem>
               ))}
            </HintsCell>
         ))}
      </Hints>
   )
}
export const LeftHints: React.FC = () => {
   const { control } = useFormContext<IGameForm>()
   const [rowHints, size] = useWatch<IGameForm, ['rowHints', 'size']>({
      name: ['rowHints', 'size'],
      control,
      exact: true,
      disabled: false,
   })

   // const size = useWatch<IGameForm>({ name: 'size' })
   return (
      <Hints mode='vertical' size={size}>
         {rowHints.map(({ hints, ...hintCell }, idx) => (
            <HintsCell key={`Hints-Cell-horizontal--${idx}`} mode='horizontal' {...hintCell}>
               {hints.map(({ value, ...hintItem }, idxHint) => (
                  <HintsCellItem key={`Hints-Cell-horizontal--${idx} Hints-Cell-Item--${idxHint}`} {...hintItem}>
                     {value}
                  </HintsCellItem>
               ))}
            </HintsCell>
         ))}
      </Hints>
   )
}
