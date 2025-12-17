import { Button } from '@heroui/react'
import './App.css'
import FeedPage from './Pages/FeedPage';
import PostsContextProvider, { PostsContext } from './Context/context';



function App() {

  return <>
    <PostsContextProvider>
      <FeedPage />
    </PostsContextProvider>
  </>
}

export default App
