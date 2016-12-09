/**
 * Webpack configuration file
 **/
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const postcssImport = require('postcss-import');
const postcssCssNext = require('postcss-cssnext');
const postcssBR = require('postcss-browser-reporter');
const postcssR = require('postcss-reporter');
const postcssCF = require('postcss-color-function');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  entry: ['babel-polyfill', './src'],
  output: {
    filename: `${isProd ? '[hash].' : ''}bundle.js`,
    path: 'build/',
    publicPath: 'build/',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.css', '.json'],
    modules: [
      path.resolve('./src'),
      path.resolve('./assets'),
      path.resolve('./node_modules'),
    ],
  },
  module: {
    // We need to load flexboxgrid without css-modules, but others need to be loaded
    // with css-modules.
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader',
      exclude: /node_modules\/(?!flexboxgrid)/,
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      include: /node_modules\/(?!flexboxgrid)/,
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff&name=[hash].[ext]',
    }, {
      test: /\.(ttf|eot|svg|jpg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=[hash].[ext]',
    }, {
      test: /\.(json)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'json-loader',
    }, {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader', // It's no longer allowed to omit the '-loader' prefix when using loaders.
                              // You need to specify 'babel-loader' instead of 'babel'.
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        postcss: [
          postcssImport({
            addDependencyTo: webpack,
          }),
          postcssCssNext(),
          postcssBR(),
          postcssR(),
          postcssCF(),
        ],
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      API_HOST: JSON.stringify(process.env.API_HOST || '//api.opendota.com'),
    }),
  ],
  devServer: {
    contentBase: '.',
    progress: true,
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    historyApiFallback: true,
  },
};

function HashBundlePlugin() {}
HashBundlePlugin.prototype.apply = (compiler) => {
  compiler.plugin('done', (statsData) => {
    const stats = statsData.toJson();
    if (!stats.errors.length) {
      const htmlFileName = 'index.html';
      const html = fs.readFileSync(path.join(__dirname, htmlFileName), 'utf8');
      const htmlOutput = html.replace(/\/build\/.?bundle\.js/, `${'/build/'}${stats.hash}${'.bundle.js'}`);
      fs.writeFileSync(path.join(__dirname, htmlFileName), htmlOutput);
    }
  });
};

if (!isProd) {
  config.devtool = 'eval-source-map';

  config.entry = [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    'babel-polyfill',
    './src',
  ];

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }), new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    output: {
      comments: false,
    },
    sourceMap: false,
  }), new HashBundlePlugin());
}

module.exports = config;
