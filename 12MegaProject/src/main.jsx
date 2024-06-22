import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import Protected from './components/Protected'
import {
  Home,
  Login,
  Signup,
  Post,
  MyPost,
  EditedPost,
  AllPost,
  AddPost,
  PasswordReset,
  CreatePasswordRecovery as CreateRecovery,
  EditedPostLoader,
  AllPostLoader,
  PostLoader,
} from './Page/index.js'

const router = createBrowserRouter([
  {path: '/',
  element: <App />,
  children:[
    {path: '/',
    element: <Home />
    },
    {
      path: '/login',
      element: (
        <Protected
        authentication={false}
        >
        <Login />
        </Protected>
          
      )
    },
    {
      path: '/signup',
      element: (
        <Protected
        authentication={false}
        children={<Signup />}
        />
      )
    },
    {
      path: '/post/:slug',
      loader: PostLoader,
      element: (
        <Protected
        authentication={true}
        children={<Post />}
        />
      ),
      
    },
    {
      path: '/all-posts',
      loader: AllPostLoader,
      element: (
        <Protected
        authentication={true}
        children={<AllPost />}
        />
      )
    },
      {
        path: '/post/edit/:slug',
        loader: EditedPostLoader,
        element: (
          <Protected
          authentication={true}
          children={<EditedPost />}
          />
        )
      },
    {
      path: '/add-post',
      element: (
        <Protected
        authentication={true}
        children={<AddPost />}
        />
      )
    },
    {
      path: '/create-password-recovery'
      ,element: (
        <Protected
        authentication={false}
        children={<CreateRecovery />}
        />
      )
    },
    {
      path: '/update-password'
      ,element: (
        <Protected
        authentication={false}
        children={<PasswordReset />}
        />
      )
    },
    {
      path : '/my-posts',
      element: (
        <Protected
        authentication={true}
        children={<MyPost />}
        />
      )
    }
  ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
