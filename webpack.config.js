const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const postCSSplugins = [ 
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap('copy stuff', function() {
      fse.copySync('./app/assets/images', './docs/assets/images');
      fse.copySync('./app/assets/styles/lightbox.min.css', './docs/assets/styles/lightbox.min.css');
      fse.copySync('./app/assets/scripts/lightbox-plus-jquery.min.js', './docs/assets/scripts/lightbox-plus-jquery.min.js');
    })
  }
}

let cssConfig = {
  test: /\.css$/i,  
  use: ['css-loader?url=false', {
    loader: 'postcss-loader',
    options: {
      plugins: postCSSplugins
    }
  }]
}

let pages = fse.readdirSync('./app').filter(function(file) {
  return file.endsWith('.html')
}).map(function(page){
  return new HtmlWebpackPlugin({
    filename: page,
    template: `./app/${page}`
  })
})

let config = {
  entry: './app/assets/scripts/app.js',
  plugins: pages,
  module: {
    rules: [
      cssConfig
    ]
  }
}

if(currentTask == 'dev') {
  cssConfig.use.unshift('style-loader')
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app') 
  }
  config.devServer = {
    before: function(app, server) {
      server._watch('./app/**/*.html')
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port: 3000,
    host: '0.0.0.0'
  }
  config.mode = 'development'
}



if(currentTask == 'build') {

  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  })

  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  postCSSplugins.push(require('cssnano'))
  config.output = {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'docs')
  }
  config.mode = 'production'
  config.optimization = {
    splitChunks: {chunks: 'all'} 
  }
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
    new RunAfterCompile()
  )
}



// module.exports = {  
//   entry: './app/assets/scripts/app.js',
//   output: {
//     filename: 'bundled.js',
//     path: path.resolve(__dirname, 'app')
//   },
//   devServer: {
//     before: function(app, server) {
//       server._watch('./app/**/*.html')
//     },
//     contentBase: path.join(__dirname, 'app'),
//     hot: true,
//     port: 3000,
//     host: '0.0.0.0'
//   },
//   mode: 'development',
 
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,  
//         use: ['style-loader','css-loader?url=false', {
//           loader: 'postcss-loader',
//           options: {
//             plugins: postCSSplugins
//           }
//         }]
//       }
//     ]
//   }
// };

module.exports = config; 