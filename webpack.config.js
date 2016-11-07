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
    extensions: ['', '.jsx', '.js', '.css', '.json'],
    modules: [
      path.resolve('./src'),
      path.resolve('./assets'),
      path.resolve('./node_modules'),
    ],
  },
  module: {
    // We need to load flexboxgrid with css-modules, but others need to be loaded
    // with regular css loader.
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
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
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['stage-3', 'react', 'es2015'],
      },
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
      API_HOST: JSON.stringify(process.env.API_HOST || 'https://api.opendota.com'),
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
}
if (isProd) {
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
  }), new HashBundlePlugin(), new webpack.optimize.DedupePlugin());
}
module.exports = config;
