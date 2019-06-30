import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { resolveAssets } from './assets';
import renderHtml from './template';
import Routes from '../client/Routes';

export default (req, store, context, statsFile) => {
  const html = renderHtml({
    ...resolveAssets(statsFile, { chunksOrder: ['manifest', 'vendor', 'main'] }),
    markup: renderToString(
      <Provider store={store}>
        <StaticRouter location={req.path} context={context}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </Provider>
    ),
    state: store.getState(),
  });

  return html;
};
