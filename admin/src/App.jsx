import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';

export function App() {
  return (
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;
