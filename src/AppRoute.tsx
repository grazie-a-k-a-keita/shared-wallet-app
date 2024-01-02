import { createBrowserRouter } from 'react-router-dom';

import Calendar from './pages/Calendar';
import Error from './pages/Error';
import Graph from './pages/Graph';
import Input from './pages/Input';
import Setting from './pages/Setting';

const router = createBrowserRouter([
  { path: '/', element: <Input />, errorElement: <Error /> },
  { path: 'calendar', element: <Calendar /> },
  { path: 'wallet', element: <Graph /> },
  { path: 'payments', element: <Setting /> },
]);

export default router;
