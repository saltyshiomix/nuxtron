import Vue from 'vue'

function VueNuxtron() {}

VueNuxtron.install = function (Vue, options) {
  Vue.prototype.resolve = function(pathname) {
    var isProd = process.env.NODE_ENV === 'production'
    if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(pathname)) {
      const img = pathname.replace('static/', '')
      return isProd ? `../${img}` : '/' + img
    } else if (/\.(js|css)(\?.*)?$/.test(pathname)) {
      return isProd ? `../${pathname}` : '/' + pathname
    } else {
      return isProd ? `../${pathname}/index.html` : '/' + pathname
    }
  }
}

export default () => {
  Vue.use(VueNuxtron)
}
