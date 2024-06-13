import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import UserPage from './pages/UserPage/UserPage.tsx';
import AllUsersPage from './pages/AllUsersPage/AllUsersPage.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <AllUsersPage />
      </RequireAuth>
    ),
    children: [
      {
        path: '/users/:id',
        element: <UserPage />,
      },
    ],
  },
  {
    path: '/register',
    element: <RegisterPage />,
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
