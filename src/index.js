/* eslint-disable no-unused-vars */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import compression from 'compression';
import renderer from './helpers/renderer';
import { initialLoads, prepareAns, loadResultsForDrivers } from './store/createStore';
import { loadData, backstore } from './serData/pool';
const path = require('path');
const fs = require('fs');
const mcache = require('memory-cache');
const app = express();

const cache = (duration) => {
  return (req, res, next) => {
    let key = 'fi-Stats' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.header('from-cache', key)
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}
function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
}
app.use(
  compression({
    level: 9, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress, // set predicate to determine whether to compress
  }),
);

const port = process.env.PORT || 3002;

// To be able to serve static files
app.use(express.static('public'));
app.use(ignoreFavicon);

app.get('/robots.txt',  (req, res) => {
  res.type('text/plain');
  res.send("User-agent: *\n" +
    "Disallow: \n" +
    "Disallow: /cgi-bin/");
});

app.get('/api/cache-stats', async (req, res) => {
  let size = mcache.size();
  let hits = mcache.hits();
  let keys = mcache.keys();
  let memsize = mcache.memsize();

  res.json({memsize, size, hits, keys });
});
app.get('/api/cache-clear', async (req, res) => {
  let cachedBody = mcache.clear()
  res.json({clear : true});
});
app.get('/api/test', async (req, res) => {
  res.json(backstore.getState());
});
app.get('/api/state', (req, res) => {
  res.send(backstore.getState().loadInfo);
});

app.get('/api/test2/:driverId', (req, res) => {
  const { driverId } = req.params;
  res.send(loadResultsForDrivers(driverId));
});



app.get(
  '/api/stats/:year',
  (req, res) => {

    const { year } = req.params;

    const values = [];
    for (let i = 0; i < 21; i++) {
      ((index) => {
        const prepareFile = `${year || '2019'}-${index + 1 || '1'}.json`;
        try {
          // const dataJson = fs.readFileSync(`./jsons/${prepareFile}`);
          const dataJson = fs.readFileSync(path.resolve(`./build/jsons/${prepareFile}`));
          const jsonDataLoad = require(`./jsons/${prepareFile}`);

          const jsonData = JSON.parse(dataJson) || jsonDataLoad
          const value = jsonData.MRData.RaceTable.Races[0].Laps;
          const test = value.map(c => {
            const times = {};
            const mapping = c.Timings.forEach((v, key) => {
              times[v.driverId] = {driverId: v.driverId, position: parseInt(v.position) , time: v.time};
            });
            return times
          })
          const data = { round: (index + 1).toString(), test};
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

app.get(
  '/api/home',
  cache(1000),
  (req, res) => {
    const year = new Date().getFullYear()
    res.json(prepareAns(year, '1', '/'));
  },
);

app.get(
  '/api/race/:year/:season',
  cache(1000),
  (req, res) => {
    const { season, year } = req.params;
    const path = `/race/${year}/${season}`
      res.json(prepareAns(req.params.year, req.params.season, path));
  },
);
app.get('/api/driver/:driverId/:year', (req, res) => {
  const { driverId, year } = req.params;
  const path = `/driver/${driverId}/${year}`
  res.send(prepareAns(year, req.params.season, path, driverId));
});

app.get('/api/compare/:driverId', (req, res) => {
  const { driverId, year } = req.params;
  res.send(loadResultsForDrivers(driverId));
});

app.get('/race/:year/:season',
  cache(1000),
  async (req, res) => {
    loadHtml(req, res)
});

const loadHtml = (req, res) => {
  const driver = req.path.includes("driver");
  let driverId = null;
  let year = 2019;
  if (driver) {
     driverId = req.path.split('/')[2];
     year = req.path.split('/')[3];
  }
  const store = initialLoads(year, req.params.season, req.path, driverId);
  const statsFile = fs.readFileSync('public/stats.json', 'utf8');
  const context = {};
  const content = renderer(req, store, context, statsFile);

  if (context.notFound) {
    res.status(404);
  }
  res.send(content);
}
app.get('*', async (req, res) => {
  loadHtml(req, res)
});

export const startServer = async () =>{
  app.listen(port, () => {
    // const dayInMilliseconds = 1000 * 60 * 60 * 24;
    // setInterval(() => { loadData(); }, dayInMilliseconds);
    console.log(`-------------------------START----------------------`);
    console.log(`Listening on port: ${port}`);
  });
}

loadData()


