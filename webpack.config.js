const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');
const nodeExternals = require('webpack-node-externals');

const {
  NODE_ENV = 'production',
} = process.env;
module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [ nodeExternals() ],
  watch: true,
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ['npm run start']
    })
  ]
}