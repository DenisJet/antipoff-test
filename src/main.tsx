import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import UserPage from './pages/UserPage/UserPage.tsx';
import AllUsersPage from './pages/AllUsersPage/AllUsersPage.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.tsx';
import { BASE_URL } from './helpers/API.ts';
import Layout from './layout/layout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: <AllUsersPage />,
      },
      {
        path: '/users/:id',
        element: <UserPage />,
        loader: async ({ params }) => {
          return defer({
            data: fetch(`${BASE_URL}/api/users/${params.id}`).then((data) => data.json()),
          });
        },
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
