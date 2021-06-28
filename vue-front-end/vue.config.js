module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        ws: true,
        changeOrigin: true
      }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-front-end/'
    : '/'
  },
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === "production" ? "/vue-leaflet-geolocation-selector/" : "/"
}