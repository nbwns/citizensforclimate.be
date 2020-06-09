require('dotenv').config()
const client = require('./plugins/contentful')
const axios = require('axios')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Citizens for climate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.0, user-scalable=no, height=device-height' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Fjalla+One|Niramit|Rock+Salt'}
    ],
    bodyAttrs: {
      class: 'has-navbar-fixed-top'
    }
  },
  mode: 'universal',
  css: [
    'assets/css/main.css'
  ],
  router: {
    routes: [
      { path: '/', redirect: '/fr/accueil' },
      { path: '/fr', redirect: '/fr/accueil' }

    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    '~/plugins/contentful', '~/plugins/translations'
    ,  { src:'~/plugins/load-script', ssr: false}
  ],
  modules: [
    '@nuxtjs/dotenv',
    'nuxt-leaflet',
    ['@nuxtjs/google-analytics', {
      id: 'UA-129338926-1'
    }],
    ['@nuxtjs/feed'],
    ['@netsells/nuxt-hotjar', {
      id: '1823329'
    }],
  ],
  feed: [
    {
      path: '/fr/feed.xml',
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      async create(feed) {
        feed.options = {
          title: 'Citizens for Climate',
          link: 'https://www.citizensforclimate.be/fr/feed.xml',
          description: 'Flux RSS de Citizens for Climate'
        }

        const content = await axios.get(`https://cdn.contentful.com/spaces/${process.env.CTF_SPACE_ID}/environments/${process.env.CTF_ENV}/entries?access_token=${process.env.CTF_ACCESS_TOKEN}&locale=fr-BE`)
        content.data.items.filter(post => post.fields.slug && post.sys.contentType.sys.id !== 'simplePage').forEach(post => {
          feed.addItem({
            title: post.fields.name,
            id: post.sys.id,
            link: `https://www.citizensforclimate.be/fr/action/${post.fields.slug}`,
            description: post.fields.introductionText
          })
        })
      }
    },
    {
      path: '/nl/feed.xml',
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      async create(feed) {
        feed.options = {
          title: 'Citizens for Climate',
          link: 'https://www.citizensforclimate.be/nl/feed.xml',
          description: 'RSS-feed van Citizens for Climate'
        }

        const content = await axios.get(`https://cdn.contentful.com/spaces/${process.env.CTF_SPACE_ID}/environments/${process.env.CTF_ENV}/entries?access_token=${process.env.CTF_ACCESS_TOKEN}&locale=nl-BE`)
        content.data.items.filter(post => post.fields.slug && post.sys.contentType.sys.id !== 'simplePage').forEach(post => {
          feed.addItem({
            title: post.fields.name,
            id: post.sys.id,
            link: `https://www.citizensforclimate.be/fr/action/${post.fields.slug}`,
            description: post.fields.introductionText
          })
        })
      }
    }
  ],
  generate: {
    routes () {
      const frStatic = ['/fr', '/fr/a-propos', '/fr/mentions-legales']
      const nlStatic = ['/nl', '/nl/over-ons', '/nl/disclaimer']

      let frPages = client.getEntries({
          content_type: 'simplePage',
          'locale':"fr-BE"
      })
      .then(entries => {
        return entries.items.map(entry => {
          return {
            route: 'fr/' + entry.fields.slug,
            payload: entry
          }
        })
      })

      let frActions = client.getEntries({
        content_type: 'action',
        'locale':"fr-BE"
      })
      .then(entries => {
        return entries.items.map(entry => {
          return {
            route: 'fr/action/' + entry.fields.slug,
            payload: entry
          }
        })
      })

      let nlPages = client.getEntries({
        content_type: 'simplePage',
        'locale':"nl-BE"
      })
      .then(entries => {
        return entries.items.map(entry => {
          return {
            route: 'nl/' + entry.fields.slug,
            payload: entry
          }
        })
      })

      let nlActions = client.getEntries({
        content_type: 'action',
        'locale':"nl-BE"
      })
      .then(entries => {
        return entries.items.map(entry => {
          return {
            route: 'nl/action/' + entry.fields.slug,
            payload: entry
          }
        })
      })

      return Promise.all([frPages,nlPages, nlActions, frActions]).then(values => {
        return [...frStatic, ...nlStatic, ...values[0], ...values[1], ...values[2], ...values[3]]
      })
    },
    fallback: true
  }
}

