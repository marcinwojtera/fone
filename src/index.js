/* eslint-disable no-unused-vars */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import compression from 'compression';
import renderer from './helpers/renderer';
import { initialLoads, prepareAns } from './store/createStore';
import { loadData, backstore } from './serData/pool';
import {loadInfo} from "./serData/reducers/reducers";

const fs = require('fs');

const app = express();

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}
function ignoreFavicon(req, res, next) {
  console.log(req.originalUrl)
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}
app.use(
  compression({
    level: 7, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress, // set predicate to determine whether to compress
  }),
);

const port = process.env.PORT || 3002;

// To be able to serve static files
app.use(express.static('public'));
app.use(ignoreFavicon);
app.get('/api/test', async (req, res) => {
  res.json(backstore.getState());
});
app.get('/api/state', (req, res) => {
  res.send(backstore.getState().loadInfo);
});

app.get('/api/seasons', async (req, res) => {
  const season = backstore.getState().seasons['2019'];
  const years = backstore.getState().seasonsYear;
  res.json({ season, years });
});

app.get('/api/race/:year/:season', (req, res) => {
   res.json(prepareAns(req.params.year, req.params.season));
});

// app.get('*/favicon.ico', (req, res) => res.status(204));
app.get('/race/:year/:season', async (req, res) => {

  // res.json(prepareAns(req.params.year, req.params.season));

  // console.log(req.params.year, req.params.season, req.params.page)
  const store = initialLoads(req.params.year, req.params.season, req.params.page);
  const statsFile = fs.readFileSync('public/stats.json', 'utf8');
  const context = {};
  const content = renderer(req, store, context, statsFile);

  if (context.notFound) {
    res.status(404);
  }
  res.send(content);
});



app.get('*', async (req, res) => {
  const store = initialLoads();
  const statsFile = fs.readFileSync('public/stats.json', 'utf8');
  const context = {};
  const content = renderer(req, store, context, statsFile);

  if (context.notFound) {
    res.status(404);
  }
  res.send(content);
});
loadData();
app.listen(port, () => {

  // const dayInMilliseconds = 1000 * 60 * 60 * 24;
  // setInterval(() => { loadData(); }, dayInMilliseconds);

  console.log(`Listening on port: ${port}`);
});
