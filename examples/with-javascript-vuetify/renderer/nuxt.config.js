import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';

export default {
  build: {
    extend: (config) => {
      config.target = 'electron-renderer';
    },
    extractCSS: true,
    plugins: [new VuetifyLoaderPlugin()],
    transpile: ['vuetify/lib'],
  },

  /*
  ** Head elements
  ** Add Roboto font and Material Icons
  */
  head: {
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },

  /*
  ** Load Vuetify into the app
  */
  plugins: [
    '~/plugins/nuxtron',
    '~/plugins/vuetify',
  ],

  /*
  ** Load Vuetify CSS globally
  */
  css: [
    '~/assets/app.styl',
  ],
}
