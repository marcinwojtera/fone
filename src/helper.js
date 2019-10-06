import compression from 'compression';
const fs = require('fs');
import { flatten, endsWith } from 'lodash/fp';
import { initialLoads, prepareAns } from './store/createStore';
import render from './helpers/renderer';

export function resolveAssets(stats, { chunksOrder }) {
  const asse = JSON.parse(stats);
  const assets = flatten(chunksOrder.map(name => asse.assetsByChunkName[name]));
  return assets.filter(endsWith('.js'));
};

export function prepareAssets() {
  const statsFile = fs.readFileSync('public/stats.json', 'utf8');
  const assets = resolveAssets(statsFile, { chunksOrder: ['manifest', 'vendor', 'client', 'pitStop'] });
  const renderScriptsTags = (assets) => assets.map(script => {
    return (`<script src="/${script}" async="true"></script>`);
  }).join('\n ');
  return renderScriptsTags(assets);
}

export function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}

export function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}

export function loadJson(req, res) {
  const { pageNavigation } = req;
  const navigation = pageNavigation;
  res.json(prepareAns(navigation));
};

export function loadHtml(req, res) {
  const { pageNavigation } = req;
  const navigation = pageNavigation;
  const store = initialLoads(navigation);
  const scripts = prepareAssets();
  const content = render(navigation.path, store);
  res.render('index.ejs', { content, scripts, store });
};

export function  pageDiscover(req, res, next) {
  const splitPath = req.path.split('/');
  const { driverId, year = 2019, season = 1 } = req.params;
  const { path } = req;
  const pageView = splitPath[1] || 'home';
  const navigation = { year, season, path, driverId, pageView };
  req.pageNavigation = navigation;
  next();
};
