const path = require('path')
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          runtimeCaching,
          disable: process.env.NODE_ENV === 'development'
        }
      }
    ]
  ],
  {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    webpack5: false,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')]
    },
    webpack: (config, options) => {
      // options -> { buildId, dev, isServer, defaultLoaders, webpack }
      if (!options.dev) {
        options.defaultLoaders.babel.options.cache = false
      }

      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webp|txt)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]'
            }
          }
        ]
      })

      config.resolve.modules.push(path.resolve(`./`))

      return config
    }
  }
)
