module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Trading Card Factory',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Joa ... mal sehen' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/web3.js', '~/plugins/ipfs.js'],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/toast'],

  toast: {
    position: 'top-right',
    duration: 5000,
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['web3', 'ipfs-api'],
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            configFile: '.eslintrc.js',
          },
        })
      }
    },
  },
  srcDir: 'src/',
}
