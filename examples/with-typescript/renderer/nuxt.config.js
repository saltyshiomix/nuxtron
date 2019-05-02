// import { Configuration as WebpackConfiguration } from 'webpack';

export default {
  build: {
    extend: config => {
      config.target = 'electron-renderer';
    },
    extractCSS: true,
  },
  plugins: ['~/plugins/nuxtron'],
};
