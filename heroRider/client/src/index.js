import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './work/context/AuthProvider';
import Home from './work/pages/Home/Home';
import route from './work/routes/route';
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={route}>
        <Home />
      </RouterProvider>
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);
