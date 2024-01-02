import { createBrowserRouter } from 'react-router-dom';

import Calendar from './pages/Calendar';
import Error from './pages/Error';
import Input from './pages/Input';
import Payments from './pages/Payments';
import Wallet from './pages/Wallet';

const router = createBrowserRouter([
  { path: '/', element: <Input />, errorElement: <Error /> },
  { path: 'wallet', element: <Wallet /> },
  { path: 'calendar', element: <Calendar /> },
  { path: 'payments', element: <Payments /> },
]);

export default router;
