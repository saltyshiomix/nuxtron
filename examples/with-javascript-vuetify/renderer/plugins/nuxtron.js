import Vue from 'vue'

function VueNuxtron() {}

VueNuxtron.install = function (Vue, options) {
  Vue.prototype.resolve = function(pathname) {
    if (process.env.NODE_ENV === 'production') {
      if (/\.(png|jpe?g|gif|svg|js|css)(\?.*)?$/.test(pathname)) {
        return `../${pathname}`
      }
      return `../${pathname}/index.html`
    }
    return '/' + pathname
  }
}

Vue.use(VueNuxtron)
