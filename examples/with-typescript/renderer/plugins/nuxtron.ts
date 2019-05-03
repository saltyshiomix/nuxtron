import Vue, { PluginObject } from 'vue';

const VueNuxtron: PluginObject<any> = {
  install: (Vue, options) => {
    Vue.prototype.resolve = function(pathname: string) {
      const isProd = process.env.NODE_ENV === 'production';
      if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(pathname)) {
        const img = pathname.replace('static/', '');
        return isProd ? `../${img}` : '/' + img;
      } else if (/\.(js|css)(\?.*)?$/.test(pathname)) {
        return isProd ? `../${pathname}` : '/' + pathname;
      } else {
        return isProd ? `../${pathname}/index.html` : '/' + pathname;
      }
    };
  },
};

Vue.use(VueNuxtron);
