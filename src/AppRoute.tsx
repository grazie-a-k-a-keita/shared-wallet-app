import { createBrowserRouter } from 'react-router-dom';

import Error from './pages/Error';
import Sample from './pages/Sample';
import Top from './pages/Top';

const router = createBrowserRouter([
  { path: '/', element: <Top />, errorElement: <Error /> },
  { path: 'sample', element: <Sample /> },
]);

export default router;
