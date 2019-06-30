/* eslint-disable no-unused-vars */
import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import React from 'react';
import fs from 'fs';
import { matchRoutes } from 'react-router-config';
import compression from 'compression';
import renderer from './helpers/renderer';
import { initialLoads, prepareAns } from './store/createStore';
import Routes from './client/Routes';
import fetch from 'node-fetch';
import {createUrl} from './helper';

import { loadData, backstore } from './serData/pool';


const app = express();

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}
function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}
app.use(
  compression({
    level: 7, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress // set predicate to determine whether to compress
  })
);

const port = process.env.PORT || 3001;

// To be able to serve static files
app.use(express.static('public'));
app.get('/api/test/:year?/:raceNr?', (req, res) => {
  res.json(prepareAns(req.params.year, req.params.raceNr));
});

app.get('/api/seasons', async (req, res) => {
  const season = backstore.getState().seasons['2019'];
  const years = backstore.getState().seasonsYear;
  res.json({ season, years });
});

app.use(ignoreFavicon);

app.get('/:year?/:season?', (req, res) => {
  // We create store before rendering html

  console.log('pppppp express',req.params.year)
  const store = initialLoads(req.params.year, req.params.season);
 
  const statsFile = fs.readFileSync('public/stats.json', 'utf8');
  const context = {};
  const content = renderer(req, store, context, statsFile);

  if (context.notFound) {
    res.status(404);
  }
  res.send(content);
});

app.listen(port, () => {
  loadData();
  console.log(`Listening on port: ${port}`);
});
