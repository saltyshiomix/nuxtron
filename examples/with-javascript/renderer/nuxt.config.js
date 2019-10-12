export default {
  head: {
    title: 'Nuxtron (with-javascript)',
  },
  build: {
    extend: (config) => {
      config.target = 'electron-renderer';
    },
  },
}
