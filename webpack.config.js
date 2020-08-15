//引入Node中内置的path模块用于解析路径
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	//入口配置
	entry:'./src/index.js', 

	//输出配置
	output:{
		path:resolve(__dirname, "dist"),
		filename: "index.js", 
		publicPath:'/'
	},

	//工作模式
	mode:'development',

	//配置各种loader
	module:{
		rules:[
			//ES6 ==> ES5
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',//ES6 ==> ES5
							'@babel/preset-react' //jsx===>js
						],
						plugins:[
							['@babel/plugin-proposal-decorators',{legacy: true}],
							//让babel认识类中的新写法
							'@babel/plugin-proposal-class-properties' 
						]
					}
				}
			},
			//处理css文件
			{
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
			},
			//处理图片资源,url-loader底层用到了file-loader
			{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 8192, //8KB以下的图片转为base64
                name:'[hash:8].[ext]'
            }
          }
        ]
			},
			//处理其他文件
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
					loader: 'file-loader'
			}
		]
	},

	//配置插件
	plugins:[
		new HtmlWebpackPlugin({
			template:'./public/index.html'
		}),
		new CleanWebpackPlugin(),
		new CopyPlugin([{
			from:resolve(__dirname,'public'),
			to:resolve(__dirname,'dist'),
			ignore:['index.html']
		}])
	],

	//配置source-map
	devtool:'cheap-module-eval-source-map',//定位出错所在的原始代码行

	//配置dev-server
	devServer: {
		port:8080,//服务启动的端口
		open:true,//是否自动打开浏览器
		proxy: {
			'/api': { // 只有/api开头的请求，才会转发给target配置的服务器
					target: 'http://localhost:3000', //转发给谁
					pathRewrite: {'^/api' : ''}, //改写路径
					changeOrigin: true, //如果前台脚手架的主机名和服务器的主机名不一致，则需要changeOrigin: true
			},
		},
		historyApiFallback: true,// 任意的 404 响应都被替代为 index.html 备胎
	},

	//配置省略后缀
	resolve:{
		extensions: [".js", '.jsx', ".json"],//解决导入省略后缀名称
    alias:{//配置短路径
      '@':resolve(__dirname, 'src')//取别名，让@代替根路径下的src，即：'/src'
    }
	}
	
}