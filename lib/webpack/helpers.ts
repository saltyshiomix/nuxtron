import fs from 'fs';
import path from 'path';
import { smart as merge } from 'webpack-merge';
import configure from './webpack.config';

const cwd = process.cwd();
const ext = fs.existsSync(path.join(cwd, 'tsconfig.json')) ? '.ts' : '.js';

const getNuxtronConfig = () => {
  const configPath = path.join(cwd, 'nuxtron.config.js');
  if (fs.existsSync(configPath)) {
    return require(configPath);
  } else {
    return {};
  }
};

const getWebpackConfig = (env: 'development' | 'production') => {
  const { mainSrcDir, webpack } = getNuxtronConfig();
  const userConfig = merge(configure(env), {
    entry: {
      background: path.join(cwd, mainSrcDir || 'main', `background${ext}`),
    },
    output: {
      filename: '[name].js',
      path: path.join(cwd, 'app'),
    },
  });

  const userWebpack = webpack || {};
  if (typeof userWebpack === 'function') {
    return userWebpack(userConfig, env);
  } else {
    return merge(userConfig, userWebpack);
  }
};

export {
  getNuxtronConfig,
  getWebpackConfig,
};
