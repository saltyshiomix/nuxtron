export default {
  build: {
    extend: (config) => {
      config.target = 'electron-renderer'
    }
  },
  css: [
    '../node_modules/@vuikit/theme'
  ],
  plugins: [
    '~/plugins/nuxtron.js',
    '~/plugins/vuikit.js'
  ]
}
