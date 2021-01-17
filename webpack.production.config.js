const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ejs = require('ejs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')



module.exports = {

  entry:{
    portfolio:['./src/js/index.js'],
    stocklists:['./src/js/stocklists/stocklists.js'],
    d3:['./src/js/d3/d3.js'],
    snake:['./src/js/snake/app.js'],
    simon:['./src/js/fcc/simon/simon.js'],
    timer:['./src/js/fcc/timer/timer.js'],
    calculator:['./src/js/fcc/calculator/calculator.js'],
    tictactoe:['./src/js/fcc/tictactoe/tictactoe.js'],
    drums:['./src/js/fcc/drums/Drums.js'],
    markdown:['./src/js/fcc/markdown/markdown.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/',
    chunkFilename:'[name].js',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },


      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options:{
              minimize:false
            }
          }
        ]
      },
      {
          test: /\.ejs$/,
          use: [
              {
                loader: "html-loader"
              },
              {
                loader: "ejs-webpack-loader",
                options: {
                  data: {displayMessage: "New Title"},
                  minimize:false,
                }
              }
          ]
      },
      {
        test: /\.(sc|c)ss$/i,
        use:    [
            {loader:MiniCssExtractPlugin.loader,
            options:{
              publicPath: (resourcePath, context) => {
                 return path.relative(path.dirname(resourcePath), context) + '/';
              },
            }},
            // 'style-loader',
            'css-loader',
            // 'postcss-loader',
            'sass-loader'
          ],
      },
      {
        test: /\.svg/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  resolve:{
    extensions:['.js','.jsx','.scss']
  },
  plugins: [
    new CleanWebpackPlugin(),

   new HtmlWebpackPlugin({
     template: './public/views/index.html',
     filename: './index.html',
     chunks: [ 'portfolio' ],
     minify:false
   }),
   new HtmlWebpackPlugin({
     template: './public/views/d3/d3.html',
     filename: './d3.html',
     chunks: [ 'd3' ],
     minify:false
   }),
   new HtmlWebpackPlugin({
     template: '!!ejs-webpack-loader!./public/views/snake/snake.ejs',
     filename: './snake.ejs',
     chunks: [ 'snake' ],
     minify:false
   }),

   new HtmlWebpackPlugin({
     template: '!!ejs-webpack-loader!./public/views/snake/login.ejs',
     filename: './login.ejs',
     chunks: [ 'snake' ],
     excludeAssets:[/snake.js/],
     minify:false
   }),

   new HtmlWebpackPlugin({
     template: './public/views/stocklists/stocklists.html',
     filename: './stocklists.html',
     chunks: [ 'stocklists' ]
   }),
   // new HtmlWebpackPlugin({
   //   template: './public/views/fcc/fcc.html',
   //   filename: './fcc.html',
   //   chunks: [ 'fcc' ]
   // }),
   new HtmlWebpackPlugin({
     template: './public/views/fcc/simon.html',
     filename: './simon.html',
     chunks: [ 'simon' ]
   }),
   new HtmlWebpackPlugin({
     template: './public/views/fcc/timer.html',
     filename: './timer.html',
     chunks: [ 'timer' ]
   }),
   new HtmlWebpackPlugin({
     template: './public/views/fcc/calculator.html',
     filename: './calculator.html',
     chunks: [ 'calculator' ]
   }),
   new HtmlWebpackPlugin({
     template: './public/views/fcc/tictactoe.html',
     filename: './tictactoe.html',
     chunks: [ 'tictactoe' ]
   }),
   new HtmlWebpackPlugin({
     template: './public/views/fcc/drums.html',
     filename: './drums.html',
     chunks: [ 'drums' ]
   }),
   new HtmlWebpackPlugin({
     template: './public/views/fcc/markdown.html',
     filename: './markdown.html',
     chunks: [ 'markdown' ]
   }),


   new MiniCssExtractPlugin({
     filename: '[name].css',
     chunkFilename: '[id].css',
   }),
   // new HtmlWebpackExcludeAssetsPlugin()
 ]
};
