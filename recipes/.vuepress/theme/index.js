const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin")

module.exports = {
  extend: "@vuepress/theme-default",
  scss: {
    implementation: require("sass"),
    sassOptions: {
      fiber: require("fibers"),
    },
  },
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
  },
}
