/* eslint-disable no-unused-vars */
import '@babel/core';
import express from 'express';
import React from 'react';
import fs from 'fs';
import { matchRoutes } from 'react-router-config';
import compression from 'compression';
import renderer from './helpers/renderer';
import createStore from './store/createStore';
import Routes from './client/Routes';
import fetch from 'node-fetch';
import {createUrl} from './helper'

import {loadData} from './serData/pool'

const app = express();
loadData()
console.log('asdadsadasdasdasdas')
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}

app.use(
  compression({
    level: 6, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress // set predicate to determine whether to compress
  })
);

const port = process.env.PORT || 3001;

// To be able to serve static files
app.use(express.static('public'));

app.get('/api/seasons', async (req, res) => {
  const seasonsList = await fetch(`http://ergast.com/api/f1/seasons.json?limit=1000`)
    .then(rest => rest.json())
    .then(json => json.MRData.SeasonTable.Seasons || {})
    .catch(err => console.error(err));

  Promise.all([seasonsList]).then(() => res.json({ seasonsList }));
});

app.get('/api/call/:year?/:raceNr?', async (req, res) => {
  //http://ergast.com/api/f1/2001/2/drivers/alonso/results
  const params = createUrl(req.params.year, req.params.raceNr);

  const { yearSearch, race } = params;
  let raceResults = [];
  if (race) {
    raceResults = await fetch(`http://ergast.com/api/f1/${yearSearch}${race}/results.json`)
      .then(rest => rest.json())
      .then(json => json.MRData.RaceTable.Races[0])
      .catch(err => {
        console.log(err);
      });
  }
  

  const driverStandings = await fetch(
    `http://ergast.com/api/f1/${yearSearch}${race}/driverStandings.json`
  )
    .then(rest => rest.json())
    .then(json => json.MRData.StandingsTable.StandingsLists[0])
    .catch(err => {
      console.log(err);
    });

  const constructorStandings = await fetch(`http://ergast.com/api/f1/${yearSearch}${race}/constructorStandings.json`)
    .then(rest => rest.json())
    .then(json => json.MRData.StandingsTable.StandingsLists[0] || {})
    .catch(err => console.error(err));

  const raceList = await fetch(`http://ergast.com/api/f1/${yearSearch}.json?limit=1000`)
    .then(rest => rest.json())
    .then(json => json.MRData.RaceTable.Races || {})
    .catch(err => console.error(err));

  const navigation = { year: yearSearch, race };
  Promise.all([driverStandings, constructorStandings, raceList, raceResults]).then(() =>
    res.json({ driverStandings, constructorStandings, raceList, raceResults, navigation })
  );
});
app.get('*', (req, res) => {
  const params = req.params[0].split('/');
  const id = params[2];
  // We create store before rendering html
  const store = createStore();
  // We pass store to renderer

  // Checks the given path, matches with component and returns array of items about to be rendered
  const routes = matchRoutes(Routes, req.path);

  // Execute all loadData functions inside given urls and wrap promises with new promises to be able to render pages all the time
  // Even if we get an error while loading data, we will still attempt to render page.
  const promises = routes
    .map(({ route }) => {
      return route.loadData ? route.loadData(store, id) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });
  const statsFile = fs.readFileSync('public/stats.json', 'utf8');

  // Wait for all the loadData functions, if they are resolved, send the rendered html to browser.
  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context, statsFile);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
