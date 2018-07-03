const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const merge = require("webpack-merge");

let commonConfig = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

module.exports = [
    merge( commonConfig,{
      entry: path.resolve( __dirname + "/src/plugin.js" ),
      output: {
        filename: 'vue-chatui.min.js',
        library: 'VueChatui',
        libraryTarget: 'window',
      }
    }),
    merge( commonConfig,{
      entry: path.resolve( __dirname + "/src/components/Chatui.vue" ),
      output: {
        filename: 'vue-chatui.js',
        libraryTarget: 'umd',
        library: 'vue-chatui',
        umdNamedDefine: true,
      }
    })
];