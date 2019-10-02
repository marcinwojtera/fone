import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../client/App';


export default (location, store) => {
  const html = {
    markup: renderToString(
      <Provider store={store}>
        <StaticRouter location={location} context={{}}>
          <App />
        </StaticRouter>
      </Provider>,
    ),
    state: store.getState(),
  };

  return html;
};
