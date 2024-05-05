import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routerConfig } from './routes/RouterConfig';
import { ThemeProvider } from '@material-tailwind/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={routerConfig} />
    </ThemeProvider>
  </React.StrictMode>,
)
