import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import App from './App';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/:path+',
        // exact: true
      }
    ]
  }
];
