import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './work/context/AuthProvider';
import Home from './work/pages/Home/Home';
import route from './work/routes/route';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={route}>
        <Home />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
