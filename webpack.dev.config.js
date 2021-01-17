const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ejs = require('ejs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')



module.exports = {
  devServer:{
    contentBase:path.join(__dirname,'dist/'),
    hot:true,
    host:'localhost'
  },

  entry:{
    portfolio:['./src/js/index.js','webpack/hot/only-dev-server'],
    stocklists:['./src/js/stocklists/stocklists.js','webpack/hot/only-dev-server'],
    d3:['./src/js/d3/d3.js','webpack/hot/only-dev-server'],
    snake:['./src/js/snake/app.js','webpack/hot/only-dev-server'],
    simon:['./src/js/fcc/simon/simon.js','webpack/hot/only-dev-server'],
    timer:['./src/js/fcc/timer/timer.js','webpack/hot/only-dev-server'],
    calculator:['./src/js/fcc/calculator/calculator.js','webpack/hot/only-dev-server'],
    tictactoe:['./src/js/fcc/tictactoe/tictactoe.js','webpack/hot/only-dev-server'],
    drums:['./src/js/fcc/drums/Drums.js','webpack/hot/only-dev-server'],
    markdown:['./src/js/fcc/markdown/markdown.js','webpack/hot/only-dev-server'],
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
            loader: "html-loader"
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
                  data: {displayMessage: "New Title"}
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin(),
   new HtmlWebpackPlugin({
     template: './public/views/index.html',
     filename: './index.html',
     chunks: [ 'portfolio' ]
   }),
   new HtmlWebpackPlugin({
     template: './public/views/d3/d3.html',
     filename: './d3.html',
     chunks: [ 'd3' ]
   }),
   new HtmlWebpackPlugin({
     template: '!!ejs-webpack-loader!./public/views/snake/snake.ejs',
     filename: './snake.ejs',
     chunks: [ 'snake' ]
   }),

   new HtmlWebpackPlugin({
     template: '!!ejs-webpack-loader!./public/views/snake/login.ejs',
     filename: './login.ejs',
     chunks: [ 'snake' ],
     excludeAssets:[/snake.js/]
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
