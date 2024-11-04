import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from'react-router-dom';
import HomePage from './routes/HomePage/HomePage';
import DashboardPage from './routes/DashboardPage/DashboardPage';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import RootLayout from './layouts/rootLayout/RootLayout';

import ChatPage from './routes/ChatPage/ChatPage';
import SignInPage from './routes/SignInPage/SignInPage';
import SignUpPage from './routes/SignUpPage/SignUpPage';


const router = createBrowserRouter([
  {
    element: <RootLayout/>,  
    children : [
      {
        path: "/",
        element: <HomePage/>, 
      },
      {
        path: "/sign-in/*",
        element: <SignInPage/>, 
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage/>, 
      },
      {
        element: <DashboardLayout/>, 
        children : [
          {
            path: "/dashboard",
            element: <DashboardPage/>, 
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage/>,  // Route with dynamic parameter
          }
        ]
      }
  ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
