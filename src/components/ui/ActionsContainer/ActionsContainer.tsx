import React from 'react'
import './ActionsContainer.css'
export const ActionsContainer: React.FC = ({ children }) => {
   return (
      <div className='ActionsContainer'>
         {React.Children.map(children, (child, idx) => (
            <div key={idx} className='ActionsContainer__action'>
               {child}
            </div>
         ))}
      </div>
   )
}
