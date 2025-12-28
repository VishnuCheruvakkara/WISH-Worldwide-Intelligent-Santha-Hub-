import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import PublisAxios from './axios/PublisAxios';

import { Toaster } from 'react-hot-toast';

function App() {
  useEffect(() => {
    const fetchCSRF = async () => {
      try {
        await PublisAxios.get('/users/csrf/');
      } catch (error) {
        console.error('Failed to fetch CSRF:', error);
      }
    };
    fetchCSRF();
  }, []);

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          top: 20,
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
