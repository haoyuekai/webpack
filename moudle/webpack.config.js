var htmlWebpackPlugin = require("html-webpack-plugin");
var path=require("path");


module.exports={
	context: path.resolve(__dirname, './'),
	entry: {
		main: './src/app.js'
	},
	output:{
		path: __dirname+'/dist/',
		filename:'js/[name]@[chunkhash].js'
		//publicPath:'http://www.haoyuekai.com/'  // 上线需求，改变根路径
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel-loader',
				/*query:{  
					presets:['latest']  // 可在package.json中配置
				}*/
				exclude:path.resolve(__dirname,'./node_modules/'),  // 排除的范围  加快打包速度 字符串绝对路径或正则表达式
				include:/\.\/src\// // 包含的文件范围 用法同上
			},
			{
				test:/\.string$/,
				use:[{loader:'html-loader'}]
			},
			{
				test:/\.css$/,
				use:[
					'style-loader', //{loader:'style-loader'}
					{loader: 'css-loader',options: { importLoaders: 2 } }, 
					{
						loader:'postcss-loader',
						options:{
							plugins:[
								require('precss'),
						    	require('autoprefixer')({ // 加浏览器前缀兼容
						      		'borswers':['last 5 versions']
						    	})
						    ]
						}
					}
				]
			},
			{
				test:/\.scss$/,
				use:[
					'style-loader', //{loader:'style-loader'}
					{loader: 'css-loader',options: { importLoaders: 2 } }, 
					{
						loader:'postcss-loader',
						options:{
							plugins:[
								require('precss'),
						    	require('autoprefixer')({ // 加浏览器前缀兼容
						      		'borswers':['last 5 versions']
						    	})
						    ]
						}
					},
					{loader: 'sass-loader'}
				]
			},
			{
				test:/\.(png|jpg|jpeg|svg|gif)$/i,
				use:[
					{loader:'url-loader',options:{limit:8000,name:'assets/[name]@[hash:8].[ext]'}},
					{loader:'img-loader'}
				]
			}
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, './index.html'),
			inject:'body',  //js文件位置，默认'body',可选‘head’,false
			title:'webpack demo',  // 举例，传参
			date: new Date(),  //传参
			minify:{ // 文件压缩
				removeComments:true // 删除注释
				//collapseWhitespace:true  // 删除空格
			}
		})/*,
		new htmlWebpackPlugin({
			filename: 'a.html',
			template: 'index.html',
			inject:false,  //js文件位置，默认'body',可选‘head’,false
			title:'a',  // 举例，传参
			date: new Date(),  //传参
			minify:{ // 文件压缩
				removeComments:true // 删除注释
				//collapseWhitespace:true  // 删除空格
			},
			chunks:['a','main']   // 引用指定 chunks js文件
		}),
		new htmlWebpackPlugin({
			filename: 'b.html',
			template: 'index.html',
			inject:false,  //js文件位置，默认'body',可选‘head’,false
			title:'b',  // 举例，传参
			date: new Date(),  //传参
			minify:{ // 文件压缩
				removeComments:true // 删除注释
				//collapseWhitespace:true  // 删除空格
			},
			excludeChunks:['a','c']  //除了这些chunks外，其他js都引入
		}),
		new htmlWebpackPlugin({
			filename: 'c.html',
			template: 'index.html',
			inject:false,  //js文件位置，默认'body',可选‘head’,false
			title:'c',  // 举例，传参
			date: new Date(),  //传参
			minify:{ // 文件压缩
				removeComments:true // 删除注释
				//collapseWhitespace:true  // 删除空格
			},
			chunks:['c','main']
		})*/
	]
}
