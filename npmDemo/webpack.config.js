var path = require('path');
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');//独立打包分离css
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaderHtml = function(name) {
	return {
		template:"./src/view/"+ name +".html",
    	filename:"view/"+ name +".html",
    	inject:true,
    	hash:true,
    	chunks:['common',name]//需要打包的模块
	}
}

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
    new HtmlWebpackPlugin(loaderHtml("index")),
    new HtmlWebpackPlugin(loaderHtml("login")),
  ]
};