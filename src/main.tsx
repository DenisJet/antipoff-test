import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import UserPage from './pages/UserPage/UserPage.tsx';
import AllUsersPage from './pages/AllUsersPage/AllUsersPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: '<RequireAuth/>',
    children: [
      {
        path: '/',
        element: <AllUsersPage />,
      },
      {
        path: '/users/:id',
        element: <UserPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: '<AuthLayout />',
    children: [
      {
        path: 'login',
        element: '<Login />',
      },
      {
        path: 'register',
        element: '<Register />',
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
