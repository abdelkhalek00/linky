import { Button } from '@heroui/react'
import './App.css'
import FeedPage from './Pages/FeedPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import About from './About';
import UserInfo from './Pages/UserInfo';
import PostDetails from './Pages/PostDetails';
import AuthContextProvider from './Context/AuthContext';
import PostsContextProvider from './Context/PostsContext';
import EditPost from './Pages/EditPost';

let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <FeedPage /> },
      { path: 'about', element: <About /> },
      { path: 'user-info', element: <UserInfo /> },
      { path: 'post-details/:postId', element: <PostDetails /> },
      {path:'edit-post/:postId',element:<EditPost/>}
    ]
  },
])

function App() {

  return <>
    <AuthContextProvider>
      <PostsContextProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </PostsContextProvider>
    </AuthContextProvider>
  </>
}

export default App
