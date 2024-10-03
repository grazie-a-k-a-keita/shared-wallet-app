import { createBrowserRouter } from 'react-router-dom';

import { Error, Home, Login } from '@/pages';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <Error /> },
  { path: '/login', element: <Login />, errorElement: <Error /> },
]);

export default router;
