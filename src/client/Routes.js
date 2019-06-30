import HomePage from './pages/HomePage';
import Race from './pages/Race';
import NotFoundPage from './pages/NotFoundPage';
import App from './App';

export default [
  {
    ...App,
    routes: [  
    
      {
        ...Race,
        path: '/:path/:race',
        // exact: true
      },
      {
        ...HomePage,
        path: '/:path',
      },
      {
        ...HomePage,
        path: '/',
        // exact: true
      },
      {
        ...NotFoundPage
      },
    ]
  }
];
