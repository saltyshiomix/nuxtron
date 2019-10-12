export default {
  head: {
    title: 'Nuxtron (custom-build-options)',
  },
  build: {
    extend: (config) => {
      config.target = 'electron-renderer';
    },
  },
}
