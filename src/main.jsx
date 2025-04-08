import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/home.css'
import './components/list.css'
import './components/linkedlist.css'
import './components/queue.css'
import './components/stack.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
