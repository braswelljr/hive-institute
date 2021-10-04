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
    webpack5: true,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')]
    },
    webpack: (config, options) => {
      if (!options.dev) {
        options.defaultLoaders.babel.options.cache = false
      }

      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|txt)$/i,
        use: [
          options.defaultLoaders.babel,
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/media/[hash].[ext]'
            }
          }
        ]
      })

      config.resolve.modules.push(path.resolve(`./`))

      return config
    }
  }
)
