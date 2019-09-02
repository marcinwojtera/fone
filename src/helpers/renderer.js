import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server'
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { resolveAssets } from './assets';
import renderHtml from './template';
import App from '../client/App';

export default (req, store, context, statsFile) => {
  const html = renderHtml({
    ...resolveAssets(statsFile, { chunksOrder: ['manifest', 'vendor', 'main'] }),
    markup: renderStylesToString(renderToString(
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    )),
    state: store.getState(),
  });

  return html;
};
