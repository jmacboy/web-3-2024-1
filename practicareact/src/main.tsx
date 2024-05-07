import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routerConfig } from './routes/RouterConfig';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={routerConfig} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
