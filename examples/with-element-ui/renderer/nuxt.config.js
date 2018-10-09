export default {
  build: {
    extend: (config) => {
      config.target = 'electron-renderer'
    }
  },

  /*
  ** Global CSS
  */
  css: [
    '../node_modules/element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Add element-ui in our app, see plugins/element-ui.js file
  */
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/nuxtron'
  ]
}
