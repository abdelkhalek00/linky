import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import PostsContextProvider from './Context/context.jsx'

createRoot(document.getElementById('root')).render(
  // <HeroUIProvider>
  //   <PostsContextProvider>
  //     <App />
  //   </PostsContextProvider>
  // </HeroUIProvider>

  <App/>
)
