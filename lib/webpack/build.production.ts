import webpack from 'webpack';
import { getWebpackConfig } from './helpers';

const compiler = webpack(getWebpackConfig('production'));

const callback = (error: Error, stats: webpack.Stats) => {
  error && console.error(error.stack || error);
  stats.hasErrors() && console.error(stats.toString());
};

compiler.run(<any>callback);
