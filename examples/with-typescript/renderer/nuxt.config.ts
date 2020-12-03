import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  head: {
    title: 'Nuxtron (with-typescript)'
  },
  buildModules: ['@nuxt/typescript-build'],
  build: {
    extend: (config) => {
      config.target = 'electron-renderer';
    }
  }
};

export default config;
