import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeContextProvider from './Context/ThemeContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'
import PostsContextProvider from './Context/PostsContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <PostsContextProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <App />
          </QueryClientProvider>
        </PostsContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </StrictMode>
)
