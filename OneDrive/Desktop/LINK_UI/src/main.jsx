import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { NextUIProvider } from '@nextui-org/react';
import {
  RecoilRoot,
} from 'recoil';
import Loader from './pages/Admin/components/Loader';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <NextUIProvider >
          <RecoilRoot>
          <React.Suspense fallback={<Loader />}>
            <App />
          </React.Suspense>
          </RecoilRoot>
        </NextUIProvider>
        <Toaster />
      </BrowserRouter>
)
