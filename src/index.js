import React from 'react'
import ReactDOM from 'react-dom'

import { Layout } from 'components/layout/Layout'

// import reportWebVitals from './reportWebVitals';
import './index.css'
import '@vkontakte/vkui/dist/vkui.css'
import '@vkontakte/vkui/dist/fonts.css'

ReactDOM.render(<Layout />, document.getElementById('root'))

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//    <React.StrictMode>
//       <App />
//    </React.StrictMode>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
