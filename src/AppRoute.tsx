import { createBrowserRouter } from 'react-router-dom';

import Error from './pages/Error';
import Home from './pages/Home';

const router = createBrowserRouter([{ path: '/', element: <Home />, errorElement: <Error /> }]);

export default router;
