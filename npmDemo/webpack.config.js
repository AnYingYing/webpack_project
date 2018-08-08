var path = require('path');
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');//独立打包分离css
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
  	"common" : './src/page/common/index.js',//公共
  	"index" : './src/page/index/index.js',//首页
  	"login" : './src/page/login/index.js',//登录
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
	loaders: [{
	  test: /\.css/,
	  loader: Ex.extract('style-loader', 'css-loader')  // 单独打包出CSS，这里配置注意下
	}]
  },
  externals:{
	'jquery':"window.jQuery"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common'],
      
      filename: "js/base.js",
    }),
    new Ex("css/[name].css"),
    new HtmlWebpackPlugin({
    	template:"./src/view/index.html",
    	filename:"view/index.html",
    	inject:true,
    	hash:true,
    	chunks:['common','index']//需要打包的模块
    }),
  ]
};