import './App.css'
import FeedPage from './Pages/FeedPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import UserInfo from './Pages/UserInfo';
import PostDetails from './Pages/PostDetails';
import AuthContextProvider from './Context/AuthContext';
import PostsContextProvider from './Context/PostsContext';
import EditPost from './Pages/EditPost';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
toastr.options = {
    closeButton: false,
    positionClass: "toast-bottom-right",
    timeOut: "5000",
}
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <FeedPage /> },
      { path: 'user-info', element: <UserInfo /> },
      { path: 'post-details/:postId', element: <PostDetails /> },
      { path: 'edit-post/:postId', element: <EditPost /> }
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
