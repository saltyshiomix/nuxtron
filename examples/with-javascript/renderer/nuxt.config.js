export default {
  build: {
    extend: (config) => {
      config.target = 'electron-renderer';
    },
  },
}
