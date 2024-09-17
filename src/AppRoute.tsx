import { createBrowserRouter } from 'react-router-dom';

import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <Error /> },
  { path: '/login', element: <Login />, errorElement: <Error /> },
]);

export default router;
