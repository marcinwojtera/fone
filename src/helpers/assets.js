import { flatten, endsWith } from 'lodash/fp';

export const resolveAssets = (stats, { chunksOrder }) => {
  const asse = JSON.parse(stats)
  const test = flatten(chunksOrder.map(name => asse.assetsByChunkName[name]))

  return {
    js: test.filter(endsWith('.js')),
    css: test.filter(endsWith('.css')),
  };

}
