/* eslint-disable no-unused-vars */
import 'regenerator-runtime/runtime';
import express from 'express';
import compression from 'compression';
import { loadResultsForDrivers } from './store/createStore';
import { loadData, backstore } from './serData/pool';
import { pageDiscover, loadHtml, loadJson, shouldCompress, ignoreFavicon, loadMobile } from './helper';

const path = require('path');
const port = process.env.PORT || 3002;
const app = express();

app.set('views', path.resolve('./src/views'));
app.set('view engine', 'ejs');
app.use(ignoreFavicon);
app.use(
  compression({
    level: 9,
    filter: shouldCompress,
  }),
);
app.use(express.static('public'));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\n'
    + 'Disallow: \n'
    + 'Disallow: /cgi-bin/');
});

app.get(
  '/api/stats/:year',
  async (req, res) => {
    const { year } = req.params;
    const values = [];
    for (let i = 0; i < 21; i++) {
      ((index) => {
        const prepareFile = `${year || '2019'}-${index + 1 || '1'}.json`;
        try {
          const dataJson = fs.readFileSync(path.resolve(`./build/jsons/${prepareFile}`));
          const jsonDataLoad = require(`./jsons/${prepareFile}`);
          const jsonData = JSON.parse(dataJson) || jsonDataLoad;
          const value = jsonData.MRData.RaceTable.Races[0].Laps;
          const test = value.map(c => {
            const times = {};
            const mapping = c.Timings.forEach((v, key) => {
              times[v.driverId] = { driverId: v.driverId, position: parseInt(v.position), time: v.time };
            });
            return times;
          });
          const data = { round: (index + 1).toString(), test };
          values.push(data);
        } catch (e) {
          const data = false;
          values.push(data);
        }
      })(i);
    }
    res.json({ year, values });
  },
);

app.get('/api/seasons', async (req, res) => {
  const season = backstore.getState().seasons['2019'];
  const years = backstore.getState().seasonsYear;
  res.json({ season, years });
});

app.get('/api/compare/:driverId', (req, res) => {
  const { driverId } = req.params;
  res.send(loadResultsForDrivers(driverId));
});

const loadContent = (req, res) => {
  res.format({
    html(res, req) {
      loadHtml(res, req);
    },
    json(res, req) {
      loadJson(res, req);
    },
  });
};

app.get('/driver/:driverId/:year', pageDiscover, loadContent);
app.get('/race/:year/:season', pageDiscover, loadContent);
app.get('/', pageDiscover, loadContent);


export const startServer = async () => {
  app.listen(port, () => {
    // const dayInMilliseconds = 1000 * 60 * 60 * 24;
    // setInterval(() => { loadData(); }, dayInMilliseconds);
    console.log('-------------------------START----------------------');
    console.log(`Listening on port: ${port}`);
  });
};

app.get('/api/test', async (req, res) => {
  res.json(backstore.getState());
});

loadData();
