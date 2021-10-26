import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';

function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      transition={Slide}
      limit={1}
      theme={'dark'}
    />
  );
}

export default Toast;
