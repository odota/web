/**
 * Webpack configuration file
 **/

module.exports = {
  entry: {
    yaspv2: './yaspv2.js',
  },
  output:
  {
    filename: '[name].min.js',
    path: 'build/',
    publicPath: 'build/',
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.css', '.json']
  },
  module:
  {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff&name=[hash].[ext]"
      },
      {
        test: /\.(ttf|eot|svg|jpg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=[hash].[ext]"
      },
      {
        test: /\.(json)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "json-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query:
        {
          presets: ['stage-2', 'react', 'es2015']
        }
      }
    ]
  },
  postcss (webpack){
    return [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-cssnext')(),
      require('postcss-browser-reporter')(),
      require('postcss-reporter')(),
      require("postcss-color-function")(),
    ];
  },
  devServer:
  {
    contentBase: '.',
    progress: true,
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true
  }
};
