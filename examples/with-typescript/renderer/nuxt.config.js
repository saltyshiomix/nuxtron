export default {
  head: {
    title: 'Nuxtron (with-typescript)',
  },
  build: {
    extend: (config) => {
      config.target = 'electron-renderer';
    },
  },
}
