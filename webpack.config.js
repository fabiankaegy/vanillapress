const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const WebpackAutoInject = require( 'webpack-auto-inject-version' );

// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new ExtractTextPlugin( {
  filename: './style.css',
} );

const WebpackAutoInjectPlugin = new WebpackAutoInject({
  NAME: '',
  SHORT: '',
  SILENT: false,
  PACKAGE_JSON_PATH: './package.json',
  components: {
    AutoIncreaseVersion: true,
    InjectAsComment: false,
    InjectByTag: true
  },
  componentsOptions: {
    AutoIncreaseVersion: {
      runInWatchMode: true // it will increase version with every single build!
    },
    InjectAsComment: {
      tag: 'Version: {version} - {date}',
      dateFormat: 'h:MM:ss TT'
    },
    InjectByTag: {
      fileRegex: /\.+/,
      dateFormat: 'h:MM:ss TT'
    }
  },
  LOGS_TEXT: {
    AIS_START: 'DEMO AIV started'
  }
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [ require( 'autoprefixer' ) ],
      },
    },
    {
      loader: 'sass-loader',
      query: {
        outputStyle:
          'compressed',
      },
    },
  ],
};

module.exports = {
  entry: {
    './build' : './src/app.js',
  },
  output: {
    path: path.resolve( __dirname ),
    filename: '[name].js',
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        use: blocksCSSPlugin.extract( extractConfig ),
      },
    ],
  },
  plugins: [
    blocksCSSPlugin,
    WebpackAutoInjectPlugin,
  ],
};
